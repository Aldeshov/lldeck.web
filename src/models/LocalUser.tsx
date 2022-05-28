import User from "./api/User";
import Profile from "./api/Profile";

export default interface LocalUser {
    ready: boolean;
    user?: User;
    profile?: Profile;
}
