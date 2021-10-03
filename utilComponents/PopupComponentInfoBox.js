import React from 'react'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { BiCubeAlt } from 'react-icons/bi'
import { Popup } from 'semantic-ui-react'

const PopupContent = ({ props }) => {
    return (
        <div
            className={`flex flex-col bg-black scale-0 bg-opacity-60 w-60 font-sans h-full rounded-xl p-2 ${
                props.openBox
                    ? 'scale-100 transform transition-all duration-700 ease-in-out'
                    : 'scale-0'
            } `}>
            <div className="w-full top-0 text-center self-center p-2 rounded-t-2xl">
                <div className="flex flex-row w-full h-full text-2xl items-center">
                    <div>
                        <AiOutlineInfoCircle className="mr-2" color="white" size={25} />
                    </div>
                    <div>
                        <div className="font-sans text-white font-medium mt-0"> {props.text} </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center h-full w-full h-48 text-white ">
                <div className="flex w-full h-auto text-lg ">
                    <div className="h-auto font-medium">{props.modalText}</div>
                </div>
                <div className="h-inherit w-full contents">
                    <BiCubeAlt
                        className=" animate-pulse mt-2 text-bcLogo ml-auto mr-auto"
                        size={40}
                    />
                </div>
            </div>
        </div>
    )
}
export default function PopupComponentInfobox({ props }) {
    return (
        <Popup
            open={props.openBox}
            style={{ background: 'transparent' }}
            on="click"
            content={<PopupContent props={props} />}
            inverted
            offset={[0, 15]}
            basic
            position="bottom right"
            trigger={<BiCubeAlt className="animate-pulse text-bcLogo " size={35} />}
        />
    )
}
