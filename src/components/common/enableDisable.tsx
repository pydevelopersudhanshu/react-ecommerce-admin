import React, { useState } from "react"
import { toast } from "react-toastify"
import { handleError } from "../../context/Provider"
import henceforthApi from "../../utils/henceforthApi"
import Spinner from "../BootstrapCompo"
const EnableDisable = ({ checkdata, isEnableDisable, loading }: any) => {

    return (
        <button className={`btn btn-white btn-sm border-danger ${checkdata == true ? 'bg-danger' : 'bg-success'} text-white ms-2`} type="button" disabled={loading} onClick={isEnableDisable} >
            <span>{loading ? <Spinner /> : checkdata ? <> <i className="fa fa-ban me-1"></i>Disable</> : <><i className="fa fa-ban me-1"></i>Enable</>}</span>
        </button>
    )
}
export default EnableDisable