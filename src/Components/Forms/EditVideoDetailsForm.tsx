import React, { useEffect } from "react";
import { Form, FormInstance, Input, Typography, Select, Row, Col, Upload, Image, Collapse } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Button from "../Partials/Button";

interface EditVideoDetailsFormPropType {
    form1: FormInstance<any>;
    handleForm1Change: () => void;
    formDisable: boolean | undefined;
    caption: string;
    setCaption: React.Dispatch<React.SetStateAction<any>>;
    description: string;
    setDescription: React.Dispatch<React.SetStateAction<any>>;
    setEditFormFieldChange: React.Dispatch<React.SetStateAction<boolean>>;
    handleHashTagChange: (value: string) => void;
    hashtags: any;
    posterProps: Object;
    customRequest: (e: any, type: string) => void;
    setUploadReqIdResPoster: React.Dispatch<React.SetStateAction<number>>;
    setThumbnailId: React.Dispatch<React.SetStateAction<number>>;
    setThumbnailURL: React.Dispatch<React.SetStateAction<string>>;
    uploadReqIdResPoster: number;
    thumbnailId: number;
    thumbnailURL: string;
    playlists: any;
    onPlaylistSelect: (value: any, id: number) => void;
    getPlaylist: () => void;
    setFieldChanged: React.Dispatch<React.SetStateAction<string>>;
    setReload: React.Dispatch<React.SetStateAction<{}>>;
    editVideo: any;
}

const EditVideoDetailsForm = ({
    form1,
    handleForm1Change,
    formDisable,
    setEditFormFieldChange,
    caption,
    setCaption,
    description,
    setDescription,
    setUploadReqIdResPoster,
    handleHashTagChange,
    hashtags,
    posterProps,
    customRequest,
    setThumbnailId,
    setThumbnailURL,
    uploadReqIdResPoster,
    thumbnailId,
    thumbnailURL,
    playlists,
    onPlaylistSelect,
    getPlaylist,
    setFieldChanged,
    setReload,
    editVideo,
}: EditVideoDetailsFormPropType) => {
    const { Text } = Typography;
    const { Option } = Select;
    const { Panel } = Collapse;
    useEffect(() => {
        console.log({ description });
    }, [description]);
    return (
        <Form
            name="editVideoDetails"
            labelCol={{ span: 24 }}
            initialValues={{ remember: true }}
            autoComplete="off"
            style={{ textAlign: "left" }}
            form={form1}
            onFieldsChange={() => {
                setEditFormFieldChange(true);
                handleForm1Change();
            }}
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
            >
                <Input
                    size="large"
                    value={caption}
                    disabled={formDisable}
                    onChange={(e) => {
                        setCaption(e.target.value);
                        setFieldChanged("Title");
                        setReload({}); // used to counter useState async issue by re rendering
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
                validateTrigger={["onChange"]}
            >
                <Input
                    size="large"
                    disabled={formDisable}
                    value={description}
                    onChange={(e) => {
                        setDescription(e.target.value);
                        setFieldChanged("Description");
                        setReload({}); // used to counter useState async issue by re rendering
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
                    disabled={formDisable}
                    onChange={(value) => {
                        handleHashTagChange(value);
                        setFieldChanged("HashTags");
                        setReload({}); // used to counter useState async issue by re rendering
                    }}
                    tokenSeparators={[",", "#", " "]}
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
                <Input size="large" disabled={true} defaultValue={editVideo.orientation} />
            </Form.Item>
            <Row style={{ padding: " 0 0 1rem ", lineHeight: "1.5715" }}>
                <Text strong type="secondary">
                    Video Thumbnail
                </Text>
            </Row>
            <Row
                justify="start"
                align="middle"
                style={{
                    backgroundColor: "#f5f5f5",
                    padding: "20px 30px",
                    borderRadius: "5px",
                }}
            >
                <Col span={14}>
                    <Upload
                        {...posterProps}
                        listType="picture"
                        className="upload-list-inline"
                        customRequest={(e) => {
                            customRequest(e, "poster");
                            handleForm1Change();
                            setFieldChanged("Thumbnail");
                        }}
                        onRemove={() => {
                            setUploadReqIdResPoster(-1);
                            setThumbnailId(-1);
                            setThumbnailURL("");
                            handleForm1Change();
                        }}
                    >
                        <Col>
                            <Button disabled={formDisable} icon={<UploadOutlined />}>
                                Replace video thumbnail
                            </Button>
                        </Col>
                    </Upload>
                </Col>
                <Col span={6}>
                    <Image
                        width={"75%"}
                        src={
                            editVideo.poster != null
                                ? uploadReqIdResPoster === -1
                                    ? editVideo.poster.urls.original
                                    : thumbnailId !== -1
                                : // ? thumbnailURL
                                  editVideo.poster?.urls?.original
                            // : process.env.PUBLIC_URL + "/images/noposter.jpg"
                        }
                        preview={false}
                    />
                </Col>
            </Row>
            {playlists.length > 0 ? (
                <Collapse
                    bordered={false}
                    //onChange={callback}
                    defaultActiveKey={["1"]}
                    ghost
                >
                    <Panel header="Add to Playlists" key="1">
                        <Form.Item name="playlist">
                            <Row
                                style={{
                                    backgroundColor: "#f5f5f5",
                                    padding: "10px",
                                    borderRadius: "5px",
                                }}
                            >
                                <Select
                                    mode="multiple"
                                    style={{ width: "100%" }}
                                    disabled={formDisable}
                                    onChange={(val) => {
                                        onPlaylistSelect(val, editVideo.id);
                                        setFieldChanged("Playlist");
                                        setReload({}); // used to counter useState async issue by re rendering
                                    }}
                                    onClick={getPlaylist}
                                    labelInValue={true}
                                    defaultValue={
                                        editVideo.playlists
                                            ? editVideo.playlists.map((pl: any) => pl.playlist.title)
                                            : ""
                                    }
                                    showArrow={true}
                                    allowClear={true}
                                >
                                    {playlists
                                        ? playlists.map((playlist: any) => (
                                              <Option key={playlist.id} value={playlist.title}>
                                                  {playlist.title}
                                              </Option>
                                          ))
                                        : null}
                                </Select>
                            </Row>
                        </Form.Item>
                    </Panel>
                </Collapse>
            ) : null}
        </Form>
    );
};
export default EditVideoDetailsForm;
