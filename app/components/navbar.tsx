import { useContext } from "react";
import { ColorsContext } from "~/contexts/Colors";
import { useDarkMode } from "~/hooks/useDarkMode";
import { useSetDarkMode } from "~/hooks/useSetDarkMode";
import { Colors, ColorsContextValue } from "~/types/color-types";

export function Navbar(){

    const colorsContext = useContext(ColorsContext);
    if(!colorsContext) return;

    const canBeDarkMode = useDarkMode(colorsContext.colors.primary);

    const OnClickDarkMode = (colorsContext:ColorsContextValue) => {
        console.log(useSetDarkMode(colorsContext.colors));
        colorsContext.setColors(useSetDarkMode(colorsContext.colors));
    };

    return (
        <nav className="bg-opacity-0 p-4 fixed top-0 w-full z-10">
            <div className="container mx-auto flex items-center justify-between">
                <div className="text-white font-bold text-xl">
                    Simple Color
                </div>
                <div className="flex items-center space-x-4">
                    <a href="#" className="text-gray-300 hover:text-white">Home</a>
                    <a href="#" className="text-gray-300 hover:text-white">About</a>
                    <a href="#" className="text-gray-300 hover:text-white">Services</a>
                    <a href="#" className="text-gray-300 hover:text-white">Contact</a>
                    {   canBeDarkMode &&
                        <button onClick={() => OnClickDarkMode(colorsContext)} className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded">
                            Dark Mode
                        </button>
                    }
                </div>
            </div>
        </nav>

    );
}