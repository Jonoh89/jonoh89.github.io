---
layout: post
title:  "Grunt to Gulp - a few tips"
image128: "assets/images/resizedPosts/Grunt-Vs-Gulp.png"
date:   2014-07-30 19:57:54
description: I recently worked on converting a Grunt build script at work to Gulp and here are some tips!
categories: gulp
---

![gulp]({{ site.baseUrl }}/assets/images/Grunt-Vs-Gulp.png){: .center-block.img-responsive  }

#Why move to gulp? 

Well, I have just recently started a new job so the decision to move to gulp was already made and I picked it up as a development task. The reason my work chose to switch was speed and ease of use (once you understand it).
There are 3 things I liked about it. The first thing we noticed was the speed. 
This was why the task was added. We have an overly long build script due to generating multiple themes for the site, there are more improvements we could make but this was a quick and safe solution that halved our build time.
The second thing is the amount of compatible libraries that can easily be added. That is not to say there are millions of gulp specific plugins but it is very easy to use standard node libraries. 
There is even a blacklist of gulp [plugins] with recommendations which sometimes are standard node libraries such as 'del' instead of 'gulp-clean'.
Finally, the thing I didn't feel grunt was missing until I used gulp (and after I understood and stopped complaining about it!) is the depends parameter on the task. 
I think this adds to the readability and ability to run just the task you want without worrying about what you NEED to run before it.
I feel this is a much cleaner way than creating a list of tasks in grunt.
 
##Stumbling blocks

At first I struggled with 3 things:

* Understanding why gulp was running everything at the same time
* Understanding why if I used a function it seemed to finish in nanoseconds
* Understanding how to make a small helper when no plugin was available

I will talk about the first two of these problems using the small example below. I plan to show how to make your own small plugin as a separate blog post.

So here is a small Gruntfile that we are going to convert: 
{% highlight js %}
module.exports = function(grunt) {

    grunt.initConfig({
        files: {
            scripts: '*.js'
        },
        clean: ['dist'],
        jshint: {
            files: ['<%= files.scripts %>', '!jquery*']
        },
        concat: {
            dist: {
                src: ['<%= files.scripts %>', '!*file.js'],
                dest: 'dist/index.js'
            }
        },
        uglify: {
            dist: {
                files: {
                    '<%= concat.dist.dest %>.min.js' : ['<%= concat.dist.dest %>']
                }
            }
        }
    });

    grunt.registerTask('default', ['jshint','clean', 'concat', 'uglify']);

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
};
{% endhighlight %}

Our task is to recreate the functionality of this Gruntfile in Gulp.

