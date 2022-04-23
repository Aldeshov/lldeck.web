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
import User from './models/User';

import './App.css';

const App = () => {
    const globalDispatch = useDispatch();
    const defaultStore = (useSelector(store => store) as string);
    const [user, setUser] = useState<User>({
        valid: true,
        firstName: "Azat",
        lastName: "",
        avatar: "https://i.pinimg.com/originals/b9/30/a1/b930a1acad60630cefb07d8c1df819c4.jpg"
    });
    const userState = useMemo(() => ({user, setUser}), [user]);
    const [signInUpWindow, setSignInUpWindow] = useState<number>(0);

    globalDispatch({type: 'GET'});

    useEffect(() => {
        if (defaultStore) {
            UserService()
                .then(data => {
                    setUser({
                        valid: true,
                        firstName: data.first_name,
                        lastName: data.last_name,
                        avatar: ""
                    });
                })
                .catch(() => {
                    globalDispatch({type: 'DELETE'});
                    setUser({
                        valid: false,
                        firstName: "",
                        lastName: "",
                        avatar: ""
                    });
                })
        }
    }, [defaultStore]);

    return (
        <React.Fragment>
            <UserContext.Provider value={userState}>
                <Routes>
                    <Route path="/" element={
                        <React.Fragment>
                            {
                                !user.valid && (
                                    <Box>
                                        <SignIn show={signInUpWindow === 1} setShow={setSignInUpWindow}/>
                                        <SignUp show={signInUpWindow === 2} setShow={setSignInUpWindow}/>
                                    </Box>
                                )
                            }
                            <DefaultNavbar setShow={setSignInUpWindow}/>
                            <Stack id="main" alignItems="center" justifyContent="space-around" spacing={8}>
                                <FirstSection/>
                                <SecondSection/>
                                <ThirdSection/>
                                <FourthSection/>
                                <FifthSection/>
                                <Divider flexItem/>
                                <DefaultFooter/>
                            </Stack>
                        </React.Fragment>
                    }/>
                    <Route path="/*" element={<NotFound/>}/>
                </Routes>
            </UserContext.Provider>
        </React.Fragment>
    );
}

export default App;