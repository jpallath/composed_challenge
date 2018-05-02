Hey! So I'm really proud of the functionality that I was able to add into my code to make this challenge work out.  I'll dive into what I built in this!

## Set Up

Make Sure you npm install!

### The Design

I will go straight to the con with this. I don't think my design is as good as the original.  I messed around with flexbox for a long time to try to get the same margin but unfortunately nothing could get the images as close as possible.  I decided to forgo that part and continue with getting functionality done.

I found that the mmobile design stays consistent with the desktop view.  I initially built with the expectation that this would be a instagram feed set up on mobile, but after multiple views of the original i saw that the grid view remained.

One other knock on my "design" that I'll be honest with is component hierarchy.  I built out two component files, in all honesty there should've been three component files. I preferred to just write down components into my main component to make sure that state was being transferred correctly.  If I spent a little bit more time, I could've cut out the light room component and made it it's own file.

### The Fetch Posts Function

I instantly got excited in building out a front end for an infinite scroll api.  So along with building out my posts array (which held all of the posts object pulled from the initial api call), I made sure my state had a prop to store the link of the next url of the api.  

So when the Posts function is called, it does an Axios Get and then transcribes the posts from res.data into the posts state, and then gets the next url for the apicaller state.  This function is called everytime the user loads the page AND also when the user scrolls to the bottom.

### Infinite Scroll

This was one of the functions I was most proud of.  Major reason was because I spent way too much time with the inital thought of tracking the user's scroll depth.  When I analyzed the scrollY and window.clientheight-- i was getting a huge disparity.  After some procrastination on LinkedIn and Facebook, it clicked.  Facebook and LinkedIn loads the next set of data once a user scrolls to the bottom, at the bottom of the window there is a spinner animation.  I latched onto that and decided to run a code to fire whenever my spinning gear is seeable on the screen.  When a user can see the gear, it fires the get Posts() function

There's one bug and that's if the gear is viewable at load.  This happens when the posts end up taking way too little space.  My solution to that was adding a click handler on my gear that loads more posts.  The original functionality remains.

I also used the Lodash library's Debounce function so that the Posts function doesn't fire 10 times in a span of a second.  If this wasn't debounced, a user would see multiple copies of the same entry.

### Lightbox

There is a showbox function that runs when a user clicks an entry in the feed.  I have a conditional in the render that is triggered between active and invisible when the lightbox is activated or closed.  

The lightbox function tracks what post was clicked and runs an indexOf function to get its current spot in the posts array, plus pulls out the image or caption based on the type of object it is.  Those are copied over to the state through a changeDetails function that also runs when a user clicks the arrows or presses the left or right arrows on their keyboard

## LightBox ChangePost

I added parameters on the left and right arrows on the lightbox that fire the same function, but the value of the parameter dictates if it goes forwards or backwards in the posts array.  Once that's determined, I run the changedetails function which was mentioned in the lightbox function.

## There you have it

It was extremely fun writing this, honestly.  I got to mess with new ideas that I haven't tried before plus I built out a product that I'm 80% proud of (again the design is what knocks it down :\ )

