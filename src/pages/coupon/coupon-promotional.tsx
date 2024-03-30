import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { listApiResponse } from "../../context/interfaces"
import { GlobalContext, handleError } from "../../context/Provider"
import henceforthApi from "../../utils/henceforthApi"
import Swal from 'sweetalert2'
import { loadavg } from "os"
import Spinner from "../../components/BootstrapCompo"
import moment from "moment"
import BreadCrumb from "../../components/common/BreadCrumb"


const CouponPromotional = () => {

    let breadCrumbPath = [
        { name: 'Home', url: `/`, active: '' },
        { name: 'Home Promotional', url: ``, active: 'not-allowed' }
    ]

    const { loading, setLoading, authState } = useContext(GlobalContext);
    const [state, setState] = useState({
        loading: false,
        limit: 10
    } as listApiResponse)
    const [show, setShow] = useState({
        name: ""
    } as any)
    const [couponId, setCouponId] = useState('')
    const initialiseData = async () => {
        try {
            setState((state) => {
                return {
                    ...state,
                    loading: true
                }
            })
            const apiRes = await henceforthApi.Coupons.promotionaget()
            setState((state) => {
                return { ...state, ...apiRes, loading: false }
            })
        } catch (error) {
            handleError(error)
            setState((state) => {
                return {
                    ...state,
                    loading: false
                }
            })
        }
    }
    const intialise = async () => {
        setLoading(true)
        try {
            let apiRes = await henceforthApi.Coupons.showCoupon()
            setShow(apiRes.data)
            setLoading(false)
        } catch (error) {

        }
    }
    const onChangeSubmit = async (e: any) => {
        e.preventDefault()
        Swal.fire({
            title: "Are you sure?",
            text: "Are You sure want to Save!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, update it!",
        }).then(async (result: any) => {
            if (result.isConfirmed) {
                try {
                    let apiRes = await henceforthApi.Coupons.homeCoupon(couponId, '', true)
                    toast.success(apiRes.message)
                    intialise()
                } catch (error) {
                    handleError(error)
                }
            }
        })
    }

    const homedisable = async () => {
        Swal.fire({
            title: "Are you sure?",
            text: "Are You sure want to Disable!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, update it!",
        }).then(async (result: any) => {
            if (result.isConfirmed) {
                try {
                    let apiRes = await henceforthApi.Coupons.homeCoupon(show._id, '', false)
                    setCouponId('hide')
                    toast.success(apiRes.message)
                    intialise()
                    initialiseData()
                } catch {

                }
            }
        })
    }

    useEffect(() => {
        initialiseData()
        intialise()
    }, [authState?.lang])

    return (
        <>

            <BreadCrumb pathNameDeclare={breadCrumbPath} />

            {loading ? <div className='vh-100 d-flex justify-content-center align-items-center'>
                <Spinner />
            </div> :
                <div className='page-spacing'>
                    <section className='product-detail'>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-sm-12 col-md-6">
                                    {/* Title  */}
                                    <div className="common-card h-100">
                                        <div className="common-card-title d-flex justify-content-sm-between align-items-center flex-column flex-sm-row gap-2">
                                            <h5 className="text-center text-sm-start">Home Promotional Coupon</h5>
                                            <div className='enable-diable-button'>
                                                {loading ? <Spinner /> :
                                                    <button className={`btn btn-white btn-sm border-danger text-white ms-2 bg-danger`} type="button" value={show._id} onClick={homedisable} disabled={!show.name} >
                                                        <span> <i className="fa fa-ban me-1"> {show.name ? "Disable" : "Disbaled"}</i></span>
                                                    </button>}

                                            </div>
                                        </div>
                                        <div className="common-card-content">
                                            <form onSubmit={onChangeSubmit}>
                                                {/* sub Categories  */}
                                                <div className="form-select-box mb-3 is-invalid">
                                                    <label className="mb-1 fw-bold">Home Promotional Coupon</label>
                                                    <select className="form-select" aria-label="Default select example" value={!couponId ? state?.data?.data?.find((res => res?.name === show?.name))?._id : couponId} onChange={(e) => setCouponId(e.target.value ? e.target.value : 'disable')}
                                                    >

                                                        <option value="" >Select</option>{state?.data?.data.map((res: any) => <option value={res._id}>{res.name}</option>)}
                                                    </select>
                                                </div>
                                                {/* Submit button  */}
                                                <div className="button-box">
                                                    <button className='btn btn-theme w-100' disabled={couponId === "disable"}>Add  promotional</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                                {show.for_homepage == true ?
                                    <div className="col-sm-12 col-md-6">
                                        {/* Title  */}
                                        <div className="common-card h-100">
                                            <div className="common-card-title">
                                                <h5>Home Promotional Coupon</h5>
                                            </div>
                                            <div className="common-card-content">
                                                <form >
                                                    {/* sub Categories  */}
                                                    <div className="form-select-box mb-3 is-invalid">
                                                        <label className="mb-1 fw-bold"> Name:  </label>
                                                        <span className="p-1">{show.name ? show.name : "Not Avaiable"}</span><br />
                                                        <label className="mb-1 fw-bold">Coupon Code:</label>
                                                        <span className="p-1">{show.code ? show.code : "Not Avaiable"}</span><br />
                                                        <label className="mb-1 fw-bold">created_at:</label>
                                                        <span className="p-1">{moment(Number(show.created_at)).format("MMM Do YY")}</span><br />
                                                        <label className="mb-1 fw-bold">Max-Discount:</label>
                                                        <span className="p-1">{show.max_discount ? show.max_discount : 0}</span><br />
                                                        <label className="mb-1 fw-bold">Percentage:</label>
                                                        <span className="p-1">{show.percentage ? show.percentage : 0}</span><br />
                                                        <label className="mb-1 fw-bold">Price:</label>
                                                        <span className="p-1">&#36;{show.price ? show.price : 0}</span><br />
                                                        <label className="mb-1 fw-bold">Start-date:</label>
                                                        <span className="p-1">{show.start_date ? show.start_date : "Not Avaiable"}</span><br />
                                                        <label className="mb-1 fw-bold">End-date:</label>
                                                        <span className="p-1">{show.end_date ? show.end_date : "Not Avaiable"}</span><br />
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>

                                    : ''}
                            </div>
                        </div>
                    </section>
                </div >}
        </>
    )
}
export default CouponPromotional