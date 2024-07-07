import axios from "axios";

class UploadImgAPI {
  constructor() {
    this.apiUrl =
      process.env.URL_UPLOAD_IMG || "https://api.imgbb.com/1/upload";
    this.apiKey =
      process.env.URL_UPLOAD_IMG_KEY || "5d5efefbe072ed037f95dc62c9143141";
    this.baseUrl = this.apiUrl + "?key=" + this.apiKey;

    this.client = axios.create({
      baseURL: this.baseUrl,
    });

    this.client.interceptors.response.use(this.handleSuccess, this.handleError);
  }

  handleSuccess(response) {
    return response.data;
  }

  handleError(error) {
    if (error.response) {
      // Xử lý lỗi từ phản hồi HTTP (HTTP error)
      return Promise.reject(error.response.data);
    } else if (error.request) {
      // Xử lý lỗi liên quan đến việc gửi yêu cầu (request error)
      return Promise.reject("Network error. Please try again later.");
    } else {
      // Xử lý lỗi khác
      return Promise.reject("An error occurred. Please try again later.");
    }
  }

  async uploadImg(dataImg, nameImg) {
    const formData = new FormData();
    formData.append("image", dataImg);
    formData.append("name", nameImg);

    // Make sure to use the API URL and API Key defined in the constructor
    const data = this.post(this.apiUrl + "?key=" + this.apiKey, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    try {
      const response = await data;
      return response;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  get(subURL) {
    return this.client.get(subURL);
  }

  post(subURL, data) {
    return this.client.post(subURL, data);
  }
  delete(subURL) {
    return this.client.delete(subURL);
  }
  put(subURL, data) {
    return this.client.put(subURL, data);
  }
}

export default new UploadImgAPI();
