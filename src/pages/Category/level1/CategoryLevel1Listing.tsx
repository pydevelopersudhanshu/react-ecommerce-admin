import { Link, useLocation, useMatch, useNavigate } from 'react-router-dom'
import DownloadFileModal from '../../../components/common/download-file-modal'
import { useContext, useEffect, useState } from 'react'
import henceforthApi from '../../../utils/henceforthApi'
import Swal from 'sweetalert2'
import PaginationLayout from '../../../components/PaginationLayout'
import { GlobalContext, handleError } from '../../../context/Provider'
import { listApiResponse } from '../../../context/interfaces'
import moment from 'moment'
import { toast } from 'react-toastify'
import BreadCrumb from '../../../components/common/BreadCrumb'
import Spinner from '../../../components/BootstrapCompo'
import { INSUFFICIENT_PERMISSIONS } from '../../../context/actionTypes'


const CategoryLevel1Listing = () => {
    let breadCrumbPath = [
        { name: 'Home', url: `/`, active: '' },
        { name: 'Category list', url: ``, active: 'not-allowed' }
    ]
    const limit = 10;
    const { authState } = useContext(GlobalContext);
    const navigate = useNavigate();
    const location = useLocation();
    const match = useMatch("/category/level-1/:page")
    const newParam = new URLSearchParams(location.search);
    const [state, setState] = useState({} as listApiResponse)
    const [loading, setLoading] = useState(false)


    const initialise = async () => {
        try {
            setLoading(true)
            const apiRes = await henceforthApi.Category.listCategory(
                newParam.toString(),
                Number(match?.params.page) - 1,
                limit,
                // language:authState.lang
            )
            setState(apiRes)
            console.log(apiRes)
        } catch (error: any) {
            if (error?.response?.body?.error === INSUFFICIENT_PERMISSIONS) {
                window.history.back()
            }
        } finally {
            setLoading(false)
        }
    }
    const onChangePagination = (page: number) => {
        navigate({ pathname: `/category/level-1/${page}`, search: newParam.toString() })

    }
    const onChangeDelete = async (_id: string, is_deleted: boolean) => {

        const data = {
            _id: _id,
            is_deleted,
            language: "ENGLISH"
        }
        Swal.fire({
            title: "Are you sure?",
            text: "Are You sure want to Delete!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: `Yes, ${is_deleted ? 'delete' : 'enable'} it!`,
        }).then(async (result: any) => {
            if (result.isConfirmed) {
                try {

                    let apiRes = await henceforthApi.Category.categoryDelete(data)
                    toast.success(apiRes.message)
                    initialise()
                } catch (error) {
                    handleError(error)
                }
            }
        })

    }

    const onSearch = (search: string) => {
        let urlSearchParams = new URLSearchParams();
        if (search) {
            urlSearchParams.set("search", search)
        }
        navigate({ search: urlSearchParams.toString() })
    }
    const exportData = async (startDate: number, endDate: number) => {
        try {
            const apiRes = await henceforthApi.Category.exportCategory(startDate, endDate)
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
    }, [newParam.get("search"), match?.params.page, authState?.lang])


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
                                                        value={newParam.get("search") as string} onChange={(e) => onSearch(e.target.value)} />
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
                                                <Link to="/category/level-1/add" className="btn btn-white"> <i className='fa fa-plus me-2'></i>Add</Link>
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
                        {loading ? <div className='d-flex justifly-cintent-center'><Spinner /></div> :
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="common-card">
                                        <div className="common-card-title">
                                            <div className='d-flex align-items-center justify-content-between'>
                                                <h5>Category list</h5>
                                            </div>
                                        </div>
                                        <div className="common-card-content">
                                            {/* table */}
                                            <div className='data-list-table table-responsive mb-3'>
                                                <table className="table table-striped align-middle">
                                                    <thead className='text-center'>
                                                        <tr>
                                                            <th>Sr.no</th>
                                                            <th>Name</th>
                                                            <th>Created At</th>
                                                            <th>Action</th>

                                                        </tr>
                                                    </thead>
                                                    <tbody className='text-center'>
                                                        {Array.isArray(state?.data?.data) && state?.data?.data?.length ? state?.data?.data?.map((res, index) =>
                                                            <tr key={res._id}>
                                                                <td>{Number(match?.params.page) == 0
                                                                    ? index + 1
                                                                    : (Number(match?.params.page) - 1) * limit + (index + 1)}</td>
                                                                <td>{res?.name ? res?.name ? res.name : "Not Avaiable" : "no"}</td>
                                                                <td>{moment(Number(res.created_at)).format("DD/MM/YYYY")}</td>
                                                                <td><div className="btn-group gap-2">

                                                                    <Link className="btn btn-white btn-sm" to={`/category/level-1/edit/${res.name}/${res.design_type == 1 ? "ELECTRONIC_PRODUCT" : 'WEARABLE_PRODUCT'}/${res._id}`}> <i className="fa fa-pencil me-1"></i>Edit</Link>

                                                                    {res.is_deleted ?
                                                                        <button className="btn btn-dark btn-sm text-white" onClick={() => onChangeDelete(res._id, false)}><i className='fa fa-exchange me-1'></i>Enable</button> :
                                                                        <button className="btn btn-danger btn-sm text-white" onClick={() => onChangeDelete(res._id, true)}><i className='fa fa-trash me-1'></i>Delete</button>
                                                                    }
                                                                </div></td>
                                                            </tr>
                                                        ) : <tr><td colSpan={4} className="text-center"> No data found </td></tr>}
                                                    </tbody>
                                                </table>
                                            </div>
                                            {/* pagination  */}
                                            <div className='dashboad-pagination-box'>
                                                <PaginationLayout
                                                    count={state?.data?.total_count}
                                                    data={state?.data?.data}
                                                    page={Number(match?.params.page)}
                                                    limit={Number(limit)}
                                                    // loading={loading}
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
export default CategoryLevel1Listing;