import React, {useContext, useEffect, useState} from "react"
import {useParams} from "react-router";
import CardList from "../../../models/api/CardList";
import ResponseError from "../../../models/ResponseError";
import CardLearnService from "../../../services/CardLearnService";
import CardItem from "../../../models/api/CardItem";
import {Alert, Box, Button, CircularProgress, Typography} from "@mui/material";
import {ArrowDropDownRounded} from "@mui/icons-material";
import CardView from "./CardView";
import {shuffle} from "../../../tools/extra";
import UserContext from "../../../contexts/UserContext";

interface CardListState {
    list: CardList;
    error: string;
    loading: boolean;
}

const Learning = () => {
    const {deckID} = useParams();
    const {localUser} = useContext(UserContext);
    const [queue, setQueue] = useState<CardItem[]>([])
    const [card, setCard] = useState<CardItem>({} as CardItem);
    const [newCards, setNewCards] = useState<CardListState>({
        list: {} as CardList,
        error: "",
        loading: true
    });

    const [learningCards, setLearningCards] = useState<CardListState>({
        list: {} as CardList,
        error: "",
        loading: true
    });

    const [toReviewCards, setToReviewCards] = useState<CardListState>({
        list: {} as CardList,
        error: "",
        loading: true
    });

    const loadData = () => {
        if (deckID) {
            CardLearnService(deckID, "new")
                .then((data: CardList) => {
                    setNewCards({
                        error: "",
                        list: data,
                        loading: false
                    });
                })
                .catch((error: ResponseError) => {
                    setNewCards({
                        loading: false,
                        list: {} as CardList,
                        error: error.data || error.message
                    });
                })
            CardLearnService(deckID, "learning")
                .then((data: CardList) => {
                    setLearningCards({
                        error: "",
                        list: data,
                        loading: false
                    });
                })
                .catch((error: ResponseError) => {
                    setLearningCards({
                        loading: false,
                        list: {} as CardList,
                        error: error.data || error.message
                    });
                })
            CardLearnService(deckID, "to-review")
                .then((data: CardList) => {
                    setToReviewCards({
                        error: "",
                        list: data,
                        loading: false
                    });
                })
                .catch((error: ResponseError) => {
                    setToReviewCards({
                        loading: false,
                        list: {} as CardList,
                        error: error.data || error.message
                    });
                })
        }
    }

    const isReady = !newCards.loading && !learningCards.loading && !toReviewCards.loading;
    const isError = !!(newCards.error || learningCards.error || toReviewCards.error);
    const getErrors = [newCards.error, learningCards.error, toReviewCards.error];

    useEffect(loadData, [deckID])

    useEffect(() => {
        if (queue) {
            setCard(queue[0]);
        }
    }, [queue])

    useEffect(() => {
        if (isReady && !isError) {
            setQueue(
                shuffle(learningCards.list.results)
                    .concat(shuffle(newCards.list.results.concat(toReviewCards.list.results)))
            )
        }
    }, [newCards, learningCards, toReviewCards, isReady, isError])

    return (
        <Box width="100%" height="100%" display="flex" flexDirection="column" alignItems="center"
             justifyContent="center" paddingTop={2}>
            <Box display="flex" alignItems="center">
                <Typography textAlign="center" color="primary" variant="h6" fontWeight="500">
                    New cards/day
                </Typography>
                <Button size="large" endIcon={<ArrowDropDownRounded/>}
                        sx={{fontSize: 18, m: 2, textTransform: 'none', borderRadius: 16}}>
                    {localUser.profile?.aim}
                </Button>
            </Box>
            {
                !isReady ? <CircularProgress sx={{mt: 5}}/> :
                    isError ? <Alert sx={{mt: 2, width: 256}} severity="error" elevation={1}>
                            Unable to load cards:
                            <ul>
                                {
                                    getErrors.map((item, index) => (
                                        <li key={index}>{item || "<empty>"}</li>
                                    ))
                                }
                            </ul>
                        </Alert> :
                        card && <CardView card={card} deckID={deckID || ''}/>
            }
        </Box>
    )
}

export default Learning
