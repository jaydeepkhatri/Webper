import { RiFileCopyLine } from 'react-icons/ri';
import { useContext } from 'react';
import { AppContext } from '../../App';
import { skipKeyObject } from '../../utils/skipKeyObject.js';

const Config = () => {

	const { webdata, setShowNotification } = useContext(AppContext);

	let headersTobeSkipped = ['adapter', 'transformRequest', 'transformResponse', 'validateStatus'];
	let fixObject = skipKeyObject(webdata.config, headersTobeSkipped);

	return (
		<div className="box">
			<div className="title__wrapper">
				<p className="title">Config</p>
				<div className="buttons">
					<button onClick={() => { navigator.clipboard.writeText(JSON.stringify(fixObject)); setShowNotification(true); }}>Copy <RiFileCopyLine /></button>
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
	);
};

export default Config;