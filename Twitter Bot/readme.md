# Twitter Bot
This is a twitter bot that when someone mentions it in a tweet, it will take the first word and return the first song that comes up from a Spotify search. 

[@wordtosong](https://twitter.com/wordtosong)

## To Interact With
Tweet a single word to @wordtosong

e.g. "@wordtosong robot"


## How to Install
This requires two packages, Twit and Spotify-Web-Api-Node:


To install [Twit](https://www.npmjs.com/package/twit):
```
npm install twitt
```

To install [spotify-web-api-node](https://github.com/thelinmichael/spotify-web-api-node):
```
npm install spotify-web-api-node --save
```

## API Keys
You will need API keys from Twitter and Spotify which you get once you create an app through their developer profile. You can create two config files to place these keys in.

## Note
In lines 13 and 22 of bot.js, you need to replace where it says @wordtosong with your own twitter bot handle. 

## How to Run
Once everything is set up, you can run the code and then tweet a word at the bot. It should reply to you right away! 
