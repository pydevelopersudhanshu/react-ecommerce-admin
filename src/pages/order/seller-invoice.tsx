import React, { useEffect, useState } from "react";
import { Link, useMatch, useSearchParams } from "react-router-dom";
import InvoicePdf from "../../components/seller-invoice/invoice-pdf";
import { dataInvoice } from "../../context/interfaces";
import { GlobalContext, handleError } from "../../context/Provider";
import henceforthApi from "../../utils/henceforthApi";
import henceofrthEnums from "../../utils/henceofrthEnums";

const PrintInvoice = () => {
    const { authState } = React.useContext(GlobalContext);

    const match = useMatch('invoice/:object_id/:id/:type')
    const [state, setstate] = useState({} as dataInvoice)


    const initialise = async () => {
        try {
            let apiRes = await henceforthApi.Seller.invoice(henceofrthEnums.Invoice.SELLER, match?.params.object_id as string, match?.params.id as string)
            setstate(apiRes?.data)
        } catch (error) {
            handleError(error)
        }
    }
    useEffect(() => {
        initialise()
    }, [authState?.lang])
    return (
        <>
            {/* breadcrum  */}
            <section className="breadcrum-box">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-12">
                            {/* title  */}
                            <h2 className='fw-semibold'>{match?.params.type == henceofrthEnums.Invoice.SELLER ? "Seller Invoice" : "Customer-invoice"}</h2>
                            {/* breadcrum  */}
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb m-0">
                                    <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                                    <li className="breadcrumb-item active fw-bold">{match?.params.type == henceofrthEnums.Invoice.SELLER ? "Seller Invoice" : "Customer-invoice"}</li>
                                </ol>
                            </nav>
                        </div>
                    </div>
                </div>
            </section>
            {/* Page  */}
            <div className=' page-spacing'>
                <InvoicePdf {...state} invoiceType={match?.params.type} />
            </div>
        </>
    )
}

export default PrintInvoice