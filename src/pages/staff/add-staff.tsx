import { Link } from 'react-router-dom'
import DownloadFileModal from '../../components/common/download-file-modal'
import henceforthApi from '../../utils/henceforthApi'
import { useContext, useRef, useState } from 'react'
import { GlobalContext, handleError } from '../../context/Provider'
import { toast } from 'react-toastify'
import defaultIcon from '../../assets/images/default.jpg'
import Profile_placeholder from '../../assets/images/profile_placeholder.png'
import Spinner from '../../components/BootstrapCompo'


const AddStaff = () => {
    const { authState, staffMembers, onChangeBack } = useContext(GlobalContext);
    
    let ref1 = useRef() as any
    const [loading, setLoading] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null as any)
    const [firstEye, setFirstEye] = useState(true);
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [roles, setRoles] = useState([] as Array<string>)
    const [imageError, setImageError] = useState("")
    const [nameError, setNameError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [rolesError, setRolesError] = useState("")
    const fileupload = async (file: any) => {
        try {
            const apiRes = await henceforthApi.Common.do_spaces_file_upload("file", file)
            const file_name = apiRes.data.file_name
            return file_name
        } catch {
            return ""
        }
    }

    const handleInput = (value: string, b: boolean, index2: number) => {
        let row = roles
        if (b === false) {
            row = roles.filter((item: any) => {
                return item != value
            })
        }
        b === true ? setRoles([...roles, value]) : setRoles([...row])
    }

    const handlesubmit = async (e: any) => {
        e.preventDefault()
        if (!selectedFile) {
            return setImageError("please Upload Image")
        }
        if (!name) {
            return setNameError("Please Enter name")
        }
        if (!email) {
            return setEmailError("please enter email")
        }
        if (!password) {
            return setPasswordError("please enter password")
        }
        if (!roles.length) {
            return setRolesError("please choose at least one ")
        }
        const items = {
            name,
            email,
            roles,
            password,
            language: "ENGLISH"
        } as any
        setLoading(true)
        if (selectedFile) {
            const image = await fileupload(selectedFile)
            if (image) {
                items.image = image
            }
        }
        try {
            let apires = await henceforthApi.Staff.add(items)
            toast.success(apires.message)
            window.history.back()
        } catch (error) {
            handleError(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            {/* breadcrum  */}
            <section className="breadcrum-box">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            {/* title  */}
                            <h2 className="fw-semibold">Add Staff</h2>
                            {/* breadcrum  */}
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb m-0">
                                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                    <li className="breadcrumb-item active fw-bold">Add Staff</li>
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
                            <div className="col-md-8 col-lg-6 col-xl-5 col-xxl-4">
                                {/* title  */}
                                <div className="common-card">
                                    <div className="common-card-title">
                                        <h5>Add Staff</h5>
                                    </div>
                                    {/* form  */}
                                    <div className="common-card-content">
                                        <form onSubmit={handlesubmit}>
                                            {/* Upload image */}
                                            <div className='upload-fields-box mb-3 is-invalid'>
                                                <div className='profile-edit-image mb-2'>
                                                    <div className='profile-edit-upload'>
                                                        <input type="file" onChange={(e: any) => { setImageError(""); setSelectedFile(e.target.files[0]) }} accept="image/*" />
                                                    </div>
                                                    <img src={selectedFile ? URL.createObjectURL(selectedFile) : Profile_placeholder} alt="img"
                                                        className={`form-control p-0 ${imageError ? 'border border-danger ' : ""} rounded-circle`} />
                                                </div>
                                                <p className='text-center'><small><strong>Note:-</strong> Please upload only .jpg and .png format only.</small></p>
                                            </div>
                                            {/* error msg */}
                                            <div className={`${imageError ? "invalid-feedback text-center" : ""}`}>
                                                {imageError}
                                            </div>
                                            {/* Name */}
                                            <div className='form-fields-box mb-3 is-invalid'>
                                                <input type="text" className={`form-control ${nameError ? 'border border-danger' : ""} rounded-0`} placeholder='Name' value={name} onChange={(e) => { setNameError(""); setName(e.target.value) }} name="name" />
                                            </div>
                                            {/* error msg */}
                                            <div className={`${nameError ? "invalid-feedback" : ""}`}>
                                                {nameError}
                                            </div>
                                            <div className='form-fields-box mb-3 is-invalid'>
                                                <input type="text" className={`form-control ${emailError ? 'border border-danger' : ""} rounded-0`} placeholder='Email' value={email} onChange={(e) => { setEmailError(""); setEmail(e.target.value) }} name="email" />
                                            </div>
                                            {/* error msg */}
                                            <div className={`${emailError ? "invalid-feedback" : ""}`}>
                                                {emailError}
                                            </div>
                                            <div className='form-fields-box mb-3'>
                                                <div className='input-group '>
                                                    <input type={firstEye ? "password" : "text"} className={`form-control ${passwordError ? 'border border-danger' : ""} rounded-0`} placeholder='Password' value={password} onChange={(e) => { setPasswordError(""); setPassword(e.target.value) }} name="email" />
                                                    <div className="input-group-append">
                                                        <span className={`input-group-text ${passwordError ? 'border border-danger' : ""} group-btn-span`} onClick={() => { setPasswordError(""); setFirstEye(!firstEye) }}> <i
                                                            className={`fa ${!firstEye ? `fa-eye-slash ` : `fa-eye`}`}

                                                            aria-hidden="true"
                                                        ></i></span>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* error msg */}
                                            <div className={`${passwordError ? "invalid-feedback" : ""}`}>
                                                {passwordError}
                                            </div>
                                            {/* Role */}
                                            <div className='form-radio-box mb-3 '>
                                                {/* <input type="text" className="form-control rounded-0" placeholder='Role' required multiple /> */}
                                                <div className='d-inline-flex flex-column is-invalid'>
                                                    {staffMembers.map((res: string, index: number) =>
                                                        <div key={res} className="form-check flex-grow-1">
                                                            <input className={`form-check-input ${rolesError ? 'border border-danger':''} shadow-none`} type="checkbox"
                                                                value={res} checked={roles.includes(res)} ref={ref1}
                                                                onChange={(e) => { setRolesError(""); handleInput(res, e.target.checked, index) }} id={`roleslist${index}`} />
                                                            <label className="form-check-label text-nowrap" htmlFor={`roleslist${index}`}>
                                                                {res}
                                                            </label>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            {/* error msg */}
                                            <div className={`${rolesError ? "invalid-feedback" : ""}`}>
                                                {rolesError}
                                            </div>
                                            {/* Button  */}
                                            <div className='signin-button-box'>
                                                <ul className='list-unstyled d-flex gap-2'>
                                                    <li className='w-100'><Link to="" type='button' className='btn btn-white w-100 bg-danger text-white' onClick={onChangeBack} ><i className='fa fa-ban me-2'></i>Cancel</Link></li>
                                                    <li className='w-100'> <button type='submit' className='btn btn-theme w-100' disabled={loading}><i className='fa fa-save me-2'></i>{loading ? <Spinner /> : 'Save'}</button></li>
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
export default AddStaff;