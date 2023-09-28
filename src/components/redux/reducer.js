import {
  ADD_INVESTOR_TO_SERVER,
  DELETE_INVESTOR_ON_SERVER,
  UPDATE_INVESTOR_ONRISE_ON_SERVER,
  FETCH_INVESTORS_SUCCESS,
} from './actions';

const initialState = [];

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_INVESTOR_TO_SERVER:
      return [...state, action.payload];
    case DELETE_INVESTOR_ON_SERVER:
      return state.filter((investor) => investor.customId !== action.payload);
    case UPDATE_INVESTOR_ONRISE_ON_SERVER:
      return state.map((investor) =>
        investor.customId === action.payload.customId
          ? { ...investor, onrise: action.payload.onrise }
          : investor
      );
    case FETCH_INVESTORS_SUCCESS:
      return action.payload;
    default:
      return state;
  }
}