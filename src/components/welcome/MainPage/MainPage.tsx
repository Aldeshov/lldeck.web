import {Divider, Stack} from "@mui/material";
import {DefaultFooter} from "../Footer";
import React from "react";
import FirstSection from "./FirstSection/FirstSection";
import FourthSection from "./FourthSection/FourthSection";
import FifthSection from "./FifthSection/FifthSection";
import ThirdSection from "./ThirdSection/ThirdSection";
import SecondSection from "./SecondSection/SecondSection";
import {useQuery} from "../../../tools/extra";
import {SignIn, SignUp} from "../LoginModal";

const MainPage = () => {
    let query = useQuery();

    return (
        <React.Fragment>
            <SignIn show={query.get("login") === "1"}/>
            <SignUp show={query.get("register") === "1" && !query.get("login")}/>

            <Stack id="main" alignItems="center" justifyContent="space-around" spacing={8}
                   sx={{backgroundColor: 'white'}}>
                <FirstSection/>
                <SecondSection/>
                <ThirdSection/>
                <FourthSection/>
                <FifthSection/>
                <Divider flexItem/>
                <DefaultFooter/>
            </Stack>
        </React.Fragment>
    )
}

export default MainPage
