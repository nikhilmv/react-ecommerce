import notFound from '../../../assets/images/error-500_f9bbb4.png';
import { Link } from 'react-router-dom';

 
export const NotFound = () => {
    return (
        <div className="mt-16 flex flex-col gap-4 items-center justify-center">
            <img draggable="false" className="sm:w-1/3 h-full" src={notFound} alt="Page Not Found" />
            Unfortunately the page you are looking for has been moved or deleted

            <Link to="/" className="px-4 py-2 bg-primary-blue rounded-sm uppercase shadow hover:shadow-lg text-white">Back To Home</Link>
        </div>
    );
};

 