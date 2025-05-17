
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PriceSidebar from './PriceSidebar';
// import Stepper from './Stepper'; 
import { useSnackbar } from 'notistack'; 
import { useNavigate } from 'react-router-dom';
import Stepper from './Stepper';
import toast from "react-hot-toast";
import states from '../../../utils/states';
import { useSaveShippingAddressMutation } from "../../../features/shipping/userShippingApi"; 
import { saveShippingAddress } from "../../../features/shipping/userShippingSlice";
export const Shipping = () => {

    const cartItems = useSelector((state) => state.cartItems.cartItems);

    const { shippingInfo } = useSelector((state) => state.shippingInfo);
 
    const [address, setAddress] = useState(shippingInfo[0]?.address || '');
    const [city, setCity] = useState(shippingInfo[0]?.city || '');
    const [country, setCountry] = useState('IN');
    const [state, setState] = useState(shippingInfo[0]?.state || '');
    const [pincode, setPincode] = useState(shippingInfo[0]?.pincode || '');
    const [phoneNo, setPhoneNo] = useState(shippingInfo[0]?.phoneNo || '');
    const [landmark, setLandmark] = useState(shippingInfo[0]?.landmark || '');

    
    const navigate = useNavigate();
    const dispatch = useDispatch();

  
    // const [saveShippingAddress, { isLoading: resLoading, isSuccess, error: resError }] =  useSaveShippingAddressMutation();

    const shippingSubmit = (e) => { 
     
        e.preventDefault();

        if (phoneNo.length < 10 || phoneNo.length > 10) {   
           toast.error("Invalid Phone Number");  
        }
        dispatch(saveShippingAddress({ address, city, country, state, pincode, phoneNo, landmark}));
        navigate("/order/confirm");
 
        // const formData = new FormData();

        // formData.set("address", address);
        // formData.set("city", city);
        // formData.set("country", country);
        // formData.set("state", state);
        // formData.set("pincode", pincode);
        // formData.set("phoneNo", phoneNo); 

        // saveShippingAddress(formData);
  
    }

    // useEffect(() => {
    //     if (!resLoading && isSuccess) {
    //         toast.success("Shipping information Added SuccessFull");
    //         return navigate("/order/confirm");
    //       }
    // }, [resLoading, isSuccess, resError, navigate]);


    return (
 
        <main className="w-full mt-20">

        {/* <!-- row --> */}
        <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-11/12 mt-0 sm:mt-4 m-auto sm:mb-7 overflow-hidden"> 
            {/* <!-- cart column --> */}
            <div className="flex-1"> 
                <Stepper activeStep={1}> 
                        <div className="w-full bg-white">

                            <form onSubmit={shippingSubmit} autoComplete="off" className="flex flex-col justify-start gap-3 w-full sm:w-3/4 mx-1 sm:mx-8 my-4">

                                <TextField
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    fullWidth
                                    label="Address"
                                    variant="outlined"
                                    required
                                />

                                <div className="flex gap-6">
                                    <TextField
                                        value={pincode}
                                        onChange={(e) => setPincode(e.target.value)}
                                        type="number"
                                        label="Pincode"
                                        fullWidth
                                        variant="outlined"
                                        required
                                    />
                                    <TextField
                                        value={phoneNo}
                                        onChange={(e) => setPhoneNo(e.target.value)}
                                        type="number"
                                        label="Phone No"
                                        fullWidth
                                        variant="outlined"
                                        required
                                    />
                                </div>

                                <div className="flex gap-6">
                                    <TextField
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        label="City"
                                        fullWidth
                                        variant="outlined"
                                        required
                                    />
                                    <TextField
                                        value={landmark}
                                        onChange={(e) => setLandmark(e.target.value)}
                                        label="Landmark (Optional)"
                                        fullWidth
                                        variant="outlined"
                                    />
                                </div>

                                <div className="flex gap-6">

                                    <FormControl fullWidth>
                                        <InputLabel id="country-select">Country</InputLabel>
                                        <Select
                                            labelId="country-select"
                                            id="country-select"
                                            defaultValue={country}
                                            disabled
                                            label="Country"
                                            // onChange={(e) => setCountry(e.target.value)}
                                        >
                                            <MenuItem value={'IN'}>India</MenuItem>
                                        </Select>
                                    </FormControl>

                                    <FormControl fullWidth disabled={country ? false : true}>
                                        <InputLabel id="state-select">State</InputLabel>
                                        <Select
                                            labelId="state-select"
                                            id="state-select"
                                            value={state}
                                            label="State"
                                            onChange={(e) => setState(e.target.value)}
                                            required
                                        >
                                            {states.map((item) => (
                                                <MenuItem key={item.code} value={item.code}>{item.name}</MenuItem>
                                            ))} 
                                        </Select>
                                    </FormControl>

                                </div>

                                <button type="submit" className="bg-primary-orange w-full sm:w-1/3 my-2 py-3.5 text-sm font-medium text-white shadow hover:shadow-lg rounded-sm uppercase outline-none">save and deliver here</button>
                            </form>
                        </div>
                </Stepper>  
            </div> 
            <PriceSidebar cartItems={cartItems} />
        </div>
    </main>

    )
}