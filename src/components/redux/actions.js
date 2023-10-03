export const ADD_INVESTOR_TO_SERVER = 'ADD_INVESTOR_TO_SERVER';
export const DELETE_INVESTOR_ON_SERVER = 'DELETE_INVESTOR_ON_SERVER';
export const UPDATE_INVESTOR_ONRISE_ON_SERVER = 'UPDATE_INVESTOR_ONRISE_ON_SERVER';
export const FETCH_INVESTORS_SUCCESS = 'FETCH_INVESTORS_SUCCESS';




// Экшен для добавления инвестора на сервер
export function addInvestorToServer(newInvestor) {
  return (dispatch) => {
    fetch('http://localhost:4000/api/investors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newInvestor),
    })
      .then((response) => response.json())
      .then((data) => {
        // Если успешно добавлено на сервер, диспатчим экшен для обновления Redux-состояния
        if (data.success) {
          dispatch({
            type: ADD_INVESTOR_TO_SERVER, // Используем константу для типа экшена
            payload: newInvestor, // Передаем данные в payload
          });
          // window.location.reload();
        }
      })
      .catch((error) => {
        console.error('Ошибка при добавлении инвестора:', error);
      });
  };
}

// Экшен для удаления инвестора на сервере
export function deleteInvestorOnServer(customId) {
  return (dispatch) => {
    fetch(`http://localhost:4000/api/investors/customId/${customId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          dispatch({
            type: DELETE_INVESTOR_ON_SERVER,
            payload: customId,
          });
        }
      })
      .catch((error) => {
        console.error('Ошибка при удалении инвестора:', error);
      });
  };
}



export function updateInvestorOnRiseOnServer(customId, onrise) {
  console.log('Received parameters:', customId, onrise);

  return (dispatch) => {
    fetch(`http://localhost:4000/api/investors/customId/${customId}`, { // Используйте URL с customId
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ onrise })
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Если обновление на сервере прошло успешно, обновите данные в Redux Store
          dispatch({
            type: UPDATE_INVESTOR_ONRISE_ON_SERVER,
            payload: { customId, onrise },
          });
        }
      })
      .catch((error) => {
        console.error('Ошибка при обновлении инвестора:', error);
      });
  };
}


export function fetchInvestors() {
  return (dispatch) => {
    fetch('http://localhost:4000/api/investors')
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: FETCH_INVESTORS_SUCCESS,
          payload: data,
        });
      })
      .catch((error) => {
        console.error('Ошибка при загрузке инвесторов:', error);
      });
  };
}