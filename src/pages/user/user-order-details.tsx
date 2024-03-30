import React from 'react'
import '../../assets/styles/pages.scss'
import { Link, useLocation, useMatch, useNavigate } from 'react-router-dom'
import { GlobalContext, handleError } from '../../context/Provider'
import henceforthApi from '../../utils/henceforthApi'
import { useContext, useEffect, useState } from 'react'
import { userorder } from '../../context/interfaces'
import profile_placeholder from '../../assets/images/pages/profile_placeholder.png'
import moment from 'moment'
import PaginationLayout from '../../components/PaginationLayout'
import Spinner from '../../components/BootstrapCompo'
import DownloadFileModal from '../../components/common/download-file-modal'
import henceofrthEnums from '../../utils/henceofrthEnums'
import OrderStatus from '../../components/order/OrderStatus'

const UserOrder = ({ id }: any) => {
    const match = useMatch(`/view-user/:id`)
    const [state, setState] = useState<userorder>()
    const [totalCount, setTotalCount] = useState(0)
    const location = useLocation()
    const navigate = useNavigate()
    const { authState, authDispatch, loading, setLoading } = useContext(GlobalContext);
    let limit = 10;
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
            if(name==='start_date'){
                newParam.delete('end_date')
            }
            if (newParam.has(name)) {
                newParam.delete(name)
            }
        }
        navigate({ pathname: `/view-user/${id}`, search: newParam.toString() })
    }
    // const initialise = async () => {
    //     setLoading(true)
    //     try {
    //         let apiRes = await henceforthApi.User.getUserOrderDetails(
    //             page,
    //             limit,
    //             newParam.toString(),
    //             match?.params.id as string
    //         )
    //         setState(apiRes?.data)
    //         setTotalCount(apiRes?.data?.total_count)
    //     } catch (error) {
    //         handleError(error)
    //     } finally {
    //         setLoading(false)
    //     }
    // }
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
    // useEffect(() => {
    //     initialise()
    // }, [page, newParam.get('start_date'), newParam.get('end_date'), newParam.get("order_status"), newParam.get("search")])

    console.log(totalCount)

    return (
        <div className="col-xxl-9">
            <h1>sfdsfg</h1>
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
                                        <option value="CONFIRMED">CONFIRMED</option>
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
                                <input type="date" className='form-control rounded-0' name='start_date' max={new Date().toISOString().split("T")[0]}  onKeyDown={(e) => e.preventDefault()} value={newParam.has("start_date") ? moment(Number(newParam.get('start_date'))).format("YYYY-MM-DD") : moment().format("MM/DD/YYYY")} placeholder='mm/dd/yyyy'
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
                                        <th>Order Id</th>
                                        <th>Seller Detail</th>
                                        <th>Product Detail</th>
                                        <th>Order Status</th>
                                        <th>Order Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(state?.data) && (state?.data.length) ? state.data.map((res: any, index: any) => {
                                        return (
                                            <>
                                                <tr>
                                                    <td>{res.order_id}</td>
                                                    <td className='product-image-table'>
                                                        <div className='d-flex justify-content-center align-items-center gap-2'>
                                                            <img src={res?.seller_id?.image ? `${henceforthApi.API_FILE_ROOT_SMALL}${res?.seller_id?.image}` : profile_placeholder} alt="img" className='rounded-circle' />
                                                            <span>{res?.seller_id?.name ? res?.seller_id?.name : "Not Aaviable"}</span>
                                                        </div>
                                                    </td>
                                                    <td className='product-image-table'>
                                                        <div className='d-flex justify-content-center gap-2'>
                                                            {Array.isArray(res?.product_id?.images) && (res?.product_id?.images?.length) ? res?.product_id?.images.map((res: any) => <img src={res ? `${henceforthApi.API_FILE_ROOT_SMALL}${res}` : ""} alt="img" />) : ""}
                                                            <div className='product-detail-table'>
                                                                <p>{res?.product_id.name ? res?.product_id.name : "Not Aaviable"}</p>
                                                                <p><b>&#8377;</b>{res?.total_price ? res?.total_price : "Not Aaviable"}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className='status-badge'>
                                                        <OrderStatus {...res} />
                                                        <p>{moment(Number(res?.created_at)).format("MMM Do YY")}</p>
                                                    </td>
                                                    <td>{moment(Number(res?.created_at)).format("MMM Do YY")}</td>
                                                </tr>
                                            </>
                                        )
                                    }) : <tr><td colSpan={9} className="text-center">No data found</td></tr>}
                                </tbody>
                            </table>
                        </div>}
                    {/* pagination  */}
                    <div className='dashboad-pagination-box'>
                        <PaginationLayout
                            count={totalCount}
                            data={state?.data}
                            page={page}
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
export default UserOrder;