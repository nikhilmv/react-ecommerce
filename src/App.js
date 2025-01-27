import React from "react";
import { Route, Routes } from "react-router-dom";
import { UserLayout } from "./layouts/UserLayout"; 
import { UserPublicRoute } from "./routes/user/UserPublicRoute";
import { UserLogin } from "./pages/User/UserLogin";
import { UserRegister } from "./pages/User/UserRegister";
import { Home } from "./pages/User/Home/Home";
import { useUserAuthChecked } from "./hooks/userUserAuthChecked";
import { PublicRoute } from "./routes/admin/PublicRoute";
import { AdminLogin } from "./components/admin/AdminLogin";
import { Dashboard }  from "./components/admin/Dashboard";
import { AdminLayout } from "./layouts/AdminLayout";


function App() {
  const userAuthChecked = useUserAuthChecked();

  return (
    <Routes>

      <Route
        path="/AdminLogin"
        element={
          <PublicRoute>
            <AdminLogin />
          </PublicRoute>
        }
      />

      {/* user routes start */}
      <Route path="/" element={<UserLayout />}>
        {/* login and register routes */}
        <Route
          path="/register"
          element={
            <UserPublicRoute>
              <UserRegister />
            </UserPublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <UserPublicRoute>
              <UserLogin />
            </UserPublicRoute>
          }
        />
        <Route path="/" element={<Home />} />
   
      </Route>
      {/* user routes end */}


      {/* admin routes start */}

      <Route path="/admin" element={<AdminLayout />}>
        <Route path="/admin/dashboard" element={<Dashboard />} />
      </Route>

      {/* admin routes end */}

    </Routes>
    
  );
}

export default App;

