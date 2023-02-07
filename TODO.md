# TODO

- feat: add reCAPTCHA
- feat: add @next/font
- feat: make use of Next.js next layout architecture
    - blocked: `wakeable.then is not a function` (https://github.com/vercel/next.js/issues/43389)
- feat: add pronounciation
- feat: add letter anchors (id) to index page
    - blocked: navbar overlaps
- feat: make a LazyTooltip out of MUI Tooltip
    - blocked: `dynamic` doesn't seem to work because `@mui/material` is already loaded
- chore: investigate PWA
- chore: investigate onbeforeunload support for iOS
    - blocked: iOS doesn't properly support before unload
- chore: investigate if react@^18.0.0 can be replace with preact@^11.0.0
    - blocked: one of the hook provided by React isn't available yet
