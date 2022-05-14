import React, {useEffect, useMemo, useState} from 'react';
import {Route, Routes} from 'react-router';

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
    const [localUser, setLocalUser] = useState<LocalUser>({ready: false, authorized: false});
    const userState = useMemo(() => ({localUser: localUser, setLocalUser: setLocalUser}), [localUser]);

    useEffect(() => {
        if (!localUser.ready) {
            UserService()
                .then((user: User) => {
                    ProfileService()
                        .then((profile: Profile) => {
                            setLocalUser({ready: true, authorized: true, user: user, profile: profile});
                        })
                        .catch(() => {
                            setLocalUser({ready: true, authorized: false});
                            TokenStore.delete();
                        })
                })
                .catch(() => {
                    setLocalUser({ready: true, authorized: false});
                    TokenStore.delete();
                })
        }
    }, [localUser]);

    return (
        <React.Fragment>
            <UserContext.Provider value={userState}>
                <DefaultNavbar/>
                <Routes>
                    {localUser.ready && <Route path="/" element={localUser.authorized ? <DeckBrowser/> : <MainPage/>}/>}
                    {localUser.ready && localUser.authorized && <Route path="/decks" element={<MyDecks/>}/>}
                    {localUser.ready && localUser.authorized && <Route path="/settings" element={<Settings/>}/>}
                    {localUser.ready && localUser.authorized && <Route path="/learning/:deckID" element={<Learning/>}/>}
                    {localUser.ready && localUser.authorized && <Route path="/editor" element={<Editor/>}/>}
                    {localUser.ready && localUser.authorized && <Route path="/search" element={<Search/>}/>}

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
