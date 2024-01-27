The following is a sequence diagram depicting the situation where the user creates a new note on [this page](https://studies.cs.helsinki.fi/exampleapp/spa).

```mermaid
sequenceDiagram
    participant user
    participant browser
    participant server

    user->>browser: types "This is a note" into input and clicks Save button
    activate browser

    Note right of browser: form.onsubmit(e) is called with the event details
    Note right of browser: a new "note" is created and added to browser's "notes" array
    browser-->>user: clears input field
    browser-->>user: refreshes the list of notes
    
    browser->>server: (sendToServer fn) POST to /exampleapp/new_note_spa
    deactivate browser
    activate server
    Note right of browser: Request payload - {content: "This is a note", date: "2024-01-27"}
    
    server-->>browser: 201 Created
    deactivate server
    activate browser
    Note left of server: Response payload - {"message":"note created"}

    browser-->>user: logs server response payload to console
    deactivate browser
```