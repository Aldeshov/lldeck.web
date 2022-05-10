import {Alert, Box, Button, Card, CardContent, Fade, IconButton, Skeleton, Typography} from "@mui/material";
import {Edit, ImageNotSupportedRounded, VolumeUpRounded} from "@mui/icons-material";
import React, {FunctionComponent, useEffect, useState} from "react";
import CardFront from "../../../models/api/CardFront";
import CardContentService from "../../../services/CardContentService";
import ResponseError from "../../../models/ResponseError";
import CardItem from "../../../models/api/CardItem";


const CardFrontView: FunctionComponent<{ shown: boolean, card: CardItem, deckID: string, showBack: any }> =
    ({shown, card, deckID, showBack}) => {
        const [loading, setLoading] = useState<boolean>(true);
        const [error, setError] = useState<string>("");
        const [front, setFront] = useState<CardFront>({} as CardFront)
        const [audio, setAudio] = useState<HTMLAudioElement>()

        useEffect(() => {
            setLoading(true);
            CardContentService(deckID, card.id, "front")
                .then((data: CardFront) => {
                    setFront(data);
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
        }, [card, deckID]);

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
                <Skeleton width="25%" height={25} variant="text" animation="wave"/>
                <Skeleton width="80%" sx={{height: {xs: 256, sm: '312px', md: '460px'}}} variant="text"
                          animation="wave"/>
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
                                     height: {xs: 200, sm: 256, md: 320}
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
                        filter: 'drop-shadow(0px 10px 9px rgba(0, 0, 0, 0.04))',
                    }} elevation={0}>
                    {loading ? loadingSkeleton : error ? errorContent : content}
                </Card>
            </Fade>
        )
    }

export default CardFrontView
