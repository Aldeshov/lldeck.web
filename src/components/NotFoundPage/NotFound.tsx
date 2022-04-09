import { Alert, Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <Stack alignItems="center" justifyContent="center" spacing={2} style={{ minHeight: '100vh' }}>
            <img width={200} style={{ maxWidth: '200vw' }} src="/assets/images/warning.png" alt="warning" />
            <Typography variant="h5" component="h6">
                <Alert severity="warning">
                    <strong>ERROR 404</strong> Page Not Found :(
                </Alert>
            </Typography>
            <Button color="secondary" onClick={(_event: any) => navigate('/', { replace: true })}>Home</Button>
            <a target="_blank" style={{ position: 'absolute', bottom: 5, right: 20 }} href="https://www.flaticon.com/free-icons/warning" title="warning icons">Warning icons created by Smashicons - Flaticon</a>
        </Stack>
    )
}

export default NotFound;