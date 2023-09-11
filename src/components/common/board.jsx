import React from "react";
import { fonts } from "../Styles/theme";
import Subject from "./subject";
import { useSelector } from "react-redux";

const Board = () => {
  const subjects = useSelector((state) => state.user.currentUser.subjects);

  return (
    <div style={styles.boardContainer}>
      <div style={styles.header}>

        <h2 style={styles.title}>Max's Board</h2>
      </div>
      <div style={styles.content}>
        <div style={styles.cardsContainer}>
          {
            subjects && subjects.map((subject, index) => {
              console.log("Subject data:", subject); // Add this console.log statement
              return <Subject key={index} subject={subject} />;
            })
          }
        </div>
      </div>
    </div>
  );
};

const styles = {
  boardContainer: {
    display: "flex",
    flexDirection: "column",
    height: "500px",
    width: "80%",
  },
  header: {
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    backgroundColor: "#FFFFFF",
    padding: "10px",
  },
  title: {
    ...fonts.tableSemiBold,
    margin: 0,
    padding: 10,
  },
  content: {
    flex: 1,
    backgroundColor: "#B4DEDC",
    padding: "10px",
    borderBottomRightRadius: "10px",
    borderBottomLeftRadius: "10px",
  },
  cardsContainer: {
    flexDirection: "row",
    display: "flex",
  },
};

export default Board;
