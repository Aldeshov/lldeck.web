import {Container, Stack, Typography} from "@mui/material";
import DeckTemplateList from "../../../models/api/DeckTemplateList";
import React, {useEffect, useState} from "react";
import PublicDeckTemplateListService from "../../../services/PublicDeckTemplateListService";
import ResponseError from "../../../models/ResponseError";
import {DeckItemSkeleton} from "../../../tools/custom";
import HorizontalDeckTemplateListView from "../../shared/HorizontalDeckTemplateListView";

interface DeckTemplateListState {
    list: DeckTemplateList;
    error: string;
    loading: boolean;
}


const DeckBrowser = () => {
    const DeckTemplateListPlaceHolder = (
        <Stack direction="row" flexWrap="wrap" spacing={0}
               sx={{m: 3, justifyContent: {xs: 'center', md: 'flex-start'}}}>
            {[1, 2, 3, 4, 5].map((item: number) => (<DeckItemSkeleton key={item}/>))}
        </Stack>
    )

    const [popularDecks, setPopularDecks] = useState<DeckTemplateListState>({
        list: {} as DeckTemplateList,
        error: "",
        loading: true
    });

    const [englishDecks, setEnglishDecks] = useState<DeckTemplateListState>({
        list: {} as DeckTemplateList,
        error: "",
        loading: true
    });

    const [frenchDecks, setFrenchDecks] = useState<DeckTemplateListState>({
        list: {} as DeckTemplateList,
        error: "",
        loading: true
    });

    const [koreanDecks, setKoreanDecks] = useState<DeckTemplateListState>({
        list: {} as DeckTemplateList,
        error: "",
        loading: true
    });

    useEffect(() => {
        PublicDeckTemplateListService({})
            .then((data: DeckTemplateList) => {
                setPopularDecks({
                    error: "",
                    list: data,
                    loading: false
                });
            })
            .catch((error: ResponseError) => {
                setPopularDecks({
                    loading: false,
                    list: {} as DeckTemplateList,
                    error: error.data || error.message
                });
            })
            .finally(() => {
                PublicDeckTemplateListService({tag: "english"})
                    .then((data: DeckTemplateList) => {
                        setEnglishDecks({
                            error: "",
                            list: data,
                            loading: false
                        });
                    })
                    .catch((error: ResponseError) => {
                        setEnglishDecks({
                            loading: false,
                            list: {} as DeckTemplateList,
                            error: error.data || error.message
                        });
                    })
                    .finally(() => {
                        PublicDeckTemplateListService({tag: "french"})
                            .then((data: DeckTemplateList) => {
                                setFrenchDecks({
                                    error: "",
                                    list: data,
                                    loading: false
                                });
                            })
                            .catch((error: ResponseError) => {
                                setFrenchDecks({
                                    loading: false,
                                    list: {} as DeckTemplateList,
                                    error: error.data || error.message
                                });
                            })
                            .finally(() => {
                                PublicDeckTemplateListService({tag: "korean"})
                                    .then((data: DeckTemplateList) => {
                                        setKoreanDecks({
                                            error: "",
                                            list: data,
                                            loading: false
                                        });
                                    })
                                    .catch((error: ResponseError) => {
                                        setKoreanDecks({
                                            loading: false,
                                            list: {} as DeckTemplateList,
                                            error: error.data || error.message
                                        });
                                    })
                            })
                    })
            })
    }, []);

    return (
        <Stack direction="column" spacing={0}>
            <Container maxWidth="xl" sx={{m: "40px auto 10px"}}>
                <Typography component="div" fontFamily="Manrope" fontSize={20}
                            fontWeight={500} margin="5px 40px 0">
                    Popular decks
                </Typography>
                {
                    popularDecks.loading ? DeckTemplateListPlaceHolder :
                        <HorizontalDeckTemplateListView list={popularDecks.list} error={popularDecks.error}/>
                }
            </Container>
            <Container maxWidth="xl" sx={{m: "40px auto 10px"}}>
                <Typography component="div" fontFamily="Manrope" fontSize={20}
                            fontWeight={500} margin="5px 40px 0">
                    English decks
                </Typography>
                {
                    englishDecks.loading ? DeckTemplateListPlaceHolder :
                        <HorizontalDeckTemplateListView list={englishDecks.list} error={englishDecks.error}/>
                }
            </Container>
            <Container maxWidth="xl" sx={{m: "40px auto 10px"}}>
                <Typography component="div" fontFamily="Manrope" fontSize={20}
                            fontWeight={500} margin="5px 40px 0">
                    French decks
                </Typography>
                {
                    frenchDecks.loading ? DeckTemplateListPlaceHolder :
                        <HorizontalDeckTemplateListView list={frenchDecks.list} error={frenchDecks.error}/>
                }
            </Container>
            <Container maxWidth="xl" sx={{m: "40px auto 10px"}}>
                <Typography component="div" fontFamily="Manrope" fontSize={20}
                            fontWeight={500} margin="5px 40px 0">
                    Korean decks
                </Typography>
                {
                    koreanDecks.loading ? DeckTemplateListPlaceHolder :
                        <HorizontalDeckTemplateListView list={koreanDecks.list} error={koreanDecks.error}/>
                }
            </Container>
        </Stack>
    )
}

export default DeckBrowser
