import React, {useEffect, useState} from "react"
import DeckList from "../../../models/api/DeckList";
import {Box, Button, Container, Stack, Typography} from "@mui/material";
import {DeckItemSkeleton} from "../../../tools/custom";
import ResponseError from "../../../models/ResponseError";
import DeckListService from "../../../services/DeckListService";
import HorizontalDeckListView from "../../shared/HorizontalDeckListView";

interface DeckListState {
    list: DeckList;
    error: string;
    loading: boolean;
}

const MyDecks = () => {
    const DeckListPlaceHolder = (
        <Stack direction="row" flexWrap="wrap" spacing={0}
               sx={{m: 3, justifyContent: {xs: 'center', md: 'flex-start'}}}>
            {[1, 2, 3, 4].map((item: number) => (<DeckItemSkeleton key={item}/>))}
        </Stack>
    )

    const [favoriteDecks, setFavoriteDecks] = useState<DeckListState>({
        list: {} as DeckList,
        error: "",
        loading: true
    });

    const [downloadedDecks, setDownloadedDecks] = useState<DeckListState>({
        list: {} as DeckList,
        error: "",
        loading: true
    });

    const [createdDecks, setCreatedDecks] = useState<DeckListState>({
        list: {} as DeckList,
        error: "",
        loading: true
    });

    useEffect(() => {
        DeckListService({favorite: 1})
            .then((data: DeckList) => {
                setFavoriteDecks({
                    error: "",
                    list: data,
                    loading: false
                });
            })
            .catch((error: ResponseError) => {
                setFavoriteDecks({
                    loading: false,
                    list: {} as DeckList,
                    error: error.data || error.message
                });
            })
            .finally(() => {
                DeckListService({template: 1})
                    .then((data: DeckList) => {
                        setDownloadedDecks({
                            error: "",
                            list: data,
                            loading: false
                        });
                    })
                    .catch((error: ResponseError) => {
                        setDownloadedDecks({
                            loading: false,
                            list: {} as DeckList,
                            error: error.data || error.message
                        });
                    })
                    .finally(() => {
                        DeckListService({template: 0})
                            .then((data: DeckList) => {
                                setCreatedDecks({
                                    error: "",
                                    list: data,
                                    loading: false
                                });
                            })
                            .catch((error: ResponseError) => {
                                setCreatedDecks({
                                    loading: false,
                                    list: {} as DeckList,
                                    error: error.data || error.message
                                });
                            })
                    })
            })
    }, []);

    return (
        <Stack direction="column" spacing={0}>
            <Container maxWidth="lg" sx={{mt: 3}}>
                <Box display="flex" flexWrap="wrap" flexDirection="row" justifyContent="space-between">
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
                        fontSize: 18,
                        borderRadius: 60,
                        padding: {xs: '8px 64px', sm: '0 40px'},
                        textTransform: 'none',
                    }}>
                        Create own deck
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
                        <HorizontalDeckListView
                            items={favoriteDecks.list ? favoriteDecks.list.results : []}/>
                }
            </Container>
            <Container maxWidth={false} sx={{m: "20px 0 10px", backgroundColor: "#F5E9FF"}}>
                <Typography component="div" fontFamily="Manrope" fontSize={18}
                            fontWeight={500} margin="20px 40px 0">
                    Downloaded
                </Typography>
                {
                    downloadedDecks.loading ? DeckListPlaceHolder :
                        <HorizontalDeckListView
                            items={downloadedDecks.list ? downloadedDecks.list.results : []}/>
                }
            </Container>
            <Container maxWidth={false} sx={{m: "20px 0 10px", backgroundColor: "#FFF0F0"}}>
                <Typography component="div" fontFamily="Manrope" fontSize={18}
                            fontWeight={500} margin="20px 40px 0">
                    Created
                </Typography>
                {
                    createdDecks.loading ? DeckListPlaceHolder :
                        <HorizontalDeckListView
                            items={createdDecks.list ? createdDecks.list.results : []}/>
                }
            </Container>
        </Stack>
    )
}

export default MyDecks
