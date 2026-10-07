const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const amountInput = document.querySelector(".amount input");
const result = document.querySelector(".msg");
const fromCurr = document.querySelector('select[name="from"]');
const toCurr = document.querySelector('select[name="to"]');

for (const select of dropdowns) {
    for (const currCode of Object.keys(countryList)) {
        const newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        select.append(newOption);
    }

    select.value = select.name === "from" ? "USD" : "PKR";

    select.addEventListener("change", (e) => {
        updateFlag(e.target);
    });
}



const updateFlag = (element) => {
    let currCode = element.value;
    const countryCode = countryList[currCode];
    const imgTag = element.parentElement.querySelector("img");

    if (countryCode && imgTag) {
        imgTag.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
    }
};

btn.addEventListener("click", async (e) => {
    e.preventDefault();

    let amtVal = Number(amountInput.value);
    if (!Number.isFinite(amtVal) || amtVal < 1) {
        amtVal = 1;
        amountInput.value = "1";
    }

    const fromCode = fromCurr.value.toLowerCase();
    const toCode = toCurr.value.toLowerCase();
    const url = `${BASE_URL}/${fromCode}.json`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Unable to retrieve exchange rates.");
        }

        const data = await response.json();
        const rate = data[fromCode]?.[toCode];

        if (typeof rate !== "number") {
            throw new Error("Exchange rate is unavailable.");
        }

        const finalAmt = (amtVal * rate).toFixed(2);
        result.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
    } catch (error) {
        result.innerText = "Could not load the exchange rate. Try again.";
        console.error(error);
    }
});