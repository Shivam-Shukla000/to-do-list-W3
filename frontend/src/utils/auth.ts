import axios from "axios";

type IRegister = {
  name: string;
  email: string;
  password: string;
};

type ILogin = {
  email: string;
  password: string;
};
async function register(userData: IRegister) {
  console.log(userData);
  try {
    const response = await axios.post("http://localhost:4000/user", userData);
    return response;
  } catch (error) {
    console.log(error);
  }
}

async function login(userData: ILogin) {
  console.log(userData);
  try {
    const data = await axios.post("http://localhost:4000/user/login", userData);
    if (data.status === 200) {
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("id");
    }
    return data;
  } catch (error) {
    console.log(error);
  }
}
// async function logout(refreshToken: string) {
//   try {
//     const response = await axios.delete;
//   } catch (error) {}
// }
export { register, login };
