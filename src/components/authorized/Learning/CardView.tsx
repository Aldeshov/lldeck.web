import {Box} from "@mui/material";
import React, {FunctionComponent, useEffect, useState} from "react";
import CardItem from "../../../models/api/CardItem";
import CardBackView from "./CardBackView";
import CardFrontView from "./CardFrontView";


const CardView: FunctionComponent<{ queue: CardItem[], card: CardItem, deckID: string, action: any }> =
    ({queue, card, deckID, action}) => {
        const [flipped, setFlipped] = useState<boolean>(false);

        useEffect(() => setFlipped(false), [queue])

        return (
            <Box width={640} minHeight={512} maxWidth="90%" marginBottom={5} position="relative">
                <CardFrontView shown={!flipped} card={card} deckID={deckID} showBack={() => setFlipped(true)}/>
                <CardBackView shown={flipped} card={card} deckID={deckID} onAction={action}
                              showFront={() => setFlipped(false)}/>
            </Box>
        )
    }

export default CardView
