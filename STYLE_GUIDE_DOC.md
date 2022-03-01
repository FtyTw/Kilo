# Kilo.Health React/JSX Style Guide Doc

## What is this guide about?

This style guide is mostly based on the standards that are currently prevalent in JavaScript
and are used in Kilo.health React/React-Native development process. This document should help and guide
new developers understand the React code style and best practices we adopt.

## Why do we need this document?

> Here's the simple truth: you can't innovate on products without first innovating the way you build them.

> Working in software development and design, we are often required to ship one-off solutions.
> Sometimes we're working within time constraints and sometimes we just haven't yet agreed upon a path forward.
> These one-off solutions aren't inherently bad, but if they aren't built upon a solid foundation, we eventually
> find ourselves having to pay back accrued technical and design debts.

> A unified design and code system is essential to building better and faster:

- **better** because a cohesive experience is more easily understood by our users
- **faster** because it gives us a common language to work with.

## Basic Rules

- Always use JSX syntax.
- Do not use React.createElement unless you're initializing the app from a file that is not JSX.
- Only include one React component per file.
  - However, multiple Stateless, or Pure, Components are allowed per file
- JSX component should always have it's name declared [react/display-name](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/display-name.md)
  - There is one exception when we are using `React.forwardRef`.

## Project Structure

All react-native projects in Kilo.Health should have this upper level structure:

```yaml
src/
├── apis
├── assets
├── components
├── constants
├── containers
├── state
├── styles
├── utils
├── App.js
├── featureEnabler.js
├── config.js
```

This structure helps us better understand what components we use and how they are linked together.
It also helps to modularise them more efficiently and reuse in other projects. We will go trough
all of the subdirectories below.

### Assets

```yaml
assets/
├── animations
├── fonts
├── images
├── locale
└── ...
```

### Components

One of many goals for Mobile team in Kilo.Health is to have good and reusable components.

Inside `components` we have subdirectories which are categorized by component's function.
If component is unique and cant be put inside one of subcategories it should be added inside
`other` components subdirectory. If we hoard up
few different types of header components, then those can be extracted to their own subdirectory
`headers`.

Inside `components` directory. `index.js` file should be used to export all
the components inside `components` directory.

```yaml
components/
├── buttons
├── cards
├── icons
├── inputs
├── items
├── lists
├── modals
├── other
├── texts
├── widgets
├── wrappers
├── ...
└── index.js
```

### Containers

Also known as views or screens. In this subdirectory we have all of our user facing views,
which are categorized by user flow.

`Routes.js` file contains navigation logic which describes how and when
user can navigate to particular screen.

Every subdirectory `<SomeName>Flow` should have a `index.js` file which will be used as a **single export source**.

```yaml
containers/
├── HomeFeed/
|   ├── LoginView.js
|   ├── RegistrationView.js
|   └── index.js
├── LoginFlow
├── ProfileFlow
├── ...
└── Routes.js
```

### State

State directory is dedicated to app level state and business logic which in best case scenario
should be reusable across projects. In Kilo.Health we manage our state using **Redux** and **Redux-Saga**.

```yaml
state/
├── app/
|   ├── AppActions.js
|   ├── AppConstants.js
|   └── AppReducer.js
|   ├── AppSaga.js
|   ├── ...
├── payments/
├── user/
├── ...
├── actions.js
├── constants.js
├── reducers.js
├── sagas.js
└── store.js
```

#### Actions

`actions.js` file is used as a **single export source** for all Redux actions.
This exported object should be used all across application, explicitly imported actions
are undesirable and gets messy when something changes.

```jsx
// actions.js

import { appActions } from './app/AppActions';
import { userActions } from './user/UserActions';
// ...

export const actions = {
  app: appActions,
  user: userActions,
};
```

#### Constants

`constants.js` file is used as a **single export source** for all redux action constants.
This exported object should be used all across application.

```jsx
// constants.js

import { appConstants } from './app/AppConstants';
import { userConstants } from './user/UserConstants';
// ...

export const constants = {
  app: appConstants,
  user: userConstants,
};
```

#### Reducers

`reducers.js` file is used as a **single export source** for all redux action reducers.
This exported object should be used all across application.

