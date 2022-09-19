import React from "react";
import { useNavigate } from "react-router-dom";
import "./orderSuccsess.css";
const OrderSuccess = () => {
  const navigate = useNavigate();
  return (
    <div className="OrderSuccsessContainer">
      <img
        src="https://www.pinkwigscloset.com/images/success-tick.gif"
        alt="Order successfull"
      />

      <p className="orderSuccsesNote">Payment successfull</p>
      <button
        className="orderSuccsesBtn"
        onClick={() => {
          navigate("/orders/me");
        }}
      >
        see your Orders
      </button>
    </div>
  );
};

export default OrderSuccess;
