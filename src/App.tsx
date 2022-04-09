import React from 'react';
import { Divider, Stack } from '@mui/material';
import { FirstSection, SecondSection, ThirdSection, FourthSection, FifthSection } from './components/MainPage';
import { DefaultNavbar } from './components/Navbar';
import { DefaultFooter } from './components/Footer';

import './App.css';
import SignIn from './components/LoginPage/SignIn/SignIn';
import { Route, Routes } from 'react-router';
import { NotFound } from './components/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={
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
        </Stack>} />

      <Route path="/login" element={<SignIn></SignIn>} />

      <Route path="/*" element={<NotFound></NotFound>} />
    </Routes>
  );
}

export default App;
