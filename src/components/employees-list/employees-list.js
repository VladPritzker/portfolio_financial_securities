import React from 'react';
import EmployeesListItem from "../employees-list-item/employees-list-item";
import './employees-list.css';

const EmployeesList = ({ displayedData, onRiseStar, toggleDeleteConfirmation }) => {
    return (
        <ul className="app-list list-group"> {displayedData.map((employee) => (<EmployeesListItem key={employee.index} data={employee} onRiseStar={onRiseStar} toggleDeleteConfirmation={toggleDeleteConfirmation} />))}
        </ul>
    );
};

export default EmployeesList;
