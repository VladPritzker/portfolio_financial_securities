import React, { Component } from 'react';
import './app.css';
import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [
        
       ], 
      data: [
        {index: 1, name: 'Vlad', lastName: 'Pritzker' , salary: "4000$", onrise: false},
        {index: 2,name: 'Ruslan', lastName: 'Menager' , salary: "200$", onrise: false},
        {index: 3,name: 'Poll', lastName: 'Design ' , salary: "4000$", onrise: false}
       ],  
       filteredData: [ ], 
       activeButton: 'all', // Исходно активна кнопка "Все сотрудники"

    };
  }

//для employees set 
onRiseStar = (index) => {
  // Создаем новый массив данных с обновленным значением onrise для конкретного элемента
  const updatedData = this.state.data.map((item) => {
    if (item.index === index) {
      return { ...item, onrise: !item.onrise }; // Инвертируем значение onrise
    }
    return item;
  });

  const updatedFilteredData = Array.isArray(this.state.filteredData)
    ? this.state.filteredData.map((item) => {
        if (item.index === index) {
          return { ...item, onrise: !item.onrise };
        }
        return item;
      })
    : [];

  this.setState({ data: updatedData, filteredData: updatedFilteredData });
};


//для employees set 


  // для фильтрации 
  handleSearch = (filteredData) => { // для фильтрации 
    this.setState({ filteredData });
  }; // вставляет в filteredData отфильтрованные данные 

  onRise = () => {
    // Фильтруем данные для "На повышение"
    const filteredData = this.state.data.filter((item) => item.onrise === true);
    this.setState({ filteredData, activeButton: 'onRise' });
  };
  
  highIncome = () => {
    // Фильтруем данные для "Зарплата больше 1000"
    const filteredData = this.state.data.filter((item) => parseInt(item.salary) > 1000);
    this.setState({ filteredData, activeButton: 'highIncome' });
  };
  
  allEmployees = (filteredData)=>{ // для фильтрации 
    this.setState({ filteredData, activeButton: 'all' }); // Устанавливаем активную кнопку
  }
// // для фильтрации 
render() {
  const { data, filteredData, activeButton } = this.state;

  let displayedData = [];

  if (activeButton === 'onRise') {
    displayedData = data.filter((item) => item.onrise === true);
  } else if (activeButton === 'highIncome') {
    displayedData = data.filter((item) => parseInt(item.salary) > 1000);
  } else {
    displayedData = Array.isArray(filteredData) && filteredData.length > 0 ? filteredData : data;
  }

  return (
    <div className="app">
      <AppInfo />

      <div className="search-panel">
      <SearchPanel data={data} onSearch={this.handleSearch} activeButton={activeButton} />
        <AppFilter
          data={data}
          onRise={this.onRise}
          highIncome={this.highIncome}
          allEmployees={this.allEmployees}
          activeButton={activeButton}
        />
      </div>

      <EmployeesList data={displayedData} onRiseStar={this.onRiseStar} />
      <EmployeesAddForm />
    </div>
  );
}

}

export default App;
