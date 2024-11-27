# Install

```
npm i
```

## Run

Component library

```
npm run components
```

Server

```
npm run server
```

Webshop

```
npm run webshop
```

## Code gen

### ui-components

Generate component:

```
nx g c libs/ui-components/src/component-name/component-name --style=scss
> ? Which generator would you like to use? @nx/angular:component
> ? What name would you like to use for the component? › component-name
```

Generate stories file:

```
nx g stories ui-components
```

Webshop:

```
nx g c apps/webshop/src/app/component-name/component-name --style=scss
> ? Which generator would you like to use? @nx/angular:component
> ? What name would you like to use for the component? › component-name
```

```
nx g stories webshop
```

### Assignment

- Create a checkbox component that is conform the Design System standards.
  - Creates stories for each interesting state.
- Add support for the checkbox in the form component.
  - Create a new form story that includes checkboxes.
- Update the login page in the webshop so it has a "Remember me" checkbox that decides if the session is stored in session storage.
