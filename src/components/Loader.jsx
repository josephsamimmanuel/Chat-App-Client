import { useSelector } from 'react-redux';
import '../stylesheets/loader.css'

const Loader = () => {
    const isLoading = useSelector((state) => state.loader.isLoading);
    if (!isLoading) return null;
    
    return (
        <div className="loader">
            <div className="loader-container">
                <div className="loader-circle"></div>
            </div>
        </div>
    )
}

export default Loader
