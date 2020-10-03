export const postRequest = async (body) => {
    const response = await fetch('/message', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    const responseJson = await response.json();

    console.log(responseJson);

    return responseJson;
};
