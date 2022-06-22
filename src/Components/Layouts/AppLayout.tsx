import React, { ReactNode, useState, useEffect, createContext } from "react";
import { Layout, Menu, Row, Image, Col, Typography, message, Divider, Modal, Avatar, Space } from "antd";
import {
    PieChartOutlined,
    MenuUnfoldOutlined,
    SettingOutlined,
    PlayCircleOutlined,
    TeamOutlined,
} from "@ant-design/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../Partials/Button";
import Logo_light from "../../Assets/Logo/boom-logo-white.png";
import { RootState, useAppDispatch } from "../../Shared/Redux/store";
import { RouterPaths } from "../../api/RouterPaths";
import { logoutAction } from "../../Shared/Redux/Actions/auth/logout.action";
import { useSelector } from "react-redux";
import getProfileDataAction from "../../Shared/Redux/Actions/profile/getProfile.action";

export let ProfileContext: any;
const AppLayout: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    const dispatch = useAppDispatch();
    const [collapsed, setCollapsed] = useState(false);
    const switchCollapsed = () => setCollapsed(!collapsed);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [reload, setReload] = useState({});
    ProfileContext = createContext(setReload);
    let poster = useSelector((state: RootState) => state);
    // console.log("accountId", poster);
    const onLogout = () => {
        Modal.confirm({
            title: "Confirm",
            content: "Are you sure you want to Logout ",
            okText: "Yes",
            cancelText: "No",
            onOk: () => {
                setLoading(true);
                dispatch(logoutAction());
                message.success("You are logged out successfully", 2);
                setLoading(false);
            },
        });
    };

    const [profileImage, setProfileImage] = useState("");
    const getProfileData = async () => {
        try {
            const resp = await dispatch(getProfileDataAction()).unwrap();
            setProfileImage(resp.data.account.poster.urls.original);
        } catch (error) {}
    };
    useEffect(() => {
        getProfileData();
    }, []);

    const location = useLocation();
    const pageNavPath = location.pathname.split("/")[1];
    console.log("pathname", pageNavPath);
    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Layout.Sider
                collapsible
                collapsed={collapsed}
                onCollapse={switchCollapsed}
                style={{
                    overflow: "auto",
                    height: "100vh",
                }}
            >
                <Row align="middle" justify="center">
                    <Image
                        style={{
                            padding: collapsed ? "1rem 0rem 0px" : "1rem 1rem 0px",
                            transition: "0.3s ease-in-out",
                        }}
                        preview={false}
                        src={Logo_light}
                    />
                </Row>
                <Menu theme="dark" selectedKeys={[`${pageNavPath}/`]} mode="inline">
                    <Menu.Item key={RouterPaths.overview} icon={<PieChartOutlined />}>
                        <Link to={RouterPaths.overview}>Overview</Link>
                    </Menu.Item>
                    <Menu.Item key={RouterPaths.videoLibrary} icon={<PlayCircleOutlined />}>
                        <Link to={RouterPaths.videoLibrary}>Video Library</Link>
                    </Menu.Item>
                    <Menu.Item key={RouterPaths.playlists} icon={<MenuUnfoldOutlined />}>
                        <Link to={RouterPaths.playlists}>Playlists</Link>
                    </Menu.Item>
                    <Divider
                        style={{
                            background: "#fff4",
                            minWidth: "90%",
                            width: "90%",
                            margin: "1.5rem auto 0",
                        }}
                    />
                    <Menu.Item key={RouterPaths.profile} icon={<TeamOutlined />}>
                        <Link to={RouterPaths.profile}>Profile</Link>
                    </Menu.Item>
                    <Menu.Item key={RouterPaths.settings} icon={<SettingOutlined />} disabled>
                        <Link to={RouterPaths.settings}>Settings</Link>
                    </Menu.Item>
                </Menu>
            </Layout.Sider>

            <Layout className="site-layout" style={{ height: "100vh" }}>
                <Layout.Header className="site-layout-background" style={{ padding: "0 1.5rem", background: "none" }}>
                    <Row align="middle" wrap={false}>
                        <Col
                            flex="auto"
                            style={{
                                paddingTop: "10px",
                            }}
                        >
                            <Typography.Title level={3} style={{ textTransform: "capitalize", paddingLeft: "0.5rem" }}>
                                {pageNavPath.split("-").join(" ")}
                            </Typography.Title>
                        </Col>
                        <Col>
                            <Space>
                                <Col flex={1} style={{ padding: 0 }}>
                                    <Typography.Text>{/*<strong>{brandName}</strong>*/}</Typography.Text>
                                </Col>
                                <Col flex={1} style={{ padding: 0 }}>
                                    <Avatar style={{ width: "32px", height: "32px" }} src={profileImage} />
                                </Col>
                                <Col flex={1} style={{ padding: 0, marginRight: "0.5vw" }}>
                                    <Button loading={loading} onClick={onLogout}>
                                        Logout
                                    </Button>
                                </Col>
                                {/*<Col flex={1}>*/}
                                {/*  <FontAwesomeIcon icon={faCircleUser} size={"2x"}  />*/}
                                {/*</Col>*/}
                            </Space>
                        </Col>
                    </Row>
                </Layout.Header>
                <Layout.Content style={{ margin: "0 16px", overflow: "hidden" }}>
                    {/*<Breadcrumb style={{ margin: '16px 0' }}>*/}
                    {/*<Breadcrumb.Item>User</Breadcrumb.Item>*/}
                    {/*<Breadcrumb.Item>Bill</Breadcrumb.Item>*/}
                    {/*</Breadcrumb>*/}
                    <div
                        className="site-layout-background"
                        style={{
                            // background: pageTitle !== "profile" ? "#fff" : "none",
                            // minWidth: 1100,
                            borderRadius: "0.5rem",
                            padding: "1rem",
                            minHeight: 360,
                            height: "100%",
                            // height: "100vh",
                            overflow: "auto",
                        }}
                    >
                        <ProfileContext.Provider value={{ setReload }}>{children}</ProfileContext.Provider>
                    </div>
                </Layout.Content>
                <Layout.Footer style={{ textAlign: "center", padding: "1rem" }}>Magik ©2022</Layout.Footer>
            </Layout>
        </Layout>
    );
};

export default AppLayout;
