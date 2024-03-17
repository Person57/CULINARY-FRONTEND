import axios from "axios";




let userId = JSON.parse(localStorage.getItem("user")).userId


export class adminPanalApiServices {

    static baseURL = "https://culinary-ijbc.vercel.app";

    static createPost = (bodyData) => {

        console.log(bodyData)

        let userUrl = `${this.baseURL}/api/createposts`;

        return axios.post(userUrl, bodyData);
    };
    static getnotification = () => {



        let userUrl = `${this.baseURL}/api/getnotifications?user_id=${userId}`;

        return axios.get(userUrl, {});
    };
    static acceptUser = (Touser, type, userName) => {
        let userUrl = `${this.baseURL}/api/userconnections?sentBy=${userId}&sentTo=${Touser}&type=${type}&name=${userName}`;
        return axios.put(userUrl);
    };

    static editPost = (bodyData) => {

        let userUrl = `${this.baseURL}/api/createposts`;

        return axios.post(userUrl, bodyData);
    };


    static userLike = (bodyData) => {
        const userUrl = `${this.baseURL}/api/like`;
        return axios.put(userUrl, bodyData);
    };

    static userUnLike = (bodyData) => {
        const userUrl = `${this.baseURL}/api/unlike`;
        return axios.put(userUrl, bodyData);
    };


    static userInvite = (bodyData) => {
        const { sentBy,
            sentTo,
            type,
            name } = bodyData

        const userUrl = `${this.baseURL}/api/userconnections?sentBy=${sentBy}&sentTo=${sentTo}&type=${type}&name=${name}`;
        return axios.put(userUrl, bodyData);
    };

    static userSavePost = (bodyData) => {
        const userUrl = `${this.baseURL}/api/updateUsers`;
        return axios.put(userUrl, bodyData);
    };

    static getCommunityDetails = () => {

        const userUrl = `${this.baseURL}/api/getcommunityposts?user_id=${userId}`;

        return axios.get(userUrl);
    };

    static updateNotification = (notifyId) => {

        const userUrl = ` https://culinary-ijbc.vercel.app/api/updatenotifications?notification_id=${notifyId}`;

        return axios.put(userUrl)
    }



    static addCartDetails = (BodyData) => {

        const userUrl = `${this.baseURL}/api/addcart`;

        return axios.post(userUrl, BodyData);
    };





    static getUserProfile = () => {

        const userUrl = ` ${this.baseURL}/api/getUsersdetails?user_id=${userId}`;
        return axios.get(userUrl, {});
    };

    static getNotifications = () => {
        const userUrl = `${this.baseURL}/api/getnotifications?user_id=${userId}`;
        return axios.get(userUrl, {});
    };


    static getNotifications = () => {
        const userUrl = `${this.baseURL}/api/getnotifications?user_id=${userId}`;
        return axios.get(userUrl, {});
    };



}
