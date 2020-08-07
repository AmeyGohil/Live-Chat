This will be a live chat website which will be built using HTML, CSS, JS and PHP.

For styling, majorly Materialize.css will be used.

Used anime js for some text animations.

SSE will be used for implementing live chat feature.

Basic Features to be implemented

--> User Register/Login | Done

--> Admin Page to Edit Details | Done

--> Community Chat | Done

--> Active/Inactive Users | Not Possible in SSE, as SSE has uni-direction connection unlike WebSockets

--> Individual Chat | In Progress

--> Chat Message Limit and Load More

--> Dark Mode

--> Recaptha on Register

Additional Advanced Features

--> Friends

--> Report a User(if complaint report exceeds a limit for eg. 10 reports)

--> Any other suggestions are welcome

--> Public/Private Channels/Groups


Object|Properties
  
--> User
    -> name
    -> password
    -> is_logged_in
    -> freinds
    -> groups
    
--> Chat
    -> id
    -> user
    -> time
    -> text
    -> group
    
--> Group
    -> users
    -> public/private
    
