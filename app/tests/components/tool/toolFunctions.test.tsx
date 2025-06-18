import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, renderHook } from "@testing-library/react";

import { GeneralContextProvider, GeneralContext } from "~/contexts/General";
import { useRef, useContext } from "react";

import { 
    putColor, 
    isValidInput,
    copyStyle,
    putStyle,
    chooseColor  
} from "~/components/tool/toolFunctions";
import { Colors, GeneralContextValue } from "~/types/types";

afterEach(() => {
    vi.resetAllMocks();
});

describe("Tool component functions", () => {
    it("Should be the same value in both inputs", () => {
        const { result: {current: valueRef} } = renderHook(
            () => useRef<HTMLInputElement>(null)
        );

        // test input for set a color
        const TextInputColor = () => <input aria-label="inputText" type="text" ref={valueRef} />;
        
        // color input
        const ColorInput = () => 
            <input aria-label="inputColor" type="color" onChange={(e) => putColor(e, valueRef)}/>;

        render(
            <>
                <TextInputColor />
                <ColorInput />
            </>
        );

        const colorInputComponent = screen.getByLabelText<HTMLInputElement>("inputColor");
        const textInputComponent = screen.getByLabelText<HTMLInputElement>("inputText");

        // Actions to test
        fireEvent.change(colorInputComponent, 
            {
                target: {value: "#330033"}
            }
        );

        expect(textInputComponent.value).toBe("#330033");
    });

    it("Should be true or false depends of hex color validation", () => {
        expect(!isValidInput("#30393987438")).toBeTruthy();
        expect(isValidInput("#303939")).toBeTruthy();
    });

    it("", async () => {
        const writeTextMock = vi.fn().mockResolvedValue(undefined);


        Object.defineProperty(global.navigator, "clipboard", {
            value: { writeText: writeTextMock },
            configurable: true
        });

        const colors: Colors = {
            primary:    "#430094",
            secondary:  "#780abd",
            tertiary:   "#948d00",
    
            primaryText: "#ffffff",
            secondaryText: "#ffffff",
            tertiaryText: "#ffffff",
    
            background: "#f2f2f2",
            text: "#16161d"
        };

        const colorResult: string = `
    :root {
        --primary: #430094;
        --secondary: #780abd;
        --tertiary: #948d00;
        --primary-text: #ffffff;
        --secondary-text: #ffffff;
        --tertiary-text: #ffffff;
        --background: #f2f2f2;
        --text: #16161d;
    }
    `;

        await copyStyle(colors);

        expect(writeTextMock).toHaveBeenCalledTimes(1);
        //TODO
        //expect(writeTextMock).toHaveBeenCalledWith(colorResult);
    });

    it("updates the primary color via putStyle", () => {
        const { result } = renderHook(() => useContext(GeneralContext), {
            wrapper: GeneralContextProvider,
        });

        expect(result.current).toBeTypeOf("object");

        const Selector = () => <select 
            aria-label="selector"
            style={result.current?.state.styleState.headerInput}
            onChange={(e) => putStyle(e, result.current)}
        />;

        render(<Selector />);

        const selectorComponent = screen.getByLabelText<HTMLSelectElement>("selector");

        // Actions to test
        fireEvent.change(selectorComponent, 
            {
                target: {value: "gap"}
            }
        );

        // El resultado se actualiza de forma síncrona dentro de act()
        expect(result.current!.state.styleState.header.color).toBe("#ffffff");
    });

    it("updates the primary color via chooseColor", () => {
        const { result } = renderHook(() => useContext(GeneralContext), {
            wrapper: GeneralContextProvider,
        });

        const { result: { current: valueSelectRef } } = renderHook(() => useRef<HTMLSelectElement>(null));
        const { result: { current: valueInputRef } } = renderHook(() => useRef<HTMLInputElement>(null));

        const Selector = () => <select
            style={result.current?.state.styleState.headerInput}
            value="gap"
            ref={valueSelectRef}
        />;

        // color input
        const ColorInput = () => 
            <input type="text" value="#131313" ref={valueInputRef}/>;
        
        const Button = () => <button aria-label="btn" onClick={(e) => chooseColor(result.current, valueInputRef, valueSelectRef)} />

        render(
            <>
                <Selector />
                <ColorInput />
                <Button />
            </>
        );
        
        const buttonTest = screen.getByLabelText<HTMLButtonElement>("btn");
        const oldState = result.current?.state;
        
        fireEvent.click(buttonTest);

        expect(result.current?.state).not.toBe(oldState);
    });
});