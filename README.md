# Demoblaze with Playwright

The reposiroty contains framework for testing Demablaze online shope with Playwright. This project showcases a couple of specs for Login and Purchase features.

## 🗂 Project Structure
- **`model/`**: Contains iterfaces and enum for data type.
- **`pages/`**: Contains all Page Object Models (POM).
- **`tests/`**: Contains all test scenarios.
- **`util/`**: Contains utility functions and products.json.

## ⚙️ Setup

To get started with the project, follow these steps:

1. **Clone or download the project**:
    ```sh
    git clone https://github.com/your-username/playwright-demoblaze.git
    ```

2. **Extract and open the project**:
    ```sh
    cd Demoblaze
    code .
    ```

3. **Install the dependencies**:
    ```sh
    npm install
    ```

4. **Install the browsers for Playwright**:
    ```sh
    npx playwright install
    ```
5. **Set env variables in your secrets**:
    ```sh
    set USER_NAME="" 
    set PASSWORD=""  
    ```

6. **Run the tests**:
    ```sh
    npm run test:chrome
    ```
    or

    ```sh
    npm run test:firefox
    ```
    or

    ```sh
    npm run test:edge
    ```

## 📁 Project Structure

```
Demoblaze/src/
├── model/
│   └── ...          # Iterfaces, enum
├── pages/
│   └── ...          # All Page Object Models
├── tests/
│   └── ...          # All test scenarios
├── util/
│   └── parseProducts.js  # Utility function to parse products from products.json to object
│   └── purchaseDataGenerator.ts # Utility function to generate purchase data 
├── package.json     # Project dependencies and scripts
├── playwright.config.js  # Playwright configuration
└── README.md        # Project documentation
```