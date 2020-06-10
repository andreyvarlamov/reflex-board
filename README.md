# Reflex Board

## General
- Scrum Board
- View all boards, without editing, if you are not logged in
- Register and log in, to create your own boards
- Can add new columns, edit all card data, delete cards, columns, or entire boards
- Access at: https://reflex-board.herokuapp.com/

## Technical Details:
- Uses MERN Stack (Mongoose, Express, React, Node)
- REST API Backend
- JsonWebToken for authorization tokens
- Bcrypt Salt (10r) & Hash
- Material UI for frontend components
- React Router
- React Context API (with useReducer and useContext hooks) for global state management

## Walkthrough
- Initially on all boards page, check boards from different authors (purely a demo feature)
- To start your own board, first make an account:
  - Click on Login button on the Navbar
  - Click on "Don't have an account? Register"
  - Enter your name, an email, and a password
- In the list of your boards, click on Add Board, enter your title
- Click on the board to enter
- Click add card on any of the columns to add a card
- Click on the card to add description, change status, title, or delete the card
- Click on New Status to add a new column
- Click on the delete icon to delete any of the columns, this will also delete all the contained cards
- You can add any number of boards
- You can only edit your own boards
