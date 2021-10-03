import React, { useEffect, useState } from 'react'
import { BiCubeAlt } from 'react-icons/bi'
import {reverseGeoCoding, getFormattedDate, getInfo, getCollectedPlastic} from '../utils/helperFunctions'
import { GiPerson } from 'react-icons/gi'
import { VictoryAxis, VictoryBar, VictoryChart, VictoryLabel, VictoryTheme } from 'victory'
import CountUp from 'react-countup'

const BarChartVic = ({ barData, conditionalVar }) => {
    return (
        <svg className={conditionalVar ? 'flex-no-shrink fill-current w-screen h-full relative left-12' : 'flex-no-shrink fill-current w-screen h-full relative left-28'} viewBox=" 70 70 190 340  ">
            <VictoryChart
                standalone={false}
                responsive
                animate={{
                    duration: 1000,
                    onLoad: { duration: 1000 }
                }}
                domainPadding={{ x: 0 }}
                theme={VictoryTheme.material}>
                <VictoryBar
                    barRatio={8}
                    style={{
                        data: { fill: conditionalVar ? '#90EE90' : '#8AC7DB' }
                    }}
                    alignment="middle"
                    labels={barData[0].y}
                    labelComponent={<VictoryLabel style={{ fontSize: 35, fontWeight: '400' }} />}
                    data={barData}
                />
                <VictoryAxis
                    label={barData[0].x}
                    axisLabelComponent={
                        <VictoryLabel style={{ fontSize: 35, fontWeight: '400' }} />
                    }
                    style={{
                        grid: { stroke: 'transparent' },
                        tickLabels: { fill: 'transparent' },
                        ticks: { stroke: 'transparent' },
                        axis: { stroke: 'none' }
                    }}
                />
            </VictoryChart>
        </svg>
    )
}

const getCardText = (props) => {
    const values = getInfo(props.element, props.ids)
    const item = {
        lat: props.element.event_data.find((item) => item.key_name === 'lat').value,
        long: props.element.event_data.find((item) => item.key_name === 'long').value
    }
    const [locationData, setLocationData] = useState(null)

    useEffect(() => {
        async function getLocationData() {
            return await reverseGeoCoding(item)
        }
        getLocationData().then((data) => {
            setLocationData(data)
        })
    }, [])

    const keysToCheck = [
        {
            id: 'value-chain-checkpoint-collectPlastic',
            cardText: `${values.company_name} has collected ${
                values.kg_collected
            } kg of plastic. The plastic was collected in the area near ${
                !locationData ? 'Not Registered ' : locationData.results[0].formatted_address
            }. We are extremely grateful for all of the volunteers, who are helping us in our quest to reduce the amount of plastic in the oceans of the world`,
            title: props.titles.collectPlastic,
            subheader: 'Team Effort'
        },
        {
            id: 'value-chain-checkpoint-reuse',
            cardText: `Plastic is used widely across the globe. It affects the health of both humans and animals. At out factory we receive the collected plastic and makes sure that it is reused and made into valuable products`,
            title: props.titles.reuse,
            subheader: 'Garment Pattern'
        },
        {
            id: 'value-chain-checkpoint-partner',
            cardText: `We at A Better Ocean are a part of a bigger chain of companies, who are dedicated to solve our common problem. Our partner, ${values.company_name} are able to turn our Ocean plastic into quality products `,
            title: props.titles.partner,
            subheader: 'Mutual Benefits'
        }
    ]
    return keysToCheck.find((item) => item.id === props.element.type)
}

