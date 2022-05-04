import React from "react";
import { Link, Route } from "react-router-dom";
import headerLogo from "../images/logo.svg";

function Header({ handleLogOut = null, email }) {
  return (
    <header className="header">
      <Link to="/" className="header__link">
        <img className="header__logo" src={headerLogo} alt="Логотип сайта" />
      </Link>

      <Route path="/sign-in">
        <Link to="/sign-up" className="header__button" onClick={handleLogOut}>
          Регистрация
        </Link>
      </Route>

      <Route path="/sign-up">
        <Link to="/sign-in" className="header__button" onClick={handleLogOut}>
          Войти
        </Link>
      </Route>

      <Route exact path="/">
        <nav className="header__nav">
          {email && <p className={"header__email"}>{email}</p>}
          <Link to="/sign-in" className="header__button" onClick={handleLogOut}>
            Выйти
          </Link>
        </nav>
      </Route>
    </header>
  );
}

export default Header;
