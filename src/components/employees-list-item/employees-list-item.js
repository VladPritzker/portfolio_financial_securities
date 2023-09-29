import React, { useState } from 'react';
import './employees-list-item.css';

const EmployeesListItem = ({ data, onRiseStar, toggleDeleteConfirmation }) => {
    const [inputValue, setInputValue] = useState(data.investedAmount); // Стейт для управления значением input

    const handleCookieClick = () => {
        if (data && data.index) {
          onRiseStar(data.index);
        } else {
          console.log('error');
        }
      };
      

    const handleInputChange = (event) => {
        const newValue = event.target.value;
        setInputValue(newValue); // Обновляем значение input в стейте
    };

    return (
        <li className={`list-group-item d-flex justify-content-between ${data.onrise ? 'like' : ''}`}>
            <span className="list-group-item-label">{data.name} {data.lastName}</span>
            <input
                type="text"
                className="list-group-item-input"
                value={inputValue} // Устанавливаем значение input из стейта
                onChange={handleInputChange} // Обрабатываем изменения input
            />
            <div className='d-flex justify-content-center align-items-center'>
                <button type="button" className=" btn-sm" onClick={handleCookieClick}>
                    <i className="fa fa-chart-line"></i>
                </button>

                <button  type="button" className="btn-trash btn-sm"onClick={() => toggleDeleteConfirmation(data.index)}>
                <i className="fas fa-trash"></i>
                </button>

                <i className={`fa fa-check	 ${data.onrise ? 'like' : ''}`}></i>
            </div>
        </li>
    );
};

export default EmployeesListItem;