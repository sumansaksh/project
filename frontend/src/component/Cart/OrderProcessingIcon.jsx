import React from "react";
import { FaBox, FaSyncAlt } from "react-icons/fa";

const OrderProcessingIcon = () => {
  return (
    <div className="myOrderIcons">
      <FaBox className="myOrderTruck" />
      <FaSyncAlt className="myOrderProcessing" />
      <p>Processing</p>
    </div>
  );
};

export default OrderProcessingIcon;
