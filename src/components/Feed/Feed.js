import { FiSearch } from "react-icons/fi";
import { useEffect, useState } from "react";
import { Status, ResponseHeaders, Config, Loading } from "../index";
import backgroundImg from "../../assets/img/background.jpg";
import axios from "axios";

const Search = () => {
    //testing API without CORS
    const [search, setSearch] = useState('https://jsonplaceholder.typicode.com/todos');
    //const [search, setSearch] = useState('http://localhost:3000/');
    //const [search, setSearch] = useState('');
    const [webdata, setWebData] = useState({});
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    

    useEffect(() => {
        setIsLoading(true);
        axios.get(search)
        .then((data) => {
            console.log(data);
            if(error) setError(false);
            setIsLoading(false);
            setWebData(data);
        })
        .catch(error => {
            console.log(error);
            setError(true);
            setIsLoading(false);
            setWebData(error);
        });
    }, [search])

    return (
            <div className="section">
                <div className="inputcontainer" style={{backgroundImage: `url(${backgroundImg})`}}>
                    <div className="form">
                        <input type="text" className="input" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="https://facebook.com" />
                        <button type="submit"><FiSearch /></button>
                    </div>
                </div>

                {
                    isLoading ? <Loading /> :
                    error ? 
                        <>
                            <div className="content">
                                <div className="box">
                                    <div className="title">Oppsie, We have a error..</div>
                                    <pre>{JSON.stringify(webdata.response.data, null, 2)}</pre>
                                </div>
                                <div className="info">
                                    <Status status={webdata.response.status} />
                                    <ResponseHeaders responseheader={webdata.response.headers} />
                                    <Config config={webdata.response.config} />

                                </div>
                            </div>
                        </>
                    : <div className="content">
                        <div className="box">
                            <div className="title">Data Response</div>
                            <pre>{JSON.stringify(webdata.data, null, 2)}</pre>
                            </div>
                        <div className="info">
                            <Status status={webdata.status}/>
                            <ResponseHeaders responseheader={webdata.headers} />
                            <Config config={webdata.config} />
                        </div>
                    </div>
                }                
            </div>        
    )
}

export default Search;