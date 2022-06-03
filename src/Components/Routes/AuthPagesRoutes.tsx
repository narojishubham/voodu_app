import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { RouterPaths } from "../../api/RouterPaths";
import { useSelector } from "react-redux";
import { RootState } from "../../Shared/Redux/store";
import AuthLayout from "../Layouts/AuthLayout";
import { useEffect } from "react";

const AuthPagesRoutes = () => {
    const userData = useSelector((state: RootState) => state.auth.userData);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        console.log({ loggedIn: userData });
        if (userData) {
            console.log("logged is null");
            // navigate( location.pathname ||RouterPaths.root, { replace: true});
            navigate(RouterPaths.root, { replace: true });
        }
    }, [userData]);

    return (
        <AuthLayout>
            <Outlet />
        </AuthLayout>
    );
};

export default AuthPagesRoutes;