```jsx
// reducers.js
import { combineReducers } from 'redux';

import { appReducer } from './app/AppReducer';
import { userReducer } from './user/UserReducer';

export const combinedReducer = combineReducers({
  app: appReducer,
  user: userReducer,
});
```

#### Sagas

`sagas.js` file is used for running all generator functions (sagas). This acts as a rootSaga where
all sagas inside state subdirectories should be imported and run after redux store is created.

```jsx
function* rootSaga() {
  yield takeEvery(constants.example.EXAMPLE_CONSTANT, saga1);
  // ...
}
```

### Styles

This directory is supposed to hold all of our global styles which are used all across the app.
If application supports more than one theme this directory should take following structure:

```yaml
styles/
├── default/
|   ├── ...
|   ├── theme.js
|   └── index.js
├──dark/
|   ├── ...
|   ├── theme.js
|   └── index.js
└── index.js
```

> `theme.js` should hold all variable styles for different components and this file should be used
> inside component or container files.

```jsx
// default/theme.js
export const defaultTheme = {
  colors: {
    primary: '#CD3F70',
    ...
  },
  fonts: {
    size: {
      xs: 10,
      ...
    },
    weight: {
      regular: 'Lato-Regular',
      ...
    },
  },
  shadows: {
    medium: {
      ...
    },
    ...
  }
}
```

```jsx
// Text.js
// ...
import { themes } from '../../styles';

const theme = themes['dark'];

export const Text = ({ text }) => {
  return <Text color={theme.colors.primary}>{text}</Text>;
};
```

> This approach could be also used in case when we need to change app theme on the fly

### Utils

This directory should be used for all util functions which should be used across the app.
Majority of these functions are pure functions and should be tested. If we have different
functions doing the same thing then these functions should be extracted and unified into
one tested functions inside utils directory.

**Usual suspects:**

- `formatters.js`
- `hooks.js`
- `validators.js`
- ...

> **IMPORTANT:**
> All complex mapping or filtering logic from components, containers or state directories should
> be extracted and placed inside `utils` and tested.

## Functional vs Class-Component

Functional components and usage of React Hooks is preferred in all cases, because it provides us with agile structure for future changes & improvements and overall cleaner code.

```jsx
import React, { useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}
```

## Memoization

