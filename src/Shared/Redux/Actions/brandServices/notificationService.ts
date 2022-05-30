import axiosRequest from "../../../axios/axiosRequest";
import { AccData } from "../../../features/authSlice/authSlice";


const token: AccData['token'] = JSON.parse(
  localStorage.getItem('token') || 'null'
);

const getNotification = (): any => {
  return axiosRequest
    .get('/account/notifications', {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      return response.data;
    });
};
const NotificationService = {
  getNotification,
};
export default NotificationService;