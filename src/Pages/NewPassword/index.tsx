import React, { useState, useEffect } from "react";
import { Form, Input, Row, Typography, Card, message as msg, Image, Button } from "antd";
import { useNavigate } from "react-router-dom";
import "./NewPasswordPage.css";
import Logo_dark from "../../Assets/Logo/boom-logo.png";
import { useAppDispatch } from "../../Shared/Redux/store";
import resetPasswordAction from "../../Shared/Redux/Actions/auth/resetPassword.action";

interface NavigateFunction {
    (to: string, options?: { replace?: boolean; state?: any }): void;
    (delta: number): void;
}
export default function NewPasswordPage(): JSX.Element {
    const [loading, setLoading] = useState(false);
    const navigate: NavigateFunction = useNavigate();
    const [password, setPassword] = useState("");
    const [retypePassword, setRetypePassword] = useState("");
    const dispatch = useAppDispatch();
    const { Text } = Typography;
    /**
     * Sends a password reset request
     * @function onFinish
     * @param {string} email - Email id
     * @throws When password request fails
     */
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const data = {
        token: params.get("token"),
    };
    const token = data?.token;
    const onFinish = ({ password, confirmPassword }: any) => {
        setLoading(true);
        // console.log(password);
        if (token)
            dispatch(resetPasswordAction({ token, password, confirmPassword }))
                .unwrap()
                .then(() => {
                    msg.success("Password reset successfully");
                    navigate("/");
                })
                .catch((error: any) => {
                    setLoading(false);
                    msg.error(`error while submitting: ${error}`, 2);
                });
    };

    //const onFinishFailed = () => {};

    return (
        <Row style={{ height: "100vh", backgroundColor: "#f5f5f5" }} align="middle" justify="center">
            <Card
                className={"global_box_shadow"}
                bodyStyle={{ padding: "2rem", textAlign: "center" }}
                style={{ width: "400px" }}
            >
                <Row align="middle" justify="center">
                    <Image width={"50%"} preview={false} src={Logo_dark} />
                </Row>
                <Typography.Title level={3}>New Password</Typography.Title>
                <Typography.Text strong type="secondary">
                    Enter your new password below
                </Typography.Text>
                <Form
                    name="basic"
                    labelCol={{ span: 24 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    //onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    style={{ margin: "3rem 0 1rem", textAlign: "left" }}
                >
                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: "Please input your password!",
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="confirmPassword"
                        label="Confirm Password"
                        dependencies={["password"]}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: "Please confirm your password!",
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue("password") === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(
                                        new Error("The two passwords that you entered do not match!")
                                    );
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item>
                        <Button htmlType="submit" loading={loading} size="large">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </Row>
    );
}
