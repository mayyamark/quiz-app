# Quiz App Backend

## Project description

The backend part of the the Quiz App, where teachers can create categories, quizzes, and check students' performance and students solve quizzes and view leaderboard.

## Tech stack

This is a JavaScript application. The main packages, that are used are:

- Express JS
- Passport and Passport-JWT
- MariaDB
- Nodemon

## Directory Structure

```bash
server
├── auth
│   └── **/*.js
├── controllers
│   └── **/*.js
├── data
│   ├── blacklist-data
│   │   └── **/*.js
│   └── quiz-app-data
│       └── **/*.js
├── middlewares
│   └── **/*.js
├── services
│   └── **/*.js
├── validators
│   └── **/*.schema.js
├── app.js
├── config.js
├── .dockerignore
├── .eslintrc.js
├── .gitignore
├── Dockerfile
├── package.json
├── package-lock.json
└── README.md
```

- **auth**: a directory with configuration for the authentication;
- **controllers**: our Express routers;
- **data**: the place where are all of our SQL queries;
  - **blacklist-data**: SQL queries related with the blacklist database;
  - **quiz-app-data**: SQL queries related with the quiz-app database;
- **middlewares**: a directory with some custom middlewares;
- **services**: the place where our business logic is;
- **validators**: all schema validations for the requests with a body;

## Endpoints

### Authentication

