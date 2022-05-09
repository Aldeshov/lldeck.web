import {Box, Typography} from "@mui/material";
import {FunctionComponent} from "react";
import DeckItemView from "./DeckItemView";
import DeckItem from "../../models/api/DeckItem";

const HorizontalDeckListView: FunctionComponent<{ items: DeckItem[] }> = ({items}) => {
    return (
        <Box display='block'
             sx={{
                 m: 3,
                 overflow: 'scroll',
                 whiteSpace: 'nowrap'
             }}>
            {
                items.length === 0 ? (
                    <Typography variant="body1" color="gray" marginLeft={2}>
                        No decks
                    </Typography>
                ) : items.map((item: any, index: number) => (
                    <DeckItemView key={index} item={item}/>
                ))
            }
        </Box>
    )
}

export default HorizontalDeckListView
