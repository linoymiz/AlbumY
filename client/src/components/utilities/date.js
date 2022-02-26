const Today = new Date()

export function getDate(){
    return Today.toLocaleDateString('en-US')
}

export function getCurrentYear(){
    return Today.getFullYear()
}