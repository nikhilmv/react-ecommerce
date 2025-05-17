
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField'
import Avatar from '@mui/material/Avatar'
import FormControlLabel from '@mui/material/FormControlLabel'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import { useSnackbar } from 'notistack';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toast from "react-hot-toast";
import { useUserRegisterMutation } from "../../features/auth/userAuthApi";
 

export const UserRegister = () => {
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
 
    const [registerUser, { isLoading: resLoading, isSuccess, error: resError }] =   useUserRegisterMutation();
    
    const [avatar, setAvatar] = useState(); 
    const [avatarPreview, setAvatarPreview] = useState("preview.png");

    const [user, setUser] = useState({
        name: "",
        email: "",
        gender: "",
        password: "",
        cpassword: "",
    });
 
    const { name, email, gender, password, cpassword } = user;
  
    const handleRegister = (e) => {
        e.preventDefault();
        if (password.length < 8) { 
            toast.error("Password length must be atleast 8 characters");  
        }
        if (password !== cpassword) {
            toast.error("Password Doesn't Match");  

        }
        if (!avatar) {
            toast.error("Select Avatar");  

        }
      
        const formData = new FormData();
        formData.set("name", name);
        formData.set("email", email);
        formData.set("gender", gender);
        formData.set("password", password);
        formData.set("avatar", avatar);

        registerUser(formData);
 
    }


    useEffect(() => {
        if (!resLoading && isSuccess) {
            toast.success("Registration SuccessFull !");
            return navigate("/login");
          }
          if (resError != undefined) { 
            toast.error(resError.data?.message);
            
          } 
          
    }, [resLoading, isSuccess, resError, navigate]);


    const handleDataChange = (e) => {
        
        if (e.target.name === "avatar") {
         
            const reader = new FileReader(); 
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                     setAvatar(reader.result); 
                  
                }
            };
           
            reader.readAsDataURL(e.target.files[0]);
           
        } else {
             setUser({ ...user, [e.target.name]: e.target.value });
        }
    }


    return (
        <>
         
            { 
            <main className="w-full mt-12 sm:pt-20 sm:mt-0">

                {/* <!-- row --> */}
                <div className="flex md:w-4/6 sm:mt-4 m-auto mb-7 bg-white shadow-lg">

   
                <div className="loginSidebar bg-primary-blue px-9 py-10 hidden sm:flex flex-col gap-4 w-2/5">
                    <h1 className="font-medium text-white text-3xl">Looks like you're new here!</h1>
                    <p className="text-gray-200 text-lg pr-2">Sign up with your mobile number to get started</p>
                </div>

                    {/* <!-- signup column --> */}
                    <div className="flex-1 overflow-hidden">

                        {/* <!-- personal info procedure container --> */}
                        <form
                            onSubmit={handleRegister} 
                            encType="multipart/form-data"
                            className="p-5 sm:p-10"
                        >
                            <div className="flex flex-col gap-4 items-start">

                                {/* <!-- input container column --> */}
                                <div className="flex flex-col w-full justify-between sm:flex-col gap-3 items-center">
                                    <TextField
                                        fullWidth
                                        id="full-name"
                                        label="Full Name"
                                        name="name"
                                        value={name}
                                        onChange={handleDataChange} 
                                        required
                                    />
                                    <TextField
                                        fullWidth
                                        id="email"
                                        label="Email"
                                        type="email"
                                        name="email"
                                        value={email}
                                        onChange={handleDataChange}
                                        required
                                    />
                                </div>
                                {/* <!-- input container column --> */}

                                {/* <!-- gender input --> */}
                                <div className="flex gap-4 items-center">
                                    <h2 className="text-md">Your Gender :</h2>
                                    <div className="flex items-center gap-6" id="radioInput">
                                        <RadioGroup
                                            row
                                            aria-labelledby="radio-buttons-group-label"
                                            name="radio-buttons-group"
                                        >
                                            <FormControlLabel name="gender" value="male"  onChange={handleDataChange} control={<Radio required />} label="Male" />
                                            <FormControlLabel name="gender" value="female" onChange={handleDataChange} control={<Radio required />} label="Female" />
                                        </RadioGroup>
                                    </div>
                                </div>
                                {/* <!-- gender input --> */}

                                {/* <!-- input container column --> */}
                                <div className="flex flex-col w-full justify-between sm:flex-row gap-3 items-center">
                                    <TextField
                                        id="password"
                                        label="Password"
                                        type="password"
                                        name="password"
                                        value={password}
                                        onChange={handleDataChange}
                                        required
                                    />
                                    <TextField
                                        id="confirm-password"
                                        label="Confirm Password"
                                        type="password"
                                        name="cpassword"
                                        value={cpassword}
                                        onChange={handleDataChange}
                                        required
                                    />
                                </div>
                                {/* <!-- input container column --> */}

                                <div className="flex flex-col w-full justify-between sm:flex-row gap-3 items-center">
                                    <Avatar
                                        alt="Avatar Preview"
                                        src={avatarPreview}
                                        sx={{ width: 56, height: 56 }}
                                    />
                                    <label className="rounded font-medium bg-gray-400 text-center cursor-pointer text-white w-full py-2 px-2.5 shadow hover:shadow-lg">
                                        <input
                                            type="file"
                                            name="avatar"
                                            accept="image/*"
                                            onChange={handleDataChange} 
                                            className="hidden"
                                        />
                                        Choose File
                                    </label>
                                </div>
                                <button   type="submit" className="text-white py-3 w-full bg-primary-orange shadow hover:shadow-lg rounded-sm font-medium">Signup</button>
                                <Link to="/login" className="hover:bg-gray-50 text-primary-blue text-center py-3 w-full shadow border rounded-sm font-medium">Existing User? Log in</Link>
                            </div>

                        </form>
                        {/* <!-- personal info procedure container --> */}

                    </div>
                    {/* <!-- signup column --> */}
            
                </div>
                {/* <!-- row --> */}

            </main>

            }
        </>
    );

};