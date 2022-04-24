import {Alert, Button, Stack, Typography} from "@mui/material";
import {useNavigate} from "react-router";
import Warning from './vectors/Warning.svg';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <Stack alignItems="center" justifyContent="center" spacing={2} sx={{margin: '5%'}}>
            <img width={200} src={Warning} alt="warning"/>
            <Typography variant="h5" component="h6">
                <Alert severity="warning" elevation={1}>
                    <strong>ERROR 404</strong> Page Not Found :(
                </Alert>
            </Typography>
            <Button color="secondary" onClick={(_event: any) => navigate('/', {replace: true})}>Home</Button>
        </Stack>
    )
}

export default NotFound;
