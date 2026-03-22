import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function OpenRoute({ children, restricted = false }) {
    const { token } = useSelector((state) => state.auth);

    if (restricted && token) {
        return <Navigate to="/dashboard/my-profile" />;
    }
    return children;
}

export default OpenRoute;
