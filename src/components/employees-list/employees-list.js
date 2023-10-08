import React from 'react';
import EmployeesListItem from "../employees-list-item/employees-list-item";
import './employees-list.css';

const EmployeesList = ({ displayedData, onRiseStar, toggleDeleteConfirmation, openEditModal }) => {
  return (
    <ul className="app-list list-group">
      {displayedData.map((investor) => (
        <EmployeesListItem
          key={investor.customId}
          data={{
            index: investor.customId, // Use customId as the index
            name: investor.name,
            lastName: investor.lastName,
            investedAmount: investor.investedAmount,
            onrise: investor.onrise,
          }}
          onRiseStar={(customId) => onRiseStar(customId)}
          toggleDeleteConfirmation={(customId) => toggleDeleteConfirmation(customId)}
          setEditModalOpen={(customId) => openEditModal(customId)} // Pass openEditModal function
        />
      ))}
    </ul>
  );
};

export default EmployeesList;
