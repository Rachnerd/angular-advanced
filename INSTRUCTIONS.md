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

### UI component

Do you like HTML and SCSS?

> Yes I will build it from scratch
> No I will pull the HTML/CSS starter code: `feature/checkbox-start`

- Create a checkbox component that is conform the Design System standards.
  - Creates stories for each interesting state.
  - Make sure dark mode is supported properly.
  - Make sure it is accessible.
- Add support for the checkbox in the form component.
  - Create a new form story that includes checkboxes.
- Update the login page in the webshop so it has a "Remember me" checkbox that decides if the session is stored in session storage.

### Template

Do you like refactoring?

> Yes I will build it from scratch
> No I will pull the refactored starter code: `feature/template-assignment`

- Create a new template called |name|-template (Storybook).
  - Split the main section in "side" and "main" to support a sidebar.
- Generate a new webshop page component and bind it to a new route.
  - Add the route in app.component.html so you can reach it.
- Implement your template so the products are listed in the "main" slot and pagination/pagination-controls in the sidebar.

Bonus: Make the pagination/pagination-controls align properly inside the sidebar.
  - You need to update pagination and pagination-controls CSS so they fit in a small space.
  - Tip: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries
    - Container queries allow specific CSS rules for small containers.
