import PropTypes from "prop-types";

interface CustomModalProps {
    show: boolean;
    title: string;
    employeeData: {
        "firstName": string,
        "lastName": string,
        "serializedBirthDate": string,
        "serializedStartDate": string,
        "street": string,
        "zipCode": string,
        "city": string,
        "state": string,
        "department": string
    };
    onClose: Function;
}

export function CustomModal({show, title, employeeData, onClose}:CustomModalProps) {
    if (!show) {
        return null;
    }

    return (
        <div className="bg-opacDark w-screen h-screen fixed top-0 left-0 flex justify-center items-center">
            <div className="bg-neutral-900 rounded-lg w-modal">
                <div className="text-white font-medium p-5 border-b border-neutral-600">
                    {title}
                </div>
                <div className="text-white p-5 border-b border-neutral-600">
                    <p className="mb-1">First Name : <span className="text-teal-700">{employeeData.firstName}</span></p>
                    <p className="mb-1">Last Name : <span className="text-teal-700">{employeeData.lastName}</span></p>
                    <p className="mb-1">Birth Date : <span className="text-teal-700">{employeeData.serializedBirthDate}</span></p>
                    <p className="mb-1">Start Date : <span className="text-teal-700">{employeeData.serializedStartDate}</span></p>
                    <p className="mb-1">Street : <span className="text-teal-700">{employeeData.street}</span></p>
                    <p className="mb-1">Zip Code : <span className="text-teal-700">{employeeData.zipCode}</span></p>
                    <p className="mb-1">City : <span className="text-teal-700">{employeeData.city}</span></p>
                    <p className="mb-1">State : <span className="text-teal-700">{employeeData.state}</span></p>
                    <p className="mb-1">Department : <span className="text-teal-700">{employeeData.department}</span></p>
                </div>
                <div className="text-white p-5 text-right">
                    <button
                        className="bg-transparent py-2 px-4 rounded-md text-teal-700 border border-teal-700 transition-all hover:bg-teal-700 hover:text-white"
                        onClick={(e) => onClose(e)}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

CustomModal.propTypes = {
    show: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    employeeData: PropTypes.object,
    onClose: PropTypes.func.isRequired
}
