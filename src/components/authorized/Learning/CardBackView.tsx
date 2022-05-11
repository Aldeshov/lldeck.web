import {Box, Button, Card, CardContent, Fade, IconButton, Stack, Typography} from "@mui/material";
import {ArrowBackIosNewRounded, Edit, VolumeUpRounded} from "@mui/icons-material";
import React, {FunctionComponent, useEffect, useState} from "react";
import CardContentService from "../../../services/CardContentService";
import CardBack from "../../../models/api/CardBack";
import ResponseError from "../../../models/ResponseError";
import CardItem from "../../../models/api/CardItem";
import {LoadingButton} from "@mui/lab";
import {CardContentError, CardContentLoadingSkeleton} from "../../../tools/custom";
import {useNavigate} from "react-router";

const CardBackView: FunctionComponent<{ shown: boolean, card: CardItem, deckID: string, showFront: any, onAction: any }> =
    ({shown, card, deckID, showFront, onAction}) => {
        const navigate = useNavigate();
        const [back, setBack] = useState<CardBack>();
        const [audio, setAudio] = useState<HTMLAudioElement>()

        const [error, setError] = useState<string>();
        const [action, setAction] = useState<string>();
        const [loading, setLoading] = useState<boolean>(true);
        const [actionLoading, setActionLoading] = useState<boolean>(false);

        useEffect(() => {
            if (action && !actionLoading) {
                onAction(action);
                setAction(undefined);
                setActionLoading(true);
                let timer = window.setTimeout(() => setActionLoading(false), 3000);
                return () => {
                    setActionLoading(false);
                    window.clearTimeout(timer)
                }
            }
        }, [action])

        useEffect(() => {
            setLoading(true);
            setError(undefined);
            setAudio(undefined);
            setActionLoading(false);
            CardContentService(deckID, card.id, "back")
                .then((data: CardBack) => {
                    setBack(data);
                    if (data.audio) {
                        setAudio(new Audio(data.audio));
                    }
                })
                .catch((error: ResponseError) => {
                    setError(error.detail())
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

        const content = (
            back && <CardContent sx={{
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
                    <Button onClick={() => navigate(`/editor?deck=${deckID}&card=${card.id}`)}
                            size="medium" startIcon={<Edit/>} sx={{textTransform: 'none'}}>
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
                    <LoadingButton onClick={() => setAction('fail')} variant='contained' sx={{
                        backgroundColor: "#5E6CFF",
                        fontSize: 14,
                        borderRadius: 60,
                        padding: {xs: '6px 48px', md: '10px 64px'},
                        textTransform: 'none',
                    }} loading={actionLoading}>
                        Again
                    </LoadingButton>
                    <LoadingButton onClick={() => setAction('success')} variant='outlined' sx={{
                        fontSize: 14,
                        borderRadius: 60,
                        padding: {xs: '6px 48px', md: '10px 64px'},
                        textTransform: 'none',
                    }} loading={actionLoading}>
                        Good
                    </LoadingButton>
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
                        textAlign: !content ? 'center' : 'revert',
                        verticalAlign: !content ? 'middle' : 'revert',
                        lineHeight: !content ? '480px' : 'revert',
                        filter: 'drop-shadow(0px 10px 9px rgba(0, 0, 0, 0.04))',
                    }} elevation={0}>
                    {loading ? <CardContentLoadingSkeleton/> : error ?
                        <CardContentError error={error || "Something went wrong"}/> : content || "No content"}
                </Card>
            </Fade>
        )
    }

export default CardBackView
