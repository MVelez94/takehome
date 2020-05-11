import './PaginationControls.css';
import React from 'react';

export default function PaginationControls({move, page, options, resultsPerPage}) {
    return (
        <div className="controls">
                <button onClick={() => move(-1)}>&lt;</button>
                <div className="resultsPerPage">
                    <div>Results per page </div>
                    <select onChange={(e) => {
                        let p = parseInt(e.target.value);
                        return p && page(p);
                        }} value={resultsPerPage}>
                            {options.map(o => <option key={o} value={o}>{o}</option>)}
                    </select>
                </div>
                <button onClick={() => move(1)}>&gt;</button>
        </div>);
}
