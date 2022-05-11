import APIRequest from "./APIRequest";

const CardActionService = (deckID: string, cardID: number, success: boolean) => {
    return APIRequest(
        `/contents/decks/my/${deckID}/cards/${cardID}/action?success=${success ? 1 : 0}`, "PUT"
    )
}

export default CardActionService
