import CardItem from "./CardItem";

export default interface CardList {
    count: number;
    next: string;
    previous: string;
    results: CardItem[]
}
