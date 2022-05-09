import APIRequest from "./APIRequest";

const PublicDeckTemplateListService = (params: any) => {
    let query = `?${new URLSearchParams(params).toString()}`
    return APIRequest(`${process.env.REACT_APP_API_URL}/contents/deck-templates/popular` + query,
        "GET", new Headers(), {})
}

export default PublicDeckTemplateListService;
