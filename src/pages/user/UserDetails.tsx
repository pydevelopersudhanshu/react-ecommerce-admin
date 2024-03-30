import '../../assets/styles/pages.scss'
import { Link, useMatch } from 'react-router-dom'
import { Fragment, useContext, useEffect, useState } from 'react';
import henceforthApi from '../../utils/henceforthApi';
import { GlobalContext, handleError } from '../../context/Provider'
import { toast } from 'react-toastify'
import Spinner from '../../components/BootstrapCompo'
import profile_placeholder from '../../assets/images/pages/profile_placeholder.png'
import UserOrderDetails from './UserOrderDetails'
import Swal from 'sweetalert2';

const UserDetails = () => {

    const match = useMatch("/user/:id")

    const { authState } = useContext(GlobalContext);
    const [loading, setloading] = useState(false)
    const [loader, setloader] = useState(false)
    const [state, setstate] = useState({
        name: "",
        email: "",
        phone_no: "",
        profile_pic: "",
        address: [],
        state: "",
        loading: false,
        country: "",
        _id: "",
        account_status: "",
        is_blocked: Boolean(""),
        is_deleted: Boolean("")
    })
    const viewdetail = async () => {
        let apires = await henceforthApi.User.getListingdetails(
            match?.params.id
        )
        setstate(apires)
    }
    const onChangeActiveDeactive = async () => {

        // const data = {
        //     type: "ACTIVATE/DEACTIVATE",
        //     _id: state._id,
        //     account_status: state.account_status === "ACTIVATED" ? `DEACTIVATED` : `ACTIVATED`,
        //     language: "ENGLISH"
        // }
        // try {
        //     let apiRes = await henceforthApi.User.manageUsers(data)
        //     toast.success(apiRes.data.message)
        //     viewdetail()
        // } 
        // catch (error) {
        // }
        // finally {
        //     setstate({
        //         ...state,
        //         loading: false
        //     })
        // }
        Swal.fire({
            title: "Are you sure?",
            text: `Are you sure want to ${state?.account_status !== "ACTIVATED" ? `activate` : `deactivate`} this user!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `Yes, ${state?.account_status !== "ACTIVATED" ? `activate` : `deactivate`} it!`,
        }).then(async (result: any) => {
            if (result.isConfirmed) {
                const data = {
                    type: "ACTIVATE/DEACTIVATE",
                    _id: state._id,
                    account_status: state.account_status === "ACTIVATED" ? `DEACTIVATED` : `ACTIVATED`,
                    language: "ENGLISH"
                }
                try {
                    setstate({
                        ...state,
                        loading: true
                    })
                    let apiRes = await henceforthApi.User.manageUsers(data)
                    toast.success(apiRes.data.message)
                    viewdetail()
                    setstate({
                        ...state,
                        loading: false
                    })
                }

                catch (err: any) {
                    console.log(err.apiRes.data.error_description)
                } finally {

                }
            }
        })
    }
    const onChangeBlockUnblock = async () => {
        // setloader(true)
        // const data = {
        //     type: "BLOCK/DELETE",
        //     _id: state._id,
        //     is_blocked: state.is_blocked === true ? false : true,
        //     language: "ENGLISH"
        // }
        // try {
        //     let apiRes = await henceforthApi.User.manageUsers(data)
        //     toast.success(apiRes.data.message)
        //     viewdetail()
        // }
        //  catch (error) {
        //     console.log(error)
        // } 
        // finally {
        //     setloader(false)
        // }
        Swal.fire({
            title: "Are you sure?",
            text: `Are you sure want to ${state?.is_blocked !== true ? `block` : `unblock`} this seller!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `Yes, ${state?.is_blocked !== true ? `block` : `unblock`} it!`,
        }).then(async (result: any) => {
            if (result.isConfirmed) {
                const data = {
                    type: "BLOCK/DELETE",
                    _id: state._id,
                    is_blocked: state.is_blocked === true ? false : true,
                    language: "ENGLISH"
                }
                try {
                    let apiRes = await henceforthApi.User.manageUsers(data)
                    toast.success(apiRes.data.message)
                    viewdetail()
                } catch (error) {
                    handleError(error)
                } finally {
                    setloader(false)
                }
            }
        })
    }
    const onChangeDeleteUser = async () => {
        Swal.fire({
            title: "Are you sure?",
            text: "Are you sure want to delete this user!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result: any) => {
            if (result.isConfirmed) {
                try {
                    setloading(true)
                    let apires = await henceforthApi.User.userDelete(match?.params.id)
                    toast.success(apires.data.message)
                    window.history.back()
                } catch (error) {
                    handleError(error)
                } finally {
                    setloading(false)
                }
            }
        })

    }
    useEffect(() => {
        viewdetail()
    }, [authState?.lang])
    return (
        <Fragment>
            {/* breadcrum  */}
            <section className="breadcrum-box">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            {/* title  */}
                            <h2 className="fw-semibold">View User</h2>
                            {/* breadcrum  */}
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb m-0">
                                    <li className="breadcrumb-item"><Link to="">Home</Link></li>
                                    <li className="breadcrumb-item active fw-bold">View User</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
            {/* page  */}
            <div className='page-spacing'>
                <section className='change-password'>
                    <div className="container-fluid">
                        <div className="row gy-4">
                            <div className="col-sm-12 col-md-7 col-lg-6 col-xl-5 col-xxl-3">
                                {/* Profile Card  */}
                                <div className="common-card mb-4">
                                    <div className="common-card-title">
                                        <h5>View User</h5>
                                    </div>
                                    {/* Profile  */}
                                    <div className="common-card-content">
                                        {/* Profile image  */}
                                        <div className="profile-image">
                                            <img src={state.profile_pic ? `${henceforthApi.API_FILE_ROOT_MEDIUM}${state.profile_pic}` : profile_placeholder} alt="img" className='img-fluid' />
                                        </div>
                                        {/* Profile Detail  */}
                                        <div className="profile-image my-4">
                                            <h5 className='mb-3'>{state.name ? state.name : "Not Avaiable"}</h5>
                                            <p className="d-flex align-items-center mb-1"><i className='fa fa-envelope me-2 fs-5'></i>{state.email}</p>
                                            <p className="d-flex align-items-center"><i className='fa fa-phone-square me-2 fs-5'></i>+91 {state.phone_no}</p>
                                        </div>
                                        {/* button  */}
                                        <div className="profile-button">
                                            <ul className='list-unstyled d-flex gap-2  flex-wrap'>
                                                <li className='w-100'>
                                                    <a href={`https://demo.ecommerce.henceforthsolutions.com/signin?user_key=${state._id}&access_token=${authState.access_token}`} target="_blank">
                                                        <button type='button' className='btn btn-theme w-100'><i className='fa fa-sign-in me-1'></i> Login as user</button>
                                                    </a>
                                                </li>
                                                <li className='w-100'><button type='button' className='btn btn-white w-100 bg-danger text-white' onClick={onChangeDeleteUser} disabled={loading} >{loading ? <Spinner /> :
                                                    <><i className='fa fa-trash me-1'></i>Delete</>}</button></li>

                                                <li className='w-100'>
                                                    <button type='button' className='btn btn-white bg-black text-white w-100' onClick={onChangeActiveDeactive} disabled={state.loading}>
                                                        {state.account_status == "ACTIVATED" ? <span> {state.loading ? <Spinner /> : <><i className='fa fa-toggle-on me-1'></i> Deactivate</>}</span> :
                                                            <span>{state.loading ? <Spinner /> : <><i className='fa fa-toggle-off me-1'></i>Activate</>}</span>}
                                                    </button >
                                                </li >
                                                <li className='w-100'>
                                                    <button type='button' className='btn btn-white bg-dark text-white w-100' onClick={onChangeBlockUnblock} disabled={loader}>
                                                        {state.is_blocked == false ?
                                                            <span>{loader ? <Spinner /> : <><i className='fa fa-ban me-1'></i>Block</>}</span> :
                                                            <span>{loader ? <Spinner /> : <><i className='fa fa-ban me-1'></i>Unblock</>}</span>}
                                                    </button>
                                                </li>
                                            </ul >
                                        </div >
                                    </div >
                                </div >
                                {/* Address List  */}
                                < div className="common-card" >
                                    <div className="common-card-title">
                                        <h5>User Address</h5>
                                    </div>
                                    {/* Profile  */}
                                    <div className="common-card-content px-0">
                                        <div className="user-address-box">
                                            {/* 1 */}
                                            {state.address.map((item: any, index: any) => {
                                                return (
                                                    <>
                                                        <div className="user-address-detail">
                                                            <b>Address-{index + 1}:</b>
                                                            <address className='mb-1'>
                                                                {item.full_address}<br />
                                                            </address>
                                                            <p className="d-flex align-items-center"><i className='fa fa-phone-square me-2'></i>+91 {item.phone_no}</p>
                                                        </div>
                                                        <hr />
                                                    </>
                                                )
                                            })}
                                        </div>
                                    </div>
                                </div >
                            </div >
                            {/* order detail  */}
                            < UserOrderDetails id={(match?.params.id)} />
                        </div >
                    </div >
                </section >
            </div >
        </Fragment >
    )
}
export default UserDetails;