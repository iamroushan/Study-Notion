import axios from "axios"

// export const axiosInstance = axios.create({});

export const apiConnector = async (method, url, bodyData, headers, params) => {
    console.log(method, url, bodyData);
    const response =  await axios({
        method: `${method}`,
        url: `${url}`,
        data: bodyData,
        headers: headers,
        params: params,
    });
    console.log("the response in apiconnector : " , response);
    return response;
}