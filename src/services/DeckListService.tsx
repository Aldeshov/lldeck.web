import APIRequest from "./APIRequest";

const DeckListService = (params: any) => {
    let query = `?${new URLSearchParams(params).toString()}`
    return APIRequest(`/contents/decks/my` + query, "GET")
}

export default DeckListService;
