import AxiosRequest from "./AxiosRequest";

const DeckCreateService = (data: any) => {
    return AxiosRequest(`/contents/decks/my`, "POST", data)
}

export default DeckCreateService;
