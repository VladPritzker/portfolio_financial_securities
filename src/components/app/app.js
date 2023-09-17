import React, { useState } from 'react';
import './app.css';
import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

function App() {
  const [users, setUsers] = useState([]);
  const [data, setData] = useState([
    { index: 1, name: 'Vlad', lastName: 'Pritzker', salary: "4000$", onrise: false },
    { index: 2, name: 'Ruslan', lastName: 'Menager', salary: "200$", onrise: false },
    { index: 3, name: 'Poll', lastName: 'Design', salary: "4000$", onrise: false }
  ]);
  const onRiseCount = data.filter((item) => item.onrise === true).length;

  const [filteredData, setFilteredData] = useState([]);
  const [activeButton, setActiveButton] = useState('all');
  const [searchText, setSearchText] = useState('');

  
  const updateState = (newState) => {
    setData(newState.data);
    setFilteredData(newState.filteredData);
  };
  
  // Функция для вычисления displayedData
  const getDisplayedData = () => {
    if (activeButton === 'onRise') {
      return data.filter((item) => item.onrise === true);
    } else if (activeButton === 'highIncome') {
      return data.filter((item) => parseInt(item.salary) > 1000);
    } else {
      return Array.isArray(filteredData) && filteredData.length > 0
        ? filteredData
        : data;
    }
  };

  const handleSearch = (filteredData) => {
    setFilteredData(filteredData);
  };

  const onRise = () => {
    const filteredData = data.map((item) => {
      if (item.onrise === true) {
        return { ...item, onrise: false };
      }
      return item;
    });
    setFilteredData(filteredData);
    setActiveButton('onRise');
    setSearchText(''); // Сбросить текст поиска

  };

  const highIncome = () => {
    const filteredData = data.filter((item) => parseInt(item.salary) > 1000);
    setFilteredData(filteredData);
    setActiveButton('highIncome');
    setSearchText(''); // Сбросить текст поиска

  };

  const allEmployees = () => {
    setFilteredData([]);
    setActiveButton('all');
    setSearchText(''); // Сбросить текст поиска

  };

  // Вычисляем displayedData
  const displayedData = getDisplayedData();

  return (
    <div className="app">
      <AppInfo totalEmployeeCount={data.length} onRiseCount={onRiseCount} /> {/* Передаем общее количество сотрудников как пропс */}

      <div className="search-panel">
        The search only works for the "All employees" filter
        <SearchPanel
        data={data}
        onSearch={handleSearch}
        activeButton={activeButton}
        searchText={searchText} // Передаем состояние текста поиска
        setSearchText={setSearchText} // Передаем функцию для обновления текста поиска
      />
        <AppFilter
          data={data}
          onRise={onRise}
          highIncome={highIncome}
          allEmployees={allEmployees}
          activeButton={activeButton}
        />
      </div>

      {/* Передаем displayedData и updateState в компонент EmployeesList */}
      <EmployeesList displayedData={displayedData} updateState={updateState} />
      <EmployeesAddForm />
    </div>
  );
}

export default App;
