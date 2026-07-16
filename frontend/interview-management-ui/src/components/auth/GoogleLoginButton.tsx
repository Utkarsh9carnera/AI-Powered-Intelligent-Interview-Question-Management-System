import { GoogleLogin } from "@react-oauth/google";
import api from "../../services/api";

function GoogleLoginButton() {
  const handleSuccess = async (credentialResponse: any) => {
    try {
      if (!credentialResponse.credential) {
        alert("Google Login Failed");
        return;
      }

      const response = await api.post("/Auth/google-login", {
  idToken: credentialResponse.credential,
});

      // Store JWT Token
      localStorage.setItem("token", response.data.token);

      // Store User Details
      localStorage.setItem("user", JSON.stringify(response.data));

      console.log(response.data);

      // Redirect to Dashboard
      window.location.href = "/dashboard";
    } catch (error: any) {
      console.error("Login Error:", error);

      if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Response:", error.response.data);

        alert(JSON.stringify(error.response.data));
      } else {
        alert(error.message);
      }
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => alert("Google Login Failed")}
      useOneTap={false}
    />
  );
}

export default GoogleLoginButton;