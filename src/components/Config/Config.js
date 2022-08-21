import { RiFileCopyLine } from "react-icons/ri";

const Config = ({config}) => {
    return (
        <div className="box">
            <div className="title">Config</div>
            <pre>{JSON.stringify(config, null, 2)}</pre>
            <div className="buttons">
                <button className="copy-btn" onClick={() => navigator.clipboard.writeText(JSON.stringify(config))}><RiFileCopyLine /></button>
            </div>
        </div>
    )
}

export default Config;