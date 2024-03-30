import defaultIcon from '../../assets/images/default.jpg'
import { Link, useMatch } from 'react-router-dom'
import DownloadFileModal from '../../components/common/download-file-modal'
import { useContext, useEffect, useRef, useState } from 'react'
import henceforthApi from '../../utils/henceforthApi'
import { GlobalContext, handleError } from '../../context/Provider'
import profile_placeholder from '../../assets/images/pages/profile_placeholder.png'
import Spinner from '../../components/BootstrapCompo'
import { toast } from 'react-toastify'
const EditStaff = () => {

    const { authState, staffMembers } = useContext(GlobalContext);

    const match = useMatch("staff/:_id/edit")
    const [loading, setLoading] = useState(false)
    let ref1 = useRef() as any
    const [state, setState] = useState({
        _id: "",
        name: "",
        image: "",
        email: "",
        country_code: "",
        phone_number: "",
        roles: [] as Array<string>,
        super_admin: false,
        is_blocked: false,
        is_deleted: false,
        created_at: ""
    })
    const [selectedFile, setSelectedFile] = useState(null as any)


    const handleInput = (value: string, b: boolean) => {
        console.log(value, b);

        const roles = state.roles
        if (b) {
            setState({
                ...state,
                roles: [...roles, value]
            })
        } else {
            const index = roles.findIndex(res => res == value)
            roles.splice(index, 1)
            setState({
                ...state,
                roles: [...roles]
            })
        }
    }

    const handleChange = ({ target }: any) => {
        setState({
            ...state,
            [target.name]: target.value
        })
    }

    const updateProfile = async () => {
        const items = {
            _id: match?.params._id,
            name: state.name,
            roles: state.roles
        } as any
        setLoading(true)
        if (selectedFile) {
            const image = await (await henceforthApi.Common.do_spaces_file_upload("file", selectedFile)).data.file_name

            // const image = await henceforthApi.Common.do_spaces_file_upload("file", selectedFile)
            items.image = image
            console.log(image);

        }
        try {
            const apiRes = await henceforthApi.Staff.edit(items)
            toast.success(apiRes.message)
            window.history.back()
        } catch (error) {
            handleError(error)
        } finally {
            setLoading(false)
        }
    }

    const initialise = async () => {
        try {
            const apiRes = await henceforthApi.Staff.get(match?.params?._id as string)
            setState(apiRes.data)
        } catch (error) {

        }
    }

    useEffect(() => {
        initialise()
    }, [authState?.lang])

    return (
        <>
            {/* breadcrum  */}
            <section className="breadcrum-box">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            {/* title  */}
                            <h2 className="fw-semibold">Edit Staff</h2>
                            {/* breadcrum  */}
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb m-0">
                                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                    <li className="breadcrumb-item active fw-bold"><Link to="/staffs/1">Staffs</Link></li>
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
                            <div className="col-sm-10 col-md-7 col-lg-6 col-xl-5 col-xxl-4">
                                {/* title  */}
                                <div className="common-card">
                                    <div className="common-card-title">
                                        <h5>Edit Staff</h5>
                                    </div>
                                    {/* form  */}
                                    <div className="common-card-content">
                                        <form onSubmit={(e) => { e.preventDefault(); updateProfile() }}>
                                            {/* Upload image */}
                                            <div className='upload-fields-box mb-3'>
                                                <div className='profile-edit-image mb-2'>
                                                    <div className='profile-edit-upload'>
                                                        <input type="file" onChange={(e) => setSelectedFile(e.target.files)} accept="image/*" />
                                                    </div>
                                                    <img src={state.image ? `${henceforthApi.API_FILE_ROOT_ORIGINAL}${state.image}` : profile_placeholder} alt="img" className='rounded-circle' />
                                                </div>
                                                <p className='text-center'><small><strong>Note:-</strong> Please upload only .jpg and .png format only.</small></p>
                                            </div>
                                            {/* Name */}
                                            <div className='form-fields-box mb-3'>
                                                <input type="text" className="form-control rounded-0" placeholder='Name' name='name' value={state.name} onChange={handleChange} />
                                            </div>
                                            {staffMembers.map((res: string, index: number) =>
                                                <div key={res} className="form-check w-50">
                                                    <input className="form-check-input shadow-none" type="checkbox" checked={state.roles.includes(res)} onChange={(e) => handleInput(res, e.target.checked)} id={`roleslist${index}`} />
                                                    <label className="form-check-label text-nowrap" htmlFor={`roleslist${index}`}>
                                                        {res}
                                                    </label>
                                                </div>
                                            )}
                                            {/* Submit Button  */}
                                            <div className='signin-button-box mt-3'>
                                                <ul className='list-unstyled d-flex gap-2'>
                                                    <li className='w-100'><button onClick={() => window.history.back()} type='button' className='btn btn-white w-100 bg-danger text-white'><i className='fa fa-ban me-2'></i>Cancel</button></li>
                                                    <li className='w-100'> <button type='submit' className='btn btn-theme w-100' disabled={loading}>{loading ? <Spinner /> : <span><i className='fa fa-save me-2'></i>Save</span>}</button></li>
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
export default EditStaff;