import { Icon, styled } from '@mui/material';
import Paper from '@mui/material/Paper';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import React, { CSSProperties, DetailedHTMLProps, HTMLAttributes } from 'react';
import HtmlTooltip from '../common/HtmlTooltip';

interface BaseTilePaperProps {
  size: number, 
  rarityBorderColor?: Rarity,
  selected?: boolean
}

const BaseTilePaper = styled (Paper)<BaseTilePaperProps>(({ theme, size, rarityBorderColor='none', selected = false}) => ({
  width:  `${size}rem`,
  height: `${size}rem`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  outline: rarityBorderColor !== 'none' ? `4px solid ${theme.palette[`${rarityBorderColor}Rarity`].main}` : 'none',
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
  TileIcon?: React.ComponentType<React.ComponentProps<typeof Icon>>,
  onClick?: (event ?: React.MouseEvent<HTMLElement>) => void,
  tooltipComponent?: JSX.Element,
  rarityBorderColor?: Rarity,
  count?: number,
  enchantingLevel?: number,
  selected?: boolean
}
export default function BaseTile(
  { size, TileIcon, onClick, tooltipComponent, rarityBorderColor, selected = false, count, enchantingLevel } : BaseTileProps
) {
  
  const topLeftTextStyle : CSSProperties= {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: '2px 4px',
    borderRadius: '4px',
    fontSize: '12px',
  };

  const bottomRightTextStyle : CSSProperties = {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: '2px 4px',
    borderRadius: '4px',
    fontSize: '12px',
  };

  const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent> | undefined) => {
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
        selected={selected}
        rarityBorderColor={rarityBorderColor}
      >
        {TileIcon ? 
          <TileIcon sx={{ width: '100%', height: '100%' }} />
          : <QuestionMarkIcon sx={{ width: '100%', height: '100%' }} />
        }
        {count && <div style={bottomRightTextStyle}>{count}</div>}
        {enchantingLevel && <div style={topLeftTextStyle}>{enchantingLevel}</div>}
      </BaseTilePaper>
    </HtmlTooltip>
  );
};
