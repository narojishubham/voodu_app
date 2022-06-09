import { Button, Card, Col, Input, message, Modal, Row, Space, Spin, Typography } from "antd";
import { useEffect, useState, useContext } from "react";
import { LinkOutlined, EditOutlined, FormOutlined, ProfileOutlined, RocketOutlined } from "@ant-design/icons";
import "./ProfilePage.css";
import QrCard from "./QrCard";
import ContactDetails from "./ContactDetails";
import { ProfileContext } from "../../Components/Layouts/AppLayout";
import { useAppDispatch } from "../../Shared/Redux/store";
import ProfileImage from "./ProfileImage";
import getProfileDataAction from "../../Shared/Redux/Actions/profile/getProfile.action";
import uploadProfileDataAction from "../../Shared/Redux/Actions/profile/updateProfile.action";
function ProfilePage() {
    const [editMode, setEditMode] = useState(false);
    const [editProfileMode, setEditProfileditMode] = useState(false);

    const [editModeSaveLoader, setEditModeSaveLoader] = useState(false);
    const [editData, setEditData] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);

    const [profileData, setProfileData] = useState<any>();
    const { setReload } = useContext(ProfileContext);

    /**
     * Toggle Edit profile button
     * @function FlipEditProfileButton
     */
    const FlipEditProfileButton = () => {
        setEditProfileditMode(!editProfileMode);
    };

    const dispatch = useAppDispatch();

    /**
     * Saving profile data
     * @function onSave
     * @throws When saving profile data fails
     */
    const onSave = () => {
        setEditModeSaveLoader(true);
        const {
            firstName,
            lastName,
            account: { description },
        } = editData;

        dispatch(
            uploadProfileDataAction({
                ...editData,
                posterId: imageId,
                description: description ? description : "",
            })
        )
            .unwrap()
            .then(() => {
                setEditModeSaveLoader(false);
                setEditProfileditMode(!editProfileMode);
                getProfileData();
                message.success("Profile Data Updated");
                setReload({});
            })
            .catch((error: any) => {
                setEditModeSaveLoader(false);
                setEditProfileditMode(!editProfileMode);
                message.success(error);
            });
    };

    const [uploadReqIdResVideo, setUploadReqIdResVideo] = useState(-1);
    const [videoURL, setVideoURL] = useState("");

    const [imageURL, setImageURL] = useState("");
    const [imageId, setImageId] = useState<any>();
    /**
     * Fetch profile data
     * @async
     * @function getProfileData
     */
    const getProfileData = async () => {
        setLoading(true);
        dispatch(getProfileDataAction())
            .unwrap()
            .then((resp: any) => {
                setProfileData(resp);
                setEditData(resp.data);
                if (resp?.data?.account?.poster != null) {
                    setImageURL(resp?.data?.account?.poster?.urls?.original);
                }
                setLoading(false);
            });
    };
    useEffect(() => {
        getProfileData();
    }, []);

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
                FlipEditProfileButton();
                setEditData("");
                getProfileData();
            },
        });
    };

    const { Title } = Typography;
    return (
        <>
            {loading ? (
                <Row style={{ height: "100%" }} justify={"center"} align={"middle"}>
                    <Spin />
                </Row>
            ) : (
                <Row gutter={16} className="profileParentClass" justify="center">
                    <Col span={22}>
                        <Card className="cardBorder">
                            <Row justify="space-between" style={{ padding: "0px 0px 0.4rem" }}>
                                <Col style={{ paddingLeft: "10px" }}>
                                    <Title level={3}>Brand Details</Title>
                                </Col>
                                <Row align="middle">
                                    {editProfileMode ? (
                                        <Space size="small">
                                            <Button type="primary" onClick={onSave} loading={editModeSaveLoader}>
                                                Save
                                            </Button>
                                            <Button onClick={handleCancel}>Cancel</Button>
                                        </Space>
                                    ) : (
                                        <>
                                            <Col style={{ paddingLeft: "0.4rem" }}>
                                                <Button
                                                    type="link"
                                                    onClick={FlipEditProfileButton}
                                                    icon={<EditOutlined />}
                                                >
                                                    Edit Profile
                                                </Button>
                                            </Col>
                                        </>
                                    )}
                                </Row>
                            </Row>
                            <Row>
                                <Col
                                    span={6}
                                    style={{
                                        paddingBottom: "23px",
                                        paddingLeft: "1rem",
                                        marginRight: "1rem",
                                    }}
                                >
                                    <ProfileImage
                                        edit={editProfileMode}
                                        // imageUrl={profileData?.data?.account?.poster?.urls?.original}
                                        imageUrl={imageURL}
                                        onUploadFinish={({ original, id }) => {
                                            setImageURL(original);
                                            setImageId(id);
                                        }}
                                    />
                                </Col>
                                {/*  1st side data */}
                                <Col
                                    span={9}
                                    // span={8}
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Row>
                                        <Col span={1}>
                                            <RocketOutlined />
                                        </Col>
                                        <Col>
                                            <Title
                                                className="reduceMarginBottom"
                                                style={{ paddingLeft: " 0.3rem" }}
                                                level={5}
                                            >
                                                Brand Name
                                            </Title>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={1}></Col>
                                        <Col className="lineHeight" style={{ paddingLeft: " 0.3rem" }}>
                                            {profileData?.data?.account?.name}
                                        </Col>
                                    </Row>
                                    <Row className="topSpace">
                                        <Col span={1}>
                                            <LinkOutlined />
                                        </Col>
                                        <Col>
                                            <Title
                                                className="reduceMarginBottom"
                                                style={{ paddingLeft: " 0.3rem" }}
                                                level={5}
                                            >
                                                Website URL
                                            </Title>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={1}></Col>
                                        <Col className="lineHeight" span={18} style={{ paddingLeft: " 0.3rem" }}>
                                            <Input.TextArea
                                                readOnly
                                                style={{
                                                    border: "0px",
                                                    paddingLeft: "0",
                                                    paddingTop: "0",
                                                    lineHeight: 1.1,
                                                }}
                                                autoSize={{ minRows: 2, maxRows: 3 }}
                                                value={profileData?.data?.account?.website}
                                            />
                                        </Col>
                                    </Row>
                                </Col>
                                {/*  3rd side data */}
                                <Col
                                    span={6}
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        flexWrap: "wrap",
                                    }}
                                >
                                    <Row>
                                        <Col span={2}>
                                            <ProfileOutlined />
                                        </Col>
                                        <Col>
                                            <Title className="reduceMarginBottom" level={5}>
                                                Category
                                            </Title>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={2}></Col>
                                        <Col className="lineHeight">{profileData?.data?.account?.category.name}</Col>
                                    </Row>
                                    <Row className="topSpace">
                                        <Col span={2}>
                                            <FormOutlined />
                                        </Col>
                                        <Col>
                                            <Title className="reduceMarginBottom" level={5}>
                                                Description
                                            </Title>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={2}></Col>
                                        {!editProfileMode ? (
                                            <Col className="lineHeight" style={{ maxHeight: "46px" }} span={22}>
                                                {profileData?.data?.account?.description}
                                            </Col>
                                        ) : (
                                            <Input.TextArea
                                                value={editData?.account?.description}
                                                maxLength={100}
                                                showCount
                                                placeholder="Add Description"
                                                autoSize={{ minRows: 2, maxRows: 2 }}
                                                onChange={(e) =>
                                                    setEditData({
                                                        ...editData,
                                                        account: {
                                                            ...editData,
                                                            description: e.target.value,
                                                        },
                                                    })
                                                }
                                            />
                                        )}
                                    </Row>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                    {/* bottom first card */}
                    <Col span={10}>
                        <ContactDetails
                            profileData={profileData?.data}
                            onSaveSuccess={() => {
                                getProfileData();
                            }}
                        />
                    </Col>
                    {/* QR COde */}
                    <Col span={6}>
                        <QrCard profileData={profileData} />
                    </Col>
                    {/* Your Current Plan */}
                    <Col span={6}>
                        <Card className="cardBorder">
                            <Col style={{ paddingLeft: "0" }}>
                                <Title level={3}>Your Current Plan</Title>
                            </Col>
                            <Row style={{ paddingTop: "0.5rem " }}>
                                <Typography.Title level={1} className="pricingHeaderText" style={{ color: "#1890FF" }}>
                                    Basic
                                </Typography.Title>
                            </Row>
                            <Row
                                style={{
                                    padding: "1rem 0  1.8rem",
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <Row>Valid until</Row>
                                <Row>
                                    <Title level={4}>30 June 2022</Title>
                                </Row>
                            </Row>
                            <Row justify="center">
                                <Button
                                    disabled
                                    type="primary"
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        padding: "0 3rem",
                                    }}
                                >
                                    Upgrade Plan
                                </Button>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            )}
        </>
    );
}

export default ProfilePage;
