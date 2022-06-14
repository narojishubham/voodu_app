import { Modal, Space, Row, Col } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import Button from "./Partials/Button";

interface DialogBoxProps {
    showDialog: boolean;
    cancelNavigation: any;
    confirmNavigation: any;
}

const DialogBox: React.FC<DialogBoxProps> = ({ showDialog, cancelNavigation, confirmNavigation }) => {
    return (
        <Modal closable={false} visible={showDialog} footer={null}>
            <div className="ant-modal-body">
                <div className="ant-modal-confirm-body-wrapper">
                    <div className="ant-modal-confirm-body">
                        <ExclamationCircleOutlined style={{ color: "#faad14" }} />
                        <span className="ant-modal-confirm-title">Confirm</span>
                        <div className="ant-modal-confirm-content">
                            Are you sure you want to leave? <br />
                            Your changes won't be saved!
                        </div>
                    </div>
                    <Row justify="end" gutter={[10, 0]}>
                        <Col>
                            <Button type="primary" onClick={cancelNavigation}>
                                <span>No</span>
                            </Button>
                        </Col>
                        <Col>
                            <Button type="primary" onClick={confirmNavigation}>
                                <span>Yes</span>
                            </Button>
                        </Col>
                    </Row>
                </div>
            </div>
        </Modal>
    );
};

export default DialogBox;
