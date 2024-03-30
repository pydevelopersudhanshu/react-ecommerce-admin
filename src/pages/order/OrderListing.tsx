import '../../assets/styles/auth.scss'
import '../../assets/styles/pages.scss'
import { Link, useLocation, useMatch, useNavigate, useParams } from 'react-router-dom'
import DownloadFileModal from '../../components/common/download-file-modal'
import { Fragment, useContext, useEffect, useState } from 'react'
import henceforthApi from '../../utils/henceforthApi'
import { GlobalContext, handleError } from '../../context/Provider'
import Spinner from '../../components/BootstrapCompo'
import PaginationLayout from '../../components/PaginationLayout'
import profile_placeholder from '../../assets/images/pages/profile_placeholder.png'
import { numberWithCommas } from '../../utils/validations'
import henceofrthEnums from '../../utils/henceofrthEnums'
import OrderStatus from '../../components/order/OrderStatus'
import moment from 'moment'
import OrderRowListing from '../../components/row_view/OrderRowListing'
import Filter from '../filter/filter'
import BreadCrumb from '../../components/common/BreadCrumb'
import { toast } from 'react-toastify'
import { INSUFFICIENT_PERMISSIONS } from '../../context/actionTypes'

const OrderListing = () => {

    let breadCrumbPath = [
        { name: 'Home', url: `/`, active: '' },
        { name: 'Order List', url: ``, active: 'not-allowed' }
    ]

    const { loading, setLoading, onChangePagination, authState } = useContext(GlobalContext)
    const match: any = useMatch(`/orders/:page`)
    let limit: Number = 10
    const location = useLocation()
    const navigate = useNavigate()
    const newParam = new URLSearchParams(location.search)
    const [nestedData, setNestedData] = useState([] as Array<any>)
    const [totalCount, setTotalCount] = useState(0)
    const [state, setstate] = useState({
        data: []
    })
    const onChangePriceHandler = async (min_price: string, max_price: string) => {
        if (min_price && max_price) {
            newParam.set("min_price", min_price)
            newParam.set("max_price", max_price)
        } else {
            if (newParam.has("min_price")) {
                newParam.delete('min_price')
            }
            if (newParam.has("max_price")) {
                newParam.delete('max_price')
            }
        }
        navigate({ pathname: '/orders/1', search: newParam.toString() })
    }
    const initialise = async () => {
        setLoading(true)
        try {
            let apires = await henceforthApi.Order.getOrder(
                Number(match?.params.page) - 1,
                limit,
                newParam.toString(),
            )
            setstate(apires.data)
            setTotalCount(apires?.data.total_count)
        } catch (error: any) {
            if (error?.response?.body?.error === INSUFFICIENT_PERMISSIONS) {
                window.history.back()
            }
        } finally {
            setLoading(false)
        }
    }
    const onChangeFilter = (name: string, type: any) => {
        const newParam = new URLSearchParams()
        if (type) {
            newParam.set(name, type)
        }
        navigate({ search: newParam.toString() })
    }
    const handleSearch = (name: string, value: any) => {
        if (value) {
            newParam.set(name, value)
        } else {
            if (newParam.has(name)) {
                newParam.delete(name)
            }
        }
        navigate({ pathname: `/orders/1`, search: newParam.toString() })
    }
    const copyText = (id: string, name: string) => {
        if (id) {
            navigator?.clipboard?.writeText(id)
            toast.success(`${name} copy successfull`)
        }
    }
    const exportData = async (startDate: number, endDate: number) => {
        try {
            const apiRes = await henceforthApi.Order.export(startDate, endDate)
            const data = apiRes?.data?.data
            const rows = [
                [
                    "Order ID",
                    "Customer Name",
                    "Seller Name",
                    "Product ID",
                    "Product Name",
                    "Product Price  "
                ],
            ];
            if (Array.isArray(data)) {
                data.map((res: any, index: any) => {
                    rows.push([
                        res.order_id,
                        res.user_id?.name,
                        res.seller_id?.name,
                        res?.product_id?._id,
                        res.product_id?.name,
                        res.product_id?.price
                    ])
                })
            }
            let csvContent =
                "data:text/csv;charset=utf-8," +
                rows.map((e) => e.join(",")).join("\n");
            var encodedUri = encodeURI(csvContent);
            var link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", `user_${moment().valueOf()}.csv`);
            document.body.appendChild(link);
            link.click();
            let closeModal = document.getElementById("closeModal");
            if (closeModal) {
                closeModal.click();
            }
        } catch (error) {
            handleError(error)
        }
    }
    const nested = async () => {
        try {
            let apiRes = await henceforthApi.Common.nested()
            setNestedData(apiRes.data.data)
        } catch (error) {
        }
    }
    // const onChangePagination = (newval: any) => {
    //     navigate({ pathname: `/orders/${newval}`, search: newParam.toString() })
    // }
    useEffect(() => {
        initialise()

    }, [newParam.get('search'), newParam.get('category_id'), newParam.get('subcategory_id'), newParam.get('product_id'),
    newParam.get('sub_subcategory_id'), match.params.page, newParam.get('min_price'), newParam.get('start_date'), newParam.get('end_date'),
    newParam.get('max_price'), newParam.get("order_status"), newParam.get("stock"), newParam.get("payment_status"), authState?.lang])
    useEffect(() => {
        nested()
    }, [authState?.lang])

    return (
        <>
            {/* breadcrum  */}

            <BreadCrumb pathNameDeclare={breadCrumbPath} />

            {/* Page  */}
            <div className=' page-spacing'>
                <section className='product-listing'>
                    <div className='product-detail-box'>
                        {/* <div className='common-card mb-4 border-0 card-spacing'>
                            <div className="row justify-content-between">
                                serach and filter 
                                <div className="col-md-8">
                                    <div className="row">
                                        <div className="col-7">
                                            <div className='form-fields-box'>
                                                <label className='mb-1 form-label fw-semibold'>Search</label>
                                                <div className='position-relative'>
                                                    <input type="search" className="form-control rounded-0 ps-4 " name='search'
                                                        value={newParam.has('search') ? newParam.get('search') as string : ""}
                                                        placeholder="Search order via  Customer, Seller & Product name..."
                                                        onChange={(e) => handleSearch(e.target.name, e.target.value)}
                                                    />
                                                    <span className='search-icon'><i className='fa fa-search'></i></span>
                                                </div>
                                                <label className='mb-0 form-label fw-semibold'>Search ProductID</label>
                                                <div className='position-relative '>
                                                    <input type="search" className="form-control rounded-0 ps-4 " name='product_id' placeholder="Search by ProductID..."
                                                        onChange={(e) => {
                                                            handleSearch(e.target.name, e.target.value);

                                                        }}
                                                    />
                                                    <span className='search-icon'><i className='fa fa-search'></i></span>
                                                </div>
                                            </div>
                                        </div>
                                        filter
                                        <div className="col-3">
                                            <div className='form-select-box'>
                                                <label className='mb-1 form-label fw-semibold'>Filter</label>
                                                <select className="form-select shadow-none" aria-label="Default select example"
                                                    onChange={(e) => onChangeFilter("order_status", String(e.target.value))} name="" value={String(newParam.get("order_status")).toUpperCase()}
                                                >
                                                    <option value="ALL" >All Status</option>
                                                    <option value="PLACED">PLACED</option>
                                                    <option value="CONFIRMED">CONFIRMED</option>
                                                    <option value="SHIPPED">SHIPPED</option>
                                                    <option value="DELIVERED">DELIVERED</option>
                                                    <option value="CANCELLED"> CANCELLED</option>

                                                </select>
                                            </div>
                                        </div>
                                        
                                        <div className="col-3">
                                            <div className='form-select-box'>
                                                <label className='mb-1 form-label fw-semibold'>Stock Status</label>
                                                <select className="form-select shadow-none" aria-label="Default select example"
                                                    onChange={(e) => onChangeFilter("stock", String(e.target.value))} value={String(newParam.get("stock")).toUpperCase()}
                                                >
                                                    <option value="ALL" >All Status</option>
                                                    <option value="OUT_OF_STOCK">OUT_OF_STOCK</option>
                                                    <option value="ALEART_OF_STOCK">ALEART_OF_STOCK</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-3">
                                            <div className='form-select-box'>
                                                <label className='mb-1 form-label fw-semibold'>Refund Status</label>
                                                <select className="form-select shadow-none" aria-label="Default select example"
                                                    onChange={(e) => onChangeFilter("payment_status", String(e.target.value))} name="payment_status" value={String(newParam.get("payment_status")).toUpperCase()}
                                                >
                                                    <option value="ALL" >All Status</option>
                                                    <option value="SUCCESS">SUCCESS</option>
                                                    <option value="REFUNDEND">REFUNDEND</option>
                                                    <option value="REFUNDEND_IN_PROGRESS">REFUNDEND_IN_PROGRESS</option>

                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-2">
                                            <div className='form-select-box'>
                                                <label className='mb-1 form-label fw-semibold'>Price Filter</label>
                                                <div className="dropdown">
                                                    <button className="btn btn-white dropdown-toggle shadow-none" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                        {newParam.get("min_price") && newParam.get("max_price") ? `$ ${newParam.get("min_price")} - ${newParam.get("max_price")}` : 'Filter by price'}</button>
                                                    <ul className="dropdown-menu pb-0">
                                                        <li onClick={() => onChangePriceHandler("100", "500")}>
                                                            <a className="dropdown-item" href='#'>
                                                                <div className="form-check d-flex gap-2">
                                                                    <label className="form-check-label" htmlFor="flexCheckDefault1">
                                                                        <input className="form-check-input shadow-none" type="radio" name='filterPrice' checked={newParam.has("min_price") && newParam.has("max_price") ? newParam.get("min_price") === '100' && newParam.get("max_price") === '500' : false} id="flexCheckDefault1" />
                                                                        &#36; 100 <span>-</span> 500
                                                                    </label>
                                                                </div>
                                                            </a>
                                                        </li>
                                                        <li onClick={() => onChangePriceHandler("501", "1000")}>
                                                            <a className="dropdown-item" href='#'>
                                                                <div className="form-check d-flex gap-2">
                                                                    <label className="form-check-label" htmlFor="flexCheckDefault2">
                                                                        <input className="form-check-input shadow-none" type="radio" name='filterPrice' checked={newParam.has("min_price") && newParam.has("max_price") ? newParam.get("min_price") === '501' && newParam.get("max_price") === '1000' : false} id="flexCheckDefault2" />
                                                                        &#36; 501 <span>-</span> 1000
                                                                    </label>
                                                                </div>
                                                            </a>
                                                        </li>
                                                        <li onClick={() => onChangePriceHandler("1001", "2000")}>
                                                            <a className="dropdown-item" href='#'>
                                                                <div className="form-check d-flex gap-2">
                                                                    <label className="form-check-label" htmlFor="flexCheckDefault3">
                                                                        <input className="form-check-input shadow-none" type="radio" name='filterPrice' checked={newParam.has("min_price") && newParam.has("max_price") ? newParam.get("min_price") === '1001' && newParam.get("max_price") === '2000' : false} id="flexCheckDefault3" />
                                                                        &#36; 1001 <span>-</span> 2000
                                                                    </label>
                                                                </div>
                                                            </a>
                                                        </li>
                                                        <li onClick={(e) => onChangePriceHandler('filterPrice', '')}>
                                                            <button className="dropdown-item ps-0 border border-bottom-0 text-center" >
                                                                Clear
                                                                <div className="form-check me-2 d-flex justify-content-center">
                                                                <input className="form-check-input shadow-none" type="radio" name='filterPrice' value="" id="flexCheckDefault" onChange={(e) => onChangePriceHandler(e.target.name, e.target.value)} />
                                                                <label className=""  >
                                                                        Clear
                                                                    </label>
                                                                </div>
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                filter by date 
                                <div className="col-md-6">
                                    <div className='d-flex gap-2'>
                                        <div className='form-fields-box'>
                                            <label className='mb-1 form-label fw-semibold'>Start date:</label>
                                            <input type="date" className='form-control rounded-0' name='start_date' value={newParam.has("start_date") ? moment(Number(newParam.get('start_date'))).format("YYYY-MM-DD") : moment().format("DD/MM/YYYY")} placeholder='dd/mm/yy'
                                                onChange={(e) => handleSearch(e.target.name, e.target.valueAsNumber)}
                                            />
                                        </div>
                                        <div className='form-fields-box'>
                                            <label className='mb-1 form-label fw-semibold'>End date:</label>
                                            <input type="date" className='form-control rounded-0' name='end_date' value={newParam.has("end_date") ? moment(Number(newParam.get('end_date'))).format("YYYY-MM-DD") : moment().format("DD/MM/YYYY")} placeholder='dd/mm/yy'
                                                disabled={newParam.get('start_date') == null || "" ? true : false}
                                                onChange={(e) => handleSearch(e.target.name, e.target.valueAsNumber)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                export 
                                <div className="col-md-2">
                                    <div className='d-flex gap-3 justify-content-end'>
                                        <div className='download-export-box'>
                                            <label className='mb-1 form-label fw-semibold'>Export File</label>
                                            <div order_statusclassName="export-button">
                                                <button className="btn btn-white" type="button" data-bs-toggle="modal" data-bs-target="#fileDownloadModal"> <i className='fa fa-cloud-download me-2'></i>.csv</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            Category Filter
                             <div className="col-md-12 mt-3">
                                <div className='d-flex gap-3'>
                                    <div className='form-select-box w-100'>
                                        <label className='mb-1 form-label fw-semibold'>Category Filter</label>
                                        <select className="form-select shadow-none" value={newParam.has("category_id") ? newParam.get("category_id") as string : ""} aria-label="Default select example" name='category_id'
                                            onChange={(e) => handleSearch(e.target.name, e.target.value)}>
                                            <option value="">Select</option>
                                            {Array.isArray(nestedData) && nestedData.length ?
                                                nestedData.map((res: any) =>
                                                    <option value={res?._id}>{res?.name ? res?.name : ""}</option>)
                                                : <option value="">No Data Found</option>}
                                        </select>
                                    </div>
                                    <div className='w-100'>
                                        {newParam.has("category_id") && <>
                                            <div className='form-select-box'>
                                                <label className='mb-1 form-label fw-semibold'>Subcategory Filter</label>
                                                <select className="form-select shadow-none" aria-label="Default select example" name='subcategory_id' value={newParam.has("subcategory_id") ? newParam.get("subcategory_id") as string : ""} onChange={(e) => handleSearch(e.target.name, e.target.value)}>
                                                    <option value="">Select</option>
                                                    {(nestedData.find((res: any) => res?._id as string == newParam.get("category_id")) as any)?.sub_categories.map((res: any) =>
                                                        <option value={res._id}>{res?.name ? res?.name : ""}</option>
                                                    )}
                                                </select>
                                            </div>
                                        </>}
                                    </div>
                                    <div className='w-100'>
                                        {newParam.has("subcategory_id") && <>
                                            <div className='form-select-box'>
                                                <label className='mb-1 form-label fw-semibold'>Subcategory Filter</label>
                                                <select className="form-select shadow-none" aria-label="Default select example" name='sub_subcategories' value={newParam.has("sub_subcategories") ? newParam.get("sub_subcategories") as string : ""} onChange={(e) => handleSearch(e.target.name, e.target.value)}>
                                                    <option value="">Select</option>
                                                    {(nestedData.find((res: any) => res?._id as string == newParam.get("category_id")) as any)?.sub_categories.find((res: any) => res?._id as string == newParam.get("subcategory_id"))?.sub_subcategories.map((res: any) =>
                                                        <option value={res._id}>{res?.name ? res?.name : ""}</option>
                                                    )}
                                                </select>
                                            </div>
                                        </>}
                                    </div>
                                </div>
                            </div> 
                            djlk
                        </div> */}
                        <Filter date='active' filters="active" stock="actrtrgd" refund="fhejh" orderStatus="dhgfgd" />

                        <div className="common-card">
                            <div className="common-card-title">
                                <h5>Order Listing </h5>
                            </div>
                            <div className="common-card-content">
                                {loading ?
                                    <div className='vh-100 d-flex justify-content-center py-5'>
                                        <Spinner /> </div> :
                                    <div className='data-list-table table-responsive mb-3'>
                                        <table className="table table-striped align-middle">
                                            <thead className=''>
                                                <tr>
                                                    <th>Sr.No</th>
                                                    <th>Order ID</th>
                                                    <th>Customer Detail</th>
                                                    <th>Seller Detail</th>
                                                    <th>Product ID</th>
                                                    <th>Product Detail</th>
                                                    <th>Product Price</th>
                                                    <th>Order Status</th>
                                                    {/* <th>Ouantity</th> */}
                                                    <th>Earning</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Array.isArray(state?.data) && (state?.data.length) ? state.data.map((res: any, index) => <OrderRowListing key={res._id} {...res} page={Number(match?.params.page)} copyText={copyText} index={index} limit={limit} />) : <tr><td colSpan={9} className="text-center">No data found</td></tr>}
                                            </tbody>
                                        </table>
                                    </div>}
                                {/* pagination  */}
                                <div className='dashboad-pagination-box'>
                                    <PaginationLayout
                                        count={totalCount}
                                        data={state?.data}
                                        page={Number(match?.params.page)}
                                        limit={Number(limit)}
                                        loading={loading}
                                        onPageChange={(val: any) => onChangePagination(val)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <DownloadFileModal exportData={exportData} />
        </>
    )
}
export default OrderListing;