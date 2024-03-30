import profile_img from '../../assets/images/pages/profile-image.jpg';
import '../../assets/styles/pages.scss'
import { Link, useMatch } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react';
import henceforthApi from '../../utils/henceforthApi';
import { GlobalContext, handleError } from '../../context/Provider';
import Spinner from '../../components/BootstrapCompo';
import moment from 'moment';
import { numberWithCommas } from '../../utils/validations';
import { sellerProduct } from '../../context/interfaces';
import profile_img1 from '../../assets/images/pages/laptop.jpg';
import profile_placeholder from '../../assets/images/pages/profile_placeholder.png'
import { INSUFFICIENT_PERMISSIONS } from '../../context/actionTypes';


const ViewProduct = () => {

    const { authState, authDispatch } = useContext(GlobalContext);
    const match = useMatch(`/seller/view-product/:_id`)
    const [loading, setloading] = useState(false)
    const [state, setstate] = useState<sellerProduct>()

    const initialise = async () => {
        setloading(true)
        try {
            let apires = await henceforthApi.ProductList.getProductDetail(match?.params._id)
            setstate(apires.data)
        } catch (error: any) {
            if (error?.response?.body?.error === INSUFFICIENT_PERMISSIONS) {
                window.history.back()
            }
        } finally {
            setloading(false)
        }
    }
    useEffect(() => {
        initialise()
    }, [authState?.lang])

    return (
        <>
            <section className="breadcrum-box">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            {/* title  */}
                            <h2 className="fw-semibold">Product Detail</h2>
                            {/* breadcrum  */}
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb m-0">
                                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                    <li className="breadcrumb-item active fw-bold">Product Detail</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
            {/* page  */}
            {loading ? <div className='vh-100 d-flex justify-content-center py-5'>
                <Spinner />
            </div> : <div className='page-spacing'>
                <section className='product-detail'>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-12">
                                {/* Title  */}
                                <div className="common-card">
                                    <div className="common-card-title">
                                        <h5>Product Detail</h5>
                                    </div>
                                    {/* Profile  */}
                                    <div className="common-card-content">
                                        <div className="row">
                                            <div className="col-md-5">
                                                <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="true">
                                                    <div className="carousel-indicators">
                                                        {Array.isArray(state?.images) ? state?.images.map((res: any, index: number) => {
                                                            return (
                                                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={index} className={index === 0 ? "active" : ""} aria-current="true" aria-label={`Slide ${index + 1}`}></button>
                                                            )
                                                        }) : ""}
                                                    </div>
                                                    <div className="carousel-inner product-images">
                                                        {Array.isArray(state?.images) ? state?.images.map((res: any, index: number) => {
                                                            return (
                                                                <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={index}>
                                                                    <img src={`${henceforthApi.API_FILE_ROOT_MEDIUM}${res}`} className="d-block w-100" alt={res} />
                                                                </div>
                                                            )
                                                        }) : <div className="carousel-item active">
                                                            <img src={""} className="d-block w-100" alt="img" />
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
                                                    <h2 className='fw-bolder'>{state?.name ? state?.name : "Not Available"}</h2>
                                                    <div className='d-flex align-items-center gap-1'>
                                                        <h2 className='fw-lighter m-0'>&#36;{state?.price ? numberWithCommas(state.price) : "Not Available"} </h2><small>Exclude Tax</small>
                                                        <p> </p>
                                                    </div>
                                                    <div className="divider my-3"></div>
                                                    <div className='mb-3'>
                                                        <h4 className='fw-bolder'>Product description</h4>
                                                        {/* <p>{state?.description ? state?.description : "Not Available"}</p> */}
                                                    </div>
                                                    <ul className='list-unstyled product-detail-list'>
                                                        <li className="d-flex mb-2"><b className='w-25'>Product ID:</b><span className='flex-grow-1 w-75'>{state?.prodct_id ? state?.prodct_id : "Not Available"}</span></li>

                                                        <li className="d-flex mb-2"><b className='w-25'>Category Level-1:</b><span className='flex-grow-1 w-75'>{state?.category_id.name ? state?.category_id.name : "Not Available"}</span></li>

                                                        <li className="d-flex mb-2"><b className='w-25'>Category Level-2:</b><span className='flex-grow-1 w-75'>{state?.subcategory_id ? state?.subcategory_id?.name : "Not Available"}</span></li>

                                                        <li className="d-flex mb-2"><b className='w-25'>Category Level-3:</b><span className='flex-grow-1 w-75'>{state?.sub_subcategory_id?.name ? state?.sub_subcategory_id?.name : "Not Avaiable"}</span></li>

                                                        <li className="d-flex mb-2"><b className='w-25'>Brand:</b><span className='flex-grow-1 w-75'>{state?.brand_id ? state?.brand_id?.name : "Not Available"}</span></li>

                                                        <li className="d-flex mb-2"><b className='w-25'>Discount:</b><span className='flex-grow-1 w-75'>{state?.discount_percantage ? state?.discount_percantage : 'Not Avaiable'}{state?.discount_percantage ? '%' : ''}</span></li>

                                                        <li className="d-flex mb-2"><b className='w-25'>Tax:</b><span className='flex-grow-1 w-75'>{state?.tax_percentage ? state?.tax_percentage : 'Not Avaiable'}{state?.tax_percentage ? '%' : ''}</span></li>

                                                    </ul>
                                                </div>
                                                <div className="divider my-3"></div>
                                                {/* highlights  */}
                                                <div className="product-highlights-box">
                                                    <h2 className='fw-bolder'>Highlights</h2>
                                                    <ul className='product-detail-list ps-0'>
                                                        {Array.isArray(state?.product_highlights) && (state?.product_highlights.length) ?
                                                            state?.product_highlights.map((res: any) => <li >{res.content}</li>) : <td colSpan={9}>No data found</td>}
                                                    </ul>
                                                </div>
                                                <div className="divider my-3"></div>
                                                {/* Specifications  */}
                                                <div className="product-highlights-box">
                                                    <h2 className='fw-bolder'>Specifications</h2>
                                                    <ul className='list-unstyled product-detail-list'>
                                                        {Array.isArray(state?.productdetails) && (state?.productdetails.length) ?
                                                            state?.productdetails.map((res: any, index: any) =>
                                                                <li className="d-flex mb-2" >
                                                                    <b className='w-25'>{res.key}</b>
                                                                    <span className='flex-grow-1 w-75'>{res.value}</span>
                                                                </li>
                                                            ) : <td colSpan={9} className="text-center">No data found</td>}</ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            {/* Product Variables  */}
                            <div className="col-md-6 mb-3">
                                <div className="common-card h-100">
                                    <div className="common-card-title">
                                        <h5>Product Variable</h5>
                                    </div>
                                    <div className="common-card-content">
                                        <div className='data-list-table table-responsive mb-3'>
                                            <table className="table table-striped align-middle">
                                                <thead className=''>
                                                    <tr>
                                                        <th>S.No.</th>
                                                        <th>Title</th>
                                                        <th>Image</th>
                                                        <th>Price</th>
                                                        {/* <th>Action</th> */}
                                                    </tr>
                                                </thead>

                                                <tbody>
                                                    {Array.isArray(state?.product_variations) && (state?.product_variations?.length) ?
                                                        state?.product_variations?.map((res: any, index: any) => {
                                                            return (
                                                                <tr>
                                                                    <td>{index + 1}</td>
                                                                    <td>{res.name ? res.name : 'Not Avaiable'}</td>
                                                                    {Array.isArray(res.images) && res.images.length ? <td><img src={henceforthApi.FILES.imageSmall(res.images[0])} className="w-25" /></td> : <img src={profile_placeholder} />}
                                                                    <td>&#36;{res?.price ? res?.price : 'Not Avaiable'}</td>
                                                                </tr>
                                                            )
                                                        })
                                                        : <tr><td colSpan={4} className="text-center">Not Available</td></tr>}

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* services  */}
                            <div className="col-md-6 mb-3">
                                <div className="common-card h-100">
                                    <div className="common-card-title">
                                        <h5>Services</h5>
                                    </div>
                                    <div className="common-card-content">
                                        <ul className='product-detail-list ps-0'>
                                            {Array.isArray(state?.product_services) && (state?.product_services?.length)
                                                ? state?.product_services.map((res: any) => {
                                                    return (
                                                        <li>{res.content}</li>
                                                    )
                                                })
                                                : ""}


                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {/* Delivery  */}

                        </div>
                        <div className='row'>
                            <div className="col-md-12 mb-3">
                                <div className="common-card h-100">
                                    <div className="common-card-title">
                                        <h5>Delivery</h5>
                                    </div>
                                    <div className="common-card-content">
                                        <div className='data-list-table table-responsive mb-3'>
                                            <table className="table table-striped align-middle">
                                                <thead className=''>

                                                    <tr>
                                                        <th>S.No.</th>
                                                        <th>address</th>
                                                        <th>Delivery</th>
                                                        <th>Radius</th>
                                                        {/* <th>Action</th> */}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {Array.isArray(state?.delivery_locations) && state?.delivery_locations.length ? state?.delivery_locations.map((res: any, index: any) => {
                                                        return (
                                                            <>
                                                                <tr>
                                                                    <td>{index + 1}</td>
                                                                    <td>{res.address ? res.address : "Not Avaiable"}</td>
                                                                    <td>{res.delivery_time ? res.delivery_time : 'Not Avaiable'}</td>
                                                                    <td>{res.radius ? res.radius : "Not Avaiable"}{res.radius ? 'Kms' : ''}</td>

                                                                </tr>
                                                            </>
                                                        )
                                                    }) : <tr><td colSpan={4} className="text-center">Not Available</td></tr>}



                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Ratings  */}
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <div className="common-card h-100">
                                    <div className="common-card-title">
                                        <h5>Ratings</h5>
                                    </div>
                                    <div className="common-card-content">
                                        1
                                        {Array.isArray(state?.ratings) && state?.ratings.length ? state.ratings.map((res: any) => {
                                            let stared = [...Array(res?.ratings)].map((e, i) => <li key={i}><i className="fa fa-star text-warning"></i></li>)
                                            let staredOff = [...Array(5 - res?.ratings)].map((e, i) => <li key={i}><i className="fa fa-star text-muted"></i></li>)
                                            return (
                                                <>
                                                    <div className='rating-box'>
                                                        <div className="rating-username product-image-table d-flex gap-2 mb-2">
                                                            <img src={res?.user_id?.profile_pic !== null && res?.user_id !== null ? `${henceforthApi.API_FILE_ROOT_MEDIUM}${res.user_id.profile_pic}` : profile_img1} className="border rounded-circle" alt="img" />
                                                            <div>
                                                                <p className='fw-bold'>{res?.user_id?.name ? res?.user_id?.name : "Not Available"}</p>
                                                                <ul className='list-unstyled d-flex gap-1 rating-icons m-0'>
                                                                    {stared}{staredOff}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div>

                                                            <p className='fw-bold'>{res?.title ? res?.title : "Not Avaialable"}</p>
                                                            <p className='my-1'> {res?.description ? res?.description : "Not Avaialable"} </p>
                                                            <p className='fw-bold'>{res?.created_at ? moment.unix(res?.created_at).format('MMMM Do YYYY, h:mm:ss a') : "Not Avaiable"}</p>
                                                        </div>
                                                    </div>
                                                    <div className='divider my-3'></div>
                                                </>
                                            )
                                        }) : <p>Not Available </p>}
                                    </div>
                                </div>
                            </div>
                            {/* Faq  */}
                            <div className="col-md-6 mb-3">
                                <div className="common-card h-100">
                                    <div className="common-card-title">
                                        <h5>FAQ</h5>
                                    </div>
                                    <div className="common-card-content">
                                        <div className='faq-content-box'>
                                            <div className="accordion" id="faqAccordion">
                                                {/* 1 */}
                                                {Array.isArray(state?.faqs_products) && state?.faqs_products.length ? state?.faqs_products.map((res: any, index: any) => {
                                                    return (
                                                        <div className="accordion-item border-0 mb-3 position-relative" key={index}>
                                                            <h2 className="accordion-header" id="faqOne">
                                                                <button className="accordion-button shadow-none" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseOne${res._id}`} aria-expanded="true" aria-controls="collapseOne">
                                                                    <b className='me-1'>Q.</b> {res.question}
                                                                </button>
                                                            </h2>
                                                            <div id={`collapseOne${res._id}`} className="accordion-collapse collapse " aria-labelledby="faqOne" data-bs-parent="#faqAccordion">
                                                                <div className="accordion-body border-0" >
                                                                    <p ><b className='me-1'>A.</b> <span dangerouslySetInnerHTML={{ __html: res.answer }} /> </p>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    )
                                                }) : "Not Available"}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>}
        </>
    )
}
export default ViewProduct;