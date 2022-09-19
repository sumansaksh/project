import React, { useEffect, useState } from "react";
import { clearError, createProduct } from "../../Actions/productActions";
//import "./LoginSignUp.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../layout/loader/Loader";
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import {
  MdSpellcheck,
  MdDescription,
  MdDashboardCustomize,
  MdAccountTree,
} from "react-icons/md";
import { FaRupeeSign } from "react-icons/fa";
import { BiCategoryAlt } from "react-icons/bi";
import { NEW_PRODUCT_RESET } from "../../Constants/ProductConstants";
const CreateProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, success } = useSelector((state) => state.newProducts);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [gender, setGender] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = ["Topwere", "Bottomwere", "Sports", "Indian"];

  const genders = ["Men", "Women", "Kids", "Unisex"];

  useEffect(() => {
    if (error) {
      
      alert.error(error);

      dispatch(clearError());
    }

    if (success) {
      alert.success("Product created succesfully");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, error, success, alert]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = {
      name: name,
      price: price,
      description: description,
      category: category,
      stock: stock,
      gender: gender,
      reatings: 0,
      image: imagesPreview,
    };

    dispatch(createProduct(myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };
  return (
    <>
      <form
        className="createProductForm"
        enctype="multipart/form-data"
        onSubmit={createProductSubmitHandler}
      >
        <h1>CREATE PRODUCT</h1>

        <div>
          <MdSpellcheck />
          <input
            value={name}
            type="text"
            className=""
            placeHolder="Product Name"
            onChange={(e) => setName(e.target.value)}
          ></input>
        </div>
        <div>
          <FaRupeeSign />
          <input
            type="number"
            className=""
            placeHolder="Price"
            required
            onChange={(e) => setPrice(e.target.value)}
          ></input>
        </div>
        <div>
          <MdDescription />
          <textarea
            value={description}
            placeHolder="Product Description"
            onChange={(e) => setDescription(e.target.value)}
            cols="30"
            rows="1"
          ></textarea>
        </div>
        <div>
          {/* <MdAccountTree /> */}
          <select onChange={(e) => setGender(e.target.value)}>
            <option value="">Choose gender</option>

            {genders.map((gen) => (
              <option key={gen} value={gen}>
                {gen}
              </option>
            ))}
          </select>
        </div>

        <div>
          {/* <MdAccountTree /> */}
          <select onChange={(e) => setCategory(e.target.value)}>
            <option value="">Choose Category</option>

            {categories.map((cate) => (
              <option key={cate} value={cate}>
                {cate === "Indian" ? "Indian and Festive" : cate}
              </option>
            ))}
          </select>
        </div>

        <div>
          <input
            type="number"
            className=""
            placeHolder="Stock"
            onChange={(e) => setStock(e.target.value)}
          ></input>
        </div>
        <div id="createProductFormFile">
          <input
            type="file"
            name="avatar"
            accept="image/*"
            onChange={createProductImagesChange}
            multiple
          ></input>
        </div>
        <div>
      
          {imagesPreview.map((image, index) => (
            <img key={index} src={image} alt="Product Preview" />
          ))}
        </div>

        <Button
          id="createProductBtn"
          type="submit"
          disabled={loading ? true : false}
        >
          Create
        </Button>
      </form>
    </>
  );
};

export default CreateProduct;
