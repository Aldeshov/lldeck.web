import APIRequest from "./APIRequest";

const CardLearnService = (deckID: string, option: string) => {
    return APIRequest(`/contents/decks/my/${deckID}/cards/${option}`,
        "GET", new Headers(), {})
}

export default CardLearnService;
