import {Box, Paper, Typography} from "@mui/material";
import {FunctionComponent} from "react";
import StyleIcon from '@mui/icons-material/Style';

import DeckItemView from "./DeckItemView";
import DeckList from "../../models/api/DeckList";

const HorizontalDeckListView: FunctionComponent<{ list?: DeckList, error?: string }> = ({list, error}) => {
    return (
        <Box sx={{m: {xs: 1, md: 3}, overflowX: 'scroll'}} display='block' whiteSpace='nowrap'>
            {
                !list || !list.results || list.results.length === 0 ? (
                    error ?
                        <Typography variant="body1" color="red" fontWeight={500} marginLeft={2}>
                            {error}
                        </Typography> :
                        <Paper elevation={0} sx={{
                                   p: 2,
                                   backgroundColor: 'transparent',
                                   display: 'flex',
                                   alignItems: 'center',
                                   width: 200,
                                   height: 40,
                                   m: 'auto'
                               }}>
                            <StyleIcon sx={{color: "#797979"}}/>
                            <Typography variant="body1" color="gray" fontWeight={300} marginLeft={2}>
                                No decks
                            </Typography>
                        </Paper>
                ) : list.results.map((item: any, index: number) => (
                    <DeckItemView key={index} item={item}/>
                ))
            }
        </Box>
    )
}

export default HorizontalDeckListView
