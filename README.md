# Food Facts Web App

This is a VUI (Voice User Interface) that assist users with food products. The app works like a VA where there are three intents and 15 utterances in each one. Through voice commands, the application detects which intent it belongs to and outputs the desired outcome for that intent. This app is meant to assist users choosing the right, and healthier, food product, and it can also serve as a nutrition app where the user can ask to compare two products to see which one is healthier.

## Technology Stack

- React + Vite
- TypeScript
- CSS3
- Web Speech API
- Axios
- Node.js
- Express

## Installs

if this is your first time, run the following commands in your terminal window:

```txt
git clone git@github.com:Wased20773/FoodFacts.git
cd .\FoodFacts\
npm install
```

If you've already cloned the repository, run the following commands in root to get the latest updates and install dependencies:

```txt
git pull origin main
npm install
```

## How to Run

Before running any commands, make sure you are in the root folder; `FoodFacts\`

There are two modes of the application:

- Live API Mode
  - This uses the Open Food Facts API
  - Some things to consider when running this mode:
    - The server to Open Food Facts may not become available to those with lower priority
      - **WARNING:** 15 req/min/IP for GET: IP ban
      - **WARNING:** 10 req/min/IP for POST: IP ban
        - Application does not use POST
  - **Run this mode with the following command:**
    - `npm run dev`
  - **You will also need to run the backend server, run the following command in a separate terminal window:**
    - `npm run server`

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
  - You can find the file contents inside of:
    - [src/data/mockProducts.ts](./src/data/mockProducts.ts)
    - [src/data/mockDatabase.ts](./src/data/mockDatabase.ts)

## Voice Commands

To view the full list of utterances, go to [src/utils/utterances.ts](./src/utils/utterances.ts)

- **searchFoodUtterances**
  - *"search for `<productName>`"*
  - *"look for `<productName>`"*
  - *"get information for `<productName>`"*
  - *"give me `<productName>`"*
- **productNutritionUtterances**
  - *"how much `<nutrient>` does `<productName>` have"*
  - *"what is the `<nutrient>` in `<productName>`"*
  - *"tell me how much `<nutrient>` is in `<productName>`"*
  - *"read the `<nutrient>` in `<productName>`"*
- **compareProductUtterances**
  - *"compare `<productName>` with `<secondProductName>`"*
  - *"what is the difference between `<productName>` and `<secondProductName>`"*
  - *"show me a comparison of `<productName>` and `<secondProductName>`"*
  - *"compare nutrition of `<productName>` and `<secondProductName>`"*
