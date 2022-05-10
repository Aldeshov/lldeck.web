import APIRequest from "./APIRequest";

const CardLearnService = (deckID: string, option: string) => {
    return APIRequest(`${process.env.REACT_APP_API_URL}/contents/decks/my/${deckID}/cards/${option}`,
        "GET", new Headers(), {})
}

export default CardLearnService;
