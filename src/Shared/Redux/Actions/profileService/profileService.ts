import axiosRequest from "../../../axios/axiosRequest";

// const token: AccData["token"] = JSON.parse(
//     localStorage.getItem("token") || "null"
//   );
  
  const getProfile = (): any => {
    return axiosRequest
      .get("/account/user_profile", {
        // headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        return response.data;
      });
  };
  
  const uploadProfileData = (
    posterId?: string,
    description?: string,
    firstName?: string,
    lastName?: string,
    designationId?: number
  ): any => {
    return axiosRequest
      .patch(
        "/account",
        { posterId, description, firstName, lastName, designationId },
        // { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        return response.data;
      });
  };
  
  const profileService = {
    getProfile,
    uploadProfileData,
  };
  export default profileService;