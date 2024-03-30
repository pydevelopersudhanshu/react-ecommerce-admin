import '../../assets/styles/auth.scss'
import '../../assets/styles/pages.scss'
import { Link, useLocation, useMatch, useNavigate, useParams } from 'react-router-dom'
import DownloadFileModal from '../../components/common/download-file-modal'
import { Fragment, useContext, useEffect, useState } from 'react'
import Spinner from '../../components/BootstrapCompo'
import PaginationLayout from '../../components/PaginationLayout'
import profile_placeholder from '../../assets/images/pages/profile_placeholder.png'

const AllTransaction = () => {
    return (
        <>
            {/* breadcrum  */}


            {/* breadcrum  */}
            <section className="breadcrum-box">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            {/* title  */}
                            <h2 className="fw-semibold">All Tranactions</h2>
                            {/* breadcrum  */}
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb m-0">
                                    <li className="breadcrumb-item"><Link to="">Home</Link></li>
                                    <li className="breadcrumb-item active fw-bold">All Tranactions</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>


            {/* Page  */}
            <div className=' page-spacing'>
                <section className='product-listing'>
                    <div className='product-detail-box'>
                        <div className='common-card mb-4 border-0 card-spacing'>
                            <div className="row justify-content-between">
                                {/* serach and filter  */}
                                <div className="col-md-8">
                                    <div className="row">
                                        <div className="col-7">
                                            <div className='form-fields-box'>
                                                <label className='mb-1 form-label fw-semibold'>Search</label>
                                                <div className='position-relative'>
                                                    <input type="search" className="form-control rounded-0 ps-4 " name='search'
                                                        placeholder="Search..."
                                                    />
                                                    <span className='search-icon'><i className='fa fa-search'></i></span>
                                                </div>
                                            </div>
                                        </div>
                                        {/* filter */}
                                        <div className="col-3">
                                            <div className='form-select-box'>
                                                <label className='mb-1 form-label fw-semibold'>Filter</label>
                                                <select className="form-select shadow-none" aria-label="Default select example">
                                                    <option selected disabled>Filter By</option>
                                                    <option value="3">Order status</option>
                                                    <option value="4">Out of stock</option>
                                                    <option value="5">Alert of stock</option>
                                                    <option value="5"> Order date</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-2">
                                            <div className='form-select-box'>
                                                <label className='mb-1 form-label fw-semibold'>Price Filter</label>
                                                <div className="dropdown">
                                                    <button className="btn btn-white dropdown-toggle shadow-none" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                        Select</button>
                                                    <ul className="dropdown-menu pb-0">
                                                        <li>
                                                            <a className="dropdown-item" href='#'>
                                                                <div className="form-check d-flex gap-2">
                                                                    <label className="form-check-label" htmlFor="flexCheckDefault1">
                                                                        <input className="form-check-input shadow-none" type="radio" name='filterPrice' id="flexCheckDefault1" />
                                                                        &#36; 100 <span>-</span> 500
                                                                    </label>
                                                                </div>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a className="dropdown-item" href='#'>
                                                                <div className="form-check d-flex gap-2">
                                                                    <label className="form-check-label" htmlFor="flexCheckDefault2">
                                                                        <input className="form-check-input shadow-none" type="radio" name='filterPrice' id="flexCheckDefault2" />
                                                                        &#36; 501 <span>-</span> 1000
                                                                    </label>
                                                                </div>
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a className="dropdown-item" href='#'>
                                                                <div className="form-check d-flex gap-2">
                                                                    <label className="form-check-label" htmlFor="flexCheckDefault3">
                                                                        <input className="form-check-input shadow-none" type="radio" name='filterPrice' id="flexCheckDefault3" />
                                                                        &#36; 1001 <span>-</span> 2000
                                                                    </label>
                                                                </div>
                                                            </a>
                                                        </li>
                                                        <li>
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
                                {/* export  */}
                                <div className="col-md-2">
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
                                <h5>Transactions</h5>
                            </div>
                            <div className="common-card-content">

                                <ul className="nav nav-pills mb-3 transactions-tabs" id="pills-tab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link active" id="pills-completed-tab" data-bs-toggle="pill" data-bs-target="#pills-completed" type="button" role="tab" aria-controls="pills-completed" aria-selected="true">Completed</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link" id="pills-failed-tab" data-bs-toggle="pill" data-bs-target="#pills-failed" type="button" role="tab" aria-controls="pills-failed" aria-selected="false">In Complete</button>
                                    </li>

                                </ul>
                                <div className="tab-content" id="pills-tabContent">
                                    {/* Completed  */}
                                    <div className="tab-pane fade show active" id="pills-completed" role="tabpanel" aria-labelledby="pills-completed-tab">
                                        {/* table */}
                                        <div className='data-list-table table-responsive mb-3'>
                                            <table className="table table-striped align-middle">
                                                <thead className=''>
                                                    <tr>
                                                        <th>Order Id</th>
                                                        <th>Product ID</th>
                                                        <th>Product Detail</th>
                                                        <th>Customer Detail</th>
                                                        <th>Date Time</th>
                                                        <th>Status</th>
                                                        <th>Order Amount</th>
                                                        <th>Earning</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>1234</td>
                                                        <td>1234</td>
                                                        <td className='product-image-table'>
                                                            <img src={profile_placeholder} alt="icon" /> Laptop
                                                        </td>
                                                        <td className='product-image-table'>
                                                            <img src={profile_placeholder} alt="icon" /> Pankaj
                                                        </td>
                                                        <td className='product-image-table'>
                                                            24 Nov 2022, 08:20 PM
                                                        </td>
                                                        <td>Completed</td>
                                                        <td >
                                                            <b>&#36;</b>12000
                                                        </td>
                                                        <td><b>&#36;</b>1000</td>
                                                        <td>
                                                            <div className="btn-group gap-2">
                                                                <Link className="btn btn-white btn-sm" to="#!"> <i className="fa fa-eye me-1"></i>View</Link>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    {/* In-Completed  */}
                                    <div className="tab-pane fade" id="pills-failed" role="tabpanel" aria-labelledby="pills-failed-tab">
                                        {/* table */}
                                        <div className='data-list-table table-responsive mb-3'>
                                            <table className="table table-striped align-middle">
                                                <thead className=''>
                                                    <tr>
                                                        <th>Order Id</th>
                                                        <th>Product ID</th>
                                                        <th>Product Detail</th>
                                                        <th>Customer Detail</th>
                                                        <th>Date Time</th>
                                                        <th>Status</th>
                                                        <th>Order Amount</th>
                                                        <th>Earning</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>1234</td>
                                                        <td>1234</td>
                                                        <td className='product-image-table'>
                                                            <img src={profile_placeholder} alt="icon" /> Laptop
                                                        </td>
                                                        <td className='product-image-table'>
                                                            <img src={profile_placeholder} alt="icon" /> Pankaj
                                                        </td>
                                                        <td className='product-image-table'>
                                                            24 Nov 2022, 08:20 PM
                                                        </td>
                                                        <td>Failed</td>
                                                        <td >
                                                            <b>&#36;</b>12000
                                                        </td>
                                                        <td><b>&#36;</b>0</td>
                                                        <td>
                                                            <div className="btn-group gap-2">
                                                                <Link className="btn btn-white btn-sm" to="#!"> <i className="fa fa-eye me-1"></i>View</Link>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>


                                {/* pagination  */}
                                {/* <div className='dashboad-pagination-box'>
                                    <PaginationLayout
                                        count={totalCount}
                                        data={state?.data}
                                        page={Number(match?.params.page)}
                                        limit={Number(limit)}
                                        loading={loading}
                                        onPageChange={(val: any) => onChangePagination(val)}
                                    />
                                </div> */}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <DownloadFileModal />
        </>
    )
}
export default AllTransaction;