import '../../assets/styles/auth.scss'
import '../../assets/styles/pages.scss';
import { Link, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../../context/Provider';
import { useContext, useState } from "react";
import henceforthApi from '../../utils/henceforthApi';
import loginSuccess from '../../context/actions/auth/loginSuccess';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'
import Spinner from '../../components/BootstrapCompo';
import profile_img from '../../assets/images/pages/profile_placeholder.png';

const EditProfile = () => {

    const { authState, authDispatch, onChangeBack } = useContext(GlobalContext);

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()
    const [selectedFile, setSelectedFile] = useState<any>()
    const [state, setState] = useState({
        name: authState.name,
        email: authState.email,
        phone_number: authState.phone_number,
        country_code: authState.country_code,
        full_address: authState.full_address
    } as any);

    const fileUpload = async (file: any) => {
        setLoading(true);
        const url = `${henceforthApi.API_ROOT}Upload/do_spaces_file_upload`;
        const formData = new FormData();
        formData.append("file", file);
        const config = {
            headers: {
                "content-type": "multipart/form-data",
                token: authState.access_token,
            },
        };

        const apiRes = await (await henceforthApi.Common.do_spaces_file_upload("file", file)).data.file_name

        const data1 = {
            language: "ENGLISH",
            image: apiRes
        };
        henceforthApi.Administrator.editImgProfile(data1)
            .then((res: any) => {
                setLoading(false);
                loginSuccess(res.data)(authDispatch);
            })
            .catch((err: any) => {
                console.log(err);
                setLoading(false);
            });

    }
    const handlesubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true)
        const data = {
            name: state.name,
            email: state.email,
            phone_number: state.phone_number,
            full_address: state.full_address,
            language: "ENGLISH"
        } as any
        if (selectedFile) {
            if (selectedFile) {
                const image = await fileUpload(selectedFile)
                data.image = image
            }
        }

        try {
            let apires = await henceforthApi.Administrator.editProfile(data)
            loginSuccess(apires.data)(authDispatch);
            navigate("/profile")

        } catch {
            console.log("error")
        } finally {
            setLoading(false)
        }
    }
    const handlechnage = (e: any) => {
        let name = e.target.name;
        let value = e.target.value;
        setState({
            ...state,
            [name]: value
        })
    }
    const phoneCheck = (e: any, v: any) => {
        setState({
            ...state,
            phone_number: e.phone.slice(Number(v.dialCode.length), Number(e.phone.length)),
            country_code: v.dialCode,
        });
    }
    // const editAddress = (e: any) => {
    //     let address = e.target.address;
    //     let value = e.target.value;
    //     setState({
    //         ...state,
    //         [address]: value
    //     })
    // }

    return (
        <>
            {/* breadcrum  */}
            <section className="breadcrum-box">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <h2>Edit Profile</h2>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb m-1">
                                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                    <li className="breadcrumb-item active fw-bold">Edit Profile</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
            {/* page  */}
            <div className='page-spacing'>
                <section className='edit-profile'>
                    <div className="container-fluid">
                        <div className="row justify-content-center">
                            <div className="col-sm-12 col-md-7 col-lg-6 col-xl-5 col-xxl-5">
                                {/* title  */}
                                <div className="common-card">
                                    <div className="common-card-title">
                                        <h5>Edit Profile</h5>
                                    </div>
                                    {/* form  */}
                                    <div className="common-card-content">
                                        {/* Upload image */}
                                        <div className='upload-fields-box mb-3'>
                                            <div className='profile-edit-image mb-2'>
                                                <div className='profile-edit-upload'>
                                                    <input type="file" onChange={(e: any) => setSelectedFile(e.target.files[0])} />
                                                </div>
                                                {/* <img src={
                                                    authState.image
                                                        ? `${henceforthApi.API_FILE_ROOT_MEDIUM}${authState.image}`
                                                        : profile_img
                                                } alt="img" className='rounded-circle' /> */}
                                                <img src={selectedFile ? URL?.createObjectURL(selectedFile) : authState?.image ? `${henceforthApi.API_FILE_ROOT_ORIGINAL}${authState?.image}` : profile_img} alt="img" className='rounded-circle' />

                                            </div>
                                            <p className='text-center'><small><strong>Note:-</strong> Please upload only .jpg and .png format only.</small></p>
                                        </div>
                                        <form onSubmit={handlesubmit}>
                                            {/* Name */}
                                            <label className='mb-1'>Name:</label>
                                            <div className='wrapper form-fields-box mb-3'>
                                                <div className="form-fields-box mb-3">
                                                    <div className="input-group is-invalid">
                                                        <span className="input-group-text bg-transparent m-0">
                                                            <i className='fa fa-user text-secondary'></i>
                                                        </span>
                                                        <input type="text" className="form-control rounded-0" value={state.name as any} onChange={handlechnage} name="name" required />
                                                    </div>
                                                </div>

                                            </div>
                                            {/* Email */}
                                            <label className='mb-1'>Email:</label>
                                            <div className="form-fields-box mb-3">
                                                <div className="input-group is-invalid">
                                                    <span className="input-group-text bg-transparent m-0">
                                                        <i className='fa fa-envelope text-secondary'></i>
                                                    </span>
                                                    <input type="email" className="form-control" value={state.email as any} onChange={handlechnage} name="email" required disabled />
                                                </div>
                                            </div>

                                            {/* Phone */}
                                            <div className='form-fields-box mb-4'>
                                                <label className='mb-1'>Mobile no:</label>
                                                <PhoneInput country={'in'} value={state.country_code?.concat(state.phone_number)} inputProps={{ required: true }} onChange={(phone: any, value: any) => { phoneCheck({ phone }, value) }} />
                                            </div>
                                            {/* Address */}
                                            <label className='mb-1'>Address:</label>
                                            <div className="form-fields-box mb-3">
                                                <div className="input-group is-invalid">
                                                    <span className="input-group-text bg-transparent m-0">
                                                        <i className='fa fa-map-marker me-2  fs-5'></i>
                                                    </span>
                                                    <textarea className="form-control" placeholder="Enter your full Address" name="full_address" value={state.full_address as any} onChange={handlechnage} id="floatingTextarea"></textarea>
                                                </div>
                                            </div>

                                            {/* Submit Button  */}
                                            <div className='signin-button-box'>
                                                <ul className='list-unstyled d-flex gap-2'>
                                                    <li className='w-100'><button type='button' className='btn btn-white w-100 bg-danger text-white' disabled={loading} onClick={onChangeBack} ><i className='fa fa-ban me-2'></i>Cancel</button></li>
                                                    <li className='w-100'> <button type='submit' className='btn btn-theme w-100' disabled={loading}>{loading ? <Spinner /> : <span><i className='fa fa-save me-2' ></i>Save</span>}</button></li>
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
        </>
    )
}

export default EditProfile;