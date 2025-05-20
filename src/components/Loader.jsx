import { useSelector } from 'react-redux';
import '../stylesheets/loader.css';

export const Loader = () => {
    const isLoading = useSelector((state) => state.loader.isLoading);
    if (!isLoading) return null;

    return (
        <div className="loader-overlay">
            <div className="loader"></div>
        </div>
    );
};

export const ComponentLoader = () => {
    return (
        <div className="component-loader">
            <div className="component-loader-spinner"></div>
        </div>
    );
};
