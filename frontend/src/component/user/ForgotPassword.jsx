import React, { useState, useEffect } from "react";
import "./ForgotPassword.css";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import Loader from "../layout/loader/Loader";

// import MailOutlineIcon from "@material-ui/icons/MailOutline";
// import LockOpenIcon from "@material-ui/icons/LockOpen"
import { MdEmail } from "react-icons/md";
import { BsUnlock } from "react-icons/bs";

import { useDispatch, useSelector } from "react-redux";
import { clearError, forgotPassword } from "../../Actions/userActions";
import { UPDATE_PROFILE_RESET } from "../../Constants/userConstants";

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );
  const [email, setEmail] = useState("");

  const forgotPasswordSubmit = async (e) => {
    e.preventDefault();

    const myForm = {
      email: email,
    };
    dispatch(forgotPassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    
    if (message) {
      alert.success(message);
    }
  }, [dispatch, error, alert, message, user]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="forgotPasswordContainer">
            <div className="forgotPasswordUpBox">
              <h2 className="forgotPasswordHeading">Forgot password</h2>
              <form
                className="forgotPasswordForm"
                onSubmit={forgotPasswordSubmit}
              >
                <div className="forgotPasswordEmail">
                  <MdEmail />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  value="send"
                  className="forgotPasswordbtn"
                  // disabled={loading ? true : false}
                />
              </form>
            </div>
            ;
          </div>
          ;
        </>
      )}
    </>
  );
};

export default ForgotPassword;
