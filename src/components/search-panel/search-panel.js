import './search-panel.css';


const SearchPanel = ({ onSearch, searchText, setSearchText }) => {
    // setSearchText это то что мы введем в inpute
    const handleInputChange = (event) => {
      const inputText = event.target.value;
      setSearchText(inputText);
  
      // Передаем введенный текст обратно в родительский компонент для фильтрации
      onSearch(inputText);
    };
  
    return (
      <input
        type="text"
        className="form-control search-input"
        placeholder="Find an employee"
        value={searchText}
        onChange={handleInputChange}
      />
    );
  };
  

export default SearchPanel;