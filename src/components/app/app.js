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
  fetchInvestors,
  UPDATE_INVESTOR_ONRISE_ON_SERVER
  // Импортируем экшен для загрузки данных с сервера
} from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
// import { v4 as uuidv4 } from 'uuid';



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


  
  
  const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch('http://localhost:4000/api/investors/max-id');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const maxId = data.maxId || 0;
      const newId = maxId + 1;
  
      const newInvestor = {
        id: newId,
        customId: newId,
        name: firstName,
        lastName: lastName,
        investedAmount: `${investedAmount}$`,
        onrise: false,
      };
      
      // Отправляем нового инвестора с customId на сервер
      dispatch(addInvestorToServer(newInvestor));
      
      setFirstName('');
      setLastName('');
      setInvestedAmount('');
    } catch (error) {
      console.error('Error fetching maximum ID:', error);
    }
  };
  
  



  
  const handleDeleteInvestor = async (customId) => {
    console.log('Deleting investor with customId:', customId);
    try {
      // Используйте экшен deleteInvestorOnServer для удаления инвестора на сервере
      dispatch(deleteInvestorOnServer(customId)); // Используйте customId вместо id
      setDeleteConfirmationVisible(!isDeleteConfirmationVisible);

    } catch (error) {
      console.error('Error deleting investor:', error);
    }
  };
  
   
  


  

  const onRiseStar = async (customId) => {
    try {
      const investor = data.find(item => item.customId === customId);
      const newOnRise = !investor.onrise ? 1 : 0; // Инвертируем значение для сервера
  
      // Ожидаем, пока обновление на сервере не завершится
      await dispatch(updateInvestorOnRiseOnServer(customId, newOnRise));
  
      // Этот код выполнится только после успешного обновления на сервере
      dispatch({
        type: UPDATE_INVESTOR_ONRISE_ON_SERVER,
        payload: { customId, onrise: newOnRise },
      });
    } catch (error) {
      console.error('Ошибка при обновлении инвестора:', error);
    }
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
        keyExtractor={(investor) => investor.id} // Используйте уникальное поле, например, id
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
      <button onClick={() => handleDeleteInvestor(indexToDelete)}>Да</button>
      <button onClick={toggleDeleteConfirmation}>No</button>
    </div>
  </div>
)}

    </div>
  );
}

export default App;