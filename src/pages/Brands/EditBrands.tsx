import { useContext, useState } from "react";
import { Link, useLocation, useMatch, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../../components/BootstrapCompo";
import { GlobalContext, handleError } from "../../context/Provider";
import henceforthApi from "../../utils/henceforthApi";

const EditBrands = () => {
    const match = useMatch("brands/:id/edit")
    const location = useLocation()
    const urlSearchParams = new URLSearchParams(location.search)
    const { loading, setLoading,authState } = useContext(GlobalContext)
    const [state, setstate] = useState({
        name: urlSearchParams.has("name") ? urlSearchParams.get("name") : ""
    })
    const navigate = useNavigate()
    const [error, setError] = useState({
        name: ""
    })

    const onChangeAdd = async (e: any) => {
        e.preventDefault()
        if (!state.name) {
            setError({
                name: "please enter name"
            })
            return
        }

        if (!state.name) return setError({ ...error, name: "Please enter name", })

        setLoading(true)
        const items = {
            _id: match?.params.id,
            name: state.name,
            language: authState.lang
        }
        try {
            let apiRes = await henceforthApi.Brands.edit(items)
            toast.success(apiRes.message)
            window.history.back()
        } catch (error) {
            handleError(error)
        } finally {
            setLoading(false)
        }
    }
    const handlechnage = ({ target }: any) => {
        let name = target.name;
        let value = target.value;
        setstate({
            ...state,
            [name]: value
        })
    }
    return (
        <>
            <section className="breadcrum-box">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            {/* title  */}
                            <h2 className="fw-semibold">Edit Brands</h2>
                            {/* breadcrum  */}
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb m-0">
                                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                    <li className="breadcrumb-item active fw-bold">Edit Brands</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
            {/* page  */}
            <div className='page-spacing'>
                <section className='product-detail'>
                    <div className="container-fluid">
                        <div className="row justify-content-center">
                            <div className="col-sm-10 col-md-6 col-lg-5 col-xl-4 col-xxl-3">
                                {/* Title  */}
                                <div className="common-card">
                                    <div className="common-card-title">
                                        <h5>Edit Brands</h5>
                                    </div>
                                    <div className="common-card-content">
                                        <form onSubmit={onChangeAdd} >
                                            {/* Input Field  */}
                                            <div className="form-fields-box mb-4 is-invalid">
                                                <label className="mb-1 fw-bold">Brand Name:</label>
                                                <input type="text" placeholder="Brands Name" className={`form-control ${error.name ? `is-invalid` : ``} rounded-0`}
                                                    value={state.name as string} name="name" onChange={handlechnage} required />
                                                {/* error msg  */}
                                                <div className={`${error.name ? "invalid-feedback" : ""}`}>
                                                    {error.name}
                                                </div>
                                            </div>
                                            {/* Button  */}
                                            <div className="button-box">
                                                <button type="submit" className='btn btn-theme w-100' disabled={loading}>{loading ? <Spinner /> : "Update Brand"} </button>
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
export default EditBrands