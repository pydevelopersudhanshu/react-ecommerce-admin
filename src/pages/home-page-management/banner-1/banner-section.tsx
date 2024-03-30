import '../../../assets/styles/pages.scss'
import { Link, useMatch, useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import henceforthApi from '../../../utils/henceforthApi'
import { GlobalContext, handleError } from '../../../context/Provider'
import EnableDisable from '../../../components/common/enableDisable'
import BreadCrumb from '../../../components/common/BreadCrumb'
import Spinner from '../../../components/BootstrapCompo'
import NODATA from '../../../assets/images/no-data-found.svg'
import { INSUFFICIENT_PERMISSIONS } from '../../../context/actionTypes'

const BannerSection = () => {
    let breadCrumbPath = [
        { name: 'Home', url: `/`, active: '' },
        { name: 'Banner list', url: ``, active: 'not-allowed' }
    ]
    const { loading, setLoading, authState } = useContext(GlobalContext)
    const navigate = useNavigate()
    const match = useMatch("management/banner/:type/:page")
    let limit = 10;
    const [state, setState] = useState({
        data: [],
        total_count: 0,

    })
    const [checkenable, setcheckenable] = useState([])
    let checkdata = checkenable[0]
    const initialise = async () => {
        try {
            setLoading(true)
            const apiRes = await henceforthApi.HomeManagemnt.bannerlisting(String(match?.params.type).toUpperCase(), Number(match?.params.page) - 1, limit)
            setState(apiRes.data)
            setcheckenable({
                ...apiRes.data.data.map((items: any) => {
                    if (items.is_enable === true) {
                        return true
                    }
                })
            })
            setLoading(false)

        } catch (error: any) {
            if (error?.response?.body?.error === INSUFFICIENT_PERMISSIONS) {
                window.history.back()
            }
        }
    }
    const enableDisable = async () => {

        try {
            const data = {
                position: match?.params.type?.toUpperCase(),
                is_enable: checkdata === true ? false : true
            }
            let apiRes = await henceforthApi.enableDisable.enableDisableBanner(data)
            initialise()
        } catch (error) {
            handleError(error)
        } finally {

        }
    }
    const onChangeType = (value: string) => {
        navigate(`/management/banner/${value}/1`)
    }
    useEffect(() => {
        initialise()
    }, [match?.params.type, match?.params.page, authState?.lang])

    console.log(state)
    return (
        <>
            {/* breadcrum  */}
            <section className="breadcrum-box">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className='d-flex justify-content-between align-items-center flex-column flex-md-row'>
                                <div>
                                    <BreadCrumb pathNameDeclare={breadCrumbPath} />
                                </div>
                                {/*  button  */}
                                <div className='buttons-box'>
                                    <div className='d-inline-flex gap-3 flex-column flex-sm-row'>
                                        <Link to={`/management/banner/${match?.params.type}/add`} className="btn btn-white btn-sm" type="button"> <i className='fa fa-plus me-1'></i>Add</Link>
                                        <select className="btn btn-white btn-sm" value={match?.params.type} onChange={(e) => onChangeType(e.target.value)}>
                                            <option value="top">Top</option>
                                            <option value="middle">Middle</option>
                                            <option value="bottom">Bottom</option>
                                        </select>
                                        <EnableDisable checkdata={checkdata} isEnableDisable={enableDisable} loading={loading} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* page  */}

            {loading ? <div className='vh-100 d-flex justify-content-center py-5'> <Spinner /></div> :
                <div className='page-spacing'>
                    <section className='product-listing'>
                        <div className="container-fluid">
                            <div className="row gy-3 justify-content-center">
                                {/* 1  */}
                                {Array.isArray(state?.data) && (state?.data.length) ? state?.data.map((res: any, index: any) => <div className="col-md-6 col-lg-4 px-xs-0">
                                    <div className="common-card h-100">
                                        <div className="common-card-content d-flex h-100 flex-column">
                                            {/* image  */}
                                            <div className="profile-image">
                                                <img src={`${henceforthApi.API_FILE_ROOT_ORIGINAL}${res.image}`} alt="img" className='img-fluid' />
                                            </div>
                                            {/* Product Detail  */}
                                            <div className="profile-image my-4">
                                                {/* <p className="d-flex align-items-center mb-1"><span className='fw-bold me-2'>Title:</span>{res.title}</p>
                                            <p className="d-flex align-items-center mb-1"><span className='fw-bold me-2'>Sub Title:</span>{res.sub_title}</p> */}
                                                <p className="d-flex align-items-center mb-1"><span className='fw-bold me-2'>Category level-1:</span> {res.category_id?.name}</p>
                                                <p className="d-flex align-items-center mb-1"><span className='fw-bold me-2'>Category level-2:</span> {res.subcategory_id?.name}</p>
                                                {res.sub_subcategory_id?.name &&
                                                    <p className="d-flex align-items-center mb-1"><span className='fw-bold me-2'>Category level-3:</span>{res.sub_subcategory_id?.name}</p>}
                                                <p className="d-flex align-items-center mb-1"><span className='fw-bold me-2'>Brand:</span>{res.brand_id?.name}</p>
                                            </div>
                                            {/* button  */}
                                            <div className="profile-button d-flex gap-2 mt-auto">
                                                <Link to={`/management/banner/${match?.params.type}/${res._id}/view`} className='btn btn-white bg-danger text-white border-danger w-100'> <i className='fa fa-eye me-1'></i>View</Link>
                                                <Link to={`/management/banner1/${match?.params.type}/${res._id}/edit`} className='btn btn-theme w-100'><i className='fa fa-pencil me-2'></i> Edit</Link>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                ) : <div className='text-center'><img src={NODATA} width="100" /><p className='text-center mt-3'>No data found</p></div>}
                            </div>

                        </div>
                    </section>
                </div>}

        </>
    )
}
export default BannerSection;