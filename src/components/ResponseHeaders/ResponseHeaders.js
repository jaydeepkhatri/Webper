import { RiFileCopyLine } from "react-icons/ri";

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
                <pre>{JSON.stringify(responseheader, null, 2)}</pre>

            </div>

        </>
    )
}

export default ResponseHeaders;