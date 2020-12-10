import React from 'react'
import { Card, CardHeader, CardMedia, CardContent, Typography, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import './InfoBox.css'

const colors = {
    colorCases: "#eb5569",
    colorRecovered: "#46b29d",
    colorDeaths: "#555"
};
const useStyles = makeStyles(() => ({
    root: {

    },
    media: {
        height: 50,
        width: 50,
    },
    header: {
        paddingBottom: 0,
    }
}));
function InfoBox({ title, caseTitle, casesNumber, totalTitle, totalNumber, img, onClick, clicked }) {
    const classes = useStyles();
    const date = new Date().toLocaleDateString();

    return (
        <Card onClick={onClick} className={classes.root} style={clicked ? { border: `5px solid ${colors[`color${title}`]}` } : { border: "5px solid white" }}>
            <CardHeader
                className={classes.header}
                avatar={
                    <CardMedia
                        component="img"
                        className={`${classes.media} ${"infobox__media"}`}
                        image={img}
                        title={title}
                    />
                }
                title={title}
                subheader={date}
            />
            <CardContent>
                <Grid container className="text-center">
                    <Grid item xs={6} >
                        <h5 className="infobox__case-title"> {caseTitle}</h5>
                        <Typography className="infoBox__cases" variant="body2" color="textSecondary" component="p">
                            {title === "Current" ? "" : "+"} {casesNumber ? casesNumber : '0'}
                        </Typography>
                    </Grid>
                    <Grid item xs={6} >
                        <h5 className="infobox__case-title">{totalTitle} </h5>
                        <Typography className="infoBox__total" variant="body2" color="textSecondary" component="p">
                            {totalNumber ? totalNumber : '0'}
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default InfoBox
