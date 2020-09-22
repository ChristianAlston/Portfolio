let count = (string, letter) => {
    let output = [];
    for (let i = 0; i <= string.length; i++) {
        if (letter === string[i]) {
            output.push(string[i])
        }
    }
    return output.length;
}

console.log(count('upper', 'p'))

document.getElementById('burger').addEventListener('click', () => {
    document.getElementById('nav').style.width = "100%";
})

document.getElementById('nav').addEventListener('click', () => {
    document.getElementById('nav').style.width = "0%";
})