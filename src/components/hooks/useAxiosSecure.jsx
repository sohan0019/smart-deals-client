import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const instance = axios.create({
  baseURL: 'http://localhost:3000',
})

const useAxiosSecure = () => {

  const navigate = useNavigate();
  const { user, SignOutUser } = useAuth();

  // set token in the header for all the api call using axiosSecure hook

  useEffect(() => {

    //  request interceptor

    const requestInterceptor = instance.interceptors.request.use((config => {

      const token = user?.accessToken;
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }

      return config;
    }));

    // response interceptor 

    const responseInterceptor = instance.interceptors.response.use(
      (res) => {
        return res;
      },
      (error) => {
        console.log('Error inside the interceptor', error);
        const status = error.response ? error.response.status : null;

        if (status === 401 || status === 403) {

          console.log('Log out the user for bad request')
          SignOutUser()
            .then(() => {
              navigate('/register')
            })
        }
        return Promise.reject(error);
      }
    );
    return () => {
      instance.interceptors.request.eject(requestInterceptor);
      instance.interceptors.request.eject(responseInterceptor);
    }

  }, [user, SignOutUser, navigate]);

  return instance;
};

export default useAxiosSecure;