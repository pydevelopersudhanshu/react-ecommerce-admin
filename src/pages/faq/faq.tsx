import '../../assets/styles/pages.scss'
import { Link } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import henceforthApi from '../../utils/henceforthApi'
import { GlobalContext, handleError } from '../../context/Provider'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import BreadCrumb from '../../components/common/BreadCrumb'
import Spinner from '../../components/BootstrapCompo'
import { INSUFFICIENT_PERMISSIONS } from '../../context/actionTypes'

const FAQ = () => {

    const [loading, setLoading] = useState(false)
    let breadCrumbPath = [
        { name: 'Home', url: `/`, active: '' },
        { name: 'FAQ', url: ``, active: 'not-allowed' }
    ]

    const [state, setState] = useState({
        data: [],
        question: ""
    })
    const { authState } = useContext(GlobalContext);


    const initailse = async () => {
        try {
            setLoading(true)
            let apiRes = await henceforthApi.Faq.getFaqList()
            setState(apiRes.data)
        } catch (error: any) {
            if (error?.response?.body?.error === INSUFFICIENT_PERMISSIONS) {
                window.history.back()
            }
        } finally {
            setLoading(false)
        }
    }
    const onChangeDelete = async (_id: any) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Are You sure want to Delete!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result: any) => {
            if (result.isConfirmed) {
                try {
                    let apiRes = await henceforthApi.Faq.deleteFaq(_id)
                    toast.success(apiRes.data.message)
                    initailse()
                } catch (error) {
                    handleError(error)
                } finally {

                }
            }
        })
    }

    useEffect(() => {
        initailse()
    }, [authState?.lang])




    return (
        <>
            {/* breadcrum  */}


            <BreadCrumb pathNameDeclare={breadCrumbPath} />
            {/* page  */}
            {loading ? <div className='d-flex justifly-content-center'><Spinner /></div> :
                <div className='page-spacing'>
                    <section className='product-listing'>
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="common-card">
                                        <div className="common-card-title">
                                            <div className='d-flex align-items-center justify-content-between'>
                                                <h5>FAQ</h5>
                                                {/* add faq  */}
                                                <Link to="/add-faq" className='btn btn-white btn-sm'> <i className='fa fa-plus me-1'></i> Add</Link>
                                            </div>
                                        </div>
                                        <div className="common-card-content">
                                            <div className='faq-content-box product-faq-accodion'>
                                                <div className="accordion" id="faqAccordion">
                                                    {/* 1 */}
                                                    {Array.isArray(state.data) && (state.data.length) ? state.data.map((res: any, index: any) => {

                                                        return (
                                                            <>
                                                                <div className="accordion-item bg-transparent border border-1 mb-3 position-relative" key={index}>
                                                                    <h2 className="accordion-header" id="faqOne">
                                                                        <button className="accordion-button shadow-none bg-transparent text-black align-items-start" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseOne${res._id}`} aria-expanded="true" aria-controls="collapseOne">
                                                                            <b className='me-1 text-nowrap'>Q.</b> {res.question}?

                                                                        </button>
                                                                    </h2>
                                                                    {/* show */}
                                                                    <div id={`collapseOne${res._id}`} className="accordion-collapse collapse " aria-labelledby="faqOne" data-bs-parent="#faqAccordion">
                                                                        <div className="accordion-body border border-1 bg-transparent">
                                                                            <p className='d-flex text-black'><b className='me-1 hellos'>A.</b><span className='hellos text-black' dangerouslySetInnerHTML={{ __html: res.answer }} /> </p>
                                                                        </div>
                                                                    </div>
                                                                    <ul className="edit-icon-accordion d-flex gap-3 align-items-center mb-0 ps-0 list-unstyled">
                                                                        <li><button className='btn p-0 bg-transparent border-0' onClick={() => onChangeDelete(res._id)}  ><i className='fa fa-trash fs-5  text-danger'></i></button></li>
                                                                        <li> <Link to={`/edit-faq/${res._id}?question=${res.question}&answer=${res.answer}`}><i className='fa fa-pencil fs-5 text-primary' style={{ cursor: 'pointer' }}></i></Link></li>
                                                                    </ul>
                                                                </div>
                                                            </>
                                                        )
                                                    }) : <div className='text-center'>Data is not found</div>}



                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>}
        </>
    )
}
export default FAQ;