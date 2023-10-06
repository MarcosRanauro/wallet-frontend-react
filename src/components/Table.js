import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense, initialEdit } from '../redux/actions';
import './styles/Table.css';

class Table extends Component {
  deleteBttn = (id) => {
    const { dispatch } = this.props;
    dispatch(deleteExpense(id));
  };

  editBttn = (id) => {
    const { dispatch } = this.props;
    dispatch(initialEdit(id));
  };

  render() {
    const { expenses } = this.props;

    return (
      <table className="table-container">
        <tr className="header-tag-container">
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th data-testid="valueth">Valor</th>
          <th data-testid="moedath">Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
        {expenses && expenses.map((item) => {
          const { id, description, tag, method, value, currency, exchangeRates } = item;
          const { name } = exchangeRates[currency];
          const ask = Number(exchangeRates[currency].ask);
          return (
            <tbody key={ id } className="body-tag-container">
              <tr>
                <td>{description}</td>
                <td>{tag}</td>
                <td>{method}</td>
                <td>{Number(value).toFixed(2)}</td>
                <td>{name}</td>
                <td>{ask.toFixed(2)}</td>
                <td>{(ask * Number(value)).toFixed(2)}</td>
                <td>Real</td>
                <td>
                  <button
                    className="edit-btn"
                    type="button"
                    data-testid="edit-btn"
                    onClick={ () => this.editBttn(id) }
                  >
                    Editar
                  </button>
                  <button
                    className="delete-btn"
                    type="button"
                    data-testid="delete-btn"
                    onClick={ () => this.deleteBttn(id) }
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })).isRequired,
};

export default connect(mapStateToProps)(Table);
