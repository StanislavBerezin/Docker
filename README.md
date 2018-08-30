# ----------------
# SUMMARY
# --------------
1) Start working on your project
2) Create a docker file (paragraph 007) hint(ctrl+f, insert 007)
3) To build the image ```docker build -t stasberezin/(appName) . ``` 
4) Enter the file system add ```sh``` at the of step 3 or if its already running ```docker exec -it (container_ID) sh``` 
5) Better way to use (paragraph 008)


# ----------------------
# BASICS of Docker
# --------------------


# What docker is and Why

What
Containers are the instances of a certain programms, so essentually Docker is a platofrm which allows you to run containers based on images. Image is the entity with all depenendancies and  configuarations that are required to run a programm.

Why
Because it makes it easier to run any software on your machine
without worrying about setup and dependencies associated with your chosen software


# How it works when using RUN cmd

When running ```docker run app-name``` it starts the Docker client and then it communicates with Docker server. Eventually the Docker server see that we tried to run ```app-name``` so it starts the search for it, if unable to find (image cache) it loads it (Docker hub) and runs, then it stores image of ```app-name``` in your image cache.

# What is a container (more detailed)

On all computers we have an app processing layer, where we can have our browsers, apps, etc. Those apps make system calls to kernel and kernel communicates directly with CPU, Memory, and Hard Disk. To understand the container lets imagine a scenario: You have a need to run 2 programms at the same time both of which require different versions of NodeJs. However on your machine you have only 1 installed and you cannot run 2 of them at the same time. To solve this problem we have a CONTAINER, essentially a programm makes a system call to kernel which causes it to assign a portion of resources and run apps concurrently. 

    The technique for allocating resources is called "nameSpacing" -> (isolating resources per process or group of processes), governed by "Control Groups" -> (limits amount of resources per process). All of those belong to linux OS, so when you install docker you automatically installed linux VM. Inside of it this machine we have all containers and linux kernel to do the job

# What is image
A snapshot of files and directories required to run a specific software.




# ----------------------
# Docker in more details
# --------------------

# Overriding default commands

In the example of ```docker run app-name``` we can add last arguments like ```echo im overrider``` that will display text after the container is up and running. Can be any commands like ```ls, cd ..``` or run scripts you need. But need to have the entire ubuntu in your image.

# Check running containers
1)```docker ps``` shows you all running containers
2)```docker run busybox ping google.com``` and then in another container check for running containers, u will see one active, pinging google.com.
3) ```docker ps --all```  shows you all of them, even the dead ones.

# Lifecycle of container
docker run = docker create + docker start. By running a command ```docker create hello-world``` you will be given a long string. Then you can ```docker start -a "string here"``` to run that programm. ```-a``` in this case just attaches your CMD to watch for that container and show the output in terminal.

