import { useState } from 'react';

const ThemeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        const htmlElement = document.documentElement;
        htmlElement.classList.toggle('dark');
    };

    return (
        <div className='fixed right-10 bottom-10'>
            <label className="relative inline-block w-[40px] h-[24px]">
                <input 
                    type="checkbox" 
                    checked={isDarkMode} 
                    onChange={toggleTheme} 
                    className="opacity-0 w-0 h-0" 
                    />
                <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-primary dark:bg-secondary transition duration-400 rounded-full"></span>
                <span className={`absolute left-1 bottom-1 bg-secondary dark:bg-primary w-4 h-4 transition duration-400 rounded-full ${isDarkMode ? 'transform translate-x-4' : ''}`}></span>
            </label>
        </div>
    );
};

export default ThemeToggle;