import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor
apiClient.interceptors.request.use(
    (config) => {
        // Modify config before request is sent (e.g., add auth token)
        // const token = localStorage.getItem('token');
        // if (token) {
        //     config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
apiClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle errors (e.g., redirect to login on 401)
        if (error.response && error.response.status === 401) {
            // Redirect to login or handle unauthorized access
            // window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default apiClient;