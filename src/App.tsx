import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
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
import ResponseError from "./models/ResponseError";
import {Editor} from "./components/authorized/Editor";
import UserService from "./services/UserService";
import {Search} from "./components/authorized/Search";

const App = () => {
    const globalDispatch = useDispatch();
    const defaultStore = (useSelector(store => store) as string);
    const [localUser, setLocalUser] = useState<LocalUser>({ready: false, authorized: false});
    const userState = useMemo(() => ({localUser: localUser, setLocalUser: setLocalUser}), [localUser]);
    const loadData = useCallback(() => {
        if (defaultStore) {
            UserService()
                .then((user: User) => {
                    ProfileService()
                        .then((profile: Profile) => {
                            setLocalUser({ready: true, authorized: true, user: user, profile: profile});
                        })
                        .catch((error: ResponseError) => {
                            setLocalUser({ready: true, authorized: false});
                            globalDispatch({type: 'DELETE'});
                            console.log(error)
                        })
                })
                .catch((error: ResponseError) => {
                    setLocalUser({ready: true, authorized: false});
                    globalDispatch({type: 'DELETE'});
                    console.log(error)
                })
        } else {
            setLocalUser({ready: true, authorized: false});
        }
    }, [])

    globalDispatch({type: 'GET'});
    useEffect(() => {
        loadData()
    }, [loadData]);

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
