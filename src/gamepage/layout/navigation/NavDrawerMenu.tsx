import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import StartIcon from '@mui/icons-material/Start';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import SettingsIcon from '@mui/icons-material/Settings';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import Typography from '@mui/material/Typography';
import GatheringSection from '../../game/sections/gathering/GatheringSection';
import CharacterSection from '../../game/sections/character/CharacterSection';
import { LogoutButton } from '../../../homepage/home/AuthComponent';
import { styled } from '@mui/material';
import CraftingProfessionTabs from '../../game/sections/crafting/CraftingProfessionTabs';

interface StyledProps {
  miniOpen: boolean;
}

const ListItemButtonMini = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'miniOpen',
})<StyledProps>(({ miniOpen }) => ({
  minHeight: 48,
  justifyContent: miniOpen ? 'initial' : 'center',
  padding: miniOpen ? '' : '0 2.5px',
}));

const ListItemIconMini = styled(ListItemIcon, {
  shouldForwardProp: (prop) => prop !== 'miniOpen',
})<StyledProps>(({ miniOpen }) => ({
  minWidth: 0,
  marginRight: miniOpen ? '24px' : 'auto',
  justifyContent: 'center',
}));

const ListItemTextMini = styled(ListItemText, {
  shouldForwardProp: (prop) => prop !== 'miniOpen',
})<StyledProps>(({ miniOpen }) => ({
  display: miniOpen ? 'initial' : 'none',
}));

type SectionName = "Gathering" | "Crafting" | "Character";
interface Props {
  useSection: () => { mainSection: React.ReactNode, setMainSection: React.Dispatch<React.SetStateAction<React.ReactNode>> };
  miniOpen: boolean;
  handleDrawerToggle: () => void;
}

const sectionMap: Map<SectionName, React.ComponentType> = new Map([
  ["Gathering", GatheringSection],
  ["Crafting", CraftingProfessionTabs],
  ["Character", CharacterSection],
]);

export default function NavDrawerMenu({ useSection, miniOpen, handleDrawerToggle }: Props) {

  const { setMainSection } = useSection();
  const [sectionName, setSectionName] = useState<SectionName>("Gathering");

  useEffect(() => {
    const SectionComponent = sectionMap.get(sectionName);
    if (SectionComponent) {
      setMainSection(<SectionComponent />);
    }
  }, [sectionName]);

  function onItemClick(sectionName: SectionName) {
    setSectionName(sectionName);
  }

  return (
    <Box display='flex' flexDirection='column' sx={{ height: '100%'}}>
      <List >
        <ListItem key={'drawer-open'} disablePadding sx={{ display: { sm: 'block', md: 'none'} }}>
          <ListItemButtonMini miniOpen={miniOpen} 
            onClick={handleDrawerToggle}
          >
            <ListItemTextMini miniOpen={miniOpen} primary={'My Idle Game'} />
            <ListItemIconMini miniOpen={miniOpen}>
              <StartIcon  sx={{ transform: miniOpen ? 'rotate(180deg)' : 'rotate(0deg)'}}/>
            </ListItemIconMini>
          </ListItemButtonMini>
        </ListItem>
        <Divider />
        <ListItem key={'character'} disablePadding sx={{ display: { sm: 'block', lg: 'none'} }}>
          <ListItemButtonMini miniOpen={miniOpen} 
            selected={sectionName === 'Character'} 
            onClick={() => onItemClick('Character')}

          >
            <ListItemIconMini miniOpen={miniOpen}>
              <InboxIcon />
            </ListItemIconMini>
            <ListItemTextMini miniOpen={miniOpen} primary={'Character'} />
          </ListItemButtonMini>
        </ListItem>
        {['Gathering', 'Crafting'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButtonMini miniOpen={miniOpen} selected={sectionName === text} onClick={() => onItemClick(text as SectionName)}>
              <ListItemIconMini miniOpen={miniOpen}>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIconMini>
              <ListItemTextMini miniOpen={miniOpen} primary={text} />
            </ListItemButtonMini>
          </ListItem>
        ))}
      </List>      
      <Divider sx={{ mt: 'auto'}} />
      <List>

        {
        miniOpen ? <ListItem key='settings'
          disablePadding
          sx={{ 
            display: 'flex',
            justifyContent: 'space-between', 
            paddingRight: miniOpen ? '1rem': 0, 
            paddingLeft: miniOpen ? '.5rem': '2.5px' 
          }}
        >
          <IconButton >
            <SettingsIcon />
          </IconButton>
          {<Typography fontSize={'.7rem'} color={'text.secondary'}>v.0.0.1</Typography>}
          {<LogoutButton />}
        </ListItem>
        :  
        <ListItem key={'settings-mini'} disablePadding>
          <ListItemButtonMini miniOpen={miniOpen} >
            <ListItemIconMini miniOpen={miniOpen}>
              <SettingsIcon />
            </ListItemIconMini>
          </ListItemButtonMini>
        </ListItem>
        }
      </List>
      
    </Box>
  );
}