import { FiSearch } from "react-icons/fi";
import { RiFileCopyLine } from "react-icons/ri";
import { useState } from "react";
import { Status, ResponseHeaders, Config, Loading, Error } from "../index";
import axios from "axios";
import { Buffer } from 'buffer';

const Search = () => {
    //testing API without CORS
    const [search, setSearch] = useState('https://jsonplaceholder.typicode.com/todos?_limit=4');
    //const [search, setSearch] = useState('http://localhost:3000/');
    //const [search, setSearch] = useState('https://images.unsplash.com/photo-1457369804613-52c61a468e7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80');
    
    const [webdata, setWebData] = useState({});
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingComplete, setIsLoadingComplete] = useState(false);
    const [timeToLoad, setTimeToLoad] = useState(0);
    const [contentType, setContentType] = useState("");
    const [dataSize, setDataSize] = useState(0);
    const [imageBlob, setImageBlob] = useState(null);

    let timer = 0;

    const fetchAPI = () => {
        if (search.length !== 0) {
            setIsLoading(true);
            if (error) setError(false);


            axios({
                method: 'get',
                url: search,
                validateStatus: function (status) {
                    return true;
                }
            }).then((data) => {
                //console.log(data);
                
                setContentType(data.headers["content-type"]);
                // if (data.headers["content-type"] === "image/jpeg" || data.headers["content-type"] == "image/png") {
                //     const buffer = Buffer.from(data.data, 'binary');
                //     setImageBlob(`data:${data.headers["content-type"]};base64,${buffer.toString('base64')}`);   
                // }
                console.log(data);
                setWebData(data);


                setIsLoadingComplete(true);
                setDataSize(data.data.length)
                let date = new Date();
                setTimeToLoad(date.getTime() - timer);
                setIsLoading(false);
            })
                .catch(error => {
                    console.log(error);
                    setError(true);
                    setIsLoading(false);
                    setWebData(error);
                    let date = new Date();
                    setTimeToLoad(date.getTime() - timer)
                    setIsLoadingComplete(true);
                });
        }
    }


    return (
        <div className="section">
            <div className="inputcontainer" >
                <form method="get" action="/" onSubmit={(e) => { e.preventDefault(); let date = new Date(); timer = date.getTime(); fetchAPI(); }} className="form">
                    <input type="text" className="search-input" onChange={(e) => { setIsLoadingComplete(false); setSearch(e.target.value) }} value={search} placeholder="Enter URL" />
                    <button type="submit" onClick={() => { let date = new Date(); timer = date.getTime(); fetchAPI(); }}><FiSearch /></button>
                </form>
            </div>

            {
                isLoading ? <Loading /> : isLoadingComplete ? (
                    error ?
                        <>
                            <Error search={search} err_code={webdata.code} timeToLoad={timeToLoad}  />
                        </>
                        : <div className="content">
                            <div className="box">
                                <div className="title__wrapper">
                                    <p className="title">Data</p>
                                    <div className="buttons">
                                        <button className="copy-btn" onClick={() => navigator.clipboard.writeText(JSON.stringify(webdata.data))}>COPY <RiFileCopyLine /></button>
                                    </div>
                                </div>
                                {
                                    contentType === "image/jpeg" ?
                                    <img src={imageBlob} alt="" />:
                                    <pre><code>{typeof webdata.data == "object" ? JSON.stringify(webdata.data, null, 2) : webdata.data}</code></pre>
                                }

                            </div>
                            <div className="info">
                                <Status status={webdata.status} time={timeToLoad} url={search} dataSize={dataSize} contentType={contentType} />
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