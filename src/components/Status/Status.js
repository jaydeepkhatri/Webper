const Status = ({status, time, url, dataSize, contentType}) => {

    let statusColor = status >= 500 ?
                        "pink" : status >= 400 ?
                            "red" : status >= 300 ?
                                "yellow" : status >= 200 ?
                                    "green": null;


    return(
        <>
            <div className="box status">
                <div className="title">Info</div>
                <p className="statusinfo">Status: <strong className={statusColor}>{status}</strong></p>
                <p className="statusinfo">Time: <strong>{time}ms</strong></p>
                <p className="statusinfo">URL: <strong>{url}</strong></p>
                <p className="statusinfo">Data Size: <strong>{dataSize}</strong></p>
                <p className="statusinfo">Data Type: <strong>{contentType.split(";")[0].split("/")[1]}</strong></p>
            </div>
        </>
    )
}

export default Status;