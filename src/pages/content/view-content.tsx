import '../../assets/styles/auth.scss'
import '../../assets/styles/pages.scss'
import { Link, useMatch } from 'react-router-dom'
import profile_img from '../../assets/images/pages/profile-image.jpg'
import { useContext, useEffect, useState } from 'react'
import henceforthApi from '../../utils/henceforthApi'
import profile_placeholder from '../../assets/images/pages/profile_placeholder.png'
import { GlobalContext } from '../../context/Provider'


interface detail {
    description: string,
    image_url: string
}
const ViewContent = () => {
    const { authState } = useContext(GlobalContext);
    const match: any = useMatch("/view-content/:id")
    const [data, setData] = useState({
        description: "",
        image_url: ""
    } as detail)
    const detail = async () => {
        let apiRes = await henceforthApi.Policies.detail(match?.params.id)
        setData(apiRes.data)
    }
    useEffect(() => {
        detail()
    }, [authState?.lang])
    return (
        <>
            {/* breadcrum  */}
            <section className="breadcrum-box">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            {/* title  */}
                            <h2 className='fw-semibold'>View Content</h2>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb m-0">
                                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                    <li className="breadcrumb-item active fw-bold">View Content</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
            {/* page  */}
            <div className='page-spacing'>
                <section className='product-listing'>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="common-card">
                                    <div className="common-card-title">
                                        <h5>View Content</h5>
                                    </div>
                                    <div className="common-card-content">
                                        {/* image */}
                                        <div className='upload-fields-box mb-3'>
                                            <div className='banner-view-image mb-2'>
                                                <img src={data?.image_url ? `${henceforthApi.API_FILE_ROOT_ORIGINAL}${data?.image_url}` : profile_placeholder} alt="img" className='w-100' />
                                            </div>
                                        </div>
                                        {/* Banner Detail  */}
                                        <div className="profile-image my-4">
                                            {/* <h5 className='mb-3'>About Page</h5> */}
                                            <p className="d-flex align-items-center mb-1" dangerouslySetInnerHTML={{ __html: data?.description }}>

                                            </p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}
export default ViewContent;