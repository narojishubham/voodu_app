import { Card, Form, Input, notification, Row, Steps, Typography } from "antd";
import PhoneInputWithCountry from "react-phone-number-input";
import React, { useCallback, useEffect, useState } from "react";
import CustomSelectAndSearchField from "../../Components/CustomSelectAndSearchField";
import getCategoriesAction from "../../Shared/Redux/Actions/brand/category/getCategory.action";
import { useAppDispatch } from "../../Shared/Redux/store";
import getDesignationsAction, {
    GetDesignationResponseType,
} from "../../Shared/Redux/Actions/brand/designation/getDesignation.action";
import brandDataValidationService from "../../Shared/Redux/Actions/brand/brandDataValidation.service";
import _, { get } from "lodash";
import { SmileOutlined } from "@ant-design/icons";

function SignupUserDetailCard({ form }: any) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const [emailId, setEmailId] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [emailLoading, setEmailLoading] = useState(false);
    const [phoneLoading, setPhoneLoading] = useState(false);
    const [emailErr, setEmailErr] = useState(true);
    const [phoneErr, setPhoneErr] = useState(true);
    const [validPhoneErr, setValidPhoneErr] = useState(true);

    const dispatch = useAppDispatch();
    const { Text } = Typography;
    const { Step } = Steps;
    const [form1] = Form.useForm();

    const [success, setSuccess] = useState(false);
    const [confirmPassErr, setConfirmPassErr] = useState(false);
    const [options, setOptions] = useState([]);
    const onFinish = () => {
        setLoading(true);
        // console.log(
        //     firstName,
        //     lastName,
        //     emailId,
        //     password,
        //     //   category,
        //     //   designation,
        //     phone
        // );
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };
    const handleForm2Change = () => {
        if (form.getFieldsValue().email) {
            setEmailErr(form.getFieldsError()[3].errors.length > 0 ? true : false);
        }
        if (form1.getFieldsValue().phone) {
            setPhoneErr(form.getFieldsError()[4].errors.length > 0 ? true : false);
        }
        if (form.getFieldsValue().confirm) {
            setConfirmPassErr(form.getFieldsError()[6].errors.length > 0 ? true : false);
        }
    };
    const delayedQueryEmail = useCallback(
        _.debounce((q) => checkEmail(q), 300),
        []
    );

    const clearMsg = () => {
        // dispatch(clearMessage());
    };
    const checkEmail = (emailId: string) => {
        if (emailId !== "") {
            brandDataValidationService
                .emailValidatorService(emailId)
                .then((response: any) => {
                    setEmailLoading(false);
                })
                .catch((error: any) => {
                    // console.log("error 12", error.message);
                    setEmailLoading(false);
                    // if (error.message === "Email already exists")
                    notification["error"]({
                        message: get(error, "response.data.message"),
                        description: "The Email Id entered has already been used. Please select a different Email Id",
                    });
                });
        }
    };
    const brandEmailValidator = async (_: any, emailId: any) => {
        try {
            await brandDataValidationService.emailValidatorService(emailId);
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(get(error, "response.data.message"));
        }
    };
    const checkPhone = (phone: string) => {
        if (phone) {
            brandDataValidationService
                .phoneValidatorService(phone)
                .then((response: any) => {
                    setPhoneLoading(false);
                })
                .catch((error: any) => {
                    setPhoneLoading(false);
                    notification["error"]({
                        message: error.message,
                        description:
                            "The Phone Number entered has already been used. Please select a different Phone Number",
                    });
                });
        }
    };
    const delayedQueryPhone = useCallback(
        _.debounce((q: string) => checkPhone(q), 300),
        []
    );
    const [data, setData] = useState<GetDesignationResponseType[] | any>([]);
    const designations = () => {
        dispatch(getDesignationsAction())
            .unwrap()
            .then((response) => {
                setData(response);
            })
            .catch((error) => {
                setLoading(false);
                console.log("getCategoriesAction error", error);
            });
    };
    useEffect(() => {
        designations();
    }, []);

    return (
        <>
            <Card
                className={"global_box_shadow"}
                bodyStyle={{ padding: "2rem", textAlign: "center" }}
                style={{ width: "550px" }}
            >
                <Form
                    name="userDetails"
                    labelCol={{ span: 24 }}
                    initialValues={{ remember: true }}
                    autoComplete="off"
                    style={{ textAlign: "left" }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    form={form}
                    onFieldsChange={handleForm2Change}
                >
                    <Form.Item
                        label={
                            <Text strong type="secondary">
                                FIRST NAME
                            </Text>
                        }
                        name="firstName"
                        rules={[
                            {
                                required: true,
                                message: "First name required!",
                                validateTrigger: "onChange",
                            },
                            {
                                type: "string",
                                max: 50,
                                message: "First Name cannot exceed 50 characters in length.",
                            },
                            {
                                pattern: /^[a-zA-Z '.]*$/,
                                message: "First name can only contain alphabets, spaces and period.",
                            },
                        ]}
                        validateTrigger={["onChange"]}
                        hasFeedback
                    >
                        <Input
                            size="large"
                            placeholder={firstName ? "" : "First Name"}
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            defaultValue={firstName ? firstName : ""}
                        />
                    </Form.Item>
                    <Form.Item
                        label={
                            <Text strong type="secondary">
                                LAST NAME
                            </Text>
                        }
                        name="lastName"
                        rules={[
                            {
                                required: true,
                                message: "Last name required!",
                                validateTrigger: "onChange",
                            },
                            {
                                type: "string",
                                max: 50,
                                message: "Last Name cannot exceed 50 characters in length.",
                            },
                            {
                                pattern: /^[a-zA-Z '.]*$/,
                                message: "Last name can only contain alphabets, spaces and period.",
                            },
                        ]}
                        validateTrigger={["onChange"]}
                        hasFeedback
                    >
                        <Input
                            size="large"
                            placeholder={lastName ? "" : "Last Name"}
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            defaultValue={lastName ? lastName : ""}
                        />
                    </Form.Item>
                    <Form.Item
                        label={
                            <Text strong type="secondary">
                                DESIGNATION
                            </Text>
                        }
                        name="designationId"
                        rules={[
                            {
                                required: true,
                                message: "Designation is required!",
                            },
                        ]}
                        validateTrigger={["onChange"]}
                        hasFeedback
                    >
                        <CustomSelectAndSearchField getData={data} />
                    </Form.Item>
                    <Form.Item
                        label={
                            <Text strong type="secondary">
                                EMAIL
                            </Text>
                        }
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "Email Id field is requires",
                                validateTrigger: "onChange",
                            },
                            {
                                type: "string",
                                max: 50,
                                message: "Email Id cannot exceed 50 characters in length.",
                            },
                            {
                                pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+\.[a-z]{2,3}$/gm,
                                message: "Please enter email id in this valid format (abcd@mail.com)",
                            },
                            { validator: brandEmailValidator },
                        ]}
                        hasFeedback
                        validateTrigger={["onChange"]}
                        // validateStatus={
                        //     emailLoading && !emailErr
                        //         ? "validating"
                        //         : emailId !== ""
                        //         ? !emailErr === true
                        //             ? "error"
                        //             : ""
                        //         : // : emailExist === true
                        //           // ? "error"
                        //           // : "success"
                        //           ""
                        // }
                    >
                        <Input
                            size="large"
                            placeholder={emailId ? "" : "Email Address"}
                            value={emailId}
                            onChange={(e) => {
                                setEmailLoading(true);
                                setEmailId(e.target.value);
                                delayedQueryEmail(e.target.value);
                                // console.log("test email value", emailId);
                                clearMsg();
                            }}
                            defaultValue={emailId ? emailId : ""}
                        />
                    </Form.Item>
                    <Form.Item
                        name="phone"
                        label={
                            <Text strong type="secondary">
                                PHONE NUMBER
                            </Text>
                        }
                        rules={[
                            {
                                required: true,
                                message: "Phone number is required",
                            },
                        ]}
                        hasFeedback
                        validateTrigger={["onChange"]}
                        validateStatus={
                            phone
                                ? phoneLoading && !phoneErr
                                    ? "validating"
                                    : phoneErr === true && validPhoneErr === true
                                    ? //           phoneExist === true) ||
                                      //         (phoneErr === true &&
                                      //           validPhoneErr  === false) //
                                      // //           phoneExist === false) ||
                                      //         (phoneErr === true &&
                                      //           !validPhoneErr === true)
                                      //         //   phoneExist === true) ||
                                      //         (phoneErr === true &&
                                      //           !validPhoneErr=== false)
                                      // //           phoneExist === false) ||
                                      //         (phoneErr === false &&
                                      //           validPhoneErr === true)
                                      // //           phoneExist === true) ||
                                      //         (phoneErr === false &&
                                      //           !validPhoneErr === true)
                                      // //           phoneExist === true) ||
                                      //         (phoneErr === false &&
                                      //           !validPhoneErr === false)
                                      //           phoneExist === false)
                                      //   "error"
                                      // : "success"
                                      "success"
                                    : "error"
                                : ""
                        }
                    >
                        <Row className="phoneNumberCustomField">
                            <PhoneInputWithCountry
                                style={{
                                    width: "100%",
                                }}
                                limitMaxLength={true}
                                reset
                                international
                                placeholder={phone ? "" : "Phone Number"}
                                defaultCountry={"IN"}
                                //value={phone}
                                // delayedQueryPhone(value)
                                onChange={(value: any) => {
                                    console.log(value.length);
                                    delayedQueryPhone(value);
                                }}
                            />
                        </Row>
                    </Form.Item>
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
                                message: "Password required!",
                                validateTrigger: "onChange",
                            },
                            {
                                min: 8,
                                max: 50,
                                message: "Password must be minimum 8 characters and maximum 50.",
                            },
                        ]}
                        validateTrigger={["onChange"]}
                        hasFeedback
                    >
                        <Input.Password
                            size="large"
                            placeholder={password ? "" : "Password"}
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            defaultValue={password ? password : ""}
                        />
                    </Form.Item>
                    <Form.Item
                        label={
                            <Text strong type="secondary">
                                CONFIRM PASSWORD
                            </Text>
                        }
                        name="confirm"
                        dependencies={["password"]}
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
                        validateTrigger={["onChange"]}
                        hasFeedback
                    >
                        <Input.Password
                            size="large"
                            placeholder={confirmPassword ? "" : "Confirm Password"}
                            value={confirmPassword}
                            onChange={(e: any) => {
                                setConfirmPassword(e.target.value);
                            }}
                            defaultValue={confirmPassword ? confirmPassword : ""}
                        />
                    </Form.Item>
                </Form>
            </Card>
        </>
    );
}

export default SignupUserDetailCard;
