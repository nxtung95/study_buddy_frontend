import React from "react";
import {fonts} from "../Styles/theme";

const Card = ({ question }) => {
  return (
    <div style={styles.cardContainer}>
      {/* Pill indicating answered status */}
      <div
        style={question.status === 1 ? styles.answeredPill : styles.notAnsweredPill}
      ></div>

      {/* Title */}
      <h3 style={styles.cardTitle}>{question.title}</h3>

      {/* <p style={styles.cardContent}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod
        ligula ac eros tincidunt, eget iaculis mauris porttitor.
      </p> */}

      {/* Answered by text */}
      {
        question.status === 1 && (
            <p style={styles.answeredByText}>Answered by: John Doe</p>
        )
      }
    </div>
  );
};

const styles = {
  cardContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: "10px",
    padding: "10px",
    marginBottom: "10px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    position: "relative",
  },
  answeredPill: {
    position: "absolute",
    top: "10px", // Place the pill above the title
    left: "11%",
    width: "50px",
    height: "10px",
    borderRadius: "10px",
    backgroundColor: "#04E49C",
    transform: "translateX(-50%)",
    content: "",
  },
  notAnsweredPill: {
    position: "absolute",
    top: "10px", // Place the pill above the title
    left: "11%",
    width: "50px",
    height: "10px",
    borderRadius: "10px",
    backgroundColor: "#FF4F4F",
    transform: "translateX(-50%)",
    content: "",
  },
  cardTitle: {
    ...fonts.subjectCardNormal,
    margin: "20px 0 5px", // Add more margin between the pill and title
  },
  cardContent: {
    fontSize: "16px",
    color: "#000000",
    margin: 0,
  },
  answeredByText: {
    ...fonts.subjectCardItalics,
    paddingTop: "15px",
    margin: "5px 0 0",
    textAlign: "right",
  },
};

export default Card;
