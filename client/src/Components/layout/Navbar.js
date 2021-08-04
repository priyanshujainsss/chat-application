import React, { useContext } from "react";
import axios from "axios";
import { UserContext } from "../../UserContext";
import { useCookies } from 'react-cookie';

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const [cookies,setCookie,removeCookie] = useCookies(['user']);

  const logout = async () => {
    console.log("logout called");
    try {
      sessionStorage.clear();
      const res = await axios.get("http://soucechat.com/logout"
      // , {
      //   withCredentials: true,
      // }
      );
      console.log(res);
      setUser(null);
    } catch (err) {
      console.log({ err });
    }
  };

  return (
    <div>
      <nav className="green">
        <div className="nav-wrapper">
          <a href="/" className="brand-logo">
            Chat
          </a>
          <a href="#" data-target="mobile-demo" className="sidenav-trigger">
            <i className="material-icons">menu</i>
          </a>
          <ul className="right hide-on-med-and-down">
            {user ? (
              <li>
                <a href="/" onClick={logout}>
                  Logout
                </a>
              </li>
            ) : (
              <>
                <li>
                  <a href="/login">Login</a>
                </li>
                <li>
                  <a href="/signup">Signup</a>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>

      <ul className="sidenav" id="mobile-demo">
        {user ? (
          <li>
            <a href="/" onClick={logout}>
              Logout
            </a>
          </li>
        ) : (
          <>
            <li>
              <a href="/login">Login</a>
            </li>
            <li>
              <a href="/signup">Signup</a>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
