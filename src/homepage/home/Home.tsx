import { Box, Button, Typography, styled } from "@mui/material";
import React from "react";
import Showcase from "./Showcase";
import { Image } from "@mui/icons-material";
import AuthComponent from "./AuthComponent";
import AuthContextProvider from "../../AuthContextProvider";

const StyledImg = styled('img')(({ theme }) => ({
  width: '100%',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: '5px',
  padding: '2px',
}));

export default function Home() {
  return (
    <Box display={'flex'} flexDirection={'column'} gap="6rem" mb="6rem" mt="2rem">
      <Showcase>
        <div>
          <Typography variant="h1" color={'primary'} gutterBottom>My Idle Game</Typography>
          <Typography variant="h3" gutterBottom>Multiplayer Idle RPG</Typography>
          <Typography variant="body1" gutterBottom>
            Embark on a journey through the My Idle Game universe, a unique multiplayer idle game. Whether you enjoy resource gathering, item crafting, or engaging in epic battles against alien monsters, we have something to offer for everyone. Immerse yourself in our thriving community, where you can trade in the player-driven marketplace, form a guild with friends, chat with fellow players, or climb to the top of the leaderboards!
          </Typography>
        </div>
        <AuthComponent />
      </Showcase>
      <Showcase>
        <StyledImg src="https://mui.com/static/images/cards/contemplative-reptile.jpg" alt="Contemplative Reptile"/>
        <div>
          <Typography variant="h4" >
          Gather and Craft
          </Typography>
          <Typography variant="body1" gutterBottom>
          Milking, Foraging, Woodcutting, Cheesesmithing, Crafting, Tailoring, Cooking, Brewing, Enhancing
          </Typography>
        </div>
      </Showcase>
      <Showcase alternate>
        <StyledImg style={{width: '100%'}} src="https://mui.com/static/images/cards/contemplative-reptile.jpg" alt="Contemplative Reptile"/>
        <div>
          <Typography variant="h4" >
          Combat
          </Typography>
          <Typography variant="body1" gutterBottom>
          Multiple styles of combat with highly customizable consumable and ability auto-usage
          </Typography>
        </div>
      </Showcase>
      <Showcase>
        <StyledImg style={{width: '100%'}} src="https://mui.com/static/images/cards/contemplative-reptile.jpg" alt="Contemplative Reptile"/>
        <div>
          <Typography variant="h4" >
          Marketplace
          </Typography>
          <Typography variant="body1" gutterBottom>
          Buy and sell resources, consumables, and equipment
          </Typography>
        </div>
      </Showcase>
      <Showcase alternate>
        <StyledImg style={{width: '100%'}} src="https://mui.com/static/images/cards/contemplative-reptile.jpg" alt="Contemplative Reptile"/>
        <div>
          <Typography variant="h4" >
          Community
          </Typography>
          <Typography variant="body1" gutterBottom>
          Play and chat with friends. Compete for a spot on the leaderboard!
          </Typography>
        </div>
      </Showcase>
    </Box>
  );
}