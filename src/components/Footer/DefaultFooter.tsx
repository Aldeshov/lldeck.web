import { Divider, Link, Stack, Typography } from "@mui/material";

const DefaultFooter = () => {
    return (
        <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            divider={<Divider orientation="vertical" flexItem />}
            style={{ margin: 25 }}
            spacing={2}>

            <Typography variant="body1" component="div">
                LLDeck - Diploma project (Knowledge Deck)
            </Typography>

            <Typography variant="body1" component="div">
                © Azat Aldeshov
            </Typography>

            <Typography variant="body1" component="div">
                Source code:&nbsp;
                <Link target="_blank" href="https://github.com/Aldeshov/lldeck" underline="none" >
                    GitHub
                </Link>
            </Typography>
        </Stack>
    )
}

export default DefaultFooter;