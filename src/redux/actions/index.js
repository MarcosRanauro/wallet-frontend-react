export const LOGIN_SUBMIT = 'LOGIN_SUBMIT';
export const WALLET_SUBMIT = 'WALLET_SUBMIT';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const INITIAL_EDIT = 'INITIAL_EDIT';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';

export const loginSubmit = (email) => ({
  type: LOGIN_SUBMIT,
  payload: {
    email,
  },
});

export const getCurrencies = () => async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  const currencies = Object.keys(data).filter((key) => key !== 'USDT');

  return dispatch({
    type: 'WALLET_SUBMIT',
    payload: {
      currencies,
    },
  });
};

export const addExpense = (obj) => (async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  const { value, description, currency, method, tag } = obj;
  return dispatch({
    type: ADD_EXPENSE,
    payload: {
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: data,
    },
  });
});

export const deleteExpense = (id) => ({
  type: DELETE_EXPENSE,
  payload: {
    id,
  },
});

export const initialEdit = (id) => ({
  type: INITIAL_EDIT,
  payload: {
    id,
  },
});

export const editExpense = (obj) => {
  const { id, value, description, currency, method, tag } = obj;
  return {
    type: EDIT_EXPENSE,
    payload: {
      id,
      value,
      description,
      currency,
      method,
      tag,
    },
  };
};
