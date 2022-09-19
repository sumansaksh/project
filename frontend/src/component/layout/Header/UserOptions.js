import React from "react";
import "./Header.css";
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import Backdrop from "@material-ui/core/Backdrop";
import { MdDashboard } from "react-icons/md";
import { MdPerson } from "react-icons/md";
import { MdExitToApp } from "react-icons/md";
import { MdViewList, MdShoppingCart } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { logout } from "../../../Actions/userActions";
import { useDispatch, useSelector } from "react-redux";

export const UserOptions = ({ user }) => {
  const { cartItems } = useSelector((state) => state.cart);
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();
  const options = [
    { icon: <MdViewList />, name: "orders", func: orders },
    { icon: <MdPerson />, name: "Profile", func: account },
    {
      icon: (
        <MdShoppingCart
          style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
        />
      ),
      name: `cart ${cartItems.length}`,
      func: goToCart,
    },
    { icon: <MdExitToApp />, name: "Logout", func: logOutUser },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <MdDashboard />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    navigate("/dashboard");
  }

  function orders() {
    navigate("/orders/me");
  }
  function account() {
    navigate("/account");
  }

  function goToCart() {
    navigate("/Cart");
  }

  function logOutUser() {
    dispatch(logout());
    alert.success("Logout successfull");
  }

  return (
    <>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction="down"
        className="speedDial"
        style={{ zIndex: "11" }}
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : "/profile.png"}
            alt="profile"
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </>
  );
};
