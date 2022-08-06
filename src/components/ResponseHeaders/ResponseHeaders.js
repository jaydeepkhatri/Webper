const ResponseHeaders = ({responseheader}) => {
    return (
        <>
            <div>
                {
                    /* console.log(responseheader) */
                    console.log(typeof responseheader)
                    /* Object.keys(responseheader['responseheader']).map((name) => (
                        <p>{name}</p>
                    )) */
                }
            </div>
            
        </>
    )
}

export default ResponseHeaders;