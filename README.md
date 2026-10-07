# Currency Converter

A simple, responsive currency converter built with **HTML, CSS, and JavaScript**. It uses live exchange-rate data to convert values between currencies.

## 🌐 Live Demo

[Open the Currency Converter](https://codextalha.github.io/Currency-Converter/)

## Features

- Live currency conversion
- USD to PKR selected by default
- Swap currencies with one click
- Country flags for supported currencies
- Input validation
- Loading and error states
- Responsive mobile layout
- No framework or build tools required

## Built With

- HTML5
- CSS3
- JavaScript
- Font Awesome
- [Currency API by Fawaz Ahmed](https://github.com/fawazahmed0/exchange-api)
- [FlagsAPI](https://flagsapi.com/)

## How It Works

1. Enter an amount.
2. Choose the source currency.
3. Choose the target currency.
4. Press **Convert**.

The application requests the latest available exchange rate and calculates the converted amount in the browser.

## Run Locally

Clone the repository:

```bash
git clone https://github.com/CodexTalha/Currency-Converter.git
```

Open the project folder and launch `index.html` in your browser, or use the VS Code Live Server extension.

## Project Structure

```text
Currency-Converter/
├── index.html
├── style.css
├── app.js
├── codes.js
└── README.md
```

## What I Practiced

This project helped me practice:

- DOM manipulation
- Event listeners
- Working with `fetch()` and APIs
- `async/await`
- Form handling and validation
- Error handling with `try...catch`
- Updating UI elements dynamically
- Responsive CSS

## Future Improvements

- Add a searchable currency selector
- Show the exchange rate separately
- Remember the last selected currencies
- Add a conversion history

## Author

**Talha Khan**

- GitHub: [@CodexTalha](https://github.com/CodexTalha)
