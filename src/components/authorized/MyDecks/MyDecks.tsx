import React, {useEffect, useState} from "react"
import DeckList from "../../../models/api/DeckList";
import {Box, Button, Container, Stack, Typography} from "@mui/material";
import {DeckItemSkeleton} from "../../../tools/custom";
import ResponseError from "../../../models/ResponseError";
import DeckListService from "../../../services/DeckListService";
import HorizontalDeckListView from "../../shared/HorizontalDeckListView";
import {useNavigate} from "react-router";
import DataState from "../../../models/DataState";


const MyDecks = () => {
    const navigate = useNavigate();
    const [favoriteDecks, setFavoriteDecks] = useState<DataState<DeckList>>({loading: true});
    const [downloadedDecks, setDownloadedDecks] = useState<DataState<DeckList>>({loading: true});
    const [createdDecks, setCreatedDecks] = useState<DataState<DeckList>>({loading: true});

    const DeckListPlaceHolder = (
        <Stack direction="row" flexWrap="wrap" spacing={0}
               sx={{m: 3, justifyContent: {xs: 'center', md: 'flex-start'}}}>
            {[1, 2, 3, 4].map((item: number) => (<DeckItemSkeleton key={item}/>))}
        </Stack>
    )

    useEffect(() => {
        DeckListService({favorite: 1})
            .then((data: DeckList) => setFavoriteDecks({...favoriteDecks, data: data, loading: false}))
            .catch((error: ResponseError) => setFavoriteDecks({...favoriteDecks, error: error.message, loading: false}))
            .finally(() => {
                DeckListService({template: 1})
                    .then((data: DeckList) => setDownloadedDecks({...downloadedDecks, data: data, loading: false}))
                    .catch((error: ResponseError) => setDownloadedDecks({
                        ...downloadedDecks,
                        error: error.message,
                        loading: false
                    }))
                    .finally(() => {
                        DeckListService({template: 0})
                            .then((data: DeckList) => setCreatedDecks({...createdDecks, data: data, loading: false}))
                            .catch((error: ResponseError) => setCreatedDecks({
                                ...createdDecks,
                                error: error.message,
                                loading: false
                            }))
                    })
            })
    }, []);

    return (
        <Stack direction="column" spacing={0}>
            <Container maxWidth={false} sx={{mt: 3}}>
                <Box display="flex" flexWrap="wrap" flexDirection="row" justifyContent="space-between"
                sx={{m: {xs: '0 20px', md: '0 40px'}}}>
                    <Box>
                        <Typography variant="h5" fontWeight={500}>
                            My Decks
                        </Typography>
                        <Typography variant="body1">
                            Please choose what you want to learn!
                        </Typography>
                    </Box>

                    <Button variant='contained' sx={{
                        m: {xs: '20px auto', sm: 'revert'},
                        backgroundColor: "#5E6CFF",
                        fontSize: {xs: 14, sm: 18},
                        borderRadius: 60,
                        padding: {xs: '8px 64px', sm: '0 40px'},
                        textTransform: 'none',
                    }} onClick={() => navigate('/editor?', {replace: true})}>
                        Create own card
                    </Button>
                </Box>
            </Container>

            <Container maxWidth={false} sx={{m: "20px 0 10px", backgroundColor: "#E9F4FE"}}>
                <Typography component="div" fontFamily="Manrope" fontSize={18}
                            fontWeight={500} margin="20px 40px 0">
                    Favourite
                </Typography>
                {
                    favoriteDecks.loading ? DeckListPlaceHolder :
                        <HorizontalDeckListView list={favoriteDecks.data} error={favoriteDecks.error}/>
                }
            </Container>

            <Container maxWidth={false} sx={{m: "20px 0 10px", backgroundColor: "#F5E9FF"}}>
                <Typography component="div" fontFamily="Manrope" fontSize={18}
                            fontWeight={500} margin="20px 40px 0">
                    Downloaded
                </Typography>
                {
                    downloadedDecks.loading ? DeckListPlaceHolder :
                        <HorizontalDeckListView list={downloadedDecks.data} error={downloadedDecks.error}/>
                }
            </Container>

            <Container maxWidth={false} sx={{m: "20px 0 10px", backgroundColor: "#FFF0F0"}}>
                <Typography component="div" fontFamily="Manrope" fontSize={18}
                            fontWeight={500} margin="20px 40px 0">
                    Created
                </Typography>
                {
                    createdDecks.loading ? DeckListPlaceHolder :
                        <HorizontalDeckListView list={createdDecks.data} error={createdDecks.error}/>
                }
            </Container>
        </Stack>
    )
}

export default MyDecks
