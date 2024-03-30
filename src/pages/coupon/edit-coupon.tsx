import moment from 'moment'
import React from 'react'
import { Link, useMatch } from 'react-router-dom'
import { toast } from 'react-toastify'
import { GlobalContext, handleError } from '../../context/Provider'
import henceforthApi from '../../utils/henceforthApi'
import { CouponResponse } from './coupon-listing'
const EditCoupon = () => {
    const match = useMatch('coupons/:_id/edit')
    const { authState } = React.useContext(GlobalContext)
    const [state, setState] = React.useState({} as CouponResponse)
    const [loading, setLoading] = React.useState(false)



    const updateCoupon = async () => {
        try {
            setLoading(true)
            const apiRes = await henceforthApi.Coupons.put(state)
            toast.success(apiRes.message)
            window.history.back()
        } catch (error) {
            handleError(error)
            setLoading(false)
        }
    }
    console.log(state.start_date);
    console.log(moment(state.start_date).format('MM-DD-YYYY'));
    const handleChange = ({ target }: any) => {
        console.log(state.start_date);
        console.log(moment(state.start_date).format('MM-DD-YYYY'));

        setState((state) => {
            if (target.name === 'start_date' || target.name === 'end_date') {
                return {
                    ...state,
                    [target.name]: target.value
                }
            } else if (target.name === 'price' || target.name === 'percentage' || target.name === 'max_discount') {
                return {
                    ...state,
                    [target.name]: Number(target.value)
                }
            } else
                return {
                    ...state,
                    [target.name]: target.value
                }
        })
    }

    const initialiseData = async () => {
        try {
            setLoading(true)
            const apiRes = await henceforthApi.Coupons.byid(match?.params?._id as string)
            setState(apiRes?.data)
            setLoading(false)
        } catch (error) {
            handleError(error)
        }
    }

    React.useEffect(() => {
        initialiseData()
    }, [authState?.lang])
    return (
        <>
            {/* breadcrum  */}
            <section className="breadcrum-box">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            {/* title  */}
                            <h2 className="fw-semibold">Edit Coupon</h2>
                            {/* breadcrum  */}
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb m-0">
                                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                    <li className="breadcrumb-item active fw-bold">Edit Coupon</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
            {/* page  */}
            <div className='page-spacing coupon-module'>
                <section className='change-password'>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-sm-12">
                                {/* Title  */}
                                <div className="common-card">
                                    <div className="common-card-title">
                                        <h5>Edit Coupon</h5>
                                    </div>
                                    <div className="common-card-content">
                                        <div className="table-responsive data-list-table table-responsive mb-3'">
                                            {/* form  */}
                                            <form onSubmit={(e) => { e.preventDefault(); updateCoupon() }}>
                                                {/* table  */}
                                                <table className="table table table-striped align-middle coupon-table">
                                                    <thead>
                                                        <tr>
                                                            <th>
                                                                Coupon Name
                                                            </th>
                                                            <th>
                                                                Type
                                                            </th>
                                                            <th>
                                                                Sub Type
                                                            </th>
                                                            <th>
                                                                Price(&#8377;)
                                                            </th>
                                                            {state.type === "PERCENTAGE" ?
                                                                <th>
                                                                    Max Discount(&#8377;)
                                                                </th> : ""}
                                                            <th>
                                                                Start Date
                                                            </th>
                                                            <th>
                                                                End Date
                                                            </th>
                                                            <th>
                                                                Actions
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td className='form-fields-box'>
                                                                <input type="text" className="form-control rounded-0" placeholder="Coupon Name" value={state.name} name="name" onChange={handleChange} disabled={loading} />
                                                            </td>
                                                            <td className='form-select-box '>
                                                                <select className="form-control rounded-0" value={state.type} name="type" onChange={handleChange} disabled={loading}>
                                                                    <option value="FIXED">FIXED</option>
                                                                    <option value="PERCENTAGE">PERCENTAGE</option>

                                                                </select>
                                                            </td>
                                                            <td className='form-select-box '>
                                                                <select className="form-control rounded-0" value={state.sub_type} name="sub_type" onChange={handleChange} disabled={loading}>
                                                                    <option value="ONE_TIME">One time coupon</option>
                                                                </select>
                                                            </td>
                                                            <td className='form-fields-box'>
                                                                <input type="text" className="form-control rounded-0" placeholder="10" value={state.price} name="price" onChange={handleChange} disabled={loading} />
                                                            </td>
                                                            {state.type == "PERCENTAGE" ?
                                                                <td className='form-fields-box'>
                                                                    <input type="text" className="form-control rounded-0" placeholder="10" value={state.max_discount} name="max_discount" onChange={handleChange} disabled={loading} />
                                                                </td> : ""}
                                                            <td className='form-fields-box '>
                                                                <input type="date" className="form-control rounded-0" min={new Date().toISOString().split("T")[0]} value={moment(state.start_date).format('YYYY-MM-DD') ?? state.start_date} name="start_date" onChange={handleChange} disabled={loading} onKeyDown={(e) => e.preventDefault()} />
                                                            </td>
                                                            <td className='form-fields-box '>
                                                                <input type="date" className="form-control rounded-0" min={moment(state.start_date).add(1, 'days').format("YYYY-MM-DD")} value={moment(state.end_date).format('YYYY-MM-DD') ?? state.end_date} name="end_date" onChange={handleChange} disabled={loading} onKeyDown={(e) => e.preventDefault()} />
                                                            </td>
                                                            <td>
                                                                <button type="submit" className="btn btn-white btn-sm " disabled={loading}><i className="fa fa-save me-1"></i> Save</button>
                                                            </td>
                                                        </tr>

                                                    </tbody>

                                                </table>
                                            </form>
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
export default EditCoupon;