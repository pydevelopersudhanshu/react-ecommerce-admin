import profile_img from '../../assets/images/pages/profile_placeholder.png';
import '../../assets/styles/pages.scss'
import { Link } from 'react-router-dom';
import { Fragment, useContext, useEffect, useState } from 'react';
import { GlobalContext } from '../../context/Provider';
import loginSuccess from '../../context/actions/auth/loginSuccess';
import henceforthApi from '../../utils/henceforthApi';
import { loadavg } from 'os';
import Spinner from '../../components/BootstrapCompo';
import BreadCrumb from '../../components/common/BreadCrumb';
import profile_placeholder from '../../assets/images/pages/profile_placeholder.png'

const Profile = () => {

    let breadCrumbPath = [
        { name: 'Home', url: `/`, active: '' },
        { name: 'Profile', url: ``, active: 'not-allowed' }
    ]

    const { authState, authDispatch, loading, setLoading } = useContext(GlobalContext);


    const [commission, setCommission] = useState({
        data: {
            fee_percent: 0
        }
    } as any)

    const Commission = async () => {
        setLoading(true)
        try {
            let apiRes = await henceforthApi.commission.getCommission()
            setCommission(apiRes?.data)
        } catch (error) {

        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        Commission()
    }, [authState?.lang])


    return (<Fragment>
        {/* breadcrum  */}
        <BreadCrumb pathNameDeclare={breadCrumbPath} />
        {/* page  */}
        <div className='page-spacing'>
            <section className='admin-profile'>
                <div className="container-fluid">
                    <div className="row justify-content-center gy-4">
                        <div className="col-sm-9 col-md-5 col-lg-4 col-xl-4 col-xxl-3">
                            {/* Title  */}
                            <div className="common-card h-100">
                                <div className="common-card-title">
                                    <h5>My Profile</h5>
                                </div>
                                {/* Profile  */}
                                <div className="common-card-content">
                                    {/* Profile image  */}
                                    <div className="profile-image">
                                        <img src={authState.image ? `${henceforthApi.API_FILE_ROOT_MEDIUM}${authState.image}` : profile_img} alt="img" className='img-fluid' />
                                    </div>
                                    {/* Profile Detail  */}
                                    <div className="profile-image my-4">
                                        <h5 className='mb-3'>{authState.name ? authState.name : ""}</h5>
                                        <p className="d-flex align-items-center mb-1">
                                            <i className='fa fa-envelope me-2 fs-5'></i>
                                            {authState.email ? authState.email : ""}
                                        </p>
                                        <p className="d-flex align-items-center">
                                            <i className='fa fa-phone-square me-2 fs-5'></i>
                                            <span>{authState.phone_number}</span>
                                        </p>
                                        <p className="d-flex align-items-start mt-2">
                                            {authState.full_address ? <i className='fa fa-map-marker me-2  fs-5'></i> : ''}
                                            {authState.full_address}
                                        </p>
                                    </div>
                                    {/* button  */}
                                    <div className="profile-button">
                                        <Link to="/edit-profile" className='btn btn-theme w-100'><i className='fa fa-pencil me-2'></i>Edit Profile</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-9 col-md-5 col-lg-4 col-xl-4 col-xxl-3">
                            {/* Title  */}
                            {loading ? <Spinner /> :
                                <div className="common-card h-100 d-flex flex-column">
                                    <div className="common-card-title">
                                        <h5>My Commission</h5>
                                    </div>
                                    <div className="common-card-content">
                                        {/* Profile Detail  */}
                                        <div className="profile-image mb-3">
                                            <b className='me-2'>Commission Fee:</b>
                                            <span >{commission?.data?.fee_percent}%</span>
                                        </div>
                                        {/* button  */}
                                        <div className="profile-button mt-auto">
                                            <Link to={`/edit-commission/${commission?.data?.fee_percent}`} className='btn btn-theme w-100'><i className='fa fa-pencil me-2'></i>Edit Commission</Link>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </section>
        </div >
    </Fragment>
    )
}

export default Profile;