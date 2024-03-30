import { Fragment } from "react";
import Spinner from "./BootstrapCompo"

type Function = (page: number) => void;


interface PaginationReq {
  count: number,
  data: any,
  page: number,
  limit: number,
  loading?: boolean,
  onPageChange: Function
}

export default ({ count, data, page, limit,loading, onPageChange }: PaginationReq) => {

  
  if (count <= limit) {
    return <Fragment></Fragment>
  } else {
    const visited_page_size = (limit * (page - 1)) + data?.length
    return (<>{loading? <Spinner/>:<div className="dashboad-pagination-box">
      <nav aria-label="Page navigation example">
        <ul className="pagination justify-content-end mb-0">

          <li className="page-item" onClick={() => (page !== 1) ? onPageChange(page - 1) : ""}>
            <button disabled={(page == 1)} className="page-link btn btn-sm btn-white" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </button>
          </li>
          {((page - 2) > 0) ?
            <li className="page-item" onClick={() => onPageChange(page - 2)}><span className="page-link btn btn-sm btn-white rounded-0" >{page - 2}</span></li>
            : <></>}

          {((page - 1) > 0) ?
            <li className="page-item" onClick={() => onPageChange(page - 1)}><span className="page-link btn btn-sm btn-white rounded-0" >{page - 1}</span></li>
            : <></>}

          <li className="page-item">
            <span className="page-link btn btn-sm btn-white rounded-0 active-btn" >{page}</span>
          </li>


          {(visited_page_size < count) ?
            <li className="page-item" onClick={() => onPageChange(page + 1)}>
              <span className="page-link btn btn-sm btn-white rounded-0">{page + 1}</span>
            </li>
            : <></>}

          {((visited_page_size + limit) < count) ?
            <li className="page-item" onClick={() => onPageChange(page + 2)}><span className="page-link btn btn-sm btn-white rounded-0">{page + 2}</span></li>
            : <></>}

          <li className="page-item" onClick={() => (visited_page_size < count) ? onPageChange(page + 1) : ""}>
            <button disabled={!(visited_page_size < count)} className="page-link btn btn-sm btn-white" aria-label="Next"><span aria-hidden="true">&raquo;</span></button>
          </li>
        </ul>
      </nav>
    </div>}</>)
  }
}