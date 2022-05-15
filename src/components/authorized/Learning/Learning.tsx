import React, {useContext, useEffect, useState} from "react"
import {useNavigate, useParams} from "react-router";
import CardList from "../../../models/api/CardList";
import ResponseError from "../../../models/ResponseError";
import CardLearnService from "../../../services/CardLearnService";
import CardItem from "../../../models/api/CardItem";
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    FormControl,
    FormHelperText,
    IconButton,
    InputLabel,
    Modal,
    OutlinedInput,
    Stack,
    Typography
} from "@mui/material";
import {ArrowDropDownRounded, MoreHorizRounded} from "@mui/icons-material";
import {shuffle} from "../../../tools/extra";
import UserContext from "../../../contexts/UserContext";

import Congratulations from "./vectors/Congratulations.svg";
import CardActionService from "../../../services/CardActionService";
import CardView from "./CardView";
import {LoadingButton} from "@mui/lab";
import ProfileUpdateService from "../../../services/ProfileUpdateService";


const Learning = () => {
    const {deckID} = useParams();
    const navigate = useNavigate();
    const {localUser} = useContext(UserContext);

    const [card, setCard] = useState<CardItem | undefined>();
    const [queue, setQueue] = useState<CardItem[]>([]);

    const [error, setError] = useState<string>();
    const [loading, setLoading] = useState<boolean>(true);
    const [finished, setFinished] = useState<boolean>(false);

    const [newCards, setNewCards] = useState<CardList>();
    const [learningCards, setLearningCards] = useState<CardList>();
    const [toReviewCards, setToReviewCards] = useState<CardList>();

    const [submitted, setSubmitted] = React.useState(false);
    const [modalOpen, setModalOpen] = React.useState(false);
    const [newAim, setNewAim] = React.useState<string>(`${localUser.profile?.aim || ''}`);
    const [newAimError, setNewAimError] = React.useState<string>('');
    const handleOpen = () => setModalOpen(true);
    const handleClose = () => setModalOpen(false);

    const loadData = () => {
        if (deckID) {
            setLoading(true);
            CardLearnService(deckID, "new")
                .then((data: CardList) => {
                    setNewCards(data);
                    CardLearnService(deckID, "learning")
                        .then((data: CardList) => {
                            setLearningCards(data);
                            CardLearnService(deckID, "to-review")
                                .then((data: CardList) => setToReviewCards(data))
                                .catch((error: ResponseError) => setError(error.data ? error.detail() : error.message))
                                .finally(() => setLoading(false))
                        })
                        .catch((error: ResponseError) => {
                            setError(error.data ? error.detail() : error.message);
                            setLoading(false);
                        })
                })
                .catch((error: ResponseError) => {
                    setError(error.data ? error.detail() : error.message);
                    setLoading(false);
                })
        } else {
            setError("Undefined deck-ID");
            setLoading(false);
        }
    }

    const handleAimSubmit = () => {
        if (!submitted) {
            setSubmitted(true);
            ProfileUpdateService({aim: newAim})
                .then(() => window.location.reload())
                .catch((error: ResponseError) => setNewAimError(
                    error.check ? (error.data && error.data.aim) : error.message
                ))
                .finally(() => setSubmitted(false))
        }
    }

    const handleAction = (action: keyof { success: boolean, fail: boolean }) => {
        if (card) {
            let randomIndex = Math.floor(Math.random() * queue.length);
            if (action === 'success') {
                CardActionService(deckID || '', card.id, true)
                    .then(data => console.debug(data))
                    .catch(console.log)
                switch (card.state) {
                    case 3:
                        setQueue([
                            ...queue.filter(item => {
                                    return item.id !== card.id
                                }
                            )]
                        )
                        break;
                    default:
                        let newQueue = [
                            ...queue.map(item => {
                                if (item.id === card.id) item.state = 3;
                                return item
                            })
                        ];
                        [newQueue[0], newQueue[randomIndex]] = [newQueue[randomIndex], newQueue[0]]
                        setQueue(newQueue);
                        break;
                }
            }
            if (action === 'fail') {
                CardActionService(deckID || '', card.id, false)
                    .then(data => console.debug(data))
                    .catch(console.log)
                let newQueue = [
                    ...queue.map(item => {
                        if (item.id === card.id) item.state = 2;
                        return item
                    })
                ];
                [newQueue[0], newQueue[randomIndex]] = [newQueue[randomIndex], newQueue[0]]
                setQueue(newQueue);
            }
        }
    }

    useEffect(() => {
        if (queue.length > 0) setCard(queue[0]);
        if (queue.length === 0 && newCards && learningCards && toReviewCards) {
            if (newCards.next || learningCards.next || toReviewCards.next) loadData();
            else setFinished(true);
            setCard(undefined);
        }
    }, [queue]);

    useEffect(() => {
        if (!loading && newCards && learningCards && toReviewCards) {
            setQueue(
                shuffle(learningCards.results)
                    .concat(shuffle(newCards.results.concat(toReviewCards.results)))
            )
        }
    }, [loading, newCards, learningCards, toReviewCards])

    useEffect(loadData, [deckID])

    const loadingContent = (
        <Box width="100%" height="100%" display="flex" flexDirection="column" alignItems="center"
             justifyContent="center" paddingTop={2}>
            <Box display="flex" alignItems="center" m={2}>
                <Typography textAlign="center" color="primary" variant="h6" fontWeight="500">
                    New cards/day
                </Typography>
                <IconButton size="large" sx={{borderRadius: 16}}>
                    <MoreHorizRounded color="primary"/>
                </IconButton>
            </Box>
            <Box sx={{mt: 5, display: 'flex', alignItems: 'center'}}>
                <CircularProgress sx={{mr: 1}}/>
                Loading cards...
            </Box>
        </Box>
    )

    const errorContent = (
        <Box width="100%" height="100%" display="flex" flexDirection="column" alignItems="center"
             justifyContent="center" paddingTop={3}>
            <Alert sx={{mt: 2, width: 320, maxWidth: '90%'}} severity="error" elevation={1}>
                <Typography variant="body1" fontWeight={500}>
                    Unable to load cards
                </Typography>
                <Typography variant="body2">
                    Reason: {error || "Something went wrong"}
                </Typography>
            </Alert>
        </Box>
    )

    const congratulationsContent = (
        <Stack width="100%" height="100%" flexDirection="column" paddingTop={4}
               alignItems="center" spacing={5} justifyContent="center">
            <img src={Congratulations} width={440} style={{maxWidth: '70%'}} alt="Congratulations"/>
            <Typography variant="body1" color="#515151" sx={{fontSize: {xs: 16, sm: 18, md: 20}}} textAlign="center">
                Congratulations! You have finished for today!
            </Typography>
            <Button onClick={() => navigate('/decks', {replace: true})} variant='contained' sx={{
                m: {xs: '20px auto', sm: 'revert'},
                backgroundColor: "#5E6CFF",
                fontSize: {xs: 14, md: 16},
                borderRadius: 60,
                padding: '12px 48px',
                textTransform: 'none',
            }}>
                Continue to learn
            </Button>
        </Stack>
    )

    const noCard = (
        <div style={{width: '100%', textAlign: 'center', marginTop: 25}}>No card</div>
    )

    return (
        <React.Fragment>
            {
                loading ? loadingContent :
                    error ? errorContent :
                        finished ? congratulationsContent :
                            card ? <Box width="100%" height="100%" display="flex" flexDirection="column"
                                        alignItems="center"
                                        justifyContent="center" paddingTop={2}>
                                <Box display="flex" alignItems="center" m={2}>
                                    <Typography textAlign="center" color="primary" variant="h6" fontWeight="500">
                                        New cards/day
                                    </Typography>
                                    <Button size="large" endIcon={<ArrowDropDownRounded/>} onClick={handleOpen}
                                            sx={{fontSize: 18, ml: 1, textTransform: 'none', borderRadius: 16}}>
                                        {localUser.profile?.aim}
                                    </Button>
                                </Box>
                                <CardView action={handleAction} queue={queue} card={card} deckID={deckID || ''}/>
                            </Box> : (!loading && !queue && noCard)
            }
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
                            Write a number of words you want to study per day
                        </Typography>
                        <FormControl fullWidth error={!!newAimError} variant="outlined" margin="dense">
                            <InputLabel sx={{fontSize: 14}} htmlFor="aimInput">Aim</InputLabel>
                            <OutlinedInput
                                type='number'
                                label="Aim"
                                id="aimInput"
                                value={newAim}
                                sx={{backgroundColor: '#F5F4F8'}}
                                inputProps={{'aria-label': 'weight'}}
                                aria-describedby="newAimError"
                                onChange={(event) => setNewAim(event.target.value)}
                            />
                            <FormHelperText id="newAimError">{newAimError}</FormHelperText>
                        </FormControl>
                        <LoadingButton onClick={handleAimSubmit} loading={submitted} disabled={!newAim}
                                       variant='contained' sx={{
                            borderRadius: 60,
                            fontFamily: 'Manrope',
                            padding: {xs: '4px 32px', md: '8px 64px'},
                            textTransform: 'none',
                        }}>
                            Save
                        </LoadingButton>
                    </CardContent>
                </Card>
            </Modal>
        </React.Fragment>
    )
}

export default Learning
