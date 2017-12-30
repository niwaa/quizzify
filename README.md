# quizzify
A web app to generate Gap Fill questions from wikipedia articles

[insert screenshot]

## Table of Contents
1. [Running the project](#running)
2. [Demo]
3. Architecture
4. Improvements ideas
5. Used frameworks and Libraries
6. References

## Running the project <a name="running"></a>

Clone the repo

```$ git clone quizzify.git ```

Run inside quizzify folder, to install all the necessary npm modules:

```$ yarn ```

```$ cd client && yarn```

(How To Install Yarn: https://yarnpkg.com/en/docs/install)

Start the Server (default port 3001):

``` $ node bin/www```

Start the Client (default port 3000):

```$ cd client && yarn start```

Go to http://localhost:3000/ to launch the web app.



## Demo

View the app running on:
[to be completed]

## Architecture

The project is a simple Client web-app which communicate with a NodeJS express server using a unique API endpoint.
The user enter a Wikipedia title on the interface, which get send to the server. The server will use the following pipeline to generate Gap Fills and multiple choices. The Client then consume the server output and render the Gap Fills quizz.

The language choice have been Javascript although I have started first the back-end using Python with the library Spacy. The change was initially made to gain speed given the time constraints and learning curve.

The real-time capability, although specified as a non-requirement, was built-in the project because it made testing and feedback a lot faster, and the feature was quick to implement.

### Gap-fill generation pipeline

1. Fetch a wikipedia article extract given a title, using the wikipedia API.
2. Sentence selection.
  - Decompose the article extract into sentences using an NLP library.
3. Gap selection.
  - Extract POS / Tags from the sentence.
  - Arbitrarily select as "potential gaps" certain tag type by importance order.
  - Ranking of potential gaps using TfIdf against the whole article.
4. Multiple choice distractor selection. Three techniques are currently used to select distractors:
  - Get distractor from other sentences of article, belonging the same tag type.
  - If gap type is a date, we generate nearby random dates.
  - If gap type is a value, we use word2vec data to find semantically similar words. We also use this method if we don't have enough distractors from other methods.
5. Generate the GapFills JSON output for the Client.



## Improvements ideas

1. Sentences extraction
  * Sentences could have been ranked by "good sentences for Gap Fill", instead of only choosing the first ones. Eliminate bad sentences (too short for IE), and choosing sentences having interesting topics.
2. Gap selection
  * Instead of arbitrarily ranking tags importance, we could have trained classifier on the relevance of gaps, supposing we have a dataset of "good gapFills".
3. Distractor selection
  * We could train a classifier to selection good distractors, which different features (string length, POS tags, similarity, .etc)
4. Coding style
  * The back-end code and generation pipeline could have been written better using a functional coding style, by using a library like Ramda (http://ramdajs.com/), and immutable data structures. It would make testing and change in the pipeline easier.
5. Testing the performance of the project.
  * [to be completed]



### Used frameworks and Libraries

**Web stack**

React, NodeJS, Express

**NLP Libraries**

* Natural: https://github.com/NaturalNode/natural
* Compromise: https://github.com/nlp-compromise/compromise
* Word2Vec data: https://github.com/turbomaze/word2vecjson

**Code style**

* Linter: StandardJS
* Comments: JsDOc


### References


[to be completed]
