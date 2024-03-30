
import '../../assets/styles/auth.scss'
import '../../assets/styles/pages.scss'
import { Link } from 'react-router-dom'
import profile_image from '../../assets/images/pages/profile-image.jpg'
import { useContext, useEffect, useState } from 'react'
import henceforthApi from '../../utils/henceforthApi'
import { GlobalContext, handleError } from '../../context/Provider'
import { content } from '../../context/interfaces'
import profile_pic from "../../assets/images/profile_placeholder.png"
import profile_placeholder from '../../assets/images/pages/profile_placeholder.png'
import BreadCrumb from '../../components/common/BreadCrumb'
import Spinner from '../../components/BootstrapCompo'
import NODATA from '../../assets/images/no-data-found.svg'

interface contentResponse {
    type: string,
    description: string
    image_url: string
    _id: string
}
let breadCrumbPath = [
    { name: 'Home', url: `/`, active: '' },
    { name: 'Content', url: ``, active: 'not-allowed' }
]

const Content = () => {
    const { loading, setLoading, authState } = useContext(GlobalContext);

    const [state, setState] = useState({
        data: []
    } as content)

    const initialise = async () => {
        setLoading(true)
        try {
            let apiRes = await henceforthApi.Content.AboutusList()
            setState(apiRes)
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

            <BreadCrumb pathNameDeclare={breadCrumbPath} />

            {/* page  */}
            {loading ? <div className='vh-100 d-flex justify-content-center py-5'> <Spinner /></div> :
                <div className='page-spacing'>
                    <section className='product-listing'>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="common-card">
                                        <div className="common-card-title">
                                            <div className='d-flex align-items-center justify-content-between'>
                                                <h5>Content</h5>
                                            </div>
                                        </div>

                                        <div className="common-card-content">
                                            <div className='data-list-table table-responsive mb-3'>
                                                <table className="table table-striped align-middle">
                                                    <thead className=''>
                                                        <tr>
                                                            <th>Sr.No.</th>
                                                            <th>Title</th>
                                                            <th>Image</th>
                                                            <th>Content</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {Array.isArray(state?.data) && (state?.data.length) ? state?.data.map((res: contentResponse, index: any) => {
                                                            return (
                                                                <>
                                                                    <tr>
                                                                        <td>{index + 1}</td>
                                                                        <td>{res.type}</td>
                                                                        <td className='product-image-table'>
                                                                            <img src={res?.image_url ? `${henceforthApi.API_FILE_ROOT_SMALL}${res?.image_url}` : profile_placeholder} alt="img" className='' />
                                                                        </td>
                                                                        <td>
                                                                            <div className='page-content-box'>
                                                                                <h3></h3>
                                                                                <p className='panel-text-truncate' dangerouslySetInnerHTML={{ __html: res.description }}></p>
                                                                            </div>
                                                                        </td>
                                                                        <td><div className="btn-group gap-2">
                                                                            <Link to={`/view-content/${res?._id}`} className="btn btn-white btn-sm"> <i className='fa fa-eye me-1'></i>View</Link>
                                                                            <Link to={`/edit-content/${res?.type}`} className="btn btn-white btn-sm" type="button"> <i className='fa fa-sign-in me-1'></i>Edit</Link>
                                                                        </div>
                                                                        </td>
                                                                    </tr>

                                                                </>
                                                            )
                                                        }) : <tr><td className='text-center py-3' colSpan={5}><img src={NODATA} width="100" /><p className='text-center mt-3'>No data found</p></td></tr>}
                                                    </tbody>

                                                </table>
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
export default Content;