import { Navigate, Outlet } from "react-router-dom";
import { RouterPaths } from "../../api/RouterPaths";
import { useSelector } from "react-redux";
import { RootState } from "../../Shared/Redux/store";
import AuthLayout from "../Layouts/AuthLayout";

const AuthPagesRoutes = () => {
    let loggedIn = useSelector((state: RootState) => state.auth.userData);
    if (loggedIn) {
        return <Navigate to={RouterPaths.root} replace />;
    }

    return (
        <AuthLayout>
            <Outlet />
        </AuthLayout>
    );
};

export default AuthPagesRoutes;
