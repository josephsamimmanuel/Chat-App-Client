import React from 'react'
import { THEMES } from '../utils/themes';
import { setTheme } from '../redux/useTheme';
import { useDispatch, useSelector } from 'react-redux';

function ThemeSelector({ themeDropdownOpen, setThemeDropdownOpen }) {
    const dispatch = useDispatch();
    const currentTheme = useSelector((state) => state.theme)
    return (
        <div>
            {themeDropdownOpen && (
                <div className='absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-md z-10'>
                    <ul className='text-sm text-gray-700'>
                        {THEMES.map((theme) => {
                            return (
                                <li
                                    key={theme.name}
                                    onClick={() => {
                                        dispatch(setTheme(theme.name));
                                        setThemeDropdownOpen(false);
                                    }}
                                    className={`hover:bg-gray-100 px-4 py-2 cursor-pointer font-bold flex items-center gap-2 ${theme.name === currentTheme ? 'bg-indigo-50 text-indigo-700' : ''
                                        }`}
                                >
                                    <div
                                        className='w-4 h-4 rounded-full border border-gray-300'
                                        style={{ backgroundColor: theme.colors[0] }}
                                    />
                                    {theme.label}
                                </li>
                            )
                        })}
                        
                    </ul>
                </div>
            )}
        </div>
    )
}

export default ThemeSelector
