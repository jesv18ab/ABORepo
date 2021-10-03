import React from 'react'
import { BiCubeAlt } from 'react-icons/bi'

export default function BottomCard({ cardProps }) {
    return (
        <section className="flex flex-col flex-start w-full h-88 mb-auto">
            <div className="flex flex-start flex-col font-sans justify-center items-center w-full h-1/6 p-8 pl-4 pr-4 pb-4 ">
                <div className="flex flex-row w-full mb-4 justify-center ">
                    <BiCubeAlt className="animate-pulse" color="#189BA3" size={30} />
                    <div style={cardProps.headlineStyle}>{cardProps.headerText}</div>
                </div>
            </div>
            <div className="flex flex-row justify-evenly h-full ">
                <div className=" flex flex-col h-full w-full p-4 text-sm pt-0 pb-2 ">
                    <div className="flex text-base font-semibold underline p-2">
                        <h3 className="text-center">{cardProps.subHeader}</h3>
                    </div>
                    <div className=" flex text-sm w-full font-sans ">
                        <div>{cardProps.cardText}</div>
                    </div>
                    <div className="flex text-base font-sans font-semibold underline p-2 self-center">
                        <div>Se Our Engraving Process</div>
                    </div>
                    <div className="flex flex-row justify-evenly w-full h-28 p-2 overflow-hidden ">
                        <video className="w-full h-auto" controls autoPlay loop muted>
                            <source
                                src={'../../assets/videos/engravingPencils.mp4'}
                                type="video/mp4"
                            />
                        </video>
                    </div>
                </div>
            </div>
        </section>
    )
}
