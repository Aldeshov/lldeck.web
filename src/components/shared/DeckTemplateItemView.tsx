import {FunctionComponent, useState} from "react";
import {Box, Card, CardContent, Typography} from "@mui/material";
import DeckTemplateItem from "../../models/api/DeckTemplateItem";
import {LoadingButton} from "@mui/lab";
import DeckCreateService from "../../services/DeckCreateService";

const DeckTemplateItemView: FunctionComponent<{ item: DeckTemplateItem }> = ({item}) => {
    const [added, setAdded] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = () => {
        setLoading(true);
        DeckCreateService({name: item.name, template: item.id})
            .then(() => setAdded(true))
            .catch((error) => console.error(error))
            .finally(() => setLoading(false))
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
            <CardContent sx={{
                height: '100%',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-around !important'
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
                <LoadingButton loading={loading} disabled={added}
                               variant={added ? 'outlined' : 'contained'} sx={{
                    fontSize: {xs: 12, sm: 14},
                    maxWidth: 128,
                    borderRadius: 60,
                    padding: {xs: '4px 32px', sm: '5px 48px'},
                    textTransform: 'none',
                }} onClick={handleSubmit}>
                    {added ? 'Added' : 'Add'}
                </LoadingButton>
            </CardContent>
        </Card>
    )
}

export default DeckTemplateItemView
