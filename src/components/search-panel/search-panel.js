import './search-panel.css';


const SearchPanel = ({ onSearch, searchText, setSearchText, data }) => {
  const handleInputChange = (event) => {
    const inputText = event.target.value;
    setSearchText(inputText);
  };

  
    return (
      <input
        type="text"
        className="form-control search-input"
        placeholder="Find an investor"
        value={searchText}
        onChange={handleInputChange}
      />
    );
  };
  

export default SearchPanel;