import "./app-filter.css";

const AppFilter = ({ onRise, highIncome, allEmployees, activeButton }) => {
    

    return (
        <div className="btn-group">
            <button type="button"
        className={`btn ${activeButton === 'all' ? 'btn-light' : 'btn-outline-light'}`}
        onClick={allEmployees}>
                    All employees
            </button>
            <button type="button"
        className={`btn ${activeButton === 'onRise' ? 'btn-light' : 'btn-outline-light'}`}
        onClick={onRise}
                    >
                    Up for promotion
            </button>
            <button type="button"
        className={`btn ${activeButton === 'highIncome' ? 'btn-light' : 'btn-outline-light'}`}
        onClick={highIncome}
            >
                    Salary more than 1000$
            </button>
        </div>
    )
}

export default AppFilter;