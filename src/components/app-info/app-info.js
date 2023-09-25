import "./app-info.css";
import pdLogo from "./Pritzker_Development.png"; // Путь к вашему фото

const AppInfo = ({ totalEmployeeCount, onRiseCount, moreThan100 }) => {
  return (
    <div className="app-info">
      <div className="app-info-content">
        <div>
          <h1>Wealth Management System</h1>
        </div>
        <div>
          <h3>Total number of investors: {totalEmployeeCount}</h3>
          <h3>Going to increase investments: {onRiseCount}</h3>
          <h3>Invested more than 1000$: {moreThan100}</h3>
        </div>
      </div>
      <img src={pdLogo} alt="Pritzker Development Logo" className="pd-logo" />
      
    </div>
  );
};

export default AppInfo;