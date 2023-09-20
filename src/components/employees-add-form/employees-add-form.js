import './employees-add-form.css';

const EmployeesAddForm = ({
    onFormSubmit,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    investedAmount,
    setInvestedAmount,
  }) => {
    const handleFirstNameChange = (event) => {
      setFirstName(event.target.value);
    };
  
    const handleLastNameChange = (event) => {
      setLastName(event.target.value);
    };
  
    const handleInvestedAmountChange = (event) => {
      setInvestedAmount(event.target.value);
    };
  
    return (
      <div className="app-add-form">
        <h3>Add a new investor</h3>
        <form className="add-form d-flex" onSubmit={onFormSubmit}>
          <input
            type="text"
            className="form-control new-post-label"
            placeholder="Name?"
            value={firstName}
            onChange={handleFirstNameChange}
            required
          />
          <input
            type="text"
            className="form-control new-post-label"
            placeholder="Last Name?"
            value={lastName}
            onChange={handleLastNameChange}
            required
          />
          <input
            type="number"
            className="form-control new-post-label"
            placeholder="Invested amount?"
            value={investedAmount}
            onChange={handleInvestedAmountChange}
            required
          />
          <button type="submit" className="btn btn-outline-light">
            Add
          </button>
        </form>
      </div>
    );
  };
  
  export default EmployeesAddForm;