import { useAuth } from '../context/AuthContext';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';// Layout Component


export default function Layout() {
    const { currentUser, logout} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();     // get the current route

    async function handleLogout() {
        try {
            await logout();
            navigate('/');                  // redirect to the (main) search page after Logout
        } catch (error) {
            console.error("Failed to log out", + error);
        }   
    }

    // check if we are on the Login page
    const isLoginPage = location.pathname === "/login";


    return (
        <>
            <header>
                <h1><a href="/">Movie Tracker</a></h1>
                <nav>
                    <ul>
                        {isLoginPage ? ( // if on login page, show only search link to come back
                            <li><Link to="/">Search</Link></li>
                        ) : (
                            <>
                                {currentUser ? (
                                    <>
                                        <li><Link to="/">Search</Link></li>
                                        <li><Link to={`/watchlist/${currentUser.email}`}>Watchlist</Link></li>           {/* create personalized path depending on user email */}
                                        <li><Link to={`/watched/${currentUser.email}`}>Watched</Link></li>
                                        <li><button onClick={handleLogout}>Logout</button></li>
                                    </>
                                ) : (
                                    <li><Link to="/login">Login</Link></li>              // the only navigation option users sees when not logged in
                                )}
                            </>
                        )}
                    </ul>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
            <footer role="contentinfo">
                <p>Built by two movie lovers, just for you! &copy; 2025 Movie Tracker.</p>
            </footer>            
        </>
    )
}