# What's Cookin'?  

## Authors

- [Bobby Vasquez](https://github.com/hoomberto)
- [Jim Charnesky](https://github.com/BigBike96)

## Set Up

1. `fork` this repository and/or `clone` it to local
2. Once you have cloned the repo, change (cd) into the directory and install the project dependencies. Run `npm install` or `npm i` to install project dependencies.
3. Run `npm test` to see tests
4. Run `npm run lint` if you would like to see the linter
5. Run `npm start` and visit `localhost:8080`

## Overview of Use 

This app is designed for the home cook. At the top of the screen there is a greeting for the current user. There is a search bar and search button at the top of the screen where the user can search by name or ingredient. Near the search bar is a 'Search by tag' button. When clicked a dropdown menu of checkboxes will appear so the user can select tag words to seach by. A user can click 'View Favorites' to see the recipes that have been favorited (a recipe is favorited by clicking the heart icon on the card). When vieing favorites, a 'Remove Favorite' button can be clicked to un-favorite a recipe. All recipes are viewed by clicking 'View All'. A recipe card can be added to a list of recipes to cook, which can be viewd by clicking the 'Recipes to Cook' button. All cards can be viewed at the bottom of the screen. Each card has a  'More info' button which will display the ingredents needed, the estimated cost, and the cooking instructions.



## Technologies Used
1. JavaScript (es6)
2. css
3. html

## Possible Future iterations

Add a Pantry Feature
- Determine whether a user’s pantry has enough ingredients to cook a given meal.
- Determine the amount of missing ingredients still needed to cook a given meal, based on what’s in the user’s pantry.
- User should be able to view what ingredients exist inside of their pantry.
- User should be able to check list of recipes to cook and see if their pantry has enough ingredients to cook a meal.
- User should be told what ingredients are still needed if they don’t have enough ingredients in their pantry to cook the recipe.

## Design Choices

According to our research, the user groups most likley to cook at home are:
- Retiered/ Stay at home
- Parents cooking for family
- millennials

We designed mobile first to make it practial to use on a phone. The layout is top-to-bottom so the user doesn't need to scroll left to right. We selected a color pallet to give a warm, natural feel that should appeal to the healthy, at home feel of home cooking. We also made use of pop-ups and drop-downs so the user wouldn't need to change pages. The cards are large so they will be easy to see. The seach line will stay on the screen as the user scrolls down, so no matter where they are in the cards, a word search is available on screen. Colors are selected to draw the user's eyes to different points of intrest on the page.
