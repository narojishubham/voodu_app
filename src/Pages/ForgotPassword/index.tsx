import React, { useState, useEffect } from "react";
import { Form, Input, Row, Typography, Card, message as msg, Image, Button } from "antd";
import { useNavigate } from "react-router-dom";
import "./ForgotPasswordPage.css";
import Logo_dark from "../../Assets/Logo/boom-logo.png";
import { useAppDispatch } from "../../Shared/Redux/store";
import forgotPasswordAction from "../../Shared/Redux/Actions/auth/forgotPassword.action";

interface NavigateFunction {
    (to: string, options?: { replace?: boolean; state?: any }): void;
    (delta: number): void;
}
export default function ForgotPasswordPage(): JSX.Element {
    const [loading, setLoading] = useState(false);
    const navigate: NavigateFunction = useNavigate();
    const dispatch = useAppDispatch();
    const { Text } = Typography;
    const [success, setSuccess] = useState(false);

    /**
     * Function called when resetting the password
     * @function onFinish
     * @param {string} email - Email id
     * @throws {string} - throws error when resetting password fails
     */
    const onFinish = async ({ email }: any) => {
        setLoading(true);
        try {
            const response = await dispatch(forgotPasswordAction({ email })).unwrap();
            msg.success("Password reset request sent successfully, Please check your email verify", 5);
            // navigate("/new-password");
            setLoading(false);
            setSuccess(true);
        } catch (error) {
            msg.error(`error while submitting: ${error}`, 2);
            setLoading(false);
        }
    };
    return (
        <Row style={{ height: "100vh", backgroundColor: "#f5f5f5" }} align="middle" justify="center">
            <Card
                className={"global_box_shadow"}
                bodyStyle={{
                    padding: "2rem",
                    textAlign: "center",
                    position: "relative",
                }}
                style={{ width: "400px" }}
            >
                {success ? (
                    <div>
                        {" "}
                        <Typography.Title level={4} style={{ marginTop: "2rem" }}>
                            Reset password link sent successfully
                        </Typography.Title>
                        <Typography.Text strong type="secondary">
                            Please check your email and click on the link.
                        </Typography.Text>
                    </div>
                ) : (
                    <>
                        {" "}
                        <div
                            style={{
                                position: "absolute",
                                top: "-2rem",
                                left: "0",
                                cursor: "pointer",
                            }}
                            onClick={() => navigate(-1)}
                        >
                            <Typography.Text type={"secondary"}>Go back</Typography.Text>
                        </div>
                        <Row align="middle" justify="center">
                            <Image width={"50%"} preview={false} src={Logo_dark} />
                        </Row>
                        <Typography.Title level={4} style={{ marginTop: "2rem" }}>
                            Forgot Password
                        </Typography.Title>
                        <Typography.Text strong type="secondary">
                            Please enter your email below to verify and get a reset mail.
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
                            <Form.Item>
                                <Button
                                    htmlType="submit"
                                    loading={loading}
                                    type="primary"
                                    size="large"
                                    style={{
                                        marginTop: "2rem",
                                        width: "100%",
                                        borderRadius: "0.5rem",
                                    }}
                                >
                                    Request Password Reset Link
                                </Button>
                            </Form.Item>
                        </Form>
                    </>
                )}
            </Card>
        </Row>
    );
}
