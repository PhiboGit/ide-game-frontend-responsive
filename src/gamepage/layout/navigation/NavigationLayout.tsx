import React, { useRef, useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';

import { CSSObject, Divider, IconButton, Theme, alpha, useTheme } from '@mui/material';
import NavDrawerMenu from './NavDrawerMenu';
import CharacterSection from '../../game/sections/character/CharacterSection';

// left side Nav Drawer Menu
const drawerWidthOpen = 200;
const drawerWidthClosed = 40;
// right side Character Section
const rightSideWidth = 360

export default function NavigationLayout({appbarHeight}: {appbarHeight: number}) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const drawerWidth =  drawerWidthOpen
  const headerHeight= appbarHeight
  // set main section is set by the NavDrawerMenu
  const [mainSection, setMainSection] = useState<React.ReactNode>();
  const useSection = () => {
    return {
      mainSection: mainSection,
      setMainSection: setMainSection
    }
  }
  
  const handleDrawerClose = () => {
    setOpen(false);
  };
  
  const handleDrawerToggle = () => {
    setOpen(!open);
  };
  const drawer = (
    <NavDrawerMenu 
      useSection={useSection}
      miniOpen={true}
      handleDrawerToggle={handleDrawerToggle}
    />
  )


  return (
      /* set the height of the main section, can now overflow each individual section */
    <Box display="flex" sx={{ height: `calc(100vh - ${headerHeight}px)`}}>
      <Box
        component="nav"
        sx={{ width: { xs: drawerWidthClosed, sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="navigation-drawer"
      >
        {/* at small screen size xs, the miniDrawer is shown with
          the other drawer(temporary) overlayed when open

            at large screen size sm, the permanent drawer is shown
        */}
        <Box sx={{ display: {height: '100%', xs: 'block', sm: 'none' } }}>
          <NavDrawerMenu 
            useSection={useSection}
            miniOpen={false}
            handleDrawerToggle={handleDrawerToggle}
          />
        </Box>
        <Drawer
          variant="temporary"
          open={open}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            /* has a fixed position at the top left (this variant). set a marginTop to the height of the header 
               since it is an overlay, need to set width as it is not an element of the box
            */
            '& .MuiDrawer-paper': { boxSizing: 'border-box', mt: `${headerHeight}px`, width: drawerWidth, height: `calc(100vh - ${headerHeight}px)` },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: 'none', sm: 'block' },
            height: '100%',
            /* 
              set position to relative to be used in the root grid layout, to be under the header 
              border: none. the divider sets a border
            */
            '& .MuiDrawer-paper': { position: 'relative', boxSizing: 'border-box', border: 'none' },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Divider orientation='vertical'/>
      <Box 
        component="main"
        flex={1} // take all space that is not used by nav and side(Character section)
        sx={{ overflow: 'auto', p: 3,  }}
      >
            {mainSection}
      </Box>
      <Divider orientation='vertical'/>
      <Box 
        display= { { xs: 'none', lg: 'block' } }
        sx={{ overflow: 'auto', p: 3, width: rightSideWidth }}
      >
        <CharacterSection />
      </Box>
    </Box>
  );
}
