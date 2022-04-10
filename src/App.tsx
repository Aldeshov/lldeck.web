import React from 'react';
import { Divider, Stack } from '@mui/material';
import { FirstSection, SecondSection, ThirdSection, FourthSection, FifthSection } from './components/MainPage';
import { DefaultNavbar } from './components/Navbar';
import { DefaultFooter } from './components/Footer';

import './App.css';
import { Route, Routes } from 'react-router';
import { NotFound } from './components/NotFoundPage';
import { SignIn, SignUp } from './components/LoginPage';

const App = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={
          <Stack spacing={2}>
            <DefaultNavbar />
            <Stack id="main" alignItems="center" justifyContent="space-around" spacing={8}>
              <FirstSection />
              <SecondSection />
              <ThirdSection />
              <FourthSection />
              <FifthSection />
              <Divider flexItem />
              <DefaultFooter />
            </Stack>
          </Stack>
        } />

        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />

        <Route path="/*" element={<NotFound />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
