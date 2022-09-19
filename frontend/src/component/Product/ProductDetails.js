import React from "react";
import "./productDetails.css";
import { useParams } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import {
  clearError,
  getProductDetails,
  newReview,
} from "../../Actions/productActions";
import { Paper, Button } from "@mui/material";
import ReviewCard from "./ReviewCard";
import Loader from "../layout/loader/Loader";

import { useAlert } from "react-alert";
import { addItemsToCart } from "../../Actions/cartActions";
import { Rating } from "@material-ui/lab";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  buttons,
} from "@material-ui/core";
import { NEWREVIEW_RESET } from "../../Constants/ProductConstants";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const alert = useAlert();
  const [open, setOpen] = React.useState(false);

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const { success, error: reviewError } = useSelector(
    (state) => state.reviewes
  );

  React.useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearError);
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearError);
    }



    if (success) {
      alert.success("Review Submitted");
      dispatch({ type: NEWREVIEW_RESET });
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert, reviewError, success]);

  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    pricision: 0.5,
  };
  const [quantity, setQuantity] = React.useState(1);

  const [rating, setRating] = React.useState(0);
  const [comment, setComment] = React.useState("");
  const increaseQuantity = () => {
  
    if (product.stock <= quantity) {
      return;
    }

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity));
    alert.success("Item Added to cart");
  };

  const submitReviewToggle = () => {

    if (open === true) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  const reviewSubmitHandler = () => {
   
    const myForm = { rating: rating, comment: comment, productId: id };
    
    dispatch(newReview(myForm));
    setOpen(false);
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="ProductDetails">
            <div className="imageCard">
              <Carousel>
                {product.image &&
                  product.image.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={item.url}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>

            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>{product._id}</p>
              </div>

              <div className="detailsBlock-2">
                <Rating {...options} />
                <span>({product.numOfReviews} Reviews)</span>
              </div>

              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly value={quantity} type="number" />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button
                    disabled={product.stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>

                <p>
                  Status:
                  <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                    {product.stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description:<p>{product.description}</p>
              </div>

              <button onClick={submitReviewToggle} className="submitReview">
                Submit Review
              </button>
            </div>
          </div>
          <h3 className="reviewsHeading">Reviews</h3>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="reviewTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle}>cancel</Button>
              <Button onClick={reviewSubmitHandler}>submit</Button>
            </DialogActions>
          </Dialog>

          {product.reviewes && product.reviewes[0] ? (
            <div className="reviewWraper">
              <div className="reviews">
                {product.reviewes.map((review) => (
                  <ReviewCard review={review} />
                ))}
              </div>
            </div>
          ) : (
            <div className="noReviews">No reviews</div>
          )}
        </>
      )}
    </>
  );
};

export default ProductDetails;
