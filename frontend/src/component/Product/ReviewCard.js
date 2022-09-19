import React from "react";
import { Rating } from "@material-ui/lab";

// import profipng from '../../images/Profile.png'
const ReviewCard = ({ review }) => {
 
  const options = {
    size: "small",
    value: review.rating,
    readOnly: true,
    pricision: 0.5,
  };
  return (
    <>
      <div className="reviewCard">
        {/* <img src={profipng} alt="user"/> */}
        <p>{review.name}</p>
        <p>{review.comment}</p>
        <Rating {...options} />
      </div>
    </>
  );
};

export default ReviewCard;
