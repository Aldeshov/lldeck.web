import { createContext } from "react";
import User from "../models/User";

const UserContext = createContext<User>({ valid: false, name: "", avatar: "" });

export default UserContext;
