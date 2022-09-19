import React, { useState, useEffect } from "react";
import "./UpdatePassword.css";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import Loader from "../layout/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearError, updatePassword } from "../../Actions/userActions";
import { UPDATE_PASSWORD_RESET } from "../../Constants/userConstants";
import { BsUnlock } from "react-icons/bs";
import { BsLock } from "react-icons/bs";
import { MdVpnKey } from "react-icons/md";
// import { MdLockOutline } from "react-icons/md";
import { FaLock } from "react-icons/fa";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { error, isUpdated, loading } = useSelector((state) => state.profile);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = async (e) => {
    e.preventDefault();

    const myForm = {
      oldPassword: oldPassword,
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    };
    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }

    
    if (isUpdated) {
      alert.success("Password updated succesfully");
      navigate("/account");
      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, alert, isUpdated, navigate]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="updatePasswordContainer">
            <div className="updatePasswordUpBox">
              <h2 className="updatePasswordHeading">Update Profile</h2>
              <form
                className="updatePasswordForm"
                onSubmit={updatePasswordSubmit}
              >
                <div className="loginPassword">
                  <MdVpnKey />
                  <input
                    type="password"
                    placeholder="Old Password"
                    required
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                </div>

                <div className="loginPassword">
                  <BsLock />
                  <input
                    type="password"
                    placeholder="New Password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
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
                  value="change"
                  className="updatePasswordbtn"
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

export default UpdatePassword;
