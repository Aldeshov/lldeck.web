import {Stack, Typography} from "@mui/material";
import {FunctionComponent} from "react";
import DeckTemplateItemView from "./DeckTemplateItemView";
import DeckTemplateList from "../../models/api/DeckTemplateList";

const HorizontalDeckTemplateListView: FunctionComponent<{ list: DeckTemplateList, error: string }> =
    ({list, error}) => {
        return (
            <Stack direction="row" flexWrap='wrap'
                   spacing={0}
                   sx={{
                       m: 3,
                       justifyContent: {xs: 'center', md: 'flex-start'},
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
                        <DeckTemplateItemView key={index} item={item}/>
                    ))
                }
            </Stack>
        )
    }

export default HorizontalDeckTemplateListView
