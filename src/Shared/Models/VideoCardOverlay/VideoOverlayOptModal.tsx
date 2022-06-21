import React, { useState } from "react";
import { Row, Space, Modal, Typography, Form, Input, Select, Switch } from "antd";
import { Titles } from "../enums/helpers/arrays/titles";

interface VideoOverlayOptModalPropType {
    edit: boolean;
    editVideo?: any;
    //setNewCTABtn?: React.Dispatch<React.SetStateAction<boolean>>;
    setIsCreateVideoVisible?: React.Dispatch<React.SetStateAction<boolean>>;
    setIsEditVideoDetailsVisible?: React.Dispatch<React.SetStateAction<boolean>>;
    setCtaBtn?: React.Dispatch<React.SetStateAction<boolean | undefined>>;
    setReload?: React.Dispatch<React.SetStateAction<any>>;
    isVideoOverlaysOptVisible: boolean;
    overlaysOpt: number;
    editFlag: boolean;
    titleErr: boolean;
    handleFormChange: () => void;
    setEditFlag: React.Dispatch<React.SetStateAction<boolean>>;
    setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
    setTitleErr: React.Dispatch<React.SetStateAction<boolean>>;
    setCtaBtnUrl: React.Dispatch<React.SetStateAction<string>>;
    setCtaBtnTitle: React.Dispatch<React.SetStateAction<string>>;
    setIsVideoOverlaysOptVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setOverlaysOpt: React.Dispatch<React.SetStateAction<number>>;
    setIsVideoOverlaysVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setResetCTABtn?: React.Dispatch<React.SetStateAction<boolean>>;
}

