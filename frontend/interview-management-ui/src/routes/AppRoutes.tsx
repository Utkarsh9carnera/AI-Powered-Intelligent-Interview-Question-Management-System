import { BrowserRouter, Routes, Route } from "react-router-dom";

import LandingPage from "../pages/landing/LandingPage";

import DashboardLayout from "../components/dashboard/DashboardLayout";

import DashboardPage from "../pages/dashboard/DashboardPage";
import ProfilePage from "../pages/Profile/ProfilePage";
import SearchPage from "../pages/Search/SearchPage";

import AdminsPage from "../components/users/AdminsPage";
import QuestionManagersPage from "../components/users/QuestionManagersPage";
import ViewersPage from "../components/users/ViewersPage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<LandingPage />}
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={<DashboardPage />}
        />

        {/* Profile */}
        <Route
          path="/profile"
          element={
            <DashboardLayout>
              <ProfilePage />
            </DashboardLayout>
          }
        />

        {/* Search */}
        <Route
          path="/search"
          element={
            <DashboardLayout>
              <SearchPage />
            </DashboardLayout>
          }
        />

        {/* Admins */}
        <Route
          path="/settings/admins"
          element={
            <DashboardLayout>
              <AdminsPage />
            </DashboardLayout>
          }
        />

        {/* Question Managers */}
        <Route
          path="/settings/question-managers"
          element={
            <DashboardLayout>
              <QuestionManagersPage />
            </DashboardLayout>
          }
        />

        {/* Viewers */}
        <Route
          path="/settings/viewers"
          element={
            <DashboardLayout>
              <ViewersPage />
            </DashboardLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;