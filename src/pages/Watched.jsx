import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


export default function Watched() {
    const {userEmail} = useParams();        // get user email from URL
    const { currentUser} = useAuth();

    // Prevent users from viewing someone else's list
    if (!currentUser || currentUser.email !== userEmail) {
        return <Navigate to="/login" replace />;
    }
    
    return (
        <>
            <h1>{userEmail}'s Watched List</h1>
            <p>Your personalized watched list.</p>
        </>
    )
}