import '../../../assets/styles/pages.scss'
import profile_image from '../../../assets/images/pages/profile-image.jpg'
import { Link, Navigate, useLocation, useMatch, useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import henceforthApi from '../../../utils/henceforthApi'
import { dealsofday } from '../../../context/interfaces'
import PaginationLayout from '../../../components/PaginationLayout'
import { toast } from 'react-toastify'
import { GlobalContext, handleError } from '../../../context/Provider'
import Spinner from '../../../components/BootstrapCompo'
import { numberWithCommas } from '../../../utils/validations'
import EnableDisable from '../../../components/common/enableDisable'
import Swal from 'sweetalert2'
import DealsTimer from './Timer'
import NODATA from '../../../assets/images/no-data-found.svg'
import { INSUFFICIENT_PERMISSIONS } from '../../../context/actionTypes'


const DealOfDay = () => {

    const match: any = useMatch("/management/deals/:page")
    const { authState, authDispatch, loading, setLoading, language } = useContext(GlobalContext);
    const location = useLocation()
    const navigate = useNavigate()
    // const[loading,setLoading]=useState(false)
    let limit = 10
    const [state, setstate] = useState({
        _id: "",
        is_enable: Boolean(""),
        data: [],
        total_count: Number("")
    } as unknown as dealsofday)
    const [totalCount, setTotalCount] = useState(0);
    const [timer, setTimer] = useState<Number>()
    const [getTime, setGetTime] = useState<any>({
        valid_till: ""
    })

    const [checkenable, setcheckenable] = useState([])

    let checkdata = checkenable[0]

    const intialiseTimer = async () => {
        try {

            let apiRes = await henceforthApi.DealsTimer.getTime()
            setGetTime(apiRes.data)
        } catch {

        } finally {

        }
    }

    const intialise = async () => {
        try {
            setLoading(true)
            let apiRes = await henceforthApi.Dealsofday.Dealslist(
                Number(match?.params.page) - 1,
                limit,
            )
            setstate(apiRes.data)
            setcheckenable({
                ...apiRes.data.data.map((res: any) => {
                    if (res.is_enable === true) {
                        return true
                    }
                })
            })
            setTotalCount(apiRes?.data?.total_count)
        } catch (error: any) {
            if (error?.response?.body?.error === INSUFFICIENT_PERMISSIONS) {
                window.history.back()
            }
        } finally {
            setLoading(false)
        }
    }
    const onChangeTimer = async () => {
        setLoading(true)
        // debugger
        const data = {
            valid_till: timer,
            language: "ENGLISH"
        }
        try {
            let apiRes = await henceforthApi.DealsTimer.Timer(data)
            intialiseTimer()

        } catch (error) {
            handleError(error)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (_id: any, index: any) => {

        let data = state.data
        data[index].loading = true
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
                    setLoading(true)
                    let apires = await henceforthApi.Dealsofday.deletedeals(
                        _id
                    )
                    toast.success(apires.message)
                    intialise()
                } catch (error) {
                    handleError(error)
                } finally {
                    data[index].loading = false
                    setLoading(false)
                }
            }
        })
        data[index].loading = false
    }
    const onChangePagination = (newval: any) => {
        const newParam = new URLSearchParams(location.search);
        if (newParam.has("search")) {
            navigate(`/deal/${newval}?search=${newParam.get("search")}`)
        } else {
            navigate(`/deal/${newval}`);
        }
    }
    const isEnableDisable = async () => {
        setLoading(true)
        const data = {
            is_enable: checkdata === true ? false : true
        }
        try {
            let apiRes = await henceforthApi.Dealsofday.enableDisableDeals(data)
            // toast.success(apiRes.message)
            intialise()
        } catch (error) {
            handleError(error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        intialise()
    }, [match.params.page, authState?.lang])
    useEffect(() => {
        intialiseTimer()
    }, [authState?.lang])
    console.log(authState.lang);


    return (
        <>
            {/* breadcrum  */}
            <section className="breadcrum-box">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <div className='d-flex justify-content-between align-items-center flex-column flex-lg-row gap-2'>
                                <div>
                                    {/* title  */}
                                    <h2 className='fw-semibold text-center text-md-start'>Deal Of Day</h2>
                                    {/* breadcrum  */}
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb m-0">
                                            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                            <li className="breadcrumb-item active fw-bold">Deal Of the Day</li>
                                        </ol>
                                    </nav>
                                </div>
                                <DealsTimer {...getTime} />
                                <div className="btn btn-white btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal2"> <i className='fa fa-clock-o me-1'></i>Add Time</div>
                                <div className='enable-diable-button d-flex gap-1'>
                                    <Link to="/management/deals/add" className="btn btn-white btn-sm" type="button"> <i className='fa fa-plus me-1'></i>Add</Link>
                                    <EnableDisable checkdata={checkdata} isEnableDisable={isEnableDisable} loading={loading} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* page  */}
            {loading ? <div className='vh-100 d-flex justify-content-center py-5'> <Spinner />  </div> :
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
                                                            <img src={`${henceforthApi.API_FILE_ROOT_MEDIUM}${res.image}`} alt="img" className='img-fluid' />
                                                        </div>
                                                        {/* Product Detail  */}
                                                        <div className="profile-image my-4">
                                                            <p className="d-flex align-items-center mb-1"><span className='fw-bold me-2'>Title:</span>{res.title}</p>
                                                            <p className="d-flex align-items-center mb-1"><span className='fw-bold me-2'>Price:</span>&#x24;{numberWithCommas(res.price)}</p>
                                                            <p className="d-flex align-items-center mb-1"><span className='fw-bold me-2'>Category level-1:</span> {res.category_id?.name}</p>
                                                            <p className="d-flex align-items-center mb-1"><span className='fw-bold me-2'>Category level-2:</span>{res.subcategory_id?.name}</p>
                                                            <p className="d-flex align-items-center mb-1"><span className='fw-bold me-2'>Category level-3:</span> {res.sub_subcategory_id?.name ? res.sub_subcategory_id?.name : "Not Avaiable"}</p>
                                                            <p className="d-flex align-items-center mb-1"><span className='fw-bold me-2'>Brand:</span>{res.brand_id?.name}</p>
                                                            <p className="d-flex align-items-center mb-1"><span className='fw-bold me-2'>Discount:</span>{res.discount}</p>
                                                        </div>
                                                        {/* button  */}
                                                        <div className="profile-button d-flex gap-2 mt-auto">
                                                            <button className='btn btn-white bg-danger text-white border-danger w-100' onClick={() => handleDelete(res._id, index)} ><i className='fa fa-trash me-2'></i> Delete </button>
                                                            <Link to={`/management/deals/${res._id}/edit`} className='btn btn-theme w-100'><i className='fa fa-pencil me-2'></i> Edit</Link>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </>
                                    )
                                }) : <div className='text-center'><img src={NODATA} width="100" /><p className='text-center mt-3'>No data found</p></div>}
                            </div>
                            <PaginationLayout
                                count={totalCount}
                                data={state?.data}
                                page={Number(match?.params.page)}
                                limit={Number(limit)}
                                onPageChange={(val: any) => onChangePagination(val)} />
                        </div>
                    </section>
                </div>}
            {/* modal  */}
            <div className="modal fade" id="exampleModal2" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Add Time</h5>
                            <button type="button" className="btn p-0 close shadow-0 border-0" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className='form-fields-box'>
                                <input type="datetime-local" className='form-control' min={new Date().toISOString().slice(0, 16)} onChange={(e) => setTimer(e.target.valueAsNumber)} onKeyDown={(e) => e.preventDefault()} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-white border-danger bg-danger text-white ms-2" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-theme" data-bs-dismiss="modal" onClick={onChangeTimer}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default DealOfDay;