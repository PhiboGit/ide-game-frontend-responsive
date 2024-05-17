import React, { useCallback, useEffect, useRef, useState } from "react";

import { AppBar, Box } from "@mui/material";
import NavToolbar from "./toolbar/NavToolbar";
import NavigationLayout from "./navigation/NavigationLayout";

/**
 * The layout of the game page. 
 * single fullscreen(100vh) page. no scrolling. overflow hidden.
 * only the section can scroll individually. 
 * 
 */
export default function GamepageLayout() {

  // responsive header height
  const refAppbar = React.useRef<HTMLElement>(null);
  const [height, setHeight] = React.useState(0);

  const onResize = React.useCallback(() => {
    if (refAppbar.current) {
      setHeight(refAppbar.current.clientHeight)
    }
  }, []);

  React.useEffect(() => {
    window.addEventListener("resize", onResize);
    onResize();
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <Box display={'grid'} sx={{ height: '100vh', gridAutoRows: 'auto 1fr', overflow: 'hidden'}} >
    <AppBar ref={refAppbar}
      position='relative' // needs to be set for the grid layout
    >
        <NavToolbar />
      </AppBar>
      <NavigationLayout appbarHeight={height}/>
    </Box>
  )
}