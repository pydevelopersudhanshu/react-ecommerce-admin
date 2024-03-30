import '../../assets/styles/auth.scss'
import '../../assets/styles/pages.scss'
import { Link, useLocation, useMatch, useNavigate } from 'react-router-dom'
import DownloadFileModal from '../../components/common/download-file-modal'
import { useContext, useEffect, useState } from 'react'
import henceforthApi from '../../utils/henceforthApi'
import PaginationLayout from '../../components/PaginationLayout'
import { GlobalContext, handleError } from '../../context/Provider'
import moment from 'moment'
import Spinner from '../../components/BootstrapCompo'
import { toast } from 'react-toastify'
import profile_placeholder from '../../assets/images/pages/profile_placeholder.png'
import BreadCrumb from '../../components/common/BreadCrumb'
import { INSUFFICIENT_PERMISSIONS } from '../../context/actionTypes'


const UserListing = () => {
    let breadCrumbPath = [
        { name: 'Home', url: `/`, active: '' },
        { name: 'User list', url: ``, active: 'not-allowed' }
    ]
    const navigate = useNavigate();
    const location = useLocation();
    const { authState, onChangePagination, loading, setLoading } = useContext(GlobalContext);

    const [pageData, setpageData] = useState<any[]>([])
    const newParam = new URLSearchParams(location.search);
    const match: any = useMatch("/users/:page")
    let limit = 10;
    const [searchData, setSearchData] = useState("");
    const [totalCount, setTotalCount] = useState(0);
    const onSearch = async (searchData: any) => {
        if (searchData) {
            navigate(`/users/1?search=${searchData}`);
        } else {
            navigate(`/users/1`);
        }
    };
    const changeGraphType = (type: any) => {
        const newParam = new URLSearchParams()
        if (type) {
            newParam.set("filter", type)
        }
        navigate({ search: newParam.toString() })
    }
    const initialise = async () => {
        setLoading(true)
        let searchData = newParam.has("search") ? newParam.get("search") : null;
        setSearchData(searchData as any);
        try {
            let q = newParam.get("filter")
            let apires = await henceforthApi.User.getlisting(
                searchData,
                q,
                Number(match.params.page) - 1,
                limit
            )
            toast.success(apires.message)
            setpageData(apires.data)
            setTotalCount(apires.total_count);
        } catch (error: any) {
            if (error?.response?.body?.error === INSUFFICIENT_PERMISSIONS) {
                window.history.back()
            }
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        initialise()
    }, [match.params.page, newParam.get("search"), newParam.get("filter"), authState?.lang])

    const exportData = async (startDate: number, endDate: number) => {
        try {
            const apiRes = await henceforthApi.User.getexport(startDate, endDate)
            const data = apiRes.data
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
                        res.phone_no,
                    ])
                })
            }
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
    return (
        <>
            {/* breadcrum  */}

            <BreadCrumb pathNameDeclare={breadCrumbPath} />

            {/* page  */}
            <div className='page-spacing'>
                <section className='product-listing'>
                    <div className="product-detail-box">
                        <div className='common-card mb-4 border-0 card-spacing'>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="row gy-3">
                                        {/* serach and filter  */}
                                        <div className="col-md-7">
                                            <div className='form-fields-box'>
                                                <label className='mb-1 form-label fw-semibold'>Search</label>
                                                <div className='position-relative'>
                                                    <input type="search" value={searchData || ''} className="form-control rounded-0 ps-4 " placeholder="Search by Name, Email"
                                                        onChange={(e: any) => {
                                                            setSearchData(e.target.value);
                                                            onSearch(e.target.value);
                                                        }}
                                                    />
                                                    <span className='search-icon'><i className='fa fa-search'></i></span>
                                                </div>
                                            </div>
                                        </div>
                                        {/* filter */}
                                        <div className="col-md-5">
                                            <div className='form-select-box'>
                                                <label className='mb-1 form-label fw-semibold'>Filter</label>
                                                <select className="form-select shadow-none" aria-label="Default select example"
                                                    onChange={(e) => changeGraphType(String(e.target.value))} value={String(newParam.get("filter")).toUpperCase()} >
                                                    <option value="ACTIVE_USERS">ACTIVE USERS</option>
                                                    <option value="BLOCKED_USERS">BLOCKED USERS</option>
                                                    <option value="DEACTIVE_USERS">DEACTIVE USERS</option>
                                                </select>
                                            </div></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* table  */}
                        <div className="row">
                            <div className="col-md-12">
                                <div className="common-card">
                                    <div className="common-card-title">
                                        <div className='d-flex align-items-center justify-content-between'>
                                            <h5>User List</h5>
                                        </div>
                                    </div>
                                    <div className="common-card-content">
                                        <div className="mt-4">
                                            {loading ? <div className='d-flex justifly-content-center'><Spinner /> </div> :
                                                <div>
                                                    {/* table */}
                                                    <div className='data-list-table table-responsive mb-3'>
                                                        <table className="table table-striped align-middle">
                                                            <thead className=''>
                                                                <tr>
                                                                    <th>Sr.no</th>
                                                                    <th>Name</th>
                                                                    <th>Email</th>
                                                                    <th>Phone Number</th>
                                                                    <th>Action</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>

                                                                {Array.isArray(pageData) && pageData.length ? pageData.map((res, index) =>
                                                                    <tr key={res.id}>
                                                                        <td>
                                                                            {match.params.page == 0
                                                                                ? index + 1
                                                                                : (match.params.page - 1) * limit + (index + 1)}
                                                                        </td>
                                                                        <td className='product-image-table'> <img src={res.profile_pic ? henceforthApi.FILES.imageSmall(res?.profile_pic) : profile_placeholder} alt="img" className='rounded-circle me-2' /> {res.name ? `${res.name} ` : `Not Available`}</td>
                                                                        <td>{res.email ? `${res.email}` : 'Not Available'}</td>
                                                                        <td>{res.phone_no ? `+${res.country_code}-${res.phone_no}` : 'Not Available'}</td>
                                                                        <td><div className="btn-group gap-2">
                                                                            <Link to={`/user/${res._id}`} className="btn btn-white btn-sm"> <i className='fa fa-eye me-1'></i>View</Link>
                                                                            <a className="btn btn-white btn-sm text-decoration-none" href={`https://sharedecommerce.henceforthsolutions.com/signin?user_key=${res._id}&access_token=${authState.access_token}`} target="_blank" rel="noreferrer">
                                                                                <i className='fa fa-sign-in me-1'></i>Login as user
                                                                            </a>
                                                                        </div>
                                                                        </td>
                                                                    </tr>) : <tr><td colSpan={9} className="text-center">No data found</td></tr>}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                    {/* pagination  */}
                                                    <div className='dashboad-pagination-box'>
                                                        <PaginationLayout
                                                            count={totalCount}
                                                            data={pageData}
                                                            page={Number(match.params.page)}
                                                            limit={Number(limit)}
                                                            // loading={load}
                                                            onPageChange={(val: any) => onChangePagination(val)}

                                                        />
                                                    </div>
                                                </div>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section >
            </div>
            <DownloadFileModal exportData={exportData} />
        </>
    )
}
export default UserListing;