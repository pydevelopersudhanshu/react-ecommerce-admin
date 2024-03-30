import { useContext, useEffect, useState } from "react"
import { Link, useMatch, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Spinner from "../../../components/BootstrapCompo"
import { GlobalContext, handleError } from "../../../context/Provider"
import henceforthApi from "../../../utils/henceforthApi"


const SubCategoryEdit = () => {
    const match = useMatch("/category/level-2/edit/:name/:id")
    const navigate = useNavigate()
    const [categoryNameError, setCategoryError] = useState("")
    const [subCategoryName, setSubCategoryName] = useState(match?.params.name)
    const [loading, setloading] = useState(false)
    const [categoryId, setCategoryId] = useState<any>("")
    const { authState } = useContext(GlobalContext);

    const [category, setCategory] = useState({
        data: []
    })
    const [state, setState] = useState({
        category_id: {
            name: ""
        }
    })


    const initialiseSubCategory = async () => {
        try {
            let apiRes = await henceforthApi.Category.detailsSubCategory(match?.params.id)
            setState(apiRes?.data)
        } catch (error) {
            handleError(error)
        }
    }
    const initialiseCategory = async () => {
        try {
            const apiRes = await henceforthApi.Category.listCategory()
            setCategory(apiRes?.data)
        } catch {
            console.log("error")
        }
    }

    const editCategory = async (e: any) => {

        e.preventDefault()
        if (!subCategoryName) {
            return setCategoryError("Please Enter CategoryName")
        }

        if (!subCategoryName) return setCategoryError("Please Enter CategoryName")
        setloading(true)
        const data = {
            _id: match?.params.id,
            name: subCategoryName,
            category_id: categoryId,
            is_deleted: false,
            language: authState.lang
        }
        try {
            let apiRes = await henceforthApi.Category.editSubCategory(data)
            toast.success(apiRes.message)
            window.history.back()
        } catch (error) {
            handleError(error)
        } finally {
            setloading(false)
        }
    }

    useEffect(() => {
        initialiseSubCategory()
    }, [authState?.lang])
    useEffect(() => {
        initialiseCategory()
    }, [authState?.lang])
    console.log(categoryId)

    return (
        <>
            <section className="breadcrum-box">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            {/* title  */}
                            <h2 className="fw-semibold">Edit Sub-Categories</h2>
                            {/* breadcrum  */}
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb m-0">
                                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                    <li className="breadcrumb-item active fw-bold">Edit Sub-Categories</li>
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
                                        <h5>Edit Sub-Categories</h5>
                                    </div>
                                    <div className="common-card-content">
                                        <form onSubmit={editCategory} >
                                            {/* Input Field  */}
                                            <div className="form-fields-box mb-4 is-invalid">
                                                <label className="mb-1 fw-bold">SubCategory Name:</label>
                                                <input type="text" placeholder="Category Name" className={`form-control ${categoryNameError ? `is-invalid` : ``} rounded-0`} value={subCategoryName}
                                                    onChange={(e: any) => { if (categoryNameError) { setCategoryError("") } setSubCategoryName(e.target.value) }} />
                                                {/* error msg  */}
                                                <div className={`${categoryNameError ? "invalid-feedback" : ""}`}>
                                                    {categoryNameError}
                                                </div>
                                            </div>
                                            <div className="form-select-box mb-3 is-invalid">
                                                <label className="mb-1 fw-bold">Select Category</label>
                                                <select className="form-select" aria-label="Default select example" value={categoryId}
                                                    onChange={(e) => { setCategoryError(""); setCategoryId(e.target.value) }}
                                                >
                                                    <option value="">{state?.category_id?.name}</option>
                                                    {category?.data.map((response: any) => <option value={response._id}>{response.name}</option>)}
                                                </select>
                                            </div>

                                            {/* Button  */}
                                            <div className="button-box">
                                                <button type="submit" className='btn btn-theme w-100' disabled={loading}>{loading ? <Spinner /> : "Edit Category"}</button>
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
export default SubCategoryEdit