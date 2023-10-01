import React from 'react';
import Link from 'next/link';

export const Header: React.FC = ({ }) => {

    return (
        <header className="bg-blue-500 text-white py-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-2xl font-bold">
                    <Link href="/">
                        RestaurantFinder
                    </Link>
                </div>
                <nav className="space-x-4">
                    <Link href="/" className="hover:text-gray-300">
                        Home
                    </Link>
                    <Link href="/about" className="hover:text-gray-300">
                        About
                    </Link>
                    <Link href="/contact" className="hover:text-gray-300">
                        Contact
                    </Link>
                </nav>
            </div>
        </header>
    );
};
