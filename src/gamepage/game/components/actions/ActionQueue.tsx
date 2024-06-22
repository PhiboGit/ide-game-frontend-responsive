import { FormatListNumbered } from "@mui/icons-material";
import ClickAwayPopper from "../common/ClickAwayPopper";
import { Box, IconButton, List, ListItem, ListItemText, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";
import useCharacterState from "../../stateManagement/CharacterData/useCharacterData";
import { getActionName } from "./actionUtils";
import { CancelActionMsg } from "../../gameTypes";
import websocketService from "../../../../service/websocketService";


export default function ActionQueue() {

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const openPopperItem = (event: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
    console.log('openPopper')
    setAnchorEl(event.currentTarget);
  };

  const closePopper = () => {
    console.log('closePopper')
    setAnchorEl(null);
  };

  return (
    <>
      <div onClick={openPopperItem}>
        <IconButton>
          <FormatListNumbered />
        </IconButton>
      </div>
      <ClickAwayPopper
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
      >
        <ActionQueueMenu closeMenu={closePopper}/>
      </ClickAwayPopper>
    </>
  )
}

function ActionQueueMenu({closeMenu}: {closeMenu: () => void}) {
  const queue = useCharacterState((char) => char.actionQueue)

  function cancelQueue(index: number) {
    const msg: CancelActionMsg = {
      type: "cancel_action",
      index: index
    }
    websocketService.send(msg)
    closeMenu()
  }

  return (
    <Box display={"flex"} flexDirection={"column"}>
      <Typography variant="body2">Queue: ({queue.length}/4)</Typography>
      <List dense >
      {queue.map((action, index) => (
          <ListItem
            
            key={index}
            secondaryAction={
              <IconButton onClick={() => cancelQueue(index)} edge="end" aria-label="delete">
                <DeleteIcon />
              </IconButton>
            }
          >
            <ListItemText
              sx={{ margin: 0}}
              primary={getActionName(action).profession}
              secondary={getActionName(action).action}
            />
          </ListItem>
      ))}
      </List>
    </Box>
  )
}