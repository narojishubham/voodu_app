import server from "../../../../api";
import { axiosErrHandle, axiosResHandle } from "../../../../api/axiosHandle";

const emailIsPresentService = async (email: string) => {
    try {
        const response = await server.post("/session/check_email", {
            email,
        });
        return axiosResHandle(response);
    } catch (err) {
        return axiosErrHandle(err);
    }
};

const emailValidatorService = async (email: string) => {
    try {
        const response = await server.post("/session/emailValidation", {
            email,
        });
        return axiosResHandle(response);
    } catch (err:any) {
        // return (err.response.data);
         throw err
    }
};

const phoneValidatorService = async (phone: string) => {
    try {
        const response = await server.post("/session/phoneValidation", {
            phone,
        });
        return axiosResHandle(response);
    } catch (err) {
        // return axiosErrHandle(err);
         throw err
    }
};

const brandNameValidatorService = async (businessName: string) => {
    try {
        const response = await server.post("/session/brandValidation", {
            businessName,
        });
        return axiosResHandle(response);
    } catch (err) {
        throw err
        // return axiosErrHandle(err);
    }
};

const brandDataValidationService = {
    emailIsPresentService,
    emailValidatorService,
    phoneValidatorService,
    brandNameValidatorService,
};

export default brandDataValidationService;