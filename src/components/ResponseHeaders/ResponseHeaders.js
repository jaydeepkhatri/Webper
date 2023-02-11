import { RiFileCopyLine } from 'react-icons/ri';
import { useContext } from 'react';
import { AppContext } from '../../App';

const ResponseHeaders = ({ responseheader }) => {

	const { webdata } = useContext(AppContext);

	return (
		<>
			<div className="box">
				<div className="title__wrapper">
					<p className="title">Headers</p>
					<div className="buttons">
						<button className="copy-btn" onClick={() => navigator.clipboard.writeText(JSON.stringify(responseheader))}>Copy <RiFileCopyLine /></button>
					</div>
				</div>
				<div className="info">
					{
						Object.entries(webdata.headers).map(([key, value]) => (
							<p key={key}><span>{key}</span>: <span>{value}</span><button onClick={() => navigator.clipboard.writeText(`${key} - ${value}`)}><RiFileCopyLine /></button></p>
						))
					}
				</div>
			</div>

		</>
	);
};

export default ResponseHeaders;