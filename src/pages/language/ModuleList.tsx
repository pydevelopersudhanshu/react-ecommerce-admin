import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useMatch, useNavigate } from "react-router-dom";
import Spinner from "../../components/BootstrapCompo";
import BreadCrumb from "../../components/common/BreadCrumb";
import { brands } from "../../context/interfaces";
import { GlobalContext } from "../../context/Provider";
import henceforthApi from "../../utils/henceforthApi";
import { INSUFFICIENT_PERMISSIONS } from "../../context/actionTypes";
import { Modal, Select } from "antd";
import { toast } from "react-toastify";

const ModuleList = () => {

    let breadCrumbPath = [
        { name: 'Home', url: `/`, active: '' },
        { name: 'Main key', url: ``, active: 'not-allowed' }
    ]
    const { loading, setLoading } = useContext(GlobalContext);
    const navigate = useNavigate()
    const match = useMatch(`/main-key/:type`)
    let limit = 10
    const { authState } = useContext(GlobalContext);
    const [addName, setAddName] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [state, setState] = useState({
        total_count: 0,
    } as brands)

    const chooseLanguage = async (value: string) => {
        navigate(`/main-key/${value?.toLowerCase()}`)
    }
    const initialise = async () => {

        setLoading(true)
        try {
            let apiRes = await henceforthApi.Lang.getKeys(String(match?.params?.type)?.toUpperCase())
            setState(apiRes)
        } catch (error: any) {
            if (error?.response?.body?.error === INSUFFICIENT_PERMISSIONS) {
                window.history.back()
            }
        } finally {
            setLoading(false)
        }
    }
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const showModal = () => {
        setIsModalOpen(true);
    };
    const addData = async () => {
        let data = {
            name: addName,
            type: String(match?.params?.type)?.toUpperCase()
        }
        setLoading(true)
        try {
            const apiRes = await henceforthApi.Lang.addKeys(data)
            initialise();
            setAddName("")
            toast.success(apiRes?.message)
        } catch (error) {

        } finally {
            setLoading(false)
            handleCancel()
        }
    }

    useEffect(() => {
        initialise();
    }, [match?.params?.type, authState?.lang])

    return (
        <>
            <BreadCrumb pathNameDeclare={breadCrumbPath} />
            <div className='page-spacing'>
                <section className='product-listing'>
                    <div className="container-fluid">
                        {/* table  */}
                        {loading ? <div className='vh-100 d-flex  justify-content-center py-5'> <Spinner /></div> :
                            <React.Fragment>
                                <div className="row mb-4">
                                    <div className="col-md-12">
                                        <div className="common-card">
                                            <div className="common-card-title ">
                                                <div className='d-flex align-items-center justify-content-between flex-column flex-sm-row gap-3'>
                                                    <h5>Main key List</h5>
                                                    <div className="d-flex gap-3 justify-content-end">
                                                        <div className="">
                                                            <Select id="bew"
                                                                defaultValue="Whats_New"
                                                                className=""
                                                                // style={{ backgroundColor: 'green' }}
                                                                value={String(match?.params?.type)?.toLowerCase()}
                                                                onChange={(value: any) => chooseLanguage(value as string)}
                                                                style={{ width: '100%', fontWeight: 700 }} bordered={false}
                                                                options={[
                                                                    {
                                                                        value: "WEBSITE",
                                                                        label: `Website`,
                                                                    },
                                                                    {
                                                                        value: "SELLER",
                                                                        label: `Seller`,
                                                                    },
                                                                ]}
                                                            />
                                                        </div>
                                                        <button className="btn btn-success" type="button" onClick={showModal}>ADD</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="row gy-4">
                                    {Array.isArray(state) && state?.length ? state?.map((res: any, index: any) =>
                                        <div className="col-sm-6 col-lg-4">
                                            <div className="common-card p-3 border-top-0">
                                                <div className="text-center">
                                                    <Link to={`/language/1/${res.name?.toLowerCase()}/${res._id}`} >
                                                        {/* <Link to={`/language/:page/profile/${res._id}`} > */}
                                                        {/* <Link to={`/language/1/profile/56`} > */}
                                                        <div className="card-body text-success">
                                                            {/* <h5 className="card-title">{res?.index}</h5> */}
                                                            <h5 className="card-title m-0">{res?.name}</h5>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    ) : ''}
                                </div>
                                {/* Modal */}
                                <Modal title={`Add Main Key (${match?.params?.type?.toUpperCase()})`} open={isModalOpen} okButtonProps={{ loading: loading }} onOk={addData} onCancel={handleCancel}>
                                    <div className="col-md-12">
                                        <label htmlFor="" className='fw-semibold mb-1'>Enter Key Name:</label>
                                        <input type="text" name='text' placeholder='Enter key name' className='form-control rounded-0' value={addName} onChange={(e: any) => setAddName(e.target.value)} />
                                    </div>
                                </Modal>
                            </React.Fragment>
                        }
                    </div>
                </section >
            </div >

            {/* <LanguageModal exportData={addData} /> */}
        </>
    )
}
export default ModuleList;