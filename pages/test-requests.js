import axios from 'axios'
function TestRequest() {
    async function handleClick() {
        // const { data } = await axios.get(
        //     'http://dev.blockchainbusiness.dk/v2/data/c8398284-31e1-45e4-8c9b-61dbaabf739f'
        // )

        const block = {
            company_id: 'test',
            product_id: 'test',
            type: 'string',
            brand: 'string',
            created_by: 'hs.digi@cbs.dk',
            event_data_format: 'test-test',
            event_data: [
                {
                    key_name: 'test_key',
                    value: 'test',
                    storage: 'internal',
                    type: 'plain'
                }
            ]
        }
        const { data } = await axios.post('http://dev.blockchainbusiness.dk/v2/data', block)
        console.log(data)
    }
    return (
        <main>
            <h1>Test Request</h1>
            <button onClick={handleClick}>Send Data</button>
        </main>
    )
}
export default TestRequest
