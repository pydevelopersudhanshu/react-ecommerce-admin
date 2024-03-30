import { useRef, useState } from 'react';
import moment from 'moment'
import Spinner from '../BootstrapCompo';
const DownloadFileModal = ({ exportData }: any) => {
    const [startDate, setStartDate] = useState(moment().subtract(10, 'days').toDate().getTime())
    const [endDate, setEndDate] = useState(moment().toDate().getTime())
    const btnRef = useRef(null as any)
    const [loading, setLoading] = useState(false)

    const exportNow = async () => {
        setLoading(true)
        await exportData(startDate, endDate)
        setLoading(false)
        btnRef?.current.click()
    }
    return (
        <>
            <div className="modal fade" id="fileDownloadModal" tabIndex={-1} aria-labelledby="fileDownloadModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header position-relative">
                            {/* Title  */}
                            <h5 className="modal-title fs-5 d-block w-100 text-center" id="exampleModalLabel">Download Records</h5>
                            <div className='close-modal-button'>
                                <button type="button" ref={btnRef} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                        </div>
                        <div className="modal-body form-fields-box">
                            <div className="row">
                                {/* from Date  */}
                                <div className="col-md-6">
                                    <label htmlFor="" className='fw-semibold'>From Date</label>
                                    <input type="date" name='start_date' className='form-control rounded-0' value={moment(startDate).format('YYYY-MM-DD')} onChange={(e) => setStartDate(e.target.valueAsNumber)} />
                                </div>
                                {/* To date  */}
                                <div className="col-md-6">
                                    <label htmlFor="" className='fw-semibold'>To Date</label>
                                    <input type="date" name='start_date' className='form-control rounded-0' value={moment(endDate).format('YYYY-MM-DD')} onChange={(e) => setEndDate(e.target.valueAsNumber)} />
                                </div>
                            </div>
                        </div>
                        {/* Downoad Button  */}
                        <div className="modal-footer d-inline-flex flex-nowrap">
                            <button type="button" className="btn btn-white bg-danger text-white m-0 me-3 w-50" data-bs-dismiss="modal" disabled={loading}>Cancel</button>
                            <button className='btn btn-theme m-0 w-50' type='button' onClick={exportNow} disabled={loading}>{loading ? <Spinner /> : <span><i className='fa fa-cloud-download me-2'></i>Download</span>}</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default DownloadFileModal;