# Restarting stopped containers
If container stopped we can restart it by getting the id of a stopped process by ```docker ps --all", copy your desired process and then run ```docker start -a "Id of that process"```.

# Removing stopped containers and images and how to stop containers
1) ```docker system prune``` will delete everything, a prompt will show what exactly.
2) ```docker rm "container name"``` will remove the container
3) ```docker rmi "image name"``` will remove the image
4)```docker stop "container"``` will give it time to neatly shut down, if not stopped in 10secs, kill will be executed automatically
5) ```docker kill "container"``` will destroy the container

# Retrieve log output
In case you use ```docker create and docker start``` without the -a tag, you know that you won't see any output, to retrieve that data simply write ```docker logs "id"``` and that will show you what was the output in that container.

# Multi command containers
Lets say you run a programm with docker and then you need to execute additional programms in the same instance (container). The solution is ```docker exec -it (container_ID) (Command u need)```. For example ```docker run redis```, then ```docker exec -it (container_ID) redis-cli```. If remove ```-it``` tag, it will start the cli but you will not be given a chance to work in terminal. ```-it``` tag is the same as 
1) ```-i``` to get to the terminal
and 
2)```-t``` to display data in a nice format


# IMPORTANT How to open a shell(terminal) of a running container
1)```docker exec -it (container_ID) sh``` will open a shell for you to work in that container
2)```docker run -it (app-name) sh``` will do the same but at the start up



# -----------------
# Working with images
# ------------------


# Dockerfile
Place where all configurations will sit -> then sends to docker CLI (terminal), -> Docker server which does the job itself -> then an image is created.
Process: 
1)Base image
2)Run commands to install additional software
3)Command to run on the container startup

When you are inside of a folder containing the Docker file need to run ```docker build . ``` that will start the process. Upon completion of this build you will be given an ID, which in order to run need ```docker run ID```

But a better way would be

``` docker build -t (id_name)/(project_Name):(version latest) .```

and then ```docker run (id_name)/(project_Name)```


Instructions in dockerfile

FROM: what base we want to use
RUN: exectute commands while setting up the container
CMD: When our image is used to run as a continaer run CMD command.

# Base image
Its like a hardware that has no OS on it, so the image gives instructions on what to install and configurations on empty machine before running and apps.

So FROM Ubuntu provides functionalities of Ubuntu, so all cmd commands like apt-instal etc would be valid.

# Docker build command

When we are running that command it looks at the FROM (Ubntu, alpine) etc, it searches for the image on docker hub, gets the snapshot of folder structure and system and inserts it into your container below the kernel. Hence giving you an ability to run commands for the chosen OS. During every command we get a new image. If something is already installed its getting it from cache

# Generate an image from running container
For example we can have a running container, add more packages etc, and then make an image based upon it.

```docker exec -it (container_ID) sh``` 

or

```docker run -it (app-name) sh``` will do the same but at the start up

and then

```docker commit -c 'CMD ["anycommands"]' (id_of_current_container)``` that will give you an ID of a new image

"alpine" is the most compacted image

# ---------------------
# Working with NodeJS
# ----------------------



# Start project located in NodeJs folder (BASIC)

When working with nodeJs we need to install all dependencies first, machine will assume that npm is already installed. 

By default dockerfile will be in container file system, not precisely in your folder where u have your packages.json and etc, 

```COPY ./ ./``` 1st "./" meaning our current directory, 2nd is for our container.

007

Our Dockerfile could look like this 
```
#what is used as OS, in this case node
FROM node:alpine

#if doesnt exist create this directory and put execute the rest of the commands in there
WORKDIR /usr/app

#what exactly to copy, by 1st "./" we are saying to copy everything. If need can specify explicitly what to copy like "./package.json", so only that will be copied and the rest of commands will be executed
COPY ./package.json ./

#this will be executed only if changes were made in json file
RUN npm install

#then copy the rest of the files.
COPY ./ ./

#commands to run upon completion of above steps
CMD ["npm", "start"]
```
Then after we can do ```docker build -t (ourDockerName)/(projectName) .``` which taggs our newly created image

The image will be running, but we cant access it the app itself, because of the absence of port redirection between our machine and container. The solution would require to redirect users to container if a request was made to that specific url.
# To make the server run
Solution ```docker run -p 8080:8080 (ourDockerName)/(projectName)```

first 8080 is the request you make from your machine, and second 8080 is the port that is in the docker container.

Now the app should be working.



# More advanced Nodejs App (NodeJs2)
The idea is to create an app which will count visits to the website. It will be 1 seperate Docker container to count visitors (redis), and multiple containers for the app itself. A wrong way to do it, would be to have redis on each container, so its better to have an integrated counter which is hooked up to all containers. 

docker compose is used to start multiple containers at the same time.(it can help save time instead of writing all commands everytime) 

008
# Docker compose run 
docker.compose.yml -> you can basically say to go and make 2 different containers and all instructions associated with them

```
version: '3'


#by making in this file structure will automatically
#connect those 2 services on the same network
services:
#create redis server
  redis-server:
  #use image of redis
    image: 'redis'

  node-app:
    #use the docker file in the current directory
    #it does the docker buld and docker run at the same time
    build: .
    #get ports in the way like "docker run -p 8080:8080"
    ports:
      - "4001:8081"

