import { Card, Result } from "antd";

function SuccessMessage({ Usertitle, UsersubTitle }: any) {
  return (
    <>
      <Card>
        <Result
          style={{
            height: "70vh",
            margin: "auto",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            marginTop: "-2.3rem",
          }}
          status="success"
          title={Usertitle}
          subTitle={UsersubTitle}
        />
      </Card>
    </>
  );
}

export default SuccessMessage;
