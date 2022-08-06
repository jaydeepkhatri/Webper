import {FiGithub} from "react-icons/fi";

const Header = () => {
    return (
        <header>
            <nav>
                <h2>Webper.</h2>
                <ul className="menu-list">
                    <li className="menu-item"><a href="https://github.com/jaydeepkhatri/webper" target="_blank"><FiGithub /></a></li>
                </ul>
            </nav>
        </header>
    )
}

export default Header;