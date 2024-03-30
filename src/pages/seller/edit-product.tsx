import '../../assets/styles/auth.scss'
import '../../assets/styles/pages.scss'
import profile_img from '../../assets/images/pages/profile-image.jpg'
import { Link, useMatch } from 'react-router-dom'
import DownloadFileModal from '../../components/common/download-file-modal'
import { useContext, useEffect, useState } from 'react'
import henceforthApi from '../../utils/henceforthApi'
import { GlobalContext, handleError } from '../../context/Provider'


const EditProduct = () => {

    const { onChangeBack, category,
        categoryId, setCategoryId, subCategory, subCategoryId,
        setSubCategoryId, brandID, brand, setbrandID } = useContext(GlobalContext);
    const match = useMatch(`/seller/:_id/edit-product`)
    const [file, setfile] = useState("")
    const [state, setstate] = useState({
        name: "",
        category_id: {
            name: ""
        },
        subcategory_id: {
            name: ""
        },
        brand_id: {
            name: ""
        },
        price: Number(),
        images: ""
    })
    const initialise = async () => {
        try {
            let apires = await henceforthApi.ProductList.getProductDetail(match?.params._id)
            setstate(apires.data)
        } catch (error) {

        }
    }
    const fileupload = async () => {
        try {
            const apiRes = await henceforthApi.Common.do_spaces_file_upload("file", file)
            const data = apiRes.data
            return data.file_name
        } catch (error) {
            handleError(error)
        }
    }

    const onhandlesubmit = async (e: any) => {
        e.preventDefault()
        try {
            const image = fileupload()
        } catch (error) {
            handleError(error)
        }
    }
    const handleChange = async (e: any) => {
        let name = e.target.name;
        let value = e.terget.value;
        setstate({
            ...state,
            [name]: value
        })
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
                            <h2 className="fw-semibold">Edit Product</h2>
                            {/* breadcrum  */}
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb m-0">
                                    <li className="breadcrumb-item"><Link to="">Home</Link></li>
                                    <li className="breadcrumb-item active fw-bold">Edit Product</li>
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
                        <div className="row">
                            <div className="col-sm-12 col-md-7 col-lg-6 col-xl-5 col-xxl-3">
                                {/* title  */}
                                <div className="common-card">
                                    <div className="common-card-title">
                                        <h5>Edit Product</h5>
                                    </div>
                                    {/* form  */}
                                    <div className="common-card-content">
                                        <form onSubmit={onhandlesubmit}>
                                            {/* Upload image */}
                                            <div className='upload-fields-box mb-3'>
                                                <div className='profile-edit-image mb-2'>
                                                    <div className='profile-edit-upload'>
                                                        <input type="file" onChange={(e: any) => setfile(e.target.files[0])} />
                                                    </div>
                                                    <img src={file ? URL.createObjectURL(file as any) : (Array.isArray) && state.images.length ? `${henceforthApi.API_FILE_ROOT_ORIGINAL}${state.images[0]}` : ""} alt="img" className='rounded-circle' />
                                                </div>
                                                <p className='text-center'><small><strong>Note:-</strong> Please upload only .jpg and .png format only.</small></p>
                                            </div>
                                            {/* Name  */}
                                            <div className='form-fields-box mb-3'>
                                                <label className='mb-1 fw-bold'>Product Name</label>
                                                <input type="text" className="form-control rounded-0" value={state.name} onChange={handleChange} name="name" required />
                                            </div>
                                            {/* Category level-1 */}
                                            <div className='form-select-box mb-3'>
                                                <label className='mb-1 fw-bold'>Category level-1</label>
                                                <select className="form-select" aria-label="Default select example" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                                                    <option value="">{state.category_id?.name}</option>
                                                    {category.map((res: any) =>
                                                        <option value={res._id}>{res.name}</option>)}
                                                </select>
                                            </div>
                                            {/* Category level-2 */}
                                            <div className='form-select-box mb-3'>
                                                <label className='mb-1 fw-bold'>Category level-2</label>
                                                <select className="form-select" aria-label="Default select example" value={subCategoryId} onChange={(e) => setSubCategoryId(e.target.value)}>
                                                    <option value="">{state.subcategory_id?.name}</option>
                                                    {subCategory?.map((res: any) =>
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

                                            {/* price  */}
                                            <div className='form-fields-box mb-3'>
                                                <label className='mb-1 fw-bold'>Product Price</label>
                                                <input type="text" className="form-control rounded-0" value={state.price} required />
                                            </div>
                                            {/* Submit Button  */}
                                            <div className='signin-button-box'>
                                                <ul className='list-unstyled d-flex gap-2'>
                                                    <li className='w-100'><button type='button' className='btn btn-white w-100 bg-danger text-white' onClick={onChangeBack}><i className='fa fa-ban me-2'></i>Cancel</button></li>
                                                    <li className='w-100'> <button type='submit' className='btn btn-theme w-100'><i className='fa fa-save me-2'></i>Save</button></li>
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
export default EditProduct;