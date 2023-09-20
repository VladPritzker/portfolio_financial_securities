export const ADD_INVESTOR = 'ADD_INVESTOR';
export const DELETE_INVESTOR = 'DELETE_INVESTOR';

export function addInvestor(newInvestor) {
  return { type: ADD_INVESTOR, payload: newInvestor };
}

export function deleteInvestor(index) {
  return { type: DELETE_INVESTOR, payload: index };
}


export const UPDATE_INVESTOR_ONRISE = 'UPDATE_INVESTOR_ONRISE';

export function updateInvestorOnRise(updatedInvestor) {
  return { type: UPDATE_INVESTOR_ONRISE, payload: updatedInvestor };
}
