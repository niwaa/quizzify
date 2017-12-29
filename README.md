# quizzify
A web app to generate Gap Fill questions from wikipedia articles



## How to run the project

Clone the repo

```$ git clone quizzify.git ```

run:

```$ yarn ```

To install all the necessary modules.

Start the server:

``` $ PORT=3001 node bin/www```

Client:

```$ cd client && yarn start```

Go to http://localhost:3000/ to launch the web app.



## Demo

[to be completed]

## Architecture

### Gap-fill generation pipeline

1. Fetch a wikipedia article given a url.
Use wikipedia API (ie: DBpedia Spark endpoint) to extract article description.
2. Sentence selection.
Use a NLP library to extract relevant sentences from the article.
3. Gap selection.
Use an TF-IDF to find relevant gap in sentences.
4. Multiple choice distractor selection.
Use an NLP technique to find 3-4 other relevant choices for the quizz.  Ideally need to find choices with contextual fit to the sentence. An approach maybe to use “similar” words in adjacent sentences or articles.
5. Build-up the “gap-fill question”.
Create the quizz in the web-app with HTML/JS/CSS.

[to be completed]

### Used frameworks and Libraries

React, Express, Natural.

[to be completed]
