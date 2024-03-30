import { useContext, useEffect, useState } from "react";
import {  useMatch } from "react-router-dom";
import Spinner from "../../components/BootstrapCompo";
import BreadCrumb from "../../components/common/BreadCrumb";
import { GlobalContext, handleError } from "../../context/Provider";
import henceforthApi from "../../utils/henceforthApi";
import NODATA from '../../assets/images/no-data-found.svg'
import { INSUFFICIENT_PERMISSIONS } from "../../context/actionTypes";
import LanguageModal from "../../components/common/LanguageModal";
import { Button, Modal, Select } from "antd";
import { toast } from "react-toastify";
import { capitalise } from "../../utils/validations";

const BrandsListing = () => {
    const match = useMatch(`/language/:page/:type/:id`)

    let breadCrumbPath = [
        { name: 'Home', url: `/`, active: '' },
        { name: `${capitalise(String(match?.params?.type))} Keys`, url: ``, active: 'not-allowed' }
    ]
    const { loading, setLoading } = useContext(GlobalContext);

    let limit = 10
    const { authState } = useContext(GlobalContext);
    const [addKey, setAddKey] = useState("")
    const [addValue, setAddValue] = useState("")
    const [lang, setLang] = useState('ENGLISH')
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
    const [state, setState] = useState({
        English: [],
        Arabic: []
    } as any)
    const [modalData, setModalData] = useState({
        key: "",
        value: "",
        _id: ''
    })
    const chooseLanguage = async (value: string) => {
        setLang(value)
    }
    const initialise = async () => {

        setLoading(true)
        try {
            let apiRes = await henceforthApi.Lang.get(
                match?.params.id
            )
            setState(apiRes.data)
            console.log(apiRes.data)
        } catch (error: any) {
            if (error?.response?.body?.error === INSUFFICIENT_PERMISSIONS) {
                window.history.back()
            }
        } finally {
            setLoading(false)
        }
    }


    const handleSubmit = async () => {
        let data = {
            _id: match?.params.id,
            key: addKey,
            value: addValue,
            language: lang
        }
        try {
            const apires = await henceforthApi.Lang.add(data)
            toast.success(apires?.message)
            setAddKey('')
            setAddValue('')
            initialise()
        } catch (error) {

        } finally {
            setIsModalOpenAdd(false)
        }
    }

    const handleEdit = async () => {
        const items = {
            key: modalData.key,
            value: modalData.value,
            language: lang
        }
        setLoading(true)
        try {
            let apiRes = await henceforthApi.Lang.edit(modalData._id, items)
            await initialise()
            toast.success(apiRes?.message)
        } catch (error) {
            handleError(error)
        } finally {
            handleCancel()
            setLoading(false)
        }
    }

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    useEffect(() => {
        initialise()
    }, [match?.params.page, lang, authState?.lang])
    return (
        <>
            <BreadCrumb pathNameDeclare={breadCrumbPath} />
            <div className='page-spacing'>
                <section className='product-listing'>
                    <div className="container-fluid">
                        {/* search-filter-export */}
                        <div className='common-card mb-4 border-0 card-spacing'>
                            <div className="row justify-content-between gy-3">
                                {/* serach and filter  */}
                                <div className="col-md-7">
                                    <div className="row">
                                        <div className="col-7">
                                            <h5>{capitalise(String(match?.params?.type))} keys</h5>
                                            {/* <div className='form-fields-box'>
                                                <label className='mb-1 form-label fw-semibold'>Search</label>
                                                <div className='position-relative'>
                                                    <input type="search" className="form-control rounded-0 ps-4 " name='search' placeholder="Search...  "
                                                        value={newParam.has('search') ? newParam.get('search') as string : ""}
                                                        onChange={(e) => handleSearch(e.target.name, e.target.value)}

                                                    />
                                                    <span className='search-icon'><i className='fa fa-search'></i></span>
                                                </div>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                                {/* export  */}
                                <div className="col-md-5">
                                    <div className='d-flex gap-3 justify-content-md-end'>
                                        <div className="">
                                            <Select id="bew"
                                                defaultValue="Whats_New"
                                                className=""
                                                // style={{ backgroundColor: 'green' }}
                                                value={lang}
                                                onChange={(value: any) => chooseLanguage(value as string)}
                                                style={{ width: '100%', fontWeight: 700 }} bordered={false}
                                                options={[
                                                    {
                                                        value: "ENGLISH",
                                                        label: `English`,
                                                    },
                                                    {
                                                        value: "ARABIC",
                                                        label: `Arabic`,
                                                    },
                                                ]}
                                            />
                                        </div>
                                        <div className='download-export-box'>
                                            <div className="export-button">
                                                <button className="btn btn-theme" type="button" onClick={() => setIsModalOpenAdd(true)}>ADD</button>

                                                {/* <Link to="/brands/add" className="btn btn-white"> <i className='fa fa-plus me-2'></i>Add</Link> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* table  */}
                        {loading ? <div className='vh-100 d-flex justify-content-center py-5'> <Spinner /></div> :
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="common-card">
                                        <div className="common-card-title">
                                            <div className='d-flex align-items-center justify-content-between'>
                                                <h5>{capitalise(String(match?.params?.type))} keys List</h5>
                                            </div>
                                        </div>

                                        <div className="common-card-content">
                                            {/* table */}
                                            <div className='data-list-table table-responsive mb-3'>
                                                <table className="table table-striped align-middle">
                                                    <thead className=''>
                                                        <tr>
                                                            <th>Sr.no</th>
                                                            <th>Key</th>
                                                            <th>Value</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    {lang == "ENGLISH" ?
                                                        <tbody>
                                                            {Array.isArray(state?.English) && state?.English.length ? state?.English.map((res: any, index: any) =>
                                                                <tr >
                                                                    <td>{index + 1}</td>
                                                                    <td>{res?.key ? res?.key : "Not Available"}</td>
                                                                    <td>{res?.value ? res?.value : "Not Available"}</td>
                                                                    <td><div className="btn-group gap-2">
                                                                        {/* <Link to={`/brands/${res._id}/edit?name=${res.name}`} className="btn btn-white btn-sm"><i className='fa fa-pencil me-2'></i>Edit</Link> */}
                                                                        <Button type="primary" className="btn btn-light" onMouseOver={() => setModalData(res)} onClick={showModal}>
                                                                            Edit
                                                                        </Button>

                                                                    </div></td>
                                                                </tr>) : <tr><td colSpan={5} className="text-center py-3" ><img src={NODATA} width="100" /><p className='text-center mt-3'>No data found</p></td></tr>}
                                                        </tbody> :
                                                        <tbody>
                                                            {Array.isArray(state?.Arabic) && state?.Arabic.length ? state?.Arabic.map((res: any, index: any) =>
                                                                <tr >
                                                                    <td>{index + 1}</td>
                                                                    <td>{res?.key ? res?.key : "Not Available"}</td>
                                                                    <td>{res?.value ? res?.value : "Not Available"}</td>
                                                                    <td><div className="btn-group gap-2">
                                                                        {/* <Link to={`/brands/${res._id}/edit?name=${res.name}`} className="btn btn-white btn-sm"><i className='fa fa-pencil me-2'></i>Edit</Link> */}
                                                                        <Button type="primary" className="btn btn-light" onMouseOver={() => setModalData(res)} onClick={showModal}>
                                                                            Edit
                                                                        </Button>

                                                                    </div></td>
                                                                </tr>) : <tr><td colSpan={5} className="text-center py-3" ><img src={NODATA} width="100" /><p className='text-center mt-3'>No data found</p></td></tr>}
                                                        </tbody>

                                                    }
                                                </table>
                                                <Modal title="Edit Value" open={isModalOpen} okButtonProps={{ loading: loading }} onOk={handleEdit} onCancel={handleCancel}>

                                                    {/* <div className="col-md-12">
                                                        <label htmlFor="" className='fw-semibold'>key</label>
                                                        <input type="text" name='text' placeholder='Enter key' className='form-control rounded-0'
                                                            value={modalData.key} onChange={(e: any) => setModalData({
                                                                ...modalData,
                                                                key: e.target.value
                                                            })} />
                                                    </div> */}
                                                    <div className="col-md-12">
                                                        <label htmlFor="" className='fw-semibold'>Value</label>
                                                        <input type="text" name='text' placeholder='Enter value' className='form-control rounded-0'
                                                            value={modalData.value} onChange={(e: any) => setModalData({
                                                                ...modalData,
                                                                value: e.target.value
                                                            })} />
                                                    </div>
                                                </Modal>
                                                {/* Modal */}
                                                <div className="modal fade" id="langModal" tabIndex={-1} aria-labelledby="langModalLabel" aria-hidden="true">
                                                    <div className="modal-dialog modal-dialog-centered">
                                                        <div className="modal-content">
                                                            <div className="modal-header position-relative">
                                                                {/* Title  */}
                                                                <h5 className="modal-title fs-5 d-block w-100 text-center" id="exampleModalLabel">Modal</h5>
                                                                <div className='close-modal-button'>
                                                                    <button type="button" id="btn-close" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                                </div>
                                                            </div>
                                                            <div className="modal-body form-fields-box">
                                                                <div className="col-md-12">
                                                                    <label htmlFor="" className='fw-semibold'>Key</label>
                                                                    <input type="text" name='text' placeholder='Enter name' className='form-control rounded-0'
                                                                        value={addKey} onChange={(e: any) => setAddKey(e.target.value)} />
                                                                </div>
                                                                <div className="col-md-12">
                                                                    <label htmlFor="" className='fw-semibold'>Value</label>
                                                                    <input type="text" name='text' placeholder='Enter value' className='form-control rounded-0'
                                                                        value={addValue} onChange={(e: any) => setAddValue(e.target.value)} />
                                                                </div>
                                                            </div>
                                                            {/* Downoad Button  */}
                                                            <div className="modal-footer d-inline-flex flex-nowrap">
                                                                <button type="button" className="btn btn-white bg-danger text-white m-0 me-3 w-50" data-bs-dismiss="modal" disabled={loading}>Cancel</button>
                                                                <button className='btn btn-theme m-0 w-50' type='button' onClick={handleSubmit} disabled={loading}>{loading ? <Spinner /> : <span><i className='fa fa-cloud-download me-2'></i>Save</span>}</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>


                                                <Modal title="Add Key" open={isModalOpenAdd} okButtonProps={{ loading: loading }} onOk={handleSubmit} onCancel={() => setIsModalOpenAdd(false)}>
                                                    <div className="modal-body form-fields-box">
                                                        <div className="col-md-12">
                                                            <label htmlFor="" className='fw-semibold'>Key</label>
                                                            <input type="text" name='text' placeholder='Enter key name' className='form-control rounded-0'
                                                                value={addKey} onChange={(e: any) => setAddKey(e.target.value)} />
                                                        </div>
                                                        <div className="col-md-12 mt-2">
                                                            <label htmlFor="" className='fw-semibold'>Value</label>
                                                            <input type="text" name='text' placeholder='Enter value' className='form-control rounded-0'
                                                                value={addValue} onChange={(e: any) => setAddValue(e.target.value)} />
                                                        </div>
                                                    </div>
                                                </Modal>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>}
                    </div>
                </section>
            </div>

            <LanguageModal />
            {/* <LanguageModal exportData={addData} /> */}
        </>
    )
}
export default BrandsListing;