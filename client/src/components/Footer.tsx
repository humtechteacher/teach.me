// Simple footer component that appears at the bottom of every page
const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:justify-start">
            <span className="text-gray-500 text-sm">© {new Date().getFullYear()} EdTech Activity Hub</span>
          </div>
          <div className="mt-4 md:mt-0">
            <p className="text-center text-gray-500 text-sm">
              Created for educational purposes
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
