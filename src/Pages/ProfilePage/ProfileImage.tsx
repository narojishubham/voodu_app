import { Avatar, Row, Spin, Upload, notification } from "antd";
import React, { useState } from "react";
import { EditOutlined } from "@ant-design/icons";
import createVideoService from "../../Shared/Redux/Actions/feed/createVideo.service";

interface IProfileImage {
    imageUrl?: string;
    edit: boolean;
    onUploadFinish?: (e: any) => void;
}

/**
 * Props for Thumbnail upload section
  /**
  * @constant
  * @type {object}
  * @default   
*/
const posterProps = {
    name: "posterfile",
    multiple: false,
    accept: ".jpg,.jpeg,.png",
    maxCount: 1,

    /**
 * Checks file type before uploading
  /**
 * @function beforeUpload
 * @param {any} file - Passing file
 * @returns {boolean} - Returns true for a valid file
 */
    beforeUpload(file: any) {
        //console.log({ File });
        if (file.type === "image/jpg" || file.type === "image/jpeg" || file.type === "image/png") {
            return true;
        } else {
            notification["error"]({
                message: "File type error",
                description: "Only jpg, jpeg, png file extensions are allowed",
                placement: "topRight",
            });
            file.status = "error";
            return false;
        }
    },
};

function ProfileImage({ imageUrl, edit = false, onUploadFinish = () => {} }: IProfileImage) {
    const [isImageUploaded, setIsImageUploaded] = useState("");
    const [loading, setLoading] = useState(false);

    /**
 * Function called when a Video file or Thumbnail image file is uploaded
  /**
 * @function customRequest
 * @param {any} e - File details
 * @param {string} type - File type Video/Thumbnail
 * @throws Will throw an error File upload fails
 */
    function customRequest(e: any, type: string) {
        setLoading(true);
        const { file } = e;
        uploadFile(file)
            .then(({ original, id }) => {
                onUploadFinish({ original, id });
                setIsImageUploaded(original);
                setLoading(false);
            })
            .catch((e) => {
                console.error(e);
                setLoading(false);
            });
    }

    return (
        <div>
            {edit ? (
                <Upload
                    {...posterProps}
                    listType="picture"
                    showUploadList={false}
                    disabled={loading}
                    customRequest={(e) => customRequest(e, "poster")}
                >
                    <Spin tip="Loading..." spinning={loading}>
                        {isImageUploaded ? (
                            <img
                                src={imageUrl}
                                alt="avatar"
                                style={{ width: "200px", height: "200px", borderRadius: "50%" }}
                            />
                        ) : (
                            <Row style={{ position: "relative" }}>
                                <Row justify="center" align="middle">
                                    <img
                                        src={imageUrl}
                                        alt="avatar"
                                        style={{
                                            width: "200px",
                                            height: "200px",
                                            borderRadius: "50%",
                                            opacity: ".3",
                                        }}
                                    />
                                </Row>
                                <Row
                                    style={{
                                        position: "absolute",
                                        left: 0,
                                        top: "35%",
                                        display: "flex",
                                        justifyContent: "center",
                                        textAlign: "center",
                                    }}
                                >
                                    <EditOutlined />
                                    Click To Update Brand Image
                                </Row>
                            </Row>
                        )}
                    </Spin>
                </Upload>
            ) : (
                <Avatar
                    shape="circle"
                    src={
                        imageUrl ||
                        "https://media.istockphoto.com/vectors/image-preview-icon-picture-placeholder-for-website-or-uiux-design-vector-id1222357475?k=20&m=1222357475&s=170667a&w=0&h=YGycIDbBRAWkZaSvdyUFvotdGfnKhkutJhMOZtIoUKY="
                    }
                    //   style={{ objectFit: "none" }}
                    size={{
                        xs: 130,
                        sm: 200,
                        md: 200,
                        lg: 200,
                        xl: 200,
                        xxl: 200,
                    }}
                />
            )}
        </div>
    );
}

export default ProfileImage;

/**
 * Function called when a Thumbnail image file is uploaded
  /**
 * @function uploadFile
 * @param {object} file - File 
 * @throws Will throw an error File upload fails
 */
async function uploadFile(file: any) {
    const { name } = file;
    try {
        const {
            data: { uploadUrl, id },
        } = await createVideoService.createUploadRequestService(name);

        await createVideoService.uploadFileUsingUploadReqIdService(uploadUrl, file);

        const {
            data: {
                urls: { original },
            },
        } = await createVideoService.verifyUploadReqService(id);
        return { original, id };
    } catch (error) {
        throw error;
    }
}