To follow along grab the completed code [here](https://github.com/Jonoh89/GruntToGulp) and clear the gulpfile.js. 

###Async

So, if we look at the default grunt task we are checking for JavaScript errors with jshint, cleaning our distribution folder, concatenating the files into one and then performing minification to reduce the file size and obfuscate the code. 
When you run the task, you will see it runs everything synchronously. 

For demonstration purposes, our task will be to perform these tasks in order. For example, we don't want to clean or concatenate our code before the jshint task is finished and completed successfully.
 With gulp installed on your command line, save this following snippet in the file named gulpfile.js and run gulp command in the same directory. 

{% highlight js %}
var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat');

var files = {
    myScripts: ['*.js', '!jquery*'],
    projectScripts: ['*.js', '!*file.js']
};

gulp.task('lint', function () {
    return gulp.src(files.myScripts)
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(jshint.reporter('fail'));
});

gulp.task('scripts', function () {
    return gulp.src(files.projectScripts)
        .pipe(concat('index.js'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('default', ['lint', 'scripts']);
{% endhighlight %}

If you have ran this successfully you will see that the default task has been ran. Running the lint and scripts task and your log will look something like this:

{% highlight console %}
[21:26:44] Starting 'lint'...
[21:26:44] Starting 'scripts'...
[21:26:44] Finished 'lint' after 59 ms
[21:26:44] Finished 'scripts' after 52 ms
{% endhighlight %}


As you can see both tasks were started at the same time. This is because gulp will (unless you tell it otherwise) run all of your tasks at the same time. 
This may not be your desired behaviour, for example if you make a lint error you will see that the scripts task will still start and finish with your possibly buggy code.
 
To resolve this you add dependencies. This is an optional parameter to every gulp task that tells gulp which tasks should be ran before running the task your defining. 
So to solve this and have scripts run after lint we must add lint as as dependency to scripts.

{% highlight js %}
gulp.task('scripts', ['lint'], function () {
    return gulp.src(files.projectScripts)
        .pipe(concat('index.js'))
        .pipe(gulp.dest('./dist/'));
});
{% endhighlight %}

{% highlight console %}
[21:36:04] Starting 'lint'...
[21:36:04] Finished 'lint' after 50 ms
[21:36:04] Starting 'scripts'...
[21:36:04] Finished 'scripts' after 11 ms
{% endhighlight %}

You may end up with multiple dependencies or need to group similar tasks.

{% highlight js %}
gulp.task('copy', ['copyFixtures', 'copySpecs', 'copyComponents', 'copyHelpers']);

gulp.task('test', ['copy'], function () {...});
{% endhighlight %}

In this example you will guarantee that all the copy tasks are ran before the test task is started.

###Using standard node libraries

In some cases you may wish to perform a task with a node library that doesn't have a specific gulp plugin and sometimes this can be the preferred method.

Here we are going to finish our Grunt conversion. First we will add our uglify (minification) and rename the file to append the conventional '.min' to the filename.

[plugins]: https://raw.githubusercontent.com/gulpjs/plugins/master/src/blackList.json

{% highlight js %}
//replace at top of file
var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');

//replace scripts task
gulp.task('scripts', ['lint'], function () {
    return gulp.src(files.projectScripts)
        .pipe(concat('index.js'))
        .pipe(uglify())
        .pipe(rename({extname: '.min.js'}))
        .pipe(gulp.dest('./dist/'));
});
{% endhighlight %}

This will now minify the index file and add the extension to the filename before placing it in the dist folder. If you look in the dist folder now you will see we have the index.js and index.min.js file. 
This is because we are not clearing the folder, so lets do that.

The gulp-clean plugin will probably work but it is on the blacklist and it is recommended you use the standard node library 'del'. So require and use it.

{% highlight js %}
var del = require('del');
gulp.task('clean', function () {
    del('dist');
});
{% endhighlight %}

If you take out the scripts task and add the clean task to the default task you will see this working. However in your log you will notice it completed in ~2.67 ms. Now there isn't much to clean, but if any task completes this quickly, it is probably not set up correctly.
Although this isn't a problem for this small example if your del task has a big job or if your using another plugin that takes a long time to load you will start to encounter problems.

The issue is that we are not telling gulp when that task has finished. In a standard gulp task we return the gulp chain of commands and gulp will call this task finished when the final task is completed and something is returned.
For using external plugins we must tell gulp manually when the task has finished. So change the delete function to this: 

{% highlight js %}
gulp.task('clean', function (cb) {
    del('dist', cb);
});
{% endhighlight %}

Running again you will notice the clean function takes a more expected ~14 ms. This is because we are using the cb parameter. To use this you simply run it when the task you are doing is finished.
 In this example the del task calls its parameter when its finished its task so we pass the cb and this will be called when the files are deleted informing gulp the task has finished.
 
 This is more obvious when working on longer tasks, for example if you are running karma:
 
 {% highlight js %}
var gulp = require('gulp');
var karma = require('karma').server;
var config = require('../config');

gulp.task('test', ['lint'], function (cb) {
  karma.start({
    configFile: config.paths.karmaConfig,
    singleRun: true,
    browsers: ['PhantomJS']
  }, cb);
});
{% endhighlight %}


I hope this has helped you! Check out the finished code on github: https://github.com/Jonoh89/GruntToGulp