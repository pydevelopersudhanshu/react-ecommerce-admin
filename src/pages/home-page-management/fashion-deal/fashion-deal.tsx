import '../../../assets/styles/pages.scss'
import profile_image from '../../../assets/images/pages/profile-image.jpg'
import { Link, useLocation, useMatch, useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import henceforthApi from '../../../utils/henceforthApi'
import PaginationLayout from '../../../components/PaginationLayout'
import { GlobalContext, handleError } from '../../../context/Provider'
import Spinner from '../../../components/BootstrapCompo'
import { toast } from 'react-toastify'
import { numberWithCommas } from '../../../utils/validations'
import EnableDisable from '../../../components/common/enableDisable'
import Swal from 'sweetalert2'
import NODATA from '../../../assets/images/no-data-found.svg'
import { INSUFFICIENT_PERMISSIONS } from '../../../context/actionTypes'


const FashionDeal = () => {

    const { authState
    } = useContext(GlobalContext);
    const match = useMatch("management/fashion-deal/:page")
    let limit = 4
    const navigate = useNavigate()
    const loction: any = useLocation()
    const newParam = new URLSearchParams(loction.search);
    const [state, setstate] = useState({
        data: [] as any
    })
    const [checkenable, setcheckEnable] = useState([])
    let checkdata = checkenable[0]
    const [totalCount, setTotalCount] = useState(0);
    const [loading, setLoading] = useState(false)

    const intialise = async () => {
        try {
            setLoading(true)
            let apires = await henceforthApi.FashionDeals.Fashionlist(
                Number(match?.params.page) - 1,
                limit,
                // authState.lang
            )
            setcheckEnable({
                ...apires.data.data.map((res: any) => {
                    if (res.is_enable === true) {
                        return true
                    }
                })
            })
            setstate(apires.data)
            setTotalCount(apires?.data.total_count)
            console.log(apires)
            setLoading(false)

        } catch (error: any) {
            if (error?.response?.body?.error === INSUFFICIENT_PERMISSIONS) {
                window.history.back()
            }
        }
    }
    const onChangePagination = (newval: any) => {

        navigate({ pathname: `/management/fashion-deal/${newval}`, search: newParam.toString() })

    }
    const isEnableDisable = async () => {
        setLoading(true)
        const data = {
            is_enable: checkdata === true ? false : true
        }
        try {
            let apiRes = await henceforthApi.FashionDeals.isEnableDisable(data)
            toast.success(apiRes.message)
            intialise()
        } catch (error) {
            handleError(error)
        }
        finally {
            setLoading(false)
        }
    }
    const onChangeDelete = async (_id: any, index: any) => {
        let data = state.data;
        data[index].loading = true
        console.log(data)

        setstate({
            ...state,
            data
        })

        Swal.fire({
            title: "Are you sure?",
            text: "Are You sure want to Delete!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#4ade0b",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result: any) => {
            if (result.isConfirmed) {
                try {
                    let apiRes = await henceforthApi.FashionDeals.deleteFshion(_id)
                    // toast.success(apiRes.message)
                    intialise()
                } catch (error) {
                    handleError(error)
                } finally {
                    data[index].loading = false
                }
            }
            data[index].loading = false
            // intialise()
        })
    }
    useEffect(() => {
        intialise()
    }, [match?.params.page, authState?.lang])
    console.log(state)
    return (
        <>
            {/* breadcrum  */}
            <section className="breadcrum-box">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className='d-flex justify-content-between align-items-center flex-column flex-sm-row gap-2'>
                                <div>
                                    {/* title  */}
                                    <h2 className='fw-semibold'>Fashion Deal</h2>
                                    {/* breadcrum  */}
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                            <li className="breadcrumb-item active fw-bold">Fashion Deal</li>
                                        </ol>
                                    </nav>
                                </div>
                                <div className='enable-diable-button d-flex gap-1'>
                                    <Link to="/management/fashion-deal/add" className="btn btn-white btn-sm" type="button"> <i className='fa fa-plus me-1'></i>Add</Link>
                                    <EnableDisable checkdata={checkdata} isEnableDisable={isEnableDisable} loading={loading} />
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
                            <div className="row gy-3">
                                {/* 1  */}
                                {Array.isArray(state?.data) && (state?.data.length) ? state?.data.map((res: any, index: any) => {
                                    return (
                                        <>
                                            <div className="col-md-6 col-lg-6 col-xl-4 px-xs-0">
                                                <div className="common-card h-100">
                                                    <div className="common-card-content d-flex h-100 flex-column">
                                                        {/* image  */}
                                                        <div className="profile-image">
                                                            <img src={res.image ? `${henceforthApi.API_FILE_ROOT_MEDIUM}${res.image}` : "Not Avaiable"} alt="img" className='img-fluid' />
                                                        </div>
                                                        {/* Product Detail  */}
                                                        <div className="profile-image my-4">
                                                            <p className="d-flex align-items-center mb-1"><span className='fw-bold me-2'>Title:</span>{res.title ? res.title : "Not Avaiable"}</p>
                                                            <p className="d-flex align-items-center mb-1"><span className='fw-bold me-2'>Price:</span>&#x24; {res.price ? numberWithCommas(res.price) : "Not Avaiable"}</p>
                                                            <p className="d-flex align-items-center mb-1"><span className='fw-bold me-2'>Category level-1:</span> {res.category_id?.name ? res.category_id?.name : "Not Avaiable"}</p>
                                                            <p className="d-flex align-items-center mb-1"><span className='fw-bold me-2'>Category level-2:</span>{res?.sub_subcategory_id?.name ? res?.sub_subcategory_id?.name : "Not Avaiable"}</p>
                                                            <p className="d-flex align-items-center mb-1"><span className='fw-bold me-2'>Category level-3:</span>{res.subcategory_id?.name ? res.subcategory_id?.name : "Not Avaiable"}</p>
                                                            <p className="d-flex align-items-center mb-1"><span className='fw-bold me-2'>Brand:</span>{res.brand_id?.name ? res.brand_id?.name : "Not Avaiable"}</p>
                                                            <p className="d-flex align-items-center mb-1"><span className='fw-bold me-2'>Discount:</span>{res.discount ? res.discount : "Not Avaiable"}%</p>
                                                        </div>
                                                        {/* button  */}
                                                        <div className="profile-button d-flex gap-2 mt-auto">
                                                            <button className='btn btn-white bg-danger text-white border-danger w-100' onClick={() => onChangeDelete(res._id, index)} ><i className='fa fa-trash me-2'></i>Delete</button>
                                                            <Link to={`/management/fashion/${res._id}/edit`} className='btn btn-theme w-100'><i className='fa fa-pencil me-2'></i> Edit</Link>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </>
                                    )
                                }) : <div className='text-center'><img src={NODATA} width="100" /><p className='text-center mt-3'>No data found</p></div>}

                                {/* 2  */}

                            </div>

                            {/* Pagination  */}
                            {/* <div className="row">
                                <div className="col-md-12">
                                    <div className="common-card">
                                        <div className="common-card-content"> */}
                            <PaginationLayout
                                count={totalCount}
                                data={state?.data}
                                page={Number(match?.params.page)}
                                limit={Number(limit)}
                                onPageChange={(val: any) => onChangePagination(val)}
                            />
                            {/* </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    </section>
                </div>}

        </>
    )
}
export default FashionDeal;