import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./app.css";

import {
  Temp,
  Teacher,
  Hw,
  AdminPage,
  Forget,
  PrivacyPolicy,
  Ulogin,
} from "./routes/Routes";
import Video from "./test/Video";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Ulogin />} />
        <Route path="/temp" element={<Temp />} />
        <Route path="/teacher" element={<Teacher />} />
        <Route path="/homework" element={<Hw />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/video" element={<Video />} />
        <Route path="/forgot-password" element={<Forget />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
