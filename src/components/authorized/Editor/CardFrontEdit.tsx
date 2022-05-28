import {
    Box,
    Button,
    Card,
    CardContent,
    Fade,
    FormControl,
    FormHelperText,
    IconButton,
    InputLabel,
    OutlinedInput,
    Typography
} from "@mui/material";
import {ArrowForwardIosRounded, CloudUploadRounded, MicNoneRounded} from "@mui/icons-material";
import React, {FunctionComponent, useEffect, useState} from "react";
import CardFront from "../../../models/api/CardFront";
import CardContentService from "../../../services/CardContentService";
import ResponseError from "../../../models/ResponseError";
import {CardContentError, CardContentLoading, Image, ImageBackdrop, ImageButton, ImageSrc} from "../../../tools/custom";

export interface FrontStateError {
    word: string;
    photo: string;
    audio: string;
}


const CardFrontEdit: FunctionComponent<{
    shown: boolean,
    cardID: string,
    deckID: string,
    showBack: any,
    handleData: (front: CardFront, audioFile?: File, photoFile?: File) => any,
    errors?: FrontStateError
}> = ({shown, cardID, deckID, showBack, handleData, errors}) => {
    const [front, setFront] = useState<CardFront>({id: 0, photo: "", audio: "", word: "", helper_text: ""})
    const [audioFile, setAudioFile] = useState<File>();
    const [photoFile, setPhotoFile] = useState<File>();
    const [formErrors, setFormErrors] = useState<FrontStateError>({word: "", photo: "", audio: ""});

    const [error, setError] = useState<string>();
    const [loading, setLoading] = useState<boolean>(true);

    const handleAudioFile = (event: any) => {
        event.preventDefault();
        setAudioFile(event.target.files[0]);
        setFront({...front, audio: event.target.value})
    }

    const handlePhotoFile = (event: any) => {
        event.preventDefault();
        setPhotoFile(event.target.files[0]);
        setFront({...front, photo: event.target.value})
    }

    const handleClick = () => {
        handleData(front, audioFile, photoFile);
        showBack();
    }

    useEffect(() => {
        if (errors) {
            setFormErrors(errors);
        }
    }, [errors])

    useEffect(() => {
        if (cardID && deckID) {
            setLoading(true);
            setError(undefined)
            CardContentService(deckID, cardID, "front")
                .then((data: CardFront) => setFront(data))
                .catch((error: ResponseError) => setError(error.data ? error.detail() : error.message))
                .finally(() => setLoading(false))
        } else {
            setLoading(false);
            setError(undefined)
        }
    }, [cardID, deckID]);

    const content = (
        <CardContent sx={{
            m: {xs: '5px 20px', md: '5px 40px'},
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-around !important'
        }}>
            <Box width="100%" display="flex" flexDirection="row" alignItems="center" mt={1} mb={2}>
                <label htmlFor="audio">
                    <input style={{display: 'none'}} onChange={handleAudioFile}
                           accept="audio/*" id="audio" type="file"/>
                    <Button component="span" size="medium" startIcon={<MicNoneRounded/>}
                            sx={{textTransform: 'none'}}>
                        <Typography variant="subtitle2" maxWidth={200} overflow="hidden" whiteSpace='nowrap'
                                    textOverflow='ellipsis'>
                            {
                                audioFile ? audioFile.name :
                                    front.audio ? "Change audio" : "Upload audio"
                            }
                        </Typography>
                    </Button>
                </label>
                <Typography component="div" variant="subtitle2" color="error" textAlign="center">
                    {formErrors.audio}
                </Typography>
            </Box>
            <FormControl fullWidth error={!!formErrors.word} variant="outlined" size="small" margin="dense">
                <InputLabel sx={{fontSize: 14}} htmlFor="wordInput">Word</InputLabel>
                <OutlinedInput
                    type='text'
                    label="Word"
                    id="wordInput"
                    inputProps={{'aria-label': 'weight'}}
                    value={front.word}
                    aria-describedby="wordError"
                    sx={{backgroundColor: 'white', fontSize: 15}}
                    onChange={(event) => setFront({...front, word: event.target.value})}
                />
                <FormHelperText id="wordError">{formErrors.word}</FormHelperText>
            </FormControl>
            <FormControl fullWidth variant="outlined" size="small" margin="dense">
                <InputLabel sx={{fontSize: 14}} htmlFor="helperTextInput">Helper text</InputLabel>
                <OutlinedInput
                    type='text'
                    label="Helper text"
                    id="helperTextInput"
                    inputProps={{'aria-label': 'weight'}}
                    value={front.helper_text}
                    sx={{backgroundColor: 'white', fontSize: 15}}
                    onChange={(event) => setFront({...front, helper_text: event.target.value})}
                />
            </FormControl>
            <label htmlFor="photo" style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                <input style={{display: 'none'}} onChange={handlePhotoFile}
                       accept="image/*" id="photo" type="file"/>
                <ImageButton sx={{
                    mt: 2,
                    borderRadius: 4,
                    width: {xs: '100%', md: '90%'},
                    height: {xs: 200, sm: 256, md: 320}
                }}>
                    <ImageSrc style={{borderRadius: 16, backgroundImage: `url(${front.photo})`}}/>
                    <ImageBackdrop sx={{borderRadius: 4}} className="MuiImageBackdrop-root"/>
                    <Image>
                        <Typography
                            component="span"
                            variant="subtitle1"
                            color="inherit"
                            sx={{
                                maxWidth: 256,
                                overflow: 'hidden',
                                whiteSpace: 'nowrap',
                                textOverflow: 'ellipsis',
                                fontSize: {xs: 14, md: 16},
                                borderRadius: 10,
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                                p: "20px"
                            }}>
                            <CloudUploadRounded/>
                            {
                                photoFile ? photoFile.name :
                                    front.photo ? "Change photo" : "Upload photo"
                            }
                        </Typography>
                    </Image>
                </ImageButton>
            </label>
            {
                formErrors.photo && <Typography color="error" fontWeight={600} fontSize={14} m={1}>
                    {formErrors.photo}
                </Typography>
            }
            <Box width="100%" display="flex" alignItems="center" mt={4} justifyContent="flex-end">
                <IconButton onClick={handleClick} size="large">
                    <ArrowForwardIosRounded color="primary"/>
                </IconButton>
            </Box>
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
                    boxShadow: '0px 10px 9px rgba(0, 0, 0, 0.04)',
                }} elevation={0}>
                {
                    loading ? <CardContentLoading/> :
                        error ? <CardContentError error={error || "Something went wrong"}/> : content
                }
            </Card>
        </Fade>
    )
}

export default CardFrontEdit;
