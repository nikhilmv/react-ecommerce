import React from "react";
import { Route, Routes } from "react-router-dom";
import { UserLayout } from "./layouts/UserLayout"; 
import { UserPublicRoute } from "./routes/user/UserPublicRoute";
import { UserLogin } from "./pages/User/UserLogin";
import { UserRegister } from "./pages/User/UserRegister";
import { Home } from "./pages/User/Home/Home";
import { useUserAuthChecked } from "./hooks/userUserAuthChecked";
import { PublicRoute } from "./routes/admin/PublicRoute";
import { PrivateRoute } from "./routes/admin/PrivateRoute";
import { AdminLogin } from "./components/admin/AdminLogin";
import { Dashboard }  from "./components/admin/Dashboard";
import { AdminLayout } from "./layouts/AdminLayout";
import { AddProduct }  from "./components/admin/Product/AddProduct";
import { AllProducts }  from "./components/admin/Product/AllProducts"; 

import { Products } from "./pages/User/Product/Products";
import { ProductDetails } from "./pages/User/ProductDetails/ProductDetails";
import { Cart } from "./pages/User/Cart/Cart";
import { NotFound } from "./pages/User/NotFound/NotFound";

function App() {
  const userAuthChecked = useUserAuthChecked();

  return (
    <Routes>

      <Route
        path="/admin"
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
   

        <Route path="/products" element={<Products />} />
 
        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path="/cart" element={<Cart />} />


        <Route path="*" element={<NotFound />} /> 

      </Route>
      {/* user routes end */}


      {/* admin routes start */}

      <Route path="/admin" element={<AdminLayout />}>
        <Route path="/admin/dashboard" element={
            <PrivateRoute>
              <Dashboard /> 
            </PrivateRoute>
          } />

        <Route path="/admin/add-product" element={
            // <PrivateRoute>
              <AddProduct />
            // </PrivateRoute>
          }
        />
        
        <Route path="/admin/all-products" element={
            // <PrivateRoute>
              <AllProducts />
            // </PrivateRoute>
          }
        />

      </Route>



      {/* admin routes end */}

    </Routes>
    
  );
}

export default App;

