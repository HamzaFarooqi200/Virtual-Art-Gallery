import { useState } from "react";
import { AuthenticationContext } from "../Context/AuthenticationContext"

import { useContext } from "react";



export const useSignUp = () => {

  

    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    // const {dispatch} = AuthenticationContext()
    const { dispatch } = useContext(AuthenticationContext);


    const signUp = async (formData) => {
        // console.log(email)
        // console.log(password)
        const email = formData.get("email")
        const password = formData.get("password")
        
        if (email && password) {
            setIsLoading(true)
            try {
                const response = await fetch("/api/users/signup",
                    {
                        method: "POST",
                        body:formData
                        
                    })
                    // console.log(response)
                    // console.log("........")

                const data = await response.json()
                console.log(data)

                if (!response.ok) {
                    setIsLoading(false)
                    setError(data.error)
                }

                if (response.ok) {
                    setIsLoading(false)
                    dispatch({ type: "SIGNUP", payload: data })
                    // console.log(JSON.stringify(data))
                    //localStorage.setItem("user", JSON.stringify(data))
                    setError(null)
                }
            }
            catch (er) {
                setIsLoading(false)
                setError(er.message)
            }
        }
        else {
            setError("Please enter email and password")
        }
    

}

return [signUp, isLoading, error]

}


