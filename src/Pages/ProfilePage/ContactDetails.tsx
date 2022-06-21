import { Button, Card, Col, Input, message, Modal, Row, Space, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { EditOutlined, PhoneOutlined, MailOutlined, StarOutlined, UserOutlined } from "@ant-design/icons";
import DesignationSelector from "./DesignationSelector";
import uploadProfileDataAction from "../../Shared/Redux/Actions/profile/updateProfile.action";
import { useAppDispatch } from "../../Shared/Redux/store";
import getDesignationsAction, {
    GetDesignationResponseType,
} from "../../Shared/Redux/Actions/brand/designation/getDesignation.action";
import CustomSelectAndSearchField from "../../Components/CustomSelectAndSearchField";

function ContactDetails({ profileData, onSaveSuccess = () => {} }: any) {
    const [edit, setEdit] = useState(false);
    const [contactData, setContactData] = useState<any>({});

    /**
     * Toggle Edit mode
     * @function toggleEditMode
     */
    const toggleEditMode = () => {
        setEdit((s) => !s);
    };

    /**
     * Shows  message on cancel
     * @function handleCancel
     */
    const handleCancel = () => {
        Modal.confirm({
            title: "Confirm",
            content: "Are you sure you want to Cancel? Your changes won't be saved! ",
            okText: "Yes",
            cancelText: "No",
            onOk: () => {
                toggleEditMode();
                setContactData("");
                onSaveSuccess();
            },
        });
    };
    const dispatch = useAppDispatch();

    /**
     * Saving contact data
     * @function onSave
     * @throws When saving contact data fails
     */
    const onSave = async () => {
        const { firstName, lastName, designationId } = contactData;
        await dispatch(uploadProfileDataAction({ ...contactData })).unwrap();
        try {
            onSaveSuccess();
            console.log("data data uploadProfileDataAction contact");
            setEdit(false);
            message.success("Contact Data Updated");
        } catch (error) {
            throw error;
        }
    };
    useEffect(() => {
        setContactData(profileData);
    }, [profileData]);

    return (
        <Card className="cardBorder" style={{ paddingLeft: "10px", paddingBottom: "3rem" }}>
            <Row justify="space-between" style={{ padding: "0 0 3rem 0" }}>
                <Col>
                    <Typography.Title level={3}>Contact Details</Typography.Title>
                </Col>
                <Row align="middle">
                    {edit ? (
                        <Space size="small">
                            <Button type="primary" onClick={onSave}>
                                Save
                            </Button>
                            <Button onClick={handleCancel}>Cancel</Button>
                        </Space>
                    ) : (
                        <>
                            <Button type="link" icon={<EditOutlined />} onClick={toggleEditMode}>
                                Edit Details
                            </Button>
                        </>
                    )}
                </Row>
            </Row>
            <Row>
                <Col span={12}>
                    <Row>
                        <Col span={2}>
                            <UserOutlined />
                        </Col>
                        <Col>
                            <Typography.Title className="reduceMarginBottom" level={5}>
                                Contact Person
                            </Typography.Title>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={2}></Col>
                        {!edit ? (
                            <Col className="lineHeight">
                                {profileData?.firstName} {profileData?.lastName}
                            </Col>
                        ) : (
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    flexWrap: "nowrap",
                                }}
                            >
                                <div>
                                    <Input
                                        value={contactData.firstName}
                                        placeholder="Enter First Name"
                                        onChange={(e) => {
                                            setContactData({
                                                ...contactData,
                                                firstName: e.target.value,
                                            });
                                        }}
                                    />
                                </div>
                                <div>
                                    <Input
                                        value={contactData.lastName}
                                        placeholder="Enter Last Name"
                                        onChange={(e) => {
                                            setContactData({
                                                ...contactData,
                                                lastName: e.target.value,
                                            });
                                        }}
                                    />
                                </div>
                            </div>
                        )}
                    </Row>
                </Col>
                <Col span={12}>
                    <Row>
                        <Col span={2}>
                            <PhoneOutlined />
                        </Col>
                        <Col>
                            <Typography.Title className="reduceMarginBottom" level={5}>
                                Phone
                            </Typography.Title>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={2}></Col>
                        <Col className="lineHeight">{contactData?.phone}</Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Row className="topSpace">
                        <Col span={2}>
                            <StarOutlined />
                        </Col>
                        <Col>
                            <Typography.Title className="reduceMarginBottom" level={5}>
                                Designation
                            </Typography.Title>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={2}></Col>
                        {!edit ? (
                            <Col className="lineHeight">{contactData?.account?.designationData?.name}</Col>
                        ) : (
                            <DesignationSelector
                                value={{
                                    key: contactData?.account?.designationData?.id,
                                    value: contactData?.account?.designationData?.name,
                                }}
                                onChange={(e: any) => {
                                    console.log(e);
                                    setContactData({
                                        ...contactData,
                                        account: {
                                            ...contactData?.account,
                                            designationData: {
                                                ...contactData?.account,
                                                id: e.key,
                                                name: e.value,
                                            },
                                        },
                                        designationId: `${e.key}`,
                                    });
                                }}
                            />
                            // <CustomSelectAndSearchField getData={data} />
                        )}
                    </Row>
                </Col>
                <Col span={12}>
                    <Row className="topSpace">
                        <Col span={2}>
                            <MailOutlined />
                        </Col>
                        <Col>
                            <Typography.Title className="reduceMarginBottom" level={5}>
                                Email
                            </Typography.Title>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={2}></Col>
                        <Col className="lineHeight">{contactData?.email}</Col>
                    </Row>
                </Col>
            </Row>
        </Card>
    );
}

export default ContactDetails;
