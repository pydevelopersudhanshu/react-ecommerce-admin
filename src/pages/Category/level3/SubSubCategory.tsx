import { useContext, useEffect, useState } from "react"
import { Link, useMatch, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import Spinner from "../../../components/BootstrapCompo"
import { GlobalContext, handleError } from "../../../context/Provider"
import henceforthApi from "../../../utils/henceforthApi"


const SubSubCategoryEdit = () => {
    const match = useMatch("/category/level-3/edit/:name/:id")
    const navigate = useNavigate()
    const [categoryNameError, setCategoryError] = useState("")
    const [subSubCategoryName, setSubSubCategoryName] = useState(match?.params.name)
    const [loading, setloading] = useState(false)
    const [subcategory, setCategory] = useState({
        data: []
    })
    const { authState } = useContext(GlobalContext);
    const [SubcategoryId, setSubCategoryId] = useState<any>("")
    const [state, setState] = useState({
        subcategory_id: {
            name: ""
        }
    })


    const initialiseSubSubCategory = async () => {
        try {
            let apiRes = await henceforthApi.Category.detailsSubSubCategory(match?.params.id)
            setState(apiRes?.data)
        } catch (error) {
            handleError(error)
        }
    }
    const initialiseSubCategory = async () => {
        try {
            const apiRes = await henceforthApi.Category.listSubCategory()
            setCategory(apiRes?.data)
        } catch {
            console.log("error")
        }
    }


    const editCategory = async (e: any) => {

        e.preventDefault()
        if (!subSubCategoryName) {
            return setCategoryError("Please Enter CategoryName")
        }

        if (!subSubCategoryName) return setCategoryError("Please Enter CategoryName")
        setloading(true)
        const data = {
            _id: match?.params.id,
            name: subSubCategoryName,
            subcategory_id: SubcategoryId,
            is_deleted: false,
            language: authState.lang
        }
        try {
            let apiRes = await henceforthApi.Category.editSubSubCategory(data)
            toast.success(apiRes.message)
            window.history.back()
        } catch (error) {
            handleError(error)
        } finally {
            setloading(false)
        }
    }

    useEffect(() => {
        initialiseSubSubCategory()
    }, [authState?.lang])
    useEffect(() => {
        initialiseSubCategory()
    }, [authState?.lang])
    return (
        <>
            <section className="breadcrum-box">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            {/* title  */}
                            <h2 className="fw-semibold">Edit Sub-SubCategories</h2>
                            {/* breadcrum  */}
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb m-0">
                                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                    <li className="breadcrumb-item active fw-bold">Edit Sub-SubCategories</li>
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
                        <div className="row">
                            <div className="col-sm-12 col-md-7 col-lg-6 col-xl-5 col-xxl-3">
                                {/* Title  */}
                                <div className="common-card">
                                    <div className="common-card-title">
                                        <h5>Edit Categories</h5>
                                    </div>
                                    <div className="common-card-content">
                                        <form onSubmit={editCategory} >
                                            {/* Input Field  */}
                                            <div className="form-fields-box mb-4 is-invalid">
                                                <label className="mb-1 fw-bold">Category Name:</label>
                                                <input type="text" placeholder="Category Name" className={`form-control ${categoryNameError ? `is-invalid` : ``} rounded-0`} value={subSubCategoryName}
                                                    onChange={(e: any) => { if (categoryNameError) { setCategoryError("") } setSubSubCategoryName(e.target.value) }} />
                                                {/* error msg  */}
                                                <div className={`${categoryNameError ? "invalid-feedback" : ""}`}>
                                                    {categoryNameError}
                                                </div>
                                            </div>
                                            <div className="form-select-box mb-3 is-invalid">
                                                <label className="mb-1 fw-bold">Select sub-Category</label>
                                                <select className="form-select" aria-label="Default select example" value={SubcategoryId} onChange={(e) => setSubCategoryId(e.target.value)}>
                                                    <option value="">{state?.subcategory_id?.name}</option>
                                                    {subcategory?.data.map((response: any) => <option value={response._id}>{response.name}</option>)}
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
export default SubSubCategoryEdit