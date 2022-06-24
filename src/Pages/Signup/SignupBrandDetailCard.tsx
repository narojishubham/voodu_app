import { Card, Form, Input, notification, Typography } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
// import _ from "lodash";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../Shared/Redux/store";
import brandDataValidationService from "../../Shared/Redux/Actions/brand/brandDataValidation.service";
import CustomSelectAndSearchField from "../../Components/CustomSelectAndSearchField";
import addCategoriesAction from "../../Shared/Redux/Actions/brand/category/addCategory.action";
import getCategoriesAction, {
    GetCategoriesResponseType,
} from "../../Shared/Redux/Actions/brand/category/getCategory.action";
import _, { get } from "lodash";

function BrandDetailcard({ form }: any) {
    const { Text } = Typography;
    const [brandName, setBrandName] = useState("");
    const [website, setWebsite] = useState("");
    const [brandLoading, setBrandLoading] = useState(false);
    const [weblinkErr, setWeblinkErr] = useState(true);
    const [brandNameErr, setBrandNameErr] = useState(true);
    const dispatch = useAppDispatch();
    const navigate: NavigateFunction = useNavigate();

    const onFinish = () => {
        console.log("test", brandName, website);
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };
    const handleForm1Change = () => {
        setBrandNameErr(form.getFieldsError()[0].errors.length > 0 ? true : false);

        setWeblinkErr(form.getFieldsError().some(({ errors }: any) => errors.length));
    };
    const checkBrandName = (brandName: string) => {
        if (brandName !== "") {
            brandDataValidationService
                .brandNameValidatorService(brandName)
                .then((response: any) => {
                    setBrandLoading(false);
                })
                .catch((error: any) => {
                    setBrandLoading(false);
                    notification["error"]({
                        message: get(error, "response.data.message"),
                        description:
                            "The Brand Name entered has already been used. Please select a different Brand Name",
                    });
                    throw error;
                });
        }
    };

    const delayedQueryBrandName = useCallback(
        _.debounce((q: string) => checkBrandName(q), 300),
        []
    );

    const brandNameValidator = async (_: any, brandName: any) => {
        try {
            await brandDataValidationService.brandNameValidatorService(brandName);
            return Promise.resolve();
        } catch (error) {
            return Promise.reject(get(error, "response.data.message"));
        }
    };

    const [data, setData] = useState<GetCategoriesResponseType[] | any>([]);
    const categories = () => {
        dispatch(getCategoriesAction())
            .unwrap()
            .then((response) => {
                // console.log("getCategoriesAction resp", data);
                setData(response);
            })
            .catch((error) => {
                // setLoading(false);
                console.log("getCategoriesAction error", error);
            });
    };
    useEffect(() => {
        categories();
    }, []);

    return (
        <>
            <Card
                className={"global_box_shadow"}
                bodyStyle={{ padding: "2rem", textAlign: "center" }}
                style={{ width: "550px" }}
            >
                <Form
                    name="brandDetails"
                    labelCol={{ span: 24 }}
                    initialValues={{ remember: true }}
                    autoComplete="off"
                    style={{ textAlign: "left" }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    form={form}
                    onFieldsChange={handleForm1Change}
                >
                    <Form.Item
                        label={
                            <Text strong type="secondary">
                                Brand Name
                            </Text>
                        }
                        name="businessName"
                        rules={[
                            {
                                required: true,
                                message: "Brand Name is required!",
                            },
                            {
                                type: "string",
                                min: 3,
                                max: 50,
                                message: "Brand Name need to be between 3 to 50 characters in length.",
                            },
                            { validator: brandNameValidator },
                        ]}
                        validateTrigger={["onChange"]}
                        // validateStatus={
                        //     brandLoading && !brandNameErr
                        //         ? "validating"
                        //         : brandName !== ""
                        //         ? brandNameErr === true
                        //             ? "error"
                        //             : ""
                        //         : //   : brandNameExist === true
                        //           //   ? "error"
                        //           //   : "success"
                        //           ""
                        // }
                        hasFeedback
                    >
                        <Input
                            size="large"
                            placeholder={brandName ? "" : "Brand Name"}
                            defaultValue={brandName ? brandName : ""}
                            value={brandName}
                            onChange={(e) => {
                                setBrandLoading(true);
                                setBrandName(e.target.value);
                                delayedQueryBrandName(e.target.value);
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label={
                            <Text strong type="secondary">
                                Website
                            </Text>
                        }
                        name="website"
                        rules={[
                            {
                                required: true,
                                message: "Weblink is required!",
                            },
                            {
                                required: true,
                                type: "url",
                                message: "Invalid Web Link! Please enter in this format (https://www.mybusiness.com)",
                            },
                            {
                                max: 150,
                                message: "Weblink cannot exceed 150 characters in length.",
                            },
                        ]}
                        validateTrigger={["onChange"]}
                        hasFeedback
                    >
                        <Input
                            size="large"
                            placeholder={website ? "" : "https://www.mybusiness.com"}
                            defaultValue={website ? website : ""}
                            value={website}
                            onChange={(e) => {
                                setWebsite(e.target.value);
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label={
                            <Text strong type="secondary">
                                Category
                            </Text>
                        }
                        name="brandCategory"
                        rules={[
                            {
                                required: true,
                                message: "Category is required!",
                            },
                        ]}
                        validateTrigger={["onChange"]}
                        hasFeedback
                    >
                        <CustomSelectAndSearchField getData={data} />
                    </Form.Item>
                </Form>
            </Card>
        </>
    );
}
export default BrandDetailcard;
