const defaultOrder = ["e", "b", "c", "a", "d"]
const selectedOrders = [
    ["s", "c", "e", "a", "e"],
    ["c", "s", "a", "a", "b"],
    ["e", "a", "s", "a", "c"],
    ["a", "a", "a", "s", "a"],
    ["e", "b", "c", "a", "s"]
]

const ps = document.querySelectorAll('p')

ps.forEach((p, i) => {
    p.className = defaultOrder[i]
})

// on click shuffle paragraph ids
ps.forEach(para => {
    para.onclick = (elem) => {
        i = +elem.explicitOriginalTarget.id
        ps.forEach((p, j) => {
            p.className = selectedOrders[i][j]
        })
    }
})

// on escape reset paragraph ids
document.onkeydown = (e) => {
    if (e.key === "Escape")
        resetOrder()

}

// when click on body reset order
document.onclick = (e) => {
    if (e.explicitOriginalTarget.tagName != "P")
        resetOrder()
}

function resetOrder() {
    ps.forEach((p, i) => {
        p.className = defaultOrder[i]
    })
}

function shuffle(array) {
    let currentIndex = array.length, randomIndex

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]]
    }

    return array
}