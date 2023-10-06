import {
  WALLET_SUBMIT,
  ADD_EXPENSE,
  DELETE_EXPENSE,
  INITIAL_EDIT,
  EDIT_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  edit: false,
  editId: 0,
};

const editExpense = (state, action) => state.expenses.map((item) => {
  if (item.id === state.editId) {
    return {
      id: item.id,
      value: action.payload.value,
      description: action.payload.description,
      currency: action.payload.currency,
      method: action.payload.method,
      tag: action.payload.tag,
      exchangeRates: item.exchangeRates,
    };
  }
  return item;
});

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case WALLET_SUBMIT:
    return {
      ...state,
      currencies: action.payload.currencies,
    };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, {
        id: state.expenses.length,
        value: action.payload.value,
        description: action.payload.description,
        currency: action.payload.currency,
        method: action.payload.method,
        tag: action.payload.tag,
        exchangeRates: action.payload.exchangeRates,
      }],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((item) => item.id !== action.payload.id),
    };
  case INITIAL_EDIT:
    return {
      ...state,
      edit: true,
      editId: action.payload.id,
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      expenses: editExpense(state, action),
      edit: false,
    };
  default:
    return state;
  }
};

export default wallet;
