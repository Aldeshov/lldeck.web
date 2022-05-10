import {Box} from "@mui/material";
import React, {FunctionComponent, useState} from "react";
import CardItem from "../../../models/api/CardItem";
import CardBackView from "./CardBackView";
import CardFrontView from "./CardFrontView";


const CardView: FunctionComponent<{ card: CardItem, deckID: string }> = ({card, deckID}) => {
    const [flipped, setFlipped] = useState<boolean>(false);

    return (
        <Box width={640} minHeight={512} maxWidth="90%" marginBottom={5} position="relative">
            <CardFrontView shown={!flipped} card={card} deckID={deckID} showBack={() => setFlipped(true)}/>
            <CardBackView shown={flipped} card={card} deckID={deckID} showFront={() => setFlipped(false)}/>
        </Box>
    )
}

export default CardView
