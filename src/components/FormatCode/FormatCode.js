import { useContext } from 'react';
import { AppContext } from '../../App';
import { RiFileCopyLine, RiDownloadLine } from 'react-icons/ri';
import Highlight from 'react-highlight';
import '../../../node_modules/highlight.js/styles/stackoverflow-light.css';
import './FormatCode.scss';
import { downloadFile } from '../../utils/downloadFile.js';

const FormatCode = () => {
	const { webdata, contentType } = useContext(AppContext);

	return (
		<div className="box">
			<div className="title__wrapper">
				<p className="title">Format Code</p>
				<div className="buttons">
					<button onClick={() => { downloadFile(webdata.data, contentType); }} >Download <RiDownloadLine /></button>
					<button className="copy-btn" onClick={() => navigator.clipboard.writeText(JSON.stringify(webdata.data))}>Copy <RiFileCopyLine /></button>
				</div>
			</div>
			<Highlight className={`${contentType.split(';')[0].split('/')[1]}`}>
				{typeof webdata.data === 'object' ? JSON.stringify(webdata.data, null, 2) : webdata.data}
			</Highlight>
		</div>
	);
};

export default FormatCode;
