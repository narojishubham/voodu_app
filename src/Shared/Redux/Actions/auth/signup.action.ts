import { createAsyncThunk } from "@reduxjs/toolkit";
import { ISignup } from "../../../interface/signupInterface";
import server from "../../../../api";
import { axiosResHandle, axiosErrHandle } from "../../../../api/axiosHandle";

export type SignupStepForm_One = {
    step?: string;
    businessName?: string;
    website?: string;
    brandCategory?: number;
};

const signUpStepValidationStep_One = async ({ step, businessName, website, brandCategory }: SignupStepForm_One) => {
    return server.post("/session/stepValidation", {
        step,
        businessName,
        website,
        brandCategory,
    });
};

export const signUpStepValidationStep11Action = createAsyncThunk(
    "auth/login",
    async (props: SignupStepForm_One, thunkAPI) => {
        try {
            console.log("in loginAction, ", { props });
            return await signUpStepValidationStep_One(props);
        } catch (err) {
            return thunkAPI.rejectWithValue(axiosErrHandle(err));
        }
    }
);

export interface SignupStepForm_Two {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    designationId?: number;
    phone?: string;
    step?: string;
    businessName?: string;
}

const signUpStepValidationStep_Two = async ({
    firstName,
    lastName,
    email,
    password,
    designationId,
    phone,
    step,
    businessName,
}: SignupStepForm_Two) => {
    return server.post("/session/stepValidation", {
        firstName,
        lastName,
        email,
        password,
        designationId,
        phone,
        step,
        businessName,
    });
};

export const signUpStepValidationStep22Action = createAsyncThunk(
    "auth/signupStepValidationStep2",
    async (props: SignupStepForm_Two, thunkAPI) => {
        try {
            return await signUpStepValidationStep_Two(props);
        } catch (err) {
            return thunkAPI.rejectWithValue(axiosErrHandle(err));
        }
    }
);

export interface ISignupStep3Form {
    step?: string;
    businessName?: string;
}
const signUpStepValidationStep33 = async ({ step, businessName }: ISignupStep3Form) => {
    return server.post("/session/stepValidation", { step, businessName });
};

export const signUpStepValidationStep33Action = createAsyncThunk(
    "auth/signupStepValidationStep3",
    async (props: ISignupStep3Form, thunkAPI) => {
        try {
            return await signUpStepValidationStep33(props);
        } catch (err) {
            return thunkAPI.rejectWithValue(axiosErrHandle(err));
        }
    }
);
