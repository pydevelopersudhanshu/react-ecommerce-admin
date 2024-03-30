import '../../assets/styles/auth.scss'
import '../../assets/styles/pages.scss'
import { Link, useMatch } from 'react-router-dom'
import DownloadFileModal from '../../components/common/download-file-modal';
import TextEditor from '../../components/text-editor';
import profile_img from '../../assets/images//pages//profile-image.jpg';
import { useContext, useEffect, useState } from 'react';
import henceforthApi from '../../utils/henceforthApi';
import { GlobalContext, handleError } from '../../context/Provider';
import Spinner from '../../components/BootstrapCompo';
// import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface editPolicies {
    created_at: string,
    image_url: string,
    title: string,
    type: string,
    description: string
    updated_at: string,
    _id: string,
}
interface content {

}
const ReactQuill =
    typeof window === "object" ? require("react-quill") : () => false;
const EditContent = () => {
    const { authState } = useContext(GlobalContext);
    const match = useMatch("/edit-content/:type");
    const [loading, setLoading] = useState<boolean>(false);
    const [file, setFile] = useState(null);
    const [description, setDesciption] = useState<string>("");
    const [title, setTitle] = useState<string>("");

    const initialise = async () => {
        try {
            let apiRes = await henceforthApi.Policies.byType(match?.params.type)
            console.log(apiRes);
            setFile(apiRes.data.image_url)
            setDesciption(apiRes.data.description)
            setTitle(apiRes.data.type)
        } catch (error) {
            handleError(error)
        } finally {

        }
    }
    const handleUpload = async (e: any) => {
        //   setLoading(true);
        let file = e.target.files[0]
        const apiRes = await await (henceforthApi.Policies.do_spaces_file_upload("file", file));


        setFile(apiRes.data.file_name);
        //   const data = {
        //     type: match?.params.type,
        //     image_url: apiRes.data.file_name,
        //     description: description,
        //     language: "ENGLISH",
        //   };
        //   henceforthApi.Policies.editPolicy(data)
        console.log(apiRes);
    };
    const handleSubmit = async (e: any) => {
        setLoading(true)
        e.preventDefault();
        const data = {
            type: title,
            description: description,
            language: "ENGLISH",
        } as any;
        if (file) {
            data["image_url"] = file
        }
        try {
            await henceforthApi.Policies.editPolicy(data)
            setLoading(false)
            window.history.back()

        } catch (error) {
            handleError(error)
        }
    };
    useEffect(() => {
        initialise();
    }, [authState?.lang]);

    const onEditorStateChange = (e: any) => {
        setDesciption(e);
    };
    return (
        <>
            {/* breadcrum  */}
            <section className="breadcrum-box">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            {/* title  */}
                            <h2 className='fw-semibold'>Edit Content</h2>
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb m-0">
                                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                    <li className="breadcrumb-item active fw-bold">Edit Content</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
            {/* page  */}
            <div className='page-spacing'>
                <section className='product-listing'>
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="common-card">
                                    <div className="common-card-title">
                                        <h5>Edit Content</h5>
                                    </div>
                                    <div className="common-card-content">
                                        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(e) }}>
                                            {/* Upload image */}
                                            <div className='upload-fields-box mb-3 position-relative'>
                                                <div className='banner-edit-image mb-2'>
                                                    <div className='banner-edit-upload'>
                                                        <input type="file" accept="image/png,image/jpeg" onChange={handleUpload} />
                                                    </div>
                                                    <img src={file ? `${henceforthApi.API_FILE_ROOT_ORIGINAL}${file}` : `${henceforthApi.API_FILE_ROOT_MEDIUM}${file}`} alt="img" />
                                                </div>
                                                <p><small><strong>Note:-</strong> Please upload only .jpg and .png format only.</small></p>
                                                {/* Remove Button  */}
                                                {/* <div className='remove-image-button'>
                                                    <button type='button' className='btn w-100 text-white bg-danger border-danger rounded-0'><i className='fa fa-trash me-2'></i>Remove Image</button>
                                                </div> */}
                                            </div>
                                            {/* Subject  */}
                                            <div className="form-fields-box mb-3">
                                                <label className="mb-2 fw-bolder">Page Title</label>
                                                <input name="subject" type="text" className="form-control" value={title} onChange={(e) => { setTitle(e.target.value) }} />
                                            </div>
                                            {/* text editor  */}
                                            <div className='text-editor mb-4'>
                                                <label className="mb-2 fw-bolder">Description</label>
                                                <div className="quill">
                                                    <ReactQuill theme="snow" value={description} onChange={onEditorStateChange} />
                                                </div>
                                                <div className="form-group mt-4">
                                                    <button type="submit" className="btn btn-theme px-5"> <i className='fa fa-save me-1'></i>{loading ? <Spinner /> : "Save"}</button>
                                                </div>
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
export default EditContent;