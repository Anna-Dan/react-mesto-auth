import React from "react";

function Login(props) {
  const [UserData, setUserState] = React.useState({
    password: "",
    email: "",
  });

  const { password, email } = UserData;

  function handleChange(e) {
    const { name, value } = e.target;
    setUserState({
      ...UserData,
      [name]: value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      return;
    }
    props.handleLogin(email, password);
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Вход</h2>
      <form
        onSubmit={handleSubmit}
        name="login_form"
        className="auth__form"
      >
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
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
