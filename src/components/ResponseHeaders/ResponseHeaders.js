const ResponseHeaders = ({responseheader}) => {
    return (
        <>
            <div className="box">
                    <div className="title">Headers</div>
                    <pre>{JSON.stringify(responseheader, null, 2)}</pre>
            </div>
            
        </>
    )
}

export default ResponseHeaders;