# README #

This README would normally document whatever steps are necessary to get your application up and running.

### What is this repository for? ###

* Quick summary
* Version
* [Learn Markdown](https://bitbucket.org/tutorials/markdowndemo)

### How do I get set up? ###

* Summary of set up
* Configuration
* Dependencies
* Database configuration
* How to run tests
* Deployment instructions

### Contribution guidelines ###

* Writing tests
* Code review
* Other guidelines

### Who do I talk to? ###

* Repo owner or admin
* Other community or team contact

### How to preprocess videos ###

First downres to 256x144 (size of preview window):
$ ffmpeg -i <title>.mp4 -vf scale=256:144 <title>_256x144.mp4

Then extract preview image every second and place them in a folder:
$ ffmpeg -i <title>_256x144.mp4 -r 1 <title>/%04d.png