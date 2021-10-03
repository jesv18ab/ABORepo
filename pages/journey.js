import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { IoArrowBack } from 'react-icons/io5'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { FlyToInterpolator } from '@deck.gl/core'
import getValueFromKey from '../utils/getValueFromKey'
import SliderNav from '../utilComponents/SliderNav'
import Map from '../utilComponents/Map'
import MOCK_DATA from '../public/data/data'
import PopupComponentInfobox from '../utilComponents/PopupComponentInfoBox'
import { PROCESSING_STEP } from '../appConfig'
import { getAllIds } from '../utils/helperFunctions'

const initialViewState = {
    altitude: 1,
    bearing: 95,
    latitude: 56.162939,
    longitude: 10.203921,
    pitch: 55.79611650485437,
    transitionDuration: 1000,
    transitionInterpolator: new FlyToInterpolator({ speed: 1 }),
    zoom: 10
}

const getViewState = (props) => {
    return {
        // altitude: 1,
        bearing: -90,
        // height: 300,
        latitude: props.lat,
        longitude: props.long,
        pitch: 60,
        transitionDuration: 1000,
        transitionInterpolator: new FlyToInterpolator({ curve: 3, speed: 0.5 }),
        zoom: 12
    }
}

function Journey() {
    // Transferring data through useRouter
    const router = useRouter()
    const [infoBoxIsOpen, setInfoBox] = useState(false)
    const monitorProps = () => {
        if (infoBoxIsOpen) {
            setInfoBox(false)
        }
    }

    const SliderItems = getAllIds(MOCK_DATA.filter((obj) => obj.type.startsWith(PROCESSING_STEP)))

    const [viewState, setViewState] = useState(initialViewState)

    function getCoordsByIndex(index) {
        console.log(index)
        return {
            lat: parseFloat(getValueFromKey(SliderItems[index - 1].event_data, 'lat')),
            long: parseFloat(getValueFromKey(SliderItems[index - 1].event_data, 'long'))
        }
    }

    const generateViewState = (index) => {
        if (index === 0) {
            setViewState(initialViewState)
        } else {
            const coords = getCoordsByIndex(index)
            setViewState(getViewState({ distance: 'close', lat: coords.lat, long: coords.long }))
        }
    }

    return (
        <div
            role="presentation"
            onClick={() => monitorProps()}
            className=" flex flex-col items-center w-screen h-screen ">
            <div className="flex flex-row w-screen justify-between self-start sticky z-50 top-0 ">
                <IoArrowBack
                    className="flex self-start sticky z-50 top-0"
                    onClick={() => router.push({ pathname: '/', query: { pid: router.query.pid } })}
                    size={30}
                />

                <div
                    role="presentation"
                    onClick={() => setInfoBox(!infoBoxIsOpen)}
                    className="blockChainLogoBg">
                    <PopupComponentInfobox
                        props={{
                            modalText:
                                'All coordinates on this page are provided by the Blockchain',
                            openBox: infoBoxIsOpen,
                            text: 'Did you know?'
                        }}
                    />
                </div>
            </div>
            <Map viewState={viewState} onSetViewState={setViewState} />
            <SliderNav onGenerateViewState={generateViewState} SliderItems={SliderItems} />
        </div>
    )
}

export default Journey
