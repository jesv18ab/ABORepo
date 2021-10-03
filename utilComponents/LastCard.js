import React, { useEffect, useState } from 'react'
import { BiCubeAlt } from 'react-icons/bi'
import { BiSkipNextCircle } from 'react-icons/bi'
import { useRouter } from 'next/router'
import { FaFacebookSquare, FaInstagram } from 'react-icons/fa'
import { reverseGeoCoding } from '../utils/helperFunctions'

function LastCard({ cardProps }) {
    const router = useRouter()
    return (
        <section className="flex flex-col flex-start w-full h-80 mb-4">
            <div className="flex flex-start flex-col justify-center items-center w-full ">
                <div className="flex flex-row w-full justify-center h-8 justify-center items-center p-2 mb-2 ">
                    <BiCubeAlt className="animate-pulse" color={'#189BA3'} size={30} />
                    <div className="headlineStyle">{cardProps.headerText}</div>
                </div>
            </div>

            <div className="flex flex-col justify-center items-center h-inherit w-full ">
                <div className=" flex flex-col h-full w-full p-2 text-sm pt-0 pb-2 ...">
                    <div className="flex flex-col justify-center h-auto w-full items-center ">
                        <div className="flex flex-row justify-start text-base font-semibold font-sans">
                            <div className="text-center">{cardProps.subHeader2}</div>
                        </div>
                        <div className="flex flex-row ">
                            <div className=" flex flex-row justify-center items-center text-lg font-sans text-center p-2">
                                We would love to hear from you
                            </div>{' '}
                        </div>
                        <button
                            onClick={() => router.push('https://abetterocean.com/')}
                            className=" flex flex-row justify-center items-center w-full bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-bcLogo rounded font-sans text-base pr-0 pl-0">
                            <BiSkipNextCircle
                                className="text-bcLogo relative mr-auto ml-2"
                                size={30}
                            />
                            <div className="absolute mr-auto ml-auto"> PRESS TO FIND US </div>
                        </button>
                    </div>
                    <div className="flex w-full flex-row justify-center m-2 ">
                        <FaInstagram
                            className="m-2"
                            onClick={() => router.push('https://www.instagram.com/abetterocean/')}
                            size={35}
                        />
                        <FaFacebookSquare
                            className="m-2"
                            onClick={() => router.push('https://www.facebook.com/ABetterOceanCom')}
                            size={35}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
export default LastCard
