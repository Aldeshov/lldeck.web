import {alpha, Card, CardContent, InputBase, Skeleton, styled} from "@mui/material";
import SearchIcon from './vectors/SearchIcon.svg'
import React from "react";

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

export const CardLoadingSkeleton = () => {
    return (
        <Card
            sx={{
                m: 2,
                width: 640,
                maxWidth: '90%',
                height: 512,
                borderRadius: 4,
                p: {xs: '4% 5px', sm: '2%'},
                filter: 'drop-shadow(0px 10px 9px rgba(0, 0, 0, 0.04))',
            }} elevation={0}>
            <CardContent sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center !important'
            }}>

            </CardContent>
        </Card>
    )
}