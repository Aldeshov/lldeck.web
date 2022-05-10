import {Alert, Box, Button, Card, CardContent, Fade, IconButton, Skeleton, Stack, Typography} from "@mui/material";
import {ArrowBackIosNewRounded, Edit, VolumeUpRounded} from "@mui/icons-material";
import React, {FunctionComponent, useEffect, useState} from "react";
import CardContentService from "../../../services/CardContentService";
import CardBack from "../../../models/api/CardBack";
import ResponseError from "../../../models/ResponseError";
import CardItem from "../../../models/api/CardItem";

const CardBackView: FunctionComponent<{ shown: boolean, card: CardItem, deckID: string, showFront: any }> =
    ({shown, card, deckID, showFront}) => {
        const [loading, setLoading] = useState<boolean>(true);
        const [error, setError] = useState<string>("");
        const [back, setBack] = useState<CardBack>({} as CardBack);
        const [audio, setAudio] = useState<HTMLAudioElement>()

        useEffect(() => {
            setLoading(true);
            CardContentService(deckID, card.id, "back")
                .then((data: CardBack) => {
                    setBack(data);
                    if (data.audio) {
                        setAudio(new Audio(data.audio));
                    }
                })
                .catch((error: ResponseError) => {
                    setError(error.data || error.message)
                })
                .finally(() => {
                    setLoading(false);
                })
        }, [card, deckID])

        useEffect(() => {
            if (audio) {
                if (shown) audio.play().then(reason => reason);
                else audio.pause();
            }
            return () => {
                if (audio) {
                    audio.pause()
                    audio.remove()
                }
            }
        }, [audio, shown])

        const loadingSkeleton = (
            <CardContent sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center !important'
            }}>
                <Skeleton width="50%" height={50} variant="text" animation="wave"/>
                <Skeleton width="80%" sx={{height: {xs: 128, sm: '200px', md: '256px'}}} variant="text"
                          animation="wave"/>
                <Skeleton width="75%" height={50} variant="text" animation="wave"/>
                <Skeleton width="75%" height={50} variant="text" animation="wave"/>
            </CardContent>
        )

        const errorContent = (
            <CardContent sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start !important'
            }}>
                <Alert severity="error" sx={{width: 300, maxWidth: '90%'}} elevation={1}>
                    {error}
                </Alert>
            </CardContent>
        )

        const content = (
            <CardContent sx={{
                minHeight: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-around !important'
            }}>
                <Box width="95%" display="flex" justifyContent="space-between" mt={1}>
                    <Button size="medium" startIcon={<ArrowBackIosNewRounded/>} sx={{textTransform: 'none'}}
                            onClick={showFront}>
                        Back
                    </Button>
                    <Button size="medium" startIcon={<Edit/>} sx={{textTransform: 'none'}}>
                        Edit
                    </Button>
                </Box>
                <Box display="flex" flexDirection="row" alignItems="center">
                    <Typography variant="h5" fontWeight={500} color="primary">
                        {card.name}
                    </Typography>
                    {
                        back.audio && (
                            <IconButton sx={{ml: 1}} aria-label="play audio" size="medium" color="primary" onClick={() => {
                                if (audio) {
                                    if (!audio.ended && !audio.paused) audio.pause()
                                    else audio.play().then(reason => reason);
                                }
                            }}>
                                <VolumeUpRounded/>
                            </IconButton>
                        )
                    }
                </Box>
                <Typography width="90%" variant="h6" component="p" fontWeight="500" mt={2} mb={1}
                            color="primary" fontSize="24" textAlign="start">
                    Definition:
                </Typography>
                <Typography width="90%" variant="body1" maxHeight={96} overflow='auto'>
                    {back.definition}
                </Typography>

                <Typography width="90%" variant="h6" component="p" fontWeight="500" mt={2} mb={1}
                            color="primary" fontSize="24" textAlign="start">
                    Examples:
                </Typography>
                <Typography width="90%" variant="body1" component="div" height={128} overflow='auto'>
                    {
                        back.examples && back.examples.length ? (
                            <ol>
                                {back.examples.map((item, index) => (
                                    <li key={index}>{item}</li>
                                ))}
                            </ol>
                        ) : (
                            <span>&nbsp;&nbsp;─</span>
                        )
                    }
                </Typography>
                <Box width="100%" height={64}></Box>
                <Stack direction="row" spacing={2}>
                    <Button variant='contained' sx={{
                        backgroundColor: "#5E6CFF",
                        fontSize: 14,
                        borderRadius: 60,
                        padding: {xs: '6px 48px', md: '10px 64px'},
                        textTransform: 'none',
                    }}>
                        Again
                    </Button>
                    <Button variant='outlined' sx={{
                        fontSize: 14,
                        borderRadius: 60,
                        padding: {xs: '6px 48px', md: '10px 64px'},
                        textTransform: 'none',
                    }}>
                        Good
                    </Button>
                </Stack>
            </CardContent>
        )

        return (
            <Fade in={shown} mountOnEnter unmountOnExit>
                <Card
                    sx={{
                        width: '100%',
                        minHeight: '100%',
                        borderRadius: 4,
                        position: 'absolute',
                        filter: 'drop-shadow(0px 10px 9px rgba(0, 0, 0, 0.04))',
                    }} elevation={0}>
                    {loading ? loadingSkeleton : error ? errorContent : content}
                </Card>
            </Fade>
        )
    }

export default CardBackView
