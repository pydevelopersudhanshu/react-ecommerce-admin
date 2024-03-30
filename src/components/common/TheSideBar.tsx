import { Link, useLocation, useParams } from 'react-router-dom';
import henceforthApi from '../../utils/henceforthApi';
import henceofrthEnums from '../../utils/henceofrthEnums';
import { Fragment, useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../context/Provider';
import Swal from 'sweetalert2';
import profile_placeholder from '../../assets/images/pages/profile_placeholder.png'
// import {STAFF_MEMBER,DASHBOARD,USERS,CONTACT,CONTENT,HOME_MANAGEMENT,DB_BACKUP,FAQ,SELLER,PRODUCTS,ORDER,COUPONS,CATEGORY,BRAND,NOTIFICATION} from '../../context/actionTypes'
// import {  } from "../../../constants/actionTypes";
// import {Roles} from "../../utils/henceofrthEnums"
interface stryleCategory {
    _id: string
    name: string
}
const TheSideBar = (props: any) => {
    const { authState, authDispatch, logOutNow } = useContext(GlobalContext);
    const roles = (Array.isArray(authState.roles) ? authState.roles : [])
    const location = useLocation()
    const { page, _id, name, style_id, type } = useParams()

    const [category, setCategory] = useState<Array<stryleCategory>>([])

    const logOut = async () => {
        Swal.fire({
            title: "Are you sure?",
            text: "Are You sure want to Logout!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `Yes`,
        }).then(async (result: any) => {
            if (result.isConfirmed) {
                logOutNow()
            }
        })
    }
    const styleFor = async () => {
        const apiRes = await henceforthApi.HomeManagemnt.styleforlist()
        setCategory(apiRes?.data?.data)
    }
    useEffect(() => {
        styleFor()
    }, [authState?.lang])

    return (
        <Fragment>
            {/* sidebar Header  */}
            <div className="sidebar-header">
                <div className='desktop-screen'>
                    {/* user detail  */}
                    <div className="user-detail-box">
                        <img src={authState.image ? `${henceforthApi.API_FILE_ROOT_ORIGINAL}${authState.image}` : profile_placeholder} className="rounded-circle mb-1" alt="img" />
                    </div>
                    <div className="dropdown mt-1">
                        {props.handled ? <button className="btn shadow-none border-0 dropdown-toggle p-0 text-muted" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {authState.name}
                        </button> : <span className='text-muted'>{authState.name}</span>}
                        <ul className="dropdown-menu py-0 overflow-hidden">
                            <li className='px-2 pt-2'><Link className="dropdown-item" to="/profile">Profile</Link></li>
                            {(roles.includes(henceofrthEnums.Roles.STAFF_MEMBER) || authState.super_admin) ?
                                <li className='px-2 pt-2'><Link className="dropdown-item" to="/staffs/1">Staff</Link></li>
                                : ""}
                            <li className='px-2 pt-2'><Link className="dropdown-item" to="/change-password">Change Password</Link></li>
                            <li className='divider'></li>
                            <li className='px-2 py-2'><Link className="dropdown-item" to="" onClick={logOut}>Logout</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            {/* navigation bar  */}
            <div className='navigation-bar'>
                <div className="accordion" id="Navigation-bar">
                    {/* Dashboard */}
                    {(roles.includes(henceofrthEnums.Roles.DASHBOARD) || authState.super_admin) ?
                        <div className={`accordion-item rounded-0 ${location.pathname === '/' ? 'link-active' : ''}`}>
                            <h6 className="accordion-header">
                                <Link to="/" className="accordion-button shadow-none d-flex align-items-center collapsed text-decoration-none single-link">
                                    <i className={`fa fa-th-large ${props.handled ? "me-3" : "mx-auto"} fs-5`}></i> {props.handled && <span>Dashboard</span>}
                                </Link>
                            </h6>
                        </div> : ""}
                    {/* Staff  */}
                    {/* <div className={`accordion-item rounded-0 ${location.pathname.startsWith('/staff') ? 'link-active' : ''}`}>
                                <h6 className="accordion-header">
                                    <Link to="/staffs/1" className="accordion-button shadow-none d-flex align-items-center collapsed text-decoration-none single-link">
                                        <i className='fa fa-user-circle-o me-3 fs-5'></i> {props.handled &&<span>Staff</span>}
                                    </Link>
                                </h6>
                            </div> */}
                    {/* User  */}
                    {(roles.includes(henceofrthEnums.Roles.USERS) || authState.super_admin) ?
                        <div className={`accordion-item rounded-0 ${location.pathname.startsWith('/user') ? 'link-active' : ''}`}>
                            <h6 className="accordion-header">
                                <Link to="/users/1" className="accordion-button shadow-none d-flex align-items-center collapsed text-decoration-none single-link">
                                    <i className={`fa fa-users fs-5 ${props.handled ? "me-3" : "mx-auto"}`}></i> {props.handled && <span>User</span>}
                                </Link>
                            </h6>
                        </div> : ""}
                    {/* Seller  */}
                    {(roles.includes(henceofrthEnums.Roles.SELLER) || authState.super_admin) ?
                        <div className={`accordion-item rounded-0 ${location.pathname.startsWith('/seller') ? 'link-active' : ''}`}>
                            <h6 className="accordion-header">
                                <Link to="/sellers/1" className="accordion-button shadow-none d-flex align-items-center collapsed text-decoration-none single-link">
                                    <i className={`fa fa-vcard fs-5 ${props.handled ? "me-3" : "mx-auto"}`}></i> {props.handled && <span>Seller</span>}
                                </Link>
                            </h6>
                        </div> : ""}
                    {/* Products  */}
                    {(roles.includes(henceofrthEnums.Roles.PRODUCTS) || authState.super_admin) ?
                        <div className={`accordion-item rounded-0 ${location.pathname.startsWith('/product') ? 'link-active' : ''}`}>
                            <h6 className="accordion-header">
                                <Link to="/products/1" className="accordion-button shadow-none d-flex align-items-center collapsed text-decoration-none single-link">
                                    <i className={`fa fa-laptop fs-5 ${props.handled ? "me-3" : "mx-auto"}`}></i> {props.handled && <span>Product</span>}
                                </Link>
                            </h6>
                        </div> : ""}
                    {/* Order  */}
                    {(roles.includes(henceofrthEnums.Roles.ORDER) || authState.super_admin) ?
                        <div className={`accordion-item rounded-0 ${location.pathname.startsWith('/order') ? 'link-active' : ''}`}>
                            <h6 className="accordion-header">
                                <Link to="/orders/1" className="accordion-button shadow-none d-flex align-items-center collapsed text-decoration-none single-link">
                                    <i className={`fa fa-shopping-cart fs-5 ${props.handled ? "me-3" : "mx-auto"}`}></i> {props.handled && <span>Orders</span>}
                                </Link>
                            </h6>
                        </div> : ""}
                    {/* Coupons  */}
                    {/* {(roles.includes(henceofrthEnums.Roles.COUPONS)||authState.super_admin) ?
                        <div className={`accordion-item rounded-0 ${location.pathname.startsWith('/coupon') ? 'link-active' : ''}`}>
                            <h6 className="accordion-header">
                                <Link to="/coupon/1" className="accordion-button shadow-none d-flex align-items-center collapsed text-decoration-none single-link">
                                    <i className='fa fa-gift me-3 fs-5'></i> {props.handled && <span>Coupons</span>}
                                </Link>
                            </h6>
                        </div>:""} */}
                    {/* Coupons  */}
                    {(roles.includes(henceofrthEnums.Roles.COUPONS) || authState.super_admin) ?
                        <div className={`accordion-item rounded-0 ${location.pathname.startsWith('/coupons') ? 'link-active' : ''}`}>
                            <h6 className="accordion-header" id="LinkThree4">
                                <button className="accordion-button shadow-none d-flex align-items-center collapsed " type="button" data-bs-toggle="collapse" data-bs-target="#sidebarThree1" aria-expanded="false" aria-controls="sidebarThree">
                                    <i className={`fa fa-gift fs-5 ${props.handled ? "me-3" : "mx-auto ps-1 pe-3"}`}></i> {props.handled && <span >Coupons</span>}
                                </button>
                            </h6>
                            <div id="sidebarThree1" className="accordion-collapse collapse" aria-labelledby="LinkThree" data-bs-parent="#Navigation-bar">
                                <div className={`accordion-body pt-0`}>
                                    <ul className={`list-unstyled  sidebar-sublink ${props.handled ? "ps-4" : "ps-3"}`}>

                                        <li>
                                            <Link to="/coupons/1"
                                                className={location.pathname === `/coupons/${page}` ? "text-white fs-bold " : location.pathname === `/coupons/add` ? 'text-white' : location.pathname === `/coupons/${_id}/edit` ? 'text-white' : ''}>  <i className={`fa fa-gift fs-5 ${props.handled ? "me-1" : ""}`}></i> {props.handled && <span >Coupons</span>}</Link>
                                        </li>


                                        <li >
                                            <Link to="/coupons/promotional" className={location.pathname === '/coupons/promotional' ? 'text-white fs-bold' : ''}>
                                                <i className={`fa fa-thumb-tack fs-5 ${props.handled ? "me-1" : ""}`}></i>
                                                {props.handled && <span >Home Promotional Coupon</span>}</Link>
                                        </li>

                                    </ul>
                                </div>
                            </div>
                        </div> : ""}
                    {/* Rating & Review */}
                    {(roles.includes(henceofrthEnums.Roles.REATING) || authState.super_admin) ?
                        <div className={`accordion-item rounded-0 ${location.pathname.startsWith('/rating/1') ? 'link-active' : ''}`}>
                            <h6 className="accordion-header">
                                <Link to="/rating/1" className="accordion-button shadow-none d-flex align-items-center collapsed text-decoration-none single-link">
                                    <i className={`fa fa-star fs-5 ${props.handled ? "me-3" : "mx-auto"}`}></i> {props.handled && <span>Rating & Review</span>}
                                </Link>
                            </h6>
                        </div> : ""}
                    {/* Earning*/}
                    {(roles.includes(henceofrthEnums.Roles.REATING) || authState.super_admin) ?
                        <div className={`accordion-item rounded-0 ${location.pathname.startsWith('/earning/1') ? 'link-active' : ''}`}>
                            <h6 className="accordion-header">
                                <Link to="/earning/1" className="accordion-button shadow-none d-flex align-items-center collapsed text-decoration-none single-link">
                                    <i className={`fa fa fa-dollar fs-5 ${props.handled ? "me-3" : "mx-auto"}`}></i> {props.handled && <span>Earning</span>}
                                </Link>
                            </h6>
                        </div> : ""}
                    {/* Home Page Management  */}
                    {(roles.includes(henceofrthEnums.Roles.HOME_MANAGEMENT) || authState.super_admin) ?
                        <div className={`accordion-item rounded-0 ${location.pathname.startsWith('/management') ? 'link-active' : ''}`}>
                            <h6 className="accordion-header" id="LinkThree2">
                                <button className="accordion-button shadow-none d-flex align-items-center collapsed text" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarThree" aria-expanded="false" aria-controls="sidebarThree">
                                    <i className={`fa fa-list-ul fs-5 ${props.handled ? "me-3" : "mx-auto pe-3"}`}></i> {props.handled && <span>Home Managment</span>}
                                </button>
                            </h6>
                            <div id="sidebarThree" className="accordion-collapse collapse" aria-labelledby="LinkThree" data-bs-parent="#Navigation-bar">
                                <div className="accordion-body pt-0">
                                    <ul className={`list-unstyled sidebar-sublink ${props.handled ? "ps-4" : "ps-2"}`}>
                                        {/* Banner-1  */}
                                        <li ><Link to="/management/banner/top/1"
                                            className={location.pathname.startsWith('/management/banner') ? 'text-white fs-bold' : ''}>{props.handled ? "Banner" : <i className="fa fa-picture-o fs-5" aria-hidden="true"></i>}</Link></li>

                                        {/* Deal of the day  */}
                                        <li ><Link to="/management/deals/1"
                                            className={location.pathname.startsWith('/management/deals') ? 'text-white fs-bold' : ''}>{props.handled ? "Deals of the day" : <i className="fa fa-gift fs-5" aria-hidden="true"></i>}</Link></li>

                                        {/* Top Deals  */}
                                        <li><Link to="/management/top-deal/1"
                                            className={location.pathname === '/management/top-deal/1' ? 'text-white fs-bold' :
                                                location.pathname === '/management/top-deal/add' ? 'text-white fs-bold' :
                                                    location.pathname === `/management/edit-top/${_id}` ? 'text-white fs-bold' : ''}>{props.handled ? "Top Deals " : <i className="fa fa-handshake-o fs-5" aria-hidden="true"></i>}</Link></li>

                                        {/* Fashion Deals  */}
                                        <li><Link to="/management/fashion-deal/1" className={location.pathname === `/management/fashion-deal/${page}` ? 'text-white fs-bold' :
                                            location.pathname === '/management/fashion-deal/add' ? 'text-white fs-bold' :
                                                location.pathname === `/management/fashion/${_id}/edit` ? 'text-white fs-bold' : ''}>{props.handled ? "Fashion Deals" : <i className="fa fa-user-o fs-5" aria-hidden="true"></i>}</Link></li>

                                        {/* Styles  */}
                                        <li>
                                            <div className="accordion" id="Navigation-Inner">
                                                <div className={`accordion-item rounded-0 ${location.pathname.startsWith('unknown') ? 'link-active' : ''}`}>
                                                    <h6 className="accordion-header" id="styleLinks">
                                                        <button className="accordion-button shadow-none d-flex align-items-center collapsed ps-0" type="button" data-bs-toggle="collapse" data-bs-target="#InnerOne" aria-expanded="false" aria-controls="InnerOne">
                                                            <i className={`fa fa-user-circle fs-5 ${props.handled ? "me-3" : "me-1"}`}></i><span>{props.handled ? "Styles" : ""}</span>
                                                        </button>
                                                    </h6>
                                                    <div id="InnerOne" className="accordion-collapse collapse" aria-labelledby="styleLinks" data-bs-parent="#Navigation-Inner">
                                                        <div className={`accordion-body pt-0 ${props.handled ? "" : "px-0"}`}>
                                                            <ul className='list-unstyled sidebar-sublink ps-2'>
                                                                {category?.map(item => <li><Link to={`/management/style-for/${item?.name.toLowerCase()}/${item?._id}/1`}
                                                                    className={item._id == _id ? 'text-white fs-bold' : item._id == style_id ? 'text-white fs-bold' : ''}><span className={`${props.handled ? "" : "d-none"}`}></span> {item?.name.toLowerCase()} </Link></li>)}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                        {/* Featured Categories  */}
                                        <li><Link to="/management/featured-categories/1"
                                            className={location.pathname === `/management/featured-categories/${page}` ? 'text-white fs-bold' :
                                                location.pathname === `/management/featured-categories/add` ? 'text-white fs-bold' :
                                                    location.pathname === `/management/featured/${_id}/edit` ? 'text-white' : ''}>{props.handled ? "Featured Categories of Week" : <i className="fa fa-calendar-check-o fs-5" aria-hidden="true"></i>}</Link></li>
                                        {/* Shop with us  */}
                                        <li><Link to="/management/shop-with-us/1"
                                            className={location.pathname === `/management/shop-with-us/${page}` ? 'text-white fs-bold' :
                                                location.pathname === `/management/shop-with-us/add` ? 'text-white fs-bold' :
                                                    location.pathname === `/management/shop/${_id}/edit` ? 'text-white fs-bold' : ''}>{props.handled ? "Shop with us" : <i className="fa fa-shopping-basket fs-5" aria-hidden="true"></i>}</Link></li>
                                        {/* Best of electronics */}
                                        <li><Link to="/management/best-of-ecommerce/1"
                                            className={location.pathname === `/management/best-of-ecommerce/${page}` ? 'text-white fs-bold' :
                                                location.pathname === `/management/best-of-ecommerce/add` ? 'text-white fs-bold' :
                                                    location.pathname === `/management/ecommerce/${_id}/edit` ? 'text-white fs-bold' : ''}>{props.handled ? "Best of E-commerce" : <i className="fa fa-heart fs-5" aria-hidden="true"></i>}</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div> : ""}
                    {/* Catgeory  */}
                    {
                        (roles.includes(henceofrthEnums.Roles.CATEGORY) || authState.super_admin) ?
                            <div className={`accordion-item rounded-0 ${location.pathname.startsWith('/category') ? 'link-active' : ''}`}>
                                <h6 className="accordion-header" id="subCategoriesThree">
                                    <button className="accordion-button shadow-none d-flex align-items-center collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#subCateThree" aria-expanded="false" aria-controls="subCateThree">
                                        <i className={`fa fa-cutlery fs-5 ${props.handled ? "me-3" : "mx-auto pe-3"}`}></i> {props.handled && <span>Category</span>}
                                    </button>
                                </h6>
                                <div id="subCateThree" className="accordion-collapse collapse" aria-labelledby="subCategoriesThree" data-bs-parent="#Navigation-bar">
                                    <div className="accordion-body pt-0">
                                        <ul className={`list-unstyled sidebar-sublink ${props.handled ? "ps-4" : "ps-2"}`}>
                                            <li><Link to="/category/level-1/1"
                                                className={location.pathname === `/category/level-1/${page}` ? 'text-white fs-bold'
                                                    : location.pathname === '/category/level-1/add' ? 'text-white fs-bold'
                                                        : location.pathname === `/category/level-1/edit/${name}/${type}/${_id}` ? 'text-white fs-bold' : ''}>{props.handled ? "Sub-Sub-Category (level 1)" : "L-1"}</Link></li>
                                            <li><Link to="/category/level-2/1" className={location.pathname === `/category/level-2/${page}` ? 'text-white fs-bold' : location.pathname === '/category/level-2/add' ? 'text-white fs-bold' :
                                                location.pathname === `/category/level-2/edit/${name}/${_id}` ? 'text-white fs-bold' : ''}>{props.handled ? "Sub-Sub-Category (level 2)" : "L-2"}</Link></li>
                                            <li><Link to="/category/level-3/1"
                                                className={location.pathname === `/category/level-3/${page}` ? 'text-white fs-bold' :
                                                    location.pathname === `/category/level-3/add` ? 'text-white fs-bold' :
                                                        location.pathname === `/category/level-3/edit/${name}/${_id}` ? 'text-white fs-bold' : ''}> {props.handled ? "Sub-Sub-Category (level 3)" : "L-3"}</Link></li>
                                        </ul>
                                    </div>
                                </div>
                            </div> : ""
                    }
                    {/* Brands  */}
                    {
                        (roles.includes(henceofrthEnums.Roles.BRAND) || authState.super_admin) ?
                            <div className={`accordion-item rounded-0 ${location.pathname.startsWith('/brands') ? 'link-active' : ''}`}>
                                <h6 className="accordion-header">
                                    <Link to="/brands/1" className="accordion-button shadow-none d-flex align-items-center collapsed text-decoration-none single-link">
                                        <i className={`fa fa-building-o fs-5 ${props.handled ? "me-3" : "mx-auto"}`}></i> {props.handled && <span>Brands</span>}
                                    </Link>
                                </h6>
                            </div> : ""
                    }
                    {/* Content  */}
                    {
                        (roles.includes(henceofrthEnums.Roles.CONTENT) || authState.super_admin) ?
                            <div className={`accordion-item rounded-0 ${location.pathname.startsWith('/content') ? 'link-active' : ''}`}>
                                <h6 className="accordion-header">
                                    <Link to="/content" className="accordion-button shadow-none d-flex align-items-center collapsed text-decoration-none single-link">
                                        <i className={`fa fa-folder fs-5 ${props.handled ? "me-3" : "mx-auto"}`}></i> {props.handled && <span>Pages</span>}
                                    </Link>
                                </h6>
                            </div> : ""
                    }



                    {/* FAQ  */}
                    {
                        (roles.includes(henceofrthEnums.Roles.FAQ) || authState.super_admin) ?
                            <div className={`accordion-item rounded-0 ${location.pathname.startsWith('/faq') ? 'link-active' : ''}`}>
                                <h6 className="accordion-header">
                                    <Link to="/faq" className="accordion-button shadow-none d-flex align-items-center collapsed text-decoration-none single-link">
                                        <i className={`fa fa-question-circle fs-5 ${props.handled ? "me-3" : "mx-auto"}`}></i> {props.handled && <span>FAQ</span>}
                                    </Link>
                                </h6>
                            </div> : ""
                    }
                    {/* Contact  */}
                    {
                        (roles.includes(henceofrthEnums.Roles.CONTACT) || authState.super_admin) ?
                            <div className={`accordion-item rounded-0 ${location.pathname.startsWith('/contact') ? 'link-active' : ''}`}>
                                <h6 className="accordion-header">
                                    <Link to="/contact-us/1" className="accordion-button shadow-none d-flex align-items-center collapsed text-decoration-none single-link">
                                        <i className={`fa fa-address-book fs-5 ${props.handled ? "me-3" : "mx-auto"}`}></i> {props.handled && <span>Contact</span>}
                                    </Link>
                                </h6>
                            </div> : ""
                    }
                    {/* Notification  */}
                    {
                        (roles.includes(henceofrthEnums.Roles.NOTIFICATION) || authState.super_admin) ?
                            <div className={`accordion-item rounded-0 ${location.pathname.startsWith('/notification') ? 'link-active' : ''}`}>
                                <h6 className="accordion-header">
                                    <Link to="/notifications" className="accordion-button shadow-none d-flex align-items-center collapsed text-decoration-none single-link">
                                        <i className={`fa fa-bell fs-5 ${props.handled ? "me-3" : "mx-auto"}`}></i> {props.handled && <span>Notification</span>}
                                    </Link>
                                </h6>
                            </div> : ""
                    }
                    {/* DB Backup  */}
                    {
                        (authState.super_admin) ?
                            <div className={`accordion-item rounded-0 ${location.pathname.startsWith('/language') ? 'link-active' : ''}`}>
                                <h6 className="accordion-header">
                                    <Link to="/main-key/website" className="accordion-button shadow-none d-flex align-items-center collapsed text-decoration-none single-link">
                                        <i className={`fa fa-bell fs-5 ${props.handled ? "me-3" : "mx-auto"}`}></i> {props.handled && <span>Language</span>}
                                    </Link>
                                </h6>
                            </div> : ""
                    }
                    {/* DB Backup  */}
                    {
                        (roles.includes(henceofrthEnums.Roles.DB_BACKUP) || authState.super_admin) ?
                            <div className={`accordion-item rounded-0 ${location.pathname.startsWith('/database') ? 'link-active' : ''}`}>
                                <h6 className="accordion-header">
                                    <Link to="/database" className="accordion-button shadow-none d-flex align-items-center collapsed text-decoration-none single-link">
                                        <i className={`fa fa-database fs-5 ${props.handled ? "me-3" : "mx-auto"}`}></i> {props.handled && <span>DB Backup</span>}
                                    </Link>
                                </h6>
                            </div> : ""
                    }
                    {/* Terms&Condition */}
                    {/* {(roles.includes(henceofrthEnums.Roles.REATING) || authState.super_admin) ?
                        <div className={`accordion-item rounded-0 ${location.pathname.startsWith('/terms-conditions') ? 'link-active' : ''}`}>
                            <h6 className="accordion-header">
                                <Link to="/terms-conditions" className="accordion-button shadow-none d-flex align-items-center collapsed text-decoration-none single-link">
                                    <i className={`fa fa-star fs-5 ${props.handled ? "me-3" : "mx-auto"}`}></i> {props.handled && <span>Terms & Condition</span>}
                                </Link>
                            </h6>
                        </div> : ""} */}
                    {/* Settings */}
                    {/* {(roles.includes(henceofrthEnums.Roles.SETTING) || authState.super_admin) ?
                        <div className={`accordion-item rounded-0 ${location.pathname.startsWith('/setting') ? 'link-active' : ''}`}>
                            <h6 className="accordion-header">
                                <Link to="/setting" className="accordion-button shadow-none d-flex align-items-center collapsed text-decoration-none single-link">
                                    <i className={`fa fa-gear fs-5 ${props.handled ? "me-3" : "mx-auto"}`}></i> {props.handled && <span>Setting</span>}
                                </Link>
                            </h6>
                        </div> : ""} */}
                    {/* Logout  */}
                    <div className={`accordion-item rounded-0`}>
                        <h6 className="accordion-header">
                            <button className="accordion-button shadow-none d-flex align-items-center collapsed text-decoration-none single-link" type="button" onClick={() => logOutNow()}>
                                <i className={`fa fa-sign-out fs-5 ${props.handled ? "me-3" : "mx-auto"}`}></i> {props.handled && <span>Logout</span>}
                            </button>
                        </h6>
                    </div>
                </div >
            </div >
        </Fragment >
    )
}

export default TheSideBar;