// imports the React Javascript Library
import React from "react";
//Card
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";

import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";

import red from "@material-ui/core/colors/red";
import blue from "@material-ui/core/colors/blue";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";

// Search
//Tabs
import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: 500,
        display: "flex",
        justifyContent: "flex-start",
        // alignItems: "center"
        marginBottom: 15
    },
    icon: {
        margin: theme.spacing(2)
    },
    iconHover: {
        margin: theme.spacing(2),
        "&:hover": {
            color: red[800]
        }
    },
    cardHeader: {
        textalign: "center",
        align: "center",
        backgroundColor: "white"
    },
    input: {
        display: "none"
    },
    title: {
        color: blue[800],
        fontWeight: "bold",
        fontFamily: "Montserrat",
        align: "center"
    },
    button: {
        color: blue[900],
        margin: 10
    },
    secondaryButton: {
        color: "gray",
        margin: 10
    },
    typography: {
        margin: theme.spacing(2),
        backgroundColor: "default"
    },
});

class ImageUploadCard extends React.Component {
    state = {
        mainState: "initial", // initial, uploaded
        selectedFileList: []
    };

    handleUploadClick = event => {
        console.log();
        var file = event.target.files[0];
        const reader = new FileReader();
        var url = reader.readAsDataURL(file);

        reader.onloadend = function(e) {
            const selectedFileList = [...this.state.selectedFileList, {"file": file, "data": [reader.result]}];
            this.setState({
                selectedFileList: selectedFileList
            });
            this.props.setFileSelectedList(selectedFileList);
            console.log("Image URL: " + url);
        }.bind(this);
        this.setState({
            mainState: "uploaded",
        });
    };

    renderInitialState() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <CardContent>
                    <Grid container justifyContent="flex-start" alignItems="center">
                        <input
                            accept="image/*"
                            className={classes.input}
                            id="contained-button-file"
                            multiple
                            type="file"
                            onChange={this.handleUploadClick}
                        />
                        <label htmlFor="contained-button-file">
                            <Fab component="span" className={classes.button}>
                                <AddPhotoAlternateIcon />
                            </Fab>
                        </label>
                    </Grid>
                </CardContent>
            </React.Fragment>
        );
    }

    renderUploadedState() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <Grid container justifyContent="flex-start" alignItems="center">
                    <input
                        accept="image/*"
                        className={classes.input}
                        id="contained-button-file"
                        multiple
                        type="file"
                        onChange={this.handleUploadClick}
                    />
                    <label htmlFor="contained-button-file">
                        <Fab component="span" className={classes.button}>
                            <AddPhotoAlternateIcon />
                        </Fab>
                    </label>
                    <CardActionArea>
                        {
                            this.state.selectedFileList.map((selectedFile, index) => {
                                return <img
                                    width="25%"
                                    className={classes.media}
                                    src={selectedFile.data}
                                    key={index}
                                />
                            })
                        }
                    </CardActionArea>
                </Grid>
            </React.Fragment>
        );
    }

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <div className={classes.title}>Upload image</div>
                <div className={classes.root}>
                    <Card className="Input Image">
                        {
                            (this.state.mainState == "initial" && this.renderInitialState()) ||
                            (this.state.mainState == "uploaded" && this.renderUploadedState())
                        }
                    </Card>
                </div>
            </React.Fragment>
        );
    }
}

export default withStyles(styles, { withTheme: true })(ImageUploadCard);