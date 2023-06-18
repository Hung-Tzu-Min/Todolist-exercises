var searchButton = document.getElementById('searchButton');
var cancelSearchButton = document.getElementById('cancelSearchButton');
var searchInputBox = document.getElementById('searchInputBox');
var searchInputBoxDateStart = document.getElementById('searchInputBoxDateStart');
var searchInputBoxDateEnd = document.getElementById('searchInputBoxDateEnd');

var addButton = document.getElementById('addButton');
var saveButton = document.getElementById('saveButton');


var date = document.getElementById('date');
var transportation = document.getElementById('transportation');
var directions = document.getElementById('directions');
var amount = document.getElementById('amount');

var form = document.getElementById('form');
var data = [];

var saveId = 0;

var addJudge = 0;
var searchJudge = 0;

addButton.addEventListener('click', function () {
    addJudge = 1;
    searchJudge = 0;
    if (date.value != '' && transportation.value != '' && directions.value != '' && amount.value != '') {
        form.innerHTML = '';

        var list = {
            id: data.length,
            date: date.value,
            transportation: transportation.value,
            directions: directions.value,
            amount: amount.value
        }
        data.push(list);
        testPageButton();
        //showPageButton();
        changePage(1);
    } else {
        foolProof();
    }
})
saveButton.addEventListener('click', function () {
    form.innerHTML = '';
    saveButton.style.display = "none";
    addButton.disabled = false;

    for (var s = 0; s < data.length; s++) {
        if (saveId === data[s].id) {
            var list = {
                id: saveId,       //這邊要給按下「編輯」那一刻，所抓到的值，不然會找不到，所以用saveId
                date: date.value,
                transportation: transportation.value,
                directions: directions.value,
                amount: amount.value
            }
            data.splice(s, 1, list);
        }
    }
    showTable();
    testPageButton();
    changePage(1);

})
searchButton.addEventListener('click', function () {
    addJudge = 0;
    searchJudge = 1;
    if (searchInputBoxDateStart.value > searchInputBoxDateEnd.value) {
        alert("起始時間不能大於結束時間");
    }
    else {
        cancelSearchButton.style.display = '';
        form.innerHTML = '';
        if (searchInputBoxDateStart.value != '' && searchInputBoxDateEnd.value != '' && searchInputBox.value === '') {
            timeSearch();
        }
        if (searchInputBoxDateStart.value === '' && searchInputBoxDateEnd.value === '' && searchInputBox.value != '') {
            directionsSearch();
        }
        if (searchInputBoxDateStart.value != '' && searchInputBoxDateEnd.value != '' && searchInputBox.value != '') {
            timeSearch();
            newDirectionsSearch();
        }
        testPageButton();
        //showSearchPageButton();
        searchChangePage(1);
    }
})

function showTable() {
    var sum = 0;
    for (var i = 0; i < data.length; i++) {
        sum += Number(data[i].amount);
    }
    form.innerHTML += `<tr>
    <td>總和</td>
    <td></td>
    <td></td>
    <td>${sum}</td>
    </tr>`

    date.value = '';
    transportation.value = '';
    directions.value = '';
    amount.value = '';
}

function deleteButton(forDeletionId) {
    form.innerHTML = '';

    for (var k = 0; k < data.length; k++) {
        if (forDeletionId === data[k].id) {
            data.splice(k, 1);
        }
    }
    showTable();
    testPageButton();
    changePage(1);
}

function editButton(showId) {
    saveButton.style.display = "";
    addButton.disabled = true;
    saveId = showId;
    for (var k = 0; k < data.length; k++) {
        if (showId === data[k].id) {
            date.value = data[k].date;
            transportation.value = data[k].transportation;
            directions.value = data[k].directions;
            amount.value = data[k].amount;
        }
    }
}
var searchData = [];
//var searchDateData = [];
function directionsSearch() {//method
    //let a = 0;       //在尚未加入換頁功能時有用到
    searchData = [];

    for (var srch = 0; srch < data.length; srch++) {
        if (data[srch].directions.indexOf(searchInputBox.value) > -1) {
            searchData.push(data[srch]);    //
            //a = a + 1;  //在尚未加入換頁功能時有用到,用來計算有找到幾筆資料
        }
    }
}

function testPageButton() {
    var btnNum = Math.ceil(data.length / 3);
    var searchBtnNum = Math.ceil(searchData.length / 3);
    var str = '';
    var sum = 0;
    if (addJudge === 1) {
        for (var p = 0; p < btnNum; p++) {
            str += `<input  type="button" value="${p + 1}" onclick="changePage(${p + 1})">`
        }
    }
    if (searchJudge === 1) {
        for (var sp = 0; sp < searchBtnNum; sp++) {
            str += `<input  type="button" value="${sp + 1}" onclick="searchChangePage(${sp + 1})">`

        }
        for (var i = 0; i < searchData.length; i++) {
            sum += Number(searchData[i].amount);
        }
        form.innerHTML += `<tr>
            <td>總和</td>
            <td></td>
            <td></td>
            <td>${sum}</td>
            </tr>`
        form.innerHTML += `<tr>
            <td colspan="4" align="right">共找到 ${searchData.length} 筆資料</td>
           </tr>`
    }
    form.innerHTML += `<tr>
    <td colspan="4">
    ${str}
    </td>
    </tr>`
    console.log(str);
}

