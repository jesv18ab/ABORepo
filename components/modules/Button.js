function Button(props) {
    return (
        <button
            onClick={props.onClick}
            className="m-2 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-700 hover:bg-green-800">
            {props.children}
        </button>
    )
}

export default Button
