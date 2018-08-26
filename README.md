# What docker is and Why

What
Containers are the instances of a certain programms, so essentually Docker is a platofrm which allows you to run containers based on images. Image is the entity with all depenendancies and  configuarations that are required to run a programm.

Why
Because it makes it easier to run any software on your machine
without worrying about setup and dependencies associated with your chosen software


# How it works when using RUN cmd

When running ```docker run app-name``` it starts the Docker client and then it communicates with Docker server. Eventually the Docker server see that we tried to run ```app-name``` so it starts the search for it, if unable to find (image cache) it loads it (Docker hub) and runs, then it stores image of ```app-name``` in your image cache.

# What is a container (more detailed)

On all computers we have an app processing layer, where we can have our browsers, apps, etc. Those apps make system calls to kernel and kernel communicates directly with CPU, Memory, and Hard Disk. To understand the container lets imagine a scenario: You have a need to run 2 programms at the same time both of which require different versions of NodeJs. However on your machine you have only 1 installed and you cannot run 2 of them at the same time. To solve this problem we have a CONTAINER, essentially a programm makes a system call to kernel which causes it to assign a portion of hardrive, cpu, node version and run it at the same time for that specific programm.

# What is image
A snapshot of files and directories required to run a specific software.

