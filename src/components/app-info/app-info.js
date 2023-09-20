import "./app-info.css";
import pdLogo from "./PD.png"; // Путь к вашему фото

const AppInfo = ({ totalEmployeeCount, onRiseCount }) => {
  return (
    <div className="app-info">
      <div className="app-info-content">
        <div>
          <h1>Wealth Management System</h1>
        </div>
        <div>
          <h2>Total number of investors: {totalEmployeeCount}</h2>
          <h3>Going to increase investments: {onRiseCount}</h3>
        </div>
      </div>
      <img src={pdLogo} alt="Pritzker Development Logo" className="pd-logo" />
    </div>
  );
};

export default AppInfo;