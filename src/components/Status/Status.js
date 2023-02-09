import './status.scss';
import { useContext } from 'react';
import { AppContext } from '../../App';

const Status = () => {

	const { webdata, timeToLoad, search, dataSize, contentType } = useContext(AppContext);

	let statusColor = webdata.status >= 500 ?
		'pink' : webdata.status >= 400 ?
			'red' : webdata.status >= 300 ?
				'yellow' : webdata.status >= 200 ?
					'green' : null;

	return (
		<>
			<div className="box status">
				<div className="title__wrapper">
					<p className="title">Info</p>
				</div>
				<p><span>Status:</span>:<span className={statusColor}>{webdata.status}</span></p>
				<p><span>Time:</span>:<span>{timeToLoad}ms</span></p>
				<p><span>URL:</span>:<span>{search}</span></p>
				<p><span>Data Length:</span>:<span>{dataSize}</span></p>
				<p><span>Data Type:</span>:<span>{contentType.split(';')[0].split('/')[1]}</span></p>
			</div>
		</>
	);
};

export default Status;