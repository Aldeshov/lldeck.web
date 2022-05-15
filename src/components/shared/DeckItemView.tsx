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


const DeckItemView: FunctionComponent<{ item: DeckItem }> = ({item}) => {
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [deck, setDeck] = useState<Deck>();

    const handleClick = () => {
        setExpanded(!expanded)
        if (loading) {
            DeckService(item.id)
                .then((data: Deck) => setDeck(data))
                .catch((error: ResponseError) => setError(error.message))
                .finally(() => setLoading(false))
        }
    }

    return (
        <Card sx={{
            m: 2,
            position: 'relative',
            display: 'inline-block',
            blockSize: 'fit-content !important',
            filter: 'drop-shadow(0px 10px 9px rgba(0, 0, 0, 0.04))',
            width: {xs: 276, sm: 212},
            borderRadius: 4,
            overflow: 'visible',
            verticalAlign: 'top',
            userSelect: 'none'
        }}
              elevation={0}>
            <CardActionArea sx={{borderRadius: 4}} onClick={handleClick}>
                <CardContent sx={{p: {xs: 4, sm: 2}}}>
                    <Box sx={{
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}>
                        <Typography width={180} height={48} fontFamily="Manrope" fontSize="16" fontWeight={500}
                                    gutterBottom overflow="hidden" textOverflow="ellipsis" whiteSpace="pre-wrap"
                                    color="primary" component="div">
                            {item.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{fontFamily: 'Manrope'}}>
                            {item.cards_count} words
                        </Typography>
                        <Button component="span" onClick={() => {
                            handleClick();
                            navigate(`/learning/${item.id}`);
                        }} variant='contained' sx={{
                            mt: 2,
                            fontSize: {xs: 16, sm: 14},
                            fontFamily: 'Manrope',
                            maxWidth: 128,
                            borderRadius: 60,
                            padding: {xs: '8px 64px', sm: '5px 48px'},
                            textTransform: 'none',
                            zIndex: 1010,
                        }}>
                            Learn
                        </Button>
                    </Box>
                    <Collapse in={expanded} timeout="auto" sx={{mt: 2}}>
                        <Divider color="primary" sx={{m: '5px 0'}}/>
                        {
                            error && <Alert severity="error" sx={{m: 1, overflow: 'scroll'}}>
                                {error}
                            </Alert>
                        }
                        {
                            loading ?
                                <Box>
                                    <Skeleton animation="wave" height={28}/>
                                    <Skeleton animation="wave" height={28}/>
                                    <Skeleton animation="wave" height={28}/>
                                </Box>
                                :
                                deck && <Box>
                                    <Box display="flex" alignItems="center" justifyContent="space-between">
                                        <Typography color="primary" variant="body1">
                                            New:
                                        </Typography>
                                        <Typography color="primary" variant="body1">
                                            {deck.daily_new_cards_count} words
                                        </Typography>
                                    </Box>
                                    <Box display="flex" alignItems="center" justifyContent="space-between">
                                        <Typography color="#CF0095" variant="body1">
                                            Learning:
                                        </Typography>
                                        <Typography color="#CF0095" variant="body1">
                                            {deck.learning_cards_count} words
                                        </Typography>
                                    </Box>
                                    <Box display="flex" alignItems="center" justifyContent="space-between">
                                        <Typography color="#00A925" variant="body1">
                                            To review:
                                        </Typography>
                                        <Typography color="#00A925" variant="body1">
                                            {deck.to_review_cards_count} words
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
