import MOCK_DATA from '../public/data/data'
import React from 'react'
import { PROCESSING_STEP } from '../appConfig'

function getAllIds(steps) {
    /*
    Traverse tree structure in breadth first fashion, beginning at the root node.
    Return the input steps sorted by the results of the search starting with a leave node.
    Order of leave node traversal is quite random and depends on the data object.

    For this function, we assume that a node can have no more than one parent.
    If one node has zero parents, it is the root node.
    Other nodes with zero parents will be neglected.
     */
    const reverse_ordered_items = []
    const query = []

    // initialize query with root node.
    for (var i = 0; i < steps.length; i++) {
        const hasNoParentIds = !steps[i].parent_ids || !steps[i].parent_ids.length // does the same job
        //const hasNoParentIds = steps[i].parent_ids.length === 0
        const allIds = steps.map((step) => step.id)
        const hasNoProcessingStepParentIds = () => {
            if (steps[i].parent_ids) {
                return steps[i].parent_ids.every((id) => !allIds.includes(id))
            } else return null
        }

        if (hasNoParentIds || hasNoProcessingStepParentIds) {
            query.push(steps[i])
        }
    }
    // main breadth first algo
    /*steps[i].parent_ids &&*/
    while (query.length !== 0) {
        const node = query.shift()
        reverse_ordered_items.push(node)
    }

    // return reverse_ordered_items.reverse
    return reverse_ordered_items /*.filter((v, i, a) => a.findIndex((t) => t.type === v.type) === i)*/
}

function getFormattedDate(timestamp) {
    const date = new Date(timestamp)
    let day = null
    let month = null

    if (date.getDate() < 10) {
        day = `0${date.getDate()}`
    } else {
        day = `${date.getDate()}`
    }
    if (date.getMonth() + 1 < 10) {
        month = `0${date.getMonth() + 1}`
    } else {
        month = `${date.getMonth() + 1}`
    }
    return day + '.' + month + '.' + `${date.getFullYear()}`
}

const getCollectedPlastic = () => {
    const arr = []
    const ids = getAllIds(MOCK_DATA.filter((obj) => obj.type.startsWith(PROCESSING_STEP)))
    ids.forEach((item) => {
        if (item.type.includes('collectPlastic')) {
            const kg_collected = item.event_data.find((item) => item.key_name === 'kg_collected')
                .value
            arr.push(parseFloat(kg_collected))
        }
    })
    const reducer = (accumulator, curr) => accumulator + curr
    return arr.reduce(reducer)
}

const reverseGeoCoding = async (item) => {
    const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${item.lat},${item.long}&key=AIzaSyDEeljtq-Mst5glOZxfS0761oVsW-Sgq5I`
    )
    const data = await response.json()
    return data
}

const getCoordsInfo = async () => {
    const coords = []
    const coordsInfo = []
    const ids = getAllIds(MOCK_DATA.filter((obj) => obj.type.startsWith(PROCESSING_STEP)))
    ids.forEach((item) => {
        if (
            item.event_data &&
            item.event_data.some((e) => e.key_name === 'lat') &&
            item.event_data.some((e) => e.key_name === 'long') &&
            item.type.includes('collectPlastic')
        ) {
            const lat = item.event_data.find((item) => item.key_name === 'lat').value
            const long = item.event_data.find((item) => item.key_name === 'long').value
            const company = item.event_data.find((item) => item.key_name === 'company_name').value
            const plasticCollected = item.event_data.find(
                (item) => item.key_name === 'kg_collected'
            ).value
            const timestamp = getFormattedDate(item.timestamp)
            coords.push({
                lat: lat,
                long: long,
                company: company,
                timestamp: timestamp,
                plasticCollected: plasticCollected
            })
        } else if (
            item.event_data &&
            item.event_data.some((e) => e.key_name === 'lat') &&
            item.event_data.some((e) => e.key_name === 'long')
        ) {
            const lat = item.event_data.find((item) => item.key_name === 'lat').value
            const long = item.event_data.find((item) => item.key_name === 'long').value
            const company = item.event_data.find((item) => item.key_name === 'company_name').value
            const plasticCollected = 'Not Registered'
            const timestamp = getFormattedDate(item.timestamp)
            coords.push({
                lat: lat,
                long: long,
                company: company,
                plasticCollected: plasticCollected,
                timestamp: timestamp
            })
        }
    })
    for (const item of coords) {
        const info = await reverseGeoCoding(item)
        coordsInfo.push({
            info: info,
            company: item.company,
            plasticCollected: item.plasticCollected,
            timestamp: item.timestamp
        })
    }
    return coordsInfo
}

function getInfo(element, ids) {
    const keys = [
        'company_name',
        'weightInKg',
        'employee',
        'material',
        'kg_collected',
        'product_title'
    ]
    const values = {}
    if (element && element !== 0 && element.event_data) {
        element.event_data.map((keyFound) => {
            keys.map((key) => {
                if (keyFound.key_name === key && keyFound.key_name !== 'employee') {
                    values[('key', keyFound.key_name)] = keyFound.value
                }
            })
        })

        element.event_data.map((item) => {
            keys.map((key) => {
                if (key === item.key_name) {
                    values[('key', item.key_name)] = item.value
                } else if (!Object.keys(values).includes(item.key_name)) {
                    values[('key', item.key_name)] = 'Not Registered'
                }
            })
        })
    }
    return values
}

function transformData(dataset) {
    return dataset.map((data) => {
        return data.map((datum) => {
            return {
                x: datum.x,
                y: datum.y,
                cornerRadius: data[0].cornerRadius,
                step: data[0].step
            }
        })
    })
}

const getTotal = () => {
    let counter = 0
    MOCK_DATA.forEach((item) => {
        if (item.type.includes('collectPlastic')) {
            const datapoint = parseFloat(
                item.event_data.find((data) => data.key_name === 'kg_collected').value
            )
            counter = counter + datapoint
        }
    })
    return counter
}

const totalCollected = getTotal()

function getStackBarData(collected) {
    console.log("collected")
    console.log(collected)
    return [
        [
            {
                x: 'a',
                y: Math.round(collected),
                cornerRadius: { top: 5, bottom: 5 },
                step: collected + ' kg'
            }
        ],
    ]
}

export {
    getAllIds,
    getFormattedDate,
    getCollectedPlastic,
    getCoordsInfo,
    getInfo,
    reverseGeoCoding,
    getStackBarData,
    transformData,
    getTotal
}
