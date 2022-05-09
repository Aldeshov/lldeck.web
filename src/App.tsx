import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Route, Routes} from 'react-router';

import {MainPage} from './components/welcome/MainPage';
import {DefaultNavbar} from './components/global/Navbar';
import {NotFound} from './components/global/NotFoundPage';

import UserContext from './contexts/UserContext';
import {UserService} from './services';
import LocalUser from './models/LocalUser';

import './App.css';
import {Settings} from "./components/authorized/Settings";
import {Box, CircularProgress} from "@mui/material";
import {DeckBrowser} from "./components/authorized/DeckBrowser";
import MyDecks from "./components/authorized/MyDecks/MyDecks";

const App = () => {
    const globalDispatch = useDispatch();
    const defaultStore = (useSelector(store => store) as string);
    const [user, setUser] = useState<LocalUser>({} as LocalUser);
    const userState = useMemo(() => ({user, setUser}), [user]);
    const loadData = useCallback(() => {
        if (defaultStore) {
            UserService()
                .then(data => {
                    let avatar = data.avatar ? `${process.env.REACT_APP_API_URL}${data.avatar}` : '';
                    setUser({ready: true, name: data.name, authorized: true, avatar: avatar});
                })
                .catch(() => {
                    globalDispatch({type: 'DELETE'});
                    setUser({name: "", avatar: "", ready: true, authorized: false});
                })
        } else {
            setUser({name: "", avatar: "", ready: true, authorized: false});
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
                    {user.ready && <Route path="/" element={user.authorized ? <DeckBrowser/> : <MainPage/>}/>}
                    {user.ready && user.authorized && <Route path="/decks" element={<MyDecks/>}/>}
                    {user.ready && user.authorized && <Route path="/settings" element={<Settings/>}/>}

                    {
                        user.ready ? <Route path="/*" element={<NotFound/>}/> :
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
