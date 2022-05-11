import React, {useState} from "react";
import {useQuery} from "../../../tools/extra";
import {
    Autocomplete,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    Modal,
    TextField,
    Typography
} from "@mui/material";
import CardFrontEdit, {FrontStateError} from "./CardFrontEdit";
import CardBackEdit, {BackStateError} from "./CardBackEdit";
import CardFront from "../../../models/api/CardFront";
import CardBack from "../../../models/api/CardBack";
import CardContentEditService from "../../../services/CardContentEditService";
import {InsertPhotoRounded} from "@mui/icons-material";
import DeckList from "../../../models/api/DeckList";
import DeckItem from "../../../models/api/DeckItem";
import DeckListService from "../../../services/DeckListService";

const Editor = () => {
    let query = useQuery();
    const [flipped, setFlipped] = useState<boolean>(false);
    const deckID = query.get('deck') || '', cardID = query.get('card') || '';

    const [modalOpen, setModalOpen] = React.useState(false);
    const [deckListOpen, setDeckListOpen] = React.useState(false);
    const [selectedDeck, setSelectedDeck] = React.useState<DeckItem | null>(null);

    const handleOpen = () => setModalOpen(true);
    const handleClose = () => {
        setBackErrors({definition: "", audio: "", global: ""});
        setModalOpen(false);
    };

    const [decks, setDecks] = React.useState<DeckList>();
    const loading = deckListOpen && (!decks || (decks && decks.results.length === 0));

    const [front, setFront] = useState<CardFront>();
    const [frontAudioFile, setFrontAudioFile] = useState<File>();
    const [frontPhotoFile, setFrontPhotoFile] = useState<File>();

    const [back, setBack] = useState<CardBack>();
    const [backAudioFile, setBackAudioFile] = useState<File>();

    const [backErrors, setBackErrors] = useState<BackStateError>();
    const [frontErrors, setFrontErrors] = useState<FrontStateError>();


    const handleFrontData = (front: CardFront, audioFile?: File, photoFile?: File) => {
        setFront(front);
        setFrontAudioFile(audioFile);
        setFrontPhotoFile(photoFile);
    }

    const handleBackSubmit = (back: CardBack, audioFile?: File) => {
        if (front) {
            if (back.id) {
                const formDataFront = new FormData();
                formDataFront.append("word", front.word);
                formDataFront.append("helper_text", front.helper_text);
                if (frontAudioFile) formDataFront.append("audio", frontAudioFile, frontAudioFile.name);
                if (frontPhotoFile) formDataFront.append("photo", frontPhotoFile, frontPhotoFile.name);
                CardContentEditService(deckID, cardID, "front", formDataFront)
                    .then(() => {
                        const formDataBack = new FormData();
                        formDataBack.append("definition", back.definition);
                        let examples = back.examples.filter(value => value);
                        for (let i = 0; i < examples.length; i++)
                            formDataBack.append(`examples[${i}]`, examples[i]);
                        if (audioFile) formDataBack.append("audio", audioFile, audioFile.name);
                        CardContentEditService(deckID, cardID, "back", formDataBack)
                            .then(() => window.location.reload())
                            .catch((error) => {
                                if (error.response && error.response.data) {
                                    let data = error.response.data;
                                    setBackErrors({
                                        definition: data.definition,
                                        audio: data.audio,
                                        global: error.message
                                    })
                                } else setBackErrors({definition: "", audio: "", global: error.message});
                            })
                    })
                    .catch((error) => {
                        if (error.response && error.response.data) {
                            let data = error.response.data;
                            setBackErrors({
                                definition: "",
                                audio: "",
                                global: "The front of the card has invalid fields"
                            })
                            setFrontErrors({word: data.word, photo: data.photo, audio: data.audio});
                        } else setBackErrors({definition: "", audio: "", global: error.message});
                    })
            } else {
                handleOpen();
                setBack(back);
                setBackAudioFile(audioFile);
            }
        } else setBackErrors({definition: "", audio: "", global: "Front of the card is NULL"})
    }

    return (
        <Box width="100%" height="100%" display="flex" flexDirection="column"
             alignItems="center"
             justifyContent="center" paddingTop={1}>
            <Box display="flex" alignItems="center" m={2}>
                <Typography textAlign="center" variant="h6" fontWeight="500">
                    {flipped ? "Back of the card" : "Front of the card"}
                </Typography>
            </Box>
            <Box width={640} minHeight={512} maxWidth="90%" marginBottom={5} position="relative">
                <CardFrontEdit shown={!flipped} cardID={cardID} deckID={deckID} handleData={handleFrontData}
                               showBack={() => setFlipped(true)} errors={frontErrors}/>
                <CardBackEdit shown={flipped} cardID={cardID} deckID={deckID} handleData={handleBackSubmit}
                              showFront={() => setFlipped(false)} errors={backErrors}/>
            </Box>
            <Modal
                open={modalOpen}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Card sx={{
                    top: '50%',
                    left: '50%',
                    position: 'absolute',
                    transform: 'translate(-50%, -50%)',
                    filter: 'drop-shadow(0px 10px 9px rgba(0, 0, 0, 0.04))',
                    borderRadius: 4,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 512,
                    maxWidth: '90%',
                    p: 4,
                }} elevation={0}>
                    <CardContent sx={{
                        width: '100%',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'space-around !important',
                        gap: 2
                    }}>
                        <Typography variant="h5" fontWeight={500} gutterBottom component="div">
                            Add this word to a deck
                        </Typography>
                        <Autocomplete
                            fullWidth
                            open={deckListOpen}
                            onOpen={() => {
                                setDeckListOpen(true);
                                if (!decks) {
                                    DeckListService({})
                                        .then((data: DeckList) => setDecks(data)).catch((error) => error)
                                }
                            }}
                            onClose={() => setDeckListOpen(false)}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            getOptionLabel={(option) => option.name}
                            options={decks?.results || []}
                            loading={loading}
                            value={selectedDeck}
                            onChange={(event, newValue) => setSelectedDeck(newValue)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Deck"
                                    sx={{backgroundColor: '#F5F4F8'}}
                                    InputProps={{
                                        ...params.InputProps,
                                        endAdornment: (
                                            <React.Fragment>
                                                {loading ?
                                                    <CircularProgress color="inherit" size={20}/> : null}
                                                {params.InputProps.endAdornment}
                                            </React.Fragment>
                                        ),
                                    }}
                                />
                            )}
                        />
                        {
                            selectedDeck &&
                            <Box width="100%" display="flex" alignItems="center" justifyContent="flex-start"
                                 sx={{
                                     border: '2px solid #5E6CFF',
                                     backgroundColor: '#F5F4F8',
                                     borderRadius: 2,
                                     mt: 2,
                                     mb: 2,
                                 }}>
                                <Box width={100} height={100} display="flex" alignItems="center"
                                     justifyContent="center">
                                    {
                                        selectedDeck.preview ?
                                            <img width={80} src={selectedDeck.preview} alt="Deck preview"/> :
                                            <InsertPhotoRounded color="action" sx={{transform: 'scale(3)'}}/>
                                    }
                                </Box>
                                <Box flexGrow={1} display="flex" flexDirection="column" alignItems="flex-start">
                                    <Typography variant="subtitle1" fontWeight={500} sx={{maxWidth: {xs: 200, sm: 300}}}
                                                textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap">
                                        {selectedDeck.name}
                                    </Typography>
                                    <Typography variant="body2">
                                        {selectedDeck.cards_count} words
                                    </Typography>
                                    <Box mt={1} display="flex" flexDirection="row" flexWrap="wrap" gap={1}>
                                        {
                                            selectedDeck.tags.slice(0, 5).map((item, index) => (
                                                <Chip size="small" color="success" key={index} label={item.name}/>
                                            ))
                                        }
                                    </Box>
                                </Box>
                            </Box>
                        }
                        <Box width="100%" display="flex" flexDirection="row" alignItems="center"
                             justifyContent="space-around">
                            <Button disabled={!selectedDeck} variant='contained' sx={{
                                borderRadius: 60,
                                fontFamily: 'Manrope',
                                padding: {xs: '4px 32px', md: '8px 64px'},
                                textTransform: 'none',
                            }}>
                                Done
                            </Button>
                            <Button variant='outlined' sx={{
                                borderRadius: 60,
                                fontFamily: 'Manrope',
                                padding: {xs: '4px 16px', md: '8px 32px'},
                                textTransform: 'none',
                            }}>
                                Create a new deck
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Modal>
        </Box>
    )
}

export default Editor;
