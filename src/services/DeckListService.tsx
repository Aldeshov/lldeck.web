import APIRequest from "./APIRequest";

const DeckListService = (params: any) => {
    let query = `?${new URLSearchParams(params).toString()}`
    return APIRequest(`${process.env.REACT_APP_API_URL}/contents/decks/my` + query,
        "GET", new Headers(), {})
}

export default DeckListService;
