import React, {useState} from "react";
import pageNotFound from "../image/404.png";


const PageNotFound = () => {

    const [loading, setLoading] = useState(true)

    return (
        <>
            <div className="container col-md-6 offset-md-4 p-5">
                    {loading ? (<img src={pageNotFound} width="250px" height="250px" alt="loading..."/>) : null}
            </div>
        </>
    )
}

export default PageNotFound