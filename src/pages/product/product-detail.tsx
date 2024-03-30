import profile_img1 from '../../assets/images/pages/laptop.jpg';
import '../../assets/styles/pages.scss'

import { Link, useMatch } from 'react-router-dom'
import henceforthApi from '../../utils/henceforthApi';
import { useContext, useEffect, useState } from 'react';
import { GlobalContext, handleError } from '../../context/Provider';
import moment from 'moment';
import Spinner from '../../components/BootstrapCompo';
import { numberWithCommas } from '../../utils/validations';
import profile_placeholder from '../../assets/images/pages/profile_placeholder.png'
import { INSUFFICIENT_PERMISSIONS } from '../../context/actionTypes';

const ViewProductDetail = () => {
    const { authState, loading, setLoading } = useContext(GlobalContext)
    const match = useMatch('/product/:id')
    const [showLess, setShowLess] = useState(true);
    const [state, setState] = useState<any>({
        _id: "",
        name: "",
        description: "",
        product_type: "",
        added_by: {
            _id: "",
            name: "",
        },
        category_id: {
            _id: "",
            name: "",
        },
        subcategory_id: {
            _id: "",
            name: "",
        },
        sub_subcategory_id: {
            _id: "",
            name: "",
        },
        brand_id: {
            _id: "",
            name: "",
        },
        images: [],
        quantity: "",
        price: "",
        discount_percantage: "",
        discount: "",
        discount_price: "",
        total_reviews: "",
        total_ratings: "",
        productdetails: [],
        product_services: [],
        product_highlights: [],
        faqs_products: [],
        product_variations: [],
        ratings: [],
    })

    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => { setIsReadMore(!isReadMore) };

    const productDetail = async () => {
        setLoading(true)
        try {
            let res = (await henceforthApi.ProductList.getProductDetail(match?.params.id)).data
            setState(res)
        } catch (error: any) {
            if (error?.response?.body?.error === INSUFFICIENT_PERMISSIONS) {
                window.history.back()
            }
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        productDetail()

    }, [authState?.lang])
    const faqReadMore = (id: number, showHide: boolean) => {
        state.faqs_products[id].readMore = showHide
        setState({
            ...state
        })
    }
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
                        <div className="row gy-3">
                            <div className="col-sm-12 px-xs-0 mb-3">
                                {/* Title  */}
                                <div className="common-card">
                                    <div className="common-card-title">
                                        <h5>Product Detail</h5>
                                    </div>
                                    {/* Profile  */}
                                    <div className="common-card-content">
                                        <div className="row gy-3">
                                            <div className="col-md-5">
                                                <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="true">
                                                    <div className="carousel-indicators">
                                                        {Array.isArray(state.images) ? state.images.map((res: any, index: number) => {
                                                            return (
                                                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={index} className={`${index === 0 ? "active" : ""} ${state.images.length === 1 ? "d-none" : ""}`} aria-current="true" aria-label={`Slide ${index + 1}`}></button>
                                                            )
                                                        }) : <img src={profile_placeholder} />}
                                                    </div>
                                                    <div className="carousel-inner product-images">
                                                        {Array.isArray(state.images) ? state.images.map((res: any, index: number) => {
                                                            return (
                                                                <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={index}>
                                                                    <img src={`${henceforthApi.API_FILE_ROOT_MEDIUM}${res}`} className="d-block w-100" alt={res} />
                                                                </div>
                                                            )
                                                        }) : <div className="carousel-item active">
                                                            <img src={profile_placeholder} className="d-block w-100" alt="img" />
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
                                                    <h2 className='fw-bolder'>{state?.name ? state?.name.charAt(0).toUpperCase() + state?.name?.slice(1) : "Not Available"}</h2>
                                                    <div className='d-flex align-items-center gap-1'>
                                                        <h2 className='fw-bold m-0'>&#36; {state?.price ? numberWithCommas(state.price) : "Not Available"}</h2><small>Exclude Tax</small>
                                                    </div>
                                                    <div className="divider my-3"></div>
                                                    <div className='mb-3'>
                                                        <h4 className='fw-bolder'>Product description</h4>
                                                        <p>{state?.description ? state?.description : "Not Available"}</p>
                                                        <p className='testimonials__quote__text'>
                                                            {isReadMore ? state?.product_id?.description.slice(0, 150) : state?.product_id?.description}
                                                            {/* // condition that will render 'read more' only if the text.length is greated than 150 chars */}
                                                        </p>
                                                        {state?.product_id?.description.length > 150 &&
                                                            <span onClick={toggleReadMore}>
                                                                {isReadMore ? '...Read more' : 'Read less'}
                                                            </span>
                                                        }
                                                    </div>
                                                    <ul className='list-unstyled product-detail-list'>
                                                        <li className="d-flex mb-2 flex-column flex-sm-row product-detail-params"><b>Product ID:</b><span>{state?.prodct_id ? state?.prodct_id : "Not Available"}</span></li>

                                                        <li className="d-flex mb-2 flex-column flex-sm-row product-detail-params"><b>Category Level-1:</b><span>{state.category_id.name}</span></li>

                                                        <li className="d-flex mb-2 flex-column flex-sm-row product-detail-params"><b>Category Level-2:</b><span>{state?.subcategory_id ? state?.subcategory_id?.name : "Not Available"}</span></li>
                                                        {state?.sub_subcategory_id &&
                                                            <li className="d-flex mb-2 flex-column flex-sm-row product-detail-params"><b>Category Level-3:</b><span>{state?.sub_subcategory_id?.name}</span></li>}

                                                        <li className="d-flex mb-2 flex-column flex-sm-row product-detail-params"><b>Brand:</b><span>{state?.brand_id ? state?.brand_id?.name : "Not Available"}</span></li>

                                                        <li className="d-flex mb-2 flex-column flex-sm-row product-detail-params"><b>Discount:</b><span>{state?.discount_percantage ? `${state?.discount_percantage}%` : "Not Available"}</span></li>
                                                    </ul>
                                                </div>
                                                <div className="divider my-3"></div>
                                                {/* highlights  */}
                                                <div className="product-highlights-box">
                                                    <h4 className='fw-bolder'>Highlights</h4>
                                                    <ul className='product-detail-list ps-0 list-unstyled'>
                                                        {Array.isArray(state.product_highlights) ? state.product_highlights.map((res: any) =>
                                                            <li key={res._id} className="mb-2"><i className="fa fa-list fs-5 me-2 align-middle" aria-hidden="true"></i>{res.content}</li>
                                                        ) : "Not Available"}
                                                    </ul>
                                                </div>
                                                <div className="divider my-3"></div>
                                                {/* Specifications  */}
                                                <div className="product-highlights-box">
                                                    <h4 className='fw-bolder'>Specifications</h4>
                                                    <ul className='list-unstyled product-detail-list'>
                                                        {Array.isArray(state.productdetails) && state.productdetails.length ? state.productdetails.map((res: any) => {
                                                            return (

                                                                <li className="d-flex mb-2 justify-content-between gap-5" key={res._id}>
                                                                    <b><i className="fa fa-list fs-5 me-2 align-middle" aria-hidden="true"></i>{res.key}</b>
                                                                    <span className='flex-grow-1'>{res.value}
                                                                    </span>
                                                                </li>
                                                            )
                                                        }) : "Not Available"}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row gy-3 mb-3">
                            {/* Product Variables  */}
                            <div className="col-sm-12 col-lg-4 px-xs-0">
                                <div className="common-card h-100">
                                    <div className="common-card-title">
                                        <h5 className='fw-bolder'>Product Variable</h5>
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
                                                    {Array.isArray(state.product_variations) && state.product_variations.length ?
                                                        state.product_variations.map((res: any, index: number) => {
                                                            return (
                                                                <tr key={res._id}>
                                                                    <td>{index + 1}</td>
                                                                    <td>{res.name ? res.name : 'Not Avaiable'}</td>
                                                                    {Array.isArray(res.images) && res.images.length ? <td><img src={henceforthApi.FILES.imageSmall(res.images[0])} className="w-25" /></td> : <img src={profile_placeholder} />}
                                                                    <td>&#36;{res.price ? res.price : 'Not Avaiable'}</td>
                                                                </tr>
                                                            );
                                                        }) : <tr><td colSpan={4} className="text-center">Not Available</td></tr>}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* services  */}
                            <div className="col-sm-6 col-lg-4 px-xs-0">
                                <div className="common-card h-100">
                                    <div className="common-card-title">
                                        <h5>Services</h5>
                                    </div>
                                    <div className="common-card-content">
                                        <ul className='product-detail-list ps-0 list-unstyled'>
                                            {Array.isArray(state.product_services) && state.product_services.length ? state.product_services.map((res: any) => {
                                                return (
                                                    <li key={res._id} className="text-capitalize"><i className="fa fa-list fs-5 me-2 align-middle" aria-hidden="true"></i>{res.content}</li>
                                                )
                                            }) : <li>Not Available</li>}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {/* Delivery  */}
                            <div className="col-sm-6 col-lg-4 px-xs-0">
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
                                                        <th>Address</th>
                                                        <th>Radius</th>
                                                        {/* <th>Action</th> */}
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {Array.isArray(state?.delivery_locations) && state?.delivery_locations.length ? state?.delivery_locations?.map((res: any, index: number) =>
                                                        <tr>
                                                            <td>{index + 1}</td>
                                                            <td>{res.address}</td>
                                                            <td>{res.radius}{res.units}</td>
                                                        </tr>
                                                    ) : <tr className='text-center py-3'><td colSpan={3}>No Data Found</td></tr>}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Ratings  */}
                        <div className="row gy-3">
                            <div className="col-md-6 px-xs-0">
                                <div className="common-card h-100">
                                    <div className="common-card-title">
                                        <h5>Ratings</h5>
                                    </div>
                                    <div className="common-card-content">
                                        {/* 1  */}
                                        {Array.isArray(state.ratings) && state.ratings.length ? state.ratings.map((res: any) => {
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
                            <div className="col-md-6 px-xs-0">
                                <div className="common-card h-100">
                                    <div className="common-card-title">
                                        <h5>FAQ</h5>
                                    </div>
                                    <div className="common-card-content">
                                        <div className='faq-content-box'>
                                            <div className="accordion" id="faqAccordion">
                                                {/* 1 */}
                                                {Array.isArray(state.faqs_products) && state.faqs_products.length ? state.faqs_products.map((res: any, index: any) => {
                                                    return (
                                                        <div className="accordion-item bg-transparent border border-1 mb-3 position-relative" key={index}>
                                                            <h2 className="accordion-header" id="faqOne">
                                                                <button className="accordion-button shadow-none bg-transparent text-black" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseOne${res._id}`} aria-expanded="true" aria-controls="collapseOne">
                                                                    <p className="">
                                                                        <b className='me-1'>Q.</b> {res.question}
                                                                    </p>
                                                                </button>
                                                            </h2>
                                                            <div id={`collapseOne${res._id}`} className="accordion-collapse collapse " aria-labelledby="faqOne" data-bs-parent="#faqAccordion">
                                                                <div className="accordion-body border-top border-1 bg-transparent" >
                                                                    <p className='d-flex text-black'><b className='me-1 hellos'>A.</b><span className='hellos text-black' dangerouslySetInnerHTML={{ __html: res?.answer.length ? !res.readMore ? `${res?.answer.slice(0, 300)}` : res?.answer : '' }} /> </p>
                                                                    {res?.answer?.length > 300 ? <p className='ReadMore text-muted ps-3' role="button" onClick={() => faqReadMore(index, !res.readMore)}>{!res.readMore ? 'Read More' : 'Read Less'} </p> : ''}
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
export default ViewProductDetail;