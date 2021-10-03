function ManufacturingStep(props) {
    return (
        <div className="flex flex-col ml-4">
            <div className="flex items-center">
                <div className="w-2 h-2 m-3 ml-0 bg-green-700 rounded-full" />
                <div>{props.step.title}</div>
            </div>
            <div className="h-10 ml-0.5 border-l-2 pl-5">ID: {props.step.id}</div>
        </div>
    )
}

export default ManufacturingStep
