import React, {createContext} from "react";
import LocalUser from "../models/LocalUser";

const UserContext = createContext<{ user: LocalUser, setUser: React.Dispatch<React.SetStateAction<LocalUser>> }>({} as any);

export default UserContext;
