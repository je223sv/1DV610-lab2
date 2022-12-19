# Vision

The vision of this web application is to provide a simple, fun, and user-friendly quiz game that can be played by a single user or against a computer opponent at different difficulty levels.

# Requirements

- Fi: As an end-user, I want to be see the options of playing a single player game or against a computer from the home screen
- F2: As an end-user, I want to be able to play a game of quiz with myself
- F3: As an end-user, I want to be able to play a game of quiz against a computer
- F4: As an end-user, I want to be able to choose the categories of the quiz
- F5: As a multiplayer, I want to be able to choose my image
- F6: As a multiplayer, I want to be able to choose to play against a beginner, average or expert computer

# Test Cases

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
