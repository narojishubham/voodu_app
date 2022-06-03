import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { RouterPaths } from "../../api/RouterPaths";
import { useSelector } from "react-redux";
import { RootState } from "../../Shared/Redux/store";
import AppLayout from "../Layouts/AppLayout";
import { useEffect } from "react";

const AppPagesRoutes = () => {
    let userData = useSelector((state: RootState) => state.auth.userData);

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        console.log({ loggedIn: userData });
        if (!userData) {
            console.log("logged is null");
            navigate(RouterPaths.login, { replace: true, state: { from: location } });
        }
    }, [userData]);

    return (
        <AppLayout>
            <Outlet />
        </AppLayout>
    );
};

export default AppPagesRoutes;
