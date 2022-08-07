import {FiSearch} from "react-icons/fi";
import { useEffect, useState } from "react";
import {Status, ResponseHeaders} from "../index";
import axios from "axios";

const Search = () => {
    //testing API without CORS
    //const [search, setSearch] = useState('https://animechan.vercel.app/api/random')
    const [search, setSearch] = useState('http://localhost:3000/');
    const [webdata, setWebData] = useState({});
    const [error, setError] = useState(false);

    

    useEffect(() => {
        axios.get(search)
        .then((data) => {
            console.log(data);
            if(error) setError(false);
            setWebData(data);
        })
        .catch(error => {
            setError(true);
            setWebData(error);
        });
    }, [search])

    return (
            <div className="section">
                <div className="inputcontainer">
                    <div className="form">
                        <input type="text" className="input" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="https://facebook.com" />
                        <button type="submit"><FiSearch /></button>
                    </div>
                    <p className="text">Scrap website content..</p>
                </div>

                {
                    error ? 
                        <p>Oppsie, We have a error</p>
                    : <div className="content">
                        <div className="code">
                            <div className="title">Server Response</div>
                            {webdata.data}</div>
                        <div className="info">
                            <Status status={webdata.status} statusText={webdata.statusText} />
                            <ResponseHeaders responseheader={webdata.headers} />
                        </div>
                    </div>
                }

                
            </div>        
    )
}

export default Search;