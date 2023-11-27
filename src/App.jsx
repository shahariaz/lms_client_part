import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./app.css";
import { AuthProvider } from "./AuthContextApi";
import { CourseProvider } from "./CourseContextApi"; // Update the path
import NewCourse from "./pages/newCours/NewCourse";
import CourseDetails from "./components/CourseDetails/CourseDetails";
import CourseList from "./components/CourseList/CourseList";
import {
  Temp,
  Teacher,
  Hw,
  AdminPage,
  Forget,
  PrivacyPolicy,
  Ulogin,
  Hwtest,
  Parentpage,
  Support,
  TrainingPage,
  ChildrenList,
  CourseTest,
} from "./routes/Routes";
import Video from "./test/Video";
import ChildPage from "./components/childDetail/ChildPage";

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CourseProvider>
          <Routes>
            <Route path="/" element={<Ulogin />} />
            <Route path="/temp" element={<Temp />} />
            <Route path="/teacher/:id" element={<Teacher />} />
            <Route path="/homework" element={<Hw />} />
            <Route path="/admin:id" element={<AdminPage />} />
            <Route path="/video" element={<Video />} />
            <Route path="/forgot-password" element={<Forget />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/testhw" element={<Hwtest />} />
            <Route path="/test-course" element={<CourseTest />} />
            <Route path="/support" element={<Support />} />
            <Route path="/parent/:id" element={<Parentpage />} />
            <Route path="/parent/child/:id" element={<ChildrenList />} />
            <Route path="/training" element={<TrainingPage />} />
            <Route path="/child/:id" element={<ChildPage />} />
            <Route path="/new-course" element={<NewCourse />} />
            <Route path="/courses" element={<CourseList />} />
            <Route path="/courses/:courseId" element={<CourseDetails />} />
          </Routes>
        </CourseProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
