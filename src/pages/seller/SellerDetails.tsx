import { Link, useMatch } from 'react-router-dom'
import { Fragment, useContext, useEffect, useState } from 'react';
import henceforthApi from '../../utils/henceforthApi';
import { sellerdetails } from '../../context/interfaces';
import ProductListingDetails from './SellerProductListing';
import { GlobalContext, handleError } from '../../context/Provider';
import { toast } from 'react-toastify'
import Spinner from '../../components/BootstrapCompo';
import SellerOrderListing from './SellerOrderListing';
import Swal from 'sweetalert2';
import profile_placeholder from '../../assets/images/pages/profile_placeholder.png'

const ViewSeller = () => {

    const { authState } = useContext(GlobalContext);
    const match: any = useMatch("/seller/:id")
    const [loading, setloading] = useState(false)
    const [loader, setloader] = useState(false)
    const [loader1, setloader1] = useState(false)


    const [state, setState] = useState<sellerdetails>()


    const onChnageDelete = async () => {
        // setloading(true)
        Swal.fire({
            title: "Are you sure?",
            text: "Are you sure want to delete this seller!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result: any) => {
            if (result.isConfirmed) {
                try {
                    let apires = await henceforthApi.Seller.sellerdelete(match?.params.id)
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
    const sellerdetails = async () => {
        try {
            let Apies = await henceforthApi.Seller.details(match?.params.id)
            setState(Apies)
        } catch (error) {

        } finally {

        }
    }

    const onChangeActiveDeactive = async () => {
        // Swal.fire({
        //     title: "Are you sure?",
        //     text: `Are you sure want to ${ state?.data.account_status == "activated" ? `deactivated` : `activated`} this seller!`,
        //     icon: "warning",
        //     showCancelButton: true,
        //     confirmButtonColor: "#3085d6",
        //     cancelButtonColor: "#d33",
        //     confirmButtonText: `Yes, ${ state?.data.account_status == "activate" ? `deactivate` : `activate`} it!`,
        // })
        // setloader1(true)
        // const data = {
        //     type: "ACTIVATE/DEACTIVATE",
        //     _id: state?.data._id,
        //     account_status: state?.data.account_status == "ACTIVATED" ? `DEACTIVATED` : `ACTIVATED`,
        // }
        // try {
        //     let apires = await henceforthApi.Seller.manageSeller(data)
        //     toast.success(apires.data.message)
        //     sellerdetails()
        // } catch (error) {
        //     handleError(error)
        // } finally {
        //     setloader1(false)
        // }
        Swal.fire({
            title: "Are you sure?",
            text: `Are you sure want to ${state?.data.account_status !== "ACTIVATED" ? `activate` : `deactivate`} this seller!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `Yes, ${state?.data.account_status !== "ACTIVATED" ? `activate` : `deactivate`} it!`,
        }).then(async (result: any) => {
            if (result.isConfirmed) {
                const data = {
                    type: "ACTIVATE/DEACTIVATE",
                    _id: state?.data._id,
                    account_status: state?.data.account_status == "ACTIVATED" ? `DEACTIVATED` : `ACTIVATED`,
                }
                try {
                    let apires = await henceforthApi.Seller.manageSeller(data)
                    toast.success(apires.data.message)
                    sellerdetails()
                } catch (error) {
                    handleError(error)
                } finally {
                    setloader1(false)
                }
            }
        })
    }
    const onChangeBlockUnblock = async () => {
        // Swal.fire({
        //     title: "Are you sure?",
        //     text: "Are you sure want to delete this seller!",
        //     icon: "warning",
        //     showCancelButton: true,
        //     confirmButtonColor: "#3085d6",
        //     cancelButtonColor: "#d33",
        //     confirmButtonText: "Yes, delete it!",
        // })
        // setloader(true)
        // const data = {
        //     type: "BLOCK/DELETE",
        //     _id: state?.data._id,
        //     is_blocked: state?.data.is_blocked == true ? false : true,
        //     // is_deleted: state?.data.is_deleted == true ? false : true,
        //     language: "ENGLISH"
        // }
        // try {
        //     let apires = await henceforthApi.Seller.manageSeller(data)
        //     toast.success(apires.data.message)
        //     sellerdetails()
        // } 
        // catch (error) {
        //     console.log(error)
        // } finally {
        //     setloader(false)
        // }
        Swal.fire({
            title: "Are you sure?",
            text: `Are you sure want to ${state?.data.is_blocked !== true ? `block` : `unblock`} this seller!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `Yes, ${state?.data.is_blocked !== true ? `block` : `unblock`} it!`,
        }).then(async (result: any) => {
            if (result.isConfirmed) {
                const data = {
                    type: "BLOCK/DELETE",
                    _id: state?.data._id,
                    is_blocked: state?.data.is_blocked == true ? false : true,
                    // is_deleted: state?.data.is_deleted == true ? false : true,
                    language: "ENGLISH"
                }
                try {
                    let apires = await henceforthApi.Seller.manageSeller(data)
                    toast.success(apires.data.message)
                    sellerdetails()
                } catch (error) {
                    handleError(error)
                } finally {
                    setloader1(false)
                }
            }
        })
    }
    useEffect(() => {
        sellerdetails()
    }, [])

    return (
        <Fragment>
            {/* breadcrum  */}
            <section className="breadcrum-box">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            {/* title  */}
                            <h2 className="fw-semibold">View Seller</h2>
                            {/* breadcrum  */}
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb m-0">
                                    <li className="breadcrumb-item"><Link to="">Home</Link></li>
                                    <li className="breadcrumb-item active fw-bold">View Seller</li>
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
                        <div className="row gy-3 justify-content-center">
                            <div className="col-sm-12 col-md-7 col-lg-6 col-xl-5 col-xxl-3 px-xs-0">
                                {/* Profile Card  */}
                                <div className="common-card">
                                    <div className="common-card-title">
                                        <h5>View Seller</h5>
                                    </div>
                                    {/* Profile  */}
                                    <div className="common-card-content">
                                        {/* Profile image  */}
                                        <div className="profile-image">
                                            <img src={state?.data?.image ? `${henceforthApi.API_FILE_ROOT_ORIGINAL}${state?.data?.image}` : profile_placeholder} alt="img" className='img-fluid' />
                                        </div>
                                        {/* Profile Detail  */}
                                        <div className="profile-image my-4">
                                            <h5 className='mb-3'>{state?.data?.name}</h5>
                                            <p className="d-flex align-items-center mb-1"><i className='fa fa-envelope me-2 fs-5'></i>{state?.data?.email}</p>
                                            <p className="d-flex align-items-center"><i className='fa fa-phone-square me-2 fs-5'></i>+91 {state?.data?.phone_number}</p>
                                        </div>
                                        {/* button  */}
                                        <div className="profile-button">
                                            <ul className='list-unstyled d-flex gap-2  flex-wrap'>
                                                <li className='w-100'>
                                                    <a href={`https://demo.ecommerce.seller.henceforthsolutions.com/login-with-user/${state?.data?._id}/${authState.access_token}`} target="_blank">
                                                        <button type='button' className='btn btn-theme w-100'><i className='fa fa-sign-in me-1'></i> Login as seller</button>
                                                    </a>
                                                </li>
                                                <li className='w-100'><button type='button' className='btn btn-white w-100 bg-danger text-white' onClick={onChnageDelete} disabled={loading}><i className='fa fa-trash me-1'></i>{loading ? <Spinner /> : "Delete"}</button></li>
                                                <li className='w-100'>
                                                    <button type='button' className='btn btn-white bg-black text-white w-100' onClick={onChangeActiveDeactive} disabled={loader1}>
                                                        {state?.data?.account_status == "ACTIVATED" ? <span> {loader1 ? <Spinner /> : <><i className='fa fa-toggle-on me-1'></i> Deactivate</>}</span> :
                                                            <span>{loader1 ? <Spinner /> : <><i className='fa fa-toggle-off me-1'></i>Activate</>}</span>}
                                                    </button >
                                                </li>

                                                <li className='w-100'>
                                                    <button type='button' className='btn btn-white bg-dark text-white w-100' onClick={onChangeBlockUnblock} disabled={loader}>
                                                        {state?.data.is_blocked == false ?
                                                            <span>{loader ? <Spinner /> : <><i className='fa fa-ban me-1'></i>Block</>}</span> :
                                                            <span>{loader ? <Spinner /> : <><i className='fa fa-ban me-1'></i>Unblock</>}</span>}
                                                    </button>

                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/************************************** Product Order details  *************************************/}
                            <div className="col-xxl-9 px-xs-0">
                                {/************************************** Product list details  *************************************/}
                                <div className='product-detail-box mb-3'>
                                    <ProductListingDetails id={(match?.params?.id)} />
                                </div>

                                {/************************************** order detail  *************************************/}
                                <SellerOrderListing id={(match?.params?.id)} />
                            </div>
                        </div>
                    </div>
                </section>
            </div >
        </Fragment>
    )
}
export default ViewSeller;