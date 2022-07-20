async function fetchData(route, data = {}, methodType) {
    var options = {
        method: methodType,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    if (methodType === 'GET') {
        delete options['headers'];
        delete options['body'];
    }
    var response = await fetch(`http://localhost:3999/${route}`, options);
    var res = await response.json();
    return res;
}

export default fetchData;