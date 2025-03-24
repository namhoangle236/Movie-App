import { useAuth } from '../context/AuthContext';
import { Outlet, Navigate, useLocation } from 'react-router-dom';// Layout Component

export default function ProtectedRoute() {
    const { currentUser } = useAuth();
    const location = useLocation();

    if (!currentUser) {
        return <Navigate to="/login" state={{ from: location}} replace />
    }

    return <Outlet />
}


// study note:
// the whole component makes sure that the user cannot access pages that require to be logged in
// even though the user cannot see links to this pages, they still can type path to this pages
// if <currentUser> is null, they are redirected to /login;
// 'replace' prevents "location" from being stored in browser history,
// so if the user presses the back button in the browser after being redirected:
// they will return to the page they were on before trying to visit the protected page (not the protected page itself).
// at the same time, state={{ from: location }} saves the page they originally tried to visit, so we can use it after login.

// =========================================================================================================================

// Example before navigating to /login:
// {
//     "pathname": "/dashboard",
//     "search": "",
//     "hash": "",
//     "state": undefined
//   }

// After navigating to /login, and passing the current location to the 'state' key of the login route:
// {
//     "pathname": "/login",      // Current route (after navigation)
//     "search": "",              // Query string (if any)
//     "hash": "",                // Fragment (if any)
//     "state": {                 // The state passed during navigation
//       "from": {                // The `from` key holds the previous location
//         "pathname": "/dashboard",  // The previous route the user was on
//         "search": "",
//         "hash": "",
//         "state": undefined      // No state passed from /dashboard
//       }
//     }
//   }
  
  