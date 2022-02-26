// import React from 'react'
export default function sendDataToServer(data, url){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };
    fetch(url, requestOptions)
        .then(response => response.json())
        // .then(data => this.setState({ postId: data.id }));
}