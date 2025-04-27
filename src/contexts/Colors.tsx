import { createContext } from "react";

const ColorsContextProvider = createContext(null);

function ColorsContext(){
    
    return(
        <ColorsContextProvider.Provider value={{

        }}>

        </ColorsContextProvider.Provider>
    );
}