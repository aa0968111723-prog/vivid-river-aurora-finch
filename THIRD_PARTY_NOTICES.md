# Third-party notices

This site uses the projects below. We did not copy their brands, sample copy, logos, or page layouts. The turtle mesh in `public/models/` is an original low-poly stand-in written for this site. It was not produced by Hunyuan3D, TRELLIS, Wonder3D, or any other image-to-3D weight.

## Puck

- GitHub: https://github.com/puckeditor/puck
- Package: `@puckeditor/core` 0.23.0
- License: MIT
- Used for: the admin visual editor (drag-and-drop blocks, slots, viewports, undo/redo). Draft, publish, and permissions are implemented in this repo, not by Puck's `onPublish`.
- Modified: no. We configure components; we do not fork the package.
- Notice:

```
MIT License

Copyright (c) The Puck Contributors.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Craft.js

- GitHub: https://github.com/prevwong/craft.js
- License: MIT (Copyright (c) 2020 Previnash Wong Sze Chuan)
- Used: not installed. See `docs/editor-decision.md`.

## React Three Fiber

- GitHub: https://github.com/pmndrs/react-three-fiber
- Package: `@react-three/fiber` 9.8.1
- License: MIT
- Used for: the turtle scene renderer. React 19 compatible v9.
- Modified: no
- Notice: Copyright (c) 2019-2025 Poimandres. MIT license; the copyright and permission notice must stay with substantial portions of the software.

## Drei

- GitHub: https://github.com/pmndrs/drei
- Package: `@react-three/drei` 10.7.9
- License: MIT
- Used for: `useGLTF` and `useAnimations` (AnimationMixer helpers).
- Modified: no
- Notice: Copyright (c) 2020 react-spring. MIT license.

## three.js

- GitHub: https://github.com/mrdoob/three.js
- Package: `three` 0.186.1
- License: MIT
- Used for: WebGL rendering, animation clip playback, and the glTF scene graph.
- Modified: no
- Notice: Copyright © 2010-2026 three.js authors. MIT license.

## Theatre.js

- GitHub: https://github.com/theatre-js/theatre
- `@theatre/core` is Apache-2.0. `@theatre/studio` is AGPL-3.0.
- Used: neither package is installed. The turtle uses a tested state machine plus AnimationMixer clips stored in the GLB. The studio is kept out of the production bundle, and a second animation runtime was not needed.

## gltfjsx

- GitHub: https://github.com/pmndrs/gltfjsx
- Used: not installed. The turtle mesh is small enough to load with `useGLTF` directly. There is no generated JSX component to maintain.
