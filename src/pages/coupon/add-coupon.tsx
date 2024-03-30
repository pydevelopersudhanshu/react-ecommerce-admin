import moment from 'moment'
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import Spinner from '../../components/BootstrapCompo'
import { GlobalContext, handleError } from '../../context/Provider'
import henceforthApi from '../../utils/henceforthApi'

type CouponRequest = {
    name: string,
    description: string,
    type: string,
    sub_type: string,
    start_date: any,
    end_date: any,
    price: number,
    percentage: number,
    max_discount: number,
    language: string
}

const AddCoupon = () => {

    const { loading, setLoading } = useContext(GlobalContext);
    const [state, setState] = React.useState({

        type: 'FIXED',
        sub_type: 'ONE_TIME',
        language: 'ENGLISH',
        start_date: "",
        end_date: ""
    } as CouponRequest)
    const [error, setError] = useState({
        name: "",
        type: "",
        price: "",
        max_discount: "",
        start_date: "",
        end_date: ""
    })
    // let date = new Date(state.start_date)
    // const nextdate: any = new Date(date.getTime())
    // nextdate.setDate(nextdate.getDate() + 1)

    const addNewCoupon = async () => {
        if (!state.name && !state.type && !state.price && !state.start_date) {
            setError({
                ...error,
                name: "please Enter name",
                type: "please select type",
                price: "please Enter price",
                max_discount: "please Enter max_discount",
                start_date: "please select start_number"
            })
            return
        }
        if (!state.name) return setError({ ...error, name: "Please Enter name", })
        if (!state.type) return setError({ ...error, type: "Please Select type", })
        if (!state.price) return setError({ ...error, price: "Please Enter price", })
        if (state.type === "PERCENTAGE" && !state.max_discount) return setError({ ...error, max_discount: "Please Enter max_discount", })
        if (!state.start_date) return setError({ ...error, start_date: "Please Select Start_date", })
        if (!state.end_date) return setError({ ...error, end_date: "Please Select end_date", })

        setLoading(true)

        const items = {
            ...state,
        } as any
        if (state.type === "PERCENTAGE") {
            items['percentage'] = state.price;
            delete items['price']
        }

        try {
            const apiRes = await henceforthApi.Coupons.create(items)
            toast.success(apiRes.message)
            window.history.back()
        } catch (error) {
            handleError(error)
        } finally {
            setLoading(false)
        }
    }
    const handleChange = ({ target }: any) => {

        let name = target.name;
        let value = target.value.replace(/\D/, "");
        if (name === 'price' && isNaN(value)) return

        if (name === 'startDate' || state.start_date) {
            setState((state: any) => {
                return {
                    ...state,
                    end_date: ''
                }
            })
        }

        if (name === "name") {
            setError({
                ...error,
                name: ""
            })
        }
        if (name === "type") {
            setError({
                ...error,
                type: ""
            })
        }
        if (name === "price") {
            setError({
                ...error,
                price: ""
            })
        } if (name === "max_discount") {
            setError({
                ...error,
                max_discount: ""
            })
        } if (name === "start_date") {
            setError({
                ...error,
                start_date: ""
            })
        } if (name === "end_date") {
            setError({
                ...error,
                end_date: ""
            })
        }
        setState((state) => {
            if (target.name === 'start_date' || target.name === 'end_date') {
                return {
                    ...state,
                    [target.name]: target.value
                }
            } else if (target.name === 'price' || target.name === 'percentage' || target.name === 'max_discount') {
                return {
                    ...state,
                    [target.name]: target.value
                }
            } else
                return {
                    ...state,
                    [target.name]: target.value
                }
        })
    }
    return (
        <>
            {/* breadcrum  */}
            <section className="breadcrum-box">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            {/* title  */}
                            <h2 className="fw-semibold">Add Coupon</h2>
                            {/* breadcrum  */}
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb m-0">
                                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                    <li className="breadcrumb-item active fw-bold">Add Coupon</li>
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
                                        <h5>Add Coupon</h5>
                                    </div>
                                    <div className="common-card-content">
                                        {/* form  */}
                                        <form onSubmit={(e) => { e.preventDefault(); addNewCoupon() }}>
                                            <div className="table-responsive data-list-table table-responsive mb-3'">
                                                {/* Table  */}
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
                                                                {state.type == "FIXED" ? 'Price' : 'Percentage'}(&#8377;)
                                                            </th>
                                                            {state.type === "PERCENTAGE" &&
                                                                <th>
                                                                    Max Discount(&#8377;)
                                                                </th>}
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
                                                            <td className='form-fields-box is-invalid'>
                                                                <input type="text" className={`form-control mb-1 ${error.name ? `is-invalid` : ``} rounded-0`} placeholder="Coupon Name" value={state.name} name="name"
                                                                    onChange={handleChange} />
                                                                {/* error msg  */}
                                                                <div className={`${error.name ? "invalid-feedback" : ""}`}>
                                                                    {error.name}
                                                                </div>
                                                            </td>
                                                            <td className='form-select-box  is-invalid'>
                                                                <select className={`form-control mb-1 ${error.type ? `is-invalid` : ``} rounded-0`} value={state.type} name="type" onChange={handleChange}>
                                                                    <option value='' selected>select Type</option>
                                                                    <option value="FIXED">FIXED</option>
                                                                    <option value="PERCENTAGE">PERCENTAGE</option>

                                                                </select>

                                                                <div className={`${error.type ? "invalid-feedback" : ""}`}>
                                                                    {error.type}
                                                                </div>
                                                            </td>
                                                            <td className='form-select-box '>
                                                                <select className="form-control rounded-0 mb-1" value={state.sub_type} name="sub_type" onChange={handleChange}>
                                                                    <option value="ONE_TIME">ONE_TIME</option>

                                                                </select>
                                                            </td>

                                                            <td className='form-fields-box is-invalid'>
                                                                <input type="number" className={`form-control ${error.price ? `is-invalid` : ``} rounded-0`} placeholder="10" value={state.price == 0 ? '' : state.price} name="price"
                                                                    onChange={handleChange} />
                                                                {/* error message */}
                                                                <div className={`${error.price ? "invalid-feedback" : ""}`}>
                                                                    {error.price}
                                                                </div>
                                                            </td>
                                                            {state.type === "PERCENTAGE" &&
                                                                <td className='form-fields-box is-invalid'>
                                                                    <input type="number" className={`form-control ${state.type === "PERCENTAGE" ? error.max_discount ? `is-invalid` : `` : ''} rounded-0`} placeholder="10"
                                                                        value={state.max_discount == 0 ? '' : state.max_discount} name="max_discount"

                                                                        onChange={handleChange} />
                                                                    {/* error message */}
                                                                    <div className={`${error.max_discount ? "invalid-feedback" : ""}`}>
                                                                        {error.max_discount}
                                                                    </div>
                                                                </td>}
                                                            <td className='form-fields-box is-invalid'>
                                                                <input type="date" className={`form-control ${error.start_date ? `is-invalid` : ``} rounded-0`}
                                                                    value={state.start_date} min={new Date().toISOString().split("T")[0]} name="start_date" onChange={handleChange} onKeyDown={(e) => e.preventDefault()} />
                                                                {/* error message */}
                                                                <div className={`${error.start_date ? "invalid-feedback" : ""}`}>
                                                                    {error.start_date}
                                                                </div>
                                                            </td>
                                                            <td className='form-fields-box is-invalid '>
                                                                <input type="date" className={`form-control ${error.end_date ? `is-invalid` : ``} rounded-0`}
                                                                    value={state.end_date}
                                                                    disabled={!state.start_date}
                                                                    min={moment(state.start_date).add(1, 'days').format("YYYY-MM-DD")}
                                                                    name="end_date" onChange={handleChange} onKeyDown={(e) => e.preventDefault()} />
                                                                {/* error message */}
                                                                <div className={`${error.end_date ? "invalid-feedback" : ""}`}>
                                                                    {error.end_date}
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <button type="submit" className="btn btn-white btn-sm ">{loading ? <Spinner /> : <span><i className="fa fa-save me-1"></i>Save</span>}</button>
                                                            </td>
                                                        </tr>

                                                    </tbody>

                                                </table>
                                            </div>
                                        </form>
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
export default AddCoupon;