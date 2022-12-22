import { RiFileCopyLine } from "react-icons/ri";

const Config = ({ config }) => {
    return (
        <div className="box">
            <div className="title__wrapper">
                <p className="title">Config</p>
                <div className="buttons">
                    <button className="copy-btn" onClick={() => navigator.clipboard.writeText(JSON.stringify(config))}>Copy <RiFileCopyLine /></button>
                </div>
            </div>
            <pre>{JSON.stringify(config, null, 2)}</pre>

        </div>
    )
}

export default Config;