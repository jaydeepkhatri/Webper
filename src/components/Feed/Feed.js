import { FiSearch } from "react-icons/fi";
import { RiFileCopyLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import { Status, ResponseHeaders, Config, Loading } from "../index";
import axios from "axios";

const Search = () => {
    //testing API without CORS
    //const [search, setSearch] = useState('https://jaydeepkhatri.me');
    const [search, setSearch] = useState('https://jsonplaceholder.typicode.com/todos?_limit=4');
    //const [search, setSearch] = useState('http://localhost:3000/');
    //const [search, setSearch] = useState('');
    const [webdata, setWebData] = useState({});
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingComplete, setIsLoadingComplete] = useState(false);

    const fetchAPI = () => {
        setIsLoading(true);
        axios({
            method: 'get',
            url: search
        }).then((data) => {
                console.log(data);
                if(error) setError(false);
                setIsLoading(false);
                setWebData(data);
                setIsLoadingComplete(true);
            })
            .catch(error => {
                console.log(error);
                setError(true);
                setIsLoading(false);
                setWebData(error);
                setIsLoadingComplete(true);
            });
    }
    

    return (
            <div className="section">
                <div className="inputcontainer" >
                    <div className="form">
                        <input type="text" className="input" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="https://facebook.com" />
                        <button type="submit" onClick={() => fetchAPI()}><FiSearch /></button>
                    </div>
                </div>

                {
                    isLoading ? <Loading /> : isLoadingComplete ? (
                    error ? 
                        <>
                            <div className="content">
                                <div className="box">
                                    <div className="title">Oppsie, We have a error..</div>
                                    <pre>{JSON.stringify(webdata.response.data, null, 2)}</pre>
                                    <div className="buttons">
                                        <button className="copy-btn" onClick={() => navigator.clipboard.writeText(JSON.stringify(webdata.response.data))}><RiFileCopyLine /></button>
                                    </div>
                                </div>
                                <div className="info">
                                    <p>{webdata.code}</p><br/>
                                    <Status status={webdata.response.status} />
                                    <ResponseHeaders responseheader={webdata.response.headers} />
                                    <Config config={webdata.response.config} />

                                </div>
                            </div>
                        </>
                    : <div className="content">
                        <div className="box">
                            <div className="title">Data Response</div>
                            <pre><code>{typeof webdata.data == "object" ? JSON.stringify(webdata.data, null, 2) : webdata.data}</code></pre>
                            <div className="buttons">
                                <button className="copy-btn" onClick={() => navigator.clipboard.writeText(JSON.stringify(webdata.data))}><RiFileCopyLine /></button>
                            </div>
                            </div>
                        <div className="info">
                            <Status status={webdata.status}/>
                            <ResponseHeaders responseheader={webdata.headers} />
                            <Config config={webdata.config} />
                        </div>
                    </div>
                    ) : <p className="text-center">Click the search <FiSearch /> to fetch.</p>
                }                
            </div>        
    )
}

export default Search;