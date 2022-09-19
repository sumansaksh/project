import React, { useState, useEffect } from "react";
import "./ResetPassword.css";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import Loader from "../layout/loader/Loader";
import { BsLock } from "react-icons/bs";

import { FaLock } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { clearError, resetPassword } from "../../Actions/userActions";
import { useParams } from "react-router-dom";

const ResetPassword = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { token } = useParams();
  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const resetPasswordSubmit = async (e) => {
    e.preventDefault();
    const myForm = {
      password: password,
      confirmPassword: confirmPassword,
    };

    dispatch(resetPassword(token, myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    if (success) {
      alert.success("Password reset succesfully");
      navigate("/login");
    }
  }, [dispatch, error, alert, navigate, success]);

  return (
    <>
      {false ? (
        <Loader />
      ) : (
        <>
          <div className="resetPasswordContainer">
            <div className="resetPasswordUpBox">
              <h2 className="resetPasswordHeading">Reset password</h2>
              <form
                className="resetPasswordForm"
                onSubmit={resetPasswordSubmit}
              >
                <div>
                  <BsLock />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div>
                  <FaLock />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <input
                  type="submit"
                  value="Reset"
                  className="resetPasswordbtn"
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

export default ResetPassword;
