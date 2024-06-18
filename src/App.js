import React from "react";
import { Route, Routes } from "react-router-dom";
import { UserLayout } from "./layouts/UserLayout"; 
import { UserPublicRoute } from "./routes/user/UserPublicRoute";
import { UserLogin } from "./pages/User/UserLogin";
import { UserRegister } from "./pages/User/UserRegister";
import { Home } from "./pages/User/Home/Home";


function App() {

  return (
    <Routes>

      {/* user routes */}
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

    </Routes>
    
  );
}

export default App;

