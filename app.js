const PRIMARY_BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const FALLBACK_BASE_URL = "https://latest.currency-api.pages.dev/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const form = document.querySelector("#converter-form");
const convertBtn = document.querySelector(".convert");
const swapBtn = document.querySelector(".swap-btn");
const amountInput = document.querySelector("#amount");
const result = document.querySelector(".msg");
const fromCurr = document.querySelector('select[name="from"]');
const toCurr = document.querySelector('select[name="to"]');

for (const select of dropdowns) {
    for (const currCode of Object.keys(countryList)) {
        const option = document.createElement("option");
        option.textContent = currCode;
        option.value = currCode;
        select.append(option);
    }

    select.value = select.name === "from" ? "USD" : "PKR";
    updateFlag(select);

    select.addEventListener("change", (event) => {
        updateFlag(event.target);
    });
}

function updateFlag(selectElement) {
    const currencyCode = selectElement.value;
    const countryCode = countryList[currencyCode];
    const img = selectElement.parentElement.querySelector("img");

    if (countryCode && img) {
        img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
        img.alt = `${currencyCode} flag`;
    }
}

async function fetchRate(fromCode, toCode) {
    const urls = [
        `${PRIMARY_BASE_URL}/${fromCode}.min.json`,
        `${FALLBACK_BASE_URL}/${fromCode}.min.json`
    ];

    let lastError;

    for (const url of urls) {
        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }

            const data = await response.json();
            const rate = data[fromCode]?.[toCode];

            if (typeof rate !== "number") {
                throw new Error("Exchange rate is unavailable.");
            }

            return rate;
        } catch (error) {
            lastError = error;
        }
    }

    throw lastError || new Error("Could not retrieve exchange rate.");
}

async function convertCurrency() {
    const amount = Number(amountInput.value);

    if (!Number.isFinite(amount) || amount <= 0) {
        result.textContent = "Please enter an amount greater than 0.";
        amountInput.focus();
        return;
    }

    const fromCode = fromCurr.value.toLowerCase();
    const toCode = toCurr.value.toLowerCase();

    if (fromCode === toCode) {
        result.textContent = `${amount} ${fromCurr.value} = ${amount.toFixed(2)} ${toCurr.value}`;
        return;
    }

    convertBtn.disabled = true;
    convertBtn.textContent = "Converting...";
    result.textContent = "Loading exchange rate...";

    try {
        const rate = await fetchRate(fromCode, toCode);
        const convertedAmount = amount * rate;

        result.textContent = `${amount} ${fromCurr.value} = ${convertedAmount.toFixed(2)} ${toCurr.value}`;
    } catch (error) {
        result.textContent = "Could not load the exchange rate. Please try again.";
        console.error(error);
    } finally {
        convertBtn.disabled = false;
        convertBtn.textContent = "Convert";
    }
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    convertCurrency();
});

swapBtn.addEventListener("click", () => {
    const previousFrom = fromCurr.value;
    fromCurr.value = toCurr.value;
    toCurr.value = previousFrom;

    updateFlag(fromCurr);
    updateFlag(toCurr);

    if (amountInput.value) {
        convertCurrency();
    }
});
