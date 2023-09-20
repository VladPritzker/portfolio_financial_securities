// Редюсер (reducer) - обрабатывает экшены и изменяет состояние

import { ADD_INVESTOR, DELETE_INVESTOR, UPDATE_INVESTOR_ONRISE } from './actions';

 const initialData = [
  { index: 1, name: 'Vlad', lastName: 'Pritzker', investedAmount: '4000$', onrise: false },
  { index: 2, name: 'Ruslan', lastName: 'Manager', investedAmount: '500$', onrise: false },
  { index: 3, name: 'Poll', lastName: 'Design', investedAmount: '4000$', onrise: false }
];

export default function reducer(state = initialData, action) {
  switch (action.type) {
    case ADD_INVESTOR:
      return [...state, action.payload]; // Обновляем список инвесторов
    case DELETE_INVESTOR:
      return state.filter((investor) => investor.index !== action.payload);
    case UPDATE_INVESTOR_ONRISE:
      return action.payload; // Обновляем список инвесторов с новыми значениями onrise
    default:
      return state;
  }
}
