import '../../assets/styles/auth.scss'
import '../../assets/styles/pages.scss'
import { Link, useNavigate } from 'react-router-dom'
import DownloadFileModal from '../../components/common/download-file-modal'
import { GlobalContext, handleError } from '../../context/Provider'
import henceforthApi from '../../utils/henceforthApi'
import { useContext, useState } from 'react'
import ReactQuill from 'react-quill'
import Spinner from '../../components/BootstrapCompo'
import { toast } from 'react-toastify'


const AddFAQ = () => {

    const { loading, setLoading } = useContext(GlobalContext)
    const navigate = useNavigate()
    const [state, setState] = useState({
        question: "",
        answer: ""
    })
    const {authState} = useContext(GlobalContext);


    const onhandleSubmit = async (e: any) => {
        e.preventDefault()

        if (!state.question.trim()) {
            return toast.warn("Please enter question")
        }
        if(!state.answer.trim()){
            return toast.warn("please enter answer")
        }
        if (state.answer.trim().length < 20) {
            return toast.warn("Answer is too sort")
        }

        setLoading(true)
        const data = {
            question: state.question,
            answer: state.answer,
            language:authState.lang
        }
        try {
            let apiRes = await henceforthApi.Faq.addFaq(data)
            toast.success(apiRes.message)
            navigate(`/faq`)
        } catch (error) {
            handleError(error)
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
                            <h2 className="fw-semibold">Add FAQ</h2>
                            {/* breadcrum  */}
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb m-0">
                                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                    <li className="breadcrumb-item active fw-bold">Add FAQ</li>
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
                                        <h5>Add FAQ</h5>
                                    </div>
                                    <div className="common-card-content">
                                        {/* form  */}
                                        <form onSubmit={onhandleSubmit}>
                                            {/* Question  */}
                                            <div className="form-fields-box mb-3">
                                                <label className="mb-2 fw-bolder">Question</label>
                                                <input name="question" type="text" className="form-control" value={state.question} onChange={handlechange} placeholder="Question" required />
                                            </div>
                                            {/* text editor  */}
                                            <div className='text-editor mb-4'>
                                                <label className="mb-2 fw-bolder">Answer</label>
                                                <div className="quill">
                                                    <ReactQuill
                                                        theme="snow"
                                                        onChange={(e) => setState({ ...state, answer: e })}
                                                        placeholder={`Write your content`}
                                                        value={state.answer}
                                                    />
                                                </div>
                                                {/* button  */}
                                                <div className="form-group mt-4">
                                                    <button type="submit" className="btn btn-theme px-5" disabled={loading}> <i className='fa fa-plus me-2'></i>{loading ? <Spinner /> : "Add"} </button>
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

            <DownloadFileModal />
        </>
    )
}
export default AddFAQ;