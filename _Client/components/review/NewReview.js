import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Rating,
  Button,
  TextareaAutosize,
  Box,
  Container
} from "@mui/material";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import {
  newReview,
  checkReviewAvailability,
  clearError
} from "../../redux/actions/roomsAction";
import { ACTION_TYPES } from "../../redux/constants/actionConstants";

const NewReview = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
  const router = useRouter();

  const { error, success } = useSelector((state) => state.newReview);
  const { reviewAvailable } = useSelector((state) => state.checkReview);

  const { id } = router.query;

  useEffect(() => {
    if (id !== undefined) {
      dispatch(checkReviewAvailability(id));
    }

    if (error) {
      toast.error(error);
      dispatch(clearError());
    }

    if (success) {
      toast.success("Review is posted.");
      dispatch({ type: ACTION_TYPES.NEW_REVIEW_RESET });

      router.push(`/rooms/${id}`);
    }
  }, [dispatch, success, error, id]);

  const submitHandler = () => {
    const reviewData = {
      rating,
      comment,
      roomId: id
    };

    dispatch(newReview(reviewData));
  };

  function setUserRatings() {
    const stars = document.querySelectorAll(".star");

    stars.forEach((star, index) => {
      star.starValue = index + 1;

      ["click", "mouseover", "mouseout"].forEach(function (e) {
        star.addEventListener(e, showRatings);
      });
    });

    function showRatings(e) {
      stars.forEach((star, index) => {
        if (e.type === "click") {
          if (index < this.starValue) {
            star.classList.add("red");

            setRating(this.starValue);
          } else {
            star.classList.remove("red");
          }
        }

        if (e.type === "mouseover") {
          if (index < this.starValue) {
            star.classList.add("light-red");
          } else {
            star.classList.remove("light-red");
          }
        }

        if (e.type === "mouseout") {
          star.classList.remove("light-red");
        }
      });
    }
  }

  return (
    <>
      {reviewAvailable && (
        <Container>
          <Typography variant="h5">Submit Review</Typography>
          <Box>
            <Rating
              name="simple-controlled"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
            />
          </Box>
          <Box>
            <TextareaAutosize
              aria-label="minimum height"
              minRows={8}
              placeholder="Minimum 3 rows"
              style={{ minWidth: 300 }}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </Box>
          <Box>
            <Button variant="contained" onClick={submitHandler}>
              Submit
            </Button>
          </Box>
        </Container>
      )}
    </>
  );
};

export default NewReview;
