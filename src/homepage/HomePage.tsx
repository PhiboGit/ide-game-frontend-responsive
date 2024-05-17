import { Container, Typography } from "@mui/material";
import React, { useState } from "react";
import Header from "./Header";
import Home from "./home/Home";
import Footer from "./Footer";

export default function HomePage() {
  const [activeNav, setActiveNav] = useState<string>('Home');

  const handleNavButtonClick = (navName: string) => {
    setActiveNav(navName);
  };

  return (
    <Container maxWidth="lg" sx={{ minHeight: '100vh', display: 'grid', gridTemplateRows: 'auto 1fr auto'}}>
      <Header activeNav={activeNav} handleNavButtonClick={handleNavButtonClick}/>
      {activeNav === 'Home' && <Home />}
      {activeNav === 'News' && <Typography variant="h1">News</Typography>}
      {activeNav === 'Patch Notes' && <Typography variant="h1">Patch Notes</Typography>}
      {activeNav === 'Game Guide' && <Typography variant="h1">Game Guide</Typography>}
      <Footer />
    </Container>
  );
}