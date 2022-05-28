import {Alert, alpha, ButtonBase, Card, CardContent, CircularProgress, InputBase, Skeleton} from "@mui/material";
import {styled} from '@mui/material/styles';
import SearchIcon from './vectors/SearchIcon.svg'
import React, {FunctionComponent} from "react";

export const SearchInput = styled(InputBase)(({theme}) => ({
    'label + &': {
        marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
        borderRadius: 25,
        position: 'relative',
        // backgroundColor: theme.palette.mode === 'light' ? '#ffffff' : '#2b2b2b',
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

export const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
});

export const Image = styled('span')(({theme}) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
}));

export const ImageBackdrop = styled('span')(({theme}) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#5b5b5b',
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
}));

const SpanButtonBehavior = React.forwardRef(
    (props, ref) => <ButtonBase focusRipple component="span" {...props} {...ref}></ButtonBase>
);

export const ImageButton = styled(SpanButtonBehavior)(({theme}) => ({
    position: 'relative',
    height: 200,
    boxShadow: '0px 0px 4px #8B8B8B',
    [theme.breakpoints.down('sm')]: {
        width: '100% !important', // Overrides inline-style
        height: 100,
    },
    '&:hover, &.Mui-focusVisible': {
        zIndex: 1,
        '& .MuiImageBackdrop-root': {
            opacity: 0.15,
        },
        '& .MuiImageMarked-root': {
            opacity: 0,
        },
        '& .MuiTypography-root': {
            backgroundColor: 'rgba(73,73,73,0.5)',
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
                boxShadow: '0px 10px 9px rgba(0, 0, 0, 0.04)',
                width: {xs: 185, sm: 225},
                height: {xs: 218, sm: 178},
                borderRadius: 4,
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

export const CardContentLoading = () => {
    return (
        <CardContent sx={{
            height: 500,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center !important'
        }}>
            <CircularProgress/>
        </CardContent>
    )
}

export const CardContentError: FunctionComponent<{ error: string }> = ({error}) => {
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
