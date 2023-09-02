export default async function FetchData(url, callBackFunction) {
    await fetch(url)
        .then(response => {
            return response.json()
        })
        .then(data => {
            callBackFunction(data);
        })
}