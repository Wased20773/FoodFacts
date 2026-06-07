// SearchFoodIntent
// slot 1: productName
export const searchFoodUtterances = [
  /search for (.+)/,
  /search (.+)/,
  /find (.+)/,
  /find me (.+)/,
  /look up (.+)/,
  /look for (.+)/,
  /show me (.+)/,
  /show me the product (.+)/,
  /get information for (.+)/,
  /get details for (.+)/,
  /tell me about (.+)/,
  /what is the product (.+)/,
  /open (.+)/,
  /give me (.+)/,
  /pull up (.+)/,
];

// ProductNutritionIntent
// slot 1: nutrient
// slot 2: productName
export const productNutritionUtterances = [
  /how much (.+) does (.+) have/,
  /how many (.+) does (.+) have/,
  /how much (.+) is in (.+)/,
  /how many (.+) are in (.+)/,
  /what is the (.+) in (.+)/,
  /what are the (.+) in (.+)/,
  /tell me the (.+) in (.+)/,
  /tell me how much (.+) is in (.+)/,
  /show the (.+) for (.+)/,
  /give me the (.+) for (.+)/,
  /check the (.+) in (.+)/,
  /display the (.+) in (.+)/,
  /read the (.+) in (.+)/,
  /what is the amount of (.+) in (.+)/,
  /tell me about the (.+) in (.+)/,
];

// CompareProductsIntent
// slot 1: productName
// slot 2: secondProductName
export const compareProductUtterances = [
  /compare (.+) and (.+)/,
  /compare (.+) with (.+)/,
  /compare (.+) vs (.+)/,
  /compare (.+) versus (.+)/,
  /(.+) vs (.+)/,
  /(.+) versus (.+)/,
  /(.+) compared to (.+)/,
  /what is the difference between (.+) and (.+)/,
  /what's the difference between (.+) and (.+)/,
  /compare the product (.+) with (.+)/,
  /show me a comparison of (.+) and (.+)/,
  /give me a comparison of (.+) and (.+)/,
  /compare nutrition of (.+) and (.+)/,
  /which is healthier (.+) or (.+)/,
  /what is healthier (.+) or (.+)/,
];