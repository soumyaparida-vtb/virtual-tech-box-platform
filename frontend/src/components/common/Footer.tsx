// components/common/Footer.tsx
import React from 'react';
import { FiGithub, FiMail, FiLinkedin } from 'react-icons/fi';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-vtb-primary-blue text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Virtual Tech Box</h3>
            <p className="text-gray-300">
              Open-source learning platform for DevOps, DevSecOps, Data Engineering, Full Stack, and AI/ML.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/learning-areas" className="hover:text-vtb-accent-yellow transition-colors">Learning Areas</a></li>
              <li><a href="https://github.com/VirtualTechBox" target="_blank" rel="noopener noreferrer" className="hover:text-vtb-accent-yellow transition-colors">GitHub Repository</a></li>
              <li><a href="/about" className="hover:text-vtb-accent-yellow transition-colors">About Us</a></li>
              <li><a href="/contact" className="hover:text-vtb-accent-yellow transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com/VirtualTechBox"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-vtb-accent-yellow transition-colors"
              >
                <FiGithub />
              </a>
              <a
                href="mailto:contact@virtualtechbox.com"
                className="text-2xl hover:text-vtb-accent-yellow transition-colors"
              >
                <FiMail />
              </a>
              <a
                href="https://linkedin.com/company/virtualtechbox"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl hover:text-vtb-accent-yellow transition-colors"
              >
                <FiLinkedin />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-blue-700 text-center text-gray-300">
          <p>&copy; {currentYear} Virtual Tech Box. All rights reserved. | Open Source under MIT License</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;