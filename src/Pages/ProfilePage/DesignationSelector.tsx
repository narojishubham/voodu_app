import { Select } from "antd";
import React, { useEffect, useState } from "react";
import getDesignationsAction, {
    GetDesignationResponseType,
} from "../../Shared/Redux/Actions/brand/designation/getDesignation.action";
import { useAppDispatch } from "../../Shared/Redux/store";

function DesignationSelector({ onChange = () => {}, value }: any) {
    const dispatch = useAppDispatch();
    /**
     * Fetching available designation list
     * @async
     * @function loadDesignation
     * @throws When fetching designation list fails
     */
    const [data, setData] = useState<GetDesignationResponseType[] | any>([]);
    const designations = async () => {
        const response = await dispatch(getDesignationsAction()).unwrap();
        // dispatch(getDesignationsAction()).unwrap()
        // .then((response) => {
        console.log("setData setData setData", response);
        try {
            setData(response);
            // })
        } catch (error) {
            // .catch((error) => {
            console.log("getCategoriesAction error", error);
            // });
        }
    };
    useEffect(() => {
        designations();
        console.log("optionsoptions options options", data);
    }, []);

    return (
        <Select
            value={value}
            placeholder="Select Designation"
            optionFilterProp="children"
            labelInValue
            onChange={onChange}
            // options={options}
            style={{ width: "10vw" }}
        >
            {data?.map((item: any) => (
                <Select.Option key={item.id} value={item.id}>
                    {item.name}
                </Select.Option>
            ))}
        </Select>
    );
}

export default DesignationSelector;
