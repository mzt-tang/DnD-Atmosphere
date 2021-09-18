import Typesense from 'typesense';

let client = new Typesense.Client({
    'nodes': [{
        'host': 'xxx.a1.typesense.net', // where xxx is the ClusterID of your Typesense Cloud cluster
        'port': '443',
        'protocol': 'https'
    }],
    'apiKey': '<ADMIN_API_KEY>',
    'connectionTimeoutSeconds': 2
})
