import {useMemo} from "react";
import {useLocation} from "react-router";

export const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

export function useQuery() {
    const {search} = useLocation();

    return useMemo(() => new URLSearchParams(search), [search]);
}