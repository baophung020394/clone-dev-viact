import axiosClient from "./axiosClient";

export const signIn = async (username: string, password: string) => {
  try {
    const response = await axiosClient.post("/auth/login", {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const signUp = async (userData: any) => {
  try {
    const response = await axiosClient.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};
