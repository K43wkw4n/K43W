import { Box, Grid, Typography } from "@mui/material";
import { Zoom } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import React from "react";
import { Picture } from "../../models/Picture";
import "../../css/SlideShow.css";

const zoomOutProperties = {
  duration: 1500,
  transitionDuration: 1000,
  infinite: true,
  indicators: true,
  scale: 0.4,
  arrows: true,
  auto: true,
};

interface Props {
  pictures?: Picture[];
}

export default function SlideShow({ pictures }: Props) {
  return (
    <>
      <Grid className="slide-container">
        <Box sx={{ fontFamily: "sans-serif", textAlign: "center" }}>
          <Zoom {...zoomOutProperties}>
            {pictures?.map((picture, key) => (
              <Grid key={key}>
                <Grid>
                  <img
                    
                    placeholder="Halo"
                    style={{ height: "600px" }}
                    src={picture.img}
                  />
                </Grid>
                <Grid className="centered">{picture.name}</Grid>
              </Grid>
            ))}
          </Zoom>
        </Box>
      </Grid>
    </>
  );
}
