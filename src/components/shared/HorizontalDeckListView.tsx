import {Box, Typography} from "@mui/material";
import {FunctionComponent} from "react";
import DeckItemView from "./DeckItemView";
import DeckList from "../../models/api/DeckList";

const HorizontalDeckListView: FunctionComponent<{ list: DeckList, error: string }> = ({list, error}) => {
    return (
        <Box display='block'
             sx={{
                 m: 3,
                 overflow: 'scroll',
                 whiteSpace: 'nowrap'
             }}>
            {
                !list.results || list.results.length === 0 ? (
                    error ?
                        <Typography variant="body1" color="red" fontWeight={500} marginLeft={2}>
                            {error}
                        </Typography> :
                        <Typography variant="body1" color="gray" fontWeight={300} marginLeft={2}>
                            No decks
                        </Typography>
                ) : list.results.map((item: any, index: number) => (
                    <DeckItemView key={index} item={item}/>
                ))
            }
        </Box>
    )
}

export default HorizontalDeckListView
