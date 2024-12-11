import { Outlet, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { Footer, Navbar } from "./components";
import {
  About,
  AuthPage,
  Users,
  UserProfile,
  FindProjects,
  ProjectDetail,
  UploadProject,
} from "./pages";
import { useSelector } from "react-redux";

function Layout() {
  //const user = true;
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  console.log(user);

  return user?.token ? (
    <Outlet />
  ) : (
    <Navigate to="/user-auth" state={{ from: location }} replace />
  );
}

function App() {
  const { user } = useSelector((state) => state.user);
  return (
    <main className="bg-[#f7fdfd]">
      <Navbar />

      <Routes>
        {/* Pages accessible when authenticated*/}
        <Route element={<Layout />}>
          <Route
            path="/"
            element={<Navigate to="/find-projects" replace={true} />}
          />
          <Route path="/find-projects" element={<FindProjects />} />
          <Route path="/user" element={<Users />} />
          <Route path={"/user-profile"} element={<UserProfile />} />
          <Route path={"/user-profile/:id"} element={<UserProfile />} />
          <Route path={"/upload-project"} element={<UploadProject />} />
          <Route path={"/project-detail/:id"} element={<ProjectDetail />} />
        </Route>

        {/* <Route path="/about-us" element={<About />} /> */}
        <Route path="/user-auth" element={<AuthPage />} />
      </Routes>
      {/* Pages accessible when NOT authenticated*/}

      {user && <Footer />}
      {/*Shows footer only when logged in */}
    </main>
  );
}

export default App;
