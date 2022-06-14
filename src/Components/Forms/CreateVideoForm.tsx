import React, { ReactNode, useState } from "react";
import { Form, FormInstance, Input, Typography, Select, Radio, Space, Row, Col, Upload, Image, Collapse } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Button from "../Partials/Button";

interface CreateVideoFormPropType {
    form3: FormInstance<any>;
    handleForm3Change: () => void;
    caption: string;
    setCaption: React.Dispatch<React.SetStateAction<any>>;
    description: string;
    setDescription: React.Dispatch<React.SetStateAction<any>>;
    descriptionErr: boolean;
    setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
    handleHashTagChange: (value: string) => void;
    hashtags: any;
    selectOrientation: (e: any) => void;
    posterProps: Object;
    customRequest: (e: any, type: string) => void;
    setUploadReqIdResPoster: React.Dispatch<React.SetStateAction<number>>;
    setThumbnailId: React.Dispatch<React.SetStateAction<number>>;
    setThumbnailURL: React.Dispatch<React.SetStateAction<string>>;
    uploadReqIdResPoster: number;
    videoThumbnailId: number;
    videoThumbnailURL: string;
    thumbnailId: number;
    thumbnailURL: string;
    playlists: any;
    onPlaylistSelect: (value: any) => void;
    getPlaylist: () => void;
}

const CreateVideoForm = ({
    form3,
    handleForm3Change,
    caption,
    setCaption,
    setShowDialog,
    description,
    setDescription,
    descriptionErr,
    setUploadReqIdResPoster,
    handleHashTagChange,
    hashtags,
    selectOrientation,
    posterProps,
    customRequest,
    setThumbnailId,
    setThumbnailURL,
    uploadReqIdResPoster,
    videoThumbnailId,
    videoThumbnailURL,
    thumbnailId,
    thumbnailURL,
    playlists,
    onPlaylistSelect,
    getPlaylist,
}: CreateVideoFormPropType) => {
    const { Text } = Typography;
    const { Option } = Select;
    const { Panel } = Collapse;
    return (
        <Form
            name="createVideo"
            labelCol={{ span: 24 }}
            initialValues={{ remember: true }}
            autoComplete="off"
            style={{ textAlign: "left" }}
            form={form3}
            onFieldsChange={handleForm3Change}
        >
            <Form.Item
                label={
                    <Text strong type="secondary">
                        Title
                    </Text>
                }
                name="caption"
                rules={[
                    {
                        required: true,
                        message: "Title required!",
                    },
                    {
                        min: 3,
                        max: 50,
                        message: "Title need to be between 3 and 50 characters in length.",
                    },
                ]}
                validateTrigger={["onChange"]}
                hasFeedback
            >
                <Input
                    size="large"
                    placeholder="Title (Min 3 and Max 50 char)"
                    value={caption}
                    onChange={(e) => {
                        setCaption(e.target.value);
                        setShowDialog(true);
                    }}
                    maxLength={51}
                />
            </Form.Item>
            <Form.Item
                label={
                    <Text strong type="secondary">
                        Description
                    </Text>
                }
                name="description"
                rules={[
                    {
                        min: 3,
                        max: 50,
                        message: "Description need to be between 3 and 50 characters in length.",
                    },
                ]}
                validateStatus={description ? (descriptionErr ? "error" : "success") : ""}
                validateTrigger={["onChange"]}
                hasFeedback
            >
                <Input
                    size="large"
                    placeholder="Description  (Min 3 and Max 50 char)"
                    value={description}
                    onChange={(e) => {
                        setDescription(e.target.value);
                        setShowDialog(true);
                    }}
                    maxLength={51}
                />
            </Form.Item>
            <Form.Item
                label={
                    <Text strong type="secondary">
                        Hashtag
                    </Text>
                }
                name="hashtag"
            >
                <Select
                    mode="tags"
                    style={{ width: "100%" }}
                    onChange={handleHashTagChange}
                    tokenSeparators={[",", "#", " "]}
                    dropdownStyle={{
                        display: hashtags.length === 0 ? "none" : "",
                    }}
                >
                    {hashtags.map((hashtag: any) => (
                        <Option key={hashtag.id} value={hashtag.value}>
                            {hashtag.value}
                        </Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item
                label={
                    <Text strong type="secondary">
                        Video Orientation
                    </Text>
                }
                name="orientation"
            >
                <Radio.Group onChange={selectOrientation}>
                    <Space direction="vertical">
                        <Radio value={"landscape"}>Landscape</Radio>
                        <Radio value={"portrait"}>Portrait</Radio>
                    </Space>
                </Radio.Group>
            </Form.Item>
            <Row style={{ padding: " 0 0 1rem ", lineHeight: "1.5715" }}>
                <Text strong type="secondary">
                    Video Thumbnail
                </Text>
            </Row>
            <Row justify="start" align="middle">
                <Col span={14}>
                    <Upload
                        {...posterProps}
                        listType="picture"
                        className="upload-list-inline"
                        customRequest={(e) => {
                            customRequest(e, "poster");
                            setShowDialog(true);
                        }}
                        onRemove={() => {
                            setUploadReqIdResPoster(-1);
                            setThumbnailId(-1);
                            setThumbnailURL("");
                            setShowDialog(true);
                        }}
                    >
                        <Col>
                            <Button icon={<UploadOutlined />}>Add video thumbnail</Button>
                        </Col>
                    </Upload>
                </Col>
                <Col span={6}>
                    <Image
                        width={"75%"}
                        src={
                            uploadReqIdResPoster === -1 && videoThumbnailId !== -1
                                ? videoThumbnailURL
                                : thumbnailId !== -1
                                ? thumbnailURL
                                : videoThumbnailURL
                        }
                        preview={false}
                    />
                </Col>
            </Row>
            {playlists.total > 0 ? (
                <Collapse bordered={false} defaultActiveKey={["1"]} ghost>
                    <Panel header="Add to Playlists" key="1">
                        <Row
                            style={{
                                backgroundColor: "#f5f5f5",
                                padding: "10px",
                                borderRadius: "5px",
                            }}
                        >
                            <Select
                                mode="multiple"
                                style={{ width: "100%", backgroundColor: "#f5f5f5" }}
                                onChange={onPlaylistSelect}
                                onClick={getPlaylist}
                                allowClear
                                labelInValue={true}
                                showArrow={true}
                                dropdownStyle={{
                                    display: playlists.length === 0 ? "none" : "",
                                }}
                            >
                                {playlists.data.map((playlist: any) => (
                                    <Option key={playlist.id} value={playlist.title}>
                                        {playlist.title}
                                    </Option>
                                ))}
                            </Select>
                        </Row>
                    </Panel>
                </Collapse>
            ) : null}
        </Form>
    );
};

export default CreateVideoForm;
