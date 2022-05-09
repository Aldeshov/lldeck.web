import DeckItem from "./DeckItem";

export default interface DeckList {
    count: number;
    next: string;
    previous: string;
    results: DeckItem[]
}
