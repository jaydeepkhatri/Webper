import {FiCheck} from "react-icons/fi";


const Status = ({status, statusText}) => {

    let statusClass = status >= 500 ?
                        "pink" : status >= 400 ?
                            "red" : status >= 300 ?
                                "yellow" : status >= 200 ?
                                    "green": null;


    return(
        <>
            <div className={`status ${statusClass}`}>
                <span className="icon"><FiCheck /></span>
                Status: {status} ({statusText})
            </div>
        </>
    )
}

export default Status;