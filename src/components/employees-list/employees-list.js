import React from 'react';
import EmployeesListItem from "../employees-list-item/employees-list-item";
import './employees-list.css';

const EmployeesList = ({ displayedData, onRiseStar, toggleDeleteConfirmation }) => {
    return (
        <ul className="app-list list-group"> {displayedData.map((investor) => (<EmployeesListItem key={investor.id} data={{
            index: investor.id, // Используйте поле id в качестве индекса
            name: investor.name,
            lastName: investor.lastName,
            investedAmount: investor.investedAmount,
            onrise: investor.onrise,
          }} onRiseStar={onRiseStar} toggleDeleteConfirmation={toggleDeleteConfirmation}  />))}
        </ul>
    );
};

export default EmployeesList;
