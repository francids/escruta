# Escruta - Backend

## Getting Started

```shell
git clone git@github.com:francids/escruta.git
cd escruta/backend
```

I recommend using [Intellij IDEA](https://www.jetbrains.com/idea/) to develop this backend.

```shell
./gradlew bootRun # To start the development server
```

## Building for Production

```shell
./gradlew clean build
```

## Environment Variables

The application uses the following environment variables:

```shell
ESCRUTA_BACKEND_PORT
ESCRUTA_DATABASE_URL
ESCRUTA_DATABASE_USERNAME
ESCRUTA_DATABASE_PASSWORD
ESCRUTA_JWT_SECRET
ESCRUTA_AI_BASE_URL
ESCRUTA_AI_API_KEY
ESCRUTA_AI_MODEL
ESCRUTA_AI_CHAT_COMPLETIONS_PATH
ESCRUTA_AI_EMBEDDING_MODEL
ESCRUTA_AI_EMBEDDING_DIMENSIONS
```

See the [application.yml](./src/main/resources/application.yml) file to determine the default values.
