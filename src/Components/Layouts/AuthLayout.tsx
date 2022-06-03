import { Row } from "antd";

const AuthLayout: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    return (
        <Row
            style={{ height: "100vh", backgroundColor: "#f5f5f5" }}
            className="test213"
            align="middle"
            justify="center"
        >
            {children}
        </Row>
    );
};

export default AuthLayout;