const VideoOverlayOptModal = ({
    edit,
    editVideo,
    //setNewCTABtn,
    setIsCreateVideoVisible,
    setIsEditVideoDetailsVisible,
    setCtaBtn,
    setReload,
    isVideoOverlaysOptVisible,
    overlaysOpt,
    editFlag,
    setEditFlag,
    handleFormChange,
    setShowDialog,
    titleErr,
    setTitleErr,
    setCtaBtnUrl,
    setCtaBtnTitle,
    setIsVideoOverlaysOptVisible,
    setIsVideoOverlaysVisible,
    setOverlaysOpt,
    setResetCTABtn,
}: VideoOverlayOptModalPropType) => {
    const [linkErr, setLinkErr] = useState(true);
    const { Text, Title } = Typography;
    const { Option } = Select;
    const { TextArea } = Input;
    const [form2] = Form.useForm();
    let formData: any;

    /**
 *  Function called when changes in Form 2 are made to check for Link Error
  /**
 * @function handleForm2Change
*/
    const handleForm2Change = () => {
        //console.log(form2.getFieldsError());
        if (form2.getFieldsValue().ctaBtnUrl) {
            setLinkErr(form2.getFieldsError()[1].errors.length ? true : false);
        }
    };

    /**
 *  Function called to show Modal after Video Overlays Modal
  /**
 * @function handleVideoOverlaysOptAdd
*/
    const handleVideoOverlaysOptAdd = () => {
        switch (overlaysOpt) {
            case 1:
                try {
                    form2.validateFields();
                    formData = form2.getFieldsValue();
                    if (formData.ctaBtnUrl !== undefined) {
                        setCtaBtnUrl(formData.ctaBtnUrl);
                    }
                    if (formData.ctaBtnTitle !== undefined) {
                        setCtaBtnTitle(formData.ctaBtnTitle);
                    }
                    setTitleErr(true);
                    setLinkErr(true);
                } catch (e) {
                    console.error(e);
                }
                break;
            case 2:
                break;
            case 3:
                break;
        }
        //setIsCreateVideoVisible(true);
        if (editFlag === false && setIsCreateVideoVisible) {
            console.log({ editFlag });
            setIsCreateVideoVisible(true);
        } else if (setIsEditVideoDetailsVisible && setCtaBtn) {
            console.log({ editFlag });
            setIsEditVideoDetailsVisible(true);
            setCtaBtn(false);
        }
        setIsVideoOverlaysOptVisible(false);
        setOverlaysOpt(0);
    };

    /**
*  Function called to close Video Overlays Modal
/**
* @function handleVideoOverlaysOptCancel
*/
    const handleVideoOverlaysOptCancel = () => {
        setIsVideoOverlaysVisible(true);
        setIsVideoOverlaysOptVisible(false);
        setTitleErr(true);
        setLinkErr(true);
        setOverlaysOpt(0);
    };

    return (
        <Modal
            title={(() => {
                switch (overlaysOpt) {
                    case 1:
                        return "Add link to preview video";
                        break;
                    case 2:
                        return "Question";
                        break;
                    case 3:
                        return "Poll";
                        break;
                }
            })()}
            visible={isVideoOverlaysOptVisible}
            okText={editFlag === true ? "Update" : "Add"}
            cancelText="Cancel"
            closable
            onCancel={handleVideoOverlaysOptCancel}
            onOk={() => {
                /*if (setNewCTABtn) {
          setNewCTABtn(true);
        }*/
                if (setResetCTABtn) {
                    setResetCTABtn(false);
                }
                handleVideoOverlaysOptAdd();
                handleFormChange();
                setShowDialog(true);
                if (edit && setReload) {
                    if (editFlag) {
                        console.log("reload");
                        setReload({}); // used to counter useState async issue by re rendering
                        setEditFlag(false);
                    } else {
                        setEditFlag(false);
                    }
                } else {
                    setEditFlag(false);
                }
            }}
            destroyOnClose={true}
            width={"40vw"}
            okButtonProps={{
                disabled: edit
                    ? (((linkErr === false &&
                          titleErr === false &&
                          form2.getFieldsValue().ctaBtnTitle &&
                          form2.getFieldsValue().ctaBtnUrl) ||
                          (editFlag === true && form2.getFieldsValue().ctaBtnUrl && linkErr === false) ||
                          (editFlag === true && form2.getFieldsValue().ctaBtnTitle && titleErr === false)) &&
                          editVideo.ctaBtnUrl !== "" &&
                          editVideo.ctaBtnTitle !== "") ||
                      (editVideo.ctaBtnUrl === "" &&
                          editVideo.ctaBtnTitle === "" &&
                          form2.getFieldsValue().ctaBtnTitle &&
                          titleErr === false &&
                          form2.getFieldsValue().ctaBtnUrl &&
                          linkErr === false)
                        ? false
                        : true
                    : (linkErr === false &&
                          titleErr === false &&
                          form2.getFieldsValue().ctaBtnTitle &&
                          form2.getFieldsValue().ctaBtnUrl) ||
                      (editFlag === true && form2.getFieldsValue().ctaBtnUrl && linkErr === false) ||
                      (editFlag === true && form2.getFieldsValue().ctaBtnTitle && titleErr === false)
                    ? false
                    : true,
            }}
        >
            {(() => {
                switch (overlaysOpt) {
                    case 1:
                        return (
                            <Row justify="center">
                                <Space direction="vertical" size={0.1}>
                                    <Title level={5}>CTA Link</Title>
                                    <Text>Please insert a link you would like this video to link to.</Text>
                                    <br />
                                    <Form
                                        name="ctaLink"
                                        labelCol={{ span: 24 }}
                                        initialValues={{ remember: true }}
                                        autoComplete="off"
                                        style={{ textAlign: "left" }}
                                        form={form2}
                                        onFieldsChange={handleForm2Change}
                                        preserve={false}
                                    >
                                        <Row>
                                            <Form.Item name="ctaBtnTitle">
                                                {editFlag === true ? (
                                                    edit ? (
                                                        <Select
                                                            placeholder={
                                                                editVideo.ctaBtnUrl === "" &&
                                                                editVideo.ctaBtnTitle === ""
                                                                    ? "Select Title"
                                                                    : ""
                                                            }
                                                            onChange={() => setTitleErr(false)}
                                                            defaultValue={
                                                                editVideo.ctaBtnUrl === "" &&
                                                                editVideo.ctaBtnTitle === ""
                                                                    ? null
                                                                    : editVideo.ctaBtnTitle
                                                            }
                                                            style={{ width: "7.1vw" }}
                                                        >
                                                            {Titles.map((title: any) => (
                                                                <Option key={title.id} value={title}>
                                                                    {title}
                                                                </Option>
                                                            ))}
                                                        </Select>
                                                    ) : edit ? (
                                                        <Select
                                                            placeholder="Select Title"
                                                            onChange={() => setTitleErr(false)}
                                                            style={{ width: "7.1vw" }}
                                                        >
                                                            {Titles.map((title: any) => (
                                                                <Option key={title.id} value={title}>
                                                                    {title}
                                                                </Option>
                                                            ))}
                                                        </Select>
                                                    ) : (
                                                        <Select
                                                            placeholder={"Select Title"}
                                                            onChange={() => setTitleErr(false)}
                                                            style={{ width: "7.1vw" }}
                                                        >
                                                            {Titles.map((title: any) => (
                                                                <Option key={title.id} value={title}>
                                                                    {title}
                                                                </Option>
                                                            ))}
                                                        </Select>
                                                    )
                                                ) : (
                                                    <Select
                                                        placeholder="Select Title"
                                                        onChange={() => setTitleErr(false)}
                                                        style={{ width: "7.1vw" }}
                                                    >
                                                        {Titles.map((title: any) => (
                                                            <Option key={title.id} value={title}>
                                                                {title}
                                                            </Option>
                                                        ))}
                                                    </Select>
                                                )}
                                            </Form.Item>
                                            <Form.Item
                                                name="ctaBtnUrl"
                                                rules={[
                                                    {
                                                        required: true,
                                                        type: "url",
                                                        message: "Invalid Web Link!",
                                                        validateTrigger: "onChange",
                                                    },
                                                    {
                                                        required: true,
                                                        type: "string",
                                                        min: 6,
                                                        message: "Weblink need to be of min 6 char!",
                                                        validateTrigger: "onChange",
                                                    },
                                                ]}
                                                validateTrigger={["onChange"]}
                                            >
                                                {editFlag === true ? (
                                                    edit ? (
                                                        <Input
                                                            style={{ width: "17vw" }}
                                                            placeholder={
                                                                editVideo.ctaBtnUrl === "" &&
                                                                editVideo.ctaBtnTitle === ""
                                                                    ? "Insert link (https://www.example.com)"
                                                                    : ""
                                                            }
                                                            defaultValue={
                                                                editVideo.ctaBtnUrl === "" &&
                                                                editVideo.ctaBtnTitle === ""
                                                                    ? null
                                                                    : editVideo.ctaBtnUrl
                                                            }
                                                        />
                                                    ) : (
                                                        <Input
                                                            style={{ width: "17vw" }}
                                                            placeholder={"Insert link (https://www.example.com)"}
                                                        />
                                                    )
                                                ) : edit ? (
                                                    <Input
                                                        style={{ width: "17vw" }}
                                                        placeholder="Insert link (https://www.example.com)"
                                                    />
                                                ) : (
                                                    <Input
                                                        style={{ width: "17vw" }}
                                                        placeholder="Insert link (https://www.example.com)"
                                                    />
                                                )}
                                            </Form.Item>
                                        </Row>
                                    </Form>
                                </Space>
                            </Row>
                        );
                        break;
                    case 2:
                        return (
                            <Row justify="center">
                                <Space direction="vertical" size={0.1}>
                                    <Title level={5}>Question</Title>
                                    <Text>
                                        You can set up a question card to collect feedbacks from your audience to.
                                    </Text>
                                    <br />
                                    <TextArea showCount maxLength={50} />
                                    <br />
                                    <div>
                                        <Space direction="horizontal" size={10}>
                                            <Text>Collect responder’s email</Text>
                                            <Switch defaultChecked />
                                        </Space>
                                    </div>
                                    <Text type="secondary">
                                        After people answered the question. ask for their email
                                    </Text>
                                </Space>
                            </Row>
                        );
                        break;
                    case 3:
                        return (
                            <Row justify="center">
                                <Space direction="vertical" size={0.1}>
                                    <TextArea showCount maxLength={50} placeholder="Your question here..." />
                                    <br />
                                    <Select
                                        mode="tags"
                                        style={{ width: "50Vh" }}
                                        tokenSeparators={[","]}
                                        placeholder="Type and press enter. Minimum 2 choices are required"
                                        dropdownStyle={{ display: "none" }}
                                    ></Select>
                                </Space>
                            </Row>
                        );
                        break;
                }
            })()}
        </Modal>
    );
};

export default VideoOverlayOptModal;
