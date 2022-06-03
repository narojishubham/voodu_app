import { List, Typography } from "antd";
import React, { useEffect } from "react";
import "./Analytic.css";

interface ITableEntry {
  value: number | string;
  label: string;
}

interface IDataTable {
  //   ListItemTemplate: ReactNode;
  ListItemTemplate?: any;
  data?: ITableEntry[];
  Header: string;
}

function DataTable({
  ListItemTemplate = DefaultListItem,
  data = [],
  Header,
}: IDataTable) {
  // console.log("data", data);
  // const data = [
  //   {
  //     name: "Little Flower - Single Estate Coffee",
  //     totle: 1000,
  //   },
  //   {
  //     totle: 1000,
  //     name: "Filter Coffee Decoction",
  //   },
  //   {
  //     name: "Goji Berry Nut Mix",
  //     totle: 1000,
  //   },
  //   {
  //     name: "Choco-Nut Energy Bar",
  //     totle: 1000,
  //   },
  // ];

  return (
    <div
      className=" tableContainer OverviewHoverClass"
      style={{ background: "#fff" }}
    >
      <List
        header={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              paddingTop: ".8rem",
            }}
          >
            <div>
              <div style={{ fontSize: "19px", fontWeight: "700" }}>
                {Header}
              </div>
              <div style={{ fontSize: "12px", color: "#9FA2B4" }}>Today</div>
            </div>
            {/* <div style={{ color: "#F2994A" }}>View All</div> */}
          </div>
        }
        bordered
        dataSource={data}
        style={{ height: 340 }}
        renderItem={(data: any) => <ListItemTemplate data={data} />}
      />
    </div>
  );
}

export default DataTable;

function DefaultListItem({ data }: any) {
  return (
    <List.Item extra={data.value}>
      {/* <List.Item.Meta title={<a href="https://ant.design">{data.label}</a>} /> */}

      <List.Item.Meta title={data.label} />

      {/* <List.Item.Meta title={data.label} /> */}
    </List.Item>
  );
}
