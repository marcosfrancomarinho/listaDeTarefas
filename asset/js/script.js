
const button = document.querySelectorAll("button")[0];
const clearAll = document.querySelectorAll("button")[2];
const change = document.querySelectorAll("button")[1];
const list = document.querySelectorAll(".container-tarefas")[0];
const enter = document.querySelector("#enter");
let value;

button.addEventListener("click", add);
const loop = setInterval(() => {
    action();
    clock();
}, 500);
function check() {
    if (enter.value.length <= 1) {
        return true;
    } else {
        return false;
    };
};
change.onclick = () => {
    setLocalStorage(`tasks${value}`, enter.value, 0,);
    location.reload();
};
clearAll.onclick = () => {
    localStorage.clear();
    location.reload();
};
function add() {
    if (check()) {
        alert("ERROR - CAMPO VAZIO");
    } else {
        create([enter.value]);
        setLocalStorage(`tasks${Number(localStorage.length)}`, enter.value, 0,);
        clear(enter);
    }
}
function setLocalStorage(key, enter, events) {
    localStorage.setItem(key, JSON.stringify([enter, events]));
};
function create(input) {
    if (input[0] == null) {
        structure("none", input);
    } else {
        structure("flex", input);
    };
};
function structure(mode, input) {
    const tasks = document.createElement("div");
    tasks.innerHTML = `${input[0]}
    <span class = "span-list-on"></span> 
    <span class = "span-list-off"></span>
    <span class = "span-list-edit"></span>`;
    tasks.setAttribute("class", "tasks");
    tasks.style.display = mode;
    list.appendChild(tasks);
};
function clear(enter) {
    enter.value = " ";
    enter.focus();
};
function key() {
    let key = Object.keys(localStorage);
    return key.sort();
};
function transform() {
    let arrayLocal = [];
    for (let indice of key()) {
        arrayLocal.push(JSON.parse(localStorage[indice]));
    };
    return arrayLocal;
}
window.onload = () => {
    let listArrayLocal = transform();
    if (localStorage.length > 0) {
        for (let index in listArrayLocal) {
            create(listArrayLocal[index]);
            if (listArrayLocal[index][1] == 1) {
                list.children[index].classList.add("done");
            };
        };
    };
};
function action() {
    let arrayEvent = transform();
    for (let i = 0; i < list.children.length; i++) {
        list.children[i].children[0].onclick = () => {
            if (list.children[i].classList.toggle("done")) {
                setLocalStorage(`tasks${i}`, arrayEvent[i][0], 1)
            } else {
                setLocalStorage(`tasks${i}`, arrayEvent[i][0], 0)
            };
        };
        list.children[i].children[1].onclick = () => {
            setLocalStorage(`tasks${i}`, null, null);
            list.children[i].style.display = "none";
        };
        list.children[i].children[2].onclick = () => {
            enter.focus();
            enter.value = arrayEvent[i][0];
            arrayEvent[i] = enter.value;
            change.style.display = "block"
            button.style.display = "none"
            value = i;
        };
    };
};
function clock() {
    const time = document.querySelector("#clock");
    let hours = new Date().getHours();
    let minutes = new Date().getMinutes();
    let seconds = new Date().getSeconds();
    hours = (hours < 10) ? `0${hours}` : hours;
    minutes = (minutes < 10) ? `0${minutes}` : minutes;
    seconds = (seconds < 10) ? `0${seconds}` : seconds;
    time.innerHTML = `${hours}:${minutes}:${seconds}`
}

