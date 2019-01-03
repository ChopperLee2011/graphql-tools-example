import axios from 'axios';

axios({
    url: 'http://localhost:4000',
    method: 'post',
    data: {
        query: `
            query {
                hello
            }
        `
    }
})
.then(result => {
    console.log('data', result.data);
    console.log('headers', result.headers);
})