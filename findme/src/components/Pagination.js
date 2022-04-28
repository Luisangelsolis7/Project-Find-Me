import React from "react";

function Pagination(props){
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(props.totalItems / props.itemsPerPage); i++){
        pageNumbers.push(i);

    }

    return(
        <nav>
            <ul className="pagination">
                <li key="first" className="page-item">
                    <button  onClick={() => props.paginate(1)} className="page-link">
                        {"<<"}
                    </button>
                </li>
                {props.currentPage > 1 &&<li key="prev" className="page-item">
                    <button onClick={() => props.paginate(props.currentPage - 1)} className="page-link">
                        {"<"}
                    </button>
                </li>}
                {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                        <button  onClick={() => props.paginate(number)} className="page-link">
                            {number}
                        </button>
                    </li>
                ))}
                {props.currentPage < pageNumbers.length  && <li key="next" className="page-item">
                    <button  onClick={() => props.paginate(props.currentPage + 1)} className="page-link">
                        {">"}
                    </button>
                </li>}
                <li key="last" className="page-item">
                    <button onClick={() => props.paginate(pageNumbers.length)} className="page-link">
                        {">>"}
                    </button>
                </li>
            </ul>

        </nav>
    )

}

export default Pagination;