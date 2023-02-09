import { MdOutlineError } from 'react-icons/md';
import { useContext } from 'react';
import { AppContext } from '../../App';

const Error = () => {

	const { search, webdata, timeToLoad } = useContext(AppContext);

	return (
		<div className="content error">
			<div className="box">
				<div className="title__wrapper">
					<p className="title"><MdOutlineError /> We have a error</p>
				</div>
				<p>Couldn&apos;t fetch <em>{search}</em></p><br />
				<p>Error Code: <strong>{webdata.code}</strong></p><br />
				<p>Time: {timeToLoad}ms</p>
			</div>

			<div className="box">
				<div className="title__wrapper">
					<h2 className="title">Troubleshoot 👇</h2>
				</div>
				<ul className="troubleshoot">
					<li>Check the URL: Make sure the URL is correctly formatted and includes the appropriate protocol (e.g., &apos;http://&apos; or &apos;https://&apos;).</li>
					<li>Check for typos: Double-check the URL for any typos or mistakes.</li>
					<li>Check for firewall or proxy issues: If you are behind a firewall or using a proxy server, make sure that these are not blocking access to the URL.</li>
					<li>Create a <a href="https://github.com/jaydeepkhatri/Webper/issues" target="_blank" rel="noreferrer">Issue</a> (with URL)</li>
				</ul>
			</div>
		</div>
	);
};

export default Error;