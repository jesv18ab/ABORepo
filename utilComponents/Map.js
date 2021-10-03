import { StaticMap } from 'react-map-gl'
import DeckGL from '@deck.gl/react'
import { ScatterplotLayer, ArcLayer } from '@deck.gl/layers'
import getValueFromKey from '../utils/getValueFromKey'
import { PROCESSING_STEP, MAPBOX_TOKEN } from '../appConfig.js'
import MOCK_DATA from '../public/data/data'

const locations = MOCK_DATA.filter((obj) => obj.type.startsWith(PROCESSING_STEP)).map((step) => {
    return {
        coordinates: [
            parseFloat(getValueFromKey(step.event_data, 'long')),
            parseFloat(getValueFromKey(step.event_data, 'lat'))
        ],
        name: step.id,
        parents: step.parents
    }
})

function getArches() {
    const processingSteps = MOCK_DATA.filter((obj) => obj.type.startsWith(PROCESSING_STEP))
    const arches = []
    // idea, find parents for each processing step.
    // for each processing step that has parents
    for (let i = 0; i < processingSteps.length; i++) {
        if (processingSteps[i].parent_ids?.length > 0) {
            // for each of the processingStep's parents
            for (let j = 0; j < processingSteps[i].parent_ids?.length; j++) {
                // find the step whose id matches the parentID of the current step
                for (let k = 0; k < processingSteps.length; k++) {
                    if (processingSteps[k].id === processingSteps[i].parent_ids[j]) {
                        // if the k'th step's id matches the j'th parent of the i'th step,
                        // we can form the arch from the child's coordinates to the
                        // parent's coordinates
                        arches.push({
                            source_coords: [
                                parseFloat(getValueFromKey(processingSteps[i].event_data, 'long')),
                                parseFloat(getValueFromKey(processingSteps[i].event_data, 'lat'))
                            ],
                            target_coords: [
                                parseFloat(getValueFromKey(processingSteps[k].event_data, 'long')),
                                parseFloat(getValueFromKey(processingSteps[k].event_data, 'lat'))
                            ]
                        })
                    }
                }
            }
        }
    }
    return arches
}

function Map(props) {
    const arches = getArches()

    const layers = [
        // only needed when using shadows - a plane for shadows to drop on
        new ScatterplotLayer({
            data: locations,
            getFillColor: [41, 171, 135],
            getPosition: (d) => d.coordinates,
            id: 'target',
            lineWidthMinPixels: 100,
            opacity: 1,
            pickable: true,
            radiusScale: 200
        }),
        new ArcLayer({
            data: arches,
            // getSourceColor: [150, 150, 150, 80],
            getSourceColor: [0, 128, 155],
            getSourcePosition: (d) => d.source_coords,
            // getTargetColor: [0, 128, 155],
            getTargetColor: [150, 150, 150, 80],
            getTargetPosition: (d) => d.target_coords,
            getWidth: 2,
            id: 'arc-layer',
            pickable: false
        })
    ]

    return (
        <DeckGL
            initialViewState={props.viewState}
            //viewState={props.viewState}
            /*onViewStateChange={(e) => props.onSetViewState(e.viewState)}*/
            controller
            getTooltip={({ object }) => object && `${object.name}`}
            layers={layers}>
            <StaticMap
                mapStyle={'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'}
                mapboxApiAccessToken={MAPBOX_TOKEN}
            />
        </DeckGL>
    )
}

export default Map
