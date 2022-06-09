import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Form, Input, Row, Typography, Card, message as msg, Image, Button } from "antd";
import { useNavigate } from "react-router-dom";
import "./NewPasswordPage.css";
import Logo_dark from "../../Assets/Logo/boom-logo.png";
import { useAppDispatch } from "../../Shared/Redux/store";

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
    const onFinish = ({ email }: any) => {
        // setLoading(true);
        // console.log(email);
        // dispatch(forgot({ email }))
        //     .unwrap()
        //     .then(() => {
        //         msg.success("Password reset request sent successfully, Please check your email verify", 5);
        //         navigate("/");
        //         // window.location.reload();
        //     })
        //     .catch((error) => {
        //         setLoading(false);
        //         msg.error(`error while submitting: ${error}`, 2);
        //     });
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
                        label={
                            <Text strong type="secondary">
                                PASSWORD
                            </Text>
                        }
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: "Field required!",
                                validateTrigger: "onBlur",
                            },
                            {
                                min: 8,
                                message: "Password must be minimum 8 characters.",
                            },
                        ]}
                        validateTrigger={["onBlur"]}
                    >
                        <Input.Password
                            size="large"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label={
                            <Text strong type="secondary">
                                RETYPE PASSWORD
                            </Text>
                        }
                        name="retypPassword"
                        rules={[
                            {
                                required: true,
                                message: "Field required!",
                                validateTrigger: "onBlur",
                            },
                            {
                                min: 8,
                                message: "Password must be minimum 8 characters.",
                            },
                        ]}
                        validateTrigger={["onBlur"]}
                    >
                        <Input.Password
                            size="large"
                            placeholder="Retype Password"
                            value={retypePassword}
                            onChange={(e) => {
                                setRetypePassword(e.target.value);
                            }}
                        />
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
