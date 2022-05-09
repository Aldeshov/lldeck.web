import DeckTemplateItem from "./DeckTemplateItem";

export default interface DeckTemplateList {
    count: number;
    next: string;
    previous: string;
    results: DeckTemplateItem[]
}
