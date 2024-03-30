import { useContext, useEffect, useState } from "react";
import henceforthApi from "../../../utils/henceforthApi";
import { Link } from "react-router-dom";
import Spinner from "../../../components/BootstrapCompo";
import { toast } from "react-toastify";
import { GlobalContext } from "../../../context/Provider";

const AddCategoryLevel3 = () => {

    const [subcategory, setCategory] = useState({
        data: []
    })
    const [categoryId, setCategoryId] = useState<any>("")
    const [loading, setloading] = useState(false)
    const [name, setName] = useState("")
    const [subSubCategoryError, setSubSubCategoryError] = useState("")
    const [nameError, setNameError] = useState("")
    const { authState, authDispatch } = useContext(GlobalContext);


    const AddSubCategory = async (e: any) => {
        e.preventDefault()


        if (!categoryId) {
            return setSubSubCategoryError("Please select Sub-category")
        } if (!name) {
            return setNameError("Please Enter sub-categoryName ")
        }

        if (!categoryId) return setSubSubCategoryError("Please select Sub-Category")
        if (!name) return setNameError("Please select category")
        setloading(true)
        try {
            const data = {
                subcategory_id: categoryId,
                name: name,
                language: authState.lang
            }
            const apiRes = await henceforthApi.Category.addSubSubCategory(data)
            toast.success(apiRes.message)
            window.history.back()
        } catch {
            console.log("error")
        } finally {
            setloading(false)
        }
    }

    const initialiseCategory = async () => {
        try {
            const apiRes = await henceforthApi.Category.listSubCategory()
            setCategory(apiRes?.data)
        } catch {
            console.log("error")
        }
    }

    useEffect(() => {
        initialiseCategory()
    }, [authState?.lang])

    return (
        <>
            <section className="breadcrum-box">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            {/* title  */}
                            <h2 className="fw-semibold">Add Sub Sub-Categories</h2>
                            {/* breadcrum  */}
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb m-0">
                                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                    <li className="breadcrumb-item active fw-bold">Add Sub sub-Categories</li>
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
                                        <h5>Add Sub Sub-Categories</h5>
                                    </div>
                                    <div className="common-card-content">
                                        <form onSubmit={AddSubCategory}>
                                            {/* sub Categories  */}
                                            <div className="form-select-box mb-3 is-invalid">
                                                <label className="mb-1 fw-bold">Select sub-Category</label>
                                                <select className={`form-select ${subSubCategoryError ? `is-invalid` : ''}`} aria-label="Default select example" value={categoryId} onChange={(e) => { setSubSubCategoryError(""); setCategoryId(e.target.value) }}>
                                                    <option value="">Select</option>
                                                    {subcategory?.data.map((response: any) => <option value={response._id}>{response.name}</option>)}
                                                </select>
                                                {/* error msg */}
                                                <div className={`${subSubCategoryError ? "invalid-feedback" : ""}`}>
                                                    {subSubCategoryError}
                                                </div>
                                            </div>
                                            {/* sub Categories Name  */}
                                            <div className="form-fields-box mb-3 is-invalid">
                                                <label className="mb-1 fw-bold">Sub Sub-Category Name:</label>
                                                <input type="text" className={`form-control ${nameError ? `is-invalid` : ""} `} placeholder="Enter Sub-Category Name" value={name} onChange={(e) => { setNameError(""); setName(e.target.value) }} />
                                                {/* error msg */}
                                                <div className={`${nameError ? "invalid-feedback" : ""}`}>
                                                    {nameError}
                                                </div>
                                            </div>
                                            {/* Submit button  */}
                                            <div className="button-box">
                                                <button className='btn btn-theme w-100' disabled={loading}>{loading ? <Spinner /> : "Add Sub-Category"}</button>
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
export default AddCategoryLevel3;