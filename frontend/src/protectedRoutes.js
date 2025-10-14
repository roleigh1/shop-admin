import { Navigate } from "react-router-dom";
import { useMyContext } from "./ContextApi";

export default function PrivateRoutes({ children }) {
    const { user } = useMyContext();

    if (!user || !user.userId) {
        console.log("Not authenticated, redirecting to login");
        return <Navigate to="/" replace />;
    }


    return children;
}