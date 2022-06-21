import { createAsyncThunk } from "@reduxjs/toolkit";
import server from "../../../../api";
import { axiosResHandle, axiosErrHandle } from "../../../../api/axiosHandle";
import {
    SignupStepFormOneParamsType,
    SignupStepFormTwoParamsType,
    SignupStepThreeParamsType,
} from "../../../Models/Auth/signup.type";

// Signup
// Step one
const signUpStepValidationService_StepOne = async (data: SignupStepFormOneParamsType) => {
    return server.post("/session/stepValidation", data);
};

export const signUpStepValidationStepOneAction = createAsyncThunk(
    "auth/signup/step-one",
    async (params: SignupStepFormOneParamsType, { rejectWithValue }) => {
        try {
            const res = await signUpStepValidationService_StepOne(params);
            return axiosResHandle(res);
        } catch (err) {
            return rejectWithValue(axiosErrHandle(err));
        }
    }
);

// Signup
// Step two
const signUpStepValidationService_StepTwo = async (data: SignupStepFormTwoParamsType) => {
    return server.post("/session/stepValidation", data);
};

export const signUpStepValidationStepTwoAction = createAsyncThunk(
    "auth/signup/step-two",
    async (params: SignupStepFormTwoParamsType, { rejectWithValue }) => {
        try {
            const res = await signUpStepValidationService_StepTwo(params);
            return axiosResHandle(res);
        } catch (err) {
            return rejectWithValue(axiosErrHandle(err));
        }
    }
);

// Signup
// Step three
const signUpStepValidationService_StepThree = async (data: SignupStepThreeParamsType) => {
    return server.post("/session/stepValidation", data);
};

export const signUpStepValidationStepThreeAction = createAsyncThunk(
    "auth/signup/step-three",
    async (params: SignupStepThreeParamsType, { rejectWithValue }) => {
        try {
            const res = await signUpStepValidationService_StepThree(params);
            return axiosResHandle(res);
        } catch (err) {
            return rejectWithValue(axiosErrHandle(err));
        }
    }
);
