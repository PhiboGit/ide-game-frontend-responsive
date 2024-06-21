import React, { useState } from 'react';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Popper from '@mui/material/Popper';
import Box from '@mui/material/Box';
import { Paper } from '@mui/material';

interface ClickAwayPopperProps {
  children: React.ReactNode,
  anchorEl: HTMLElement | null,
  setAnchorEl: React.Dispatch<React.SetStateAction<HTMLElement | null>>
}

// using a popper with a clickaway listener instead of a Mui Popover.
// this way you can still click elements outside of the popper.
// a popover would block interaction with the rest of the page
export default function ClickAwayPopper({ children, anchorEl, setAnchorEl }: ClickAwayPopperProps) {

  const open = Boolean(anchorEl);

  const closePopper = () => {
    console.log('ClickAwayPopper closePopper')
    setAnchorEl(null);
  };
  

  return (
    <Box>
      {open && <ClickAwayListener onClickAway={closePopper}>
        <Popper id="click-away-popper" open={open} anchorEl={anchorEl} placement="bottom">
          <Paper
            elevation={10}
            sx={{
              border: '1px solid',
            }}
          >
          {children}
          </Paper>
        </Popper>
      </ClickAwayListener>}
    </Box>
  );
};
