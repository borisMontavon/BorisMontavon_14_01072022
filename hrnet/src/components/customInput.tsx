import PropTypes from "prop-types";
import { ChangeEventHandler } from "react";

interface CustomInputProps {
    inputId: string;
    inputPattern: string;
    min: string;
    labelTitle: string;
    type: string;
    errorSpanId: string;
    errorSpanMessage: string;
    onChangeInput: ChangeEventHandler<HTMLInputElement>;
}

export function CustomInput({inputId, inputPattern, min, labelTitle, type, errorSpanId, errorSpanMessage, onChangeInput}:CustomInputProps) {
    return (
        <div>
            <label
                htmlFor={inputId}
                className="text-white block mt-4 mb-2"
            >
                {labelTitle}
            </label>
            <input
                type={type}
                id={inputId}
                min={min}
                onBlur={onChangeInput}
                className="w-full p-2 rounded outline-none outline-offset-1 focus-visible:outline-teal-700"
                pattern={inputPattern}
            />
            <span
                id={errorSpanId}
                className="hidden text-red-600 mt-1"
            >
                {errorSpanMessage}
            </span>
        </div>
    );
}

CustomInput.propTypes = {
    inputId: PropTypes.string.isRequired,
    inputPattern: PropTypes.string,
    min: PropTypes.string,
    labelTitle: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    errorSpanId: PropTypes.string.isRequired,
    errorSpanMessage: PropTypes.string.isRequired,
    onChangeInput: PropTypes.func.isRequired
}
