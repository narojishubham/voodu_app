import { Card, Col, Row, Typography } from "antd";
import DownloadButton from "../../Components/DownloadQrButton/DownloadButton";

function QrCard({ profileData }: any) {
    // console.log("url 1111", profileData?.data?.account?.qrCode);
    return (
        <Card className="cardBorder">
            <Col>
                <Typography.Title level={3}>QR Code</Typography.Title>
            </Col>
            <Row justify="center">
                <img
                    style={{
                        width: "145px",
                        height: " 132px",
                        margin: " 1rem 0 1.9rem 0",
                    }}
                    src={profileData?.data?.account?.qrCode}
                ></img>
            </Row>
            <Row justify="center">
                <DownloadButton QRCodeURL={profileData?.data?.account?.qrCode} />
            </Row>
        </Card>
    );
}

export default QrCard;
