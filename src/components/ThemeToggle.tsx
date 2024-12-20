import { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { toggleThemeAction } from '../redux/slices/app.slice';

import { RootState } from '../redux/rootReducer';

const ThemeToggle: React.FC = () => {
	
	const dispatch = useDispatch();
	const { theme } = useSelector((state: RootState ) => state.app);

	const toggleTheme = () => {
		dispatch(toggleThemeAction() as any);
	};
	
	useEffect(() => {
		const htmlElement = document.documentElement;
		htmlElement.classList.remove('light', 'dark');
		htmlElement.classList.add(theme);
	}, [theme]);

	return (
		<div className='fixed right-10 bottom-10 z-50 border-2 rounded-full border-secondary dark:border-primary'>
			<label className="relative inline-block w-[40px] h-[24px]">
				<input 
					type="checkbox" 
					checked={theme === 'dark'} 
					onChange={toggleTheme} 
					className="opacity-0 w-0 h-0" 
				/>
				<span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-primary dark:bg-secondary transition duration-400 rounded-full"></span>
				<span className={`absolute left-1 bottom-1 bg-secondary dark:bg-primary w-4 h-4 transition duration-400 rounded-full ${theme === 'dark' ? 'transform translate-x-4' : ''}`}></span>
			</label>
		</div>
	);
};

export default ThemeToggle;