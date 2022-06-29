import React, { ReactNode, useEffect, useState } from "react";
import { AutoComplete, Form, FormInstance, Input, Select } from "antd";
import { Option } from "antd/lib/mentions";

interface YouTubeLinkFormPropType {
    form1: FormInstance<any>;
    youTubeLink: string;
    setVideoThumbnailURL: React.Dispatch<React.SetStateAction<string>>;
    setYouTubeLink: React.Dispatch<React.SetStateAction<string>>;
    setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const YouTubeLinkForm = ({
    form1,
    youTubeLink,
    setVideoThumbnailURL,
    setYouTubeLink,
    setShowDialog,
}: YouTubeLinkFormPropType) => {
    useEffect(() => {
        console.log({ youTubeLink });
    }, [youTubeLink]);
    return (
        <Form autoComplete="off" name="youTubeLink" form={form1}>
            <Form.Item name="youtubeUrl" style={{ width: "auto" }}>
                {/* <Input
                    allowClear={true}
                    value={youTubeLink}
                    addonBefore={"Youtube Link"}
                    placeholder={"Add video source URl"}
                    size="large"
                    onChange={(e) => {
                        // const youtubeThumbnail1 = e.target.value.split("v=")[1].substring(0, 11);
                        // const youtubeImage = `https://img.youtube.com/vi/${youtubeThumbnail1}/hqdefault.jpg`;
                        // setVideoThumbnailURL(youtubeImage);
                        // console.log("input", e.target.value);
                        setYouTubeLink(e.target.value);
                        setShowDialog(true);
                    }}
                /> */}

                <Input.Group compact>
                    <Select defaultValue="Youtube" style={{ width: "35%" }} size="large">
                        <Option value="Youtube">Youtube URl</Option>
                        <Option value="insta">Instagram URL</Option>
                    </Select>
                    <Input
                        // allowClear={true}
                        // value={youTubeLink}
                        style={{ width: "50%", textAlign: "left" }}
                        placeholder={"Add video source URl"}
                        size="large"
                        onChange={(e) => {
                            // const youtubeThumbnail1 = e.target.value.split("v=")[1].substring(0, 11);
                            // const youtubeImage = `https://img.youtube.com/vi/${youtubeThumbnail1}/hqdefault.jpg`;
                            // setVideoThumbnailURL(youtubeImage);
                            setYouTubeLink(e.target.value);
                            setShowDialog(true);
                        }}
                    />
                </Input.Group>
            </Form.Item>
        </Form>
    );
};

export default YouTubeLinkForm;
