import APIRequest from "./APIRequest";

const CardContentService = (deckID: string, cardID: number, option: string) => {
    return APIRequest(`/contents/decks/my/${deckID}/cards/${cardID}/${option}`,
        "GET", new Headers(), {})
}

export default CardContentService;
