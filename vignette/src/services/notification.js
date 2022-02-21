import { toast } from "react-toastify";
import { NOTIFICATION_API, REMOVE_NOTIFICATION_API } from "../urls";
import axios from "axios";
const getAllNotificationOfCurrentUser = async () => {
  try {
    if (axios.defaults.headers.common["Authorization"]) {
      const response = await axios.get(`${NOTIFICATION_API}/`);
      return response;
    } else {
      const response = await axios.get(`${NOTIFICATION_API}/`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      return response;
    }
  } catch (error) {
    toast.error(error.response.data.errorMesssage);
  }
};

const deleteNotification = async (notificationId) => {
  try {
    if (axios.defaults.headers.common["Authorization"]) {
      const response = await axios.delete(
        `${REMOVE_NOTIFICATION_API}/${notificationId}`
      );
      return response;
    } else {
      const response = await axios.delete(
        `${REMOVE_NOTIFICATION_API}/${notificationId}`,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        }
      );
      return response;
    }
  } catch (error) {
    toast.error(error.response.data.errorMesssage);
  }
};

export { getAllNotificationOfCurrentUser, deleteNotification };
