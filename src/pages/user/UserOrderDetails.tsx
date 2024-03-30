import { Link, useLocation, useMatch, useNavigate } from 'react-router-dom'
import { GlobalContext, handleError } from '../../context/Provider'
import henceforthApi from '../../utils/henceforthApi'
import { useContext, useEffect, useState } from 'react'
import { userorder } from '../../context/interfaces'
import moment from 'moment'
import PaginationLayout from '../../components/PaginationLayout'
import Spinner from '../../components/BootstrapCompo'
import DownloadFileModal from '../../components/common/download-file-modal'
import OrderListTr from '../../components/common/OrderListTr'
import { OrderListResponse } from '../../context/interfaces/OrderInterface'

const UserOrderDetails = ({ id }: any) => {
    const { authState } = useContext(GlobalContext);

    const match = useMatch(`/user/:id`)
    const [state, setState] = useState<OrderListResponse>()
    const [totalCount, setTotalCount] = useState(0)
    const location = useLocation()
    let limit: Number = 10;
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1)
    const newParam = new URLSearchParams(location.search);
    const onChangePagination = (newVal: Number) => {
        setPage(Number(newVal))
    }
    const changeGraphType = (type: any) => {
        const newParam = new URLSearchParams()
        if (type) {
            newParam.set("order_status", type)
        }
        navigate({ search: newParam.toString() })
    }
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
        navigate({ pathname: `/user/${id}`, search: newParam.toString() })
    }
    const initialise = async () => {
        setLoading(true)
        try {
            let apiRes = await henceforthApi.User.getUserOrderDetails(
                page - 1,
                limit,
                newParam.toString(),
                match?.params?.id as string
            )
            setState(apiRes)
            setTotalCount(apiRes?.data?.total_count)
        } catch (error) {
            // handleError(error)
        } finally {
            setLoading(false)
        }
    }
    const exportData = async (startDate: number, endDate: number) => {
        try {
            const apiRes = await henceforthApi.User.getUserOrderExport(match?.params.id, startDate, endDate)
            const data = apiRes?.data?.data
            const rows = [
                [
                    "Order Id",
                    "Seller Name",
                    "Product Name",
                    "Order Status",
                    "Product Price  "
                ],
            ];
            if (Array.isArray(data)) {
                data.map((res: any, index: any) => {
                    rows.push([
                        res._id,
                        res.seller_id?.name,
                        res.product_id?.name,
                        res?.order_status,
                        res?.total_price
                    ])
                })
            }
            console.log(rows);
            let csvContent =
                "data:text/csv;charset=utf-8," +
                rows.map((e) => e.join(",")).join("\n");
            var encodedUri = encodeURI(csvContent);
            var link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", `order_${match?.params.id}${moment().valueOf()}.csv`);
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
    useEffect(() => {
        initialise()
    }, [page, newParam.get('start_date'), newParam.get('end_date'), newParam.get("order_status"), newParam.get("search"), authState?.lang])

    console.log(state)

    return (
        <div className="col-xxl-9">
            <div className='common-card mb-4 border-0 card-spacing'>
                <div className="row justify-content-between">
                    {/* serach and filter  */}
                    <div className="col-md-7">
                        <div className="row">
                            <div className="col-8">
                                <div className='form-fields-box'>
                                    <label className='mb-1 form-label fw-semibold'>Search</label>
                                    <div className='position-relative'>
                                        <input type="search" className="form-control rounded-0 ps-4 " name="search" placeholder="Search Seller name,Product name..."
                                            onChange={(e: any) => {
                                                handleSearch(e.target.name, e.target.value)
                                            }}
                                        />
                                        <span className='search-icon'><i className='fa fa-search'></i></span>
                                    </div>
                                </div>
                            </div>
                            {/* filter */}

                            <div className="col-4">
                                <div className='form-select-box'>
                                    <label className='mb-1 form-label fw-semibold'>Filter</label>
                                    <select className="form-select shadow-none" aria-label="Default select example"
                                        onChange={(e) => changeGraphType(String(e.target.value))} value={String(newParam.get("order_status")).toUpperCase()}
                                    >
                                        <option value="" >Filter By</option>
                                        <option value="PLACED">PLACED</option>
                                        {/* <option value="CONFIRMED">CONFIRMED</option> */}
                                        <option value="DELIVERED">DELIVERED</option>
                                        <option value="CANCELLED">CANCELLED</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* filter by date  */}
                    <div className="col-md-3">
                        <div className='d-flex gap-2'>
                            <div className='form-fields-box'>
                                <label className='mb-1 form-label fw-semibold'>Start date:</label>
                                <input type="date" className='form-control rounded-0' name='start_date' max={new Date().toISOString().split("T")[0]} onKeyDown={(e) => e.preventDefault()} value={newParam.has("start_date") ? moment(Number(newParam.get('start_date'))).format("YYYY-MM-DD") : moment().format("MM/DD/YYYY")} placeholder='mm/dd/yyyy'
                                    onChange={(e) => handleSearch(e.target.name, e.target.valueAsNumber)}
                                />
                            </div>
                            <div className='form-fields-box'>
                                <label className='mb-1 form-label fw-semibold'>End date:</label>
                                <input type="date" className='form-control rounded-0' name='end_date' max={new Date().toISOString().split("T")[0]} onKeyDown={(e) => e.preventDefault()} value={newParam.has("end_date") ? moment(Number(newParam.get('end_date'))).format("YYYY-MM-DD") : moment().format("MM/DD/YYYY")} placeholder='mm/dd/yyyy'
                                    disabled={!(newParam.has("start_date"))}
                                    min={newParam.has("start_date") ? moment(Number(newParam.get('start_date'))).add(1, 'days').format("YYYY-MM-DD") : moment().format("MM/DD/YYYY")}
                                    onChange={(e) => handleSearch(e.target.name, e.target.valueAsNumber)}
                                />
                            </div>
                        </div>
                    </div>
                    {/* export  */}
                    <div className="col-md-1 ms-5">
                        <div className='d-flex gap-3 justify-content-end'>
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
                    <h5>Orders Detail</h5>
                </div>

                <div className="common-card-content">
                    {/* table */}
                    {loading ? <div className='vh-100 d-flex justify-content-center py-5'><Spinner /></div> :
                        <div className='data-list-table table-responsive mb-3'>
                            <table className="table table-striped align-middle">
                                <thead className=''>
                                    <tr>
                                        <th>Sr No.</th>
                                        <th>Order Id</th>
                                        <th>Seller Detail</th>
                                        <th>Product Detail</th>
                                        <th>Order Status</th>
                                        <th>Order Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(state?.data?.data) && (state?.data?.data.length) ? state.data?.data?.map((res,index) =>
                                        <OrderListTr key={res._id}  {...res} openFor="seller_id" index={index}/>
                                    ) : <tr><td colSpan={5} className="text-center">No data found</td></tr>}


                                </tbody>
                            </table>
                        </div>}
                    {/* pagination  */}
                    <div className='dashboad-pagination-box'>
                        <PaginationLayout
                            count={totalCount}
                            data={state?.data?.data}
                            page={Number(page)}
                            limit={Number(limit)}
                            loading={loading}
                            onPageChange={(val: any) => onChangePagination(val)}
                        />
                    </div>
                </div>
            </div>
            <DownloadFileModal exportData={exportData} />
        </div>
    )
}
export default UserOrderDetails;