1. **POST/auth/registration/** - _Registers a new user._
   <details>
   <summary>Click for more details</summary>
       - An example for a request body (avatars are randomly picked in the UI):

   ```json
   {
     "avatar": "/static/media/9.3e9903d5.png",
     "firstName": "Mayya",
     "lastName": "Mark",
     "password": "@1Aa",
     "username": "mayyamark"
   }
   ```

   - An example for a response:

   ```json
   {
     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEwMiwidXNlcm5hbWUiOiJtYXl5YW1hcmsiLCJmaXJzdE5hbWUiOiJNYXl5YSIsImxhc3ROYW1lIjoiTWFyayIsInJvbGUiOiJzdHVkZW50IiwiYXZhdGFyIjoiL3N0YXRpYy9tZWRpYS85LjNlOTkwM2Q1LnBuZyIsImlhdCI6MTY0MTMxMDgxNCwiZXhwIjoxNjQxMzE0NDE0fQ.t4sqjE_3w6-y1_DGZG3CKn20TaGI2N3DKiNHMnn2u_Q"
   }
   ```

   </details>

2. **POST/auth/session** - _Logs in the user._

   <details>
   <summary>Click for more details</summary>
    - An example for a request body:

   ```json
   {
     "username": "gosho",
     "password": "1234"
   }
   ```

   - An example for a response:

   ```json
   {
     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsInVzZXJuYW1lIjoiZ29zaG8iLCJmaXJzdE5hbWUiOiJHZW9yZ2kiLCJsYXN0TmFtZSI6Ikdlb3JnaWV2Iiwicm9sZSI6InRlYWNoZXIiLCJhdmF0YXIiOiIvc3RhdGljL21lZGlhLzIuYjU3MDMyOTYucG5nIiwiaWF0IjoxNjQxMzEwNjE1LCJleHAiOjE2NDEzMTQyMTV9.I67sxrAzTCsSGoDNlq_oLQkbANy3A71v3ZIyHktbmi4"
   }
   ```

   </details>

3. **DELETE/auth/session** - _Logs out the user._
   <details>
   <summary>Click for more details</summary>

   - Requires a Bearer token.

   - Does not need a request body.

   - An example for a response:

   ```json
   {
     "message": "Logged out!"
   }
   ```

   </details>

### Quizzes

All of these endpoints require a Bearer token.

1.  **GET/quizzes** - _Gets all quizzes with optional query parameters._
    <details>
    <summary>Click for more details</summary>

    - Reequires a Bearer token.

    - Available query params:
      - teacher - partial teacher name
      - category - category name
      - page - page number
      - limit - results per page
    - An example: `GET/quizzes?page=2&limit=2&teacher=go&category=chemistry`

    - An example for a response:

    ```json
    {
      "quizzes": [
        {
          "id": 8,
          "name": "Group IIA",
          "category": "chemistry",
          "time": 20,
          "avatar": "/static/media/2.b5703296.png",
          "username": "gosho",
          "firstName": "Georgi",
          "lastName": "Georgiev"
        },
        {
          "id": 7,
          "name": "Group IA",
          "category": "chemistry",
          "time": 20,
          "avatar": "/static/media/2.b5703296.png",
          "username": "gosho",
          "firstName": "Georgi",
          "lastName": "Georgiev"
        }
      ],
      "currentPage": 2,
      "quizzesCount": 5,
      "hasNextPage": true,
      "hasPreviousPage": true
    }
    ```

    </details>

1.  **POST/quizzes/:id** - _Start solving a quiz._
       <details>
       <summary>Click for more details</summary>

    - Requires a Bearer token.

    - An example: `POST/quizzes/1`
    - An example for a response:

    ```json
    {
      "quiz": {
        "id": 1,
        "name": "Addition",
        "category": "mathematics",
        "time": 20,
        "username": "pesho",
        "firstName": "Petyr",
        "lastName": "Petrov",
        "questions": [
          {
            "id": 1,
            "points": 1,
            "text": "111 + 222 + 333 = ?",
            "answers": [
              {
                "id": 1,
                "questionId": 1,
                "text": "606",
                "isTrue": 0
              },
              {
                "id": 2,
                "questionId": 1,
                "text": "666",
                "isTrue": 1
              },
              {
                "id": 3,
                "questionId": 1,
                "text": "600",
                "isTrue": 0
              },
              {
                "id": 4,
                "questionId": 1,
                "text": "660",
                "isTrue": 0
              }
            ]
          },
          {
            "id": 2,
            "points": 1,
            "text": "222 + 888 = ?",
            "answers": [
              {
                "id": 5,
                "questionId": 2,
                "text": "1000",
                "isTrue": 0
              },
              {
                "id": 6,
                "questionId": 2,
                "text": "1001",
                "isTrue": 0
              },
              {
                "id": 7,
                "questionId": 2,
                "text": "1110",
                "isTrue": 1
              },
              {
                "id": 8,
                "questionId": 2,
                "text": "1111",
                "isTrue": 0
              }
            ]
          },
          {
            "id": 3,
            "points": 1,
            "text": "366 + 258 = ?",
            "answers": [
              {
                "id": 9,
                "questionId": 3,
                "text": "624",
                "isTrue": 1
              },
              {
                "id": 10,
                "questionId": 3,
                "text": "664",
                "isTrue": 0
              },
              {
                "id": 11,
                "questionId": 3,
                "text": "644",
                "isTrue": 0
              },
              {
                "id": 12,
                "questionId": 3,
                "text": "646",
                "isTrue": 0
              }
            ]
          },
          {
            "id": 4,
            "points": 1,
            "text": "485 + 239 + 712 = ?",
            "answers": [
              {
                "id": 13,
                "questionId": 4,
                "text": "1136",
                "isTrue": 0
              },
              {
                "id": 14,
                "questionId": 4,
                "text": "1436",
                "isTrue": 1
              },
              {
                "id": 15,
                "questionId": 4,
                "text": "1443",
                "isTrue": 0
              },
              {
                "id": 16,
                "questionId": 4,
                "text": "1432",
                "isTrue": 0
              }
            ]
          },
          {
            "id": 5,
            "points": 1,
            "text": "588 + 395 = ?",
            "answers": [
              {
                "id": 17,
                "questionId": 5,
                "text": "988",
                "isTrue": 0
              },
              {
                "id": 18,
                "questionId": 5,
                "text": "933",
                "isTrue": 0
              },
              {
                "id": 19,
                "questionId": 5,
                "text": "938",
                "isTrue": 0
              },
              {
                "id": 20,
                "questionId": 5,
                "text": "983",
                "isTrue": 1
              }
            ]
          },
          {
            "id": 6,
            "points": 1,
            "text": "746 + 698 + 102 = ?",
            "answers": [
              {
                "id": 21,
                "questionId": 6,
                "text": "1544",
                "isTrue": 0
              },
              {
                "id": 22,
                "questionId": 6,
                "text": "1546",
                "isTrue": 1
              },
              {
                "id": 23,
                "questionId": 6,
                "text": "1446",
                "isTrue": 0
              },
              {
                "id": 24,
                "questionId": 6,
                "text": "1556",
                "isTrue": 0
              }
            ]
          },
          {
            "id": 7,
            "points": 1,
            "text": "965 + 100 + 257 = ?",
            "answers": [
              {
                "id": 25,
                "questionId": 7,
                "text": "1322",
                "isTrue": 1
              },
              {
                "id": 26,
                "questionId": 7,
                "text": "1323",
                "isTrue": 0
              },
              {
                "id": 27,
                "questionId": 7,
                "text": "1222",
                "isTrue": 0
              },
              {
                "id": 28,
                "questionId": 7,
                "text": "1333",
                "isTrue": 0
              }
            ]
          },
          {
            "id": 8,
            "points": 1,
            "text": "871 + 666 = ?",
            "answers": [
              {
                "id": 29,
                "questionId": 8,
                "text": "1537",
                "isTrue": 1
              },
              {
                "id": 30,
                "questionId": 8,
                "text": "1533",
                "isTrue": 0
              },
              {
                "id": 31,
                "questionId": 8,
                "text": "1337",
                "isTrue": 0
              },
              {
                "id": 32,
                "questionId": 8,
                "text": "1737",
                "isTrue": 0
              }
            ]
          },
          {
            "id": 9,
            "points": 1,
            "text": "241 + 444 + 69 = ?",
            "answers": [
              {
                "id": 33,
                "questionId": 9,
                "text": "744",
                "isTrue": 0
              },
              {
                "id": 34,
                "questionId": 9,
                "text": "755",
                "isTrue": 0
              },
              {
                "id": 35,
                "questionId": 9,
                "text": "754",
                "isTrue": 1
              },
              {
                "id": 36,
                "questionId": 9,
                "text": "757",
                "isTrue": 0
              }
            ]
          },
          {
            "id": 10,
            "points": 1,
            "text": "999 + 25 + 11 = ?",
            "answers": [
              {
                "id": 37,
                "questionId": 10,
                "text": "1035",
                "isTrue": 1
              },
              {
                "id": 38,
                "questionId": 10,
                "text": "1033",
                "isTrue": 0
              },
              {
                "id": 39,
                "questionId": 10,
                "text": "1055",
                "isTrue": 0
              },
              {
                "id": 40,
                "questionId": 10,
                "text": "1053",
                "isTrue": 0
              }
            ]
          }
        ]
      },
      "startTime": "2022-01-04T15:48:22.133Z"
    }
    ```

       </details>

1.  **PUT/quizzes/:id** - _Finish solving a quiz._
    <details>
    <summary>Click for more details</summary>

        - Requires a Bearer token.

        - An example: `PUT/quiz/1`

        - An example of a request body:

        ```json
        {
          "id": 1,
          "questionAnswers": [
            {
              "id": 1,
              "markedTrue": [1]
            },
            {
              "id": 2,
              "markedTrue": [6]
            }
          ]
        }
        ```

        - An example for a response:

        ```json
        {
          "score": 0,
          "totalScore": 10,
          "history": {
            "id": 483,
            "name": "Addition",
            "category": "mathematics",
            "started": "2022-01-04T15:48:22.000Z",
            "finished": "2022-01-04T15:49:26.000Z",
            "score": 0
          }
        }
        ```

    </details>

1.  **POST/quizzes** - _Create a quiz. For users with a teacher role only._
    <details>
    <summary>Click for more details</summary>

    - Requires a Bearer token.
    - Requires a `Teacher` role.

    - An example of a request body:

      ```json
      {
        "name": "Multiply",
        "timeLimit": 10,
        "category": "mathematics",
        "questions": [
          {
            "text": "1 * 1 = ?",
            "points": "1",
            "answers": [
              {
                "text": "1",
                "isTrue": true
              },
              {
                "text": "100",
                "isTrue": false
              }
            ]
          },
          {
            "text": "10 * 10 = ?",
            "points": "1",
            "answers": [
              {
                "text": "100",
                "isTrue": true
              },
              {
                "text": "1",
                "isTrue": false
              }
            ]
          }
        ]
      }
      ```

    - An example for a response:

      ```json
      {
        "id": 101,
        "name": "Multiply",
        "time": 10,
        "teacher": {
          "id": 2,
          "username": "gosho",
          "firstName": "Georgi",
          "lastName": "Georgiev",
          "role": "teacher",
          "avatar": "/static/media/2.b5703296.png"
        },
        "category": {
          "id": 1,
          "name": "mathematics"
        },
        "questions": [
          {
            "id": 317,
            "points": "1",
            "text": "1 * 1 = ?",
            "answers": [
              {
                "id": 1078,
                "text": "1",
                "isTrue": true
              },
              {
                "id": 1079,
                "text": "100",
                "isTrue": false
              }
            ]
          },
          {
            "id": 318,
            "points": "1",
            "text": "10 * 10 = ?",
            "answers": [
              {
                "id": 1080,
                "text": "100",
                "isTrue": true
              },
              {
                "id": 1081,
                "text": "1",
                "isTrue": false
              }
            ]
          }
        ]
      }
      ```

    </details>

1.  **PUT/quizzes/:id** - _Finish solving a quiz._
    <details>
    <summary>Click for more details</summary>

    - Requires a Bearer token.

    - An example: `PUT/quiz/1`

    - An example of a request body:

      ```json
      {
        "id": 1,
        "questionAnswers": [
          {
            "id": 1,
            "markedTrue": [1]
          },
          {
            "id": 2,
            "markedTrue": [6]
          }
        ]
      }
      ```

    - An example for a response:

      ```json
      {
        "score": 0,
        "totalScore": 10,
        "history": {
          "id": 483,
          "name": "Addition",
          "category": "mathematics",
          "started": "2022-01-04T15:48:22.000Z",
          "finished": "2022-01-04T15:49:26.000Z",
          "score": 0
        }
      }
      ```

    </details>

1.  **GET/quizzes/:id/history** - _Get the results for the given quiz._
    <details>
    <summary>Click for more details</summary>

    - Requires a Bearer token.
    - Requires a `Teacher` role.

    - An example: `GET/quizzes/1/history`

    - An example for a response:

      ```json
      {
        "history": [
          {
            "username": "ico",
            "firstName": "Hristo",
            "lastName": "Hristov",
            "avatar": "/static/media/1.9df5147d.png",
            "started": "2020-11-29T17:59:47.000Z",
            "score": 4
          },
          {
            "username": "kris",
            "firstName": "Kristian",
            "lastName": "Kristianov",
            "avatar": "/static/media/10.decf6048.png",
            "started": "2020-11-29T22:34:34.000Z",
            "score": 2
          }
        ]
      }
      ```

      </details>

1.  **GET/quizzes/:id** - _View the given quiz. For users with a teacher role only._
    <details>
    <summary>Click for more details</summary>

    - Requires a Bearer token.
    - Requires a `Teacher` role.

    - An example: `GET/quizzes/1`
    - An example for a response:

      ```json
      {
        "quiz": {
          "id": 1,
          "name": "Addition",
          "category": "mathematics",
          "time": 20,
          "username": "pesho",
          "firstName": "Petyr",
          "lastName": "Petrov",
          "questions": [
            {
              "id": 1,
              "points": 1,
              "text": "111 + 222 + 333 = ?",
              "answers": [
                {
                  "id": 1,
                  "questionId": 1,
                  "text": "606",
                  "isTrue": 0
                },
                {
                  "id": 2,
                  "questionId": 1,
                  "text": "666",
                  "isTrue": 1
                },
                {
                  "id": 3,
                  "questionId": 1,
                  "text": "600",
                  "isTrue": 0
                },
                {
                  "id": 4,
                  "questionId": 1,
                  "text": "660",
                  "isTrue": 0
                }
              ]
            },
            {
              "id": 2,
              "points": 1,
              "text": "222 + 888 = ?",
              "answers": [
                {
                  "id": 5,
                  "questionId": 2,
                  "text": "1000",
                  "isTrue": 0
                },
                {
                  "id": 6,
                  "questionId": 2,
                  "text": "1001",
                  "isTrue": 0
                },
                {
                  "id": 7,
                  "questionId": 2,
                  "text": "1110",
                  "isTrue": 1
                },
                {
                  "id": 8,
                  "questionId": 2,
                  "text": "1111",
                  "isTrue": 0
                }
              ]
            },
            {
              "id": 3,
              "points": 1,
              "text": "366 + 258 = ?",
              "answers": [
                {
                  "id": 9,
                  "questionId": 3,
                  "text": "624",
                  "isTrue": 1
                },
                {
                  "id": 10,
                  "questionId": 3,
                  "text": "664",
                  "isTrue": 0
                },
                {
                  "id": 11,
                  "questionId": 3,
                  "text": "644",
                  "isTrue": 0
                },
                {
                  "id": 12,
                  "questionId": 3,
                  "text": "646",
                  "isTrue": 0
                }
              ]
            },
            {
              "id": 4,
              "points": 1,
              "text": "485 + 239 + 712 = ?",
              "answers": [
                {
                  "id": 13,
                  "questionId": 4,
                  "text": "1136",
                  "isTrue": 0
                },
                {
                  "id": 14,
                  "questionId": 4,
                  "text": "1436",
                  "isTrue": 1
                },
                {
                  "id": 15,
                  "questionId": 4,
                  "text": "1443",
                  "isTrue": 0
                },
                {
                  "id": 16,
                  "questionId": 4,
                  "text": "1432",
                  "isTrue": 0
                }
              ]
            },
            {
              "id": 5,
              "points": 1,
              "text": "588 + 395 = ?",
              "answers": [
                {
                  "id": 17,
                  "questionId": 5,
                  "text": "988",
                  "isTrue": 0
                },
                {
                  "id": 18,
                  "questionId": 5,
                  "text": "933",
                  "isTrue": 0
                },
                {
                  "id": 19,
                  "questionId": 5,
                  "text": "938",
                  "isTrue": 0
                },
                {
                  "id": 20,
                  "questionId": 5,
                  "text": "983",
                  "isTrue": 1
                }
              ]
            },
            {
              "id": 6,
              "points": 1,
              "text": "746 + 698 + 102 = ?",
              "answers": [
                {
                  "id": 21,
                  "questionId": 6,
                  "text": "1544",
                  "isTrue": 0
                },
                {
                  "id": 22,
                  "questionId": 6,
                  "text": "1546",
                  "isTrue": 1
                },
                {
                  "id": 23,
                  "questionId": 6,
                  "text": "1446",
                  "isTrue": 0
                },
                {
                  "id": 24,
                  "questionId": 6,
                  "text": "1556",
                  "isTrue": 0
                }
              ]
            },
            {
              "id": 7,
              "points": 1,
              "text": "965 + 100 + 257 = ?",
              "answers": [
                {
                  "id": 25,
                  "questionId": 7,
                  "text": "1322",
                  "isTrue": 1
                },
                {
                  "id": 26,
                  "questionId": 7,
                  "text": "1323",
                  "isTrue": 0
                },
                {
                  "id": 27,
                  "questionId": 7,
                  "text": "1222",
                  "isTrue": 0
                },
                {
                  "id": 28,
                  "questionId": 7,
                  "text": "1333",
                  "isTrue": 0
                }
              ]
            },
            {
              "id": 8,
              "points": 1,
              "text": "871 + 666 = ?",
              "answers": [
                {
                  "id": 29,
                  "questionId": 8,
                  "text": "1537",
                  "isTrue": 1
                },
                {
                  "id": 30,
                  "questionId": 8,
                  "text": "1533",
                  "isTrue": 0
                },
                {
                  "id": 31,
                  "questionId": 8,
                  "text": "1337",
                  "isTrue": 0
                },
                {
                  "id": 32,
                  "questionId": 8,
                  "text": "1737",
                  "isTrue": 0
                }
              ]
            },
            {
              "id": 9,
              "points": 1,
              "text": "241 + 444 + 69 = ?",
              "answers": [
                {
                  "id": 33,
                  "questionId": 9,
                  "text": "744",
                  "isTrue": 0
                },
                {
                  "id": 34,
                  "questionId": 9,
                  "text": "755",
                  "isTrue": 0
                },
                {
                  "id": 35,
                  "questionId": 9,
                  "text": "754",
                  "isTrue": 1
                },
                {
                  "id": 36,
                  "questionId": 9,
                  "text": "757",
                  "isTrue": 0
                }
              ]
            },
            {
              "id": 10,
              "points": 1,
              "text": "999 + 25 + 11 = ?",
              "answers": [
                {
                  "id": 37,
                  "questionId": 10,
                  "text": "1035",
                  "isTrue": 1
                },
                {
                  "id": 38,
                  "questionId": 10,
                  "text": "1033",
                  "isTrue": 0
                },
                {
                  "id": 39,
                  "questionId": 10,
                  "text": "1055",
                  "isTrue": 0
                },
                {
                  "id": 40,
                  "questionId": 10,
                  "text": "1053",
                  "isTrue": 0
                }
              ]
            }
          ]
        }
      }
      ```

    </details>

### Students

All of these endpoints require a Bearer token and a `Student` role.

1.  **GET/students** - _View the leaderboard. Optional query parameters are available._
    <details>
    <summary>Click for more details</summary>

    - Requires a Bearer token.
    - Requires a `Student` role.
    - Optional query parameters:

      - page - page number
      - limit - number of results per page
      - username - partial username

    - An example: `GET/students?page=1&limit=5&username=a`

    - An example for a response:

      ```json
      {
        "students": [
          {
            "id": 52,
            "avatar": "/static/media/2.91ff2671.png",
            "username": "blago",
            "firstName": "Blagoy",
            "lastName": "Blagoev",
            "totalScore": 79
          },
          {
            "id": 48,
            "avatar": "/static/media/8.eafdff08.png",
            "username": "olga",
            "firstName": "Olga",
            "lastName": "Olgova",
            "totalScore": 45
          }
        ],
        "currentPage": 1,
        "studentsCount": 38,
        "hasNextPage": true,
        "hasPreviousPage": false
      }
      ```

    </details>

1.  **GET/students/:id/history** - _View a srudent's own history. Optional query parameters are available._
    <details>
    <summary>Click for more details</summary>

    - Requires a Bearer token.
    - Requires a `Student` role.
    - Optional query parameters:

      - page - page number
      - limit - number of results per page
      - quiz - partial quiz name

    - An example: `GET/students/22/history?page=1&limit=2&quiz=a`
    - An example for a response:

      ```json
      {
        "history": [
          {
            "id": 10,
            "name": "Bronze Age",
            "category": "history",
            "started": "2020-11-29T18:01:48.000Z",
            "finished": "2020-11-29T18:01:51.000Z",
            "score": 2
          },
          {
            "id": 8,
            "name": "Group IIA",
            "category": "chemistry",
            "started": "2020-11-29T18:01:11.000Z",
            "finished": "2020-11-29T18:01:32.000Z",
            "score": 3
          }
        ],
        "currentPage": 1,
        "historyCount": 3,
        "hasNextPage": true,
        "hasPreviousPage": false
      }
      ```

    </details>

### Categories

All of these endpoints require a Bearer token.

1.  **GET/categories** - _View all categories alpha sorted._
    <details>
    <summary>Click for more details</summary>

    - Requires a Bearer token.
    - An example for a response:

      ```json
      [
        {
          "id": 5,
          "name": "biology",
          "isActive": true
        },
        {
          "id": 2,
          "name": "chemistry",
          "isActive": true
        },
        {
          "id": 7,
          "name": "geography",
          "isActive": true
        },
        {
          "id": 3,
          "name": "history",
          "isActive": true
        },
        {
          "id": 1,
          "name": "mathematics",
          "isActive": true
        },
        {
          "id": 6,
          "name": "music",
          "isActive": true
        },
        {
          "id": 4,
          "name": "physics",
          "isActive": true
        },
        {
          "id": 8,
          "name": "sports",
          "isActive": true
        }
      ]
      ```

    </details>

1.  **POST/categories** - _Create a category. For users with a teacher role only._
    <details>
    <summary>Click for more details</summary>

    - Requires a Bearer token.
    - Requires a `Teacher` role.

    - An example of a request body:

      ```json
      {
        "name": "music"
      }
      ```

    - An example for a response (isActive === false, means that there are not associated quizzes to this category yet):

      ```json
      {
        "id": 10,
        "name": "music",
        "isActive": false
      }
      ```

    </details>

## Environment variables

| Environment Variable | Default value |
| :------------------- | :------------ |
| DB_HOST              | localhost     |
| DB_USER              | root          |
| DB_PASSWORD          | root          |
| SERVER_PORT          | 5000          |
| SECRET_KEY           | mysecretkey   |

## Running Guide

### 1. Install the dependencies

To install the dependencies in the project directory, run:

```sh
npm install
```

### 2. Install and start MariaDB

[Click here](https://mariadb.com/kb/en/getting-installing-and-upgrading-mariadb/) to get MariaDB. Follow the running guide.

### 3. Run the SQL script from the `database` directory

### 4. Start the application

Then to start the application, run:

```sh
npm start
```

Wait until you see `Listening for quiz requests on port 5000!` in the Terminal.
Open Postman and make a request.
The server will reload if you make edits.
