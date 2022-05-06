import React, {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Route, Routes} from 'react-router';
import {Box, Divider, Stack} from '@mui/material';

import {FifthSection, FirstSection, FourthSection, SecondSection, ThirdSection} from './components/MainPage';
import {SignIn, SignUp} from './components/LoginModal';
import {DefaultNavbar} from './components/Navbar';
import {DefaultFooter} from './components/Footer';
import {NotFound} from './components/NotFoundPage';

import UserContext from './contexts/UserContext';
import {UserService} from './services';
import LocalUser from './models/LocalUser';

import './App.css';
import {Settings} from "./components/Settings";

const App = () => {
    const globalDispatch = useDispatch();
    const defaultStore = (useSelector(store => store) as string);
    const [user, setUser] = useState<LocalUser>({} as LocalUser);
    const userState = useMemo(() => ({user, setUser}), [user]);
    const [signInUpWindow, setSignInUpWindow] = useState<number>(0);
    globalDispatch({type: 'GET'});

    useEffect(() => {
        if (defaultStore) {
            UserService()
                .then(data => {
                    setUser({
                        name: data.name,
                        authorized: true,
                        avatar: data.avatar,
                    });
                })
                .catch(() => {
                    globalDispatch({type: 'DELETE'});
                    setUser({
                        name: "",
                        avatar: "",
                        authorized: false,
                    });
                })
        }
    }, [defaultStore, globalDispatch]);

    return (
        <React.Fragment>
            <UserContext.Provider value={userState}>
                {
                    !user.authorized && (
                        <Box>
                            <SignIn show={signInUpWindow === 1} setShow={setSignInUpWindow}/>
                            <SignUp show={signInUpWindow === 2} setShow={setSignInUpWindow}/>
                        </Box> /* Sign in and sign up popup widgets*/
                    )
                }
                <DefaultNavbar setShow={setSignInUpWindow}/>
                <Routes>
                    <Route path="/" element={
                        <Stack id="main" alignItems="center" justifyContent="space-around" spacing={8}
                               sx={{backgroundColor: 'white'}}>
                            <FirstSection/>
                            <SecondSection/>
                            <ThirdSection/>
                            <FourthSection/>
                            <FifthSection/>
                            <Divider flexItem/>
                            <DefaultFooter/>
                        </Stack> /* Collection of sections*/
                    }/>
                    <Route path="/user/settings" element={<Settings/>}/>
                    <Route path="/*" element={<NotFound/>}/>
                </Routes>
            </UserContext.Provider>
        </React.Fragment>
    );
}

export default App;
