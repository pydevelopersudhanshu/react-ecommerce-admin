import { Link, useLocation, useMatch, useNavigate } from 'react-router-dom'
import PaginationLayout from '../../components/PaginationLayout'
import { Fragment, useContext, useEffect, useState } from 'react'
import henceforthApi from '../../utils/henceforthApi'
import Spinner from '../../components/BootstrapCompo'
import { GlobalContext, handleError } from '../../context/Provider'
import DownloadFileModal from '../../components/common/download-file-modal'
import moment from 'moment'
import profile_placeholder from '../../assets/images/pages/profile_placeholder.png'
import { INSUFFICIENT_PERMISSIONS } from '../../context/actionTypes'


const SellerProductListing = ({ id }: any) => {
    const { authState } = useContext(GlobalContext);
    const navigate = useNavigate()
    let limit = 10
    const location = useLocation()
    const [productState, setProductState] = useState({
        data: []
    })
    const [totalCount, setTotalCount] = useState(0)
    const newParam = new URLSearchParams(location.search);
    const [page, setpage] = useState<number>(1)
    const [loading, setLoading] = useState(false)
    const [searchData, setSearchData] = useState("") as any
    const [start_date, setStart_date] = useState<any>()
    const [end_date, setEnd_Date] = useState<any>()
    const onChangePagination = (newVal: Number) => {
        setpage(Number(newVal))
    }
    const onSearch = async (searchData: any) => {
        if (searchData) {
            navigate(`/seller/${id}`);
        } else if (start_date) {
            navigate(`/seller/${id}`);

        } else if (end_date) {
            navigate(`/seller/${id}`);

        }
    };
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
        navigate({ pathname: `/seller/${id}`, search: newParam.toString() })
    }
    const productlisting = async () => {
        setLoading(true)
        try {
            let apiRes = await henceforthApi.Seller.getsellerProductList(
                id,
                page - 1,
                limit,
                newParam.toString(),
                searchData,
                start_date,
                end_date
            )
            setProductState(apiRes?.data.data)
            setTotalCount(apiRes?.data.total_count)
        } catch (error: any) {
            if (error?.response?.body?.error === INSUFFICIENT_PERMISSIONS) {
                window.history.back()
            }
        } finally {
            setLoading(false)
        }
    }


    const exportData = async (startDate: number, endDate: number) => {
        try {
            const apiRes = await henceforthApi.ProductList.export(startDate, endDate)
            const data = apiRes?.data?.data
            const rows = [
                [
                    "Product Id",
                    "Category Level 1",
                    "Category level 2",
                    "Brand",
                    "Product Name",
                    "Product Price  "
                ],
            ];
            if (Array.isArray(data)) {
                data.map((res: any, index: any) => {
                    rows.push([
                        res._id,
                        res.category_id?.name,
                        res.subcategory_id?.name,
                        res?.brand_id?.name,
                        res.name,
                        res.price
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

    useEffect(() => {
        productlisting()
    }, [page, searchData, newParam.get("min_price"), newParam.get("max_price"), start_date, end_date, authState?.lang])

    return (
        <Fragment>
            <div className='common-card mb-4 border-0 card-spacing'>
                <div className="row d-flex justify-content-between gy-3">
                    {/* serach and filter  */}
                    <div className="col-md-12 col-lg-6">
                        <div className="row gy-3">
                            <div className="col-md-5">
                                <div className='form-fields-box'>
                                    <label className='mb-1 form-label fw-semibold'>Search</label>
                                    <div className='position-relative'>
                                        <input type="search" className="form-control rounded-0 ps-4"
                                            value={searchData} placeholder="Search by Product.."
                                            onChange={(e: any) => {
                                                setSearchData(e.target.value);
                                                onSearch(e.target.value);
                                            }}
                                        />
                                        <span className='search-icon'><i className='fa fa-search'></i></span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3">
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
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* filter by date  */}
                    <div className='col-md-4'>
                        <div className='d-flex gap-2 flex-wrap flex-sm-nowrap'>
                            <div className='form-fields-box'>
                                <label className='mb-1 form-label fw-semibold'>Start date:</label>
                                <input type="date" className='form-control rounded-0' name='start_date'
                                    value={start_date ? moment(start_date).format("YYYY-MM-DD") : ""}
                                    max={moment().format("YYYY-MM-DD")}
                                    onKeyDown={(e) => e.preventDefault()}
                                    placeholder='dd/mm/yyyy'
                                    onChange={(e) => {
                                        setStart_date(e.target.valueAsNumber)
                                        onSearch(e.target.valueAsNumber)
                                        if (e.target.valueAsNumber) {
                                            setEnd_Date('')
                                        }
                                    }}
                                />
                            </div>
                            <div className='form-fields-box'>
                                <label className='mb-1 form-label fw-semibold'>End date:</label>
                                <input type="date" className='form-control rounded-0' name='end_date'
                                    onKeyDown={(e) => e.preventDefault()}
                                    placeholder='dd/mm/yyyy'
                                    value={start_date ? moment(end_date).format("YYYY-MM-DD") : ""}
                                    min={start_date ? moment(Number(start_date)).add(1, 'days').format("YYYY-MM-DD") : moment().format("MM/DD/YYYY")}
                                    disabled={!start_date}
                                    max={moment().format("YYYY-MM-DD")}
                                    onChange={(e: any) => {
                                        setEnd_Date(e.target.valueAsNumber);
                                        onSearch(e.target.valueAsNumber);
                                    }}
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
                    <h5>Product Listing</h5>
                </div>
                <div className="common-card-content">
                    {/* table */}
                    <div className='data-list-table table-responsive mb-3'>
                        {newParam.has("search") ? "" : loading ? <div className='vh-100 d-flex justify-content-center py-5'>
                            <Spinner /></div> :
                            <table className="table table-striped align-middle">
                                <thead className=''>
                                    <tr>
                                        <th>Sr No.</th>
                                        <th>Product Id</th>
                                        <th>Category Level 1</th>
                                        <th>Category level 2</th>
                                        <th>Brand</th>
                                        {/* <th>Product Image</th> */}
                                        <th>Product Detail</th>
                                        <th>Product Price</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Array.isArray(productState) && (productState?.length) ? productState?.map((res: any, index: number) => {
                                        return (
                                            <>
                                                <tr>
                                                    < td>{(index + 1)}</td>
                                                    <td>{res._id}</td>
                                                    <td>{res.category_id.name}</td>
                                                    <td>{res.subcategory_id.name}</td>
                                                    <td>{res?.brand_id.name}</td>
                                                    <td title={res.name} className='product-image-table'>
                                                        {Array.isArray(res.images) || (res.images.length) ? <img className='me-1' src={`${henceforthApi.API_FILE_ROOT_ORIGINAL}${res.images[0]}`} alt="img" /> : <img className='me-1' src={profile_placeholder} />}{res.name?.slice(0,20)}...

                                                    </td>
                                                    {/* <td>{res.name}</td> */}
                                                    <td>&#36; {res.price}</td>
                                                    <td>
                                                        <div className="btn-group gap-2">
                                                            <Link className="btn btn-white btn-sm" to={`/seller/view-product/${res._id}`}> <i className="fa fa-eye me-1"></i>View</Link>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </>
                                        )
                                    }) : <tr><td colSpan={9} className="text-center">No data found</td></tr>}
                                </tbody>
                            </table>}
                    </div>
                    {/* pagination  */}
                    <div className='dashboad-pagination-box'>
                        <PaginationLayout
                            count={totalCount}
                            data={productState}
                            page={page}
                            limit={Number(limit)}
                            loading={loading}
                            onPageChange={(val: any) => onChangePagination(val)}
                        />
                    </div>
                </div>
            </div>
            <DownloadFileModal exportData={exportData} />
        </Fragment>
    )
}
export default SellerProductListing
