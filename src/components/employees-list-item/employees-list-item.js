import React, { useState, useEffect } from 'react';

import './employees-list-item.css';

const EmployeesListItem = ({
  data,
  onRiseStar,
  toggleDeleteConfirmation,
  setEditModalOpen, // Add openEditModal prop
}) => {
  const [inputValue, setInputValue] = useState(data.investedAmount);

  const handleCookieClick = () => {
    if (data && data.index) {
      onRiseStar(data.index);
    } else {
      console.log('error');
    }
  };
  useEffect(() => {
    // Обновите inputValue при изменении data.investedAmount
    setInputValue(data.investedAmount);
  }, [data.investedAmount]);
  

  return (
    <li className={`list-group-item d-flex justify-content-between ${data.onrise ? 'like' : ''}`}>
      <span className="list-group-item-label">{data.name} {data.lastName}</span>
      <p type="text"
        className="investor-amount">
        Invested Amount {inputValue}$
      </p>
      
      <div className='d-flex justify-content-center align-items-center'>
        <button type="button" className="btn-sm" onClick={handleCookieClick}>
          <i className="fa fa-chart-line"></i>
        </button>
        <button
          type="button"
          className="btn-trash btn-sm"
          onClick={() => toggleDeleteConfirmation(data.index)}
        >
          <i className="fas fa-trash"></i>
        </button>
        {/* Add a button to open the edit modal */}
        <button
          type="button"
          className="btn-update btn-sm"
          onClick={() => setEditModalOpen(data.index)}
        >
          <i className="fas fa-pencil-alt"></i>
        </button>
        <i className={`fa fa-check ${data.onrise ? 'like' : ''}`}></i>
      </div>
    </li>
  );
};

export default EmployeesListItem;
