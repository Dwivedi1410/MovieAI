import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import UpperDivision from "./UpperDivision";
import LowerDivision from "./LowerDivision";

export default function Home(){
    const user = useSelector((store) => store.user);

    if(!user){
        return <Navigate to="/authentication" />
    }

    return(
        <div>
            <UpperDivision />
            <LowerDivision />
        </div>
    )
}