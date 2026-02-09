# Font Licenses & Attribution

This document lists all web fonts used in the Physical AI & Humanoid Robotics Docusaurus project, including their sources, versions, and licenses.

## Inter Font

**Source:** https://rsms.me/inter/  
**Version:** 4.0 or later  
**License:** SIL Open Font License (OFL) 1.1  
**Files:**
- `static/fonts/Inter-Variable.woff2` (preferred)

**License Text:**
```
Copyright (c) 2016 - The Inter Project Authors (github.com/rsms/inter)

This Font Software is licensed under the SIL Open Font License, Version 1.1.
This license is copied below, both in text and XML forms.

---

SIL OPEN FONT LICENSE Version 1.1 - 26 February 2007

PREAMBLE
The goals of the Open Font License (OFL) are to stimulate worldwide
development of collaborative font projects, to support the font creation
efforts of academic and linguistic communities, and to provide a free and
open framework in which fonts may be shared and improved in partnership
with others.

[Full OFL 1.1 text: https://opensource.org/licenses/OFL-1.1]
```

## JetBrains Mono

**Source:** https://www.jetbrains.com/lp/mono/  
**Version:** 2.304 or later  
**License:** SIL Open Font License (OFL) 1.1  
**Files:**
- `static/fonts/JetBrainsMono-Regular.woff2`
- `static/fonts/JetBrainsMono-Medium.woff2`

**License Text:**
```
Copyright 2000 The JetBrains Mono Project Authors

This Font Software is licensed under the SIL Open Font License, Version 1.1.
[License text: https://opensource.org/licenses/OFL-1.1]
```

## Noto Nastaliq Urdu

**Source:** https://fonts.google.com/noto/specimen/Noto+Nastaliq+Urdu  
**Version:** Latest from Google Fonts  
**License:** SIL Open Font License (OFL) 1.1  
**Files:**
- `static/fonts/NotoNastaliqUrdu-Regular.woff2`

**License Text:**
```
Copyright 2011-2023 Google LLC and The Noto Project Authors (github.com/notofonts/urdu)

This Font Software is licensed under the SIL Open Font License, Version 1.1.
[License text: https://opensource.org/licenses/OFL-1.1]
```

## Usage Notes

### Performance Strategy

- **Inter:** Loaded as Variable font (single file covering weights 100-900)
- **JetBrains Mono:** Discrete weights (400 Regular, 500 Medium) for code blocks
- **Noto Nastaliq:** Lazy-loaded only for Urdu locale pages to optimize initial load

### Font Loading Behavior

All fonts use `font-display: swap` to prioritize immediate text rendering with system fallbacks.
- **Timeout:** 3 seconds before fallback to system fonts
- **Fallback Stacks** defined in `src/css/custom.css`

### Attribution

This project respects the SIL OFL license requirements:

- ✅ Font files are included in the repository
- ✅ License texts are documented (this file)
- ✅ Original authors are credited
- ✅ Modified fonts (if any) retain OFL licensing

## Verification

To verify font files and licenses:

```bash
ls -lah static/fonts/
cat LICENSES/fonts.md
```

---

**Last Updated:** February 2026  
**Maintained By:** Masoom Tariq & Contributors
