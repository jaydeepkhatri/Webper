const Config = ({config}) => {
    return (
        <div className="box">
            <div className="title">Config</div>
            <pre>{JSON.stringify(config, null, 2)}</pre>
        </div>
    )
}

export default Config;