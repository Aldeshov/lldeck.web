import React, {useEffect, useMemo, useState} from 'react';
import {Route, Routes} from 'react-router';
import ReactGA from 'react-ga';

import {MainPage} from './components/welcome/MainPage';
import {DefaultNavbar} from './components/global/Navbar';
import {NotFound} from './components/global/NotFoundPage';

import UserContext from './contexts/UserContext';
import LocalUser from './models/LocalUser';

import './App.css';
import {Settings} from "./components/authorized/Settings";
import {Box, CircularProgress} from "@mui/material";
import {DeckBrowser} from "./components/authorized/DeckBrowser";
import MyDecks from "./components/authorized/MyDecks/MyDecks";
import {Learning} from "./components/authorized/Learning";
import User from "./models/api/User";
import ProfileService from "./services/ProfileService";
import Profile from "./models/api/Profile";
import {Editor} from "./components/authorized/Editor";
import UserService from "./services/UserService";
import {Search} from "./components/authorized/Search";
import TokenStore from "./stores/TokenStore";

const App = () => {
    const TRACKING_ID = process.env.REACT_APP_MEASUREMENT_ID || '';
    const [localUser, setLocalUser] = useState<LocalUser>({ready: false});
    const userState = useMemo(() => ({localUser: localUser, setLocalUser: setLocalUser}), [localUser]);

    ReactGA.initialize(TRACKING_ID);
    ReactGA.pageview(window.location.pathname);

    const clear = () => {
        setLocalUser({ready: true});
        TokenStore.delete();
    }

    useEffect(() => {
        if (!localUser.ready) {
            UserService()
                .then((user: User) => {
                    ProfileService()
                        .then((profile: Profile) => setLocalUser({ready: true, user, profile}))
                        .catch(() => clear())
                })
                .catch(() => clear())
        }
    }, [localUser]);

    return (
        <React.Fragment>
            <UserContext.Provider value={userState}>
                <DefaultNavbar/>
                <Routes>
                    {localUser.ready && <Route path="/" element={localUser.user ? <DeckBrowser/> : <MainPage/>}/>}
                    {localUser.ready && localUser.user && <Route path="/decks" element={<MyDecks/>}/>}
                    {localUser.ready && localUser.user && <Route path="/settings" element={<Settings/>}/>}
                    {localUser.ready && localUser.user && <Route path="/learning/:deckID" element={<Learning/>}/>}
                    {localUser.ready && localUser.user && <Route path="/editor" element={<Editor/>}/>}
                    {localUser.ready && localUser.user && <Route path="/search" element={<Search/>}/>}

                    {
                        localUser.ready ? <Route path="/*" element={<NotFound/>}/> :
                            <Route path="/*" element={
                                <Box sx={{
                                    height: '80vh',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <CircularProgress/>
                                </Box>
                            }/>
                    }
                </Routes>
            </UserContext.Provider>
        </React.Fragment>
    );
}

export default App;
