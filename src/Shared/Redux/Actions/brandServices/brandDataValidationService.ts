import axiosRequest from "../../../axios/axiosRequest";

const checkEmail = (email?: string): any => {
    return axiosRequest.post('/session/check_email', {
      email,
    });
  };
  
  const emailValidator = (email?: string): any => {
    return axiosRequest.post('/session/emailValidation', {
      email,
    });
  };
  
  const phoneValidator = (phone?: string): any => {
    return axiosRequest.post('/session/phoneValidation', {
      phone,
    });
  };
  
  const brandNameValidator = (businessName?: string): any => {
    return axiosRequest.post('/session/brandValidation', {
      businessName,
    });
  };
  
  const brandDataValidationService = {
    checkEmail,
    emailValidator,
    phoneValidator,
    brandNameValidator,
  };
  
  export default brandDataValidationService;
  