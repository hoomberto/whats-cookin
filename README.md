# What's Cookin'?  

## Table of Contents
* [Authors](#Authors)
* [Setup](#Set-up)
* [Overview of Use](#Overview-of-use)
* [Wins and Challenges](#Wins-and-Challenges)
* [Technologies Used](#Technologies-Used)
* [Possible Future Iterations](#Possible-Future-Iterations)
* [Design Choices](#Design-Choices)
## Authors

- [Bobby Vasquez](https://github.com/hoomberto)
- [Jim Charnesky](https://github.com/BigBike96)

## Set Up

1. `fork` this repository and/or `clone` it to local
2. Once you have cloned the repo, change (cd) into the directory and install the project dependencies. Run `npm install` or `npm i` to install project dependencies.
3. Run `npm test` to see tests
4. Run `npm run lint` if you would like to see the linter
5. Run `npm start` and visit `localhost:8080`
6. Run `npm start` with Whats Cookin API Starter Kit

## Overview of Use 

This app is designed for the home cook.

- At the top of the screen there is a greeting for the current user. 
- There is a search bar and search button at the top of the screen where the user can search by name or ingredient.
 
![cookin2giphy1](https://user-images.githubusercontent.com/60282216/119583269-75397f80-bd83-11eb-90e8-357e7dcd9279.gif)


- Near the search bar is a 'Search by tag' button. When clicked a dropdown menu of checkboxes will appear so the user can select search tag words.
 
![giphy2cooking5](https://user-images.githubusercontent.com/60282216/119583261-71a5f880-bd83-11eb-91de-b19ab5f034a0.gif)


- A user can click 'View Favorites' to see the recipes that have been favorited (a recipe is favorited by clicking the heart icon on the card). 

![cooking2giphy2](https://user-images.githubusercontent.com/60282216/119583267-74a0e900-bd83-11eb-9e83-45e0f8bb0a94.gif)


- When vieing favorites, a 'Remove Favorite' button can be clicked to un-favorite a recipe. 
- All recipes are viewed by clicking 'View All'. 
- A recipe card can be added to a list of recipes to cook, which can be viewd by clicking the 'Recipes to Cook' button.

![giphy2cooking3](https://user-images.githubusercontent.com/60282216/119583266-74085280-bd83-11eb-9ee8-66672d080ff3.gif)


- All cards can be viewed at the bottom of the screen. 
- Each card has a 'More info' button which will display the ingredents needed, the estimated cost, and the cooking instructions.

![giphy2cooking4](https://user-images.githubusercontent.com/60282216/119583265-736fbc00-bd83-11eb-846e-512cc5ae2b43.gif)

## Wins and Challenges

Wins: 
> - Managed to get a polished and complete MVP<br>
> - Overcame a challenge pertaining to representation of certain aspects of data<br>
> - Created this site with previous research in mind, which helped contribute to our wireframing<br>
> - Jim's immune system overcame any and all challenges presented by his second vaccine dose<br>
> - Attained a much better understanding of Fetch API throughout duration of project<br>

Challenges:
> - Obstacle pertaining to representation of certain aspects of data made us annoyed - namely, the absurd final pricing of ingredients (looking at you, Ultimate Chocolate Chip Pumpkin Cookies for $3700)<br>
> - Spent a great deal of time trying to solve a bug with our favorite button where it wouldn't fire off and push the data correctly - as it turns out, nesting icons inside of buttons is tricky<br>


## Technologies Used
1. JavaScript (ES6)
2. CSS
3. HTML
4. Mocha
5. Chai
6. Webpack

## Possible Future Iterations

Add a Pantry Feature
- Determine whether a user’s pantry has enough ingredients to cook a given meal.
- Determine the amount of missing ingredients still needed to cook a given meal, based on what’s in the user’s pantry.
- User should be able to view what ingredients exist inside of their pantry.
- User should be able to check list of recipes to cook and see if their pantry has enough ingredients to cook a meal.
- User should be told what ingredients are still needed if they don’t have enough ingredients in their pantry to cook the recipe.

## Design Choices

According to our research, the user groups most likley to cook at home are:
- Retired/ Stay at home
- Full-time workers
- Parents cooking for family
- Millennials

We designed mobile first to make it practial to use on a phone. The layout is top-to-bottom so the user doesn't need to scroll left to right. We selected a color pallet to give a warm, natural feel that should appeal to the healthy, at home feel of home cooking. We also made use of pop-ups and drop-downs so the user wouldn't need to change pages. The cards are large so they will be easy to see. The seach line will stay on the screen as the user scrolls down, so no matter where they are in the cards, a word search is available on screen. Colors are selected to draw the user's eyes to different points of intrest on the page.
