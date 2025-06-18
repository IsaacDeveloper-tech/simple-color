import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";

import { OnClickDarkMode } from "~/components/navbar/navbarFunctions";
import { useContext } from "react";
import { GeneralContext, GeneralContextProvider } from "~/contexts/General";

describe("Nav component functions", () => {
    it("Should change colors on click dark mode button", () => {

        const { result } = renderHook(
            () => useContext(GeneralContext), 
            { wrapper: GeneralContextProvider }
        );

        if(!result.current)
            return;

        const oldPrimaryColor: string = result.current.state.colorState.text;
        OnClickDarkMode(result.current);

        expect(oldPrimaryColor).not.toBe(result.current.state.colorState.primary);
    });
});