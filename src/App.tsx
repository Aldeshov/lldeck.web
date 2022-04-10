import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router';
import { Divider, Stack } from '@mui/material';

import { FirstSection, SecondSection, ThirdSection, FourthSection, FifthSection } from './components/MainPage';
import { SignIn, SignUp } from './components/LoginPage';
import { DefaultNavbar } from './components/Navbar';
import { DefaultFooter } from './components/Footer';
import { NotFound } from './components/NotFoundPage';

import UserContext from './contexts/UserContext';
import { UserService } from './services';
import User from './models/User';

import './App.css';

const App = () => {
  const globalDispatch = useDispatch();
  const defaultStore = (useSelector(store => store) as string);
  const [user, setUser] = useState<User>({ valid: false, name: "", avatar: "" });
  const userState = useMemo(() => ({ user, setUser }), [user]);

  globalDispatch({ type: 'GET' });

  useEffect(() => {
    if (defaultStore) {
      UserService(defaultStore)
        .then(data => {
          setUser({
            valid: true,
            name: data.first_name + " " + data.last_name,
            avatar: ""
          });
        })
        .catch((error: Error) => {
          setUser({
            valid: false,
            name: "",
            avatar: ""
          });
          console.error(error);
        })
    }
  }, [defaultStore]);

  return (
    <React.Fragment>
      <UserContext.Provider value={userState}>
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
      </UserContext.Provider>
    </React.Fragment>
  );
}

export default App;
