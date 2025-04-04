import { useState } from "react";
import { Link, useLocation } from "wouter";

// Navbar component that provides navigation between main sections
const Navbar = () => {
  // State to handle mobile menu visibility
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Get current location for active link styling
  const [location] = useLocation();

  // Helper function to determine if a link is active
  const isActive = (path: string) => location === path;

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* Logo/Home link */}
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-primary font-bold text-xl">EdTech Hub</span>
            </Link>
            
            {/* Main navigation links - visible on desktop */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link href="/" className={`${isActive('/') ? 'border-primary text-gray-900 border-b-2' : 'text-gray-500 hover:text-gray-700'} px-1 pt-1 inline-flex items-center text-sm font-medium`}>
                Home
              </Link>
              
              {/* Activities dropdown - Desktop view */}
              <div className="relative group">
                <button className="text-gray-500 hover:text-gray-700 px-1 pt-1 inline-flex items-center text-sm font-medium">
                  Activities
                  <svg className="ml-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                
                {/* Dropdown menu */}
                <div className="hidden group-hover:block absolute z-10 mt-1 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    <Link href="/activities/misinformation-game" 
                          className={`block px-4 py-2 text-sm ${isActive('/activities/misinformation-game') ? 'bg-gray-100 text-gray-900' : 'text-gray-700 hover:bg-gray-100'}`}>
                      Misinformation Game
                    </Link>
                    <span className="block px-4 py-2 text-sm text-gray-400 cursor-not-allowed">Source Evaluation (Coming Soon)</span>
                    <span className="block px-4 py-2 text-sm text-gray-400 cursor-not-allowed">Fact Checking Challenge (Coming Soon)</span>
                  </div>
                </div>
              </div>
              
              <Link href="/resources" className="text-gray-500 hover:text-gray-700 px-1 pt-1 inline-flex items-center text-sm font-medium">
                Resources
              </Link>
              
              <Link href="/about" className="text-gray-500 hover:text-gray-700 px-1 pt-1 inline-flex items-center text-sm font-medium">
                About
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button 
              type="button" 
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed */}
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`sm:hidden ${mobileMenuOpen ? '' : 'hidden'}`}>
        <div className="pt-2 pb-3 space-y-1">
          <Link href="/" 
                className={`${isActive('/') ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'} block pl-3 pr-4 py-2 text-base font-medium`}
                onClick={() => setMobileMenuOpen(false)}>
            Home
          </Link>
          
          <div className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 block pl-3 pr-4 py-2 text-base font-medium">
            Activities
          </div>
          
          <Link href="/activities/misinformation-game" 
                className={`${isActive('/activities/misinformation-game') ? 'text-primary' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'} block pl-6 pr-4 py-2 text-base font-medium`}
                onClick={() => setMobileMenuOpen(false)}>
            - Misinformation Game
          </Link>
          
          <div className="text-gray-400 block pl-6 pr-4 py-2 text-base font-medium">
            - Source Evaluation (Coming Soon)
          </div>
          
          <Link href="/resources" 
                className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 block pl-3 pr-4 py-2 text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}>
            Resources
          </Link>
          
          <Link href="/about" 
                className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 block pl-3 pr-4 py-2 text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}>
            About
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
