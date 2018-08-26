#----------------------
# BASICS of Docker
#--------------------


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




#----------------------
# Docker in more details
#--------------------

#Overriding default commands

In the example of ```docker run app-name``` we can add last arguments like ```echo im overrider``` that will display text after the container is up and running. Can be any commands like ```ls, cd ..``` or run scripts you need. But need to have the entire ubuntu in your image.

#Check running containers
1)```docker ps``` shows you all running containers
2)```docker run busybox ping google.com``` and then in another container check for running containers, u will see one active, pinging google.com.
3) ```docker ps --all```  shows you all of them, even the dead ones.

#Lifecycle of container
docker run = docker create + docker start. By running a command ```docker create hello-world``` you will be given a long string. Then you can ```docker start -a "string here"``` to run that programm. ```-a``` in this case just attaches your CMD to watch for that container and show the output in terminal.

#Restarting stopped containers
If container stopped we can restart it by getting the id of a stopped process by ```docker ps --all", copy your desired process and then run ```docker start -a "Id of that process"```.

#Removing stopped containers and images and how to stop containers
1) ```docker system prune``` will delete everything, a prompt will show what exactly.
2) ```docker rm "container name"``` will remove the container
3) ```docker rmi "image name"``` will remove the image
4)```docker stop "container"``` will give it time to neatly shut down, if not stopped in 10secs, kill will be executed automatically
5) ```docker kill "container"``` will destroy the container

#Retrieve log output
In case you use ```docker create and docker start``` without the -a tag, you know that you won't see any output, to retrieve that data simply write ```docker logs "id"``` and that will show you what was the output in that container.

#Multi command containers
Lets say you run a programm with docker and then you need to execute additional programms in the same instance (container). The solution is ```docker exec -it (container_ID) (Command u need)```. For example ```docker run redis```, then ```docker exec -it (container_ID) redis-cli```. If remove ```-it``` tag, it will start the cli but you will not be given a chance to work in terminal. ```-it``` tag is the same as 
1) ```-i``` to get to the terminal
and 
2)```-t``` to display data in a nice format


#IMPORTANT How to open a shell(terminal) of a running container
1)```docker exec -it (container_ID) sh``` will open a shell for you to work in that container
2)```docker run -it (app-name) sh``` will do the same but at the start up



#-----------------
#Working with images
#------------------


