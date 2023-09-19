import React from 'react';
import EmployeesListItem from "../employees-list-item/employees-list-item";
import './employees-list.css';

const EmployeesList = ({ displayedData, onRiseStar }) => {
    return (
        <ul className="app-list list-group"> {displayedData.map((employee) => (<EmployeesListItem key={employee.index} data={employee} onRiseStar={onRiseStar} />))}
        </ul>
    );
};

export default EmployeesList;
