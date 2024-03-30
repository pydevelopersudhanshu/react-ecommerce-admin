import { useRef, useState } from 'react';
import moment from 'moment'
import Spinner from '../BootstrapCompo';
const LanguageModal = ({ addData }: any) => {
    const [loading, setLoading] = useState(false)
    const btnRef = useRef(null as any)
    // const [addName, setAddName] = useState<any>("")


    // const add = async () => {
    //     setLoading(true)
    //     await addData(addName)
    //     setLoading(false)
    //     btnRef?.current.click()
    // }
    return (
        <>
            <div className="modal fade" id="langModal" tabIndex={-1} aria-labelledby="langModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header position-relative">
                            {/* Title  */}
                            <h5 className="modal-title fs-5 d-block w-100 text-center" id="exampleModalLabel">{addData?.title}</h5>
                            <div className='close-modal-button'>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                        </div>
                        <div className="modal-body form-fields-box">
                            <div className="row">
                                {/* from Date  */}
                                <div className="col-md-6">
                                    <label htmlFor="" className='fw-semibold'>Name</label>
                                    {/* <input type="text" name='text' placeholder='Enter name' className='form-control rounded-0' value={addData?.addName} onChange={(e) => setAddName(e.target.value)} /> */}
                                </div>
                            </div>
                        </div>
                        {/* Downoad Button  */}
                        <div className="modal-footer d-inline-flex flex-nowrap">
                            <button type="button" className="btn btn-white bg-danger text-white m-0 me-3 w-50" data-bs-dismiss="modal" disabled={loading}>Cancel</button>
                            {/* <button className='btn btn-theme m-0 w-50' type='button' onClick={add} disabled={loading}>{loading ? <Spinner /> : <span><i className='fa fa-cloud-download me-2'></i>Save</span>}</button> */}
                            {/* <button className='btn btn-theme m-0 w-50' type='button' onClick={props.onSubmit} disabled={loading}>{loading ? <Spinner /> : <span><i className='fa fa-cloud-download me-2'></i>Save</span>}</button> */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default LanguageModal;