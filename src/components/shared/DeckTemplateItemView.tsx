import {FunctionComponent} from "react";
import {Button, Card, CardContent, Typography} from "@mui/material";
import DeckTemplateItem from "../../models/api/DeckTemplateItem";

const DeckTemplateItemView: FunctionComponent<{ item: DeckTemplateItem }> = ({item}) => {
    return (
        <Card sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            filter: 'drop-shadow(0px 10px 9px rgba(0, 0, 0, 0.04))',
            width: {xs: 256, sm: 192},
            height: {xs: 192, sm: 130},
            borderRadius: 4,
            p: '20px 10px',
            m: 2
        }}
              elevation={0}>
            <CardContent sx={{
                height: '100%',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between !important'
            }}>
                <Typography width={180} height={48} fontFamily="Manrope" fontSize="16" fontWeight={500}
                            gutterBottom overflow="hidden" textOverflow="ellipsis"
                            color="primary" component="div">
                    {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{fontFamily: 'Manrope'}}>
                    {item.cards_count} words
                </Typography>
                <Button variant='contained' sx={{
                    fontSize: {xs: 16, sm: 14},
                    fontFamily: 'Manrope',
                    maxWidth: 128,
                    borderRadius: 60,
                    padding: {xs: '8px 64px', sm: '5px 48px'},
                    textTransform: 'none',
                }}>
                    Add
                </Button>
            </CardContent>
        </Card>
    )
}

export default DeckTemplateItemView
