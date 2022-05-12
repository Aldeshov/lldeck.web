import AxiosRequest from "./AxiosRequest";

const CardCreateService = (deckID: string | number, data: any) => {
    return AxiosRequest(`/contents/decks/my/${deckID}/cards`, 'POST', data)
}

export default CardCreateService;
