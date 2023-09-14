import React from "react";

import {Avatar, Divider, Grid, Paper} from "@mui/material";
import {useSelector} from "react-redux";

const imgLink =
    "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

const Comment = ({answers}) => {
    return (
        <div className="App">
            {
                answers && answers.map((answer, index) => {
                    return <Paper key={index} style={{ padding: "40px 20px" }}>
                        <Grid container wrap="nowrap" spacing={2}>
                            <Grid item>
                                <Avatar alt={answer.tutorName} />
                            </Grid>
                            <Grid justifyContent="left" item xs zeroMinWidth>
                                <h4 style={{ margin: 0, textAlign: "left" }}>{answer.tutorName}</h4>
                                <p style={{ textAlign: "left" }}>
                                    {answer.content}
                                </p>
                                <p style={{ textAlign: "left", color: "gray" }}>
                                    {answer.updatedDate}
                                </p>
                            </Grid>
                        </Grid>
                        <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
                    </Paper>
                })
            }
        </div>
    );
}

export default Comment;