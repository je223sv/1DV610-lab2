# Vision

The vision of this web application is to provide a simple, fun, and user-friendly quiz game that can be played by a single user or against a computer opponent at different difficulty levels.

# Requirements

- Fi: As an end-user, I want to be see the options of playing a single player game or against a computer from the home screen
- F2: As an end-user, I want to be able to play a game of quiz with myself
- F3: As an end-user, I want to be able to play a game of quiz against a computer

# Test Cases

## Testrapport

| User cases| Testmetod | Status|       
| --------- |:---------:|:-----:|
| UC1      | Manuellt test   |✅ |
| UC2    | Manuellt test   |✅ |
| UC3    | Manuellt test   |✅ |

## UC1: Home screen

Input:

- Navigate to https://lucky-manatee-59fd3b.netlify.app/

Output:

- The home screen should have a title that says "Quiz Battle"
- The home screen should have a button that says "Single Player"
- The home screen should have a button that says "Vs Computer"

## UC2: Start a single player game

Input:

- UC1
- Click on "Single Player"
- Choose the "sports" category
- click "start" in the top right corner

Output:

- The game should display a question from the sports category
- There should be four options below the question

## UC3: Start a multi player game

Input:

- UC1
- Click on "Vs Computer"
- Choose an image
- Click on "setup computer"
- Choose "EXPERT" as the skill level of the computer
- Click on "Select Categories"
- Choose the "sports" category
- Click "start" in the top right corner

Output:

- The game should display a question from the sports category
- There should be a timer ticking down from 10 seconds
- There should be four options below the question
- The player and the computer should have 3 lifes each