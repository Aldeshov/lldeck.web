import APIRequest from "./APIRequest";

const CardContentService = (deckID: string, cardID: number, option: string) => {
    return APIRequest(`${process.env.REACT_APP_API_URL}/contents/decks/my/${deckID}/cards/${cardID}/${option}`,
        "GET", new Headers(), {})
}

export default CardContentService;
