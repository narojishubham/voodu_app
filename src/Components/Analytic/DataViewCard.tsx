import { Card, Row } from "antd";
import Title from "antd/lib/typography/Title";
import "./card.css";
interface IOverview {
    cardTitle: string;
    analyticReading: string;
    cardWidth: string;
    isActive?: boolean;
    onClickData?: any;
}

function DataViewCard({ cardTitle, analyticReading, cardWidth, isActive, onClickData }: IOverview) {
    return (
        <Row className="dataCard">
            <Card
                style={{
                    width: `${cardWidth}`,
                    borderRadius: "8px",
                }}
                className={`${
                    isActive ? "ClickBorderClass" : ""
                }   dataCardContainer overview_data_cards OverviewHoverClass`}
                hoverable
                onClick={() => {
                    console.log("isActive", isActive);
                    console.log("test test onClickData", onClickData);
                }}
            >
                <Row
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "space-around",
                    }}
                >
                    <Row
                        className={isActive ? "ClickTextColor" : "textColor"}
                        style={{
                            fontWeight: 700,
                            fontSize: "1rem",
                            fontFamily: "roboto",
                            textAlign: "center",
                            color: "#1465b0",
                        }}
                    >
                        {cardTitle}
                    </Row>
                    <Title
                        className={isActive ? "ClickTextColor" : ""}
                        style={{
                            fontWeight: 700,
                            fontSize: "35px",
                            marginBottom: "0",
                            fontFamily: "roboto",
                        }}
                        level={3}
                    >
                        {analyticReading}
                    </Title>
                </Row>
            </Card>
        </Row>
    );
}

export default DataViewCard;
