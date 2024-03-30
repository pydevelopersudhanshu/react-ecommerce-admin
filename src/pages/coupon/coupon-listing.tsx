import { Link, useLocation, useMatch, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import henceforthApi from '../../utils/henceforthApi'
import { listApiResponse } from './../../context/interfaces/index'
import moment from 'moment'
import PaginationLayout from '../../components/PaginationLayout'
import { GlobalContext, handleError } from '../../context/Provider'
import { numberWithCommas } from '../../utils/validations'
import { Console } from 'console'
import Swal from 'sweetalert2'
import BreadCrumb from '../../components/common/BreadCrumb'
import { toast } from 'react-toastify'
import { stat } from 'fs'
import Spinner from '../../components/BootstrapCompo'
import NODATA from '../../assets/images/no-data-found.svg'
import { INSUFFICIENT_PERMISSIONS } from '../../context/actionTypes'


export type CouponResponse = {
    code: string
    created_at: string
    description: string
    end_date: string
    is_available: boolean
    is_deleted: boolean
    max_discount: number
    name: string
    percentage?: string
    price: number
    start_date: string
    sub_type: string
    type: string
    updated_at: string
    _id: string,
    for_homepage: boolean
}
let breadCrumbPath = [
    { name: 'Home', url: `/`, active: '' },
    { name: 'Coupons list', url: ``, active: 'not-allowed' }
]
const CouponListing = () => {
    const match = useMatch('coupons/:page')
    const navigate = useNavigate()
    const location = useLocation()
    const { authState, loading, setLoading, onChangePagination } = React.useContext(GlobalContext)
    const [state, setState] = React.useState({
        loading: false,
        limit: 10
    } as listApiResponse)
    const [show, setShow] = useState({
        name: ""
    } as any)



    const deleteData = async (_id: string, index: number) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Are You sure want to Delete!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result: any) => {
            if (result.isConfirmed) {
                try {

                    const apiRes = await henceforthApi.Coupons.delete(_id)
                    toast.success(apiRes.message)
                    initialiseData(Number(match?.params.page) - 1)

                } catch (error) {
                    handleError(error)

                }
            }

        })
    }

    const initialiseData = async (page: number) => {
        try {

            setLoading(true)
            const apiRes = await henceforthApi.Coupons.get(page, "")
            setState((state) => {
                return { ...state, ...apiRes, loading: false }
            })
        } catch (error: any) {
            if (error?.response?.body?.error === INSUFFICIENT_PERMISSIONS) {
                window.history.back()
            }

        } finally {
            setLoading(false)
        }
    }
    const showCoupon = async () => {
        try {
            let apiRes = await henceforthApi.Coupons.showCoupon()
            setShow(apiRes.data)
        } catch (error) {

        }
    }
    const onChangeSubmit = async (id: any) => {

        Swal.fire({
            title: "Are you sure?",
            text: "Are You sure want to Disabled!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, update it!",
        }).then(async (result: any) => {
            if (result.isConfirmed) {
                try {
                    let apiRes = await henceforthApi.Coupons.homeCoupon(id, '', true)
                    toast.success(apiRes.message)
                    // showCoupon()
                    initialiseData(Number(match?.params.page) - 1)
                    // window.history.back()
                } catch (error) {
                    handleError(error)
                }
            }
        })
    }
    useEffect(() => {
        initialiseData(Number(match?.params.page) - 1)

    }, [match?.params.page, authState?.lang])
    useEffect(() => {
        showCoupon()
    }, [authState?.lang])
    return (
        <>
            {/* breadcrum  */}
            <BreadCrumb pathNameDeclare={breadCrumbPath} />
            {/* page  */}
            {loading ? <div className='d-flex vh-100 align-items-center justify-content-center'> <Spinner /></div> :
                <div className='page-spacing'>
                    <section className='product-listing'>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="common-card">
                                        <div className="common-card-title">
                                            <div className='d-flex align-items-center justify-content-between'>
                                                <h5>Coupons</h5>
                                            </div>
                                        </div>
                                        <div className="common-card-content">
                                            {/* table */}
                                            <div className='data-list-table table-responsive mb-3'>
                                                <table className="table table-striped align-middle">
                                                    <thead className=''>
                                                        <tr>
                                                            <th>Sr.No</th>
                                                            <th>Coupon Name</th>
                                                            <th>Type</th>
                                                            <th>Sub Type</th>
                                                            <th>Price</th>
                                                            <th>Start Date</th>
                                                            <th>End Date</th>
                                                            <th>Action</th>
                                                            <th>At home</th>

                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {Array.isArray(state?.data?.data) && state?.data?.data?.length ? state?.data?.data?.map((res: CouponResponse, index: number) =>
                                                            <tr key={res._id}>
                                                                <td>{Number(match?.params.page) == 0 ? index + 1 : (Number(match?.params.page) - 1) * state.limit + (index + 1)}</td>
                                                                <td>{res.name}</td>
                                                                <td>{res.type}</td>
                                                                <td>{res.sub_type}</td>
                                                                <td>&#36;{numberWithCommas(res.price)}</td>
                                                                <td>{moment(res.start_date).format('ddd DD MMM, YYYY HH:MM:A')}</td>
                                                                <td>{moment(res.end_date).format('ddd DD MMM, YYYY HH:MM:A')}</td>
                                                                <td><div className="btn-group gap-2">
                                                                    <Link to={`/coupons/${res._id}/edit`} className="btn btn-white btn-sm"> <i className='fa fa-pencil me-1'></i>Edit</Link>
                                                                    <button className="btn btn-white btn-sm" type="button" onClick={() => deleteData(res._id, index)}> <i className='fa fa-trash me-1'></i>Delete</button>
                                                                </div>
                                                                </td>
                                                                <td><div className="btn-group gap-2">
                                                                    <button className="btn btn-white btn-sm" onClick={() => onChangeSubmit(res._id)} disabled={res.for_homepage}>{res.for_homepage ? 'Disabled' : 'Active'}</button>
                                                                </div></td>
                                                            </tr>) : <tr><td colSpan={9} className="text-center py-3"><img src={NODATA} width="100" /><p className='text-center mt-3'>No data found</p></td></tr>}
                                                    </tbody>
                                                </table>
                                            </div>

                                            {/* pagination  */}
                                            <div className='dashboad-pagination-box'>
                                                <PaginationLayout
                                                    count={state.data?.total_count}
                                                    data={state?.data?.data}
                                                    page={Number(match?.params.page)}
                                                    limit={Number(state?.limit)}
                                                    onPageChange={(val: any) => onChangePagination(val)}
                                                />
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
export default CouponListing;