import { createTheme } from "@mui/material/styles";

export const colors = {
  primaryBackground: "#FFFFFF",
  secondaryColor: "#FFFFFF",
  HomeScreenBackground: "#0D3F51",
  HomeScreenForeground: "#B4DEDC",
  // Add more colors here...
};

// Define your common styles here
export const commonStyles = {
  container: {
    minHeight: "100vh",
    // Add more common styles here...
  },
};

export const fonts = {
  primaryFontBold: {
    color: "#04E49C",
    fontFamily: "Roboto, sans-serif",
    fontSize: 24,
    fontWeight: 700,
  },
  secondarySemiBold: {
    color: "#FFFFFF",
    fontFamily: "Roboto, sans-serif",
    fontSize: 20,
    fontWeight: 700,
  },
  subjectSemiBold: {
    color: "#000000",
    fontFamily: "Roboto, sans-serif",
    fontSize: 20,
    fontWeight: 700,
  },
  tableSemiBold: {
    color: "#043647",
    fontFamily: "Roboto, sans-serif",
    fontWeight: "bold",
    fontSize: "36px",
  },
  subjectCardNormal: {
    color: "#000000",
    fontFamily: "Roboto, sans-serif",
    fontWeight: 300,
    fontSize: 16,
  },
  subjectCardItalics: {
    color: "#000000",
    fontFamily: "Roboto, sans-serif",
    fontStyle: "italic",
    fontWeight: 300,
    fontSize: 12,
  },
};

export default createTheme({
  palette: {
    primary: {
      main: "#ffffff", // Lighter text color for the inputs
    },
    secondary: {
      main: "#ffffff",
    },
  },
});
