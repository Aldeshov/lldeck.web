import React from 'react';
import { Divider, Stack } from '@mui/material';
import { FirstSection, SecondSection, ThirdSection, FourthSection, FifthSection } from './components/MainPage';
import { DefaultNavbar } from './components/Navbar';
import { DefaultFooter } from './components/Footer';

import './App.css';

function App() {
  return (
    <Stack spacing={2}>
      <DefaultNavbar></DefaultNavbar>
      <Stack id="main" alignItems="center" justifyContent="space-around" spacing={8}>
        <FirstSection></FirstSection>
        <SecondSection></SecondSection>
        <ThirdSection></ThirdSection>
        <FourthSection></FourthSection>
        <FifthSection></FifthSection>
        <Divider flexItem />
        <DefaultFooter></DefaultFooter>
      </Stack>
    </Stack>
  );
}

export default App;
