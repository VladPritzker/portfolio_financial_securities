import React, { useState, useEffect } from 'react'; // Добавьте useEffect в импорт
import './app.css';
import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';
import {
  // ... другие импорты ...
  addInvestorToServer,
  deleteInvestorOnServer,
  updateInvestorOnRiseOnServer,
  fetchInvestors, // Импортируем экшен для загрузки данных с сервера
} from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';


function App() {

  
  const [activeButton, setActiveButton] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [firstName, setFirstName] = useState(''); // State for first name
  const [lastName, setLastName] = useState('');   // State for last name
  const [investedAmount, setInvestedAmount] = useState(''); // State for invested amount
  const [isDeleteConfirmationVisible, setDeleteConfirmationVisible] = useState(false);
  const [indexToDelete, setIndexToDelete] = useState(null);
  
  const dispatch = useDispatch();
  const data = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchInvestors()); // Вызываем экшен для загрузки данных с сервера при монтировании компонента
  }, [dispatch]);

 

  
  
  const toggleDeleteConfirmation = (index) => {
    setIndexToDelete(index);
    setDeleteConfirmationVisible(!isDeleteConfirmationVisible);
  };
  
  

  const onRiseCount = data ? data.filter((item) => item.onrise === true).length : 0;
  const moreThan100 = data ? data.filter((item) => parseInt(item.investedAmount) > 1000).length : 0;
  

  

  const handleSearch = (text) => {
    setSearchText(text);
  };


  
  
  const handleFormSubmit = (event) => {
    event.preventDefault();

    const newInvestor = {
      name: firstName,
      lastName: lastName,
      investedAmount: `${investedAmount}$`,
      onrise: false,
    };

    dispatch(addInvestorToServer(newInvestor)); // Отправляем запрос на сервер для добавления инвестора
    setFirstName('');
    setLastName('');
    setInvestedAmount('');
  };




  
  const handleDeleteInvestor = (index) => {
    dispatch(deleteInvestorOnServer(index)); // Отправляем запрос на сервер для удаления инвестора
    setDeleteConfirmationVisible(false);
  };



  

  const onRiseStar = (index) => {
    // Отправляем запрос на сервер для обновления состояния onrise инвестора
    console.log(index)
    dispatch(updateInvestorOnRiseOnServer(index, !data[index].onrise));
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
    // setData(data)
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

      <EmployeesList
        displayedData={displayedData}
        data={data}
        onRiseStar={(index) => onRiseStar(index)} // Убедитесь, что index правильно передается здесь

        toggleDeleteConfirmation={toggleDeleteConfirmation} // Pass the function here
        keyExtractor={(investor) => investor.index} // Уникальный ключ инвестора
        />
      <EmployeesAddForm
        onFormSubmit={handleFormSubmit}
        firstName={firstName}
        setFirstName={setFirstName}
        lastName={lastName}
        setLastName={setLastName}
        investedAmount={investedAmount}
        setInvestedAmount={setInvestedAmount}
      />
  {isDeleteConfirmationVisible && (
  <div className="confirmation-modal">
    <div className="confirmation-box">
      <p>Are you sure?</p>
      <button onClick={() => handleDeleteInvestor(indexToDelete)}>Yes</button>
      <button onClick={toggleDeleteConfirmation}>No</button>
    </div>
  </div>
)}

    </div>
  );
}

export default App;