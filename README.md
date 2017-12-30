# quizzify
A web app to generate Gap Fill questions from wikipedia articles

![screenshot](https://i.imgur.com/Uc8xOzV.png)

## Table of Contents
1. [Demo](#demo)
1. [Running the project](#running)
3. [Architecture](#architecture)
4. [Improvements ideas](#improvements)
5. [Used frameworks and libraries](#frameworks)
6. [References](#ref)


## Demo <a name="demo"></a>

View the app running on:
https://quizzify.herokuapp.com/


## Running the project <a name="running"></a>

Clone the repo:

```$ git clone https://github.com/niwaa/quizzify.git ```

Run inside quizzify the folder, to install all the necessary NPM modules:

```$ yarn && cd client && yarn```

(How To Install Yarn: https://yarnpkg.com/en/docs/install)

Start the Server (default port 3001):



Run ``` $ node bin/www``` in root directory.

Start the Client (default port 3000):

```$ cd client && yarn start```

Go to http://localhost:3000/ to launch the web app.



## Architecture <a name="architecture"></a>

The project is a simple Client web-app which communicates with a NodeJS express server using a unique API endpoint.
The user enter a Wikipedia title on the interface, which is sent to the server. The server will use the following pipeline to generate Gap Fills and multiple choices. The Client then consume the server output and render the Gap Fills quizz.

The language choice is Javascript, although I first started looking at using Python with Spacy. The change was initially made to gain speed given the time constraints.

The real-time capability, although specified as a non-requirement, was built-in the project as it made testing and feedback a lot faster, and the feature was quick to implement.

### Gap-fill generation pipeline

1. Fetching of a wikipedia article extract given a title, and using the wikipedia API.
2. Sentence selection:
  - Decomposition of the article extract into sentences using an NLP library.
3. Gap selection:
  - Extraction POS / Tags from the sentence.
  - Arbitrarily selection as "potential gaps" certain tag types.
  - Ranking of potential gaps using TF-IDF against the whole article.
4. Multiple choice distractor selection. Three techniques are currently used to select distractors:
  - Extraction of potential distractors from other sentences of article, belonging the same tag type.
  - If gap type is a date, we generate nearby random dates.
  - If gap type is a value, we use word2vec data to find semantically similar words. We also use this method if we don't have enough distractors from other methods.
5. Generation of the GapFills JSON output for the Client.



## Improvement ideas <a name="improvements"></a>

1. Sentences extraction
  * Sentences could have been ranked instead of only choosing the first ones. For example: elimination of bad sentences (ie: too short), or choosing sentences having interesting topics.
2. Gap selection
  * Instead of arbitrarily ranking tags importance, we could have trained a classifier on the relevance of gaps, with a dataset of "good gapFills".
3. Distractor selection
  * We could train a classifier for selection of relevant distractors, using different features (string length, POS tags, similarity, .etc).
4. Coding style
  * The back-end code could have been written using a Functional coding style,  using a library like Ramda (http://ramdajs.com/), and immutable data structures. It could make testing and future changes/tweaks easier to implement.
5. Testing the performance of the pipeline.
  * We could use crowdsourcing to assess the performance of the generated gaps and distractors. For example: Each person could give a score on the relevance of the gapFill (see paper in the references that uses Amazon M-Turk).




### Used frameworks and libraries <a name="frameworks"></a>

**Web stack**

React, NodeJS, Express

**NLP Libraries**

* Natural: https://github.com/NaturalNode/natural
* Compromise: https://github.com/nlp-compromise/compromise
* Word2Vec data: https://github.com/turbomaze/word2vecjson

**Code style**

* Linter: StandardJS
* Comments: JsDOC

**Tests**

``` node src/tests/tests.js ```

### References <a name="ref"></a>

* LSA definition: https://en.wikipedia.org/wiki/Latent_semantic_analysis
* TF IDF definition: https://en.wikipedia.org/wiki/Tf%E2%80%93idf
* Automatic Gap-Fill Question Generation from Educational Texts: http://www.aclweb.org/anthology/W15-0618
* How to split sentences: https://tech.grammarly.com/blog/posts/How-to-Split-Sentences.html
