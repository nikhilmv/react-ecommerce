import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Pagination from '@mui/material/Pagination';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Slider from '@mui/material/Slider';
import { useSnackbar } from 'notistack';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';   
import CircularProgress from '@mui/material/CircularProgress'; 
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import StarIcon from '@mui/icons-material/Star';   
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useGetProductsFrontQuery,useDeleteProductMutation } from "../../../features/product/productApi";
import { Product } from "./Product";


const categories = [
    "Electronics",
    "TVs & Appliances",
    "Men",
    "Women",
    "Baby & Kids",
    "Home & Furniture",
    "Sports, Books & More",
    "Flights",
    "Offer Zone",
    "Grocery",
]

export const Products = () => {

    const params = useParams();
    const location = useLocation();
    const keyword = params.keyword || "";
 
    const [category, setCategory] = useState(""); 
    const [forceRefetch, setForceRefetch] = useState(0);
    const [price, setPrice] = useState([0, 200000]);
    const [ratings, setRatings] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    // filter toggles
    const [categoryToggle, setCategoryToggle] = useState(true);
    const [ratingsToggle, setRatingsToggle] = useState(true);

   const { data, isLoading, isError, error  } = useGetProductsFrontQuery({
        keyword,
        category,
        price,
        ratings,
        currentPage,
        refetchKey: forceRefetch, 
    });
 console.log("data", data);
 
 
    const priceHandler = (e, newPrice) => {  
        setPrice(newPrice);
    }
    const categoryHandler = (e) => {
        const selectedCategory = e.target.value;
        
        // Allow deselecting category if clicked again
        setCategory((prevCategory) => (prevCategory === selectedCategory ? "" : selectedCategory));

        // 👇 Force RTK Query to refetch by changing forceRefetch state
        setForceRefetch((prev) => prev + 1);
        
        // Optional: Manually trigger `refetch()`
        // refetch();
    };

    return (
        <>
          
                <section className="hidden sm:block bg-white w-full px-2 sm:px-12 overflow-hidden border-b mt-14">
                <div className="flex items-center justify-between p-0.5">
                    {categories.map((el, i) => (
                        <Link to="/products" key={i} className="text-sm p-2 text-gray-800 font-medium hover:text-primary-blue flex items-center gap-0.5 group">{el} <span className="text-gray-400 group-hover:text-primary-blue"><ExpandMoreIcon sx={{ fontSize: "16px" }} /></span></Link>
                    ))}
                </div>
            </section>

            <main className="w-full mt-14 sm:mt-0">

                {/* <!-- row --> */}
                <div className="flex gap-3 mt-2 sm:mt-2 sm:mx-3 m-auto mb-7">

                    {/* <!-- sidebar column  --> */}
                    <div className="hidden sm:flex flex-col w-1/5 px-1">

                        {/* <!-- nav tiles --> */}
                        <div className="flex flex-col bg-white rounded-sm shadow">

                            {/* <!-- filters header --> */}
                            <div className="flex items-center justify-between gap-5 px-4 py-2 border-b">
                                <p className="text-lg font-medium">Filters</p>
                                <span className="uppercase text-primary-blue text-xs cursor-pointer font-medium" >clear all</span>
                            </div>

                            <div className="flex flex-col gap-2 py-3 text-sm overflow-hidden">

                                  {/* price slider filter */}
                                  <div className="flex flex-col gap-2 border-b px-4">
                                    <span className="font-medium text-xs">PRICE</span>

                                    <Slider
                                        value={price}
                                        onChange={priceHandler}
                                        valueLabelDisplay="auto"
                                        getAriaLabel={() => 'Price range slider'}
                                        min={0}
                                        max={200000}
                                    />

                                    <div className="flex gap-3 items-center justify-between mb-2 min-w-full">
                                        <span className="flex-1 border px-4 py-1 rounded-sm text-gray-800 bg-gray-50">₹{price[0].toLocaleString()}</span>
                                        <span className="font-medium text-gray-400">to</span>
                                        <span className="flex-1 border px-4 py-1 rounded-sm text-gray-800 bg-gray-50">₹{price[1].toLocaleString()}</span>
                                    </div>
                                </div>
                                {/* price slider filter */}

                                {/* category filter */}
                                <div className="flex flex-col border-b px-4">

                                    <div className="flex justify-between cursor-pointer py-2 pb-4 items-center" onClick={() => setCategoryToggle(!categoryToggle)}>
                                        <p className="font-medium text-xs uppercase">Category</p>
                                        {categoryToggle ?
                                            <ExpandLessIcon sx={{ fontSize: "20px" }} /> :
                                            <ExpandMoreIcon sx={{ fontSize: "20px" }} />
                                        }
                                    </div>
                                        {categoryToggle && (
                                                    <div className="flex flex-col pb-1">
                                                    <FormControl>
                                                        <RadioGroup
                                                            aria-labelledby="category-radio-buttons-group"
                                                            onChange={categoryHandler}
                                                            name="category-radio-buttons"
                                                            value={category}
                                                        >
                                                            {categories.map((el, i) => (
                                                                <FormControlLabel value={el} key={i} control={<Radio size="small" />} label={<span className="text-sm" key={i}>{el}</span>} />
                                                            ))}
                                                        </RadioGroup>
                                                    </FormControl>
                                                </div>
                                        ) }
                            

                                </div>
                                {/* category filter */}

                                {/* ratings filter */}
                                <div className="flex flex-col border-b px-4">

                                     <div className="flex justify-between cursor-pointer py-2 pb-4 items-center" onClick={() => setRatingsToggle(!ratingsToggle)}>
                                        <p className="font-medium text-xs uppercase">ratings</p>
                                        {ratingsToggle ?
                                            <ExpandLessIcon sx={{ fontSize: "20px" }} /> :
                                            <ExpandMoreIcon sx={{ fontSize: "20px" }} />
                                        }
                                    </div>

                                        {
                                            ratingsToggle && (
                                                <div className="flex flex-col pb-1">
                                                    <FormControl>
                                                        <RadioGroup
                                                            aria-labelledby="ratings-radio-buttons-group"
                                                            name="ratings-radio-buttons"
                                                            value={ratings}
                                                            onChange={(e) => setRatings(Number(e.target.value))}
                                                        >
                                                            {[5, 4, 3, 2, 1].map((el, i) => (
                                                                <FormControlLabel value={el} key={i} control={<Radio size="small" />} label={<span className="text-sm" ><StarIcon sx={{ fontSize: "16px" }} /> {el} & above</span>} />
                                                            ))}
                                                        </RadioGroup>
                                                    </FormControl>
                                                </div>
                                            )
                                        }

                                </div>
                                {/* ratings filter */}

                            </div>

                        </div>
                        {/* <!-- nav tiles --> */}

                    </div>
                    {/* <!-- sidebar column  --> */}

                    {/* <!-- search column --> */}
                    <div className="flex-1">
              
                        { data?.products?.length === 0 && (
                            <div className="flex flex-col items-center justify-center gap-3 bg-white shadow-sm rounded-sm p-6 sm:p-16">
                                <img draggable="false" className="w-1/2 h-44 object-contain" src="https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/error-no-search-results_2353c5.png" alt="Search Not Found" />
                                <h1 className="text-2xl font-medium text-gray-900">Sorry, no results found!</h1>
                                <p className="text-xl text-center text-primary-grey">Please check the spelling or try searching for something else</p>
                            </div>
                        )}
 


                            {isLoading ? <div className="min-h-screen min-w-full flex items-center justify-center">
                                            <CircularProgress />
                                        </div> : (
                                <div className="flex flex-col gap-2 pb-4 justify-center items-center w-full overflow-hidden bg-white">

                                    <div className="grid grid-cols-1 sm:grid-cols-4 w-full place-content-start overflow-hidden pb-4 border-b">
                                       
                                        {data?.products?.map((product) => (
                                            
                                                <Product productObj={product} key={product._id} />
                                            ))
                                        }  
                                    </div>
                                    {data.filteredProductsCount > data.resultPerPage && ( 
                                        <Pagination
                                            count={Number(((data.filteredProductsCount + 6) / data.resultPerPage).toFixed())}
                                            page={currentPage}
                                            onChange={(e, val) => setCurrentPage(val)}
                                            color="primary"
                                        />
                                    )}
                                </div>
                            )}

                    </div>
                    {/* <!-- search column --> */}
                </div >
                {/* <!-- row --> */}

            </main >
        </>
    );
};