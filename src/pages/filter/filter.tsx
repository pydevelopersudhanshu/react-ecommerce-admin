import moment from "moment"
import { useContext, useEffect, useRef } from "react"
import { useLocation, useMatch } from "react-router-dom"
import { GlobalContext, handleError } from "../../context/Provider"
import henceofrthEnums from "../../utils/henceofrthEnums"
import { capitalise, NumberValidation } from "../../utils/validations"
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { async } from "@firebase/util"
import henceforthApi from "../../utils/henceforthApi"
import { toast } from "react-toastify"

const filter = [
    { min_price: '50', max_price: '501' },
    { min_price: '501', max_price: '1001' },
    { min_price: '1001', max_price: '2000' },
]


export default (props: any) => {
    const match = useMatch('/orders/:page')
    const match1 = useMatch(`/products/:page`)
    const location = useLocation()
    const newParam = new URLSearchParams(location.search)
    const { handleSearch, onFilterPriceHandler, authState } = useContext(GlobalContext)
    const [min_price, setMin_price] = useState('')
    const [max_price, setMax_price] = useState('')
    const [showCalendar, setShowCalendar] = useState(false)
    const calendarDropRef = useRef<any>(null)

    const dateSelect = (e: any) => {
        handleSearch('start_date', e[0] ? String(moment(e[0]).valueOf()) : '')
        handleSearch('end_date', e[1] ? String(moment(e[1]).valueOf()) : '')
        setShowCalendar(false)
    }
    const handleClickOutside = (e: any) => {
        if (calendarDropRef.current && !calendarDropRef?.current.contains(e.target)) {
            setShowCalendar(false)
        }
    }
    const onChangeprice = async (e: any) => {
        e.preventDefault();
        if (Number(min_price) > Number(max_price)) return toast.warn('max price should be greater than min price');
        onFilterPriceHandler(min_price, max_price)
        setMax_price('')
        setMin_price('')

    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [newParam.get('min_price'), newParam.get('max_price'), authState?.lang]);

    return <div className='common-card mb-4 border-0 card-spacing'>
        <div className="row justify-content-between gy-3">
            {/* serach and filter  */}
            <div className="col-lg-10">
                <div className="row gy-3">
                    {/* Search  */}
                    <div className="col-md-3 col-sm-8">
                        <div className='form-fields-box'>
                            <label className='mb-1 form-label fw-semibold'>Search</label>
                            <div className='position-relative'>
                                <input type="search" className="form-control rounded-0 ps-4 " name='search' value={newParam.has("search") ? newParam.get("search") as string : ""}
                                    placeholder={match?.pathname == "/orders/1" ? "Search by OrderID or ProductID"
                                        : match1?.pathname == "/products/1" ? 'Search by Customer ID or Product ID' : 'Search by OrderID or ProductID'}
                                    onChange={(e) => {
                                        handleSearch(e.target.name, e.target.value)
                                    }} />
                                <span className='search-icon'><i className='fa fa-search'></i></span>
                            </div>
                        </div>
                    </div>
                    {props.filters ?
                        <div className="col-md-3 col-sm-4">
                            <div className='form-select-box'>
                                <label className='mb-1 form-label fw-semibold'>Filters</label>
                                <div className="dropdown">
                                    <button className="btn btn-white dropdown-toggle shadow-none" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {newParam.get('stock') ? capitalise(newParam.get('stock')) : newParam.get('order_status') ? `${capitalise(newParam.get('order_status'))} Status` : newParam.get('payment_status') ? `${capitalise(newParam.get('payment_status'))} Status` : 'All Filters'}
                                    </button>
                                    <ul className="dropdown-menu all-filter-wrapper">
                                        <li className=" ps-4 fw-bold" onClick={() => { handleSearch('stock', ''); handleSearch('payment_status', ''); handleSearch('order_status', '') }} role="button">
                                            <p className="dropdown-item p-0">
                                                <div className="form-check ps-0">
                                                    <label className="form-check-label fw-bold">
                                                        All Status
                                                    </label>
                                                </div>
                                            </p>
                                        </li>
                                        {props.stock ? <>
                                            <li className="ps-4 fw-bold ">Stock Status <i className={newParam.has("stock") ? 'fa fa-circle' : ''}></i></li>

                                            <li className="ps-4" onClick={() => { handleSearch('stock', 'OUT_OF_STOCK') }}>
                                                <p className="dropdown-item p-0" >
                                                    <div className="form-check ps-0 d-flex gap-2">
                                                        <label className="form-check-label">
                                                            Out Of Stock <i className={newParam.get("stock") === 'OUT_OF_STOCK' ? 'fa fa-check' : ''}></i>
                                                        </label>
                                                    </div>
                                                </p>
                                            </li>
                                            <li className="ps-4 " onClick={() => { handleSearch('stock', 'ALERT_OF_STOCK') }}>
                                                <p className="dropdown-item p-0">
                                                    <div className="form-check ps-0">
                                                        <label className="form-check ps-0 d-flex gap-2">
                                                            Alert Of Stock <i className={newParam.get("stock") === 'ALERT_OF_STOCK' ? 'fa fa-check' : ''}></i>
                                                        </label>
                                                    </div>
                                                </p>
                                            </li></> : ''}
                                        {props.orderStatus ? <>
                                            <li className="ps-4 fw-bold">Order Status <i className={newParam.has("order_status") ? 'fa fa-circle' : ''}></i></li>

                                            <li className="ps-4" onClick={() => { handleSearch('order_status', henceofrthEnums.OrderStatus.CONFIRMED) }}>
                                                <p className="dropdown-item p-0">
                                                    <div className="form-check d-flex gap-2 ps-0">
                                                        <label className="form-check-label">
                                                            {capitalise(henceofrthEnums.OrderStatus.CONFIRMED)} Status   <i className={newParam.get("order_status") === henceofrthEnums.OrderStatus.CONFIRMED ? 'fa fa-check' : ''}></i>
                                                        </label>
                                                    </div>
                                                </p>
                                            </li>
                                            <li className="ps-4 " onClick={() => { handleSearch('order_status', henceofrthEnums.OrderStatus.CANCELLED) }}>
                                                <p className="dropdown-item p-0">
                                                    <div className="form-check d-flex gap-2 ps-0">
                                                        <label className="form-check-label">
                                                            {capitalise(henceofrthEnums.OrderStatus.CANCELLED)} Status <i className={newParam.get("order_status") === henceofrthEnums.OrderStatus.CANCELLED ? 'fa fa-check' : ''}></i>
                                                        </label>
                                                    </div>
                                                </p>
                                            </li>
                                            <li className="ps-4" onClick={() => { handleSearch('order_status', henceofrthEnums.OrderStatus.DELIVERED) }}>
                                                <p className="dropdown-item p-0">
                                                    <div className="form-check d-flex gap-2 ps-0">
                                                        <label className="form-check-label">
                                                            {capitalise(henceofrthEnums.OrderStatus.DELIVERED)} Status <i className={newParam.get("order_status") === henceofrthEnums.OrderStatus.DELIVERED ? 'fa fa-check' : ''}></i>
                                                        </label>
                                                    </div>
                                                </p>
                                            </li>
                                            <li className="ps-4 " onClick={() => { handleSearch('order_status', henceofrthEnums.OrderStatus.SHIPPED) }}>
                                                <p className="dropdown-item p-0">
                                                    <div className="form-check d-flex gap-2 ps-0">
                                                        <label className="form-check-label">
                                                            {capitalise(henceofrthEnums.OrderStatus.SHIPPED)} Status <i className={newParam.get("order_status") === henceofrthEnums.OrderStatus.SHIPPED ? 'fa fa-check' : ''}></i>
                                                        </label>
                                                    </div>
                                                </p>
                                            </li></> : ''}
                                        {props.refund ? <>
                                            <li className="ps-4 fw-bold">Refund Status <i className={newParam.has("payment_status") ? 'fa fa-circle' : ''}></i></li>
                                            <li className="ps-4" onClick={() => { handleSearch('payment_status', henceofrthEnums.OrderStatus.REFUNDED) }}>
                                                <p className="dropdown-item p-0">
                                                    <div className="form-check d-flex gap-2 ps-0">
                                                        <label className="form-check-label">
                                                            {capitalise(henceofrthEnums.OrderStatus.REFUNDED)} Status <i className={newParam.get("payment_status") === henceofrthEnums.OrderStatus.REFUNDED ? 'fa fa-check' : ''}></i>
                                                        </label>
                                                    </div>
                                                </p>
                                            </li>
                                            <li className="ps-4" onClick={() => { handleSearch('payment_status', henceofrthEnums.OrderStatus.REFUND_IN_PROGESS) }}>
                                                <p className="dropdown-item p-0">
                                                    <div className="form-check d-flex gap-2 ps-0">
                                                        <label className="form-check-label">
                                                            <i className={newParam.get("payment_status") === henceofrthEnums.OrderStatus.REFUND_IN_PROGESS ? 'fa fa-check' : ''}></i> {capitalise(henceofrthEnums.OrderStatus.REFUND_IN_PROGESS)} <br />Status
                                                        </label>
                                                    </div>
                                                </p>
                                            </li>
                                        </> : ''}
                                    </ul>
                                </div>
                            </div>
                        </div> : ''}
                    {props.date ?
                        <div className="col-md-3 col-sm-4">
                            <div className='form-select-box'>
                                <label className='mb-1 form-label fw-semibold'>Start to End Date</label>
                                <div>
                                    <div className={`dropdown ${newParam.has('start_date') && newParam.has('end_date') ? 'btn-group' : ''}`} ref={calendarDropRef}>
                                        <button className="btn btn-white dropdown-toggle shadow-none" type="button" onClick={() => setShowCalendar(!showCalendar)}
                                            title={`${newParam.has("start_date") ? moment(Number(newParam.get('start_date'))).format("DD/MM/YYYY") : ''}${newParam.has("start_date") && newParam.has("start_date") ? '-' : ""}${newParam.has("end_date") ? moment(Number(newParam.get('end_date'))).format("DD/MM/YYYY") as any : 'Date Filter'}`}>
                                            {`${newParam.has("start_date") ? moment(Number(newParam.get('start_date'))).format("DD/MM") : ''}${newParam.has("start_date") && newParam.has("start_date") ? '-' : ""}${newParam.has("end_date") ? moment(Number(newParam.get('end_date'))).format("DD/MM") as any : 'Date Filter'}`}  </button>

                                        {newParam.has('start_date') && newParam.has('end_date') ? <button type="button" className="btn btn-white shadow-none" onClick={() => { handleSearch('start_date', ''); handleSearch('end_date', ''); setShowCalendar(false) }}>
                                            x
                                        </button> : ''}

                                        <ul className={`dropdown-menu py-0  ${showCalendar ? 'show' : ''} `}>
                                            <Calendar maxDate={new Date()} onChange={(e: any) => dateSelect(e)} selectRange value={newParam.has('start_date') && newParam.has('end_date') ? [moment(Number(newParam.get('start_date'))).toDate(), moment(Number(newParam.get('end_date'))).toDate()] : null} />
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div> : ''}

                    <div className="col-md-3 col-sm-4">
                        <div className='form-select-box'>
                            <label className='mb-1 form-label fw-semibold'>Price Filter</label>
                            <div className="dropdown">
                                <button className="btn btn-white dropdown-toggle shadow-none" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    {newParam.has("min_price") && newParam.has("max_price") ? `$ ${newParam.get("min_price")} - ${newParam.get("max_price")}` : 'Filter by price'}</button>
                                <div className="dropdown-menu price-filter-dropdown">

                                    <form onSubmit={onChangeprice}>
                                        <div className="d-flex gap-3">
                                            {/* min  */}
                                            <div className='form-fields-box mb-3'>
                                                <label htmlFor="" className="fw-semibold mb-1">Min Price</label>
                                                <input type="text"
                                                    name="min_price"
                                                    value={min_price}
                                                    onChange={(e) => setMin_price(e.target.value.replace(/[^.0-9]/g, ""))}
                                                    className="form-control rounded-0" placeholder="Min" />
                                            </div>
                                            {/* max */}
                                            <div className='form-fields-box mb-3'>
                                                <label htmlFor="" className="fw-semibold mb-1">Max Price</label>
                                                <input type="text"
                                                    name="max_price"
                                                    value={max_price}
                                                    onChange={(e) => setMax_price(e.target.value.replace(/[^.0-9]/g, "")
                                                    )}
                                                    className="form-control rounded-0" placeholder="Max" />
                                            </div>
                                        </div>
                                        {/* button  */}
                                        <div>
                                            <button type='submit' className='btn btn-theme w-100 fw-semibold'>Submit</button>
                                            <button type='submit' className='btn btn-theme w-100 fw-semibold mt-2' onChange={(e: any) => { setMax_price(''); setMin_price('') }} >Clear</button>

                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* export  */}
            <div className="col-lg-2">
                <div className='d-flex gap-3 justify-content-lg-end'>
                    <div className='download-export-box'>
                        <label className='mb-1 form-label fw-semibold'>Export File</label>
                        <div className="export-button">
                            <button className="btn btn-white" type="button" data-bs-toggle="modal" data-bs-target="#fileDownloadModal"> <i className='fa fa-cloud-download me-2'></i>.csv</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}