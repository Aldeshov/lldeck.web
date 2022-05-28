import {Box, Chip, Link, Stack, Typography} from "@mui/material";
import {ReactComponent as Django} from './vectors/Django.svg'
import {ReactComponent as React} from './vectors/React.svg'
import {ReactComponent as Figma} from './vectors/Figma.svg'


const DefaultFooter = () => {
    return (
        <Stack width="95%" direction="row" flexWrap="wrap" sx={{justifyContent: {xs: "start", md: "center"}}}
               alignItems="center" spacing={2}>
            <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center"
                 sx={{m: {xs: "auto", sm: 0}}}>
                <Chip color="primary" label="LLDeck - Diploma project (Knowledge Deck)" sx={{m: 1}}/>

                <Typography variant="body2" component="div" mb={1}>
                    <Link target="_blank" href="https://kbtu.edu.kz/en/">
                        Kazakh-British Technical University
                    </Link>, Almaty 2022
                </Typography>
            </Box>

            <Box display="flex" flexDirection="column" alignItems="start" justifyContent="center" p={2}>
                <Stack direction="row" spacing={2} alignItems="center" mb={1}>
                    <Chip color="primary" variant="outlined" size="small" icon={<Django/>} label="Back-end"/>
                    <Chip color="primary" variant="outlined" size="small" icon={<React/>} label="Front-end"/>
                </Stack>

                <Typography variant="body2" component="div" mb={1}>
                    Back-end & Front-end
                    written by <Link target="_blank" href="https://github.com/Aldeshov">Azat Aldeshov</Link>
                </Typography>

                <Typography variant="body2" component="div">
                    Source codes:
                    &nbsp;
                    <Link target="_blank" href="https://github.com/Aldeshov/lldeck.api">Backend GitHub</Link>
                    &nbsp;
                    &
                    &nbsp;
                    <Link target="_blank" href="https://github.com/Aldeshov/lldeck.web">Frontend GitHub</Link>
                </Typography>
            </Box>

            <Box display="flex" flexDirection="column" alignItems="start" justifyContent="center" p={2}>
                <Chip color="primary" variant="outlined" size="small" icon={<Figma/>} label="Design" sx={{mb: 1}}/>

                <Typography variant="body2" component="div" mb={1}>
                    Designed by <Link target="_blank" href="https://t.me/rdiannr">Diana Bolat</Link>
                </Typography>

                <Typography variant="body2" component="div">
                    Source design:&nbsp;
                    <Link target="_blank"
                          href="https://www.figma.com/file/40TAmWwt2co1b1jqAimw5D/Knowledge-Deck?node-id=27%3A18">
                        Figma
                    </Link>
                </Typography>
            </Box>
        </Stack>
    )
}

export default DefaultFooter;
