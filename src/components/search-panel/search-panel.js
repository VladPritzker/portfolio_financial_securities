import './search-panel.css';
import React, { useState } from 'react';


const SearchPanel = ({ data, onSearch }) => {
    const [searchText, setSearchText] = useState(''); // searchText это изначальное значение в inpute которое равно ''
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
                return item.name.toLowerCase().includes(searchTextLower);
            }
        });
    
        onSearch(filteredData);
    };
    return (
        <input
        type="text"
        className="form-control search-input"
        placeholder="Найти сотрудника"
        value={searchText}
        onChange={handleInputChange}
    />
    )
}

export default SearchPanel;