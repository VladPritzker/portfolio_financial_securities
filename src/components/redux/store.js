import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // Импортируйте redux-thunk
import rootReducer from './reducer';

const store = createStore(
    rootReducer,
    applyMiddleware(thunk) // Добавьте redux-thunk как middleware
  );
export default store;
