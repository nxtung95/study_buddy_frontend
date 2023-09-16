// imports the React Javascript Library
import React from "react";
//Card
import red from "@material-ui/core/colors/red";
import blue from "@material-ui/core/colors/blue";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";

// Search
//Tabs
import {withStyles} from "@material-ui/core/styles";
import {Card, CardActions, CardContent, CardMedia, Fab, Grid, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

const styles = theme => ({
    root: {
        // backgroundColor: theme.palette.background.paper,
        width: 700,
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

    handleRemoveSelectedImage = e => {
        console.log(e);
        const removeIndex = e.currentTarget.getAttribute("data-image");
        const updateSelectedFiles = this.state.selectedFileList.filter((file, index) => {
            return index != removeIndex;
        });

        this.setState({
            selectedFileList: updateSelectedFiles
        });
        this.props.setFileSelectedList(updateSelectedFiles);
    }

    handleViewImage = e => {
        const selectIndex = e.currentTarget.getAttribute("data-image");
        const selectedImage = this.state.selectedFileList.filter((file, index) => {
            console.log("index: " + (parseInt(index) === parseInt(selectIndex)));
            return parseInt(index) === parseInt(selectIndex);
        });
        var newTab = window.open();
        newTab.document.body.innerHTML = '<img src="' + selectedImage[0].data + '">';
    }

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
                        {
                            (this.state.selectedFileList && this.state.selectedFileList.length > 0) && this.state.selectedFileList.map((selectedFile, index) => {
                                return <Card sx={{ maxWidth: 345 }} key={index}>
                                    <CardMedia
                                        alt="Img"
                                        style={{width: 100, height: 100}}
                                        component="img"
                                        src={selectedFile.data}
                                    />
                                    <CardActions disableSpacing={true}>
                                        <IconButton  sx={{
                                            "&:hover": {
                                                backgroundColor: "#e0e0e0",
                                            }
                                        }} aria-label="delete" size="large" data-image={index} onClick={(e) => this.handleRemoveSelectedImage(e)}>
                                            <DeleteIcon color="primary" fontSize="medium" />
                                        </IconButton>
                                        <IconButton  sx={{
                                            "&:hover": {
                                                backgroundColor: "#e0e0e0",
                                            }
                                        }} aria-label="delete" size="large" data-image={index} onClick={(e) => this.handleViewImage(e)}>
                                            <VisibilityIcon color="primary" fontSize="medium"/>
                                        </IconButton>
                                    </CardActions>
                                </Card>
                            })
                        }
                    </Grid>
                </CardContent>
            </React.Fragment>
        );
    }

    renderUploadedState() {
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
                        {
                            (this.state.selectedFileList && this.state.selectedFileList.length > 0) && this.state.selectedFileList.map((selectedFile, index) => {
                                return <Card sx={{ maxWidth: 345 }} key={index}>
                                        <CardMedia
                                            alt="Img"
                                            style={{width: 100, height: 100}}
                                            component="img"
                                            src={selectedFile.data}
                                            key={index}
                                        />
                                        <CardActions>
                                            <IconButton  sx={{
                                                "&:hover": {
                                                    backgroundColor: "#e0e0e0",
                                                }
                                            }} aria-label="delete" size="large" data-image={index} onClick={(e) => this.handleRemoveSelectedImage(e)}>
                                                <DeleteIcon color="primary" fontSize="medium" />
                                            </IconButton>
                                            <IconButton  sx={{
                                                "&:hover": {
                                                    backgroundColor: "#e0e0e0",
                                                }
                                            }} aria-label="delete" size="large" data-image={index} onClick={(e) => this.handleViewImage(e)}>
                                                <VisibilityIcon color="primary" fontSize="medium" />
                                            </IconButton>
                                        </CardActions>
                                    </Card>
                            })
                        }
                    </Grid>
                </CardContent>
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