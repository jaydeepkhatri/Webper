import './styles/main.scss';
import { Header, Feed } from './components';
import { useState, createContext } from 'react';

export const AppContext = createContext(null);

function App() {
	//const [search, setSearch] = useState('https://jethalal-quotes.vercel.app/v1');
	//const [search, setSearch] = useState('https://jsonplaceholder.typicode.com/todos?_limit=4');
	//const [search, setSearch] = useState('http://localhost:3000/');
	const [search, setSearch] = useState('https://images.unsplash.com/photo-1457369804613-52c61a468e7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80');

	const [webdata, setWebData] = useState({});
	const [error, setError] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isLoadingComplete, setIsLoadingComplete] = useState(false);
	const [timeToLoad, setTimeToLoad] = useState(0);
	const [contentType, setContentType] = useState('');

	const [toShow, setToShow] = useState(0);
	const [dataSize, setDataSize] = useState(0);
	const [imageBlob, setImageBlob] = useState(null);

	return (
		<>
			<AppContext.Provider value={{
				search, setSearch,
				webdata, setWebData,
				isLoading, setIsLoading,
				error, setError,
				isLoadingComplete, setIsLoadingComplete,
				timeToLoad, setTimeToLoad,
				contentType, setContentType,
				toShow, setToShow,
				dataSize, setDataSize,
				imageBlob, setImageBlob
			}}>
				<Header />
				<Feed />
			</AppContext.Provider>
		</>
	);
}

export default App;