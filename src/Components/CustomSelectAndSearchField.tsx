import { Select } from "antd";
import React, { useEffect, useState } from "react";

interface ISearchProps {
    getDataService: any;
    responseMapper?: (e: any) => any;
    onChange?: (e: any) => void;
    allowClear?: boolean;
    labelInValue?: boolean;
}

function CustomSelectAndSearchField(props: ISearchProps) {
    const [loading, setLoading] = useState(false);
    const {
        getDataService,
        responseMapper = (e: any) => e.data,
        allowClear = true,
        onChange = () => {},
        labelInValue = false,
    } = props;

    const [data, setData] = useState([]);

    const getData = async () => {
        setLoading(true);
        try {
            const res = await getDataService().then(responseMapper);
            setData(res);
            setLoading(false);
        } catch (error) {
            console.error("CustomSearch Error", error);
            setLoading(false);
        }
    };
    const onChangeHandler = (e: any) => {
        onChange && onChange(e);
    };

    const onSearch = () => {};

    useEffect(() => {
        getData();
    }, []);

    return (
        <Select
            loading={loading}
            showSearch
            placeholder={"Category"}
            allowClear={allowClear}
            onSearch={onSearch}
            labelInValue={labelInValue}
            onChange={onChangeHandler}
            // dropdownStyle={{
            //   display: cats.length === 0 ? "none" : "",
            // }}
        >
            {data.map((item: any) => (
                <Select.Option key={item.id} value={item.id}>
                    {item.name}
                </Select.Option>
            ))}
        </Select>
    );
}

export default CustomSelectAndSearchField;
