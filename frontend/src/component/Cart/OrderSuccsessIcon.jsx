import React from "react";
import { FaBox, FaRegCheckCircle } from "react-icons/fa";

const OrderSuccsessIcon = () => {
  return (
    <div className="myOrderIcons">
      <FaBox className="myOrderTruck" />
      <FaRegCheckCircle className="myOrderTick" />
      <p>Delivered</p>
    </div>
  );
};

export default OrderSuccsessIcon;
