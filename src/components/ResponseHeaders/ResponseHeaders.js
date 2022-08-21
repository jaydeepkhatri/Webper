import { RiFileCopyLine } from "react-icons/ri";

const ResponseHeaders = ({responseheader}) => {
    return (
        <>
            <div className="box">
                    <div className="title">Headers</div>
                    <pre>{JSON.stringify(responseheader, null, 2)}</pre>
                    <div className="buttons">
                        <button className="copy-btn" onClick={() => navigator.clipboard.writeText(JSON.stringify(responseheader))}><RiFileCopyLine /></button>
                    </div>
            </div>
            
        </>
    )
}

export default ResponseHeaders;