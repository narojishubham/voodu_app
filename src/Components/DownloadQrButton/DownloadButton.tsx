import React from "react";
import { saveAs } from "file-saver";
import { Button } from "antd";
// import Button from "../components/Partials/Button";

interface IQRCode {
    QRCodeURL: string;
}

function DownloadButton({ QRCodeURL }: IQRCode) {
    const saveFile = () => {
        saveAs(`${QRCodeURL}`, "QRcode.png");
    };
    return (
        <Button style={{ color: "rgb(242, 153, 74)", borderColor: "rgb(242, 153, 74)" }} ghost onClick={saveFile}>
            Download QR Code
        </Button>
    );
}
export default DownloadButton;
