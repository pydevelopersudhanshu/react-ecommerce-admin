import '../../assets/styles/auth.scss'
import '../../assets/styles/pages.scss'
import { Link, useLocation, useMatch, useNavigate, useParams } from 'react-router-dom'
import DownloadFileModal from '../../components/common/download-file-modal'
import TextEditor from '../../components/text-editor'
import ReactQuill from 'react-quill'
import { useContext, useState } from 'react'
import { GlobalContext, handleError } from '../../context/Provider'
import henceforthApi from '../../utils/henceforthApi'
import { toast } from 'react-toastify'
import Spinner from '../../components/BootstrapCompo'
import { INSUFFICIENT_PERMISSIONS } from '../../context/actionTypes'

const EditFAQ = () => {

    const match = useMatch(`/edit-faq/:id`)
    const location = useLocation()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const newParam = new URLSearchParams(location.search)
    const { authState } = useContext(GlobalContext);
    const [state, setState] = useState({
        question: newParam.has('question') ? newParam.get(`question`) as string : '',
        answer: newParam.has(`answer`) ? newParam.get(`answer`) as string : ""
    })
    const handleSubmit = async (e: any) => {
        e.preventDefault()
        setLoading(true)
        const data = {
            _id: match?.params.id,
            question: state.question,
            answer: state.answer,
            language: authState.lang
        }

        try {
            let apiRes = await henceforthApi.Faq.editFaq(data)
            toast.success(apiRes.message)
            navigate(`/faq`)
        } catch (error:any) {
            if (error?.response?.body?.error === INSUFFICIENT_PERMISSIONS) {
                window.history.back()
              }
        } finally {
            setLoading(false)
        }
    }
    const handlechange = (e: any) => {
        let name = e.target.name;
        let value = e.target.value;
        setState({
            ...state,
            [name]: value
        })
    }


    return (
        <>
            {/* breadcrum  */}
            <section className="breadcrum-box">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            {/* title  */}
                            <h2 className="fw-semibold">Edit FAQ</h2>
                            {/* breadcrum  */}
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb m-0">
                                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                    <li className="breadcrumb-item active fw-bold">Edit FAQ</li>
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
                                        <h5>Edit FAQ</h5>
                                    </div>
                                    <div className="common-card-content">
                                        {/* form  */}
                                        <form onSubmit={handleSubmit}>
                                            {/* Question  */}
                                            <div className="form-fields-box mb-3">
                                                <label className="mb-2 fw-bolder">Question</label>
                                                <input name="question" type="text" className="form-control"
                                                    value={state.question}
                                                    onChange={(e) => handlechange(e)}
                                                />
                                            </div>
                                            {/* Answer  */}
                                            <div className='text-editor mb-4'>
                                                <label className="mb-2 fw-bolder">Answer</label>
                                                <div className="quill">
                                                    <ReactQuill
                                                        theme='snow'
                                                        onChange={(e) => setState({ ...state, answer: e })}
                                                        value={state.answer}

                                                    />
                                                </div>
                                                {/* Button  */}
                                                <div className="form-group mt-4">
                                                    <button type="submit" className="btn btn-theme px-5" disabled={loading}>
                                                        {loading ? <Spinner /> : <span><i className='fa fa-save me-1' ></i>Save</span>}
                                                    </button>
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
export default EditFAQ;