// function showSearchPageButton() {
//     //let a = 0;
//     var searchBtnNum = Math.ceil(searchData.length / 3);
//     var str = '';
//     for (var sp = 0; sp < searchBtnNum; sp++) {
//         str += `<input  type="button" value="${sp + 1}" onclick="searchChangePage(${sp + 1})">`
//     }
//     // for (var i = 0; i < searchData.length; i++) {
//     //     a = a + 1;
//     // }
//     form.innerHTML += `<tr>
//     <td colspan="4" align="right">共找到 ${searchData.length} 筆資料</td>
//    </tr>`
//     form.innerHTML += `<tr>
//     <td colspan="4">
//     ${str}
//     </td>
//     </tr>`
// }
function changePage(pageNum) {
    form.innerHTML = '';
    var sum = 0;
    var items = 3;
    var pageIndexStart = (pageNum - 1) * items
    var pageIndexEnd = pageNum * items

    for (var i = pageIndexStart; i < pageIndexEnd; i++) {
        if (i >= data.length) {
            break;
        }
        form.innerHTML +=
            `<tr>
    <td>${data[i].date}</td>
    <td>${data[i].transportation}</td>
    <td>${data[i].directions}</td>
    <td>${data[i].amount}</td>
    <td><input id="deleteButton" type="button" onclick="deleteButton(${data[i].id})" value="刪除"></td>
    <td><input id="editButton" type="button" onclick="editButton(${data[i].id})" value="編輯"></td>
    </tr> `

    }
    showTable();
    testPageButton();
}
function searchChangePage(searchpageNum) {
    form.innerHTML = '';
    var sum = 0;
    var pageSize = 3;
    var pageIndexStart = (searchpageNum - 1) * pageSize
    var pageIndexEnd = searchpageNum * pageSize

    for (var i = pageIndexStart; i < pageIndexEnd; i++) {
        if (i >= searchData.length) {
            break;
        }
        form.innerHTML +=
            `<tr>
    <td>${searchData[i].date}</td>
    <td>${searchData[i].transportation}</td>
    <td>${searchData[i].directions}</td>
    <td>${searchData[i].amount}</td>
    </tr> `

    }


    testPageButton();
}
//showPageButton()可以跟showSearchPageButton()合併
// function showPageButton() {
//     var btnNum = Math.ceil(data.length / 3);
//     var str = '';
//     for (var p = 0; p < btnNum; p++) {
//         str += `<input  type="button" value="${p + 1}" onclick="changePage(${p + 1})">`
//     }

//     form.innerHTML += `<tr>  
//     <td colspan="4">
//     ${str}
//     </td>
//     </tr>`

// }


var searchTimeData = [];
function timeSearch() {  //應該更名為多條件查詢
    searchData = [];
    searchTimeData = [];
    const newDateData = data.filter(timeJudgment);
    function timeJudgment(ts) {
        return ts.date >= searchInputBoxDateStart.value && ts.date <= searchInputBoxDateEnd.value;
    }
    if (searchInputBoxDateStart.value != '' && searchInputBoxDateEnd.value != '' && searchInputBox.value === '') {
        for (var i = 0; i < newDateData.length; i++) {
            searchData.push(newDateData[i]);
        }
    }
    if (searchInputBoxDateStart.value != '' && searchInputBoxDateEnd.value != '' && searchInputBox.value != '') {
        for (var i = 0; i < newDateData.length; i++) {
            searchTimeData.push(newDateData[i]);  //為了能將newDateData這個陣列，傳入showSearchPageButton()
        }
    }
    console.log(searchData);
}

function newDirectionsSearch() {
    searchData = [];
    const newDirectionsData = searchTimeData.filter(wordJudgment);
    function wordJudgment(ts) {
        return ts.directions.indexOf(searchInputBox.value) > -1;
        //如果直接寫tq.directions = searchInputBox.value，反而會變成編輯功能，在「searchInputBox」輸入的值，會直接修改掉directions原本的值
    }
    for (var i = 0; i < newDirectionsData.length; i++) {
        searchData.push(newDirectionsData[i]);  //為了能將newDateData這個陣列，傳入showSearchPageButton()
    }
}

cancelSearchButton.addEventListener('click', function () {
    cancelSearchButton.style.display = 'none';
    form.innerHTML = '';
    searchInputBox.value = '';
    addJudge = 1;
    searchJudge = 0;
    searchInputBoxDateStart.value = '';
    searchInputBoxDateEnd.value = '';

    showTable();
    testPageButton();
    //showPageButton();
    changePage(1);
})


//以下為防呆
function foolProof() {
    var message = '';
    var sum = '';

    if (date.value === message) {
        sum += "請輸入日期\n";
    }
    if (transportation.value === message) {
        sum += "請輸入交通工具\n";
    }
    if (directions.value === message) {
        sum += "請說明行程內容\n";
    }
    if (amount.value === message) {
        sum += "請輸入花費\n";
    }
    alert(sum); //判斷完所有東西，在一次跳alert
}








