import { Button, Card, Form, Image, Input, Row, Typography } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../Shared/Redux/store";
import Logo_dark from "../../Assets/Logo/boom-logo.png";
import { RouterPaths } from "../../api/RouterPaths";
import loginAction, { LoginParamsType } from "../../Shared/Redux/Actions/auth/login.action";

const LoginPage = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { Text } = Typography;

    const onFinish = async ({ email, password }: LoginParamsType) => {
        setLoading(true);
        // console.log(email, password);
        const response = await dispatch(loginAction({ email, password })).unwrap();
        // .then((response) => {
        try {
            const { token }: any = response;
            if (token) {
                localStorage.setItem("token", JSON.stringify(token));
            }
            // })
        } catch (error) {
            // .catch((error) => {
            setLoading(false);
            // });
        }
    };
    const onFinishFailed = (errorInfo: any) => {};

    return (
        <Card
            className={"global_box_shadow"}
            bodyStyle={{ padding: "2rem", textAlign: "center" }}
            style={{ width: "400px" }}
        >
            <Row align="middle" justify="center">
                <Image width={"50%"} preview={false} src={Logo_dark} />
            </Row>
            <Form
                name="basic"
                labelCol={{ span: 24 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                style={{ margin: "3rem 0 1rem", textAlign: "left" }}
            >
                <Form.Item
                    label={
                        <Text strong type="secondary">
                            EMAIL
                        </Text>
                    }
                    name="email"
                    rules={[{ type: "email", required: true, message: "Invalid email!" }]}
                >
                    <Input size="large" placeholder="Email Address" />
                </Form.Item>

                <Row style={{ position: "relative" }}>
                    <Form.Item
                        label={
                            <Text strong type="secondary">
                                PASSWORD
                            </Text>
                        }
                        name="password"
                        rules={[{ required: true, message: "Invalid password!" }]}
                        style={{ margin: 0, width: "100%" }}
                    >
                        <Input.Password size="large" placeholder="Password" />
                    </Form.Item>
                </Row>
                <Row justify={"end"}>
                    <Link to={"/" + RouterPaths.forgotPassword}>
                        <Typography.Text type={"secondary"}>Forgot password?</Typography.Text>
                    </Link>
                </Row>
                <Form.Item style={{ margin: "3rem 0 1rem" }}>
                    <Button
                        style={{ width: "100%", borderRadius: "0.5rem" }}
                        type="primary"
                        htmlType="submit"
                        loading={loading}
                        size="large"
                    >
                        Log in
                    </Button>
                </Form.Item>
            </Form>
            <Text strong type="secondary">
                Don't have an account?&nbsp;
                <Link to={"/" + RouterPaths.signup}>
                    <Typography.Link>Sign Up</Typography.Link>
                </Link>
            </Text>
        </Card>
    );
};

export default LoginPage;
