import { FiSearch } from "react-icons/fi";
import { RiFileCopyLine } from "react-icons/ri";
import { MdOutlineError } from "react-icons/md";
import { useEffect, useState } from "react";
import { Status, ResponseHeaders, Config, Loading } from "../index";
import axios from "axios";

const Search = () => {
    //testing API without CORS
    const [search, setSearch] = useState('https://jaydeepkhatri.me');
    //const [search, setSearch] = useState('https://jsonplaceholder.typicode.com/todos?_limit=4');
    //const [search, setSearch] = useState('http://localhost:3000/');
    //const [search, setSearch] = useState('');
    const [webdata, setWebData] = useState({});
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingComplete, setIsLoadingComplete] = useState(false);
    const [timeToLoad, setTimeToLoad] = useState(0);

    let timer = 0;

    const fetchAPI = () => {
        setIsLoading(true);
        //setSearch(document.querySelector(".search-input").value);
        // onChange={(e) => setSearch(e.target.value)}

        if(error) setError(false);
        axios({
            method: 'get',
            url: search,
            validateStatus: function (status) {
                return true;
            }
        }).then((data) => {
                console.log(data);
                setIsLoading(false);
                setWebData(data);
                setIsLoadingComplete(true);
                let date = new Date();
                setTimeToLoad(date.getTime() - timer)
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
                        <input type="text" className="search-input" onChange={(e) => {setIsLoadingComplete(false); setSearch(e.target.value)}} value={search} placeholder="https://facebook.com" />
                        <button type="submit" onClick={() => {let date = new Date(); timer = date.getTime(); console.log(date.getTime()); fetchAPI();}}><FiSearch /></button>
                    </div>
                </div>

                {
                    isLoading ? <Loading /> : isLoadingComplete ? (
                    error ? 
                        <>
                            <div className="content error">
                                <div className="box">
                                    <div className="title"><MdOutlineError /> We have a error</div>
                                    <p>Couldn't fetch the <em>{search}</em></p><br/>
                                    <p>Error Code: <strong>{webdata.code}</strong></p>
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
                            <Status status={webdata.status} time={timeToLoad}/>
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