import {FiCheck} from "react-icons/fi";


const Status = ({status}) => {
    if (status) status = parseInt(status);
    let statusClass = status >= 200 ?
                        "green" : status >= 300 ?
                            "yellow" : status >= 400 ?
                                "red" : status >= 500 ?
                                    "pink": null;


    return(
        <>
            <div className={`status ${statusClass}`}>
                <span className="icon"><FiCheck /></span>
                {status}
            </div>
        </>
    )
}

export default Status;