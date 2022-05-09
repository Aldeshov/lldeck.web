import {Stack, Typography} from "@mui/material";
import {FunctionComponent} from "react";
import DeckTemplateItemView from "./DeckTemplateItemView";
import DeckTemplateItem from "../../models/api/DeckTemplateItem";

const HorizontalDeckTemplateListView: FunctionComponent<{ items: DeckTemplateItem[] }> = ({items}) => {
    return (
        <Stack direction="row" flexWrap='wrap'
               spacing={0}
               sx={{
                   m: 3,
                   justifyContent: {xs: 'center', md: 'flex-start'},
               }}>
            {
                items.length === 0 ? (
                    <Typography variant="body1" color="gray" marginLeft={2}>
                        No decks
                    </Typography>
                ) : items.map((item: any, index: number) => (
                    <DeckTemplateItemView key={index} item={item}/>
                ))
            }
        </Stack>
    )
}

export default HorizontalDeckTemplateListView
