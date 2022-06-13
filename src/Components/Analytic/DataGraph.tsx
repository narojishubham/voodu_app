import React, { useState, useEffect } from "react";
import { Line } from "@ant-design/plots";
import { useSelector } from "react-redux";
import { RootState } from "../../Shared/Redux/store";
import analyticService from "../../Shared/Redux/Actions/analytics/analyticService.service";
import { Select } from "antd";

const { Option } = Select;

const DataGraph = () => {
    let accountId = useSelector((state: RootState) => state.auth.userData?.data.accountId);
    const [numberOfDays, setNumberOfDays] = useState(7);

    const [data, setData] = useState([]);
    const GraphData = async (accountId: number = -1, numberOfDays: number) => {
        const response = await analyticService.GetGraphData(accountId, numberOfDays);
        // .then((response) => {
        setData(response);
        // })
        // .catch((error) => {
        //     console.log("fetch data failed", error);
        // });
    };
    useEffect(() => {
        GraphData(accountId, numberOfDays);
        // handleChangeOnSelectDates;
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

    const handleChangeOnSelectDates = (value: number) => {
        // console.log("selected days", value);
        setNumberOfDays(value);
        GraphData(accountId, value);
    };
    return (
        <div style={{ position: "relative" }}>
            <Line {...config} />
            <div style={{ position: "absolute", top: "-16%", right: "3%" }}>
                <Select defaultValue={7} style={{ width: 120 }} onChange={handleChangeOnSelectDates}>
                    <Option value={7}>7 days</Option>
                    <Option value={30}>30 days</Option>
                    <Option value={365}>365 days</Option>
                </Select>
            </div>
        </div>
    );
};
export default DataGraph;
