# Redcare-pharmacy-coding-challenge -- Oladele

## Setup Instructions

1. **Install project dependencies**
    ```bash
    npm install
    ```
2. **Install project dependencies**

   To start the client server and the graphQL server, use the command below:
    ```bash
    npm start
    ```

## Running Tests

I have included some tests. To run the tests, execute:

```bash
npm test
```
## Technical Decisions

### 1. State management

I used Redux for state management. Redux provides a global store, making it easier to manage the application state. I was able to use only the reducer functions to manipulate and store the data.

### 2. UI Toolkit

I opted to use SCSS for styling the user interface, and tried to use the BEM methodology for my naming conventions

### 3. Testing Strategy

For testing purposes, I chose to utilize React Testing Library for conducting unit and integration tests, This library provides a simple and effective way to test React components, although, I wasn't able to write as much test as I would have loved to

### 4. Custom Hooks

To enhance code organization and reusability, I created a custom hook to encapsulate and manage logic functions related to the trending repositories. This approach ensures a clean and modular codebase, promoting maintainability and readability.

## Areas for improvement
- If I had more time, I would cover more test cases.
