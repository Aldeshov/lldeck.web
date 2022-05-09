export default interface DeckItem {
    id: number;
    name: string;
    preview: string;
    tags: { name: string }[];
    cards_count: number;
    favorite: boolean;
}
