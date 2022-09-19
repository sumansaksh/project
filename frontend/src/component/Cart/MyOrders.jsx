import React, { useEffect, useState } from "react";
import "./MyOrders.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../Actions/orderAction";
import Loader from "../layout/loader/Loader";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { clearError } from "../../Actions/orderAction";
import { FaBox, FaCheckCircle } from "react-icons/fa";
import OrderSuccsessIcon from "./OrderSuccsessIcon.jsx";
import OrderProcessingIcon from "./OrderProcessingIcon.jsx";
import { useParams } from "react-router-dom";

const MyOrders = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);
  const { id } = useParams();

  
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }

    dispatch(myOrders());
  }, [dispatch, alert, error]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="myOrdersPage">
            <h1>{user.name}'s orders</h1>
            {orders.map((item) => {
              return (
                <>
                  <Link className="myOrderSingleOrder" to={item._id}>
                    <div className="myOrderTop">
                      {item.orderStatus === "Delivered" ? (
                        <OrderSuccsessIcon />
                      ) : (
                        <OrderProcessingIcon />
                      )}

                      <h3>order id: {item._id}</h3>
                    </div>

                    <div className="singleOrder">
                      {item.orderItems.map((perItem) => {
                        return (
                          <>
                            <div>
                              <img src={perItem.image} alt={perItem.name} />
                              <div>
                                <p>{`product Name:  ${perItem.name}`}</p>
                                <p>{`product Quantity:  ${perItem.quantity}`}</p>
                              </div>
                            </div>
                          </>
                        );
                      })}
                    </div>
                    <div id="myOrderTotalPrice">
                      Amount Paid: {item.totalPrice}
                    </div>
                  </Link>
                </>
              ); //fghjkl;'lkjh
            })}
          </div>
        </>
      )}
    </>
  );
};

export default MyOrders;
