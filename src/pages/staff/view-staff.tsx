import defaultIcon from '../../assets/images/default.jpg';
import '../../assets/styles/pages.scss'
import { Link, useMatch } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react';
import henceforthApi from '../../utils/henceforthApi';
import DownloadFileModal from '../../components/common/download-file-modal';
import { GlobalContext, handleError } from '../../context/Provider';
import profile_placeholder from '../../assets/images/pages/profile_placeholder.png'
import Spinner from '../../components/BootstrapCompo';
const ViewStaff = () => {
    const { authState } = useContext(GlobalContext);
    const match = useMatch("staff/:_id")
    const [loading, setLoading] = useState(false)
    const [state, setState] = useState({
        data: {
            _id: "",
            name: "",
            image: "",
            email: "",
            country_code: "",
            phone_number: "",
            roles: [],
            super_admin: false,
            is_blocked: false,
            is_deleted: true,
            created_at: ""
        }
    } as any)


    const initialise = async () => {

        try {
            const apiRes = await henceforthApi.Staff.get(match?.params?._id as string)
            setState(apiRes)
        } catch (error) {

        }
    }
    const onChangeDelete = async () => {
        setLoading(true)
        const data = {
            _id: match?.params._id,
            is_deleted: state.is_deleted = true
        }
        try {
            const apiRes = await henceforthApi.Staff.delete(data)
            window.history.back()
        } catch (error) {
            handleError(error)
        } finally {
            setLoading(false)
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
                            <h2 className='fw-semibold'>View Staff</h2>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb m-0">
                                    <li className="breadcrumb-item"><Link to="">Home</Link></li>
                                    <li className="breadcrumb-item active fw-bold">View Staff</li>
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
                        <div className="row justify-content-center">
                            <div className="col-sm-9 col-md-6 col-lg-5 col-xl-4 col-xxl-3 px-0">
                                {/* Title  */}
                                <div className="common-card">
                                    <div className="common-card-title">
                                        <h5>View Staff</h5>
                                    </div>
                                    {/* Profile  */}
                                    <div className="common-card-content">
                                        {/* Profile image  */}
                                        <div className="profile-image">
                                            <img src={state?.data?.image ? `${henceforthApi.API_FILE_ROOT_MEDIUM}${state?.data?.image}` : profile_placeholder} alt="img" className='img-fluid' />
                                        </div>
                                        {/* Name & Phone Detail  */}
                                        <div className="profile-image my-4">
                                            <p className='mb-3 text-uppercase'><i className='fa fa-user me-2 fs-5'></i>{state?.data?.name}</p>
                                            <p className="d-flex align-items-center mb-0"><i className='fa fa-phone-square me-2 fs-5'></i>{state.data.roles.map((item: string, index: number) => `${item}${state.data.roles.length - 1 === index ? '' : ','} `)}</p>
                                        </div>
                                        {/* button  */}
                                        <div className="profile-button">
                                            <ul className='list-unstyled d-flex gap-2'>
                                                <li className='w-100'><button type='button' className='btn btn-white w-100 bg-danger text-white' onClick={onChangeDelete}><i className='fa fa-trash me-1'></i>{loading ? <Spinner /> : 'Delete'}</button></li>
                                                <li className='w-100'> <Link to="edit" className='btn btn-theme w-100'><i className='fa fa-pencil me-1'></i> Edit</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <DownloadFileModal />
        </>
    )
}
export default ViewStaff;