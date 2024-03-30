import profile_img1 from '../../assets/images/pages/laptop.jpg';
import { Link, useMatch, useNavigate } from 'react-router-dom'
import { GlobalContext, handleError } from '../../context/Provider';
import { Fragment, useContext, useEffect, useState } from 'react';
import henceforthApi from '../../utils/henceforthApi';
import { numberWithCommas } from '../../utils/validations';
import profile_placeholder from '../../assets/images/pages/profile_placeholder.png'
import moment from 'moment';
import { toast } from 'react-toastify';
import OrderStatus from '../../components/order/OrderStatus';
import henceofrthEnums from '../../utils/henceofrthEnums';
import OrderOtherRowListing from '../../components/row_view/OrderOtherRowListing';
import { orderDetails } from '../../context/interfaces';
import { INSUFFICIENT_PERMISSIONS } from '../../context/actionTypes';

const OrderDetails = () => {

    const match = useMatch(`ordersdetails/:id`)
    const { loading, setLoading, authState } = useContext(GlobalContext)
    const navigate = useNavigate()
    const [page, setPage] = useState<any>(1)
    let limit = 10
    const [state, setstate] = useState({
    } as orderDetails)
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => { setIsReadMore(!isReadMore) };
    let total_discount = state?.price - state?.product_discount_price
    const onChangeCancel = async () => {
        setLoading(true)
        try {
            const data = {
                _id: state.order_object_id,
                language: "ENGLISH"
            }
            let apiRes = await henceforthApi.Order.cancelOorder(data)
            navigate(`/orders/1`)
            toast.success(apiRes.data.message)
        } catch (error) {
            handleError(error)
        } finally {
            setLoading(false)
        }
    }
    // navigate({pathname:"sdff",})
    const initialise = async () => {
        try {
            let apiRes = await henceforthApi.Order.orderDetails(match?.params.id)
            setstate(apiRes.data)
            setPage(apiRes.data)
        } catch (error: any) {
            if (error?.response?.body?.error === INSUFFICIENT_PERMISSIONS) {
                window.history.back()
            }
        }
    }

    useEffect(() => {
        initialise()
    }, [match?.params.id, authState?.lang])
    console.log(state)
    return (
        <>
            <section className="breadcrum-box">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            {/* title  */}
                            <h2 className="fw-semibold">Order Detail</h2>
                            {/* breadcrum  */}
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb m-0">
                                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                    <li className="breadcrumb-item active fw-bold">Order Detail</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
            {/* page  */}
            <div className='page-spacing'>
                <section className='product-detail'>
                    <div className="container-fluid">
                        <div className="row gy-3 mb-3">
                            <div className="col-sm-12 px-xs-0">
                                {/* Title  */}
                                <div className="common-card">
                                    <div className="common-card-title d-flex justify-content-between align-align-items-center">
                                        <h5>Order Detail</h5>
                                    </div>
                                    {/* Profile  */}
                                    <div className="common-card-content">
                                        <div className="row gy-3">
                                            <div className="col-md-5">
                                                <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="true">
                                                    <div className="carousel-indicators">
                                                        {Array.isArray(state?.product_id?.images) && (state?.product_id?.images?.length) ?
                                                            state.product_id.images.map((res: any, index: any) => {
                                                                return (
                                                                    <>
                                                                        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={index} className={`${index === 0 ? "active" : ""} ${state?.product_id?.images.length === 1 ? "d-none" : ""}`} aria-current="true" aria-label={`Slide ${index + 1}`}></button>
                                                                    </>
                                                                )
                                                            }) : ""}
                                                    </div>
                                                    <div className="carousel-inner product-images">
                                                        {Array.isArray(state?.product_id?.images) && (state?.product_id?.images?.length)
                                                            ? state.product_id.images.map((res: any, index: any) => {
                                                                return <>
                                                                    <div className={`carousel-item ${index == 0 ? "active" : ""}`} key={index}>
                                                                        <img src={`${henceforthApi.FILES.imageOriginal(res)}`} className="d-block w-100" alt="img" />
                                                                    </div>

                                                                </>
                                                            }) : <div className="carousel-item">
                                                                <img src={profile_img1} className="d-block w-100" alt="img" />
                                                            </div>}
                                                    </div>
                                                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                        <span className="visually-hidden">Previous</span>
                                                    </button>
                                                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                        <span className="visually-hidden">Next</span>
                                                    </button>
                                                </div>
                                            </div>
                                            {/* Product detail  */}
                                            <div className="col-md-7">
                                                <div className="product-detail-box">
                                                    <h2 className='fw-bolder'>{state?.product_id?.name}</h2>
                                                    <div className='d-flex align-items-center gap-1'>
                                                        <h2 className='fw-bold m-0'>&#36; {numberWithCommas(state?.product_discount_price)}</h2><small>Exclude Tax</small>
                                                    </div>
                                                    <div className="divider my-3"></div>
                                                    <div className='mb-3'>
                                                        <h5 className='fw-bolder'>Product description</h5>
                                                        {/* <p>{state?.product_id?.description}</p> */}
                                                        <p className='testimonials__quote__text' >
                                                            {isReadMore ? state?.product_id?.description.slice(0, 150) : state?.product_id?.description}
                                                            {/* // condition that will render 'read more' only if the text.length is greated than 150 chars */}
                                                        </p>
                                                        {state?.product_id?.description.length > 150 &&
                                                            <span className='' role="button" onClick={toggleReadMore}>
                                                                {isReadMore ? '...Read more' : 'Read less'}
                                                            </span>
                                                        }
                                                    </div>
                                                    <ul className='list-unstyled product-detail-list'>
                                                        <li className="d-flex mb-2 flex-column flex-sm-row product-detail-params"><b>Order ID:</b><span>{state?.order_id ? state.order_id : "Not Avaiable"}</span></li>
                                                        <li className="d-flex mb-2 flex-column flex-sm-row product-detail-params"><b>Product ID:</b><span>{state?.product_id?._id ? state.product_id?._id : "not Avaiable "}</span></li>
                                                        <li className="d-flex mb-2 flex-column flex-sm-row product-detail-params"><b>Product Name:</b><span>{state?.product_id?.name ? state.product_id?.name : "Not Avaiable"}</span></li>
                                                        <li className="d-flex mb-2 flex-column flex-sm-row product-detail-params"><b>Price:</b><span>&#36; {state?.total_price ? state?.total_price : "Not Avaiable"}</span></li>
                                                        <li className="d-flex flex-column flex-sm-row product-detail-params"><b>Brand</b><span>{state?.product_id?.brand_id?.name ? state?.product_id?.brand_id?.name : "Not Avaiable"}</span></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* User seller order-status detail  */}
                        <div className="row gy-3">
                            {/* User Detail  */}
                            <div className="col-sm-6 col-lg-4 px-xs-0">
                                <div className="common-card h-100">
                                    <div className="common-card-title">
                                        <h5>User Detail</h5>
                                    </div>
                                    <Link to={`/user/${state?.user_id?._id}`} style={{ color: '#000' }}>
                                        <div className="common-card-content">
                                            <div className="product-detail-box">
                                                <div className="profile-image">
                                                    <img src={state?.user_id?.profile_pic ? `${henceforthApi.API_FILE_ROOT_MEDIUM}${state?.user_id?.profile_pic}` : profile_placeholder} alt="img" className='img-fluid' />
                                                </div>
                                                {/* Profile Detail  */}
                                                <div className="profile-image my-4">
                                                    <h5 className='mb-3'>{state?.user_id?.name ? state?.user_id?.name : "Not Avaiable"}</h5>
                                                    {/* <p className="d-flex align-items-center mb-2"><i className='fa fa-phone-square me-2 fs-5'></i>demo.kumar@mail.com</p> */}
                                                    <p className="d-flex align-items-center mb-2"><i className='fa fa-phone-square me-2 fs-5'></i> {state?.address_id?.phone_no ? `+${state?.address_id?.country_code}-${state?.address_id?.phone_no}` : "Not available"}</p>
                                                    <p className="d-flex align-items-start"><i className='fa fa-map me-2 fs-5'></i>{state?.address_id?.full_address ? state?.address_id?.full_address : "Not available"}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>

                            {/* Seller Detail  */}
                            <div className="col-sm-6 col-lg-4 px-xs-0">
                                <div className="common-card h-100">
                                    <div className="common-card-title">
                                        <h5>Seller Detail</h5>
                                    </div>
                                    <Link to={`/seller/${state?.seller_id?._id}`} style={{ color: '#000' }}>
                                        <div className="common-card-content">
                                            <div className="product-detail-box">
                                                <div className="profile-image">
                                                    <img src={state?.seller_id?.image ? `${henceforthApi.API_FILE_ROOT_MEDIUM}${state?.seller_id?.image}` : profile_placeholder} alt="img" className='img-fluid' />
                                                </div>
                                                {/* Profile Detail  */}
                                                <div className="profile-image my-4">
                                                    <h5 className='mb-3'>{state?.seller_id?.name}</h5>
                                                    <p className="d-flex align-items-center mb-2"><i className='fa fa-phone-square me-2 fs-5'></i>{`${state?.seller_id?.country_code ? '+' : ''}${state?.seller_id?.country_code}-${state?.seller_id?.phone_number ? state?.seller_id?.phone_number : 'Not Avaiable'}`}</p>
                                                    <p className="d-flex align-items-start mb-2"><i className='fa fa-envelope me-2 fs-5'></i>{state?.seller_id?.full_address}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>

                            {/*Price Breakdown, Order and Delivery Status */}
                            <div className="col-lg-4 px-xs-0">
                                <div className='d-flex flex-column h-100'>
                                    <div className="common-card mb-3 h-100">
                                        <div className="common-card-title d-flex justify-content-between align-items-center">
                                            <h5>Price Breakdown</h5>
                                            {(state?.order_status === henceofrthEnums.OrderStatus.CONFIRMED || state?.order_status === henceofrthEnums?.OrderStatus?.DELIVERED || state?.order_status === henceofrthEnums?.OrderStatus.PAID || state?.order_status === henceofrthEnums?.OrderStatus.PLACED || state?.order_status === henceofrthEnums?.OrderStatus.SHIPPED) &&
                                                <Fragment>
                                                    <button className="btn btn-white dropdown-toggle shadow-none" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                        <i className="fa fa-download me-1"></i> Download
                                                    </button>
                                                    <ul className="dropdown-menu download-invoices-links py-0">
                                                        <li className='rounded-0 border-0'>
                                                            <Link to={`/invoice/${state.order_object_id}/${state._id}/SELLER`} className="btn text-start" target="_blank"> <i className="fa fa-user me-1"></i> Seller Invoice</Link>
                                                        </li>
                                                        <li className='rounded-0 border-0'>
                                                            <Link to={`/invoice/${state.order_object_id}/${state._id}/USER`} className="btn text-start" target="_blank"> <i className="fa fa-users me-1"></i> Customer Invoice</Link>
                                                        </li>
                                                    </ul>
                                                </Fragment>}

                                        </div>
                                        <ul className=' common-card-title list-unstyled product-detail-list'>
                                            <li className="d-flex mb-2">
                                                <b className='flex-grow-1 w-50'>Amount</b>
                                                <span className='flex-grow-1 w-50'>&#36;{state?.actual_product_price ? state?.actual_product_price : 0}</span>
                                            </li>
                                            <li className="d-flex mb-2">
                                                <b className='flex-grow-1 w-50'>Discount</b>
                                                <span className='flex-grow-1 w-50'>{total_discount ? total_discount : 0}%</span>
                                            </li>
                                            <li className="d-flex mb-2">
                                                <b className='flex-grow-1 w-50'>Coupon Discount</b>
                                                <span className='flex-grow-1 w-50'>&#36;{state?.coupon_discount ? state?.coupon_discount : 0}</span>
                                            </li>
                                            <li className="d-flex mb-2">
                                                <b className='flex-grow-1 w-50'>Final Amount</b><span className='flex-grow-1 w-50'>&#36;{state?.total_price ? state?.total_price : 0}</span>
                                            </li>
                                            <li className="d-flex mb-2">
                                                <b className='flex-grow-1 w-50'>Seller Payout</b>
                                                <span className='flex-grow-1 w-50'>&#36;{state?.seller_earnings ? state?.seller_earnings : "Not Avaiable"}</span>
                                            </li>
                                            <li className="d-flex mb-2">
                                                <b className='flex-grow-1 w-50'>Platform Earning </b>
                                                <span className='flex-grow-1 w-50'>&#36;{state?.admin_commision ? state?.admin_commision : "Not Avaiable"}</span>
                                            </li>

                                            {state?.coupon_discount !== 0 &&
                                                <li className="d-flex mb-2">
                                                    <b className='flex-grow-1 w-50'>Discount</b>
                                                    <span className='flex-grow-1 w-50'>{state?.coupon_discount}%</span>
                                                </li>}
                                            <li className="d-flex mb-2">
                                                <b className='flex-grow-1 w-50'>Tax:</b>
                                                <span className='flex-grow-1 w-50'>&#36;{state?.tax_percentage ? state?.tax_percentage : 0}</span>
                                            </li>

                                        </ul>
                                    </div>
                                    {/* Order Status */}
                                    <div className="common-card h-100">
                                        <div className="common-card-title">
                                            <h5>Order Status</h5>
                                        </div>
                                        <div className="common-card-content">
                                            <div className="product-detail-box">
                                                <ul className='list-unstyled'>
                                                    <li><p className='mb-2 fw-bold'>Order Status------</p>
                                                        <OrderStatus {...state} />
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Ratings  */}
                        <div className="row gy-3">
                            {state?.reviews?.map((res: any) => {
                                return (
                                    <div className="col-md-12">
                                        <div className="common-card h-100">
                                            <div className="common-card-title">
                                                <h5>Review</h5>
                                            </div>
                                            <div className="common-card-content">
                                                {/* 1  */}
                                                <div className='rating-box'>
                                                    <div className="rating-username product-image-table d-flex gap-2 mb-2">
                                                        <img src={res.user_id?.profile_pic ? `${henceforthApi.API_FILE_ROOT_SMALL}${res.user_id?.profile_pic}` : profile_placeholder} className="border rounded-circle" alt="img" />
                                                        <div>
                                                            <p className='fw-bold'>{res?.user_id?.name ? res.user_id?.name : "Not Avaibale"}</p>
                                                            <ul className='list-unstyled d-flex gap-1 rating-icons m-0'>
                                                                <li><i className='fa fa-star text-warning'></i></li>
                                                                <li><i className='fa fa-star text-warning'></i></li>
                                                                <li><i className='fa fa-star text-warning'></i></li>
                                                                <li><i className='fa fa-star text-warning'></i></li>
                                                                <li><i className='fa fa-star text-warning'></i></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <p className='fw-bold'>{res.title}</p>
                                                        <p className='my-1'>{res.description}</p>
                                                        <p className='fw-bold'>{moment(Number(res.created_at)).format('ddd DD MMM, YYYY HH:MM:A')}</p>
                                                        <div className='review-img'>
                                                            {Array.isArray(res?.images) && res?.images?.length ? <img src={henceforthApi.FILES.imageSmall(res?.images[0])} alt="img" /> : <img src={profile_placeholder} alt='' />}

                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='divider my-3'></div>
                                                {/* 2  */}

                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        {Array.isArray(state?.other_order_items) && state?.other_order_items.length !== 0 &&
                            <div className="col-sm-12">
                                {/* Title  */}
                                <div className="common-card">
                                    <div className="common-card-title d-flex justify-content-between align-align-items-center">
                                        <h5>Other items in this order</h5>
                                    </div>
                                    <div className="common-card-content">

                                        <div className='data-list-table table-responsive mb-3'>
                                            <table className="table table-striped align-middle">
                                                <thead className=''>
                                                    <tr>
                                                        <th>Sr.No</th>
                                                        <th>Order ID</th>
                                                        <th>Customer Detail</th>
                                                        <th>Seller Detail</th>
                                                        <th>Product ID</th>
                                                        <th>Product Detail</th>
                                                        <th>Product Price</th>
                                                        <th>Order Status</th>
                                                        <th>Earning</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {state.other_order_items.map((res: any, index: any) => <OrderOtherRowListing key={res._id} {...res} index={index} />)}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>}
                    </div>
                </section>
            </div>
        </>
    )
}
export default OrderDetails;