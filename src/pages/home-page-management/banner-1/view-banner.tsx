import '../../../assets/styles/pages.scss'
import profile_img from '../../../assets/images/pages/profile-image.jpg'
import { Link, Navigate, useMatch, useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import henceforthApi from '../../../utils/henceforthApi'
import Spinner from '../../../components/BootstrapCompo'
import { toast } from 'react-toastify'
import { GlobalContext, handleError } from '../../../context/Provider'
import EnableDisable from '../../../components/common/enableDisable'
import Swal from 'sweetalert2'
import { INSUFFICIENT_PERMISSIONS } from '../../../context/actionTypes'



const ViewBanner = () => {

    const { authState, authDispatch } = useContext(GlobalContext);
    const match: any = useMatch(`/management/banner/:type/:_id/view`)
    const [loading, setloading] = useState(false)
    const navigate = useNavigate()
    const [state, setstate] = useState({

        _id: "",
        image: "",
        title: "",
        sub_title: "",
        category_id: {
            name: ""
        },
        subcategory_id: {
            name: ""
        },
        sub_subcategory_id: {
            name: ""
        },
        brand_id: {
            name: ""
        }

    })
    const [checkenable, setcheckenable] = useState()

    const initialise = async () => {
        try {
            let apires = await henceforthApi.HomeManagemnt.viewbanner(match?.params?._id)
            setstate(apires?.message)
            setcheckenable(
                apires.message.is_enable
            )
            console.log(apires.message.is_enable)
        } catch (error: any) {
            if (error?.response?.body?.error === INSUFFICIENT_PERMISSIONS) {
                window.history.back()
            }
        }
    }
    const Back = () => {
        window.history.back()
    }
    const enableDisable = async () => {
        setloading(true)
        try {
            const data = {
                _id: match?.params._id,
                is_enable: checkenable === true ? false : true
            }

            // console.log(state.is_enable)
            let apiRes = await henceforthApi.HomeManagemnt.viewenableDisable(data)
            initialise()
        } catch (error) {
            handleError(error)
        } finally {
            setloading(false)
        }
    }
    const initialisedelete = async () => {
        Swal.fire({
            title: "Are you sure?",
            text: "Are You sure want to Delete!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#4ade0b",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result: any) => {
            if (result.isConfirmed) {
                try {

                    let apires = await henceforthApi.HomeManagemnt.deletebanner(match?.params?._id)
                    toast.success(apires.message)
                    console.log(apires)
                    window.history.back()

                } catch (error) {
                    handleError(error)
                } finally {
                }
            }
        })
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
                            <h2 className="fw-semibold">View Banner</h2>
                            {/* breadcrum  */}
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb m-0">
                                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                    <li className="breadcrumb-item active fw-bold">View Banner</li>
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
                        <div className="row">
                            <div className="col-sm-12 col-md-7 col-lg-6 col-xl-5 col-xxl-4">
                                {/* title  */}
                                <div className="common-card">
                                    <div className="common-card-title d-flex justify-content-between align-items-center">
                                        <h5>View Banner</h5>
                                        <div className='edit-button'>
                                            <Link to={`/management/banner1/${match?.params.type}/${state._id}/edit`} type='button' className='btn btn-white w-100'><i className='fa fa-pencil me-2'></i>Edit</Link>
                                        </div>
                                        {/* /management/banner1/:type/:_id/edit */}
                                    </div>
                                    {/* form  */}
                                    <div className="common-card-content">
                                        {/* image */}
                                        <div className='upload-fields-box mb-3'>
                                            <div className='banner-view-image mb-2'>
                                                <img src={state.image ? `${henceforthApi.API_FILE_ROOT_ORIGINAL}${state.image}` : "Not Avaiable"} alt="img" className='w-100' />
                                            </div>
                                        </div>
                                        {/* Banner Detail  */}
                                        <div className="profile-image my-4">
                                            <h5 className='mb-3'>Banner Section</h5>
                                            {/* <p className="d-flex align-items-center mb-1"><span className='fw-bold me-2'>Title:</span>{state.title ? state.title:"Not Avaiable" }</p>
                                            <p className="d-flex align-items-center mb-1"><span className='fw-bold me-2'>Sub Title:</span>{state.sub_title ? state.sub_title :"Not Avaiable"}</p> */}
                                            <p className="d-flex align-items-center mb-1"><span className='fw-bold me-2'>Category level-1:</span>{state.category_id?.name ? state.category_id?.name : "Not Avaiable"}</p>
                                            <p className="d-flex align-items-center mb-1"><span className='fw-bold me-2'>Category level-2:</span> {state.subcategory_id?.name ? state.subcategory_id?.name : "Not Avaiable"}</p>
                                            <p className="d-flex align-items-center mb-1"><span className='fw-bold me-2'>Category level-3:</span>{state.sub_subcategory_id?.name ? state.sub_subcategory_id?.name : "Not Avaiable"}</p>
                                            <p className="d-flex align-items-center mb-1"><span className='fw-bold me-2'>Brand:</span>{state?.brand_id?.name ? state.brand_id?.name : "Not Avaiable"}</p>
                                        </div>
                                        {/* Button  */}
                                        <div className='signin-button-box'>
                                            <ul className='list-unstyled d-flex gap-2 flex-column'>
                                                <li className='w-100'><button type='button' className='btn btn-white w-100' onClick={Back}><i className='fa fa-arrow-left me-2'></i>Back</button></li>
                                                <li className='w-100'>
                                                    <button type='button' className='btn btn-white w-100 border-black bg-black text-white' onClick={enableDisable} disabled={loading}>
                                                        {loading ? <Spinner /> : <>{checkenable === true ? <><i className='fa fa-ban me-2'></i>Enable</> : <><i className='fa fa-ban me-2'></i>Disable</>}</>}</button>
                                                </li>
                                                <li className='w-100'> <button type='button' className='btn btn-white w-100 bg-danger text-white' onClick={initialisedelete} ><i className='fa fa-trash me-2'></i>Remove</button></li>
                                                {/* <li className='w-100'> <button type='button' className='btn btn-theme w-100'><i className='fa fa-save me-2'></i>Save</button></li> */}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div >

        </>
    )
}
export default ViewBanner;