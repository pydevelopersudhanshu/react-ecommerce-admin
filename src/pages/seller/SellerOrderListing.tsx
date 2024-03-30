import { match } from "assert"
import moment from "moment"
import React, { useContext, useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import Spinner from "../../components/BootstrapCompo"
import DownloadFileModal from "../../components/common/download-file-modal"
import OrderListTr from "../../components/common/OrderListTr"
import PaginationLayout from "../../components/PaginationLayout"
import { INSUFFICIENT_PERMISSIONS } from "../../context/actionTypes"
import { OrderListResponse } from "../../context/interfaces/OrderInterface"
import { GlobalContext, handleError } from "../../context/Provider"
import henceforthApi from "../../utils/henceforthApi"
import Filter from "../filter/filter"

export default ({ id }: any) => {
    const { authState } = useContext(GlobalContext);
    const navigate = useNavigate()
    let limit = 10
    const location = useLocation()
    const [state, setState] = React.useState<OrderListResponse>({
        data: {
            total_count: 0,
        }
    })
    const newParam = new URLSearchParams(location.search);
    const [data, setData] = useState("")
    const [page, setpage] = React.useState<number>(1)
    const [loading, setLoading] = React.useState(false)
    const [serachOrder, setSearchOrder] = useState("")
    const onChangePagination = (page: Number) => {
        setpage(Number(page))
    }
    const onSearch = async (serachOrder: any) => {
        if (serachOrder) {
            navigate(`/seller/${id}`);
        }
    };
    const handleSearch = (name: string, value: any) => {
        if (value) {

            newParam.set(name, value)
        } else {
            if (name === 'start_date') {
                newParam.delete('end_date')
            }
            if (newParam.has(name)) {
                newParam.delete(name)
            }
        }
        navigate({ pathname: `/seller/${id}`, search: newParam.toString() })
    }
    const initialise = async () => {
        setLoading(true)
        if (serachOrder) {

            setSearchOrder(serachOrder as any)
        }
        try {
            newParam.set('seller_id', id)

            let apiRes = await henceforthApi.Seller.orders(
                page - 1,
                limit,
                newParam.toString(),
                serachOrder
            )
            setState(apiRes)
        } catch (error: any) {
            if (error?.response?.body?.error === INSUFFICIENT_PERMISSIONS) {
                window.history.back()
            }
        } finally {
            setLoading(false)
        }
    }
    const exportData1 = async (startDate1: number, endDate1: number) => {
        try {
            const apiRes = await henceforthApi.ProductList.export(startDate1, endDate1)
            const data = apiRes?.data?.data
            const rows = [
                [
                    "order Id",
                    "Customer Detail",
                    "Product name",
                    "Product Price",
                    // "Brand",
                    // "Product Price  "
                ],
            ];
            if (Array.isArray(data)) {
                data.map((res: any, index: any) => {
                    rows.push([
                        res.order_id,
                        res.user_id?.name,
                        res.product_id?.name,
                        res?.total_price
                    ])
                })
            }
            console.log(rows);
            // debugger
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
            // debugger
        } catch (error) {
            handleError(error)
        }
    }
    console.log(data);

    React.useEffect(() => {
        initialise()
    }, [page, serachOrder, newParam.get("order_status"), newParam.get("start_date"), newParam.get("end_date"), authState?.lang])

    return <div className='order-detail-box'>
        <div className='common-card mb-4 border-0 card-spacing'>
            <div className="row justify-content-between gy-3">
                {/* serach and filter  */}
                <div className="col-md-12 col-lg-6">
                    <div className="row gy-3">
                        <div className="col-md-8">
                            <div className='form-fields-box'>
                                <label className='mb-1 form-label fw-semibold'>Search</label>
                                <div className='position-relative'>
                                    <input type="search" name="search" className="form-control rounded-0 ps-4" value={serachOrder}
                                        onChange={(e: any) => {
                                            setSearchOrder(e.target.value);
                                            onSearch(e.target.value);
                                        }}
                                        placeholder="Search by Order id, Customer name, Product id, Product name..." />
                                    <span className='search-icon'><i className='fa fa-search'></i></span>
                                </div>
                            </div>
                        </div>
                        {/* filter */}
                        {/* <Filter   /> */}
                        <div className="col-md-4">
                            <div className='form-select-box'>
                                <label className='mb-1 form-label fw-semibold'>Filter</label>
                                <select className="form-select shadow-none" aria-label="Default select example"
                                    name='order_status'
                                    value={newParam.has('order_status') ? newParam.get('order_status') as string : ""}
                                    onChange={(e) => {
                                        handleSearch(e.target.name, e.target.value);
                                    }}
                                >
                                    <option >ALL</option>
                                    <option value="PLACED">PLACED</option>
                                    <option value="SHIPPED">SHIPPED</option>
                                    <option value="CANCELLED">CANCELLED</option>
                                    <option value="DELIVERED">DELIVERED</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                {/* filter by date  */}
                <div className="col-md-4">
                    <div className='d-flex gap-2 flex-wrap flex-sm-nowrap'>
                        <div className='form-fields-box'>
                            <label className='mb-1 form-label fw-semibold'>Start date:</label>
                            <input type="date" className='form-control rounded-0' placeholder='dd/mm/yy' onKeyDown={(e) => e.preventDefault()} name="start_date" value={newParam.has("start_date") ? moment(Number(newParam.get('start_date'))).format("YYYY-MM-DD") : moment().format("MM/DD/YYYY")}
                                onChange={(e) => { handleSearch(e.target.name, e.target.valueAsNumber) }} max={new Date().toISOString().split("T")[0]}

                            />
                        </div>
                        <div className='form-fields-box'>
                            <label className='mb-1 form-label fw-semibold'>End date:</label>
                            <input type="date" className='form-control rounded-0' placeholder='dd/mm/yy' disabled={!(newParam.has("start_date"))} min={newParam.has("start_date") ? moment(Number(newParam.get('start_date'))).add(1, 'days').format("YYYY-MM-DD") : moment().format("MM/DD/YYYY")} max={new Date().toISOString().split("T")[0]} onKeyDown={(e) => e.preventDefault()} name="end_date" value={newParam.has("end_date") && (newParam.has("start_date")) ? moment(Number(newParam.get('end_date'))).format("YYYY-MM-DD") : moment().format("MM/DD/YYYY")}
                                onChange={(e) => handleSearch(e.target.name, e.target.valueAsNumber)}
                            />
                        </div>
                    </div>
                </div>
                {/* export  */}
                <div className="col-md-1">
                    <div className='d-flex gap-3 justify-content-md-end'>
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
        <div className="common-card">
            <div className="common-card-title">
                <h5>Orders (Sales) Detail</h5>
            </div>
            <div className="common-card-content">
                {/* product list table */}
                <div className='data-list-table table-responsive mb-3'>
                    {newParam.has("search") ? "" : loading ? <div className='vh-100 d-flex justify-content-center py-5'>
                        <Spinner /></div> :
                        <table className="table table-striped align-middle">
                            <thead className=''>
                                <tr>
                                    <th>Sr No.</th>
                                    <th>Order Id</th>
                                    <th>Customer Detail</th>
                                    <th>Product Detail</th>
                                    <th>Order Status</th>
                                    <th>Order Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Array.isArray(state?.data?.data) && (state?.data?.data?.length) ? state?.data?.data?.map((res:any,index:number) =>
                                    <OrderListTr key={res._id} {...res} index={index} openFor="user_id" />
                                ) : <tr>
                                    <td colSpan={5} className="text-center">No data found</td>
                                </tr>}
                            </tbody>
                        </table>}
                </div>
                {/* pagination  */}
                <div className='dashboad-pagination-box'>
                    <PaginationLayout
                        count={state?.data?.total_count}
                        data={state?.data?.data}
                        page={page}
                        limit={Number(limit)}
                        // loading={loading}
                        onPageChange={(page: number) => onChangePagination(page)}
                    />
                </div>
            </div>
        </div>
        <DownloadFileModal exportData={exportData1} />
    </div>

}