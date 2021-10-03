import styles from '../assets/scss/Main.module.css'
import React, { createRef, useEffect, useRef } from 'react'
import { IoArrowBack } from 'react-icons/io5'
import { useRouter } from 'next/router'
import 'react-circular-progressbar/dist/styles.css'
import { CircularProgress } from '@material-ui/core'
import { MAP_SLIDER_TITLES, PROCESSING_STEP } from '../appConfig'
import { getAllIds } from '../utils/helperFunctions'
import LastCard from '../utilComponents/LastCard'
import MainCard from '../utilComponents/MainCard'
import MOCK_DATA from '../public/data/data'
const titles = MAP_SLIDER_TITLES

export default function details() {
    const router = useRouter()
    const pid = router.query.pid
    const ids = getAllIds(MOCK_DATA.filter((obj) => obj.type.startsWith(PROCESSING_STEP)))
    const arrLength = Object.values(ids).length
    const elRefs = useRef([])
    if (elRefs.current.length !== arrLength) {
        // add or remove refs
        elRefs.current = Array(arrLength)
            .fill()
            .map((_, i) => elRefs.current[i] || createRef())
    }

    useEffect(() => {
        let node = null
        let top = 0
        Object.values(ids).forEach((element, index) => {
            if (element.id === router.query.cardId) {
                node = elRefs.current[index].current
                top = node.getBoundingClientRect().top
            }
        })

        if (typeof window !== 'undefined') {
            window.scrollTo({
                top: top,
                behavior: 'smooth'
            })
        }
    })
    if (pid) {
        const ids = getAllIds(MOCK_DATA.filter((obj) => obj.type.startsWith(PROCESSING_STEP)))
        return (
            <div style={{ height: 'auto', padding: '1rem' }} className={styles.container}>
                <div className=" flex self-start sticky z-50 top-2">
                    <IoArrowBack
                        className="flex self-start sticky z-50 top-2"
                        onClick={() =>
                            router.push({ pathname: 'journey', query: { pid: router.query.pid } })
                        }
                        size={30}
                    />
                </div>
                {Object.values(ids).map((element, index) => (
                    <div className="mb-20" key={index} ref={elRefs.current[index]}>
                        <MainCard
                            props={{
                                element: element,
                                ids: ids,
                                titles: titles,
                                index: index
                            }}
                        />
                    </div>
                ))}

                <div style={{ height: '30rem' }} className=" w-full h-96">
                    <div className="mb-12">
                        <LastCard
                            cardProps={{
                                headerText: 'MORE INFO',
                                subHeader: 'Please reach out if you need anything!'
                            }}
                        />
                    </div>
                </div>
                <div style={{ height: '30rem' }} className=" w-full h-96"></div>
            </div>
        )
    } else
        return (
            <div className="flex w-screen h-full justify-center items-center ">
                {' '}
                <CircularProgress />{' '}
            </div>
        )
}
