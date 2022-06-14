import React, { ReactNode, useState } from "react";
import { Form, FormInstance, Input } from "antd";

interface CreatePlaylistPageFormPropType {
    form1: FormInstance<any>;
    handleFormChange: () => void;
    setTitle: React.SetStateAction<any>;
    clearMsg: () => void;
    title: string;
}

const CreatePlaylistPageForm = ({
    form1,
    handleFormChange,
    setTitle,
    clearMsg,
    title,
}: CreatePlaylistPageFormPropType) => {
    return (
        <Form
            name="createPlaylist"
            labelCol={{ span: 24 }}
            initialValues={{ remember: true }}
            autoComplete="off"
            form={form1}
            onFieldsChange={handleFormChange}
            style={{ textAlign: "left", marginTop: "5px" }}
        >
            <Form.Item
                name="playlistName"
                rules={[
                    {
                        required: true,
                        message: "Playlist name required!",
                        validateTrigger: "onChange",
                    },
                    {
                        max: 50,
                        message: "Playlist name exceed 50 characters in length.",
                    },
                ]}
                validateTrigger={["onChange"]}
                style={{ margin: 0 }}
            >
                <Input
                    size="large"
                    placeholder="Name Your Playlist"
                    onChange={(e) => {
                        setTitle(e.target.value);
                        clearMsg();
                    }}
                    defaultValue={title}
                    value={title}
                />
            </Form.Item>
        </Form>
    );
};

export default CreatePlaylistPageForm;
