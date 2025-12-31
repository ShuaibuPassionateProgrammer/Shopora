const Loader: React.FC = () => {
    return (
        <div className="flex items-center justify-center">
            <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
                <div className="absolute top-0 left-0 animate-spin rounded-full h-16 w-16 border-r-4 border-primary-600 opacity-50" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
            </div>
        </div>
    );
};

export default Loader;
