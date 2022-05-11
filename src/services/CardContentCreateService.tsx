import APIRequest from "./APIRequest";

const CardContentCreateService = (deckID: string | number, data: any) => {
    return APIRequest(`/contents/decks/my/${deckID}/cards`, 'POST', data)
}

export default CardContentCreateService;
