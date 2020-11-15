export const getSearchParam = () => localStorage.getItem('search');
export const setSearchParam = (search) => localStorage.setItem('search', search);
export const removeSearchParam = (token) => localStorage.removeItem('search');