import './header.scss';
import { FiGithub } from 'react-icons/fi';

const Header = () => {
	return (
		<header>
			<nav className="container">
				<h2><a href="https://webper.netlify.app/">Webper.</a></h2>
				<ul className="menu-list">
					<li className="menu-item"><a href="https://github.com/jaydeepkhatri/webper" target="_blank" rel="noreferrer"><FiGithub /></a></li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;