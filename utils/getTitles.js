import { MAP_SLIDER_TITLES, PROCESSING_STEP } from '../appConfig'

export default function getTitles() {
    const newTitles = {}
    for (const [key, value] of Object.entries(MAP_SLIDER_TITLES)) {
        newTitles[`${PROCESSING_STEP}-${key}`] = value
    }
    return newTitles
}