const FigureRight = ({ element, ids }) => {
    const values = getInfo(element, ids)
    const date = new Date(element.timestamp)
    const formattedDate = getFormattedDate(date)
    if (element.type.includes('collectPlastic')) {
        return (
            <div className="flex flex-col h-available w-full text-center">
                <div className="flex flex-col justify-center text-sm h-auto w-full items-center mb-2 ">
                    <div className="text-base font-semibold">Registration Date</div>
                    <div className="flex flex-row w-full justify-center items-center">
                        <div>{!formattedDate ? 'Not Registered ' : formattedDate}</div>
                    </div>
                </div>
                <div className="flex flex-col justify-center text-sm h-auto w-full items-center mb-2 ">
                    <div className="text-base font-semibold ">Employee</div>
                    <div className="flex flex-row w-full justify-center items-center">
                        {!values.employee ? 'Not Registered ' : values.employee}
                        <GiPerson size={25} />
                    </div>
                </div>
                <div className="flex flex-col justify-center text-sm h-auto w-full items-center mb-2 ">
                    <div className="text-base font-semibold ">Location</div>
                    <div className="flex flex-row w-full justify-center items-center">
                        {!values.company_name ? 'Not Registered ' : values.company_name}
                    </div>
                </div>
                <div className="flex flex-col w-full justify-center text-sm items-center mb-2">
                    <div className="text-base font-semibold">Plastic Collected</div>
                    <CountUp
                        className="text-xl font-medium text-red-900 border-none"
                        start={0}
                        end={values.kg_collected}
                        duration={10}
                        separator=" "
                        decimals={0}
                        decimal=","
                    />
                </div>
            </div>
        )
    } else {
        return (
            <div className="flex flex-col h-available w-full text-center">
                <div className="flex flex-col justify-center text-sm h-auto w-full items-center mb-2 ">
                    <div className="text-base font-semibold">Registration Date</div>
                    <div className="flex flex-row w-full justify-center items-center">
                        <div>{!formattedDate ? 'Not Registered ' : formattedDate}</div>
                    </div>
                </div>
                <div className="flex flex-col justify-center text-sm h-auto w-full items-center mb-2">
                    <div className="text-base font-semibold">Employee Name</div>
                    <div className="flex flex-row w-full justify-center items-center">
                        {!values.employee ? 'Not Registered ' : values.employee}
                        <GiPerson size={25} />
                    </div>
                </div>
                <div className="flex flex-col justify-center text-sm h-auto w-full items-center mb-2">
                    <div className="text-base font-semibold">Location</div>
                    <div className="flex flex-row w-full justify-center items-center">
                        {!values.company_name ? 'Not Registered ' : values.company_name}
                    </div>
                </div>
            </div>
        )
    }
}

function MainCard({ props }) {
    const textElements = getCardText(props)
    let collected
    if (props.element.type.includes('collectPlastic')) {
        collected = parseFloat(
            props.element.event_data.find((item) => item.key_name === 'kg_collected').value
        )
    }
    const collectedGlobal = getCollectedPlastic()

    const barDataLocal = [
        {
            x: 'Local Kg',
            y: collected
        }
    ]
    const barDataGlobal = [
        {
            x: 'Total Kg',
            y: collectedGlobal
        }
    ]

    return (
        <section
            className={
                props.element.type.includes('collectPlastic')
                    ? 'h-96'
                    : 'h-56' + ' flex flex-col flex-start w-full mb-4'
            }>
            <div className="flex flex-start flex-col justify-center items-center w-full ">
                <div className="flex flex-row w-full justify-center h-8 justify-center items-center p-2 mb-4 ">
                    <BiCubeAlt className="animate-pulse" color={'#189BA3'} size={30} />
                    <div className="headlineStyle">{textElements.title}</div>
                </div>
            </div>

            <div className="flex flex-row justify-evenly h-auto">
                <div className=" flex flex-col w-full h-full text-sm pt-0 pb-2 mr-2">
                    <div className="flex justify-center text-base font-semibold">
                        <div className="text-center">{textElements.subheader}</div>
                    </div>
                    <div>{textElements.cardText}</div>
                </div>
                <div className=" flex flex-col w-60 justify-evenly h-full">
                    <FigureRight element={props.element} ids={props.ids} />
                </div>
            </div>
            {collected &&
                <div className=" flex flex-row h-44 w-36 lg:h-52 items-center justify-center ">
                <BarChartVic barData={barDataLocal} conditionalVar={true} />
                <BarChartVic barData={barDataGlobal} conditionalVar={false} />
                </div>
                 }
        </section>
    )
}
export default MainCard

/*const StackedBar = ({ index, element }) => {
    const collected = parseFloat(
        element.event_data.find((item) => item.key_name === 'kg_collected').value
    )
    const myDataset = getStackBarData(collected)
    const dataset = transformData(myDataset, index)
    return (
        <svg className="w-full h-20 overflow-hidden" viewBox="35 145 380 20">
            <VictoryChart
                standalone={false}
                domainPadding={{ x: 5, y: 5 }}
                minDomain={{ y: 0 }}
                maxDomain={{ y: collected }}
                animate={{ duration: 1100 }}
                containerComponent={
                    <VictoryVoronoiContainer
                        style={{
                            touchAction: 'auto'
                        }}
                    />
                }>
                <VictoryStack colorScale={['#008080']}>
                    {dataset.map((data, i) => {
                        return (
                            <VictoryBar
                                horizontal
                                data={data}
                                key={i}
                                barWidth={13}
                                cornerRadius={data[0].cornerRadius}
                                labels={({ datum }) => datum.step}
                                style={{
                                    labels: {
                                        fill: 'white',
                                        textAnchor: 'middle',
                                        fontSize: 17,
                                        fontWeight: 500
                                    }
                                }}
                                labelComponent={<VictoryLabel textAnchor="middle" dx={-175} />}
                            />
                        )
                    })}
                </VictoryStack>
                <VictoryAxis
                    style={{
                        axis: { stroke: 'transparent' },
                        ticks: { stroke: 'transparent' },
                        tickLabels: { fill: 'transparent' }
                    }}
                />
            </VictoryChart>
        </svg>
    )
}
*/
