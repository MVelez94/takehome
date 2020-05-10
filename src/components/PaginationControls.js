import './PaginationControls.css';
import React from 'react';

export default function PaginationControls({move}) {
    return (
        <div className="controls">
                <button onClick={() => move(-1)}>&lt;</button>
                <select onChange={(e) => null}>
                    <option value={5}>5</option>
                    <option value={10} defaultValue={true}>10</option>
                    <option value={15}>15</option>
                </select>
                <button onClick={() => move(1)}>&gt;</button>
        </div>);
}
