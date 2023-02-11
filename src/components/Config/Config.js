import { RiFileCopyLine } from 'react-icons/ri';
import { useContext } from 'react';
import { AppContext } from '../../App';

const Config = () => {

	const { webdata } = useContext(AppContext);

	let updatedConfigObject = {};
	let headersTobeSkipped = ['adapter', 'transformRequest', 'transformResponse', 'validateStatus'];

	for (const [key, value] of Object.entries(webdata.config)) {
		if (!headersTobeSkipped.includes(key)) {
			if (typeof value !== 'object' || Array.isArray(value)) {
				updatedConfigObject[key] = value + '';
			} else {
				for (const [subKey, subValue] of Object.entries(value)) {
					updatedConfigObject[subKey] = subValue + '';
				}
			}
		}
	}

	return (
		<div className="box">
			<div className="title__wrapper">
				<p className="title">Config</p>
				<div className="buttons">
					<button onClick={() => navigator.clipboard.writeText(JSON.stringify(updatedConfigObject))}>Copy <RiFileCopyLine /></button>
				</div>
			</div>
			<div className="info">
				{
					Object.entries(updatedConfigObject).map(([key, value]) => (
						<p key={key}><span>{key}</span>: <span>{value}</span><button onClick={() => navigator.clipboard.writeText(`${key} - ${value}`)}><RiFileCopyLine /></button></p>
					))
				}
			</div>

		</div>
	);
};

export default Config;