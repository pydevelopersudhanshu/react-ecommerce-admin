import '../../../assets/styles/auth.scss'
import '../../../assets/styles/pages.scss'
import profile_img from '../../../assets/images/pages/profile-image.jpg'
import { Link, useMatch, useNavigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import henceforthApi from '../../../utils/henceforthApi'
import { match } from 'assert'
import { GlobalContext, handleError } from '../../../context/Provider'
import Spinner from '../../../components/BootstrapCompo'
import { toast } from 'react-toastify'

const EditFeaturedCategories = () => {

    const match = useMatch(`/management/featured/:_id/edit`)
    const navigate = useNavigate()
    const { onChangeBack, category, loading, setLoading, authState,
        categoryId, setCategoryId, subCategory, subCategoryId, setSubCategoryId } = useContext(GlobalContext);
    const [state, setstate] = useState({
        title: "",
        price: "",
        image: "",
        category_id: {
            name: ""
        },
        subcategory_id: {
            name: ""
        }
    })
    const [file, setfile] = useState(null as any)
    const initialise = async () => {
        try {
            let apiRes = await henceforthApi.FeaturedCategories.detailsFeatured(match?.params._id)
            setstate(apiRes.message)
        } catch (error) {
            handleError(error)
        }
    }
    const fileUpload = async () => {
        try {
            const apiRes = await henceforthApi.Common.do_spaces_file_upload("file", file[0])
            const data = apiRes.data
            console.log(data)
            return data.file_name

        } catch (error) {
            handleError(error)
        }
    }
    const onHandleChange = async (e: any) => {
        e.preventDefault()
        try {
            setLoading(true)
            const image = await fileUpload()
            const data = {
                _id: match?.params._id,
                image: image,
                title: state.title,
                price: state.price,
                category_id: categoryId,
                subcategory_id: subCategoryId,
                language: authState.lang
            }
            let apiRes = await henceforthApi.FeaturedCategories.updateFeatured(data)
            toast.success(apiRes.message)
            window.history.back()
        } catch (error) {
            handleError(error)
        } finally {
            setLoading(false)
        }
    }
    const handleChange = (e: any) => {
        let name = e.target.name;
        let value = e.target.value;
        setstate({
            ...state,
            [name]: value
        })

    }
    useEffect(() => {
        initialise()
    }, [authState?.lang])

    return (
        <>
            {/* breadcrum  */}
            <section className="breadcrum-box">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            {/* title  */}
                            <h2 className="fw-semibold">Edit Featured Categories</h2>
                            {/* breadcrum  */}
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb m-0">
                                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                    <li className="breadcrumb-item active fw-bold">Edit Featured Categories</li>
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
                            <div className="col-sm-10 col-md-7 col-lg-6 col-xl-5 col-xxl-4">
                                {/* title  */}
                                <div className="common-card">
                                    <div className="common-card-title">
                                        <h5>Edit Featured Categories</h5>
                                    </div>
                                    {/* form  */}
                                    <div className="common-card-content">
                                        <form onSubmit={onHandleChange}>
                                            {/* Upload image */}
                                            <div className='upload-fields-box mb-3'>
                                                <div className='banner-edit-image full-home-image img mb-2'>
                                                    <div className='banner-edit-upload'>
                                                        <input type="file" accept='image/png, image/jpg, image/jpeg' onChange={(e) => setfile(e.target.files)} />
                                                    </div>
                                                    <img src={`${file ? URL.createObjectURL(file[0]) : state.image ? `${henceforthApi.API_FILE_ROOT_MEDIUM}${state.image}` : ""}`} alt="img" />
                                                </div>
                                                <p><small><strong>Note:-</strong> Please upload only .jpg and .png format only.</small></p>
                                            </div>
                                            {/* Title*/}
                                            <div className='form-fields-box mb-3'>
                                                <label className='mb-1 fw-bold'>Title</label>
                                                <input type="text" className="form-control rounded-0" value={state.title} name="title" onChange={handleChange} />
                                            </div>
                                            {/* Price */}
                                            <div className='form-fields-box mb-3'>
                                                <label className='mb-1 fw-bold'>Price(&#8377;)</label>
                                                <input type="text" className="form-control rounded-0" value={state.price} name="price" onChange={handleChange} />
                                            </div>
                                            {/* Category level-1 */}
                                            <div className='form-select-box mb-3 is-invalid'>
                                                <label className='mb-1 fw-bold'>Category level-1</label>
                                                <select className="form-select" aria-label="Default select example" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                                                    <option value="">{state.category_id?.name}</option>
                                                    {category.map((res: any) => {
                                                        return (
                                                            <>
                                                                <option value={res._id}>{res.name}</option>
                                                            </>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                            {/* Category level-2 */}
                                            <div className='form-select-box mb-3 is-invalid'>
                                                <label className='mb-1 fw-bold'>Category level-2</label>
                                                <select className="form-select" aria-label="Default select example" value={subCategoryId} onChange={(e) => setSubCategoryId(e.target.value)}>
                                                    <option value="">{state.subcategory_id?.name}</option>
                                                    {subCategory.map((res: any) => {
                                                        return (
                                                            <>
                                                                <option value={res._id}>{res.name}</option>
                                                            </>
                                                        )
                                                    })}

                                                </select>
                                            </div>
                                            {/* Submit Button  */}
                                            <div className='signin-button-box'>
                                                <ul className='list-unstyled d-flex gap-2'>
                                                    <li className='w-100'><button type='button' className='btn btn-white w-100 bg-danger text-white' onClick={onChangeBack} disabled={loading} ><i className='fa fa-ban me-2'></i>Cancel</button></li>
                                                    <li className='w-100'> <button type='submit' className='btn btn-theme w-100' disabled={loading}><i className='fa fa-save me-2'></i>{loading ? <Spinner /> : "Save"}</button></li>
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
export default EditFeaturedCategories;