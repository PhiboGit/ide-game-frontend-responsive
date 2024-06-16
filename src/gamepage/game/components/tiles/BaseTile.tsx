import { Icon, Typography, styled } from '@mui/material';
import Paper from '@mui/material/Paper';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import React, { CSSProperties, DetailedHTMLProps, HTMLAttributes } from 'react';
import HtmlTooltip from '../common/HtmlTooltip';
import { RarityType } from '../../gameTypes';

interface BaseTilePaperProps {
  size: number, 
  rarityBorderColor?: RarityType,
  selected?: boolean
}

const BaseTilePaper = styled (Paper, { 
  shouldForwardProp: (prop) => prop !== 'size' && prop !== 'rarityBorderColor' && prop !== 'selected' 
})<BaseTilePaperProps>(({ theme, size, rarityBorderColor='none', selected = false}) => ({
  width:  `${size}rem`,
  height: `${size}rem`,
  position: 'relative', // to let the text be postion absolute
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  outline: rarityBorderColor !== 'none' ? `2px solid ${theme.palette[`${rarityBorderColor}Rarity`].main}` : 'none',
  outlineOffset: '-2px', // use an outline to set a border inside the box
  backgroundColor: selected ? theme.palette.primary.dark : theme.palette.background.paper,
  '&:hover': {
    cursor: 'pointer',
    zIndex: 2,
    backgroundColor: 'rgba(169, 169, 169, 0.4)', // Light gray with 0.3 opacity
    opacity: 1, // Show overlay on hover
    transition: 'opacity 0.3s ease', // Adjust the transition property
  }
}));


interface BaseTileProps {
  size: number,
  elevation?: number,
  TileIcon?: React.ComponentType<React.ComponentProps<typeof Icon>>,
  onClick?: (event : React.MouseEvent<HTMLInputElement>) => void,
  tooltipComponent?: JSX.Element,
  rarityBorderColor?: RarityType,
  selected?: boolean,
  iconSizePercent?: number
  children?: React.ReactNode
}
export default function BaseTile(
  { size, elevation = 1, TileIcon, onClick, tooltipComponent, rarityBorderColor, selected = false, iconSizePercent = 100, children } : BaseTileProps
) {

  const handleClick = (event: React.MouseEvent<HTMLInputElement>) => {
    console.log(`Clicked Icon!`);
    if (onClick) {
      onClick(event);
    }
  };

  return (
    <HtmlTooltip
      placement="top"
      title={ tooltipComponent }
      >
      <BaseTilePaper
        onClick={handleClick}
        size={size}
        elevation={elevation}
        selected={selected}
        rarityBorderColor={rarityBorderColor}
      >
        {TileIcon ? 
          <TileIcon sx={{ width: `${iconSizePercent}%`, height: `${iconSizePercent}%` }} />
          : <QuestionMarkIcon sx={{ width: `${iconSizePercent}%`, height: `${iconSizePercent}%` }} />
        }
        
        {children}
        
      </BaseTilePaper>
    </HtmlTooltip>
  );
};
