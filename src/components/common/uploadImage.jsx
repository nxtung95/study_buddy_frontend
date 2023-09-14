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
        // backgroundColor: theme.palette.background.paper,
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
        selectedFileList: this.props.fileSelectedList,
        fileName: ""
    };

    handleUploadClick = event => {
        var file = event.target.files[0];
        console.log(file);
        var reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = (e) => {
            const selectedFiles = [...this.state.selectedFileList, {"fileName": this.state.fileName, "data": reader.result}];
            console.log(selectedFiles);
            this.setState({
                selectedFileList: selectedFiles
            });
            this.props.setFileSelectedList(selectedFiles);
        }
        this.setState({
            mainState: "uploaded",
            fileName: file.name
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
                        <CardActionArea style={{width: "50%"}}>
                            {
                                this.state.selectedFileList && this.state.selectedFileList.map((selectedFile, index) => {
                                    return <img
                                        alt=""
                                        width="50%"
                                        className={classes.media}
                                        src={selectedFile.data.includes('data:image/jpeg') ? 'data:image/jpeg;base64,' + selectedFile.data : selectedFile.data}
                                        key={index}
                                    />
                                })
                            }
                        </CardActionArea>
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
                    <CardActionArea style={{width: "50%"}}>
                        {
                            this.state.selectedFileList && this.state.selectedFileList.map((selectedFile, index) => {
                                return <img
                                    alt=""
                                    width="50%"
                                    className={classes.media}
                                    src={selectedFile.data.includes('data:image/jpeg') ? 'data:image/jpeg;base64,' + selectedFile.data : selectedFile.data}
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
                {/*<div className={classes.title}>Upload image</div>*/}
                <div className={classes.root}>
                    <Card className="Input Image">
                        {
                            (this.state.mainState === "initial" && this.renderInitialState()) ||
                            (this.state.mainState === "uploaded" && this.renderUploadedState())
                        }
                    </Card>
                </div>
            </React.Fragment>
        );
    }
}

export default withStyles(styles, { withTheme: true })(ImageUploadCard);