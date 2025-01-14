const Banner = () => {
    return (
        <div className="banner bg-cover bg-center bg-blue-500 h-[400px] flex items-center justify-center text-white">
            <div className="text-center">
                <h1 className="text-4xl font-bold">Welcome to Our Company</h1>
                <p className="mt-4">Your partner in success for over a decade.</p>
                <button className="mt-6 px-4 py-2 bg-white text-blue-600 rounded">Learn More</button>
            </div>
        </div>
    );
};
export default Banner;
