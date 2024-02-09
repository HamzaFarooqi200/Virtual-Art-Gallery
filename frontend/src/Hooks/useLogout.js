import { AuthenticationContext } from "../Context/AuthenticationContext";
import { useContext } from "react";
//import {WorkoutContext} from "../Context/WorkoutContext"

export const useLogout = () => {
    
    const { dispatch } = useContext(AuthenticationContext);
    
    // for the authentication if no user exsist then nothing to show and reason to name this dispatch an another name is that 
    // we can not have two dispatch at the same time in a file

    //const {dispatch:workoutDispatch} = useContext(WorkoutContext);

    const logOut = () => {
        // removing item from local storage
        localStorage.clear();
        //dispatching logout action
        dispatch({ type: "LOGOUT" });

    }
    return {logOut}
}
