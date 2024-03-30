import '../../assets/styles/pages.scss'
import { Link, useLocation, useMatch, useNavigate } from 'react-router-dom'
import DownloadFileModal from '../../components/common/download-file-modal'
import { useContext, useEffect, useState } from 'react'
import henceforthApi from '../../utils/henceforthApi'
import { sellerlist } from '../../context/interfaces'
import PaginationLayout from '../../components/PaginationLayout'
import { GlobalContext, handleError } from '../../context/Provider'
import profile_placeholder from '../../assets/images/pages/profile_placeholder.png'
import moment from 'moment'
import BreadCrumb from '../../components/common/BreadCrumb'
import Spinner from '../../components/BootstrapCompo'
import { INSUFFICIENT_PERMISSIONS } from '../../context/actionTypes'

const SellerListing = () => {

    let breadCrumbPath = [
        { name: 'Home', url: `/`, active: '' },
        { name: 'Seller list', url: ``, active: 'not-allowed' }
    ]

    const match = useMatch("sellers/:page")
    const location = useLocation()
    const newParam = new URLSearchParams(location.search);
    const { authState, onChangePagination } = useContext(GlobalContext);
    let limit = 10

    const [totalcount, setTotalCount] = useState(0)
    const [search, setSearchData] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [state, setstate] = useState<sellerlist>()

    const initialise = async () => {
        try {
            setLoading(true)
            let q = newParam.get("filter")
            let searchData = newParam.has("search") ? newParam.get("search") : null;
            let Apires = await henceforthApi.Seller.getsellerlisting(
                searchData,
                q,
                Number(match?.params?.page) - 1,
                limit
            )
            setstate(Apires)
            setTotalCount(Apires?.data.total_count);
        } catch (error: any) {
            if (error?.response?.body?.error === INSUFFICIENT_PERMISSIONS) {
                window.history.back()
            }
        } finally {
            setLoading(false)
        }
    }
    const onSearch = (searchall: any) => {
        if (searchall) {
            navigate(`/sellers/1?search=${searchall}`)
        }
        else {
            navigate(`/sellers/1`)
        }
    }
    const onChangeFilter = (type: any) => {
        const newParam = new URLSearchParams()
        if (type) {
            newParam.set("filter", type)
        }
        navigate({ search: newParam.toString() })
    }

    const exportData = async (startDate: number, endDate: number) => {
        try {
            const apiRes = await henceforthApi.Seller.export(startDate, endDate)
            const data = apiRes.data.data
            const rows = [
                [
                    "Sr.no",
                    "Name",
                    "Email",
                    "Phone Number",
                ],
            ];
            if (Array.isArray(data)) {
                data.map((res: any, index: any) => {
                    rows.push([
                        index + 1,
                        res.name,
                        res.email,
                        res.phone_number,
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
        initialise()
    }, [match?.params?.page, newParam.get("search"), newParam.get("filter"), authState?.lang])

    return (
        <>
            {/* breadcrum  */}
            <BreadCrumb pathNameDeclare={breadCrumbPath} />

            {/* page  */}
            <div className='page-spacing'>
                <section className='product-listing'>
                    <div className="container-fluid px-xs-0">
                        {/* search-filter-export */}
                        <div className='common-card mb-4 border-0 card-spacing'>
                            <div className="row justify-content-between gy-3">
                                {/* serach and filter  */}
                                <div className="col-md-7">
                                    <div className="row gy-3">
                                        <div className="col-sm-7 col-md-7">
                                            <div className='form-fields-box'>
                                                <label className='mb-1 form-label fw-semibold'>Search</label>
                                                <div className='position-relative'>
                                                    <input type="search" className="form-control rounded-0 ps-4 "
                                                        placeholder="Search by Name, Email "
                                                        onChange={(e: any) => {
                                                            setSearchData(e.target.value);
                                                            onSearch(e.target.value)
                                                        }}
                                                    />
                                                    <span className='search-icon'><i className='fa fa-search'></i></span>
                                                </div>
                                            </div>
                                        </div>
                                        {/* filter */}
                                        <div className="col-sm-5 col-md-5">
                                            <div className='form-select-box'>
                                                <label className='mb-1 form-label fw-semibold'>Filter</label>
                                                <select className="form-select shadow-none" aria-label="Default select example"
                                                    onChange={(e) => onChangeFilter(String(e.target.value))} value={String(newParam.get("filter")).toUpperCase()}
                                                >
                                                    <option value="All sellers">All sellers</option>
                                                    <option value="ACTIVE_USERS">ACTIVE SELLER</option>
                                                    <option value="BLOCKED_USERS">BLOCKED SELLER</option>
                                                    <option value="DEACTIVE_USERS">DEACTIVE SELLER</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* export  */}
                                <div className="col-md-2">
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
                        {/* table  */}
                        {loading ? <div className='d-flex justifly-content-center'><Spinner /></div> :
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="common-card">
                                        <div className="common-card-title">
                                            <div className='d-flex align-items-center justify-content-between'>
                                                <h5>Seller List</h5>
                                            </div>
                                        </div>
                                        <div className="common-card-content">
                                            {/* table */}
                                            <div className='data-list-table table-responsive mb-3'>
                                                <table className="table table-striped align-middle">
                                                    <thead className=''>
                                                        <tr>
                                                            <th>Sr.No.</th>
                                                            <th>Name</th>
                                                            <th>Email</th>
                                                            <th>Phone Number</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {Array.isArray(state?.data?.data) && state?.data?.data.length ? state?.data?.data.map((res: any, index: any) =>
                                                            <tr key={res.id}>
                                                                <td>{Number(match?.params?.page) == 0
                                                                    ? index + 1
                                                                    : (Number(match?.params?.page) - 1) * limit + (index + 1)}</td>
                                                                <td className='product-image-table'>
                                                                    <img src={res.image ? henceforthApi.FILES.imageSmall(res.image) : profile_placeholder} alt="img" className='rounded-circle me-2' /> {res.name ? `${res.name}` : "Not Available"}

                                                                </td>

                                                                <td>{res.email ? `${res.email}` : "Not Available"}</td>
                                                                <td>+{res.country_code}-{res.phone_number ? `${res.phone_number}` : "Not Available"}</td>
                                                                <td><div className="btn-group gap-2">
                                                                    <Link to={`/seller/${res._id}`} className="btn btn-white btn-sm"> <i className='fa fa-eye me-1'></i>View</Link>
                                                                    <a href={`https://demo.ecommerce.seller.henceforthsolutions.com/login-with-user/${res._id}/${authState.access_token}`} target="_blank">
                                                                        <button className="btn btn-white btn-sm" type="button"> <i className='fa fa-sign-in me-1'></i>Login as seller</button>
                                                                    </a>
                                                                </div>
                                                                </td>
                                                            </tr>
                                                        ) : <tr><td colSpan={9} className="text-center">No data found</td></tr>}
                                                    </tbody>
                                                </table>
                                            </div>
                                            {/* pagination  */}
                                            <div className='dashboad-pagination-box'>
                                                <PaginationLayout
                                                    count={totalcount}
                                                    data={state?.data?.data}
                                                    page={Number(match?.params?.page)}
                                                    limit={Number(limit)}
                                                    // loading={loading}
                                                    onPageChange={(val: any) => onChangePagination(val)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>}
                    </div>
                </section>
            </div>
            <DownloadFileModal exportData={exportData} />
        </>
    )
}
export default SellerListing;