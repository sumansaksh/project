import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";

const Product = ({ product }) => {
  const options = {
    value: product.ratings,
    readOnly: true,
    pricision: 0.5,
  };
  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.image[0].url} alt={product.name} />
      <div className="productPageName">{product.name}</div>
      <div>{product.gender}</div>
      <div>{product.category}</div>
      <div>
        <Rating className="productCardRating" {...options} />
        <span className="productCardWritten">({product.numOfReviews} R)</span>
      </div>
      <span>{`₹ ${product.price}`}</span>
    </Link>
  );
};

export default Product;
