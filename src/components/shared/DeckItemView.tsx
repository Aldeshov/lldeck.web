import {FunctionComponent, useState} from "react";
import {
    Alert,
    Box,
    Button,
    Card,
    CardActionArea,
    CardContent,
    Collapse,
    Divider,
    Skeleton,
    Typography
} from "@mui/material";
import DeckItem from "../../models/api/DeckItem";
import Deck from "../../models/api/Deck";
import ResponseError from "../../models/ResponseError";
import DeckService from "../../services/DeckService";
import {useNavigate} from "react-router";
import DataState from "../../models/DataState";


const DeckItemView: FunctionComponent<{ item: DeckItem }> = ({item}) => {
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(false);
    const [deckState, setDeckState] = useState<DataState<Deck>>({loading: true});

    const handleClick = () => {
        setExpanded(!expanded)
        if (deckState.loading) {
            DeckService(item.id)
                .then((data: Deck) => setDeckState({data: data, loading: false}))
                .catch((error: ResponseError) => setDeckState({error: error.message, loading: false}))
        }
    }

    return (
        <Card sx={{
            m: 2,
            position: 'relative',
            display: 'inline-block',
            blockSize: 'fit-content !important',
            boxShadow: '0px 10px 9px rgba(0, 0, 0, 0.04)',
            width: {xs: 185, sm: 225},
            borderRadius: 4,
            overflow: 'visible',
            verticalAlign: 'top',
            userSelect: 'none'
        }} elevation={0}>
            <CardActionArea sx={{borderRadius: 4}} onClick={handleClick}>
                <CardContent sx={{p: 2}}>
                    <Box sx={{
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                        <Box width="90%" sx={{height: {xs: 125, sm: 80}}} mb={3}
                             display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                            <Typography fontWeight={500} gutterBottom
                                        sx={{fontFamily: {xs: "Roboto", sm: "Manrope"}, fontSize: {xs: 15, sm: 16}}}
                                        overflow="hidden" textOverflow="ellipsis" whiteSpace="pre-wrap"
                                        color="primary" component="div">
                                {item.name}
                            </Typography>
                            <Typography mt={1} variant="body2" color="text.secondary"
                                        sx={{fontFamily: {xs: "Roboto", sm: "Manrope"}}}>
                                {item.cards_count} words
                            </Typography>
                        </Box>
                        <Button component="span" onClick={() => {
                            handleClick();
                            navigate(`/learning/${item.id}`);
                        }} variant='contained' sx={{
                            fontSize: {xs: 12, sm: 14},
                            maxWidth: 128,
                            borderRadius: 60,
                            padding: {xs: '4px 32px', sm: '5px 48px'},
                            textTransform: 'none',
                            zIndex: 1010,
                        }}>
                            Learn
                        </Button>
                    </Box>
                    <Collapse in={expanded} timeout="auto" sx={{mt: 1}}>
                        <Divider color="primary" sx={{mt: 2, mb: 2}}/>
                        {
                            deckState.error && <Alert severity="error" sx={{m: 1, overflow: 'scroll'}}>
                                {deckState.error}
                            </Alert>
                        }
                        {
                            deckState.loading ?
                                <Box>
                                    <Skeleton animation="wave" sx={{height: {xs: 20, sm: 24}}}/>
                                    <Skeleton animation="wave" sx={{height: {xs: 20, sm: 24}}}/>
                                    <Skeleton animation="wave" sx={{height: {xs: 20, sm: 24}}}/>
                                </Box>
                                :
                                deckState.data && <Box>
                                    <Box display="flex" alignItems="center" justifyContent="space-between">
                                        <Typography color="primary" variant="body1" sx={{fontSize: {xs: 14, sm: 16}}}>
                                            New:
                                        </Typography>
                                        <Typography color="primary" variant="body1" sx={{fontSize: {xs: 14, sm: 16}}}>
                                            {deckState.data.daily_new_cards_count} words
                                        </Typography>
                                    </Box>
                                    <Box display="flex" alignItems="center" justifyContent="space-between">
                                        <Typography color="#CF0095" variant="body1" sx={{fontSize: {xs: 14, sm: 16}}}>
                                            Learning:
                                        </Typography>
                                        <Typography color="#CF0095" variant="body1" sx={{fontSize: {xs: 14, sm: 16}}}>
                                            {deckState.data.learning_cards_count} words
                                        </Typography>
                                    </Box>
                                    <Box display="flex" alignItems="center" justifyContent="space-between">
                                        <Typography color="#00A925" variant="body1" sx={{fontSize: {xs: 14, sm: 16}}}>
                                            To review:
                                        </Typography>
                                        <Typography color="#00A925" variant="body1" sx={{fontSize: {xs: 14, sm: 16}}}>
                                            {deckState.data.to_review_cards_count} words
                                        </Typography>
                                    </Box>
                                </Box>
                        }
                    </Collapse>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default DeckItemView
