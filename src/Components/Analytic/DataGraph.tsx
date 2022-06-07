import React, { useState, useEffect } from "react";
import { Line } from "@ant-design/plots";
import { useSelector } from "react-redux";
import { RootState } from "../../Shared/Redux/store";
import analyticService from "../../Shared/Redux/Actions/analytics/analyticService.service";

const DataGraph = () => {
    let accountId = useSelector((state: RootState) => state.auth.userData?.data.accountId);
    const [data, setData] = useState([]);
    const GraphData = (accountId: number = -1) => {
        analyticService
            .GetGraphData(accountId)
            .then((response) => {
                setData(response);
            })
            .catch((error) => {
                console.log("fetch data failed", error);
            });
    };
    useEffect(() => {
        GraphData(accountId);
    }, []);
    const config = {
        data,
        xField: "date",
        yField: "value",
        seriesField: "name",
        xAxis: {
            type: "time",
        },
        yAxis: {
            label: {
                formatter: (v: any) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
            },
        },
        fields: ["xG conceded", "Shot conceded"],
    };
    return <Line {...config} />;
};
export default DataGraph;
