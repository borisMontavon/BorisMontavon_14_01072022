import PropTypes from "prop-types";
import { ChangeEventHandler } from "react";

interface CustomInputProps {
    inputId: string;
    labelTitle: string;
    type: string;
    onChangeInput: ChangeEventHandler<HTMLInputElement>;
}

export function CustomInput({inputId, labelTitle, type, onChangeInput}:CustomInputProps) {
    return (
        <div className="">
            <label htmlFor={inputId} className="text-white block mt-4 mb-2">{labelTitle}</label>
            <input type={type} id={inputId} onChange={onChangeInput} className="w-full p-2 rounded outline-none outline-offset-1 focus-visible:outline-teal-700" />
        </div>
    );
}

CustomInput.propTypes = {
    inputId: PropTypes.string.isRequired,
    labelTitle: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    onChangeInput: PropTypes.func.isRequired
}
