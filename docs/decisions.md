# Decisions

## Why web app first

- Fastest route to a demo
- Easy to test on a phone-sized browser
- Keeps dependencies and complexity low

## Why mock data only

- Validates UX before infrastructure work
- Keeps the prototype stable and easy to revise
- Avoids premature backend decisions

## Routing choice

- Elder experience lives under the main root routes
- Caregiver screens live under `/caregiver`
- This keeps role switching simple for demos

## State choice

- Zustand is used for lightweight local prototype state
- All edits stay in memory with mock-first structures

## UI choice

- Large tap targets
- High contrast
- Minimal nested navigation
- Concrete labels over abstract icons
