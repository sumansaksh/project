import React, { useState } from "react";
import { BsPerson, BsBuilding, BsGeo } from "react-icons/bs";
import { AiFillPhone, AiFillHome } from "react-icons/ai";
import { FaLandmark, FaGlobeAsia } from "react-icons/fa";
import { useAlert } from "react-alert";
import "./Shipping.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { saveShippingAdress } from "../../Actions/cartActions";
import { BsGeoAlt } from "react-icons/bs";

const Shipping = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { adressInfo } = useSelector((state) => state.cart);
  
  const [adress, setAdress] = useState({
    country: adressInfo.country,
    phone: adressInfo.phone,
    city: adressInfo.city,
    state: adressInfo.state,
    street: adressInfo.street,
    pinCode: adressInfo.pinCode,
  });

  const adressDataChange = (e) => {
    setAdress({ ...adress, [e.target.name]: e.target.value });
    
  };

  const adressSubmit = (e) => {
    e.preventDefault();
    if (
      adress.country === "" ||
      adress.phone === "" ||
      adress.city === "" ||
      adress.state === "" ||
      adress.street === "" ||
      adress.pinCode === ""
    ) {
      alert.error("fields are empty");
      return;
    }

    if (adress.phone.length < 10 || adress.phone.length > 10) {
      alert.error("contact Number should be of 10 digits");
      return;
    }
    dispatch(saveShippingAdress(adress));
    navigate("/order/confirm");
  };
  return (
    <>
      <div className="shippingContainer">
        <div className="shippingBox">
          <h2 className="shippingHeading">Shipping Adress</h2>
          <form className="shippingForm" onSubmit={adressSubmit}>
            <div className="shippingPhone*">
              {" "}
              <AiFillPhone />
              <input
                required
                value={adress.phone}
                type="number"
                name="phone"
                placeholder="Contact Number*"
                onChange={adressDataChange}
              />
            </div>

            <div className="shippingCity">
              <BsBuilding />
              <input
                required
                value={adress.city}
                type="text"
                name="city"
                placeholder="City*"
                onChange={adressDataChange}
              />
            </div>
            <div className="shippingStreet">
              <AiFillHome />
              <input
                required
                value={adress.street}
                type="text"
                name="street"
                Placeholder="street Adress*"
                onChange={adressDataChange}
              />
            </div>
            <div className="shippingCountry">
              {" "}
              <FaGlobeAsia />
              <input
                required
                value={adress.country}
                type="text"
                name="country"
                placeholder="Country Name*"
                onChange={adressDataChange}
              />
            </div>
            <div className="subAdressContainer">
              <div className="shippingState">
                <BsGeoAlt />
                <input
                  required
                  value={adress.state}
                  type="text"
                  name="state"
                  placeholder="State*"
                  onChange={adressDataChange}
                />
              </div>

              <div className="shippingPinCOde">
                <BsGeo />
                <input
                  required
                  value={adress.pinCode}
                  type="number"
                  name="pinCode"
                  placeholder="PinCode*"
                  onChange={adressDataChange}
                />
              </div>
            </div>

            <input
              required
              type="submit"
              value="continue"
              className="shippingBtn"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Shipping;
