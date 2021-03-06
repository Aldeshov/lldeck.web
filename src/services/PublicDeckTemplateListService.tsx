import APIRequest from "./APIRequest";

const PublicDeckTemplateListService = (params: any) => {
    let query = `?${new URLSearchParams(params).toString()}`
    return APIRequest(`/contents/deck-templates/popular` + query, "GET")
}

export default PublicDeckTemplateListService;
