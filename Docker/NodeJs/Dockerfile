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