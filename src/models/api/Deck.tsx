export default interface Deck {
    id: number;
    name: string;
    preview: string;
    tags: number[];
    date_created: Date;
    date_updated: Date;
    cards_count: number;
    template: number;
    favorite: boolean;
    stat_learned_today_count: number;
    stat_failed_today_count: number;
    learning_today_count: number;
    daily_new_cards_count: number;
    learning_cards_count: number;
    to_review_cards_count: number;
}
