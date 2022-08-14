import loadingimg from "../../assets/img/loading.png";

const Loading = () => {
    return (
        <div className="loader">
            <img src={loadingimg} alt="Loader image" />
            Fetching results...
        </div>
    )
}
export default Loading;