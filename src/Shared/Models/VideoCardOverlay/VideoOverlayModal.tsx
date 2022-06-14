import React from 'react';
import { Card, Col, Row, Space, Modal, Typography } from 'antd';

interface VideoOverlayModalPropType {
  isVideoOverlaysVisible: boolean;
  setOverlaysOpt: React.Dispatch<React.SetStateAction<number>>;
  setIsVideoOverlaysVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setIsVideoOverlaysOptVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setTitleErr: React.Dispatch<React.SetStateAction<boolean>>;
  setLinkErr: React.Dispatch<React.SetStateAction<boolean>>;
}

const VideoOverlayModal = ({
  isVideoOverlaysVisible,
  setOverlaysOpt,
  setIsVideoOverlaysVisible,
  setIsVideoOverlaysOptVisible,
  setTitleErr,
  setLinkErr,
}: VideoOverlayModalPropType) => {
  const { Text } = Typography;
  const { Meta } = Card;

  /**
 * Function to close Video Overlays Modal
  /**
 * @function handleVideoOverlaysCancel
*/
  const handleVideoOverlaysCancel = () => {
    setIsVideoOverlaysVisible(false);
  };

  /**
* Function called when Video Overlays option is selected under Video Overlays Modal
/**
* @function handleVideoOverlaysOpt
*/
  const handleVideoOverlaysOpt = () => {
    setIsVideoOverlaysVisible(false);
    setIsVideoOverlaysOptVisible(true);
    setTitleErr(true);
    setLinkErr(true);
  };

  return (
    <Modal
      title="Video Overlays"
      visible={isVideoOverlaysVisible}
      okText="Close"
      closable
      onCancel={handleVideoOverlaysCancel}
      onOk={handleVideoOverlaysCancel}
      destroyOnClose={true}
      width={'60vw'}
      cancelButtonProps={{ style: { display: 'none' } }}
    >
      <Space direction="vertical" size={0.1}>
        <Text>Choose an interactive video overlay to add to the video</Text>
      </Space>
      <div className="site-card-wrapper">
        <Row gutter={16} justify="center">
          <Col>
            <Card
              hoverable
              style={{
                width: 200,
                borderStyle: 'solid',
                borderWidth: '3px',
              }}
              bodyStyle={{
                textAlign: 'center',
              }}
              cover={
                <img
                  alt="cta button"
                  src={process.env.PUBLIC_URL + '/images/cta_btn.jpg'}
                />
              }
              onClick={() => {
                setOverlaysOpt(1);
                handleVideoOverlaysOpt();
              }}
            >
              <Meta title="CTA Button" />
            </Card>
          </Col>
        </Row>
      </div>
    </Modal>
  );
};

export default VideoOverlayModal;
