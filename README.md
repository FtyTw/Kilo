| Statements                                                                          | Branches                                                                          | Functions                                                                          | Lines                                                                          |
| ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| ![Statements](https://img.shields.io/badge/Coverage-0%25-red.svg 'Make me better!') | ![Branches](https://img.shields.io/badge/Coverage-0%25-red.svg 'Make me better!') | ![Functions](https://img.shields.io/badge/Coverage-0%25-red.svg 'Make me better!') | ![Lines](https://img.shields.io/badge/Coverage-0%25-red.svg 'Make me better!') |

## Table of Contents

1. [Intro](#intro)
1. [Development prerequisites](#development-prerequisites)
1. [Setup for mac](#setup-for-mac)
1. [Git conventions](#git-conventions)
1. [Run application](#run-application)
1. [Additional resources](#additional-resources)
1. [Troubleshooting](#troubleshooting)
1. **[React/JSX style guide](STYLE_GUIDE_DOC.md)**

## Intro

This is boilerplate repository for `react-native` project.
This boilerplate should be used to initiate every `react-native` project in Kilo.Health.

**Usage:**

1. Clone/Download this repo
2. Run `yarn restart`
3. Run `yarn ios` in a second terminal tab
4. Go read React/JSX style guide 👀
5. Go code 🚀

**Fastlane setup:**

1. _fastlane/**Matchfile:**_ Enter your `app_identifier`
   e.g. _com.kilogroup.projectname_
2. _fastlane/**Fastline:**_ Enter your app name to fields `workspace` and `scheme` and edit path to firebase config script.
3. _fastlane/**Appfile:**_ Add your `app_identifier` and `package_name`
   e.g. _app_identifier("com.kilogroup.projectname")_ and _package_name("com.kiloprojectname")_

**Sentry setup:**

1. Fill in your project name `defaults.project=<your-project-name>` at _**ios/sentry.properties:**_ and _**android/sentry.properties:**_

**Managing locales:**

We're currently using [i18next](https://www.i18next.com/) with [react-i18next](https://react.i18next.com/). Boilerplate includes a working locale demo with language change handler.

Changing language is easy:

```
import { locale } from 'src/utils/locale';

const languageHandler = (lang) => {
    locale.changeLanguage(lang);
}
```

Locale config can be found in `src/utils/locale/`. Language files are located at `src/assets/locale/`.

## Development prerequisites

- Yarn
- Node
- Fastlane
- Cocapods
- Xcode
- Android Studio
- react-native-cli

## Setup for mac

**PRO TIP:** Make sure you’re connected to the internet!🙃

Open your terminal or run it inside this project's integrated terminal:

```bash
git --version

/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"

chmod -R 777 ./scripts
./scripts/reactNativeStarterPack.sh
```

**NOTE:** Script doesn't cover Xcode installation so you have to grab it from [here.](https://developer.apple.com/xcode/resources/)

## Git conventions

Branches should be named in a following manner:

```bash
// new feature
git checkout -b feature/comprehensible-name-<trello card number (if exists)>

// refactoring
git checkout -b refactoring/comprehensible-name-<trello card number (if exists)>

// bugfix
git checkout -b fix/comprehensible-name-<trello card number (if exists)>

// dependency updates
git checkout -b update/package-name-<trello card number (if exists)>
git checkout -b update/orther-comprehensible-name-<trello card number (if exists)>
```

Make sure that for every bigger change you have checked out to new branch.
Same goes for complicated package updates (e.g. `react-native`). Also make
sure to be on the new branch when changing something inside native projects
(namely `ios` and `android` directories).

## Run application

**NOTE:** We always use **Yarn** as our default package manager tool.

```bash
// start development server
yarn start

// run ios app
yarn ios

// run android app
yarn android
```

## Additional resources

- [READ Kilo.Health React/JSX style guide](STYLE_GUIDE_DOC.md)
- [Painless React Native Setup for Mac](https://shift.infinite.red/painless-react-native-setup-for-mac-windows-linux-956c23d2abf9)
- [Fastlane setup](https://carloscuesta.me/blog/shipping-react-native-apps-with-fastlane/)

## Troubleshooting

Here we add troubleshooting tips if something needs more setup or one of the module is not working properly.

If you have encountered some problem and managed to fix it please leave a comment.
Comment should be written in following manner:

1. Node module name with version (for example: `react-native@0.50.0`)
1. Error name or text
1. Platform [`ios`, `android`]
1. Steps to reproduce (if there is some)
1. Solution or link to solution

---

...
