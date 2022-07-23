
let get = async (url, token) => {
    try {
        let request = await fetch(
            `${process.env.REACT_APP_APIURL}${url}`,
            {
                method: 'GET',
                headers: {
                    "authorization": token
                }
            }
        )


        if (request.status === 404)
            return {
                status: 404,
                message: "not found"
            };

        return await request.json()
    } catch (err) {
        return {
            success: false,
            errorName: "something went wrong"
        }
    }
}


let put = async (url, token, body) => {
    try {
        let request = await fetch(`${process.env.REACT_APP_APIURL}${url}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                "authorization": token
            },
            body: JSON.stringify(body)
        });
        return await request.json()
    } catch (error) {

        return {
            success: false,
            errorName: "something went wrong"
        }
    }
}

let post = async (url, token, body) => {
    try {
        let request = await fetch(`${process.env.REACT_APP_APIURL}${url}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "authorization": token
            },
            body: JSON.stringify(body)
        });

        return await request.json()
    } catch (error) {
        return {
            success: false,
            errorName: "something went wrong"
        }
    }
}


let module = { get, put, post }

export default module;