import APIRequest from "./APIRequest";

const DeckService = (id: number) => {
    return APIRequest(`/contents/decks/my/${id}`,
        "GET", new Headers(), {})
}

export default DeckService;
