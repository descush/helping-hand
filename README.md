<!-- helping-hand created by
1. Desiree
2. Justin
3. Jeremy
4. Shelby -->

# Helping Hand :wave:

![GitHub contributors](https://img.shields.io/github/contributors/descush/helping-hand) ![GitHub last commit](https://img.shields.io/github/last-commit/descush/helping-hand)

A web app created by [Desiree](https://github.com/descush), [Justin](https://github.com/jgreener6), [Jeremy](https://github.com/jlschlossman), and [Shelby]()

Helping Hand is a mobile friendly food journaling application written in ReactJS that helps you plan your daily food intake by using your hand as a guideline for portions. Its an easy way to get the nutrients and calories you need each day!

## Helping Hand App

<img src="frontend/helping-hand/src/Assets/appimg2.png">

### Features

- Allows a user to input a food item of their choosing and submit it to a list of entries. Users can choose whether the food item is a serving of...


    "Protein"
    <img src="frontend/helping-hand/src/Assets/palm.png" height="60" width="60" >
     
    "Carbohydrate"
    <img src="frontend/helping-hand/src/Assets/cuppedHand.png" height="60" width="60" >

    "Vegetable"
    <img src="frontend/helping-hand/src/Assets/fist.png" height="60" width="60" >

    "Fat"
    <img src="frontend/helping-hand/src/Assets/thumb.png" height="60" width="60" >


- The home page provides a full tally of all the entries made by the user sorted by date and macronutrient type.

- The About page shows information about the application: A description of the hand method for portion control, instructions on how to portion, features of the app, and a short section about the creators.

- Dark mode provides an accessibility option for those with sensitive eyes.

### Technologies Used

Helping Hand is accessed through the use of a web-browser and uses Google Firebase for easy authentication and login. The app is written with JavaScript using the React framework with JSX. Date FNS is used for entry sorting by date. Helping Hand uses the Department of Agriculture's data API to fetch food items and nutritional information for the entry search field.

### Challenges, Stretch Goals

#### Stretch Goals

- Ability to send a pdf of entry data via email: Export functionality would allow users an easy way to save milestones and share progress with their doctor or nutritionist.

- Allergen Detector: Would allow a user to comb through data from their selections for specific ingredients that cause allergic reactions.

- Additional trackers: Why stop at portioning? Adding additional optional health centric features like weight tracking, water tracking, and steps tracking would put users further in control of their health.


### How to use

1. After logging in. Use the "Add Entry" button on the homescreen to got to the entry addition page.

2. Select the date for your entry using the calendar selector. Then, use the search field to select a food item. Data is pulled from U.S. Department of agriculture's data API. You can view in-depth nutritional information, if so desired, and can add to a list of entries. Once you have have selected all your entries, click the Submit Entries button.

3. The Home page will show all your entries sorted by date and macronutrient. Don't forget to shoot for your goals! Click the Daily Targets button to show the recommended macronutrient amounts.

4. This app is dark mode enabled! :ghost: Click the settings icon to go to acessability options.