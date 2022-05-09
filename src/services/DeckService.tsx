import APIRequest from "./APIRequest";

const DeckService = (id: number) => {
    return APIRequest(`${process.env.REACT_APP_API_URL}/contents/decks/my/${id}`,
        "GET", new Headers(), {})
}

export default DeckService;
