import { Card, Col, notification, Row, Spin } from "antd";
import { useEffect, useState } from "react";
import "./overview.css";
import { SmileOutlined } from "@ant-design/icons";
import { get } from "lodash";
import DataViewCard from "../../Components/Analytic/DataViewCard";
import DataTable from "../../Components/Analytic/DataTable";
import analyticService from "../../Shared/Redux/Actions/analytics/analyticService.service";
import { getNotificationService } from "../../Shared/Redux/Actions/brand/notification.service";
import DataGraph from "../../Components/Analytic/DataGraph";
import { RootState, useAppDispatch } from "../../Shared/Redux/store";
import { useSelector } from "react-redux";

const OverviewPage = () => {
    const dispatch = useAppDispatch();
    const [active, setActive] = useState<any>(null);
    const [trialNotification, setTrialNotification] = useState([]);

    const loadNotification = async () => {
        getNotificationService()
            .then((data: any) => {
                setTrialNotification(data);

                if (data.data.type === "notificationOne") {
                    notification.open({
                        message: "Plan About to end",
                        description: "hello your free versio will get over in next 21 days.",
                        icon: <SmileOutlined style={{ color: "#108ee9" }} />,
                    });
                } else if (data.data.type === "notificationTwo") {
                    notification.open({
                        message: "Plan About to end",
                        description: "hello your free versio will get over in next 14 days.",
                        icon: <SmileOutlined style={{ color: "#108ee9" }} />,
                    });
                } else if (data.data.type === "notificationThree") {
                    notification.open({
                        message: "Plan About to end",
                        description: "hello your free versio will get over in next 7 days.",
                        icon: <SmileOutlined style={{ color: "#108ee9" }} />,
                    });
                }
            })
            .catch((error: any) => {
                // console.log("notification error");
            });
    };
    const [averageWatchTime, setAverageWatchTime] = useState(0);
    const [completionRatio, setCompletionRatio] = useState(0);
    const [clickThrough, setClickThrough] = useState(0);
    const [activeTime, setActiveTime] = useState(0);
    const [numberOfViews, setNumberOfViews] = useState(0);
    const [watchTime, setWatchTime] = useState(0);
    const [viewCta, setViewCta] = useState(0);
    const [numberOfViewers, setNumberOfViewers] = useState(0);
    const [loading, setLoading] = useState(false);

    let accountId = useSelector((state: RootState) => state.auth.userData?.data.accountId);
    // console.log("userData accountId data accountId", accountId);

    const overViewSmallCardData = (accountId: number = -1) => {
        setLoading(true);
        analyticService.GetBrandData(accountId).then((resp: any) => {
            setAverageWatchTime(resp.average_watch_time);
            setCompletionRatio(resp.completion_rate);
            setActiveTime(resp.total_active_views);
            setClickThrough(resp.conversion_rate);
            setNumberOfViews(resp.total_views);
            setWatchTime(resp.total_watch_time);
            setViewCta(resp.total_conversions);
            setNumberOfViewers(resp.total_unique_views);
            setLoading(false);
        });
    };
    const average_watch_time = averageWatchTime;
    const completion_rate = completionRatio;
    const conversion_rate = clickThrough;
    const total_active_views = activeTime;
    // const total_completions=
    const total_conversions = viewCta;
    const total_unique_views = numberOfViews;
    const total_views = numberOfViewers;
    const total_watch_time = watchTime;

    // Get TOP 5 VIDEO DATA ON LEFT CARD

    const [getTopHashtagsData, setGetTopHashtagsData] = useState<any[]>([]);
    const [getTopVideosData, setGetTopVideossData] = useState<any[]>([]);

    useEffect(() => {
        setLoading(true);

        overViewSmallCardData(accountId);
        analyticService.GetTopHashtags(accountId).then((res) => {
            // console.log("0000 0 00 setGetTopHashtagsData 00 0 0 0", res);
            setGetTopHashtagsData(
                Object.keys(get(res, "total_views")).map((key: any) => ({
                    label: key,
                    value: get(res, "total_views")[key],
                }))
            );
        });
        analyticService.GetVidedoData(accountId).then((res: any) => {
            console.log("test getvideo data ", res);
            setGetTopVideossData(
                Object.keys(get(res, "total_views")).map((key: any) => ({
                    label: key,
                    value: get(res, "total_views")[key],
                }))
            );
        });
    }, []);

    return (
        <>
            {loading ? (
                <Row style={{ height: "100%" }} justify={"center"} align={"middle"}>
                    <Spin />
                </Row>
            ) : (
                <>
                    <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="space-around">
                        {/* <Col span={22}> */}
                        <Col span={24}>
                            <Row
                                style={{
                                    display: "flex",
                                    flexDirection: "row",
                                    justifyContent: "space-around",
                                }}
                            >
                                <Col span={5}>
                                    <DataViewCard
                                        onClickData={active}
                                        // onClickData={setActive(i)}
                                        cardWidth={"285px"}
                                        cardTitle={"Average Watch Time"}
                                        analyticReading={`${average_watch_time}`}
                                    />
                                </Col>
                                <Col span={5}>
                                    <DataViewCard
                                        onClickData={active}
                                        // onClickData={setActive(i)}
                                        cardWidth={"285px"}
                                        cardTitle={"Completion Rate"}
                                        analyticReading={`${completion_rate}%`}
                                    />
                                </Col>
                                <Col span={5}>
                                    <DataViewCard
                                        onClickData={active}
                                        // onClickData={setActive(i)}
                                        cardWidth={"285px"}
                                        cardTitle={"Click throughs (CTR)"}
                                        analyticReading={`${conversion_rate}%`}
                                    />
                                </Col>
                                <Col span={5}>
                                    <DataViewCard
                                        onClickData={active}
                                        cardWidth={"285px"}
                                        cardTitle={"Active Views"}
                                        analyticReading={`${total_active_views}`}
                                    />
                                </Col>
                                <Col span={5}>
                                    <DataViewCard
                                        onClickData={active}
                                        cardWidth={"285px"}
                                        cardTitle={"Conversions (CTA)"}
                                        analyticReading={`${total_conversions}`}
                                    />
                                </Col>
                                <Col span={5}>
                                    <DataViewCard
                                        onClickData={active}
                                        // onClickData={setActive(i)}
                                        cardWidth={"285px"}
                                        cardTitle={"No. of Viewers"}
                                        analyticReading={`${total_views}`}
                                    />
                                </Col>
                                <Col span={5}>
                                    <DataViewCard
                                        onClickData={active}
                                        // onClickData={setActive(i)}
                                        cardWidth={"285px"}
                                        cardTitle={"Video Views"}
                                        analyticReading={`${total_unique_views}`}
                                    />
                                </Col>
                                <Col span={5}>
                                    <DataViewCard
                                        onClickData={active}
                                        // onClickData={setActive(i)}
                                        cardWidth={"285px"}
                                        cardTitle={"Total Watch Time"}
                                        analyticReading={`${total_watch_time}`}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row justify="space-around" style={{ paddingTop: "2.5rem" }}>
                        <Col span={24}>
                            <Row style={{ display: "flex", justifyContent: "center" }}>
                                <Col span={23}>
                                    <Card style={{ height: "34rem" }} className="OverviewHoverClass">
                                        <Row
                                            style={{
                                                fontSize: "19px",
                                                fontWeight: 700,
                                                paddingTop: "0.3rem ",
                                                paddingBottom: "2rem",
                                            }}
                                        >
                                            Today’s trends
                                        </Row>
                                        <Row
                                            style={{ display: "flex", flexDirection: "column" }}
                                            className="graphParentClass"
                                        >
                                            <DataGraph />
                                        </Row>
                                    </Card>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row justify="space-around">
                        <Col span={23}>
                            <Row justify="center" style={{ marginTop: "3rem" }}>
                                <Col span={12} style={{ paddingRight: "1.1rem" }}>
                                    <DataTable data={getTopVideosData} Header={"Top Five Most Viewed Videos"} />
                                </Col>
                                <Col span={12} style={{ paddingLeft: "1.1rem" }} className="parentClassForDataTable">
                                    <DataTable data={getTopHashtagsData} Header={"Top Five Hashtags"} />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </>
            )}
        </>
    );
};
export default OverviewPage;
