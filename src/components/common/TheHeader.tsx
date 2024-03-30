import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useContext } from "react";
import { GlobalContext, handleError } from '../../context/Provider';
import Notificationheader from '../../pages/notifications/notification-header';
import henceforthApi from '../../utils/henceforthApi';
import Swal from 'sweetalert2';
import profile_placeholder from '../../assets/images/pages/profile_placeholder.png'
import henceofrthEnums from '../../utils/henceofrthEnums';
import { Select } from 'antd';
import loginSuccess from '../../context/actions/auth/loginSuccess';
import { capitalise } from '../../utils/validations';

const TheHeader = (props: any) => {
    const { logOutNow, loading, setLoading, authDispatch, authState, LanguageChange1 } = useContext(GlobalContext);
    const roles = (Array.isArray(authState.roles) ? authState.roles : [])
    const location = useLocation()
    const [hideShow, setHideShow] = useState(true)
    const [lang, setLang] = useState('ENGLISH')

    const toggleHandler = (pass: boolean) => {
        setHideShow(false)
        props.changeDiv(pass)
    }
    const toggleHandler2 = (passed: Boolean) => {
        setHideShow(true)
        props.changeDiv(passed)
    }
    const [messages, setMessages] = useState({
        unread_notifications: [],
        read_notifications: [],
        unread_count: 0
    })

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
    const onChangeLanguage = (value: string) => {
        loginSuccess({ lang: value })(authDispatch)
    }
    const getMessagesApi = async () => {
        try {
            let res = (await henceforthApi.Notification.getNotification(0, 10))
            setMessages(res)
        } catch (err) {
            handleError(err)
        }
    }
    const markClearNotification = async (seletApi: string) => {
        if (loading) return
        setLoading(true)
        try {
            if (seletApi) await henceforthApi.Notification.markAllAsRead({})
            else await henceforthApi.Notification.clearAllNotification({})
            await getMessagesApi()
        } catch (error) {
            handleError(error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        getMessagesApi()
    }, [location.pathname, authState?.lang])
    return (

        <div className="container-fluid">
            <div className="row border-bottom">
                <nav className="navbar d-flex justify-content-between align-items-center p-3 bg-white" role="navigation" style={{ marginBottom: "0" }}>
                    {/* left side  */}
                    <div className="navbar-header d-none d-sm-block">
                        {hideShow ? <button className="btn btn-theme shadow-none rounded-1" onClick={() => toggleHandler(false)}><i className="fa fa-bars"></i></button>
                            : <button className="btn btn-theme shadow-none rounded-1" onClick={() => toggleHandler2(true)}><i className="fa fa-bars"></i></button>}
                    </div>

                    {/* right side  */}
                    <ul className="nav gap-2 gap-md-3 main-nav align-items-center ms-auto justify-content-md-start">
                        {/* welcome text  */}
                        <li>
                            {/* <Link to={`/user/${res._id}`} className="btn btn-white btn-sm"> <i className='fa fa-eye me-1'></i>View</Link> */}
                            {/* <div className="btn-group gap-2">
                                <a className="btn btn-white btn-sm text-decoration-none" href={`https://sharedecommerce.seller.henceforthsolutions.com/signin?user_key=&access_token=${authState.access_token}`} target="_blank" rel="noreferrer">
                                    <i className='fa fa-sign-in me-1'></i>Login Seller
                                </a>
                            </div> */}
                        </li>
                        {!hideShow ? <li className="header-profile-dropdown">
                            <div className="dropdown">
                                <button className="btn shadow-none border-0 dropdown-toggle p-0 text-muted" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src={authState.image ? `${henceforthApi.API_FILE_ROOT_MEDIUM}${authState.image}` : profile_placeholder} className="rounded-circle" />
                                </button>
                                <ul className="dropdown-menu py-0">
                                    <li className='px-2 pt-2'><Link className="dropdown-item" to="/profile">Profile</Link></li>
                                    {(roles.includes(henceofrthEnums.Roles.STAFF_MEMBER) || authState.super_admin) ?
                                        <li className='px-2 pt-2'><Link className="dropdown-item" to="/staffs/1">Staff</Link></li>
                                        : ""}
                                    <li className='px-2 pt-2'><Link className="dropdown-item" to="/change-password">Change Password</Link></li>
                                    <li className='divider'></li>
                                    <li className='px-2 py-2'><Link className="dropdown-item" to="" onClick={logOut}>Logout</Link></li>
                                </ul>
                            </div>
                        </li> : ""

                        }

                        <li className="header-profile-dropdown">
                            {/* <div className="dropdown"> */}
                            {/* <button className="btn shadow-none border-0 dropdown-toggle p-0 text-muted" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="fa fa-bell"></i>
                                </button> */}
                            <ul className=" py-0">
                                {/* <Select id="bew"
                                    defaultValue="Whats_New"
                                    className=""
                                    // style={{ backgroundColor: 'green' }}
                                    value={lang}
                                    onChange={(value: any) => LanguageChange1(value as string)}
                                    style={{ width: '100%', fontWeight: 700 }} bordered={false}
                                    options={[
                                        {
                                            value: "ENGLISH",
                                            label: `English`,
                                        },
                                        {
                                            value: "ARABIC",
                                            label: `Arabic`,
                                        },
                                    ]}
                                /> */}
                            </ul>
                            {/* </div> */}
                        </li>
                        {/* Language  */}
                        <li className="header-profile-dropdown">
                            <div className="dropdown">
                                <button className="btn shadow-none border-0 dropdown-toggle p-0 text-muted" type="button" data-bs-toggle="dropdown" aria-expanded="false" >
                                    <i className="fa fa-sharp fa-solid fa-globe"></i>
                                </button>
                                <ul className="dropdown-menu py-0" onChange={(e: any) => console.log(e)} >

                                    {/* <li className='px-2 pt-2' onClick={onChangeLanguage}>ENGLISH</li> */}
                                    <li className='px-2 pt-2' role="button" onClick={() => onChangeLanguage(henceofrthEnums.Language.ENGLISH)}>{capitalise(henceofrthEnums.Language.ENGLISH)}</li>
                                    <li className='divider'></li>
                                    <li className='px-2 py-2' role="button" onClick={() => onChangeLanguage(henceofrthEnums.Language.ARABIC)}>{capitalise(henceofrthEnums.Language.ARABIC)}</li>
                                </ul>
                            </div>
                        </li>
                        {/* Notifications  */}
                        <li>
                            <div className="dropdown">
                                <button className="btn btn-secondary dropdown-button position-relative bg-transparent border-0" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="fa fa-bell"></i>  <span className="custom-badge badge rounded-1 text-bg-success text-white">{messages?.unread_count === 0 ? '' : messages?.unread_count}</span>
                                </button>
                                <ul className="dropdown-menu dropdown-menu-end py-0 border-0 notification-dropdown">
                                    <li className='px-3 py-2 border-bottom d-flex gap-2 justify-content-between'>
                                        <button className='btn p-0 text-success fw-semibold' onClick={() => { markClearNotification('markDone') }}>Mark all as read</button>
                                        <button className='btn p-0 text-danger fw-semibold' onClick={() => { markClearNotification('') }}>Clear</button>
                                    </li>
                                    <Notificationheader NotificationHeading="News for you" checkLength={messages.unread_notifications.length} Array={messages?.unread_notifications} Notifications="Nothing new for you." />
                                    <li></li>
                                    <Notificationheader NotificationHeading="Previous notifications" checkLength={messages.read_notifications.length} Array={messages?.read_notifications} Notifications=" " readNotification={true} viewAll={messages?.unread_notifications.length === 10 || messages?.read_notifications.length === 10} />
                                </ul>
                            </div>
                        </li>
                        {/* Logout button  */}
                        <li>
                            <button type="button" className="btn btn-theme shadow-none logout-btn border-0 fw-fw-semibold text-white" onClick={logOut} >
                                <i className="fa fa-sign-out text-white me-1"></i> Log out
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div >

    )
}

export default TheHeader;