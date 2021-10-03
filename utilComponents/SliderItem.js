import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { AiOutlineRight } from 'react-icons/ai'
import getTitles from '../utils/getTitles'
import { reverseGeoCoding } from '../utils/helperFunctions'
import { CircularProgress } from '@material-ui/core'
const zipNumDK = 8
const titles = getTitles()

function SliderItem(props) {
    const router = useRouter()
    const { data } = props

    const item = {
        lat: data.event_data.find((item) => item.key_name === 'lat').value,
        long: data.event_data.find((item) => item.key_name === 'long').value
    }
    const [locationData, setLocationData] = useState('')

    useEffect(() => {
        async function getLocationData() {
            return await reverseGeoCoding(item)
        }
        getLocationData().then((data) => {
            setLocationData(data.plus_code.compound_code.substring(zipNumDK).split(',')[0])
        })
    }, [])
    const title = titles[data.type]

    if (locationData) {
        return (
            <div className="outline-none sm: p-2">
                <div
                    style={{
                        backgroundImage: `url(../assets/img/supplychain/${data.type}.jpg)`
                    }}
                    className="flex flex-col bg-cover bg-center justify-center items-center w-56 h-40 rounded-2xl p-1 h-40 font-sans font-semibold text-white lg:w-80 lg:ml-14 lg:h-48">
                    <div className="flex flex-col w-full font-sans text-2xl font-semibold flex-start">
                        <div
                            style={{ filter: 'drop-shadow(2px 4px 6px black)' }}
                            className="relative m-2 top-2.5 lg:text-5xl">
                            {title}
                            <br />
                            {locationData}
                        </div>
                    </div>
                    <div className="flex w-full h-inherit justify-end items-end relative bottom-2.5">
                        <div
                            onClick={() =>
                                router.push({
                                    pathname: 'details',
                                    query: {
                                        pid: router.query.pid,
                                        card: title,
                                        cardId: data.id
                                    }
                                })
                            }
                            className=" flex justify-center items-center bg-cardBg rounded-full h-16 w-16">
                            <AiOutlineRight color="white" size={52} />
                        </div>
                    </div>
                </div>
            </div>
        )
    } else
        return (
            <div className="flex justify-center">
                <CircularProgress />
            </div>
        )
}

export default SliderItem
