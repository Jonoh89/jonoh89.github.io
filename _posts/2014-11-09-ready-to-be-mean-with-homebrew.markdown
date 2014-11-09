---
layout: post
title:  "Ready to be MEAN! With Homebrew."
image128: "assets/images/resizedPosts/homebrew.jpg"
date:   2014-11-09 12:00:00
description: Installed a fresh copy of Yosemite - a quick way to get back running with Homebrew.
categories: mean homebrew
---

![jekyll]({{ site.baseUrl }}/assets/images/homebrew.jpg){: .center-block.img-responsive }

#What is [Homebrew]?

Homebrew is a package manager. It simplifies the installation of software on the Mac platform and helps keep it easily managed and updated.

#What is MEAN?

Each letter of mean stands for the 4 main technologies used to build fullstack applications where the front end AND backend is written in JavaScript.
The technologies are:

M - MongoDB: MongoDB a open-source NoSQL database.

E - Express: A minimal and flexible node.js web application framework with loads of tools to speed up your development.

A - Angular: The well known JavaScript MVC framework by Google.

N - Node: A platform built on Chrome's JavaScript runtime for easily building fast, scalable network applications.

##Why use this and what has it got to do with MEAN?

I have recently done a clean install of Yosemite and have recently started working on a MEAN project in my own time.
I have recently started using Brew to install packages and have found it greatly simplifies and speeds up the setup process.

###Lets do it!

First of all lets install Brew, open your terminal and run:

{% highlight bash %}
ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
{% endhighlight %}

After you have got through the few basic questions and Homebrew has been installed it will ask you to run brew doctor so go ahead:

{% highlight bash %}
brew doctor
{% endhighlight %}

You should now br ready to brew!

So lets brew what we need:

 {% highlight bash %}
 brew install git node mongodb
 {% endhighlight %}

And thats it! run 'brew list' to see the 3 listed packages.
The latest stable version of these packages will be installed and ready to use on your path,
you can find out the version you have installed by running the following command with node substituted for whatever package you are interested in.

{% highlight bash %}
brew info node
{% endhighlight %}


###mean.io

Now we have all these packages installed lets start using them. I am going to be using mean.io for my project
- think of this as a quickstart into mean development with a well thought out folder structure and default configuration. I will not go into detail with mean.io but if I do start using it heavily I post more about it.
So lets install this along with grunt which it requires using npm which is the node package manager that comes with our install nodejs.

{% highlight bash %}
npm install mean-cli grunt-cli -g
{% endhighlight %}

The -g means to install globally meaning mean will now be on your command path and you can create a new app using:

{% highlight bash %}
mean init myNewApp
{% endhighlight %}
followed by
{% highlight bash %}
cd myNewApp && npm install
{% endhighlight %}

If you now run this using the command grunt, you will see the error **Could not connect to MongoDB. Please ensure mongod is running and restart MEAN app.**. Lets fix that.

###Starting MongoDB

We installed mongodb using brew however we are not running it. you can run it from anywhere however brew gives you another easy way to manage this.

First install brew services

{% highlight bash %}
brew tap homebrew/boneyard
{% endhighlight %}

We can now start mongodb

{% highlight bash %}
brew services start mongodb
{% endhighlight %}

You can see what services are running with

{% highlight bash %}
brew services list
{% endhighlight %}

You can restart and stop the services exactly how you would expect:

{% highlight bash %}
brew services stop mongodb
brew services restart mongodb
{% endhighlight %}


Making sure you are back in the new app directory run grunt again and it should run error free and you can naviage and learn mean.io as I am :) wooo!



[Homebrew]:    http://brew.sh/
