import React from 'react';
import './employees-list-item.css';

const EmployeesListItem = ({ data, onRiseStar }) => {
    const handleCookieClick = () => {
        onRiseStar(data.index); // Вызываем функцию onRiseStar с индексом элемента
      };
    return (
<li className={`list-group-item d-flex justify-content-between ${data.onrise ? 'like' : ''}`}>
            <span className="list-group-item-label">{data.name} {data.lastName}</span>
            <input type="text" className="list-group-item-input" defaultValue={data.salary}/>
            <div className='d-flex justify-content-center align-items-center'>
            <button type="button" className="btn-cookie btn-sm" onClick={handleCookieClick}>
                    <i className="fas fa-cookie"></i>
                </button>

                <button type="button" className="btn-trash btn-sm ">
                    <i className="fas fa-trash"></i>
                </button>
                <i className={`fas fa-star ${data.onrise ? 'like' : ''}`}></i>
            </div>
        </li>
    )
}

export default EmployeesListItem;
