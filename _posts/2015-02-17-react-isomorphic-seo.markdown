---
layout: post
title:  "React and SEO"
image128: "assets/images/resizedPosts/react.png"
date:   2015-02-17 12:00:00
description: Using react to gain SEO while keeping a flux(ish) architecture.
categories: react flux fluxible SEO
---

![React]({{ site.baseUrl }}/assets/images/react.png){: .center-block.img-responsive }

#What is [React]?

React is a JavaScript library for building front ends, built by Facebook. There has been a lot of hype recently after a React conference. All the video's are available on youtube. I would highly recommend you check them out, starting with one literally called [Hype]!

#What is SEO?

SEO stands for search engine optimisation, this involves getting your site at the top of search engines.
Applications created using purely client side rendering frameworks such as Angular and Ember struggle with getting good SEO out the box as although search engines are getting better at running JavaScript, the reality is that a plain old HTML document will be the most robust.
This is one of the big advantages of React and isomorphic web applications.

##Isomorphic?

Isomorphic is a new buzz word that basically means your app can run purely on the server or in the client. It is being linked very closely with React due to it coming with server rendering abilities out of the box.
SEO isn't the only advantage of isomorphic applications. There are several other benefits:

* Performance - This approach allows the server to send the client the page the user has asked for with all the data pre-fetched. This means no spinners when your client side rendering JavaScript framework starts up and fetches the data itself. This will give the user a much faster page load for what they want - you can always refresh or load more information on page load using JavaScript.
* Legacy Browser support. If your supporting older browsers you can design your application to work purely with HTTP. An example is having an action on a form for a old browser but overriding it and using ajax for those with newer browsers.


##Fluxible

I have recently been looking into React and want to try it out with a side project.
I want to use React and a Flux like architecture, with excellent first load performance and as optimised for search engines as possible.
After researching all this I have settled on trying to use [Fluxible] from Yahoo. It offers tools and a pattern for creating isomorphic applications.

##What's next?

I am going to try and keep writing about my experiences using this new stack. Firstly I will be implementing a safe login using a node API, learning as I go.

[React]:    http://facebook.github.io/react/
[Fluxible]: http://fluxible.io/
[Hype]: https://www.youtube.com/watch?v=z5e7kWSHWTg&index=11&list=PLb0IAmt7-GS1cbw4qonlQztYV1TAW0sCr
