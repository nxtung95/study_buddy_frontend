import React, { useState } from "react";
import { fonts } from "../Styles/theme";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch } from "react-redux";
import { addSubject } from "../../redux/slices/userSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");

  const handleAddSubjectClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSubjectSelect = (selectedSubject) => {
    dispatch(addSubject(selectedSubject));
    setShowDropdown(false);
  };

  return (
    <div style={styles.sidebar}>
      <div style={styles.buttons}>
        <button style={styles.button}>Profile</button>
        <button style={styles.button}>Tutors</button>
        <button style={styles.button}>Board Settings</button>
        <div style={styles.line}></div>
        <button style={styles.subjectButton} onClick={handleAddSubjectClick}>
          Add Subject
        </button>
        {showDropdown && (
          <Select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            displayEmpty
            style={styles.languageDropdown}
          >
            <MenuItem value="" disabled>
              Select Language
            </MenuItem>
            <MenuItem
              style={styles.dropdownOption}
              value="Math"
              onClick={(e) => handleSubjectSelect(e.target.value)}
            >
              Math
            </MenuItem>
            <MenuItem
              style={styles.dropdownOption}
              value="Science"
              onClick={(e) => handleSubjectSelect(e.target.value)}
            >
              Science
            </MenuItem>
            <MenuItem
              style={styles.dropdownOption}
              value="English"
              onClick={(e) => handleSubjectSelect(e.target.value)}
            >
              English
            </MenuItem>
          </Select>
        )}
      </div>
    </div>
  );
};

const styles = {
  sidebar: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    width: "200px",
    height: "100%",
    padding: "60px 25px 0px 0px",
  },
  button: {
    ...fonts.secondarySemiBold,
    backgroundColor: "transparent",
    border: "none",
    color: "#FFFFFF",
    cursor: "pointer",
    fontSize: "16px",
    marginBottom: "15px",
    width: "100%",
    textAlign: "left",
  },
  buttons: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "10px",
  },
  subjectButton: {
    ...fonts.secondarySemiBold,
    backgroundColor: "transparent",
    border: "none",
    color: "#FFFFFF",
    cursor: "pointer",
    fontSize: "16px",
    marginBottom: "15px",
    width: "100%",
    textAlign: "left",
    paddingTop: "20px",
  },
  line: {
    borderBottom: "1px solid #04E49C",
    marginTop: "16px",
    width: "115%",
  },
  languageDropdown: {
    ...fonts.secondarySemiBold,
    backgroundColor: "transparent",
    border: "none",
    color: "#FFFFFF",
    cursor: "pointer",
    fontSize: "16px",
    marginBottom: "15px",
    width: "100%",
    textAlign: "left",
    paddingTop: "20px",
  },
};

export default Sidebar;
