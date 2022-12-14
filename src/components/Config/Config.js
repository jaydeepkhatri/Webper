import { RiFileCopyLine } from 'react-icons/ri';
import React from 'react';

const Config = ({ config }) => {

	let updatedConfigObject = {};
	let tobeSkip = ['adapter', 'transformRequest', 'transformResponse', 'validateStatus'];

	for (const [key, value] of Object.entries(config)) {
		if (!tobeSkip.includes(key)) {
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
						<p key={key}><span>{key}</span>: <span>{value}</span><button onClick={() => navigator.clipboard.writeText(value)}><RiFileCopyLine /></button></p>
					))
				}
			</div>

		</div>
	);
};

export default Config;