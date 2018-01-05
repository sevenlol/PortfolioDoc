---
id: web_app_structure
title: Application Structure
---

This section gives a brief description on the website's code structure, based on Angular's [style guide](https://angular.io/guide/styleguide).

This website is consisted of three feature modules, a core module (one time components and services used by the entire app), a shared module (for common components such as spinner) and a root module. A brief introduction of each module is in the following paragraphs.

Note that not all components/services are described here. A reference document built with typedoc can be found [here](https://sevenlol.github.io/PortfolioWebTSDoc/).

### Home Module

Home module contains components for the entry page, including my introduction, featured personal projects and my contact info. This module is loaded eagerly (imported by the root module).

### About Module

About module contains components for information about me, including my detailed information (location, email, etc), education work experience and software development skills. This module is lazy loaded.

### Project Module

Project module contains components for my personal project, including a project list component and a project detail component. This module is lazy loaded.

### Core Module

Core module contains components that will be only used at one place, such as navigation bar and url not found page. This module also contains services that will be used by the entire application (such as metadata service) so that each featured modules can inject the service without creating duplicates.

### Shared Module

Shared module components used by multiple modules, including spinner and project tile.

### App Module

The root module used to bootstrap the application, includes only navigation bar and a router outlet for featured modules.
