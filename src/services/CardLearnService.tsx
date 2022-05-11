import APIRequest from "./APIRequest";

const CardLearnService = (deckID: string, option: string) => {
    return APIRequest(`/contents/decks/my/${deckID}/cards/${option}`, "GET")
}

export default CardLearnService;
