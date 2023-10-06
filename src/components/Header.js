import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './styles/Header.css';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    const total = expenses.reduce((acc, cur) => {
      acc += Number(cur.value) * Number(cur.exchangeRates[cur.currency].ask);
      return acc;
    }, 0);

    return (
      <header className="header-container">
        <span>Email: </span>
        <p data-testid="email-field">{ email }</p>
        <span>Despesas Totais: </span>
        <p data-testid="total-field">{ total.toFixed(2) }</p>
        <p data-testid="header-currency-field">BRL</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
  })).isRequired,
};

export default connect(mapStateToProps)(Header);
