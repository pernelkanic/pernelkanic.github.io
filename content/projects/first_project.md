+++
title = 'Coding Platform '
date = 2024-07-25T21:34:06+05:30
draft = true
+++

## Introduction:
I would like to explain one of the interesting projects that i have worked on , It is the creating a coding platform like leetcode.\
Being from a Computer Science Background , leetcode is the one thing i been doing for so long , One day i really wanted to learn about the system /
design of leetcode and how these coding platform work , how online judges work .
 - Backend - Node.js(going to migrate to golang for concurrency , W goroutines )
- Frontend - React.js\
\
Thats when I started learning about system design concepts and i wanted to build one for myself.

> Tired of doing leetcode, build one ✅

## How did I start :
Having previous knowledge in the domain of mern techstack , and having an abstract idea on how to start , I started listing down all the entities and relationships associated with it.\
My initial thought process:
- started with the user login and stuff(its easy), where i implemented oauth using github or gmail using clerk which had webhooks setup in place.
- these webhooks are mainly designed to store any new user data who sign up for the first time into my mongo atlas cluster.
- webhooks needs access to my local dev server , for which i used ngrok which tunnels the connections and they gave me a static domain which helped me a lotttt in setting up these webhooks.

Now The user login Flow is all done.

Now coming to problems setup

### what did i need :
- Users on login must see all the problems that i offer.
- after they click on a specific problem , they must be redirected to the specific problem where they might submit a code , and the application validates the code against the testcases.

# The Downfall:
- I came to this stage of the project with little effort , here did the actual logic started and i was lost on where to begin , I was able to populate some predefined set of dsa 
questions to the user , that part was easy .
- Next is the online code editor , for which I used monaco code editor which i could use as a component in React.Ye !!
- Then came Run code implementation and submit code implementation  , for which I came up with 2 ideas 
    - running it in the same server where i run my application (utter trash idea , throw a toaster at me for this)
    - spinning up a docker container everyone a user has to run the code(pretty good idea)
- Thats when I started splitting up every service to its individual pieces (microservices) 💀

## Actual Logic :
Coming to the actual logic on how the user code will be executed , 
Why not run it in the same server where i run my application? We can't trust every user with their code , some might try to dwell deeper , some might have an issue with the code , which in the worst case might lead to termination of the server and running the code and as well serving this application to the user is a huge task and its not ideal to run it in the same server.

### What did I do:
 - Wrote a seperate service for running the user code , I used redis queue for async purposes.
 - The main backend , once it recieves the user code puts in the queue and from where the worker backend pickups the first request from the queue and starts executing it.
 - The worker backend for every request from the redis queue , checks the language , spins up the respective container and executes the code inside that container and returns the stdout or the stderr to this worker backend , and this again push response to the redis and from the main backend picks it up and shows the response back to the users.
 - In the client side , long polling (not the best way) has been set up in which server holds the client connection for a certain time period until a new response data arrives.
 - The submission logic is just the extension of the run code implementation , where after the executing the given code , worker backend tests it against the testcase files for a specific 
 problem, and only if all the testcases passes , the code is saved to the database .
 - When the user submits another valid code , server checks for the diff from the previous code with the current code and changes only the diff instead of a full save , kind of like vdom in react.

 ## What should be done:
 - Instead of long polling the backend must have a websocket connection , which gives the bidirectional communication by reusing the tcp connections which is ideal for this usecase(I do kind of think it might be a overkill).
 - Worker backend logic must be migrated from js to golang for efficient concurrency using goroutines.
 