import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { RouterPaths } from "../../api/RouterPaths";
import { useSelector } from "react-redux";
import AppLayout from "../Layouts/AppLayout";
import { useEffect } from "react";
import loginWithTokenAction from "../../Shared/Redux/Actions/auth/loginWithToken.action";
import { RootState, useAppDispatch } from "../../Shared/Redux/store";

const AppPagesRoutes = () => {
    const dispatch = useAppDispatch();
    let userData = useSelector((state: RootState) => state.auth.userData);

    const location = useLocation();
    const navigate = useNavigate();
    const token = localStorage.getItem("theboom_token");

    useEffect(() => {
        console.log({ loggedIn: userData });
        if (!userData) {
            if (token) {
                dispatch(loginWithTokenAction()).unwrap();
            } else {
                console.log("logged is null");
                navigate(RouterPaths.login, { replace: true, state: { from: location } });
            }
        }
    }, [userData]);

    return (
        <AppLayout>
            <Outlet />
        </AppLayout>
    );
};

export default AppPagesRoutes;
