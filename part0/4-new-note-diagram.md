The following is a sequence diagram depicting the situation where the user creates a new note on [this page](https://studies.cs.helsinki.fi/exampleapp/notes) by writing something into the text field and clicking the *Save* button.

```mermaid
sequenceDiagram
    participant user
    participant browser
    participant server

    user->>browser: types "This is a note" into input and clicks Save button
    activate browser

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    Note right of browser: Form data encoded in URL -- "note: This is a note"

    server-->>browser: 302 Found -- redirect to /notes (reload page)
    deactivate server

    Note right of browser: The browser starts reloading the page.

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: CSS file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: JS file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [ ... { "content": "This is a note", "date": "2024-01-27" }]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes

    browser-->>user: Browser renders the notes
    deactivate browser
```