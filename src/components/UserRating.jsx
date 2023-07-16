import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import { toast } from "react-toastify";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { RotateLoader, BeatLoader } from "react-spinners";

const UserRating = ({ readOnly, showButton, user, MediaType, item }) => {
  const [value, setValue] = useState(0);
  const [hover, setHover] = useState(-1);
  const [userValue, setUserValue] = useState(0);
  const [userRate, setUserRate] = useState(false);
  const [showRating, setShowRating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [noRating, setNoRating] = useState(false);

  //getting User ratings documents
  const UserRatingsDocRef = doc(db, `ratings/${item?.id}-` + MediaType);
  //Setting user uid
  const userUid = user?.uid;

  const handleChange = async (event, newValue) => {
    event.preventDefault();
    if (!user || isLoading) {
      return;
    }
    setIsLoading(true);
    setValue(newValue);

    const docData = {
      [userUid]: newValue,
    };

    await setDoc(UserRatingsDocRef, docData, { merge: true });

    toast.success("Successfully Rated!", {
      position: "bottom-left",
      autoClose: 4500,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      style: {
        fontFamily: "Arial",
        fontSize: "18px",
        fontWeight: "bold",
        color: "#4CAF50",
        borderRadius: "5px",
        padding: "10px",
      },
    });

    setTimeout(() => {
      setUserValue(newValue);
      setIsLoading(false);
    }, 1100);
  };

  useEffect(() => {
    setIsLoading(true);
    getDoc(UserRatingsDocRef).then((docSnapshot) => {
      if (docSnapshot.exists()) {
        const ratingDocs = docSnapshot.data();

        if (userUid && ratingDocs[userUid]) {
          setUserValue(ratingDocs[userUid]);
          setUserRate(true);
        }

        //calculate avg rating
        const values = Object.values(ratingDocs);
        const RatingSum = values.reduce((acc, val) => acc + val, 0);
        const avg = RatingSum / values.length;

        const roundedAvg = Math.round(avg * 2) / 2; // round to nearest 0.5

        // check if roundedAvg matches a label
        if (Object.keys(labels).includes(roundedAvg.toString())) {
          setValue(roundedAvg);
        } else {
          // find the nearest label
          const nearestLabel = Object.keys(labels).reduce((a, b) =>
            Math.abs(b - roundedAvg) < Math.abs(a - roundedAvg) ? b : a
          );
          setValue(parseFloat(nearestLabel));
        }
      } else {
        setNoRating(true);
      }
      setTimeout(() => {
        setIsLoading(false);
      }, 250);
    });
  }, []);

  const labels = {
    0.5: "VeryBad",
    1: "VeryBad+",
    1.5: "Bad",
    2: "Bad+",
    2.5: "Ok",
    3: "Ok+",
    3.5: "Good",
    4: "Good+",
    4.5: "Excellent",
    5: "Excellent+",
  };

  return (
    <>
      {userRate && !readOnly && (
        <h2
          style={{
            fontWeight: "bold",
            textDecorationLine: "underline",
            textDecorationColor: "#FFBA08",
            textDecorationThickness: "4px",
            paddingBottom: "2rem",
            textUnderlineOffset: "0.4rem",
            textAlign: "center",
            textTransform: "uppercase",
          }}
        >
          Your rate is : {userValue}
        </h2>
      )}
      <div style={readOnly ? { paddingLeft: "2rem" } : null}>
        {!showRating && showButton ? (
          <>
            <div className="Rate-button" style={{}}>
              <button
                style={{
                  backgroundColor: userRate ? "#4CAF50" : "#007FFF",
                  color: "white",
                  padding: "3px 12px",
                  border: "none",
                  borderRadius: "4px",
                  justifyContent: "center",
                  alignItems: "center",
                  transformOrigin: "center",
                  cursor: "pointer",
                  fontSize: "1rem",
                  fontWeight: "600",
                }}
                onClick={() => setShowRating(true)}
              >
                {userRate
                  ? "Change Rate"
                  : "Rate this " +
                    (MediaType === "movie" ? "Movie" : "TV Series")}
              </button>
            </div>
          </>
        ) : (
          <>
            {!isLoading ? (
              <>
                {!noRating || !readOnly ? (
                  <Box
                    sx={{
                      width: 200,
                      display: "flex",
                      alignItems: "center",
                      paddingLeft: !readOnly && "2rem",
                    }}
                  >
                    <Rating
                      readOnly={readOnly ? true : false}
                      name="hover-feedback"
                      value={value}
                      precision={0.5}
                      onChange={(event, newValue) => {
                        handleChange(event, newValue);
                      }}
                      onChangeActive={(event, newHover) => {
                        setHover(newHover);
                      }}
                      emptyIcon={
                        <StarIcon
                          style={{ color: "#696969" }}
                          fontSize="inherit"
                        />
                      }
                    />
                    {value !== null && (
                      <Box sx={{ ml: 2 }}>
                        {labels[hover !== -1 ? hover : value]}
                      </Box>
                    )}
                  </Box>
                ) : (
                  <h3>no rating</h3>
                )}
              </>
            ) : (
              <>
                {readOnly ? (
                  <div
                    style={{
                      paddingLeft: "2rem",
                      paddingTop: "0.05rem",
                    }}
                    className="loading"
                  >
                    <BeatLoader
                      color="#ff941c"
                      height={5}
                      width={130}
                      loading={isLoading}
                    />
                  </div>
                ) : (
                  <div
                    style={{
                      paddingRight: "1rem",
                    }}
                    className="loading"
                  >
                    <RotateLoader
                      color="#ff941c"
                      height={5}
                      width={130}
                      loading={isLoading}
                    />
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default UserRating;