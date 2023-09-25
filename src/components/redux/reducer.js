import {
  ADD_INVESTOR_TO_SERVER,
  DELETE_INVESTOR_ON_SERVER,
  UPDATE_INVESTOR_ONRISE_ON_SERVER,
  FETCH_INVESTORS_SUCCESS, // Новый тип экшена для загрузки данных
} from './actions';

const initialState = [];

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_INVESTOR_TO_SERVER:
      return [...state, action.payload];
    case DELETE_INVESTOR_ON_SERVER:
      return state.filter((investor) => investor.index !== action.payload); 
    case UPDATE_INVESTOR_ONRISE_ON_SERVER:
      return state.map((investor) =>
        investor.index === action.payload.index
          ? { ...investor, onrise: action.payload.onrise }
          : investor
      );
    case FETCH_INVESTORS_SUCCESS: // Обработка нового типа экшена
      return action.payload; // Просто заменяем состояние данными из сервера
    default:
      return state;
  }
}
