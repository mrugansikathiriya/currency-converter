const base_url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const drop = document.querySelectorAll(".drop1 select");
const btn = document.querySelector("button");
const from = document.querySelector(".from select");
const to = document.querySelector(".to select");
const msg = document.querySelector(".msg");
// for (let code in clist) {
//     console.log(code, clist[code]);
// }
for (let select of drop) {
    for (let code in clist) {
        let newopt = document.createElement("option");
        newopt.innerText = code;
        newopt.value = code;
        if (select.name === "from" && code === "USD") {
            newopt.selected = "selected";
        }
        if (select.name === "to" && code === "INR") {
            newopt.selected = "selected";
        }
        select.append(newopt);
    }
    select.addEventListener("change", (evt) => {
        updateflag(evt.target);
    })
}
const updateflag = (element) => {
    // console.log(element);
    let code = element.value;
    let countcode = clist[code];
    let newsrc = `https://flagsapi.com/${countcode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
};

const updateRate = async () => {
    let amt = document.querySelector(".amount input");
    let amtval = amt.value;
    //console.log(amtval);
    if (amtval === "" || amtval < 1) {
        amtval = 1;
        amt.value = "1";
    }
    // console.log(from.value, to.value);
    const url = `${base_url}/${from.value.toLowerCase()}.json`;
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    let rate = data[from.value.toLowerCase()][to.value.toLowerCase()];
    msg.innerText = `${amtval} ${from.value} = ${amtval * rate} ${to.value}`;
}

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    updateRate();

})
window.addEventListener("load", () => {
    updateRate();
})
