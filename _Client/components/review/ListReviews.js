import React from "react";
import { Card, Box, Rating } from "@mui/material";

const ListReviews = ({ reviews }) => {
  return (
    <>
      <Card>
        {reviews &&
          reviews.map((review) => (
            <Box key={review.name}>
              <Rating name="disabled" value={review.rating} disabled />
              <p className="review_user">by {review.name}</p>
              <p className="review_comment">{review.comment}</p>
            </Box>
          ))}
      </Card>
    </>
  );
};

export default ListReviews;
