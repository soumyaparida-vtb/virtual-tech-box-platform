// components/common/Header.tsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import Logo from './Logo';
import { useUser } from '../../contexts/UserContext';
export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user } = useUser();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/learning-areas', label: 'Learning Areas' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-vtb-primary-blue text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-all duration-200 hover:text-vtb-accent-yellow ${
                  isActive(link.path) ? 'text-vtb-accent-yellow font-semibold' : ''
                }`}
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm">Welcome, {user.name}</span>
                <Link
                  to="/learning-areas"
                  className="bg-vtb-accent-blue hover:bg-vtb-secondary-blue transition-colors duration-200 px-4 py-2 rounded-lg font-medium"
                >
                  My Learning
                </Link>
              </div>
            ) : (
              <Link
                to="/register"
                className="bg-vtb-accent-blue hover:bg-vtb-secondary-blue transition-colors duration-200 px-6 py-2 rounded-lg font-medium"
              >
                Get Started
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-blue-700">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block py-2 transition-all duration-200 hover:text-vtb-accent-yellow ${
                  isActive(link.path) ? 'text-vtb-accent-yellow font-semibold' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {user ? (
              <div className="mt-4 pt-4 border-t border-blue-700">
                <p className="text-sm mb-2">Welcome, {user.name}</p>
                <Link
                  to="/learning-areas"
                  className="inline-block bg-vtb-accent-blue hover:bg-vtb-secondary-blue transition-colors duration-200 px-4 py-2 rounded-lg font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Learning
                </Link>
              </div>
            ) : (
              <Link
                to="/register"
                className="inline-block mt-4 bg-vtb-accent-blue hover:bg-vtb-secondary-blue transition-colors duration-200 px-6 py-2 rounded-lg font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};