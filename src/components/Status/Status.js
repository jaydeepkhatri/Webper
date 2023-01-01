const Status = ({ status, time, url, dataSize, contentType }) => {

    let statusColor = status >= 500 ?
        "pink" : status >= 400 ?
            "red" : status >= 300 ?
                "yellow" : status >= 200 ?
                    "green" : null;


    return (
        <>
            <div className="box status">
                <div className="title__wrapper">
                    <p className="title">Info</p>
                </div>
                <p><span>Status:</span>:<span className={statusColor}>{status}</span></p>
                <p><span>Time:</span>:<span>{time}ms</span></p>
                <p><span>URL:</span>:<span>{url}</span></p>
                <p><span>Data Length:</span>:<span>{dataSize}</span></p>
                <p><span>Data Type:</span>:<span>{contentType.split(";")[0].split("/")[1]}</span></p>
            </div>
        </>
    )
}

export default Status;