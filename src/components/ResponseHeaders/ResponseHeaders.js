import { RiFileCopyLine } from 'react-icons/ri';
import { useContext } from 'react';
import { AppContext } from '../../App';
import { skipKeyObject } from '../../utils/skipKeyObject.js';

const ResponseHeaders = () => {

	const { webdata, setShowNotification } = useContext(AppContext);

	let headersTobeSkipped = ['content-length'];
	let fixObject = skipKeyObject(webdata.headers, headersTobeSkipped);

	return (
		<>
			<div className="box">
				<div className="title__wrapper">
					<p className="title">Headers</p>
					<div className="buttons">
						<button className="copy-btn" onClick={() => { navigator.clipboard.writeText(JSON.stringify(fixObject)); setShowNotification(true); }}>Copy <RiFileCopyLine /></button>
					</div>
				</div>
				<div className="info split">
					{
						Object.entries(fixObject).map(([key, value]) => (
							<p key={key}><span>{key}</span>: <span>{value}</span><button onClick={() => { navigator.clipboard.writeText(`${key} - ${value}`); setShowNotification(true); }}><RiFileCopyLine /></button></p>
						))
					}
				</div>
			</div>

		</>
	);
};

export default ResponseHeaders;