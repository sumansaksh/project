import React, { useState, useEffect } from "react";
import "./UpdateProfile.css";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import Loader from "../layout/loader/Loader";

// import MailOutlineIcon from "@material-ui/icons/MailOutline";
// import LockOpenIcon from "@material-ui/icons/LockOpen"
import { MdEmail } from "react-icons/md";
import { BsUnlock } from "react-icons/bs";

import { useDispatch, useSelector } from "react-redux";
import { clearError, updateProfile, loadUser } from "../../Actions/userActions";
import { UPDATE_PROFILE_RESET } from "../../Constants/userConstants";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const { error, isUpdated, loading } = useSelector((state) => state.profile);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("/profile.png");

  const UpdateProfileSubmit = async (e) => {
    e.preventDefault();

    const myForm = {
      name: name,
      email: email,
      avatar: avatar,
    };
    dispatch(updateProfile(myForm));
  };

  const UpdateProfileDataChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setAvatarPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setAvatarPreview(user.avatar.url);
    }
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }

   
    if (isUpdated) {
      alert.success("Profile updated succesfully");
      dispatch(loadUser());
      navigate("/account");
      dispatch({
        type: UPDATE_PROFILE_RESET,
      });
    }
  }, [dispatch, error, alert, isUpdated, navigate, user]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="updateProfileContainer">
            <div className="updateProfileUpBox">
              <h2 className="updateProfileHeading">Update Profile</h2>
              <form
                className="updateProfileForm"
                onSubmit={UpdateProfileSubmit}
              >
                <div className="updateProfileName">
                  <MdEmail />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="updateProfileEmail">
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

                <div id="UpdateProfileImage">
                  <img src={avatarPreview} alt="Avatar Preview" />

                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={UpdateProfileDataChange}
                  />
                </div>

                <input
                  type="submit"
                  value="UpdateProfile"
                  className="updateProfilebtn"
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

export default UpdateProfile;
