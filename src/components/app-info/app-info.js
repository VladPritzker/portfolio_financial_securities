import "./app-info.css";
import pdLogo from "/Users/vladbuzhor/Library/Mobile Documents/com~apple~CloudDocs/Vlad/Study/Study/New_project/employees_template/src/components/photo/PD.png"; // Путь к вашему фото

const AppInfo = ({ totalEmployeeCount, onRiseCount }) => {
  return (
    <div className="app-info">
      <div className="app-info-content">
        <div>
          <h1>Wealth Management System</h1>
        </div>
        <div>
          <h2>Total number of investors: {totalEmployeeCount}</h2>
          <h3>Will increase investments: {onRiseCount}</h3>
        </div>
        <p>The search only works for the "All employees" filter</p>
      </div>
      <img src={pdLogo} alt="Pritzker Development Logo" className="pd-logo" />
    </div>
  );
};

export default AppInfo;