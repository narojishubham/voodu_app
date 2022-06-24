import axios, { AxiosError, AxiosResponse } from "axios";

export const axiosResHandle = <T>(res: AxiosResponse<T>) => res.data;
export const axiosResErr = <T>(res: AxiosError<T>) => res.message;
export const axiosResErrNoRes = <T>(res: AxiosError<T>) => res.message;
export const errUnknown = (res: unknown) => `Unknown Error: ${res}`;
export const axiosErrHandle = (error: unknown) => {
    if (axios.isAxiosError(error)) {
        if (error.response) axiosResErr(error);
        if (error.request) axiosResErrNoRes(error);
        return errUnknown(error);
    }
    return errUnknown(error);
};
