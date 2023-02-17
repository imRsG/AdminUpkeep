import React from "react";
import { Box, Card, Grid, Typography, Button } from "@material-ui/core";
import { useStyles } from "../BodyStyles";
import { CardContent } from "@material-ui/core";
// import PageHeader from "./PageHeader";
// import PeopleOutlineTwoToneIcon from "@material-ui/icons/PeopleOutlineTwoTone";
import DashboardIcon from "@material-ui/icons";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import AddHomeWorkIcon from "@mui/icons-material/AddHomeWork";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import HomeIcon from "@mui/icons-material/Home";

import { green, red } from "@material-ui/core/colors";
export default function Dashboard() {
  const classes = useStyles();

  const DisplayData = [
    {
      label: "LandLord",
      value: "80",
      icon: <LocationCityIcon />,
      iconLabel: "4%",
    },
    {
      label: "Tanent",
      value: "100",
      icon: <AddHomeWorkIcon />,
      iconLabel: "9%",
    },
    {
      label: "Repairer",
      value: "90",
      icon: <HomeRepairServiceIcon />,
      iconLabel: "23%",
    },
    {
      label: "Property",
      value: "150",
      icon: <HomeIcon />,
      iconLabel: "30%",
    },
  ];

  return (
    <>
      {/* <PageHeader */}
      <h1>
        DashBoard
      </h1>
      <Box>
        <Grid container spacing={1}>
          {DisplayData.map((item, i) => (
            <Grid item xs={6} sm={3} key={i}>
              <Card>
                <CardContent className={classes.cardContent}>
                  <canvas
                    id={item.label}
                    className={classes.displayCardGraph}
                  ></canvas>

                  <Typography variant="body2" className={classes.cardLabel}>
                    {item.label}
                  </Typography>
                  <Typography
                    variant="h5"
                    component="h6"
                    className={classes.cardTitle}
                  >
                    {item.value}
                  </Typography>
                  <Typography
                    component="p"
                    style={{
                      textAlign: "center",
                      marginBottom: "0px",
                    }}
                  >
                    <Button
                      size="small"
                      className={classes.ratioBtn}
                      startIcon={item.icon}
                      style={{
                        color: item.label[0] === "P" ? green[600] : red[500],
                      }}
                    >
                      {item.iconLabel}
                    </Button>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}