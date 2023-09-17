// В компоненте EmployeesList
import React from 'react';
import EmployeesListItem from "../employees-list-item/employees-list-item";
import './employees-list.css';

const EmployeesList = ({ displayedData, updateState, filteredData }) => {
    const onRiseStar = (index) => {
        // Создаем новый массив данных с обновленным значением onrise для конкретного элемента
        const updatedData = displayedData.map((item) => {
            if (item.index === index) {
                return { ...item, onrise: !item.onrise };
            }
            return item;
        });

        const updatedFilteredData = Array.isArray(filteredData)
            ? filteredData.map((item) => {
                if (item.index === index) {
                    return { ...item, onrise: !item.onrise };
                }
                return item;
            })
            : [];

        // Вызываем функцию обновления состояния, переданную через пропсы
        updateState({ data: updatedData, filteredData: updatedFilteredData });
    };

    return (
        <ul className="app-list list-group">
            {displayedData.map((employee) => (
                <EmployeesListItem key={employee.index} data={employee} onRiseStar={onRiseStar} />
            ))}
        </ul>
    );
};

export default EmployeesList;
