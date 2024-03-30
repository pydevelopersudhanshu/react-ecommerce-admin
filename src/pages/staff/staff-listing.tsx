import '../../assets/styles/auth.scss'
import '../../assets/styles/pages.scss'
import { Link, useLocation, useMatch, useNavigate } from 'react-router-dom'
import DownloadFileModal from '../../components/common/download-file-modal'
import { useContext, useEffect, useState } from 'react'
import henceforthApi from '../../utils/henceforthApi'
import PaginationLayout from '../../components/PaginationLayout'
import { listApiResponse } from '../../context/interfaces'
import defaultIcon from '../../assets/images/default.jpg'
import { GlobalContext, handleError } from '../../context/Provider'
import moment from 'moment'
import BreadCrumb from '../../components/common/BreadCrumb'
import Spinner from '../../components/BootstrapCompo'
import { INSUFFICIENT_PERMISSIONS } from '../../context/actionTypes'


const StaffListing = () => {

    let breadCrumbPath = [
        { name: 'Home', url: `/`, active: '' },
        { name: 'Staffs', url: ``, active: 'not-allowed' }
    ]
    const { authState } = useContext(GlobalContext);
    const location = useLocation();
    const navigate = useNavigate()
    const newParam = new URLSearchParams(location.search);
    const match: any = useMatch("/staffs/:page");
    const limit = 10
    const [state, setState] = useState({} as listApiResponse)
    const [loading, setLoading] = useState(false)
    const exportData = async (startDate: number, endDate: number) => {
        try {
            const apiRes = await henceforthApi.Staff.export(startDate, endDate)
            const data = apiRes?.data?.data
            console.log(data);
            const rows = [
                [
                    "Sr.no",
                    "Name",
                    "Email",
                    "Roles",
                ],
            ];
            if (Array.isArray(data)) {
                data.map((res: any, index: any) => {
                    rows.push([
                        index + 1,
                        res?.name,
                        res?.email,
                        res?.roles?.join(' / '),
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
            // debugger

        } catch (error) {
            handleError(error)
        }

    }
    const handleSearch = (e: any) => {
        const urlSearchParam = new URLSearchParams();
        const value = e.target.value
        if (value) {
            urlSearchParam.set('search', value)
            navigate({ search: urlSearchParam.toString() })
        } else {
            navigate({ search: urlSearchParam.toString() })
        }
    }
    const initialise = async () => {

        try {
            setLoading(true)
            const apires = await henceforthApi.Staff.staffpagination(
                match.params.page,
                newParam.get("search"),
                match.params.role
            )
            setState(apires)
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
    }, [match.params.page, match.params.role, newParam.get("search"), authState?.lang])

    return (
        <>
            {/* breadcrum  */}

            <BreadCrumb pathNameDeclare={breadCrumbPath} />
            {/* page  */}
            <div className='page-spacing'>
                <section className='product-listing'>
                    <div className="container-fluid">
                        {/* search-filter-export */}
                        <div className='common-card mb-4 border-0 card-spacing'>
                            <div className="row justify-content-center justify-content-md-between gy-3">
                                {/* serach and filter  */}
                                <div className="col-md-8 col-lg-7">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className='form-fields-box'>
                                                <label className='mb-1 form-label fw-semibold'>Search</label>
                                                <div className='position-relative'>
                                                    <input type="search" className="form-control rounded-0 ps-4 " value={newParam.get("search") as string} placeholder="Search by Name..." onChange={handleSearch} />
                                                    <span className='search-icon'><i className='fa fa-search'></i></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* export  */}
                                <div className="col-md-2">
                                    <div className='d-flex gap-3 align-items-center justify-content-md-end flex-column flex-sm-row text-center text-sm-start'>
                                        <div className='download-export-box'>
                                            <label className='mb-1 form-label fw-semibold'>Export File</label>
                                            <div className="export-button">
                                                <button className="btn btn-white" type="button" data-bs-toggle="modal" data-bs-target="#fileDownloadModal"> <i className='fa fa-cloud-download me-2'></i>.xls</button>
                                            </div>
                                        </div>
                                        <div className='download-export-box'>
                                            <label className='mb-1 form-label fw-semibold'>Add Staff</label>
                                            <div className="export-button">
                                                <Link to="/staff/add" className="btn btn-white"> <i className='fa fa-plus me-2'></i>Add Staff</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/*  table  */}
                        {loading ? <div className='d-flex justifly-content-center'><Spinner /></div> :
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="common-card">
                                        <div className="common-card-content">
                                            {/* table */}
                                            <div className='data-list-table table-responsive mb-3'>
                                                <table className="table table-striped align-middle">
                                                    <thead className=''>
                                                        <tr>
                                                            <th>Sr.No</th>
                                                            <th>Name</th>
                                                            <th>Role</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {Array.isArray(state?.data?.data) && state?.data?.data.length ? state?.data?.data?.map((res: any, index: any) => {
                                                            return (
                                                                <tr>
                                                                    <td key={res.id}>
                                                                        {index + 1}
                                                                    </td>
                                                                    <td>
                                                                        <span className='product-image-table me-2'>
                                                                            <img src={res.image ? `${henceforthApi.API_FILE_ROOT_SMALL}${res.image}` : defaultIcon} alt="img" className='rounded-circle' />
                                                                        </span>
                                                                        {res.name ? `${res.name}` : "Not Available"}</td>

                                                                    <td>{res.roles.map((item: string, index: number) => `${item}${res.roles.length - 1 === index ? '' : ','} `)}</td>
                                                                    <td><div className="btn-group">
                                                                        <Link to={`/staff/${res._id}`} className="btn btn-white btn-sm" type="button"> <i className='fa fa-eye me-1'></i>View</Link>
                                                                    </div>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        }) : <tr className='text-center'><td colSpan={4} >Not Avaiable</td></tr>}
                                                    </tbody>
                                                </table>
                                            </div>
                                            {/* pagination  */}
                                            <PaginationLayout count={state?.data?.total_count} data={state?.data?.data} limit={limit} loading={false}
                                                onPageChange={(e) => { navigate(`/staffs/${e}`, { replace: true }) }} page={Number(match.params.page)} />
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
export default StaffListing;