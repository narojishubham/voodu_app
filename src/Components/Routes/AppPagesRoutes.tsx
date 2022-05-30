import { Navigate, Outlet, useLocation } from "react-router-dom";
import { RouterPaths } from "../../api/RouterPaths";
import { useSelector } from "react-redux";
import { RootState } from "../../Shared/Redux/store";
import AppLayout from "../Layouts/AppLayout";

const AppPagesRoutes = () => {
    let loggedIn = useSelector((state: RootState) => state.auth.userData);
    const location = useLocation();

    if (!loggedIn) {
        return <Navigate to={RouterPaths.login} state={{ from: location }} replace />;
    }

    return (
        <AppLayout>
            <Outlet />
        </AppLayout>
    );
};

export default AppPagesRoutes;
