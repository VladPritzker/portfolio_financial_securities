import React from 'react';
import EmployeesListItem from "../employees-list-item/employees-list-item";
import './employees-list.css';

const EmployeesList = ({ displayedData, onRiseStar, toggleDeleteConfirmation }) => {
    return (
        <ul className="app-list list-group"> {displayedData.map((investor) => (<EmployeesListItem key={investor.customId}
            data={{
            index: investor.customId, // Используйте поле id в качестве индекса
            name: investor.name,
            lastName: investor.lastName,
            investedAmount: investor.investedAmount,
            onrise: investor.onrise,
          }} onRiseStar={(customId) => onRiseStar(customId)}
          toggleDeleteConfirmation={(customId) => toggleDeleteConfirmation(customId)}
          />))}
        </ul>
    );
};

export default EmployeesList;