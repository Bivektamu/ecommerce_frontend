const getExcerpt = (text: String, max:number): String => {
    let arr = text.split(' ')
    arr.length = max
    
    let excerpt = ''
    arr.forEach((ele, i) => {
        i === arr.length -1 ? excerpt+=ele+'...':excerpt+=ele+' '
    });
    


    return excerpt
}

export default getExcerpt