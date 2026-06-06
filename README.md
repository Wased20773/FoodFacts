## Installs
run the following command in your terminal window:

`npm install`

## How to Run
There are two modes of the application:
- Live API Mode
  - This uses the Open Food Facts API
  - Some things to consider when running this mode:
    - The server to Open Food Facts may not become available to those with lower priority
    - <span style="color: red">15req/min/IP for GET: IP ban</span>
    - <span style="color: red">10req/min/IP for POST: IP ban</span>
      - Application does not use POST
  - **Run this mode with the following command:**
    - `npm run dev`

- Mock Data Mode
  - Uses a mock database with 12 row entires
  - Must use exact `product_name` to "search" for the products
  - **Run this mode with the following command:**
    - `npm run dev:mock`
  - Below are all the exact product names to use for dev:mock
    - `Nutella`
    - `Apple Slices`
    - `Peanut Butter`
    - `Oreo Cookies`
    - `Coca-Cola`
    - `Banana`
    - `Greek Yogurt`
    - `Protein Bar`
    - `Lay's Potato Chips`
    - `Whole Ultra Filtered Milk`
    - `Cheerios`
    - `Boneless Skinless Chicken Breast`
  - You can find the file in contents inside of:
    - [src/data/mockProducts.ts](./src/data/mockProducts.ts)
    - [src/data/mockDatabase.ts](./src/data/mockDatabase.ts)
