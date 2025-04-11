export const envConfig = {
  BASE_API_URL: "http://localhost:3001/api",
  TOKEN: window ? null : localStorage.getItem("access_token"), // This is just a placeholder. In a real application, you would retrieve the token from a secure storage or context.

  // TOKEN:
  //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTc0NDA1NTI3MCwiZXhwIjoxNzQ0MzE0NDcwfQ.uRzwwV5CK6KMoqTaqGRQBDJM2RcRmLCVLtl8C1MtFUI",
};
