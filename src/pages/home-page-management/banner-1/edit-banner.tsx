import '../../../assets/styles/auth.scss'
import '../../../assets/styles/pages.scss'
import { Link, useMatch } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import henceforthApi from '../../../utils/henceforthApi'
import { GlobalContext, handleError } from '../../../context/Provider'
import { toast } from 'react-toastify'
import Spinner from '../../../components/BootstrapCompo'

const EditBanner = () => {

    const { onChangeBack, category, categoryId, setCategoryId, subCategory, subCategoryId, authState,
        setSubCategoryId, subSubCategoryId, subSubCategory, setSubSubcategoryId, brandID, brand, setbrandID } = useContext(GlobalContext);
    const match: any = useMatch("/management/banner1/:type/:_id/edit")
    const [loading, setloading] = useState(false)
    const [showimg, setshowimg] = useState(true)
    const [position, setposition] = useState("")
    const [isCategory, setIsCategory] = useState(false)
    const [state, setstate] = useState({
        image: "",
        title: "",
        sub_title: "",
        category_id: {
            name: "",
            _id: ""
        },
        sub_subcategory_id: {
            name: "",
            _id: ""
        },
        subcategory_id: {
            name: "",
            _id: ""
        },
        brand_id: {
            name: "",
            _id: ""
        },
        position: ""
    })
    console.log(category, 'state,,,,,,,,,,,');

    const fileUpload = async (name: string) => {
        debugger
        try {
            const apiRes = await henceforthApi.Common.do_spaces_file_upload("file", name)
            const data = apiRes.data
            console.log(data)
            setstate({
                ...state,
                image: data?.file_name
            })

        } catch { }
    }
    console.log(categoryId, subCategoryId, subSubCategoryId);

    const handlesubmit = async (e: any) => {
        e.preventDefault()
        if (isCategory && !subCategoryId) {
            return toast.warn('Please select subcategory')
        }
        setloading(true)
        try {
            const data = {
                _id: match.params._id,
                image: state?.image,
                category_id: categoryId || state?.category_id?._id,
                subcategory_id: isCategory ? subCategoryId : state?.subcategory_id?._id,
                sub_subcategory_id: isCategory ? subSubCategoryId : state?.sub_subcategory_id?._id,
                brand_id: brandID || state?.brand_id?._id,
                position: position ? position.toUpperCase() : state?.position,
                language: authState.lang
            }
            let apires = await henceforthApi.HomeManagemnt.editbanner(data)
            toast.success(apires.message)
            window.history.back()
        } catch (error) {
            handleError(error)
        } finally {
            setloading(false)
        }
    }
    const Removeimage = () => {
        const element = document.getElementById('rem')
        setstate({ image: "" } as any)
        setshowimg(false)
    }
    const initialise = async () => {
        try {
            let apires = await henceforthApi.HomeManagemnt.viewbanner(match?.params._id)
            setstate(apires?.message)
        } catch (error) {

        } finally {

        }
    }
    useEffect(() => {
        initialise()
    }, [])

    return (
        <>
            {/* breadcrum  */}
            <section className="breadcrum-box">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            {/* title  */}
                            <h2 className="fw-semibold">Edit Banner</h2>
                            {/* breadcrum  */}
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb m-0">
                                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                    <li className="breadcrumb-item active fw-bold">Edit Banner</li>
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
                                        <h5>Edit Banner</h5>
                                    </div>
                                    {/* form  */}
                                    <div className="common-card-content">
                                        <form onSubmit={handlesubmit}>
                                            {/* Upload image */}
                                            <div className='upload-fields-box mb-3 position-relative'>
                                                <div className='banner-edit-image mb-2'>
                                                    <div className='banner-edit-upload'>
                                                        <input type="file" onChange={(e: any) => fileUpload(e.target.files[0])} accept="image/*" />
                                                    </div>
                                                    <img src={`${henceforthApi.API_FILE_ROOT_ORIGINAL}${state.image}`} alt="img" id="rem" />
                                                </div>
                                                <p><small><strong>Note:-</strong> Please upload only .jpg and .png format only.</small></p>
                                                {/* Remove Button  */}
                                                <div className='remove-image-button'>
                                                    {showimg === true ? <button type='button' className='btn w-100 text-white bg-danger border-danger rounded-0' onClick={Removeimage}><i className='fa fa-trash me-2'></i>Remove Image</button> : ""}

                                                </div>
                                            </div>
                                            {/* Title
                                            <div className='form-fields-box mb-3'>
                                                <label className='mb-1 fw-bold' >Title</label>
                                                <input type="text" className="form-control rounded-0" value={state.title} onChange={handlechnage} name="title" />
                                            </div>
                                            Sub Title
                                            <div className='form-fields-box mb-3'>
                                                <label className='mb-1 fw-bold'>Sub Title</label>
                                                <input type="text" className="form-control rounded-0" value={state.sub_title} onChange={handlechnage} name="sub_title" />
                                            </div> */}
                                            {/* postion Banner */}
                                            <div className='form-select-box mb-3'>
                                                <label className='mb-1 fw-bold'>position</label>
                                                <select className="form-select" aria-label="Default select example" value={position} onChange={(e: any) => setposition(e.target.value)}>
                                                    <option value="TOP">TOP</option>
                                                    <option value="MIDDLE">MIDDLE</option>
                                                    <option value="BOTTOM">BOTTOM</option>
                                                </select>
                                            </div>
                                            {/* Category level-1 */}
                                            <div className='form-select-box mb-3'>
                                                <label className='mb-1 fw-bold'>Category level-1</label>
                                                <select className="form-select" aria-label="Default select example" value={categoryId} onChange={(e) => { setCategoryId(e.target.value); setIsCategory(true); setSubCategoryId(''); setSubSubcategoryId('') }} >
                                                    <option value="">{state.category_id?.name}</option>
                                                    {category.map((res: any, index: any) => {
                                                        return (
                                                            <>
                                                                <option value={res._id}>{res.name}</option>
                                                            </>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                            {/* Category level-2 */}
                                            <div className='form-select-box mb-3'>
                                                <label className='mb-1 fw-bold'>Category level-2</label>
                                                <select className="form-select" aria-label="Default select example" value={subCategoryId} onChange={(e) => { setSubCategoryId(e.target.value); setSubSubcategoryId('') }} >
                                                    <option value="">{!isCategory ? state.subcategory_id?.name : "Select"}</option>
                                                    {subCategory.map((res: any, index: any) => {
                                                        return (
                                                            <>
                                                                <option value={res._id}>{res.name}</option>
                                                            </>
                                                        )
                                                    })}
                                                </select>
                                            </div>
                                            {/* Category level-3 */}
                                            <div className='form-select-box mb-3'>
                                                <label className='mb-1 fw-bold'>Category level-3</label>
                                                <select className="form-select" aria-label="Default select example" value={subSubCategoryId} onChange={(e) => setSubSubcategoryId(e.target.value)}>
                                                    <option value="">{!isCategory ? state.sub_subcategory_id?.name : "select"}</option>
                                                    {subSubCategory?.map((res: any) =>
                                                        <option value={res._id}>{res.name}</option>
                                                    )}
                                                </select>
                                            </div>
                                            {/* Brand */}
                                            <div className='form-select-box mb-3'>
                                                <label className='mb-1 fw-bold'>Brand</label>
                                                <select className="form-select" aria-label="Default select example" value={brandID} onChange={(e) => setbrandID(e.target.value)}>
                                                    <option value="">{state.brand_id?.name}</option>
                                                    {brand.map((res: any) =>
                                                        <option value={res._id}>{res.name}</option>
                                                    )}
                                                </select>
                                            </div>
                                            {/* Submit Button  */}
                                            <div className='signin-button-box'>
                                                <ul className='list-unstyled d-flex gap-2'>
                                                    <li className='w-100'><button type='button' className='btn btn-white w-100 bg-danger text-white' disabled={loading} onClick={onChangeBack}><i className='fa fa-ban me-2'></i>Cancel</button></li>
                                                    <li className='w-100'> <button type='submit' className='btn btn-theme w-100' disabled={loading}>{loading ? <Spinner /> : <span><i className='fa fa-save me-2'></i>Save</span>}</button></li>
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
export default EditBanner;