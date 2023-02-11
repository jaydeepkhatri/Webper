import './feed.scss';
import { FiSearch } from 'react-icons/fi';
import { RiFileCopyLine, RiDownloadLine, RiSearchLine } from 'react-icons/ri';
import { useContext } from 'react';
import { Status, ResponseHeaders, Config, Loading, Error } from '../index';
import axios from 'axios';
import { AppContext } from '../../App';
import { downloadFile } from '../../utils/downloadFile.js';


const Search = () => {
	const {
		search, setSearch,
		webdata, setWebData,
		isLoading, setIsLoading,
		error, setError,
		isLoadingComplete, setIsLoadingComplete,
		setTimeToLoad,
		contentType, setContentType,
		toShow, setToShow,
		setDataSize,
		imageBlob, setImageBlob,
		method, setMethod
	} = useContext(AppContext);

	let sections = ['data', 'headers', 'config'];
	let timer = 0;

	const fetchAPI = () => {
		if (search.length !== 0) {
			setIsLoading(true);
			if (error) setError(false);

			axios({
				method: method,
				url: search,
				validateStatus: function () {
					return true;
				},

				// TODO: Fix the arraybuffer issue for images
				// responseType: 'arraybuffer'
			}).then((data) => {
				setContentType(data.headers['content-type']);

				if (data.headers['content-type'].startsWith('image/')) {
					let imgBlob = new Blob([data.data], { type: data.headers });
					let objURL = URL.createObjectURL(imgBlob);
					setImageBlob(objURL);
				}
				console.log(data);

				setWebData(data);
				setIsLoadingComplete(true);
				setDataSize(JSON.stringify(data.data).length);
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

	return (
		<>
			<div className='section'>
				<div className={`inputcontainer ${isLoadingComplete ? 'searched' : ''}`} >
					<form action='/' onSubmit={(e) => { e.preventDefault(); let date = new Date(); timer = date.getTime(); fetchAPI(); }} className='form'>
						<select className='search-dropdown' value={method} onChange={(e) => { setIsLoadingComplete(false), setMethod(e.target.value); }}>
							<option value="get">GET</option>
							<option value="post">POST</option>
						</select>
						<input type='text' className='search-input' onChange={(e) => { setIsLoadingComplete(false); setSearch(e.target.value); }} value={search} placeholder='Enter URL' />
						<button type='submit' onClick={() => { let date = new Date(); timer = date.getTime(); fetchAPI(); }}><RiSearchLine /></button>
					</form>
				</div>

				{
					isLoading ?
						<Loading /> : isLoadingComplete ? (
							error ?
								<Error />
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

										<div className='content'>
											<div className='content__left'>
												{sections[toShow] === 'data' ? <div className='box'>
													<div className='title__wrapper'>
														<p className='title'>Data</p>
														<div className='buttons'>
															<button onClick={() => { downloadFile(webdata.data, contentType); }} >Download <RiDownloadLine /></button>
															<button onClick={() => navigator.clipboard.writeText(JSON.stringify(webdata.data))}>Copy <RiFileCopyLine /></button>
														</div>
													</div>
													{
														contentType === 'image/jpeg' ?
															<img src={imageBlob} alt='' /> :
															<pre><code>{typeof webdata.data == 'object' ? JSON.stringify(webdata.data, null, 2) : webdata.data}</code></pre>
													}
												</div>
													: sections[toShow] === 'headers' ? <ResponseHeaders />
														: sections[toShow] === 'config' ? <Config />
															: null
												}
											</div>
											<div className='content__right'>
												<div className='info'>
													<Status />
												</div>
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