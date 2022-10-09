const Status = ({status, time, url}) => {

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

            </div>
        </>
    )
}

export default Status;