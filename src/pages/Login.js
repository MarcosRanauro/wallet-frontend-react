import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginSubmit } from '../redux/actions';
import './styles/login.css';

class Login extends React.Component {
  state = {
    emailInput: '',
    passwordInput: '',
    disabled: true,
  };

  validateInputs = () => {
    const number = 6;
    const { emailInput, passwordInput } = this.state;
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const emailIsValid = regex.test(emailInput);
    const passwordIsValid = passwordInput.length >= number;
    if (emailIsValid && passwordIsValid) {
      this.setState({ disabled: false });
    } else {
      this.setState({ disabled: true });
    }
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.validateInputs);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { emailInput } = this.state;
    const { dispatch, history } = this.props;
    dispatch(loginSubmit(emailInput));
    history.push('/carteira');
  };

  render() {
    const { emailInput, passwordInput, disabled } = this.state;
    return (
      <form className="container-form-login">
        <h1 className="title"> </h1>
        <h2 className="h2-title">SIGN IN</h2>
        <label htmlFor="email-input">
          Email:
          <input
            className="input"
            type="email"
            name="emailInput"
            id="email-input"
            data-testid="email-input"
            onChange={ this.handleChange }
            value={ emailInput }
          />
        </label>
        <label htmlFor="password-input">
          Senha:
          <input
            className="input"
            type="password"
            name="passwordInput"
            id="password-input"
            data-testid="password-input"
            onChange={ this.handleChange }
            value={ passwordInput }
          />
        </label>
        <button
          className="button-container"
          type="submit"
          data-testid="login-submit-btn"
          disabled={ disabled }
          onClick={ this.handleSubmit }
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
