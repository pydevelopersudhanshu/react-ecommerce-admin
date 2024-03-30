import React from "react"
export const CategoriesListEnable = (res: any) => {
    return (
        <>

            {res.is_deleted ?
                <button className="btn btn-dark btn-sm text-white" onClick={() => res.onChangeDelete(res._id, false)}><i className='fa fa-exchange me-1'></i>Enable</button> :

                <button className="btn btn-danger btn-sm text-white" onClick={() => res.onChangeDelete(res._id, true)}><i className='fa fa-trash me-1'></i>Delete</button>}
        </>
    )


}

