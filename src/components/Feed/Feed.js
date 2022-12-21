import { FiSearch } from "react-icons/fi";
import { RiFileCopyLine } from "react-icons/ri";
import { MdOutlineError } from "react-icons/md";
import { useState } from "react";
import { Status, ResponseHeaders, Config, Loading } from "../index";
import axios from "axios";

const Search = () => {
    //testing API without CORS
    const [search, setSearch] = useState('https://source.unsplash.com/random/?human&1');
    //const [search, setSearch] = useState('http://localhost:3000/');
    //const [search, setSearch] = useState('');
    const [webdata, setWebData] = useState({});
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingComplete, setIsLoadingComplete] = useState(false);
    const [timeToLoad, setTimeToLoad] = useState(0);
    const [contentType, setContentType] = useState("");
    const [dataSize, setDataSize] = useState(0);
    const [imageBlob, setImageBlob] = useState("");

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
                setIsLoading(false);
                setContentType(data.headers["content-type"]);
                if(data.headers["content-type"] == "image/jpeg") {
                    setImageBlob(`data:${data.headers["content-type"]}/ ${data.data}`)
                }
                console.log(data);
                setWebData(data);
                
                
                setIsLoadingComplete(true);
                setDataSize(data.data.length)
                let date = new Date();
                setTimeToLoad(date.getTime() - timer)
            })
                .catch(error => {
                    console.log(error);
                    setError(true);
                    setIsLoading(false);
                    setWebData(error);
                    setContentType(error.headers["content-type"]);
                    let date = new Date();
                    setTimeToLoad(date.getTime() - timer)
                    setIsLoadingComplete(true);
                });
        }


    }


    return (
        <div className="section">
            <div className="inputcontainer" >

                <div className="form">
                    <input type="text" className="search-input" onChange={(e) => { setIsLoadingComplete(false); setSearch(e.target.value) }} value={search} placeholder="Enter URL" />
                    <button type="submit" onClick={() => { let date = new Date(); timer = date.getTime(); fetchAPI(); }}><FiSearch /></button>
                </div>
            </div>

            {
                isLoading ? <Loading /> : isLoadingComplete ? (
                    error ?
                        <>
                            <div className="content error">
                                <div className="box">
                                    <div className="title"><MdOutlineError /> We have a error</div>
                                    <p>Couldn't fetch <em>{search}</em></p><br />
                                    <p>Error Code: <strong>{webdata.code}</strong></p><br />
                                    <p>Time: {timeToLoad}ms</p>
                                </div>
                            </div>
                        </>
                        : <div className="content">
                            <div className="box">
                                <div className="title">Data:</div>
                                {
                                    contentType == "image/jpeg" ? 
                                    <img src={imageBlob} alt="" /> :
                                    <pre><code>{typeof webdata.data == "object" ? JSON.stringify(webdata.data, null, 2) : webdata.data}</code></pre>
                                }
                                <div className="buttons">
                                    <button className="copy-btn" onClick={() => navigator.clipboard.writeText(JSON.stringify(webdata.data))}><RiFileCopyLine /></button>
                                </div>
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