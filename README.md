# Links
## Figma
https://www.figma.com/design/83mUOB4emhAdQ5plLY2qld/Quizzical-App--Copy-?node-id=0-1&p=f&t=7m6NarFb9VjQ39HZ-0
## OTDB API
https://opentdb.com/api_config.php
## Libray Decoders
https://www.npmjs.com/package/he#hedecodehtml-options
https://www.npmjs.com/package/html-entities#user-content-decodetext-options

# Requirements
 - Two screens (start & questions)
 - Pull 5 questions from the OTDB API
 - Tally correct answers after "Check answers" is clicked
 - Style & Polished

# Hints
 - Use a library to decode the HTML Entities
 - Create a new array with all answers. Randomly insert the correct_answer into the array with the incorrect_answers.
    Use Google/ChatGPT for hhelp on how to shuffle items in an array at random or how to insert an item randomly into an array.
 - Limit answer choice to 1 and style the selected answer: either (1) track the selected answer index inside of each question object,
    OR (2) use an HTML form w/ radio inputs usin gthe same name attribute to automatically only allow one selection
    (and check Google on how to style a radio input to look like a button).