---
id: db_schema
title: Database Schema
---

This page documents the schema of the website with some notes on my thought process behind the design. Although Firestore does not require one, keeping a consistent data model makes processing data much easier (in my opinion). There are three root `collection`s used by the website, `info`, `metadata` and `projects`.

## Info Collection

An `info document` named `basic` contains information about me. The schema is in the following tables. There are two subcollections in this document, `work` and `skills`, storing work experience items and skills category documents respectively.

Education items are store in an array as a property in a document, instead of storing in a separate subcollection. This is because the number of education items will not grow in the near future (my career plans). Retrieving education information is easier and updating the entire array is not a problem (not frequent and not much items).

On the contrary, work experiences items are stored in a separate subcollection because the number of items is expected to grow. In addition, updating the individual item is easier and pagination and sorting can be performed more easily (e.g., query X most recent items).

Skill items are also stored in a spearate subcollection, but for a different reason. Each document stores the related skills of a specific category (e.g., Backend Development). While the number of documents is not expected to grow much, the size of the content (number of skills) will (should) grow. If skills are stored in `info document` as education, the size of the document my grow too big. Also, rearranging the skills to different category or renaming a category is easier. A priority field is associated with each category so that the order of skill categories (displayed) can be adjusted.

An additional `index` is established in Firestore, sorting documents with `priority` property in `desc` order and update time property in `desc` order (serve as a tiebreaker). This index is setup because otherwise I have to enforce the uniqueness of `priority` values (to allow pagination with cursor in the websitee).

#### Info Document Schema

| property | type | required | description |
| --- | --- | --- | ---|
| name | Text string | true | Full name. E.g., `Stephen Lin` |
| summary | Text string | true | Short description. |
| email | Text string | true | Email address. |
| image | Text string | true | Avatar url. |
| location | Map | true | The location I lived. |
| location.city | Text string | true | City name. E.g., `Hsinchu` |
| location.region | Text string | true | Region name. |
| phone | Text string | true | Phone number. |
| url | Text string | true | Personal website url. |
| resumeUrl | Text string | true | Resume url. |
| profile | Map<Text string, `Profile entity`> | true | Map of my other profiles. Keys in the map represent the type of profile, e.g., `github`. |
| education | Array(`Education entity`) | true | List of my education information, sorted in reverse chronological order. |

#### Profile Entity Schema

| property | type | required | description |
| --- | --- | --- | ---|
| url | Text string | true | Url of the profile page. |
| username | Text string | false | Username. |

#### Education Entity Schema

| property | type | required | description |
| --- | --- | --- | ---|
| area | Text string | true | Field of study. E.g., Communication Engineering. |
| institution | Text string | true | Institution name. E.g., National Chiao Tung University. |
| studyType | Text string | true | Degree type. E.g., Bachelor. |
| startDate | Date | true | Start time. |
| endDate | Date | true | End time. |

#### Work Subcollection Schema

| property | type | required | description |
| --- | --- | --- | ---|
| name | Text string | true | Company name. E.g., `Gemtek Technology` |
| position | Text string | true | My job title. E.g., `Software Engineer` |
| location | Text string | true | Where I worked. |
| summary | Text string | true | Summary of this job. |
| description | Text string | false | Description of the company. |
| startDate | Date | true | Start time of this job. |
| endDate | Date | true | End time of this job. |
| highlights | Array(Text string) | true | List of descriptions on this job. |

#### Skills Subcollection Schema

| property | type | required | description |
| --- | --- | --- | ---|
| name | Text string | true | Displayed category name. E.g., `Backend Developmen` |
| priority | Integer | true | Priority of this category. |
| updatedAt | Date | true | Last update time of this category. |
| items | Array(`Skill entity`) | true | List of skill items in this category. |

#### Skill Entity Schema

| property | type | required | description |
| --- | --- | --- | ---|
| name | Text string | true | Displayed skill name. E.g., `Redis` |
| description | Text string | true | Short description. |
| url | Text string | true | Link to a related website. |

## Metadata Collection

This collection contains metadata, including keyword, project category, and language. Project categories and programming language resources are stored in document `main` while keywords are stored in document `keyword`. `Map`s that associate `string keys` to `Resource entity` are stored as properties in these documents. For example, a resource map for programming languages can have `java` as one key and a resource entity `displayName=Java` as the associated value.

