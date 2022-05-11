import AxiosRequest from "./AxiosRequest";

const CardContentEditService = (
    deckID: string | number,
    cardID: string | number,
    option: string,
    data: any
) => {
    return AxiosRequest(`/contents/decks/my/${deckID}/cards/${cardID}/${option}`, 'PUT', data)
}


export default CardContentEditService;
