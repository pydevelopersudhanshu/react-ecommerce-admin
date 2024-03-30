import '../../assets/styles/pages.scss'
import { Link, useLocation, useMatch, useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import henceforthApi from '../../utils/henceforthApi'
import { GlobalContext, handleError } from '../../context/Provider'
import PaginationLayout from '../../components/PaginationLayout'
import Spinner from '../../components/BootstrapCompo'
import Swal from 'sweetalert2'
import BreadCrumb from '../../components/common/BreadCrumb'
import { INSUFFICIENT_PERMISSIONS } from '../../context/actionTypes'
interface contactList {
    name: string,
    email: string,
    phone_no: string,
    resolved: boolean,
    message: string,
    _id: string
}
interface list {
    data: Array<contactList>
    total_count: number
}
const ContactUs = () => {

    let breadCrumbPath = [
        { name: 'Home', url: `/`, active: '' },
        { name: 'Contact Us', url: ``, active: 'not-allowed' }
    ]
    const { authState } = useContext(GlobalContext);
    const [state, setstate] = useState({} as list)
    const [searchData, setSearchData] = useState("");
    const [loading, setLoading] = useState<boolean>(false);
    const match: any = useMatch("contact-us/:page")
    const limit = 10;
    const location = useLocation()
    const navigate = useNavigate()
    const newparam = new URLSearchParams(location.search)


    const contact = async () => {
        try {
            setLoading(true)
            let res = await henceforthApi.ContactUs.pagination(match.params.page - 1, newparam.toString())
            setstate(res.data);
            setLoading(false)

        } catch (error: any) {
            if (error?.response?.body?.error === INSUFFICIENT_PERMISSIONS) {
                window.history.back()
            }
        }

    }
    const resolveStatus = async (id: string) => {
        let items = {
            _id: id,
            type: "RESOLVE",
            language: "ENGLISH"
        }
        try {
            await henceforthApi.ContactUs.resolveContact(items)
            contact()
        }
        catch (error) {
            handleError(error)
        }
    }
    const deleteContact = async (id: string, index: number) => {
        let items = {
            _id: id,
            type: "DELETE",
            language: "ENGLISH"
        }
        Swal.fire({
            title: "Are you sure?",
            text: "Are You sure want to Delete!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result: any) => {
            if (result.isConfirmed) {
                try {
                    await henceforthApi.ContactUs.deleteContact(items)
                    contact()
                }
                catch (error) {
                    handleError(error)
                }
                finally { }
            }
        })

    }
    const onChangePagination = (val: string) => {
        navigate({ pathname: `/contact-us/${val}`, search: newparam.toString() })
    }
    const onSearch = async (name: string, value: any) => {
        if (value) {
            newparam.set(name, value)
        } else {
            newparam.delete(name)
        }
        if (searchData) {
            navigate({ pathname: `/contact-us/1`, search: newparam.toString() });
        } else {
            navigate(`/contact-us/1`);
        }
    };
    useEffect(() => {
        contact()
    }, [newparam.get('search'), authState?.lang])
    return (
        <>
            {/* breadcrum  */}

            <BreadCrumb pathNameDeclare={breadCrumbPath} />
            {/* page  */}

            <div className='page-spacing'>
                <section className='product-listing'>
                    <div className="container-fluid">
                        {/* Contact  */}
                        <div className="row">
                            <div className="col-md-12">
                                <div className="common-card common-card mb-4 border-0 card-spacing">
                                    <div className="row">
                                        <div className="col-md-7 col-sm-8 col-lg-6 col-xl-5 col-xxl-4">
                                            {/* serach and filter  */}
                                            <div className='form-fields-box'>
                                                <label className='mb-1 form-label fw-semibold'>Search</label>
                                                <div className='position-relative'>
                                                    <input type="search" value={searchData} name='search' className="form-control rounded-0 ps-4 " placeholder="Search by Name, Email"
                                                        onChange={(e: any) => {
                                                            setSearchData(e.target.value);
                                                            onSearch(e.target.name, e.target.value);
                                                        }}
                                                    />
                                                    <span className='search-icon'><i className='fa fa-search'></i></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="common-card">
                                    <div className="common-card-title">
                                        <h5>Contact Us</h5>
                                    </div>
                                    <div className="common-card-content">
                                        <div className="">
                                            {/* list table */}
                                            <div className='data-list-table table-responsive mb-3'>
                                                {loading ? <div className=' d-flex justify-content-center py-5'>
                                                    <Spinner />
                                                </div> :
                                                    <table className="table table-striped align-middle">
                                                        <thead className=''>
                                                            <tr>
                                                                <th>Sr.No.</th>
                                                                <th>Name</th>
                                                                <th>Message</th>
                                                                <th>Phone</th>
                                                                <th>Email</th>
                                                                <th>Status</th>
                                                                <th>Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {Array.isArray(state?.data) && state?.data?.length ? state?.data?.map((res, index: number) => {
                                                                return (
                                                                    <>
                                                                        <tr key={res._id}>
                                                                            <td>
                                                                                {match?.params.page == 0
                                                                                    ? index + 1
                                                                                    : (match?.params.page - 1) * limit + (index + 1)}
                                                                            </td>
                                                                            <td>{res.name ? res?.name : "Not available"}</td>
                                                                            <td>{res?.message ? res?.message : "Not available"}</td>
                                                                            <td>{res?.phone_no ? res?.phone_no : "Not available"}</td>
                                                                            <td>{res?.email ? res?.email : "Not available"}</td>
                                                                            <td>
                                                                                <div className="btn-group gap-2">
                                                                                    {/* Resolved Button  */}
                                                                                    <button className="btn p-0" type="button" onClick={() => resolveStatus(res?._id)}>{res?.resolved == false ?
                                                                                        <span className='text-white text-bg-warning  px-2 py-half rounded-half fs-10 fw-semibold'>
                                                                                            <i className='fa fa-info-circle me-1 text-white'></i> Pending
                                                                                        </span>
                                                                                        :
                                                                                        <span className='text-white bg-success  px-2 py-half rounded-half fs-10 fw-semibold'>
                                                                                            <i className='fa fa-check-circle-o me-1'></i> Resolved
                                                                                        </span>}
                                                                                    </button>
                                                                                </div>
                                                                            </td>
                                                                            <td>
                                                                                <div className="btn-group gap-2">
                                                                                    <button className="btn btn-white btn-sm" type="button" onClick={() => deleteContact(res?._id, index)}> <i className='fa fa-trash me-1'></i>{loading ? <Spinner /> : "Delete"}</button>
                                                                                </div>
                                                                            </td>
                                                                        </tr>
                                                                    </>
                                                                )
                                                            }) : <tr><td colSpan={7} className="text-center">No Data Found</td></tr>}
                                                            <tr>
                                                            </tr>
                                                        </tbody>
                                                    </table>}
                                            </div>
                                            {/* pagination  */}
                                            <div className='dashboad-pagination-box'>
                                                <PaginationLayout
                                                    count={state.total_count}
                                                    data={state}
                                                    page={Number(match.params.page)}
                                                    limit={Number(limit)}
                                                    // loading={loading}
                                                    onPageChange={(val: any) => onChangePagination(val)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}
export default ContactUs;