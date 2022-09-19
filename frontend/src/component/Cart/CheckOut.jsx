import React from "react";
import StripeCheckout from "react-stripe-checkout";
const CheckOut = ({ totalPrice }) => {
  const tokenHandle = (token) => {
  
  };
  return (
    <>
      <StripeCheckout
        amount={totalPrice * 100}
        token={tokenHandle}
        stripeKey="pk_test_51LUWAESAQeJxO10uUbk0mboNEUYGgmI8tNjKh1HpF0bUPdXl3Mw8xpqXtTIorXqzgaVi3q2435OmOZodCKWhyHcy00BrkRoXR0"
        currency="INR"
      >
        <button className="payBtn">Proceed To Payment</button>
      </StripeCheckout>
    </>
  );
};

export default CheckOut;
