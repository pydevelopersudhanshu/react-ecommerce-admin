import '../../assets/styles/auth.scss'
import logo from '../../assets/images/logo/logo.png'
import { toast } from "react-toastify";
import { Link, useFetcher, useNavigate, } from 'react-router-dom';
import { Fragment, useContext, useEffect, useState } from 'react';
import loginSuccess from "../../context/actions/auth/loginSuccess";
import henceforthApi from '../../utils/henceforthApi';
import { GlobalContext } from '../../context/Provider';
import Spinner from '../../components/BootstrapCompo';
import { requestNotification } from '../../utils/firebase';

const SignIn = ({ logOutNow }: any) => {
    const { authDispatch } = useContext(GlobalContext);
    const [firstEye, setFirstEye] = useState(true);
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [state, setState] = useState({
        email: "",
        password: "",
        loading: false,
    });
    const handleInput = (e: any) => {
        let name = e.target.name;
        let value = e.target.value;
        setState({
            ...state,
            [name]: value,
        });

    };

    const onSubmitForm = async (e: any) => {
        e.preventDefault();

        if (!state.email.trim()) {
            return setEmailError("Please provide valid email");
        }
        if (!state.password.trim()) {
            return setPasswordError("Please provide valid password");
        }
        setState({
            ...state,
            loading: true
        });
        let fcmid = await requestNotification()
        const { email, password } = state;
        let items = {
            email: email,
            password: password,
            language: "ENGLISH",
        } as any;
        if (fcmid) items['fcm_token'] = fcmid
        try {
            let res = await henceforthApi.Auth.login(items)
            console.log(res)
            loginSuccess({ ...res.data, lang: 'ENGLISH' })(authDispatch);
            henceforthApi.setToken(res.data.access_token)
            toast.success("Login Successful");
            setState({
                ...state,
                loading: false,
            });
        } catch (err: any) {
            let response = err.response.body;
            let error = response ? response.error_description : "Server error";
            toast.error("Wrong Username or Password");
            if (error.error) {
                if (String(error.error).includes("unauthorized")) {
                    logOutNow();

                } else {
                    setState({
                        ...state,
                        loading: false,
                    });
                }
            } else {
                setState({
                    ...state,
                    loading: false,
                });
            }
        }
    }

    const emailCheckerror = () => {
        setEmailError("")
    }
    const passwordCheckerror = () => {
        setPasswordError("")
    }
    useEffect(() => {
        emailCheckerror()
    }, [state.email])
    useEffect(() => {
        passwordCheckerror()
    }, [state.password])

    return (
        <Fragment>
            <section className='auth-pages'>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xxl-4 col-xl-5 col-lg-6 col-md-7 col-sm-10">
                            <div className="auth-page-card mb-4">
                                {/* logo */}
                                <div className='auth-logo-box text-center'>
                                    <img src={logo} alt="img" />
                                </div>
                                {/* title  */}
                                <div className='auth-page-card-title text-center my-4'>
                                    <h3 className='mb-2'>Login to Henceforth</h3>
                                    <p>To see it in action.</p>
                                </div>
                                {/* form  */}
                                <form onSubmit={onSubmitForm}>
                                    {/* Username  */}
                                    <div className='form-fields-box mb-3'>
                                        <input type="text"
                                            name="email"
                                            value={state.email}
                                            onChange={handleInput}
                                            className={`form-control rounded-0 ${emailError ? "is-invalid" : " "}`} placeholder="Email" />
                                        {/* error msg  */}
                                        <div className={`${emailError ? "invalid-feedback" : ""}`}>
                                            {emailError}
                                        </div>
                                    </div>
                                    {/* Password  */}
                                    <div className='form-fields-box mb-4'>
                                        <div className={`input-group is-invalid`}>
                                            <input type={firstEye ? "password" : "text"}
                                                name="password"
                                                onChange={handleInput}
                                                value={state.password}
                                                className={`form-control rounded-0 ${passwordError ? "is-invalid" : " "}`} placeholder="Password" />
                                            <div className="input-group-append">
                                                <span className={`input-group-text ${passwordError ? `border border-danger` : ""} group-btn-span`} onClick={() => setFirstEye(!firstEye)}> <i
                                                    className={`fa ${!firstEye ? `fa-eye-slash ${passwordError ? `text-danger` : `text-secondary`} ` : `fa-eye ${passwordError ? `text-danger` : `text-secondary`}`}`}

                                                    aria-hidden="true"
                                                ></i></span>
                                            </div>
                                        </div>
                                        {/* error msg  */}
                                        <div className={`${passwordError ? "invalid-feedback" : ""}`}>
                                            {passwordError}
                                        </div>
                                    </div>
                                    {/* Signin button  */}
                                    <div className='signin-button-box btn-theme'>
                                        <button type='submit' className='btn btn-theme w-100' disabled={state.loading} >{state.loading ? <Spinner /> : "SignIn"}</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div >
            </section >
        </Fragment>
    );
};

export default SignIn;
