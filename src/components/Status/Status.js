import {FiCheck} from "react-icons/fi";


const Status = ({status, time}) => {

    let statusClass = status >= 500 ?
                        "pink" : status >= 400 ?
                            "red" : status >= 300 ?
                                "yellow" : status >= 200 ?
                                    "green": null;


    return(
        <>
            <div className={`status ${statusClass}`}>
                <p className="statusinfo">Status: <strong>{status}</strong></p>
                <p className="statusinfo">Time: <strong>{time}ms</strong></p>

            </div>
        </>
    )
}

export default Status;