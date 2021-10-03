export default function getValueFromKey(events, key) {
    let value = null
    let i
    for (i = 0; i < events.length; i++) {
        if (events[i].key_name === key) {
            value = events[i].value
        }
    }
    return value
}
