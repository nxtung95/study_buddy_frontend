import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {fonts} from "../Styles/theme";
import Card from "./card";
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {deleteUserSubject} from "../../redux/slices/userSlice";
import {deleteSubject} from "../../redux/slices/subjectSlice";
import commonUtility from "../../utility/CommonUtility";

const Subject = ({ subject }) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMoreClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteSubject = () => {
    dispatch(deleteSubject(subject.id))
        .unwrap()
        .then((result) => {
          if (commonUtility.isSuccess(result.code)) {
            dispatch(deleteUserSubject(subject));
          }
          handleMenuClose(); // Close the menu after deleting
        })
        .catch(() => {
          console.log("Delete Subject has failed");
        });

  };

  return (
    <div style={styles.subjectContainer}>
      <div style={styles.titleContainer}>
        <h3 style={styles.title}>{subject.title}</h3>
        <IconButton onClick={handleMoreClick}>
          <MoreHorizIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleDeleteSubject}>Delete</MenuItem>
        </Menu>
      </div>
      <div style={styles.cardList}>
        <Card />
        <Card />
      </div>
      <div style={styles.addCard}>
        <IconButton style={styles.addCardButton}>
          <AddCircleOutlineIcon />
        </IconButton>
        <h3 style={styles.addCardText}>Add card</h3>
      </div>
    </div>
  );
};

const styles = {
  subjectContainer: {
    backgroundColor: "#F0F1F3",
    borderRadius: "10px",
    padding: "10px",
    margin: "15px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    width: "308px",
  },
  titleContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  title: {
    ...fonts.subjectSemiBold,
    margin: "5px 4px 0 5px",
  },
  cardList: {
    display: "flex",
    flexDirection: "column",
  },
  addCard: {
    display: "flex",
    alignItems: "center",
    marginTop: "auto", // Pushes the "Add Card" button to the bottom
    paddingTop: "30px",
  },
  addCardText: {
    ...fonts.subjectCardNormal,
    margin: "0",
  },
  addCardButton: {
    ...fonts.subjectCardNormal,
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
  },
};

export default Subject;
