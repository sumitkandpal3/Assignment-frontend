import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto text-center">
                <div className="flex justify-center space-x-6 mb-6">
                    <a href="/" className="text-gray-400 hover:text-white">Home</a>
                    <a href="/about" className="text-gray-400 hover:text-white">About</a>
                    <a href="/products" className="text-gray-400 hover:text-white">Products</a>
                    <a href="/contact" className="text-gray-400 hover:text-white">Contact</a>
                </div>
                <div className="text-gray-400">
                    <p>&copy; 2024 MyStore. All rights reserved.</p>
                    <p>
                        <a href="/privacy" className="hover:text-white">Privacy Policy</a> | 
                        <a href="/terms" className="hover:text-white ml-2">Terms of Service</a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
