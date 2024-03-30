import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
import '../../assets/styles/auth.scss'
import henceforthApi from "../../utils/henceforthApi";
import Spinner from "../../components/BootstrapCompo";
import { toast } from "react-toastify";
import { handleError } from "../../context/Provider";
import BreadCrumb from "../../components/common/BreadCrumb";
import { strongPasswordValidation } from "../../utils/validations";

const ChangePassword = () => {
    let breadCrumbPath = [
        { name: 'Home', url: `/`, active: '' },
        { name: 'Change Password', url: ``, active: 'not-allowed' }
    ]

    const [firstEye, setFirstEye] = useState(true);
    const [secondEye, setSecondEye] = useState(true);
    const [oldPasswordError, setoldPasswordError] = useState("")
    const [NewPasswordError, setNewPasswordError] = useState("")

    const [confirmPasswordError, setconfirmPasswordError] = useState("")
    const [thirdEye, setThirdEye] = useState(true);
    const [state, setState] = useState({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
        loading: false,
    });
    const handleInput = (e: any) => {
        let name = e.target.name;
        let value = e.target.value;
        if (oldPasswordError) {
            setoldPasswordError("")
        }
        if (NewPasswordError) {
            setNewPasswordError("")
        } if (confirmPasswordError) {
            setconfirmPasswordError("")
        }
        setState({
            ...state,
            [name]: value,
        });
    };

    const ChangePassword = async (e: any) => {
        e.preventDefault()

        if (!state.oldPassword) {
            return setoldPasswordError("Please enter oldPassword")
        }
        if (!state.newPassword) {
            return setNewPasswordError("Please enter  password")
        }
        if (!strongPasswordValidation(state?.newPassword)) {
            return setNewPasswordError("Password must contain number,uppercase & special character")
        }
        if (!state.confirmNewPassword) {
            return setconfirmPasswordError("Plase enter confirm password")
        }
        if (state.newPassword !== state.confirmNewPassword) {
            return toast.warn("Password and confirm password not match")
        }
        setState({
            ...state,
            loading: true
        })
        try {
            const data = {
                language: "ENGLISH",
                old_password: state.oldPassword,
                new_password: state.newPassword,
            }

            let apiRes = await henceforthApi.password.changepassword(data)
            toast.success(apiRes.message)
            Back()
        } catch (error) {
            handleError(error)
        } finally {
            setState({
                ...state,
                loading: false
            })
        }
    }
    const Back = () => {
        window.history.back()
    }
    return (
        <>
            {/* breadcrum  */}
            <BreadCrumb pathNameDeclare={breadCrumbPath} />

            {/* page  */}
            <div className='page-spacing' >
                <section className='change-password'>
                    <div className="container-fluid">
                        <div className="row justify-content-center">
                            <div className="col-sm-10 col-md-6 col-lg-5 col-xl-4 col-xxl-3">
                                <div className="common-card">
                                    {/* card title  */}
                                    <div className="common-card-title">
                                        <h5>Change Password</h5>
                                    </div>
                                    <div className="common-card-content">
                                        <form onSubmit={ChangePassword}>
                                            {/* old Password */}
                                            <div className='form-fields-box mb-3'>
                                                <div className="input-group is-invalid">
                                                    <input type={firstEye ? "password" : "text"}
                                                        name="oldPassword"
                                                        onChange={handleInput}
                                                        value={state.oldPassword}
                                                        className={`form-control rounded-0 ${oldPasswordError ? " is-invalid" : ""} border-end-0`} placeholder="Old Password" />
                                                    <div className="input-group-append">
                                                        <span className={`input-group-text ${oldPasswordError ? "border border-danger" : ""}  group-btn-span`} onClick={() => setFirstEye(!firstEye)}> <i
                                                            className={`fa ${firstEye ? `fa-eye ${oldPasswordError ? `text-danger` : `text-secondary`}` : `fa-eye-slash ${oldPasswordError ? `text-danger` : `text-secondary`}`}`}
                                                            aria-hidden="true"
                                                        ></i></span>
                                                    </div>
                                                </div>
                                                {/* error msg  */}
                                                <div className={`${oldPasswordError ? "invalid-feedback" : ""}`}>
                                                    {oldPasswordError}
                                                </div>
                                            </div>
                                            {/* New Password */}
                                            <div className='form-fields-box mb-3'>
                                                <div className="input-group is-invalid">
                                                    <input type={secondEye ? "password" : "text"}
                                                        name="newPassword"
                                                        onChange={handleInput}
                                                        value={state.newPassword}
                                                        className={`form-control rounded-0 ${NewPasswordError ? "is-invalid" : ""} border-end-0`} placeholder="New Password" />
                                                    <div className="input-group-append">
                                                        <span className={`input-group-text ${NewPasswordError ? `border border-danger` : ""} group-btn-span`} onClick={() => setSecondEye(!secondEye)}> <i
                                                            className={`fa ${secondEye ? `fa-eye ${oldPasswordError ? `text-danger` : `text-secondary`}` : `fa-eye-slash ${oldPasswordError ? `text-danger` : `text-secondary`}`}`}
                                                            aria-hidden="true"
                                                        ></i></span>
                                                    </div>
                                                </div>
                                                {/* error msg  */}
                                                <div className={`${NewPasswordError ? "invalid-feedback" : ""}`}>
                                                    {NewPasswordError}
                                                </div>
                                            </div>
                                            {/* Confirm New Password */}
                                            <div className='form-fields-box mb-4'>
                                                <div className="input-group is-invalid">
                                                    <input type={thirdEye ? "password" : "text"}
                                                        name="confirmNewPassword"
                                                        onChange={handleInput}
                                                        value={state.confirmNewPassword}
                                                        className={`form-control rounded-0 ${confirmPasswordError ? "is-invalid" : ""} border-end-0`} placeholder="Confirm New Password" />
                                                    <div className="input-group-append">
                                                        <span className={`input-group-text ${confirmPasswordError ? `border border-danger` : ""} group-btn-span`} onClick={() => setThirdEye(!thirdEye)}> <i
                                                            className={`fa ${thirdEye ? `fa-eye ${confirmPasswordError ? 'text-danger' : 'text-secondary'} ` : `fa-eye-slash`}`}
                                                            aria-hidden="true"
                                                        ></i></span>
                                                    </div>
                                                </div>
                                                {/* error msg  */}
                                                <div className={`${confirmPasswordError ? "invalid-feedback" : ""}`}>
                                                    {confirmPasswordError}
                                                </div>
                                            </div>
                                            {/* Submit Button  */}
                                            <div className='signin-button-box'>
                                                <ul className='list-unstyled d-flex gap-2'>
                                                    <li className='w-100'><button type='button' className='btn btn-white w-100 bg-danger text-white' onClick={Back}>Cancel</button></li>
                                                    <li className='w-100'> <button type='submit' className='btn btn-theme w-100' disabled={state.loading}>{state.loading ? <Spinner /> : "Change Password"}</button></li>
                                                </ul>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </ >
    )
}

export default ChangePassword;