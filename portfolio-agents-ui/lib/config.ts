export const getApiEndpoint = () => {
  const env = process.env.NEXT_PUBLIC_APP_ENV || "development";
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (apiUrl) {
    return apiUrl;
  }

  // Default endpoints based on environment
  switch (env) {
    case "production":
      return "https://api.portfolioagent.io";
    case "staging":
      return "https://staging-api.portfolioagent.io";
    case "development":
    default:
      return "http://localhost:3001";
  }
};