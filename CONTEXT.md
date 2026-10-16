# Portfolio

A multi-language developer portfolio for Andres Alvarez, generated from a JSON Resume file (`docs/cv.json`) with one file per locale. Visual theme: minimalist layout with glassmorphic (frosted-glass) surfaces and subtle Frutiger Aero (glossy aqua) accents.

## Content model

**Locale**:
A UI language variant of the site (`en`, `es`). Determines which JSON file and UI strings are rendered.
_Avoid_: translation, language (see Language below)

**Language**:
A human language Andres speaks (Spanish, English), listed in its own section. Distinct from Locale.
_Avoid_: locale

**Section**:
A top-level block on the single page: Hero, Experience, Skills, Education, Languages, Contact.
_Avoid_: page, screen

**Experience entry**:
A past or current role (`work[]`), with position, company, dates, summary, and highlights.
_Avoid_: job, work item, position

**Highlight**:
A bullet-point accomplishment within an Experience entry.
_Avoid_: bullet, achievement

**Skill group**:
A category of related technologies (FrontEnd, BackEnd, DataBase, DevOps, QA).
_Avoid_: skill category

**Skill tag**:
A single technology within a Skill group (e.g. React, NestJS).
_Avoid_: keyword, technology

## Visual language

**Navbar**:
The horizontal top navigation bar; pins to the top of the viewport on scroll.
_Avoid_: header, menu

**Theme**:
A light or dark color variant of the site. Light-first, user-toggleable.
_Avoid_: mode

**Glassmorphism**:
A frosted translucent surface: backdrop blur, a subtle border, and a low-opacity tint. Applied across cards and the navbar.
_Avoid_: blur, transparency

**Frutiger Aero**:
A glossy, skeuomorphic aqua aesthetic, used here only as subtle accents (soft gradients and specular highlights).
_Avoid_: skeuomorphism, gloss

**Accent**:
The single aqua/teal accent color used sparingly for interactive and emphasized elements.
_Avoid_: brand color, highlight color

**Monogram**:
An initials mark shown in the Hero in place of a photo.
_Avoid_: avatar, logo
