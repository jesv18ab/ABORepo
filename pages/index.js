import { CircularProgress } from '@material-ui/core'
import React, { useEffect, useReducer, useState } from 'react'
import CountUp from 'react-countup'
import { Button, Modal, Popup } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import { BiCubeAlt } from 'react-icons/bi'
import { useRouter } from 'next/router'
import CustomTable from '../utilComponents/Table'
import PopupComponentInfoBox from '../utilComponents/PopupComponentInfoBox'
import styles from '../assets/scss/Main.module.css'
import { getCollectedPlastic } from '../utils/helperFunctions'
import MOCK_DATA from '../public/data/data'

function modalReducer(state, action) {
    switch (action.type) {
        case 'OPEN_MODAL':
            return {
                dimmer: action.dimmer,
                modalText: action.modalText,
                openTable: true
            }
        case 'CLOSE_MODAL':
            return { openTable: false }
        default:
            throw new Error()
    }
}

function Index() {
    const [popOneIsOpen, setPopOne] = useState(false)
    const [popTwoIsOpen, setPopTwo] = useState(false)
    const [infoBoxIsOpen, setInfoBox] = useState(false)

    const [state, dispatch] = useReducer(modalReducer, {
        dimmer: undefined,
        modalText: '',
        openTable: false
    })
    const { openTable, dimmer, modalText } = state

    // Code that controls that only one popup is open at a time
    const controlPopUps = (id) => {
        if (id === 'c02' && popTwoIsOpen) {
            setPopTwo(false)
        }
        if (id === 'material' && popOneIsOpen) {
            setPopOne(false)
        }
    }
    const monitorProps = () => {
        if (popOneIsOpen) {
            setPopOne(false)
        }
        if (popTwoIsOpen) {
            setPopTwo(false)
        }
        if (infoBoxIsOpen) {
            setInfoBox(false)
        }
    }

    const router = useRouter()

    /* This will make sure that all popups disappear, when modal opens. Otherwise the popup will display,
      in front of modal, until the user clicks somewhere on the page. When popups are closed
       The method will open the modal with the table.
      */
    const activateModal = (props) => {
        if (popTwoIsOpen) {
            setPopTwo(false)
        }
        if (popOneIsOpen) {
            setPopOne(false)
        }
        dispatch({
            dimmer: props.dimmer,
            modalText: props.modalText,
            type: props.type
        })
    }

    // Popupcomponent

    const PopupComponent = (props) => {
        return (
            <div className="flex flex-col items-start w-58 font-sans ">
                <div className="flex flex-row self-center">
                    <BiCubeAlt className="text-bcLogo" size={32.64} />
                    <h2 className="font-sans text-2xl font-semibold mt-0 text-text">
                        {' '}
                        {props.text}{' '}
                    </h2>
                </div>
                <ul className="mt-2 text-text">
                    <li className=" p-1 text-lg">Published by: A Better Ocean</li>
                    <li className=" p-1 text-lg">Created date: ????</li>
                    <li className=" p-1 text-lg">Data from Blockchain</li>
                </ul>
                <button
                    type="button"
                    className="w-60 h-10 rounded-lg text-lg font-medium text-text bg-accent shadow-md font-sans"
                    onClick={() =>
                        activateModal({
                            dimmer: 'blurring',
                            modalText: props.headerText,
                            type: 'OPEN_MODAL'
                        })
                    }>
                    ALL DATA
                </button>
            </div>
        )
    }

    // Properties of the Countup component

    useEffect(() => {
        if (!router.query.pid) {
            router.replace({
                pathname: '/',
                query: { pid: '5-product-1' }
            })
            setTimeout(function () {
                setInfoBox(true)
            }, 3000)
        }
    }, [router])

    if (router.query.pid) {
        const plasticCollectedKg = getCollectedPlastic()
        const product = MOCK_DATA.find((item) => item.id == router.query.pid)
        const partner = product.event_data.find((item) => item.key_name === 'company_name').value
        const charArr = [...partner.toUpperCase()]

        // Filtering for the specific product
        return (
            <div role="presentation" onClick={() => monitorProps()} className={styles.container}>
                <div className="flex fixed w-full h-auto justify-end">
                    <div
                        role="presentation"
                        onClick={() => setInfoBox(!infoBoxIsOpen)}
                        className="blockChainLogoBg xl:mr-1/3 ">
                        <PopupComponentInfoBox
                            props={{
                                modalText:
                                    'HEY!  Look for the blue icon. it means that data has been extracted from our Blockchain!',
                                openBox: infoBoxIsOpen,
                                text: 'Blockchain'
                            }}
                        />
                    </div>
                </div>
                <section className="flex flex-start items-center justify-center w-screen h-1/2">
                    <div className=" landingImg bg-productImage bg-center bg-cover text-3xl font-sans font-semibold text-accent xl:w-2/6 ">
                        <div className=" flex flex-col w-full h-full p-2 ">
                            {Object.values(charArr).map((item, index) => {
                                return (
                                    <div
                                        className="w-6 text-center shadowText text-white"
                                        key={index}>
                                        {' '}
                                        {item}{' '}
                                    </div>
                                )
                            })}

                            <div className="w-full h-inherit flex justify-start items-end">
                                <img
                                    className="w-2/6"
                                    src="../assets/img/aboIcon.png"
                                    alt="A better ocean logo"
                                />
                            </div>
                        </div>
                    </div>
                </section>
                <section className="flex flex-col items-center justify-start w-full m-2 text-xl font-normal h-1/3 font-sans">
                    <div className="text-center">
                        <div className="text-text break-words ">
                            At A Better Ocean, we work tenaciously to reduce the amount of
                            nondegradable waste in and around oceans worldwide.
                        </div>
                    </div>
                    <div className=" flex flex-row w-screen h-1/3 justify-around items-center mt-2">
                        <div className=" flex flex-col w-auto h-auto">
                            <div className="flex flex-row h-10 items-baseline ">
                                <Popup
                                    open={popOneIsOpen}
                                    onOpen={() => setPopOne(!popOneIsOpen)}
                                    className="h-56 rounded-xl "
                                    on="click"
                                    content={PopupComponent({
                                        handleTable: 1,
                                        headerText: ' Co2 Footprint',
                                        text: 'CO2" Footprint'
                                    })}
                                    trigger={
                                        <BiCubeAlt
                                            onClick={() => controlPopUps('c02')}
                                            className="animate-pulse mt-2 text-bcLogo"
                                            size={25}
                                        />
                                    }
                                />
                                <CountUp
                                    className="text-4xl font-medium font-sans border-none"
                                    start={0}
                                    end={plasticCollectedKg}
                                    duration={15}
                                    separator=" "
                                    decimals={2}
                                    decimal=","
                                />
                                <div className="text-3xl font-medium font-sans border-none">
                                    {' '}
                                    kg
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-xl text-text"> Plastic Collected </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col justify-around w-screen h-auto items-center mt-1 outline-none">
                        <button
                            style={{ height: '4rem' }}
                            type="button"
                            onClick={() =>
                                router.push({
                                    pathname: 'journey',
                                    query: { pid: router.query.pid }
                                })
                            }
                            className="w-10/12 h-16 rounded-xl text-text m-1 outline-none focus:outline-none shadow-lg bg-accent border-tertiary">
                            SEE COLLECTION AREAS
                        </button>
                        <button
                            type="button"
                            onClick={() => router.push('https://abetterocean.com/')}
                            className="w-10/12 h-16 rounded-xl m-1 text-text outline-none focus:outline-none shadow-lg bg-accent border-tertiary">
                            VISIT US
                        </button>
                    </div>
                </section>

                <Modal
                    dimmer={dimmer}
                    open={openTable}
                    onClose={() => dispatch({ type: 'CLOSE_MODAL' })}>
                    <Modal.Header>Blockchain data - {modalText}</Modal.Header>
                    <Modal.Content>{<CustomTable />}</Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={() => dispatch({ type: 'CLOSE_MODAL' })}>
                            Close
                        </Button>
                    </Modal.Actions>
                </Modal>
            </div>
        )
    }
    return (
        <div style={{ justifyContent: 'center' }} className={styles.container}>
            <CircularProgress />
        </div>
    )
}

export default Index
