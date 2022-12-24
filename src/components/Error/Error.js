import { MdOutlineError } from "react-icons/md";

const Error = ({search, err_code ,timeToLoad}) => {
    return (
        <div className="content error">
            <div className="box">
                <div className="title"><MdOutlineError /> We have a error</div>
                <p>Couldn't fetch <em>{search}</em></p><br />
                <p>Error Code: <strong>{err_code}</strong></p><br />
                <p>Time: {timeToLoad}ms</p>
            </div>
        </div>
    )
}

export default Error;