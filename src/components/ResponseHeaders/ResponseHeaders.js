import { RiFileCopyLine } from 'react-icons/ri';

const ResponseHeaders = ({ responseheader }) => {
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
						Object.entries(responseheader).map(([key, value]) => (
							<p key={key}><span>{key}</span>: <span>{value}</span><button onClick={() => navigator.clipboard.writeText(value)}><RiFileCopyLine /></button></p>
						))
					}
				</div>
			</div>

		</>
	);
};

export default ResponseHeaders;