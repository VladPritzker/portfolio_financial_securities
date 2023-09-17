import "./app-info.css";

const AppInfo = ({ totalEmployeeCount, onRiseCount }) => {
    return (
      <div className="app-info">
        <h1>Employee Management System</h1>
        <h2>Total number of employees: {totalEmployeeCount}</h2>
        <h3>Employees on rise: {onRiseCount}</h3>
      </div>
    );
  };
  
  

export default AppInfo;