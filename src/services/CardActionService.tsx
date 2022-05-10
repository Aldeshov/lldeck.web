import APIRequest from "./APIRequest";

const CardActionService = (deckID: string, cardID: number, success: boolean) => {
    let action = success ? 1 : 0;
    return APIRequest(`/contents/decks/my/${deckID}/cards/${cardID}/action?success=${action}`,
        "PUT", new Headers(), {})
}

export default CardActionService
