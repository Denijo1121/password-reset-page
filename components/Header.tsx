import React from 'react';
import type { Language } from '../types';

interface HeaderProps {
    onLanguageChange: (lang: Language) => void;
    currentLang: Language;
}

const Logo: React.FC = () => (
    <div className="bg-white p-2 md:p-4">
         <svg width="190" height="50" viewBox="0 0 190 50" xmlns="http://www.w3.org/2000/svg">
            <path d="M20,15 Q30,5 40,15 T60,15" stroke="#00a9e0" strokeWidth="3" fill="none" />
            <path d="M25,20 Q35,10 45,20 T65,20" stroke="#00a9e0" strokeWidth="3" fill="none" />
            <text x="5" y="45" fontFamily="Arial, sans-serif" fontSize="28" fontWeight="bold" fill="#333" letterSpacing="-1">
                charles river
            </text>
        </svg>
    </div>
);

const NavButton: React.FC<{
    onClick: () => void;
    isActive: boolean;
    children: React.ReactNode;
}> = ({ onClick, isActive, children }) => (
    <button
        onClick={onClick}
        className={`px-4 py-2 text-sm md:text-base transition-colors duration-200 ${
            isActive ? 'text-white font-semibold' : 'text-gray-400 hover:text-white'
        }`}
    >
        {children}
    </button>
);

const Header: React.FC<HeaderProps> = ({ onLanguageChange, currentLang }) => {
    return (
        <header className="bg-[#2a2a2a] border-b border-gray-700 flex items-center justify-between">
            <Logo />
            <nav className="flex items-center space-x-2 md:space-x-4 pr-4">
                <NavButton onClick={() => onLanguageChange('en')} isActive={currentLang === 'en'}>Home</NavButton>
                <button className="px-4 py-2 text-sm md:text-base text-gray-400 hover:text-white transition-colors duration-200">FAQ</button>
                <button className="px-4 py-2 text-sm md:text-base text-gray-400 hover:text-white transition-colors duration-200">Help</button>
                <NavButton onClick={() => onLanguageChange('fr')} isActive={currentLang === 'fr'}>Français</NavButton>
                <NavButton onClick={() => onLanguageChange('kn')} isActive={currentLang === 'kn'}>Kannada</NavButton>
            </nav>
        </header>
    );
};

export default Header;