import { Product } from "../Product/Product";
import Slider from 'react-slick';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import StarIcon from '@mui/icons-material/Star';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import CachedIcon from '@mui/icons-material/Cached';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Rating from '@mui/material/Rating';
import TextField from '@mui/material/TextField';
import { useGetProductDetailsQuery} from "../../../features/product/productApi";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { addToCart } from "../../../features/cart/addToCartSlice";

export const  ProductDetails = () => {

    const cartItems = useSelector((state) => state.cartItems.cartItems);
    
    const dispatch = useDispatch(); 
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
    const params = useParams();
    const productId = params.id;
    const {data: product, isLoading, isSuccess, isError } = useGetProductDetailsQuery(productId);

    let validProduct = null;
    if (product && product.success) {
        validProduct = product.product;
    }
    
    // Log only when validProduct is available
   
 
    const [open, setOpen] = useState(false);
    const [viewAll, setViewAll] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");


    if (!isLoading && isError)
        return (
          <h3 className=" uppercase font-medium text-red-600">
            something went wrong!
          </h3>
        );
    if (!isError && !isLoading && isSuccess && product?.length === 0)
        return (
            <p className="text-center uppercase font-medium">No Product found!</p>
        );

         
        const CustomPrevArrow = ({ onClick }) => {
            return (
                <div className="slick-arrow slick-prev" onClick={onClick} >
                    <ArrowBackIosIcon style={{ fontSize: 30, color: "#333" }} />
                </div>
            );
        };
        
        const CustomNextArrow = ({ onClick }) => {
            return (
                <div className="slick-arrow slick-next" onClick={onClick} >
                    <ArrowForwardIosIcon style={{ fontSize: 30, color: "#333" }} />
                </div>
            );
        };
        
        // Slider Settings
        const settings = {
            autoplay: true,
            autoplaySpeed: 2000,
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: <CustomPrevArrow />,
            nextArrow: <CustomNextArrow />,
        };
        

    function  getDiscount(price, cuttedPrice)  {  
        return (((cuttedPrice - price) / cuttedPrice) * 100).toFixed();
    }
    function getDeliveryDate () {
        const deliveryDate = new Date();
        deliveryDate.setDate(new Date().getDate() + 7)
        return deliveryDate.toUTCString().substring(0, 11);
    }
    const handleDialogClose = () => {
        setOpen(!open);
    }
 

    const addToCartHandler = (item) => {   
         dispatch(addToCart({ item, type: "default" })); 

    }

    const buyNow = () => {
       // console.log("Buy Now");
    }
  return (
    <> 
        {
            validProduct && ( 
                <> 
                <section className="hidden sm:block bg-white w-full px-2 sm:px-12 overflow-hidden border-b mt-14">
                    <div className="flex items-center justify-between p-0.5">
                        {categories.map((el, i) => (
                            <Link to="/products" key={i} className="text-sm p-2 text-gray-800 font-medium hover:text-primary-blue flex items-center gap-0.5 group">{el} <span className="text-gray-400 group-hover:text-primary-blue"><ExpandMoreIcon sx={{ fontSize: "16px" }} /></span></Link>
                        ))}
                    </div>
                </section>
                <main className="mt-12 sm:mt-0">

                    {/* <!-- product image & description container --> */}
                    <div className="w-full flex flex-col sm:flex-row bg-white sm:p-2 relative">

                        {/* <!-- image wrapper --> */}
                        <div className="w-full sm:w-2/5 sm:sticky top-16 sm:h-screen">
                            {/* <!-- imgbox --> */}
                            <div className="flex flex-col gap-3 m-3">
                                <div className="w-full h-full pb-6 border relative">
                                    <Slider {...settings}>
                                        {validProduct.images && validProduct.images.map((item, i) => (
                                            <img draggable="false" className="w-full h-96 object-contain" src={item.url} alt={validProduct.name} key={i} />
                                        ))}
                                    </Slider>
                                    <div className="absolute top-4 right-4 shadow-lg bg-white w-9 h-9 border flex items-center justify-center rounded-full">
                                        {/* <span onClick={addToWishlistHandler} className={`${itemInWishlist ? "text-red-500" : "hover:text-red-500 text-gray-300"} cursor-pointer`}><FavoriteIcon sx={{ fontSize: "18px" }} /></span> */}
                                    </div>
                                </div>

                                <div className="w-full flex gap-3">
                                    {/* <!-- add to cart btn --> */}
                                     {validProduct.stock > 0 && (
                                        <button onClick={() => addToCartHandler(validProduct)} className="p-4 w-1/2 flex items-center justify-center gap-2 text-white bg-primary-yellow rounded-sm shadow hover:shadow-lg">
                                            <ShoppingCartIcon />
                                            {"ADD TO CART"}
                                        </button>
                                    )}  
                                     <button onClick={buyNow} disabled={validProduct.stock < 1 ? true : false} className={validProduct.stock < 1 ? "p-4 w-full flex items-center justify-center gap-2 text-white bg-red-600 cursor-not-allowed rounded-sm shadow hover:shadow-lg" : "p-4 w-1/2 flex items-center justify-center gap-2 text-white bg-primary-orange rounded-sm shadow hover:shadow-lg"}>
                                        <FlashOnIcon />
                                        {validProduct.stock < 1 ? "OUT OF STOCK" : "BUY NOW"}
                                    </button> 
                                    {/* <!-- add to cart btn --> */}
                                </div>

                            </div>
                            {/* <!-- imgbox --> */}
                        </div>
                        {/* <!-- image wrapper --> */}

                        {/* <!-- product desc wrapper --> */}
                        <div className="flex-1 py-2 px-3">

                            {/* <!-- whole product description --> */}
                            <div className="flex flex-col gap-2 mb-4">

                                <h2 className="text-xl">{validProduct.name}</h2>
                                {/* <!-- rating badge --> */}
                                <span className="text-sm text-gray-500 font-medium flex gap-2 items-center">
                                    <span className="text-xs px-1.5 py-0.5 bg-primary-green rounded-sm text-white flex items-center gap-0.5">{validProduct.ratings && validProduct.ratings.toFixed(1)} <StarIcon sx={{ fontSize: "12px" }} /></span>
                                    <span>{validProduct.numOfReviews} Reviews</span>
                                </span>
                                {/* <!-- rating badge --> */}

                                {/* <!-- price desc --> */}
                                <span className="text-primary-green text-sm font-medium">Special Price</span>
                                <div className="flex items-baseline gap-2 text-3xl font-medium">
                                    <span className="text-gray-800">₹{validProduct.price?.toLocaleString()}</span>
                                    <span className="text-base text-gray-500 line-through">₹{validProduct.cuttedPrice?.toLocaleString()}</span>
                                    <span className="text-base text-primary-green">{getDiscount(validProduct.price, validProduct.cuttedPrice)}%&nbsp;off</span>
                                </div>
                                {validProduct.stock <= 10 && validProduct.stock > 0 && (
                                    <span className="text-red-500 text-sm font-medium">Hurry, Only {validProduct.stock} left!</span>
                                )}
                                {/* <!-- price desc --> */}

                                {/* <!-- banks offers --> */}
                                <p className="text-md font-medium">Available offers</p>
                                {Array(3).fill("").map((el, i) => (
                                    <p className="text-sm flex items-center gap-1" key={i}>
                                        <span className="text-primary-lightGreen"><LocalOfferIcon sx={{ fontSize: "20px" }} /></span>
                                        <span className="font-medium ml-2">Bank Offer</span> 15% Instant discount on first Flipkart Pay Later order of 500 and above <Link className="text-primary-blue font-medium" to="/">T&C</Link>
                                    </p>
                                ))}
                                {/* <!-- banks offers --> */}

                                {/* <!-- warranty & brand --> */}
                                <div className="flex gap-8 mt-2 items-center text-sm">
                                    <img draggable="false" className="w-20 h-8 p-0.5 border object-contain" src={validProduct.brand?.logo.url} alt={validProduct.brand && validProduct.brand.name} />
                                    <span>{validProduct.warranty} Year Warranty <Link className="font-medium text-primary-blue" to="/">Know More</Link></span>
                                </div>
                                {/* <!-- warranty & brand --> */}

                                {/* <!-- delivery details --> */}
                                <div className="flex gap-16 mt-4 items-center text-sm font-medium">
                                    <p className="text-gray-500">Delivery</p>
                                    <span>Delivery by {getDeliveryDate()}</span>
                                </div>
                                {/* <!-- delivery details --> */}

                                {/* <!-- highlights & services details --> */}
                                <div className="flex flex-col sm:flex-row justify-between">
                                    {/* <!-- highlights details --> */}
                                    <div className="flex gap-16 mt-4 items-stretch text-sm">
                                        <p className="text-gray-500 font-medium">Highlights</p>

                                        <ul className="list-disc flex flex-col gap-2 w-64">
                                            {validProduct.highlights?.map((highlight, i) => (
                                                <li key={i}>
                                                    <p>{highlight}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    {/* <!-- highlights details --> */}

                                    {/* <!-- services details --> */}
                                    <div className="flex gap-16 mt-4 mr-6 items-stretch text-sm">
                                        <p className="text-gray-500 font-medium">Services</p>
                                        <ul className="flex flex-col gap-2">
                                            <li>
                                                <p className="flex items-center gap-3"><span className="text-primary-blue"><VerifiedUserIcon sx={{ fontSize: "18px" }} /></span> {validProduct.warranty} Year</p>
                                            </li>
                                            <li>
                                                <p className="flex items-center gap-3"><span className="text-primary-blue"><CachedIcon sx={{ fontSize: "18px" }} /></span> 7 Days Replacement Policy</p>
                                            </li>
                                            <li>
                                                <p className="flex items-center gap-3"><span className="text-primary-blue"><CurrencyRupeeIcon sx={{ fontSize: "18px" }} /></span> Cash on Delivery available</p>
                                            </li>
                                        </ul>
                                    </div>
                                    {/* <!-- services details --> */}
                                </div>
                                {/* <!-- highlights & services details --> */}

                                {/* <!-- seller details --> */}
                                <div className="flex gap-16 mt-4 items-center text-sm font-medium">
                                    <p className="text-gray-500">Seller</p>
                                    <Link className="font-medium text-primary-blue ml-3" to="/">{validProduct.brand && validProduct.brand.name}</Link>
                                </div>
                                {/* <!-- seller details --> */}

                                {/* <!-- flipkart plus banner --> */}
                                <div className="sm:w-1/2 mt-4 border">
                                    <img draggable="false" className="w-full h-full object-contain" src="https://rukminim1.flixcart.com/lockin/763/305/images/promotion_banner_v2_active.png" alt="" />
                                </div>
                                {/* <!-- flipkart plus banner --> */}

                                {/* <!-- description details --> */}
                                <div className="flex flex-col sm:flex-row gap-1 sm:gap-14 mt-4 items-stretch text-sm">
                                    <p className="text-gray-500 font-medium">Description</p>
                                    <span>{validProduct.description}</span>
                                </div>
                                {/* <!-- description details --> */}

                                {/* <!-- border box --> */}
                                <div className="w-full mt-6 rounded-sm border flex flex-col">
                                    <h1 className="px-6 py-4 border-b text-2xl font-medium">Product Description</h1>
                                    <div className="p-6">
                                        <p className="text-sm">{validProduct.description}</p>
                                    </div>
                                </div>
                                {/* <!-- border box --> */}

                                {/* <!-- specifications border box --> */}
                                <div className="w-full mt-4 pb-4 rounded-sm border flex flex-col">
                                    <h1 className="px-6 py-4 border-b text-2xl font-medium">Specifications</h1>
                                    <h1 className="px-6 py-3 text-lg">General</h1>

                                    {/* <!-- specs list --> */}
                                    {validProduct.specifications?.map((spec, i) => (
                                        <div className="px-6 py-2 flex items-center text-sm" key={i}>
                                            <p className="text-gray-500 w-3/12">{spec.title}</p>
                                            <p className="flex-1">{spec.description}</p>
                                        </div>
                                    ))}
                                    {/* <!-- specs list --> */}

                                </div>
                                {/* <!-- specifications border box --> */}

                                {/* <!-- reviews border box --> */}
                                <div className="w-full mt-4 rounded-sm border flex flex-col">
                                    <div className="flex justify-between items-center border-b px-6 py-4">
                                        <h1 className="text-2xl font-medium">Ratings & Reviews</h1>
                                        <button onClick={handleDialogClose} className="shadow bg-primary-yellow text-white px-4 py-2 rounded-sm hover:shadow-lg">Rate Product</button>
                                    </div>

                                    <Dialog
                                        aria-labelledby='review-dialog'
                                        open={open}
                                        onClose={handleDialogClose}
                                    >
                                        <DialogTitle className="border-b">Submit Review</DialogTitle>
                                        <DialogContent className="flex flex-col m-1 gap-4">
                                            <Rating
                                                onChange={(e) => setRating(e.target.value)}
                                                value={rating}
                                                size='large'
                                                precision={0.5}
                                            />
                                            <TextField
                                                label="Review"
                                                multiline
                                                rows={3}
                                                sx={{ width: 400 }}
                                                size="small"
                                                variant="outlined"
                                                value={comment}
                                                onChange={(e) => setComment(e.target.value)}
                                            />
                                        </DialogContent>
                                        <DialogActions>
                                            <button onClick={handleDialogClose} className="py-2 px-6 rounded shadow bg-white border border-red-500 hover:bg-red-100 text-red-600 uppercase">Cancel</button>
                                            {/* <button onClick={reviewSubmitHandler} className="py-2 px-6 rounded bg-green-600 hover:bg-green-700 text-white shadow uppercase">Submit</button> */}
                                        </DialogActions>
                                    </Dialog>

                                    <div className="flex items-center border-b">
                                        <h1 className="px-6 py-3 text-3xl font-semibold">{validProduct.ratings && validProduct.ratings.toFixed(1)}<StarIcon /></h1>
                                        <p className="text-lg text-gray-500">({validProduct.numOfReviews}) Reviews</p>
                                    </div>

                                    {viewAll ?
                                        validProduct.reviews?.map((rev, i) => (
                                            <div className="flex flex-col gap-2 py-4 px-6 border-b" key={i}>
                                                <Rating name="read-only" value={rev.rating} readOnly size="small" precision={0.5} />
                                                <p>{rev.comment}</p>
                                                <span className="text-sm text-gray-500">by {rev.name}</span>
                                            </div>
                                        )).reverse()
                                        :
                                        validProduct.reviews?.slice(-3).map((rev, i) => (
                                            <div className="flex flex-col gap-2 py-4 px-6 border-b" key={i}>
                                                <Rating name="read-only" value={rev.rating} readOnly size="small" precision={0.5} />
                                                <p>{rev.comment}</p>
                                                <span className="text-sm text-gray-500">by {rev.name}</span>
                                            </div>
                                        )).reverse()
                                    }
                                    {validProduct.reviews?.length > 3 &&
                                        <button onClick={() => setViewAll(!viewAll)} className="w-1/3 m-2 rounded-sm shadow hover:shadow-lg py-2 bg-primary-blue text-white">{viewAll ? "View Less" : "View All"}</button>
                                    }
                                </div>
                                {/* <!-- reviews border box --> */}

                            </div>

                        </div>
                        {/* <!-- product desc wrapper --> */}

                    </div>
                    {/* <!-- product image & description container --> */}

                    {/* Sliders */}
                    {/* <div className="flex flex-col gap-3 mt-6">
                        <ProductSlider title={"Similar Products"} tagline={"Based on the category"} />
                    </div> */}

                </main>
                </>

            )
        }
    </>
  );


}