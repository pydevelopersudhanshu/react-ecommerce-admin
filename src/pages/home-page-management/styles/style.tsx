import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { INSUFFICIENT_PERMISSIONS } from "../../../context/actionTypes";
import { GlobalContext } from "../../../context/Provider";
import henceforthApi from "../../../utils/henceforthApi";
interface datalist {
    name: string
}

const Style = () => {
    const [data, setData] = useState<Array<datalist>>([])
    const { authState } = useContext(GlobalContext);

    const styleList = async () => {
        let apiRes = await henceforthApi.StyleFor.listing()
        console.log(apiRes);
        setData(apiRes.data.data)
    }
    useEffect(() => {
        styleList()
    }, [authState?.lang])
    return (
        <div className='page-spacing'>
            <section className='product-listing'>
                <div className="container-fluid">
                    <div className="row">
                        {/* 1  */}
                        <div className="col-md-6">
                            <div className="common-card">
                                <div className="common-card-content">
                                    <div className="profile-image">
                                        <div className='form-select-box  mb-3'>
                                            {data?.map(item => <div>
                                                <div>
                                                    <label className='mb-1 fw-bold'>Style For {item.name}</label>
                                                    <input type="text" className="form-control" value={item.name} placeholder="name" />
                                                </div>
                                                <div className="profile-button d-flex gap-2 mt-auto">
                                                    <button className='btn btn-white bg-danger text-white border-danger w-100'><i className='fa fa-trash me-2'></i> Delete</button>
                                                    <Link to="/edit-style-for-kids" className='btn btn-theme w-100'><i className='fa fa-pencil me-2'></i> Edit</Link>
                                                </div>
                                            </div>)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pagination  */}
                    <div className="row">
                        <div className="col-md-12">
                            <div className="common-card">
                                <div className="common-card-content">

                                    {/* pagination  */}
                                    <div className='dashboad-pagination-box'>
                                        <nav aria-label="Page navigation example">
                                            <ul className="pagination justify-content-end mb-0">
                                                <li className="page-item">
                                                    <Link className="page-link btn btn-sm btn-white" to="" aria-label="Previous">
                                                        <span aria-hidden="true">&laquo;</span>
                                                    </Link>
                                                </li>
                                                <li className="page-item"><Link className="page-link btn btn-sm btn-white rounded-0" to="">1</Link></li>
                                                <li className="page-item"><Link className="page-link btn btn-sm btn-white rounded-0 active-btn" to="">2</Link></li>
                                                <li className="page-item"><Link className="page-link btn btn-sm btn-white rounded-0" to="">3</Link></li>
                                                <li className="page-item">
                                                    <Link className="page-link btn btn-sm btn-white" to="" aria-label="Next">
                                                        <span aria-hidden="true">&raquo;</span>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    )
}
export default Style;