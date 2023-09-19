import React, { useState } from 'react';
import './app.css';
import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

function App() {
  const initialData = [
    { index: 1, name: 'Vlad', lastName: 'Pritzker', salary: "4000$", onrise: false },
    { index: 2, name: 'Ruslan', lastName: 'Manager', salary: "200$", onrise: false },
    { index: 3, name: 'Poll', lastName: 'Design', salary: "4000$", onrise: false }
  ];

  const [data, setData] = useState(initialData);
  const [activeButton, setActiveButton] = useState('all');
  const [searchText, setSearchText] = useState('');

  const onRiseCount = data ? data.filter((item) => item.onrise === true).length : 0;

  

  const handleSearch = (searchText) => {
    const searchTextLower = searchText.toLowerCase();
    // Если поле поиска пустое, отображаем все элементы из исходного массива `initialData`
    if (searchTextLower === '') {
      setData(initialData);
    } else {
      const filteredData = data.filter((item) => {
        if (!isNaN(searchTextLower)) {
          return item.salary.includes(searchTextLower);
        } else {
          return (
            item.name.toLowerCase().includes(searchTextLower) ||
            item.lastName.toLowerCase().includes(searchTextLower)
          );
        }
      });
      setData(filteredData);
    }
  };
  

  const onRiseStar = (index) => {
    // Создаем новый массив данных с обновленным значением onrise для конкретного элемента
    const updatedData = data.map((item) => {
      if (item.index === index) {
        return { ...item, onrise: !item.onrise }; // Инвертируем значение onrise
      }
      return item;
    });
  
    // Обновляем состояние данных
    setData(updatedData);
  };
  
  
  const onRise = () => {
    setActiveButton('onRise');
    setSearchText('');
  };

  const highIncome = () => {
    setActiveButton('highIncome');
    setSearchText('');
  };

  const allEmployees = () => {
    
    setActiveButton('all');
    setSearchText('');
  };


  const displayedData = getDisplayedData();

  function getDisplayedData() {
    if (activeButton === 'onRise') {
      return data.filter((item) => item.onrise === true);
    } else if (activeButton === 'highIncome') {
      return data.filter((item) => parseInt(item.salary) > 1000);
    } else {
      return data;
    }
  }

  return (
    <div className="app">
      <AppInfo totalEmployeeCount={data.length} onRiseCount={onRiseCount} />

      <div className="search-panel">
        <SearchPanel
          data={data}
          onSearch={handleSearch}
          activeButton={activeButton}
          searchText={searchText}
          setSearchText={setSearchText}
        />
        <AppFilter
          data={data}
          onRise={onRise}
          highIncome={highIncome}
          allEmployees={allEmployees}
          activeButton={activeButton}
        />
      </div>

      <EmployeesList displayedData={displayedData} data={data} onRiseStar={onRiseStar} />
      <EmployeesAddForm />
    </div>
  );
}

export default App;