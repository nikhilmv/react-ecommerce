
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAdminLoginMutation } from "../../features/auth/authApi";
 
 

export const AdminLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

 
    const navigate = useNavigate();
 
    const [adminLogin, { isLoading, isSuccess, error: resError }] =  useAdminLoginMutation();


   
    // console.log("Redux State:", useSelector((state) => state.adminAuth));
    // console.log("Local Storage:", JSON.parse(localStorage.getItem("adminAuth")));

    useEffect(() => {
        if (!isLoading && isSuccess) {
         console.log("Admin Login SuccessFull");
         
          // toast.success("Admin Login SuccessFull");
          return navigate("/admin/dashboard");
        }
        if (!isLoading && !isSuccess && resError) {
            setError(resError.data?.message);
            console.log(resError)
        }
      }, [isLoading, isSuccess, navigate, resError]);



   //admin Login Handler
   const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
   adminLogin({ email, password });
//    fetch("http://localhost:5000/api/login", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ email: email, password: password }),
//   }).then((res) => res.json())
//     .then((data) => console.log("✅ Response:", data))
//     .catch((err) => console.error("❌ Error:", err));
  };
 

    return (
        <> 
            <main className="w-full mt-12 sm:pt-20 sm:mt-0">

                {/* <!-- row --> */}
                <div className="flex sm:w-4/6 sm:mt-4 m-auto mb-7 bg-white shadow-lg">
                    {/* <!-- sidebar column  --> */}
                    <div className="loginSidebar bg-primary-blue p-10 pr-12 hidden sm:flex flex-col gap-4 w-2/5">
                        <h1 className="font-medium text-white text-3xl">Admin Login</h1>
                        <p className="text-gray-200 text-lg">Get access to Admin panel</p>
                    </div>
                    {/* <!-- sidebar column  --> */}

                    {/* <!-- login column --> */}
                    <div className="flex-1 overflow-hidden">

                        {/* <!-- edit info container --> */}
                        <div className="text-center py-10 px-4 sm:px-14">

                            {/* <!-- input container --> */}
                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-col w-full gap-4">

                                    <TextField
                                        fullWidth
                                        id="email"
                                        label="Email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <TextField
                                        fullWidth
                                        id="password"
                                        label="Password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    {/* <span className="text-xxs text-red-500 font-medium text-left mt-0.5">Please enter valid Email ID/Mobile number</span> */}

                                    {/* <!-- button container --> */}
                                    <div className="flex flex-col gap-2.5 mt-2 mb-32">
                                        <button type="submit" className="text-white py-3 w-full bg-primary-orange shadow hover:shadow-lg rounded-sm font-medium">Login</button>
                                    </div>
                                    {/* <!-- button container --> */}

                                </div>
                            </form>
                            {/* <!-- input container --> */}

                        </div>
                        {/* <!-- edit info container --> */}

                    </div>
                    {/* <!-- login column --> */}
                </div>
                {/* <!-- row --> */}

            </main>
        </>
    );

};