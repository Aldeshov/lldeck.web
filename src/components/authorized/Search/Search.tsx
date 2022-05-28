import {Box, Container, Stack, Typography} from "@mui/material";
import DeckTemplateList from "../../../models/api/DeckTemplateList";
import React, {useEffect, useState} from "react";
import PublicDeckTemplateListService from "../../../services/PublicDeckTemplateListService";
import ResponseError from "../../../models/ResponseError";
import {DeckItemSkeleton, SearchInput} from "../../../tools/custom";
import HorizontalDeckTemplateListView from "../../shared/HorizontalDeckTemplateListView";
import {useQuery} from "../../../tools/extra";
import {useNavigate} from "react-router";


const Search = () => {
    let query = useQuery();
    const q = query.get('q') || '';

    const navigate = useNavigate();
    const [list, setList] = useState<DeckTemplateList>();
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [search, setSearch] = React.useState<string>(q);

    const DeckTemplateListPlaceHolder = (
        <Stack direction="row" flexWrap="wrap" spacing={0}
               sx={{m: 3, justifyContent: {xs: 'center', md: 'flex-start'}}}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item: number) => (<DeckItemSkeleton key={item}/>))}
        </Stack>
    )

    useEffect(() => {
        setError('');
        setLoading(true);
        setList(undefined);
        PublicDeckTemplateListService({q})
            .then((data: DeckTemplateList) => setList(data))
            .catch((error: ResponseError) => setError(error.message))
            .finally(() => setLoading(false))
    }, [q]);

    return (
        <Stack direction="column" spacing={0}>
            <Box component="form" sx={{
                flexGrow: 1,
                display: 'flex',
                marginTop: 3,
                width: '100%',
                justifyContent: 'center'
            }}>
                <SearchInput sx={{width: 400, maxWidth: '90%'}} placeholder="Search" value={search}
                             onChange={(event) => setSearch(event.target.value)}/>
                <input type="submit" hidden style={{display: 'none'}}
                       onClick={(event) => {
                           event.preventDefault();
                           navigate('/search?q=' + search, {replace: true})
                       }}/>
            </Box>
            <Container maxWidth="xl" sx={{m: "40px auto 10px"}}>
                <Typography component="div" fontFamily="Manrope" fontSize={20}
                            fontWeight={500} margin="5px 40px 0">
                    Search results for: {q}
                </Typography>
                {
                    loading ? DeckTemplateListPlaceHolder :
                        list && <HorizontalDeckTemplateListView list={list} error={error}/>
                }
            </Container>
        </Stack>
    )
}

export default Search;
