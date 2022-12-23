// const port = "http://localhost:9000/.netlify/functions/api";
const port = "https://api.mamossa.com/.netlify/functions/api";

const API_PUBLIC_URL = `${port}`;
const API_AUTH_URL = `${port}/auth/`;
const API_USER_URL = `${port}/user/`;
const API_ADDRESS_URL = `${port}/address/`;
const API_PAYMENT_URL = `${port}/payment/`;

export {
    API_PUBLIC_URL,
    API_AUTH_URL,
    API_USER_URL,
    API_ADDRESS_URL,
    API_PAYMENT_URL
}