```

# Compose 
```docker-compose up --build``` start
```docker-compose down``` stops the containers
```docker-compose ps``` to show composed containers in the specific folder

# Automatic container restart
In case some of the containers failed to start, or just crashed during some period we can do the following.

Restart policies
(1)'"no"'- dont attempt to restart
(2)'always'- always try to restart
(3)'on-failure'-only restart if error happend
(4)'unless-stopped'-always restart unles devs stop it

in docker-compose file, under the container props we just write ```restart: (restart_policy)```

# ---------
# Production grade flow 
# ---------

github repo, where the real code lives
one branch for code changes, and master is the finalised version. => Travis CI (testing) => then pushed to AWS hosting

# Start

Need to have 2 containers, 1 for development, and another for production

1)Dockerfile.dev
2)Dockerfile (for production)

1)Then to build the container for dev we code ```docker build -f Dockerfile.dev . ``` by default it will copy the node_modules folder, just need to remove it and run the command again, that should make it much faster.

# Hot reloading (manual)

 Upon completion your a given an ID, so ```docker run -p 3000:3000 -v /app/node_modules -v $(pwd):/app (ID) ```

In this command we code ```-v /app/node_modules``` so that it doesnt have to search for references of that instance, because we removed it from our local machine. The second ```-v $(pwd):/app``` checks all of the files in our directory. The reason its 'app' its because we defined it in Dockerfile WORKDIR.

# Hot reloading (compose)

Go to https://github.com/StanislavBerezin/Docker-deploy

There is a docker compose
```
version: '3'
services:
  web:
    build: 
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    volumes:
      #dont check references for node_modules
      - /app/node_modules
      # from the current (local directory) to /app inside of container
    
      - .:/app

```
# To run tests (manual)
1)```docker build -f Dockerfile.dev .``` get ID
2)```docker run -it (id) npm run test``` will does the test after

Another way would be to get inside of the container and and run test there
1)to get inside of the container through ```docker exec -it (id) sh``` and then in terminal write npm run test
or
2)```docker exec -it (id) npm run test```

#To run tests (compose)

the docker file would look like this

```
version: '3'
services:
  web:
    build: 
      context: .
      dockerfile: Dockerfile.dev
    ports:
      - "3000:3000"
    volumes:
      #dont check references for node_modules
      - /app/node_modules
      # from the current (local directory) to /app inside of container
      - .:/app
  tests:
    build:
      context: .
      dockerfile: Dockerfile.dev
    volumes:
      - /app/node_modules
      - .:/app
    command: ["npm", "run", "test"]

```
to get inside of the container through ```docker exec -it (id) sh``` and then in terminal write npm run test

# Nginux

Production server that will be responsible for receiving requests.
Can be broken down to 2 different phases, build phase and run phase with nginux. Basically making an image by using node:alpine etc, and then taking the files we require from that build to another image which used to run the production server.

```
#everythng from here will belong to builder phase
FROM node:alpine as builder

WORKDIR './app'

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

# based on this we will be given 
# /app/build <--- thats where all of the important files are

# Another phase
FROM nginx
# copy something from builder phase assigned above
COPY --from=builder /app/build /usr/share/nginx/html

# it starts by itself
```
Upon completion u will get an ID, then ```docker run -p 8080:80 (ID)``` and it will run the container


#Travis

Get to the website, sign in through git, select a project.

In root directoy of your project create .travis.yml would look like this.

```
sudo: required

# it tells travis that we need a docker container running
services:
  - docker:

# to do something before
# we need to build the docker image before we run tests
before_install: 
# same as the comand in terminal
# with this tag
  - docker build -t stasberezin/docker-react -f Dockerfile.dev .

# scripts to run
script: 
# it will run the tests in our container. -- --coverage is used to show
# the coverage and exit the tests right after the boot.
  - docker run stasberezin/docker-react npm run test -- --coverage

<!-- additional could be like -->
deploy:
  provide: ec2
  region: "us-west-2"
  app:docker
  env: "Docker-env"
  bucket_name: instance name like us-west-2-19292994993
  bucket_path: docker
  <!-- get code only from master -->
  on:
    branch:master
    <!-- variables that are declared in travis interface -->
  access_key_id: $AWS_ACCESS_KEY
  secret_acess_key:
    secure: "$AWS_SECRET_KEY

might need to add quotes around everything
```

then push it to github, and on travis website you will be able to see whats happening

Can store variables like API key throuth travis directly without exposing it in repo. Display value off can be accessed 
```
  access_key_id: $AWS_ACCESS_KEY
  secret_acess_key:
    secure: "$AWS_SECRET_KEY
```


#Multi container application

Build a dev workflow dockerfile first, so that we can change any lines of code without rebuilding everything from scratch.
In each folder client, server, worker need to make a Dockerfile.dev similar to the ones we have above.
Then in a root directory, (out of all three), make a docker-compose file



# in case permission denied
https://forums.docker.com/t/can-not-stop-docker-container-permission-denied-error/41142/5

For anyone that does not wish to completely purge AppArmor.

Check status: sudo aa-status

Shutdown and prevent it from restarting: sudo systemctl disable apparmor.service --now
Unload AppArmor profiles: sudo service apparmor teardown
Check status: sudo aa-status

You should now be able to stop/kill containers.