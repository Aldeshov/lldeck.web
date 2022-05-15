import {
    Alert,
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
import {Add, ArrowBackIosNewRounded, MicNoneRounded} from "@mui/icons-material";
import React, {FunctionComponent, useEffect, useState} from "react";
import CardContentService from "../../../services/CardContentService";
import CardBack from "../../../models/api/CardBack";
import ResponseError from "../../../models/ResponseError";
import {LoadingButton} from "@mui/lab";
import {CardContentError, CardContentLoading} from "../../../tools/custom";

export interface BackStateError {
    definition: string;
    audio: string;
    global?: string;
}


const CardBackEdit: FunctionComponent<{
    shown: boolean, cardID: string, deckID: string, showFront: any,
    handleData: (back: CardBack, audioFile?: File) => any, errors?: BackStateError
}> = ({shown, cardID, deckID, showFront, handleData, errors}) => {
    const [back, setBack] = useState<CardBack>({id: 0, audio: "", definition: "", examples: []});
    const [formErrors, setFormErrors] = useState<BackStateError>();
    const [audioFile, setAudioFile] = useState<File>();

    const [error, setError] = useState<string>();
    const [loading, setLoading] = useState<boolean>(true);
    const [actionLoading, setActionLoading] = useState<boolean>(false);

    const handleAudioFile = (event: any) => {
        event.preventDefault();
        setAudioFile(event.target.files[0]);
        setBack({...back, audio: event.target.value})
    }

    const handleAddExample = () => {
        setBack({
            ...back,
            examples: [...back.examples, ""]
        })
    }

    const handleSaveOrCreate = () => {
        handleData(back, audioFile);
        setActionLoading(true);
        setFormErrors(undefined);
    }

    useEffect(() => {
        if (cardID && deckID) {
            setLoading(true);
            setError(undefined)
            CardContentService(deckID, cardID, "back")
                .then((data: CardBack) => setBack(data))
                .catch((error: ResponseError) => setError(error.check ? error.detail() : error.message))
                .finally(() => setLoading(false))
        } else {
            setLoading(false);
            setError(undefined)
        }
    }, [cardID, deckID]);

    useEffect(() => {
        if (errors) {
            setActionLoading(false);
            setFormErrors(errors);
        }
    }, [errors])

    const content = (
        <CardContent sx={{
            m: {xs: '5px 20px', md: '5px 40px'},
            minHeight: '100%',
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
                                    back.audio ? "Change audio" : "Upload audio"
                            }
                        </Typography>
                    </Button>
                </label>
                <Typography component="div" variant="subtitle2" color="error" textAlign="center">
                    {formErrors?.audio}
                </Typography>
            </Box>
            <FormControl fullWidth error={!!formErrors?.definition} variant="outlined" size="small" margin="dense">
                <InputLabel sx={{fontSize: 14}} htmlFor="definitionInput">Definition</InputLabel>
                <OutlinedInput
                    multiline
                    rows={4}
                    type='text'
                    label="Definition"
                    id="definitionInput"
                    inputProps={{'aria-label': 'weight'}}
                    value={back.definition}
                    aria-describedby="definitionError"
                    sx={{backgroundColor: 'white', fontSize: 15}}
                    onChange={(event) => setBack({...back, definition: event.target.value})}
                />
                <FormHelperText id="definitionError">{formErrors?.definition}</FormHelperText>
            </FormControl>
            <Box width="100%" mt={2} mb={1} display="flex" flexDirection="row" alignItems="center"
                 justifyContent="space-between">
                <Typography component="p" fontWeight="500"
                            color="primary" fontSize="20" textAlign="start">
                    Examples:
                </Typography>
                <Button size="small" startIcon={<Add/>} sx={{textTransform: 'none'}}
                        onClick={() => handleAddExample()}>
                    Add example
                </Button>
            </Box>
            {
                back.examples && back.examples.length && (
                    back.examples.map((item, index) => (
                        <FormControl key={index} fullWidth variant="outlined" size="small" margin="dense">
                            <InputLabel sx={{fontSize: 14}} htmlFor={`example${index}`}>
                                Example {index + 1}
                            </InputLabel>
                            <OutlinedInput
                                type='text'
                                label={`Example ${index + 1}`}
                                id={`example${index}`}
                                inputProps={{'aria-label': 'weight'}}
                                value={back.examples[index]}
                                sx={{backgroundColor: 'white', fontSize: 15}}
                                onChange={(event) => {
                                    let newExamples = back.examples;
                                    newExamples[index] = event.target.value;
                                    setBack({
                                        ...back, examples: newExamples
                                    })
                                }}
                            />
                        </FormControl>
                    ))
                )
            }
            {
                formErrors?.global && (
                    <Alert severity="error" sx={{m: 2, width: '90%'}} elevation={1}>
                        {formErrors?.global}
                    </Alert>
                )
            }
            <Box width="100%" display="flex" alignItems="center" mt="20%" justifyContent="center">
                <IconButton onClick={() => showFront()} sx={{position: 'absolute', left: 48}} size="large">
                    <ArrowBackIosNewRounded color="primary"/>
                </IconButton>
                <LoadingButton onClick={handleSaveOrCreate} loading={actionLoading} variant='contained' sx={{
                    fontSize: 14,
                    borderRadius: 60,
                    padding: {xs: '8px 48px', md: '10px 60px'},
                    textTransform: 'none',
                }}>
                    {back.id ? "Save" : "Create"}
                </LoadingButton>
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
                    filter: 'drop-shadow(0px 10px 9px rgba(0, 0, 0, 0.04))',
                }} elevation={0}>
                {loading ? <CardContentLoading/> : error ?
                    <CardContentError error={error || "Something went wrong"}/> : content || "No content"}
            </Card>
        </Fade>
    )
}

export default CardBackEdit;
