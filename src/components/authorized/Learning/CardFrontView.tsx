import {Box, Button, Card, CardContent, Fade, IconButton, Typography} from "@mui/material";
import {Edit, ImageNotSupportedRounded, VolumeUpRounded} from "@mui/icons-material";
import React, {FunctionComponent, useEffect, useState} from "react";
import CardFront from "../../../models/api/CardFront";
import CardContentService from "../../../services/CardContentService";
import ResponseError from "../../../models/ResponseError";
import CardItem from "../../../models/api/CardItem";
import {CardContentError, CardContentLoadingSkeleton} from "../../../tools/custom";


const CardFrontView: FunctionComponent<{ shown: boolean, card: CardItem, deckID: string, showBack: any }> =
    ({shown, card, deckID, showBack}) => {
        const [front, setFront] = useState<CardFront>()
        const [audio, setAudio] = useState<HTMLAudioElement>()
        const [error, setError] = useState<string>();
        const [loading, setLoading] = useState<boolean>(true);

        useEffect(() => {
            setLoading(true);
            setError(undefined)
            setAudio(undefined);
            CardContentService(deckID, card.id, "front")
                .then((data: CardFront) => {
                    if (data) setFront(data);
                    if (data.audio) setAudio(new Audio(data.audio));
                })
                .catch((error: ResponseError) => setError(error.detail()))
                .finally(() => setLoading(false))
        }, [card, deckID]);

        useEffect(() => {
            if (audio) {
                if (shown) audio.play().then(reason => reason);
                else audio.pause();
            }
            return () => {
                if (audio) {
                    audio.pause();
                    audio.remove();
                }
            }
        }, [audio, shown])

        const content = (
            front && <CardContent sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-around !important'
            }}>
                <Box width="95%" display="flex" justifyContent="flex-end" mt={1}>
                    <Button size="medium" startIcon={<Edit/>} sx={{textTransform: 'none'}}>
                        Edit
                    </Button>
                </Box>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Box display="flex" flexDirection="row" alignItems="center" mb={1}>
                        <Typography variant="h5" fontWeight={500}>
                            {front.word}
                        </Typography>
                        {
                            front.audio && (
                                <IconButton sx={{ml: 1}} aria-label="play audio" size="medium" onClick={() => {
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
                    <Typography variant="body1" color="gray">
                        {front.helper_text}
                    </Typography>
                </Box>
                {
                    front.photo ? (
                            <Box component="img"
                                 src={front.photo}
                                 alt={"Photo for word " + front.word}
                                 sx={{
                                     m: '20px 0',
                                     borderRadius: 4,
                                     boxShadow: '0px 0px 4px #8B8B8B',
                                     height: {xs: 200, sm: 256, md: 320},
                                     objectFit: 'cover',
                                     maxWidth: {xs: '90%', md: '80%'},
                                 }}>
                            </Box>
                        ) :
                        <Box sx={{
                            m: '20px 0',
                            width: "75%",
                            height: 256,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <ImageNotSupportedRounded transform="scale(5)"
                                                      sx={{color: 'rgba(213,213,213,0.8)'}}/>
                        </Box>
                }
                <Button variant='contained' sx={{
                    backgroundColor: "#5E6CFF",
                    fontSize: 14,
                    borderRadius: 60,
                    padding: '10px 40px',
                    textTransform: 'none',
                    mb: 2
                }} onClick={showBack}>
                    Definition
                </Button>
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

export default CardFrontView
