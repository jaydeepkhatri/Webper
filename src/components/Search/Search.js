import {FiSearch} from "react-icons/fi";
import { useEffect, useState } from "react";
import {Status} from "../index";
import axios from "axios";

const getData = (search) => {
    console.log(search)
    
}

const Search = () => {
    //const [search, setSearch] = useState('https://animechan.vercel.app/api/random')
    const [search, setSearch] = useState('https://animechan.vercel.app/api/random');
    const [webdata, setWebData] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        axios.get(search)
        .then((data) => {
            console.log(data);
            setWebData(JSON.stringify(data, null, 2));
            setStatus(JSON.stringify(data.status));
            
        })
        .catch(error => setWebData(JSON.stringify(error, null, 2)));
    }, [search, status])

    return (
        <div className="section">
            <div className="form">
                <input type="text" className="input" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="https://facebook.com" />
                <button type="submit"><FiSearch /></button>
            </div>
            <p className="text">Scrap website content..</p>
            <div className="content">
                <div className="code">{webdata}</div>
                <div className="info"><Status status={status} /></div>
            </div>
        </div>
    )
}

export default Search;