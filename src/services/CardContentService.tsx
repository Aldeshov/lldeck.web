import APIRequest from "./APIRequest";

const CardContentService = (deckID: string | number, cardID: string | number, option: string) => {
    return APIRequest(`/contents/decks/my/${deckID}/cards/${cardID}/${option}`, "GET")
}

export default CardContentService;