Most of the slowdowns are usually caused by performing unnecessary renders. Thankfully React provides [useMemo hook](https://reactjs.org/docs/hooks-reference.html#usememo) which is preferred to use on all of our components.

If there is some situation when you do need to use Class-Component, we prefer using `React.PureComponent` or `React.Component` with `shouldComponentUpdate`
method implemented, so it ensures less renders by checking if something in state or props have changed.

> **IMPORTANT:** Props passed to React component shouldn't contain any unnecessary props which could
> lead to unnecessary renders.

```jsx
// Bad
const userObject = {
  name: 'Name',
  surname: 'Surname',
  settings: { ... },
}

function Example = () => (
    <UserAvatar {...userObject}/> // We're passing unnecessary data
);
```

```jsx
// Good
const userObject = {
  name: 'Name',
  surname: 'Surname',
  settings: { ... },
}

function Example = () => (
    <UserAvatar name={userObject.name} surname={userObject.surname}/>
);
```

## Naming

### Filename and filename extension

- **File extension:**

  - Typescript project:
    - If file contains only TS code `.ts` extension should be used
    - If file contains JSX code `.tsx` extension should be used
  - JavaScript project:
    - All files should have `.js` extension

- **Filenames:**

  - React Components and state files should be named in PascalCase (e.g. `DefaultButton.js`)
  - Pure javascript files should use camelCase (e.g. `validations.js` or `userMappers.js`)
  - HOC (Higher-order Component) use camelCase (e.g. `withNetworkState.js` or `withAuth.js`)

- **Component naming:**

  - Use the filename as the component name. For example, `DefaultButton.js` should have a reference name of `DefaultButton`
  - Components using HOCs should be exported and named in following way:

    ```jsx
    const DefaultButtonComponent = props => <Button {...props} />;

    export const DefaultButton = connect(
      mapStateToProps,
      mapDispatchToProps,
    )(DefaultButtonComponent);
    ```

- **Props Naming:** Avoid using DOM component prop names for different purposes.

  > Why? People expect props like `style` and `className` to mean one specific thing. Varying this API for a
  > subset of your app makes the code less readable and less maintainable, and may cause bugs.

  ```jsx
  // Bad
  <MyComponent style="fancy" />

  // Bad
  <MyComponent className="fancy" />

  // Good
  <MyComponent variant="fancy" />
  ```

## Declaration

Correct component declaration is crucial in development process.
Correct declaration and proper component naming helps to find related
code much quicker and makes much more sense when it has unique/single
name across project(-s).

Make sure you:

- Name exported component
- Export component as a constant
- Set the display name to forwarded component

```jsx
// Bad
export default () => {
  return <div>Hello {this.props.name}</div>;
};

// Good
export const Hello = ({ name }) => {
  return <div>Hello {name}</div>;
};

const TextInput = React.forwardRef((props, ref) => {
  return <TextInput {...props} ref={ref} />;
});

TextInput.displayName = 'TextInput';
```

## Props

- Always destructure `this.props` and `this.state` inside Class-Component
  it ensures better readability and is shorter.

  ```jsx
  // Bad
  return <TextInput value={this.state.value} onChange={this.props.onChage} />;

  // Good
  const { value } = this.state;
  const { onChange } = this.props;

  return <TextInput value={value} onChange={onChage} />;
  ```

- Always use **camelCase** for prop names.

  ```jsx
  // Bad
  <Foo UserName="hello" phone_number={12345678} />

  // Good 🐪
  <Foo userName="hello" phoneNumber={12345678} />
  ```

- Due to better readability we strongly encourage to explicitly
  pass `true` or `false` boolean value to boolean prop.

  ```jsx
  // Is hidden a variable ? Is it a boolean? 🕵️‍♂️
  <Foo hidden />

  // Oh it's a boolean
  <Foo hidden={true} />
  ```

- Avoid using an array index as `key` prop, prefer a stable ID

  > **Why?**
  > Not using a stable ID [is an anti-pattern](https://medium.com/@robinpokorny/index-as-a-key-is-an-anti-pattern-e0349aece318) because it can negatively impact performance and cause issues with component state.

  We don't recommend using indexes for keys if the order of items may change.

  ```jsx
  // Bad
  todos.map((todo, index) => <Todo {...todo} key={index} />);

  // Good
  todos.map(todo => <Todo {...todo} key={todo.id} />);

  // Awesome
  todos.map(todo => <Todo {...todo} key={`toDo_${todo.id}`} />);
  ```

- Always define explicit `defaultProps` for all non-required props.

  > **Why?**
  > propTypes are a form of documentation, and providing defaultProps means the reader of your
  > code doesn't have to assume as much. In addition, it can mean that your code can omit certain type checks.

  > When you have your `defaultProps` you dont need to default in other random code places

  ```jsx
  // Bad
  const SomeComponent = () => {
    const { color = 'red', children } = this.props;
    return <View style={{ backgroundColor: color }}>{children}</View>;
  };

  // Good
  const SomeComponent = () => {
    const { color, children } = this.props;
    return <View style={{ backgroundColor: color }}>{children}</View>;
  };

  SomeComponent.defaultProps = {
    color: 'red',
  };
  ```

- Use spread props sparingly.

  > **Why?**
  > Otherwise you're more likely to pass unnecessary props down to components.
  > It also creates a lot of overhead for other developers to understand which props
  > are relevant and which ones are just excess props travelling down the tree for no reason.

  > **NOTE:**
  > You can always use lodash to `pick` relevant or `omit` irrelevant props

  ```jsx
  // Bad
  return <WrappedComponent {...this.props} />;

  // Good
  const { irrelevantProp, ...relevantProps } = this.props;

  return <WrappedComponent {...relevantProps} />;
  ```

## Refs

- **Ref naming:** Always use postfix Ref when naming component reference.

  ```jsx
  // Hooks
  const inputRef = useRef(null);
  ```

  ```jsx
  // Class components
  const inputRef = React.createRef();
  ```

- **Ref creation:** Always use `React.useRef()` or `React.createRef()`

  - There might be some instances when usual methods wont work, then use reference callback:

    ```jsx
    const Foo = () => {
      let inputRef = null;

        return (
            <TextInput ref={(r) => (inputRef = r)} />
          </View>
        );
    }
    ```

- **Better safe than sorry:** Always check if reference is defined when tying to access reference method.

```jsx
const Foo = () => {
  const inputRef = React.useRef();

  const blur = () => {
    if (inputRef.current && typeof inputRef.current.blur === 'function') {
      inputRef.current.blur();
    }
  };

  return <TextInput ref={inputRef} />;
};
```

## Methods

- If you ought to use Class-Components, we encourage using arrow functions for custom methods.
  It auto-binds function to class scope and helps prevent errors related with
  `this` when function is used as a callback.

> **NOTE:** React lifecycle methods could be written either way

- Although we encourage arrow functions, their usage in inline JSX is suboptimal, because that creates a new function on every render.

```jsx
// good
class Example extends React.Component {
  onPress = e => {
    console.log('onPress event:', e);
  };
  render() {
    return (
      <>
        // Bad
        <TouchableOpacity onPress={e => this.onPress(e)} />
        // Good
        <TouchableOpacity onPress={this.onPress} />
      </>
    );
  }
}
```

- Do not use underscore prefix for internal methods of a React component.

> Why? Underscore prefixes are sometimes used as a convention in other languages to denote privacy. But, unlike those languages, there is no native support for privacy in JavaScript, everything is public. Regardless of your intentions, adding underscore prefixes to your properties does not actually make them private, and any property (underscore-prefixed or not) should be treated as being public. See issues [#1024](https://github.com/airbnb/javascript/issues/1024), and [#490](https://github.com/airbnb/javascript/issues/490) for a more in-depth discussion.

```jsx
// Bad
React.createClass({
  _onClickSubmit = () => {
    ...
  },
});

// Good
class extends React.Component {
  onClickSubmit = () => {
    ...
  }
}
```

## Ordering

Method ordering inside Class-Component is important to quickly see what component does

- Ordering for `React.Component`:

  1.  static variables
  1.  instance variables
  1.  optional `static` methods
  1.  `constructor`
  1.  `componentDidMount`
  1.  `shouldComponentUpdate`
  1.  `componentDidUpdate`
  1.  `componentWillUnmount`
  1.  _optional render methods_ like `renderNavigation()` or `renderProfilePicture()`
  1.  _clickHandlers or eventHandlers_ like `onClickSubmit()` or `onChangeDescription()`
  1.  _getter methods for `render`_ like `getSelectReason()` or `getFooterContent()`
  1.  `render`

### Functional component

```jsx
export const Link = ({ text }) => {
  return <a href={url}>{text}</a>;
};

Link.propTypes = {
  id: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  text: PropTypes.string,
};

Link.defaultProps = {
  text: 'Hello World',
};
```

### Class component

```jsx
export class Link extends React.Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    text: PropTypes.string,
  };

  static defaultProps = {
    text: 'Hello World',
  };

  static methodsAreOk() {
    return true;
  }

  render() {
    return <a href={this.props.url}>{this.props.text}</a>;
  }
}
```

## Formatting

Our projects use ESLint and Prettier for code formatting, so make sure you've got those setup and your code formatting should be fine.

> Everything in this section will typically be handled by linter, but it's good to know why.

### Parentheses

Always wrap returned JSX in parentheses when it spans more than one line.

```jsx
return (
  <MyComponent variant="long body" foo="bar">
    <MyChild />
  </MyComponent>
);

// No parentheses are needed on single liners
const body = <div>hello</div>;
return <MyComponent>{body}</MyComponent>;
```

### Quotes

- Always use double quotes `"` for JSX attributes

  ```jsx
  // Bad
  <Foo bar='bar' />

  // Good
  <Foo bar="bar" />
  ```

- Single quotes `'` are for all other JS

  ```jsx
  // Bad
  <Foo style={{ left: "20px" }} />

  // Good
  <Foo style={{ left: '20px' }} />
  ```

> Why? Regular HTML attributes also typically use double quotes instead of single, so JSX attributes mirror this convention.

### Tags

- Always self-close tags that have no children.

  ```jsx
  // Bad
  <Foo variant="stuff"></Foo>

  // Good
  <Foo variant="stuff" />
  ```

- If your component has multi-line properties, close its tag on a new line.

  ```jsx
  // Bad
  <Foo
    bar="bar"
    baz="baz" />

  // Good
  <Foo
    bar="bar"
    baz="baz"
  />
  ```
