import { loadavg } from "os";
import { useState } from "react";
import { Link, useMatch, useMatches } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../../components/BootstrapCompo";
import { handleError } from "../../context/Provider";
import henceforthApi from "../../utils/henceforthApi";

const EditCommission = () => {

    const match = useMatch("/edit-commission/:fee")

    const [state, setState] = useState(match?.params.fee)
    const [loading, setLoading] = useState(false)
    const onChangeEdit = async (e: any) => {
        e.preventDefault()
        setLoading(true)
        const data = {
            fee_percent: state,
            language: "ENGLISH"
        }
        try {
            let apiRes = await henceforthApi.commission.editCommission(data)
            toast.success(apiRes.message)
            window.history.back()
        } catch (error) {
            handleError(error)
        } finally {
            setLoading(false)
        }
        setState('')
    }
    const back = () => {
        window.history.back()
    }

    return (
        <>
            {/* breadcrum  */}
            <section className="breadcrum-box">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            <h2>Edit Commission</h2>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb m-0">
                                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                    <li className="breadcrumb-item active fw-bold">Edit Commission</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
            {/* page  */}
            <div className='page-spacing'>
                <section className='edit-profile'>
                    <div className="container-fluid">
                        <div className="row justify-content-center">
                            <div className="col-sm-10 col-md-6 col-lg-5 col-xl-4 col-xxl-3">
                                {/* title  */}
                                <div className="common-card">
                                    <div className="common-card-title">
                                        <h5>Edit Commission</h5>
                                    </div>
                                    {/* form  */}
                                    <div className="common-card-content">

                                        <form onSubmit={onChangeEdit}>
                                            {/* Name */}
                                            <div className='form-fields-box mb-3'>
                                                <label>Percentage:</label>
                                                <input type="text" className="form-control rounded-0" value={state}
                                                    onChange={(e) => setState(e.target.value.replace(/\D/, ""))} name=""
                                                    placeholder="Enter commission fees"
                                                    required
                                                    />
                                            </div>
                                            {/* Submit Button  */}
                                            <div className='signin-button-box'>
                                                <ul className='list-unstyled d-flex gap-2'>
                                                    <li className='w-100'><button type='button' className='btn btn-white w-100 bg-danger text-white' disabled={loading} onClick={back}><i className='fa fa-ban me-2'></i>Cancel</button></li>
                                                    <li className='w-100'> <button type='submit' className='btn btn-theme w-100' disabled={loading}>{loading ? <Spinner /> : <span><i className='fa fa-save me-2' ></i>Save</span>}</button></li>
                                                </ul>
                                            </div>
                                        </form>
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
export default EditCommission;