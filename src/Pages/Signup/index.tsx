import React, { useState } from "react";
import { Steps, Form, Row, Typography, Card, Image, Col } from "antd";
import "react-phone-number-input/style.css";
import _, { get, toString } from "lodash";
import "./SignUpPage.css";
import Logo_dark from "../../Assets/Logo/boom-logo.png";
// import Button from "../../components/Partials/Button";
import BrandDetailcard from "./SignupBrandDetailCard";
import SignupUserDetailCard from "./SignupUserDetailCard";
import PricingPlanPage from "./PricingPlanPage";
import {
    signUpStepValidationStepOneAction,
    signUpStepValidationStepThreeAction,
    signUpStepValidationStepTwoAction,
} from "../../Shared/Redux/Actions/auth/signup.action";
import SuccessMessage from "../../Components/SuccessMessage";
import Button from "../../Components/Partials/Button";

export default function SignUpPage(): JSX.Element {
    const { Step } = Steps;
    const [success, setSuccess] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [finalData, setFinalData] = useState({});
    const [BrandDetailCardForm] = Form.useForm();
    const [UserDetailCardForm] = Form.useForm();
    const [PricingPlanPageForm] = Form.useForm();
    const [brandName, setBrandName] = useState();
    const steps = {
        1: {
            title: "Step 1",
            description: "Enter Your Brand Details",
            component: BrandDetailcard,
            form: BrandDetailCardForm,
        },
        2: {
            title: "Step 2",
            description: "Enter Your Details",
            component: SignupUserDetailCard,
            form: UserDetailCardForm,
        },
        3: {
            title: "Step 3",
            description: "Select Your Plan",
            component: PricingPlanPage,
            form: PricingPlanPageForm,
        },
    };

    const NextButton = () => {
        const isLastStep = Object.keys(steps).length === currentStep;
        const onNextClick = async () => {
            // try {
            //   const fields = await get(steps, `${currentStep}.form`).validateFields();
            //   setFinalData((s) => ({ ...s, ...fields }));
            //   console.log("final data", fields.brandCategory);
            //   await authService.signUpStepValidation({
            //     ...fields,
            //     step: toString(currentStep),
            //   });
            //   !isLastStep && setCurrentStep(currentStep + 1);
            // } catch (error) {
            //   console.log("Validtion Error", error);
            // }

            if (currentStep === 1) {
                try {
                    const fields = await get(steps, `${currentStep}.form`).validateFields();
                    setBrandName(fields.businessName);
                    setFinalData((s) => ({ ...s, ...fields }));
                    console.log("final data", fields);
                    await signUpStepValidationStepOneAction({
                        ...fields,
                        step: toString(currentStep),
                    });
                    !isLastStep && setCurrentStep(currentStep + 1);
                } catch (error) {
                    console.log("Validtion Error", error);
                }
            }
            if (currentStep === 2) {
                try {
                    const fields = await get(steps, `${currentStep}.form`).validateFields();
                    setFinalData((s) => ({ ...s, ...fields }));
                    console.log("final User data", fields);
                    await signUpStepValidationStepTwoAction({
                        ...fields,
                        brandName,
                        step: toString(currentStep),
                    });
                    !isLastStep && setCurrentStep(currentStep + 1);
                } catch (error) {
                    console.log("Validtion Error", error);
                }
            }
            if (currentStep === 3) {
                try {
                    const fields = await get(steps, `${currentStep}.form`).validateFields();
                    setFinalData((s) => ({ ...s, ...fields }));
                    console.log(" Payment Card data", fields.brandCategory);
                    await signUpStepValidationStepThreeAction({
                        ...fields,
                        brandName,
                        step: toString(currentStep),
                    });
                    !isLastStep && setCurrentStep(currentStep + 1);
                } catch (error) {
                    console.log("Validtion Error", error);
                }
            }
        };
        return (
            <Button block={false} style={{ margin: "0 8px" }} onClick={onNextClick}>
                {isLastStep ? "Done" : "Next"}
            </Button>
        );
    };

    const PreviousButton = () => {
        if (currentStep === 1) return null;
        return (
            <Button block={false} style={{ margin: "0 8px" }} onClick={() => setCurrentStep((s) => s - 1)}>
                Previous
            </Button>
        );
    };

    return (
        <Row style={{ backgroundColor: "#f5f5f5" }} align="middle" justify="center">
            <Card
                className={"global_box_shadow"}
                bodyStyle={{ padding: "2rem", textAlign: "center" }}
                style={{ width: "1200px" }}
            >
                <Image width={"12rem"} preview={false} src={Logo_dark} />
                <Typography.Title level={3}></Typography.Title>
                <Steps current={currentStep - 1}>
                    {Object.keys(steps).map((step: any) => (
                        <Step
                            key={step}
                            title={get(steps, `${step}.title`)}
                            description={get(steps, `${step}.description`)}
                        />
                    ))}
                </Steps>
                {success ? (
                    <SuccessMessage
                        Usertitle={"Registration Successful. Proceed to Verify."}
                        UsersubTitle={
                            "An email has been sent to your registered email ID to verify your account. Please click on the link to verify your account. This link is valid for 24 hours only."
                        }
                    />
                ) : (
                    <>
                        <Row align="middle" justify="center" style={{ margin: "9vh 0", flexDirection: "column" }}>
                            <Col>
                                {React.createElement(get(steps, `${currentStep}.component`), {
                                    form: get(steps, `${currentStep}.form`),
                                })}
                            </Col>
                            <Col className="steps-action">
                                <PreviousButton />
                                <NextButton />
                            </Col>
                        </Row>
                    </>
                )}
            </Card>
        </Row>
    );
}
