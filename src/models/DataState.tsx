export default interface DataState<T> {
    data?: T;
    error?: string;
    loading: boolean;
}