const MOCK_DATA = [
    {
        id: '1-store-torv-aarhus',
        company_id: 'RBA',
        product_id: 'reused-plastic',
        type: 'value-chain-checkpoint-collectPlastic',
        brand: '',
        created_by: '?@RenByAarhus.dk',
        timestamp: '2021-09-06T00:00:00Z',
        parent_ids: [],
        event_data_format: 'company-coords',
        event_data: [
            {
                key_name: 'company_name',
                value: 'Ren By Aarhus',
                storage: 'internal',
                type: 'plain',
                visibility: 'public'
            },
            {
                key_name: 'lat',
                value: '56.15714314455529',
                storage: 'internal',
                type: 'number',
                visibility: 'public'
            },
            {
                key_name: 'long',
                value: '10.208955856031434',
                storage: 'internal',
                type: 'number',
                visibility: 'public'
            },
            {
                key_name: 'kg_collected',
                value: '219',
                storage: 'internal',
                type: 'number',
                visibility: 'public'
            },
            {
                key_name: 'material',
                value: 'plastic',
                storage: 'internal',
                type: 'number',
                visibility: 'public'
            },
            {
                key_name: 'employee',
                value: 'Jacob',
                storage: 'internal',
                type: 'number',
                visibility: 'public'
            }
        ]
    },
    {
        id: '2-moelleparken-aarhus',
        company_id: 'RBA',
        product_id: 'reused-plastic',
        type: 'value-chain-checkpoint-collectPlastic',
        brand: '',
        created_by: '?@RenByAarhus.dk',
        timestamp: '2021-07-24T00:00:00Z',
        parent_ids: [],
        event_data_format: 'company-coords',
        event_data: [
            {
                key_name: 'company_name',
                value: 'Ren By Aarhus',
                storage: 'internal',
                type: 'plain',
                visibility: 'public'
            },
            {
                key_name: 'lat',
                value: '56.156046',
                storage: 'internal',
                type: 'number',
                visibility: 'public'
            },
            {
                key_name: 'long',
                value: '10.200432',
                storage: 'internal',
                type: 'number',
                visibility: 'public'
            },
            {
                key_name: 'kg_collected',
                value: '174',
                storage: 'internal',
                type: 'number',
                visibility: 'public'
            },
            {
                key_name: 'material',
                value: 'plastic',
                storage: 'internal',
                type: 'number',
                visibility: 'public'
            },
            {
                key_name: 'employee',
                value: 'Jacob',
                storage: 'internal',
                type: 'number',
                visibility: 'public'
            }
        ]
    },
    {
        id: '3-tangkrogen-aarhus',
        company_id: 'RBA-aadalen-efterskole',
        product_id: 'reused-plastic',
        type: 'value-chain-checkpoint-collectPlastic',
        brand: '',
        created_by: '?@RenByAarhus.dk',
        timestamp: '2021-06-10T00:00:00Z',
        parent_ids: [],
        event_data_format: 'company-coords',
        event_data: [
            {
                key_name: 'company_name',
                value: 'Ren By Aarhus, Aadalen Efterskole ',
                storage: 'internal',
                type: 'plain',
                visibility: 'public'
            },
            {
                key_name: 'lat',
                value: '56.138805',
                storage: 'internal',
                type: 'number',
                visibility: 'public'
            },
            {
                key_name: 'long',
                value: '10.209054',
                storage: 'internal',
                type: 'number',
                visibility: 'public'
            },
            {
                key_name: 'kg_collected',
                value: '166.4',
                storage: 'internal',
                type: 'number',
                visibility: 'public'
            },
            {
                key_name: 'material',
                value: 'plastic',
                storage: 'internal',
                type: 'number',
                visibility: 'public'
            },
            {
                key_name: 'employee',
                value: 'Jacob',
                storage: 'internal',
                type: 'number',
                visibility: 'public'
            }
        ]
    },
    {
        id: '4-a-better-ocean-aarhus',
        company_id: 'ABO',
        product_id: 'reused-plastic-mold',
        type: 'value-chain-checkpoint-reuse',
        brand: '',
        created_by: '?@aBetterOcean.dk',
        timestamp: '2021-10-10T00:00:00Z',
        parent_ids: ['2-moelleparken-aarhus', '3-tangkrogen-aarhus', '1-store-torv-aarhus'],
        event_data_format: 'company-coords',
        event_data: [
            {
                key_name: 'company_name',
                value: 'A better ocean',
                storage: 'internal',
                type: 'plain',
                visibility: 'public'
            },
            {
                key_name: 'lat',
                value: '56.11973928002243',
                storage: 'internal',
                type: 'number',
                visibility: 'public'
            },
            {
                key_name: 'long',
                value: '10.158599240688512',
                storage: 'internal',
                type: 'number',
                visibility: 'public'
            },
            {
                key_name: 'employee',
                value: 'Not Registered',
                storage: 'internal',
                type: 'number',
                visibility: 'public'
            }
        ]
    },
    {
        id: '5-product-1',
        company_id: 'wdw',
        product_id: 'Scoreboard Horizontal, Bamboo (2030602)',
        type: 'value-chain-checkpoint-partner',
        brand: 'Wardrobe',
        created_by: '?@wedowood.dk',
        timestamp: '2021-01-05T00:00:00Z',
        parent_ids: ['4-a-better-ocean-aarhus'],
        event_data_format: 'company-coords',
        event_data: [
            {
                key_name: 'company_name',
                value: 'Plazzo',
                storage: 'internal',
                type: 'plain',
                visibility: 'public'
            },
            {
                key_name: 'lat',
                value: '56.10504295346499',
                storage: 'internal',
                type: 'number',
                visibility: 'public'
            },
            {
                key_name: 'long',
                value: '10.090552648782655',
                storage: 'internal',
                type: 'number',
                visibility: 'public'
            },
            {
                key_name: 'weightInKg',
                value: 1920,
                storage: 'internal',
                type: 'number',
                visibility: 'public'
            }
        ]
    }
]

export default MOCK_DATA
