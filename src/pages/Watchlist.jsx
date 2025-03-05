import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


export default function Watchlist() {
    const {userEmail} = useParams();          // get user email from URL
    const { currentUser} = useAuth();

    // Prevent users from viewing someone else's list
    if (!currentUser || currentUser.email !== userEmail) {
        return <Navigate to="/login" replace />;
    }

    return (
        <>
            <h1>{userEmail}'s Watchlist</h1>
            <p>your personalized Watchlist.</p>
        </>
    )
}