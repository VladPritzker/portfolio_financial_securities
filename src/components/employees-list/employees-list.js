import EmployeesListItem from "../employees-list-item/employees-list-item";
import './employees-list.css';

const EmployeesList = ({ data, onRiseStar }) => {
    
    return (
        <ul className="app-list list-group">
            {data.map((Employees) => (
                <EmployeesListItem key={Employees.index} data={Employees} onRiseStar={onRiseStar} />
            ))}
        </ul>
    )
}

export default EmployeesList;
