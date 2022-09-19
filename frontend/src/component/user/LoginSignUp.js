import React, { useRef, useState, useEffect } from "react";
import Loader from "../layout/loader/Loader";
import "./LoginSignUp.css";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useAlert } from "react-alert";
import { BsTelephoneFill, BsLockFill } from "react-icons/bs";
import { MdDriveFileRenameOutline } from "react-icons/md";

// import MailOutlineIcon from "@material-ui/icons/MailOutline";
// import LockOpenIcon from "@material-ui/icons/LockOpen"
import { MdEmail } from "react-icons/md";
import { BsUnlock } from "react-icons/bs";

import { useDispatch, useSelector } from "react-redux";
import { clearError, login, register } from "../../Actions/userActions";
// import { render } from "ejs";
const LoginSignUp = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const location = useLocation();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    Password: "",
    Cpassword: "",
  });

  const { name, email, password, Cpassword, phone } = user;

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/p.png");

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const registerSubmit = async (e) => {
    e.preventDefault();
    const myForm = {
      name: name,
      email: email,
      phone: phone,
      password: password,
      Cpassword: Cpassword,
      avatar: avatar,
    };
   
    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  let redirect;

  if (location.search) {
    redirect = "/shipping";
  } else {
    redirect = "/account";
  }

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (isAuthenticated === true) {
      navigate(redirect);
    }
  }, [dispatch, error, alert, isAuthenticated]);

  const switcherTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }

    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="LogincSignupContainer">
            <div className="LoginSignUpBox">
              <div>
                <div className="login_signup_Togle">
                  <p onClick={(e) => switcherTabs(e, "login")}>Login</p>
                  <p onClick={(e) => switcherTabs(e, "register")}>Register</p>
                </div>
                <button ref={switcherTab}></button>
              </div>
              <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                <div className="loginEmail">
                  <MdEmail />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>

                <div className="loginPassword">
                  <BsLockFill />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <Link to="/password/forgot">Forgot Password</Link>
                <input type="submit" value="Login" className="loginBtn" />
              </form>

              <form
                className="signUpForm"
                ref={registerTab}
                onSubmit={registerSubmit}
                encType="multipart/form-data"
                method="POST"
              >
                <div className="signUpName">
                  <MdDriveFileRenameOutline />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                  />
                </div>

                <div className="signUpEmail">
                  <MdEmail />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>

                <div className="signUpEmail">
                  <BsTelephoneFill />
                  <input
                    type="number"
                    placeholder="phone"
                    required
                    name="phone"
                    value={phone}
                    onChange={registerDataChange}
                  />
                </div>

                <div className="signUpPassword">
                  <BsLockFill />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                </div>

                <div className="signUpPasswordConfirm">
                  <BsLockFill />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    name="Cpassword"
                    value={Cpassword}
                    onChange={registerDataChange}
                  />
                </div>

                <div id="registerImage">
                  <img src={avatarPreview} alt="Avatar Preview" />

                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>

                <input
                  type="submit"
                  value="Register"
                  className="signUpbtn"
                  // disabled={loading ? true : false}
                />
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default LoginSignUp;
