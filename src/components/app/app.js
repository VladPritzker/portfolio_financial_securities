import React, { useState } from 'react';
import './app.css';
import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

function App() {
  const initialData = [
    { index: 1, name: 'Vlad', lastName: 'Pritzker', investedAmount: '4000$', onrise: false },
    { index: 2, name: 'Ruslan', lastName: 'Manager', investedAmount: '500$', onrise: false },
    { index: 3, name: 'Poll', lastName: 'Design', investedAmount: '4000$', onrise: false }
  ];

  const [data, setData] = useState(initialData);
  const [activeButton, setActiveButton] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [firstName, setFirstName] = useState(''); // State for first name
  const [lastName, setLastName] = useState('');   // State for last name
  const [investedAmount, setInvestedAmount] = useState(''); // State for invested amount

  const onRiseCount = data ? data.filter((item) => item.onrise === true).length : 0;
  const moreThan100 = data ? data.filter((item) => parseInt(item.investedAmount) > 1000).length : 0;
  

  

  const handleSearch = (text) => {
    setSearchText(text);
  };
  
  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Create a new object with the entered values and default onrise = false
    const newInvestor = {
      index: data.length + 1,
      name: firstName,
      lastName: lastName,
      investedAmount: `${investedAmount}$`,
      onrise: false,
    };

    // Update the data array with the new object
    setData([...data, newInvestor]);

    // Reset the input fields
    setFirstName('');
    setLastName('');
    setInvestedAmount('');
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
    setData(data)
  };


  const displayedData = getDisplayedData();

  function getDisplayedData() {
    let filteredData = data;
  
    if (activeButton === 'onRise') {
      filteredData = filteredData.filter((item) => item.onrise === true);
    } else if (activeButton === 'highIncome') {
      filteredData = filteredData.filter((item) => parseInt(item.investedAmount) > 1000);
    }
  
    if (searchText.length > 0) {
      const searchTextLower = searchText.toLowerCase();
      filteredData = filteredData.filter((item) => {
        if (!isNaN(searchTextLower)) {
          return item.salary.includes(searchTextLower);
        } else {
          return (
            item.name.toLowerCase().includes(searchTextLower) ||
            item.lastName.toLowerCase().includes(searchTextLower)
          );
        }
      });
    }
  
    return filteredData;
  }
  
  return (
    <div className="app">
      <AppInfo totalEmployeeCount={data.length} onRiseCount={onRiseCount}  moreThan100={moreThan100}/>

      <div className="search-panel">
        <SearchPanel
          data={getDisplayedData()} // Передаем отфильтрованные данные
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
      <EmployeesAddForm
        onFormSubmit={handleFormSubmit}
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
        investedAmount={investedAmount}
        setInvestedAmount={setInvestedAmount}
      />
    </div>
  );
}

export default App;