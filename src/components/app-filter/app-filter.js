import "./app-filter.css";

const AppFilter = ({ onRise, highIncome, allEmployees, activeButton }) => {
    

    return (
        <div className="btn-group">
            <button type="button"
        className={`btn ${activeButton === 'all' ? 'btn-light' : 'btn-outline-light'}`}
        onClick={allEmployees}>
                    All investors
            </button>
            <button type="button"
        className={`btn ${activeButton === 'onRise' ? 'btn-light' : 'btn-outline-light'}`}
        onClick={onRise}
                    >
                    Going invest more
            </button>
            <button type="button"
        className={`btn ${activeButton === 'highIncome' ? 'btn-light' : 'btn-outline-light'}`}
        onClick={highIncome}
            >
                    Invested more than $1000
            </button>
        </div>
    )
}

export default AppFilter;