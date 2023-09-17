import './search-panel.css';



const SearchPanel = ({ data, onSearch, searchText, setSearchText }) => {

    
    // setSearchText это то что мы введем в inpute  
    const handleInputChange = (event) => {
        const inputText = event.target.value;
        setSearchText(inputText);
    
        // Фильтруем данные и передаем результаты в родительский компонент
        const filteredData = data.filter((item) => {
            // Преобразуем введенный текст в нижний регистр
            const searchTextLower = inputText.toLowerCase();
            
            // Если введенное значение - число, ищем совпадение в зарплате
            if (!isNaN(searchTextLower)) {
                return item.salary.includes(searchTextLower);
            } else {
                // В противном случае ищем совпадение в имени
                return (
                    item.name.toLowerCase().includes(searchTextLower) ||
                    item.lastName.toLowerCase().includes(searchTextLower)
                    )
            }
            
        });
        
        onSearch(filteredData);
    };
    return (
        <input
        type="text"
        className="form-control search-input"
        placeholder="Find an employee"
        value={searchText}
        onChange={handleInputChange}
    />
    )
}

export default SearchPanel;