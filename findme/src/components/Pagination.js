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
                    <a  onClick={() => props.paginate(1)} className="page-link">
                        {"<<"}
                    </a>
                </li>
                {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                        <a  onClick={() => props.paginate(number)} className="page-link">
                            {number}
                        </a>
                    </li>
                ))}
                <li key="last" className="page-item">
                    <a onClick={() => props.paginate(pageNumbers.length)} className="page-link">
                        {">>"}
                    </a>
                </li>
            </ul>
        </nav>
    )

}

export default Pagination;