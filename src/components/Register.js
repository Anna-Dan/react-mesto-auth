import React from "react";
import { Link } from "react-router-dom";

function Register(props) {
  const [registerData, setRegisterData] = React.useState({
    email: "",
    password: "",
  });

  const { email, password } = registerData;

  function handleChange(e) {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.handleRegister(email, password);
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form onSubmit={handleSubmit} name="register_form" className="auth__form">
        <input
          className="auth__input"
          type="email"
          placeholder="Email"
          name="email"
          value={email || ""}
          onChange={handleChange}
        ></input>
        <input
          className="auth__input"
          type="password"
          placeholder="Пароль"
          name="password"
          value={password || ""}
          onChange={handleChange}
        ></input>
        <button type="submit" className="auth__button">
          Зарегистрироваться
        </button>
      </form>

      <p className="auth__text">
        Уже зарегистрированы?
        <Link className="auth__link" to="/sign-in">
          {" "}
          Войти
        </Link>
      </p>
    </div>
  );
}

export default Register;
