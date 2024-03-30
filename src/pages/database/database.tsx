import React, { Fragment } from 'react';
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import { fileURLToPath } from 'url';
import { GlobalContext, handleError } from '../../context/Provider';
import henceforthApi from '../../utils/henceforthApi';
import DownloadFileModal from '../../components/common/download-file-modal'
import BreadCrumb from '../../components/common/BreadCrumb';
import { INSUFFICIENT_PERMISSIONS } from '../../context/actionTypes';

const Database = () => {
    let breadCrumbPath = [
        { name: 'Home', url: `/`, active: '' },
        { name: 'Database Backup', url: ``, active: 'not-allowed' }
    ]
    const { authState, downloadFile } = React.useContext(GlobalContext)
    const [loading, setLoading] = React.useState(false)

    


    const downloadDb = async () => {



        try {
            setLoading(true)

            const apiRes = await henceforthApi.Common.backupDb({ language: "ENGLISH" })

            toast.success(apiRes.message)
            await downloadFile(`${apiRes.data.base_url}${apiRes.data.folders[0]}/${apiRes.data.file_url}`)
            console.log(apiRes.data.file_url)

        } catch (error:any) {
            if (error?.response?.body?.error === INSUFFICIENT_PERMISSIONS) {
                window.history.back()
              }
        } finally {
            setLoading(false)
        }
    }

    return (
        <Fragment>
            {/* breadcrum  */}
            <BreadCrumb pathNameDeclare={breadCrumbPath} />
            {/* page  */}
            <div className='page-spacing'>
                <section className='product-listing'>
                    <div className="container-fluid">
                        {/* Order list table  */}
                        <div className="row justify-content-center">
                            <div className="col-sm-11 col-md-8 col-lg-6 col-xl-5 col-xxl-5">
                                <div className="common-card">
                                    <div className="common-card-title">
                                        <h5>Database Backup</h5>
                                    </div>
                                    <div className="common-card-content text-center">
                                        <p className='mb-2'>If you click on Download, Database will be downloaded.</p>
                                        <p>Db MySql file: <button className='btn btn-success' onClick={downloadDb} disabled={loading}>Download</button></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            {/* <DownloadFileModal exportData={exportData} /> */}

        </Fragment>
    )
}
export default Database;