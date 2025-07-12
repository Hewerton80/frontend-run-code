import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLoginPage from "./pages/AuthLoginPage";
// import { SignUp } from "./pages/SignUp";
// import { VerifyEmail } from "./pages/VerifyEmail";
// import { Home } from "./pages/Home";
// import { SignIn } from "./pages/SignIn";
// import { In } from "./pages/In";

export const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route />
        <Route index path="/login" element={<AuthLoginPage />} />
        {/* <Route path="/" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="verify" element={<VerifyEmail />} />
        <Route path="in" element={<In />}>
          <Route path="home" element={<Home />} />
        </Route>
        <Route path="*" element={<h1>404 - Not Found</h1>} />
        */}
      </Routes>
    </BrowserRouter>
  );
};
