import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useMatch, useNavigate } from "react-router-dom";
import Spinner from "../../components/BootstrapCompo";
import BreadCrumb from "../../components/common/BreadCrumb";
import DownloadFileModal from "../../components/common/download-file-modal";
import PaginationLayout from "../../components/PaginationLayout";
import { brands } from "../../context/interfaces";
import { GlobalContext, handleError } from "../../context/Provider";
import henceforthApi from "../../utils/henceforthApi";
import NODATA from '../../assets/images/no-data-found.svg'
import { INSUFFICIENT_PERMISSIONS } from "../../context/actionTypes";

const BrandsListing = () => {

    let breadCrumbPath = [
        { name: 'Home', url: `/`, active: '' },
        { name: 'Brands List', url: ``, active: 'not-allowed' }
    ]
    const { loading, setLoading, onChangePagination } = useContext(GlobalContext);

    const match = useMatch(`/brands/:page`)
    let limit = 10
    const { authState } = useContext(GlobalContext);
    const navigate = useNavigate()
    const location = useLocation()
    const newParam = new URLSearchParams(location.search);
    const [state, setState] = useState({
        total_count: 0,
    } as brands)
    const initialise = async () => {

        setLoading(true)
        try {
            let apiRes = await henceforthApi.Brands.get(
                Number(match?.params.page) - 1,
                limit,
                newParam.toString(),
            )
            setState(apiRes.data)

        } catch (error: any) {
            if (error?.response?.body?.error === INSUFFICIENT_PERMISSIONS) {
                window.history.back()
            }
        } finally {
            setLoading(false)
        }
    }
    const handleSearch = (name: string, value: any) => {
        if (value) {
            newParam.set(name, value)
        } else {
            if (newParam.has(name)) {
                newParam.delete(name)
            }
        }
        navigate({ search: newParam.toString() })
    }
    const exportData = async (startDate: number, endDate: number) => {
        try {
            const apiRes = await henceforthApi.Brands.export(startDate, endDate)
            const data = apiRes?.data?.data
            const rows = [
                [
                    "Sr No.",
                    "Id",
                    "Name",
                    "Create At",
                ],
            ];
            if (Array.isArray(data)) {
                data.map((res: any, index: any) => {
                    rows.push([
                        index,
                        res._id,
                        String(res.name).replaceAll(",", " "),
                        moment(Number(res.created_at)).format("DD/MM/YYYY"),
                    ])
                })
            }
            let csvContent =
                "data:text/csv;charset=utf-8," +
                rows.map((e) => e.join(",")).join("\n");
            var encodedUri = encodeURI(csvContent);
            var link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", `category_${moment().valueOf()}.csv`);
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
    }, [match?.params.page, newParam.get("search"), authState?.lang])

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
                            <div className="row justify-content-between gy-3">
                                {/* serach and filter  */}
                                <div className="col-md-7">
                                    <div className="row">
                                        <div className="col-7">
                                            <div className='form-fields-box'>
                                                <label className='mb-1 form-label fw-semibold'>Search</label>
                                                <div className='position-relative'>
                                                    <input type="search" className="form-control rounded-0 ps-4 " name='search' placeholder="Search...  "
                                                        value={newParam.has('search') ? newParam.get('search') as string : ""}
                                                        onChange={(e) => handleSearch(e.target.name, e.target.value)}

                                                    />
                                                    <span className='search-icon'><i className='fa fa-search'></i></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* export  */}
                                <div className="col-md-2">
                                    <div className='d-flex gap-3 justify-content-md-end'>
                                        <div className='download-export-box'>
                                            <label className='mb-1 form-label fw-semibold'>Add</label>
                                            <div className="export-button">
                                                <Link to="/brands/add" className="btn btn-white"> <i className='fa fa-plus me-2'></i>Add</Link>
                                            </div>
                                        </div>
                                        {/* export  */}
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
                        {loading ? <div className='vh-100 d-flex justify-content-center py-5'> <Spinner /></div> :
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="common-card">
                                        <div className="common-card-title">
                                            <div className='d-flex align-items-center justify-content-between'>
                                                <h5>Brands</h5>
                                            </div>
                                        </div>

                                        <div className="common-card-content">
                                            {/* table */}
                                            <div className='data-list-table table-responsive mb-3'>
                                                <table className="table table-striped align-middle">
                                                    <thead className=''>
                                                        <tr>
                                                            <th>Sr.no</th>
                                                            <th>Name</th>
                                                            <th>Created At</th>
                                                            <th>Last update</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {Array.isArray(state?.data) && state?.data.length ? state?.data?.map((res: any, index: any) =>
                                                            <tr >
                                                                <td>{index + 1}</td>
                                                                <td>{res.name ? res.name : "Not Available"}</td>
                                                                <td>{moment(Number(res.created_at)).format("MMM Do YY")}</td>
                                                                <td>{moment(Number(res.updated_at)).format("MMM Do YY")}</td>
                                                                <td><div className="btn-group gap-2">
                                                                    <Link to={`/brands/${res._id}/edit?name=${res.name}`} className="btn btn-white btn-sm"><i className='fa fa-pencil me-2'></i>Edit</Link>
                                                                </div></td>
                                                            </tr>) : <tr><td colSpan={5} className="text-center py-3" ><img src={NODATA} width="100" /><p className='text-center mt-3'>No data found</p></td></tr>}
                                                    </tbody>
                                                </table>
                                            </div>
                                            <div className='dashboad-pagination-box'>
                                                <PaginationLayout
                                                    count={state?.total_count}
                                                    data={state?.data}
                                                    page={Number(match?.params.page)}
                                                    limit={Number(limit)}
                                                    onPageChange={(val: number) => onChangePagination(val)}
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
export default BrandsListing;