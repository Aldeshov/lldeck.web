import {Alert, alpha, Card, CardContent, InputBase, Skeleton, styled} from "@mui/material";
import SearchIcon from './vectors/SearchIcon.svg'
import React, {FunctionComponent} from "react";

export const BootstrapInput = styled(InputBase)(({theme}) => ({
    'label + &': {
        marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 12px',
        transition: theme.transitions.create([
            'border-color',
            'background-color',
            'box-shadow',
        ]),
        '&:focus': {
            boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
            borderColor: theme.palette.primary.main,
        },
    },
}));

export const SearchInput = styled(InputBase)(({theme}) => ({
    'label + &': {
        marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
        borderRadius: 25,
        position: 'relative',
        backgroundColor: theme.palette.mode === 'light' ? '#ffffff' : '#2b2b2b',
        backgroundImage: `url(${SearchIcon})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: '15px 15px',
        backgroundPosition: '15px center',
        border: '2px solid #5E6CFF',
        fontSize: 14,
        minWidth: 200,
        padding: '6px 20px 6px 40px',
        transition: theme.transitions.create([
            'border-color',
            'background-color',
            'box-shadow',
        ]),
        '&:focus': {
            boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
            borderColor: theme.palette.primary.main,
        },
    },
}));

export const DeckItemSkeleton = () => {
    return (
        <Card
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                filter: 'drop-shadow(0px 10px 9px rgba(0, 0, 0, 0.04))',
                width: {xs: 256, sm: 192},
                height: {xs: 192, sm: 130},
                borderRadius: 4,
                p: '20px 10px',
                m: 2
            }}
            elevation={0}>
            <CardContent sx={{
                height: '100%',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between !important'
            }}>
                <Skeleton width={150} height={100} variant="text" animation="wave"/>
                <Skeleton width={75} height={25} variant="text" animation="wave"/>
                <Skeleton width={100} height={70} variant="text"/>
            </CardContent>
        </Card>
    )
}

export const CardContentLoadingSkeleton = () => {
    return (
        <CardContent sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center !important'
        }}>
            <Skeleton width="50%" height={50} variant="text" animation="wave"/>
            <Skeleton width="25%" height={25} variant="text" animation="wave"/>
            <Skeleton width="80%" sx={{height: {xs: 256, sm: '312px', md: '460px'}}} variant="text"
                      animation="wave"/>
        </CardContent>
    )
}

export const CardContentError: FunctionComponent<{ error: string }> = (error) => {
    return (
        <CardContent sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start !important'
        }}>
            <Alert severity="error" sx={{width: 300, maxWidth: '90%'}} elevation={1}>
                {error}
            </Alert>
        </CardContent>
    )
}
