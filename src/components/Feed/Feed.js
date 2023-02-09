import './feed.scss';
import { FiSearch } from 'react-icons/fi';
import { RiFileCopyLine, RiDownloadLine } from 'react-icons/ri';
import { useContext } from 'react';
import { Status, ResponseHeaders, Config, Loading, Error } from '../index';
import axios from 'axios';
import { AppContext } from '../../App';



const Search = () => {
	const {
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
	} = useContext(AppContext);

	let sections = ['data', 'headers', 'config'];
	let timer = 0;

	const fetchAPI = () => {
		if (search.length !== 0) {
			setIsLoading(true);
			if (error) setError(false);

			axios({
				method: 'get',
				url: search,
				validateStatus: function () {
					return true;
				}
			}).then((data) => {
				//console.log(data);

				setContentType(data.headers['content-type']);

				if (data.headers['content-type'] === 'image/jpeg' || data.headers['content-type'] === 'image/png') {
					setImageBlob(btoa(
						new Uint8Array(data.data).reduce(
							(data, byte) => data + String.fromCharCode(byte), '')
					));
				}
				console.log(data);

				setWebData(data);
				setIsLoadingComplete(true);
				setDataSize(data.data.length);
				let date = new Date();
				setTimeToLoad(date.getTime() - timer);
				setIsLoading(false);
			})
				.catch(error => {
					console.log(error);

					setError(true);
					setIsLoading(false);
					setWebData(error);
					let date = new Date();
					setTimeToLoad(date.getTime() - timer);
					setIsLoadingComplete(true);
				});
		}
	};

	const handleDownload = (json) => {

		//Download JSON file
		const file = new Blob([JSON.stringify(json)], { type: 'application/json' });
		const fileURL = URL.createObjectURL(file);

		const link = document.createElement('a');
		link.download = crypto.randomUUID() + '.json';
		link.href = fileURL;
		link.click();
	};


	return (
		<>
			<div className='section'>
				<div className={`inputcontainer ${isLoadingComplete ? 'searched' : ''}`} >
					<form method='get' action='/' onSubmit={(e) => { e.preventDefault(); let date = new Date(); timer = date.getTime(); fetchAPI(); }} className='form'>
						<input type='text' className='search-input' onChange={(e) => { setIsLoadingComplete(false); setSearch(e.target.value); }} value={search} placeholder='Enter URL' />
						<button type='submit' onClick={() => { let date = new Date(); timer = date.getTime(); fetchAPI(); }}>GET</button>
					</form>
				</div>

				{
					isLoading ? <Loading /> : isLoadingComplete ? (
						error ?
							<>
								<Error />
							</>
							:
							<>
								<div className='container'>
									<div className='show__button_group'>
										{
											sections.map((section, i) => (
												<>
													<button key={i} className={`btn ${toShow === i ? 'active' : ''}`} onClick={() => setToShow(i)}>{section}</button>
												</>

											))
										}
									</div>
								</div>
								<div className='content container'>
									<div className='content__left'>
										{sections[toShow] === 'data' ? <div className='box'>
											<div className='title__wrapper'>
												<p className='title'>Data</p>
												<div className='buttons'>

													<button onClick={() => { handleDownload(webdata.data); }} >Download <RiDownloadLine /></button>
													<button onClick={() => navigator.clipboard.writeText(JSON.stringify(webdata.data))}>Copy <RiFileCopyLine /></button>
												</div>
											</div>
											{
												contentType === 'image/jpeg' ?
													<img src={imageBlob} alt='' /> :
													<pre><code>{typeof webdata.data == 'object' ? JSON.stringify(webdata.data, null, 2) : webdata.data}</code></pre>
											}
										</div>
											: sections[toShow] === 'headers' ? <ResponseHeaders responseheader={webdata.headers} />
												: sections[toShow] === 'config' ? <Config />
													: null
										}
									</div>
									<div className='content__right'>
										<div className='info'>
											<Status status={webdata.status} time={timeToLoad} url={search} dataSize={dataSize} contentType={contentType} />
										</div>
									</div>
								</div>
							</>
					) : <p className='text-center'>Click the search <FiSearch /> to fetch results.</p>
				}
			</div>

		</>
	);
};

export default Search;