#### Main Metadata Schema

| property | type | required | description |
| --- | --- | --- | ---|
| languages | Map<Text string, `Resource entity`> | true | Resource map for programming languages |
| types | Map<Text string, `Resource entity`> | true | Resource map for project categories |

#### Keyword Metadata Schema

| property | type | required | description |
| --- | --- | --- | ---|
| keywords | Map<Text string, `Resource entity`> | true | Resource map for keywords |

#### Resource Entity Schema

| property | type | required | description |
| --- | --- | --- | ---|
| displayName | Text string | true | Name of the resource |
| description | Text string | false | Description of the resource |

#### Compound Index List

| collection | value | description |
| --- | --- | --- |
| skills | `priority` => `desc`, `updatedAt` => `desc` | For skill category. |
| work | `endDate` => `desc`, `startDate` => `desc` | |

## Projects Collection

This collection contains information about my personal projects. Project categories, languages, keywords are stored in `Map`s where keys are the **corresponding resource key** and value is the timestamp of the **last update time** of this project. For example, a project that uses Java programming can have a resource map with `key` equals `java`, which maps to an item in the `main` document of `metadata` collection. Storing like this allows filtering projects that uses a specific language (or has specified category or keywords) **and** sort the projects in reverse chronological order.

Compound indexes are created to support additional filtering (by `active` property). These indexes enable queries that filter projects by both language/category and activeness while sorted in reverse chronological order. However, an extra index per language/category has to be established. This is the reason why filtering projects by both keywords and activeness is not supported (keyword list grows very fast while language and category rarely grows).

#### Project Document Schema

| property | type | required | description |
| --- | --- | --- | ---|
| name | Text string | true | Project name. E.g., `Machine` |
| url | Text string | true | Link to the project's website. |
| description | Text string | true | Short description for this project. |
| primaryLanguage | Text string | true | Resource key of the primary programming language used in this project. E.g., `java` |
| primaryType | Text string | true | Resource key of the primary category. E.g., `backend` |
| startDate | Date | true | Start time of this project. |
| endDate | Date | true | Last update time of this project. |
| active | Boolean | true | Project status, `true` if the project is still under active development. |
| featured | Boolean | true | Whether this project is featured. |
| coverImageUrl | Text string | true | Link to the cover image. |
| highlights | Array(Text string) | true | List of important things of this project. |
| keywords | Map<Text string, Integer> | true | Keywords of this project, an index map where `key` is a `keyword key` and `value` is an integer representing the last update time. |
| languages | Map<Text string, Integer> | true | Programming languages used in this project, an index map where `key` is a `language key` and `value` is an integer representing the last update time. |
| types | Map<Text string, Integer> | true | Categories of this project, an index map where `key` is a `category key` and `value` is an integer representing the last update time. |
| links | `LinkMap entity` | true | A map of links to documentations, github repositories, demo images and demo videos. |

#### Link Map Entity Schema

| property | type | required | description |
| --- | --- | --- | ---|
| doc | Array(`Link entity`) | true | List of links to documents of this project. |
| github | Array(`Link entity`) | true | List of links to github repositories of this project. |
| demoImage | Array(`Link entity`) | true | List of links to demo images of this project. |
| demoVideo | Array(`Link entity`) | true | List of links to demo videos of this project. |

#### Link Entity Schema

| property | type | required | description |
| --- | --- | --- | ---|
| name | Text string | true | Link title. E.g., `Design document` |
| url | Text string | true | Url of this link. |
| description | Text string false | true | Description of this link. |

#### Compound Index List

| collection | value | description |
| --- | --- | --- |
| projects | `active` => `asc`, `languages.<LANGUAGE_KEY>` => `desc` | `LANGUAGE_KEY` is the key in the metadata resource map. One of this index is required per language. E.g., index will be `languages.java` if filtering on Java language with key `java`. |
| projects | `active` => `asc`, `types.<CATEGORY_KEY>` => `desc` | `CATEGORY_KEY` is the key in the metadata resource map. One of this index is required per project category. |
| projects | `featured` => `asc`, `endDate` => `desc` | Filter projects by `featured` and sort projects in reverse chronological order (on last update time). |