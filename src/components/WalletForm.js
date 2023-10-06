import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrencies, addExpense, editExpense } from '../redux/actions';
import './styles/WalletForm.css';

class WalletForm extends Component {
  state = {
    valueInput: '',
    descriptionInput: '',
    currencyInput: 'USD',
    methodInput: 'Dinheiro',
    tagInput: 'Alimentação',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getCurrencies());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  expensesAdd = (event) => {
    event.preventDefault();
    const { dispatch } = this.props;
    const {
      valueInput,
      descriptionInput,
      currencyInput,
      methodInput,
      tagInput,
    } = this.state;
    const obj = {
      value: valueInput,
      description: descriptionInput,
      currency: currencyInput,
      method: methodInput,
      tag: tagInput,
    };
    dispatch(addExpense(obj));
    this.setState({
      valueInput: '',
      descriptionInput: '',
    });
  };

  expensesEdit = (event) => {
    event.preventDefault();
    const { dispatch } = this.props;
    const {
      valueInput,
      descriptionInput,
      currencyInput,
      methodInput,
      tagInput,
    } = this.state;
    const obj = {
      value: valueInput,
      description: descriptionInput,
      currency: currencyInput,
      method: methodInput,
      tag: tagInput,
    };
    dispatch(editExpense(obj));
    this.setState({
      valueInput: '',
      descriptionInput: '',
    });
  };

  render() {
    const { currencies, edit } = this.props;
    const {
      valueInput,
      descriptionInput,
      currencyInput,
      methodInput,
      tagInput,
    } = this.state;

    return (
      <form className="container-form">
        <label htmlFor="value-input" className="valor-input">
          Valor:
          <input
            type="text"
            name="valueInput"
            id="value-input"
            data-testid="value-input"
            value={ valueInput }
            onChange={ this.handleChange }
          />
        </label>
        <label htmlFor="description-input" className="descricao-input">
          Descrição:
          <input
            type="text"
            name="descriptionInput"
            id="description-input"
            data-testid="description-input"
            value={ descriptionInput }
            onChange={ this.handleChange }
          />
        </label>
        <span className="moeda-input">
          Moeda:
          <select
            name="currencyInput"
            id="currency-input"
            data-testid="currency-input"
            value={ currencyInput }
            onChange={ this.handleChange }
          >
            {currencies.map((currency) => (
              <option key={ currency }>{ currency }</option>
            ))}
          </select>
        </span>
        <span className="metodo-input">
          Método de pagamento:
          <select
            name="methodInput"
            id="method-input"
            data-testid="method-input"
            value={ methodInput }
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </span>
        <span className="tag-input">
          Tag:
          <select
            name="tagInput"
            id="tag-input"
            data-testid="tag-input"
            value={ tagInput }
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </span>
        {edit ? (
          <button
            className="btn-edit"
            type="button"
            data-testid="edit-btn"
            onClick={ this.expensesEdit }
          >
            Editar despesa
          </button>
        ) : (
          <button
            className="btn-add"
            type="button"
            data-testid="send-btn"
            onClick={ this.expensesAdd }
          >
            Adicionar despesa
          </button>
        )}

      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  edit: state.wallet.edit,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
