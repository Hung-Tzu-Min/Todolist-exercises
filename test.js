const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];
let result3 = [];
for (let i = 0; words.length > i; i++) {
    const word = words[i]
    if (word.length > 6) {
        result3.push(word);
    }

}

const result = words.filter(word => word.length > 6);
const result2 = words.filter(function (item) {
    return startDate > item && item < endDate && item.indexOf(keyword) > -1
})


