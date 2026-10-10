<aside>  
💡 정지된 브랜드 로고 이미지 한 장을 시선을 사로잡는 애니메이션 영상으로 바꾸는 프롬프트 모음입니다. Higgsfield([higgsfield.ai](http://higgsfield.ai))의 Gemini Omni Flash에 로고 이미지와 아래 프롬프트를 함께 넣으면, 편집 프로그램 없이 움직이는 로고 영상이 완성됩니다.

</aside>

### 🎛️ 마스터 프롬프트 — 로고 모션 올인원 (Gemini Omni Flash)

아래 템플릿을 그대로 쓰되, 원하는 결과가 안 나오거나 변화를 주고 싶으면 마스터 프롬프트를 ChatGPT·Claude에 입력하고 여러분 브랜드 로고에 맞게 프롬프트를 만들어달라고 해보세요.

```
# ROLE
You are an expert prompt engineer for AI image-to-video generation on Higgsfield
(Gemini Omni Flash / Seedance 2.0). Given a reference image (and optional notes),
you output ONE ready-to-paste English video prompt that animates the image with a
single, believable hero effect while perfectly preserving the reference.
# INPUT (from the user)
- A reference image (required)
- Optional notes: desired effect/motion, brand or text to keep, target duration, mood
If no effect is specified, infer the single most striking, on-brand motion the image
suggests, and state that assumption in one Korean line before the prompt.
# PROCESS
1. Read the image precisely: main subject, any logo/text (EXACT spelling & style),
   materials/textures, camera angle, composition, lighting, background.
2. Choose ONE hero effect: the user's requested effect, or the best inferred one
   (a reveal, a transformation, a material interaction, a tracking/camera move…).
3. Write the prompt using the OUTPUT TEMPLATE below, filling every section.
# HARD RULES
- Output the final prompt in ENGLISH even if the user writes Korean (the model needs
  English). You may chat in Korean, but the prompt block itself is English.
- Preserve the reference EXACTLY: subject, composition, colors, lighting, and above
  all any logo/brand text — never misspell, translate, restyle, distort, or crop it.
- ONE continuous shot. Lock the camera UNLESS camera movement is the effect itself
  (then describe it precisely and keep it consistent).
- Give a per-second TIMELINE with realistic physics and pacing.
- Keep the effect clean and legible (logos readable, motion clear, no smearing).
- Add NOTHING not in the reference: no text overlays, captions, UI, hands, extra
  objects, or watermarks.
- No cuts, transitions, scene changes, or morphing of the wrong elements.
- Total length 4–8 seconds unless told otherwise.
# OUTPUT TEMPLATE (fill every section, in English)
Use the uploaded image as the exact visual reference and create one continuous
[shot type], approximately [N] seconds.
SCENE (match the reference exactly)
[Describe subject, text/logo with exact spelling, colors, composition, angle,
lighting. End with: "Preserve the exact ... and composition of the reference image."]
CONCEPT
[1–2 sentences: the single hero effect and what happens.]
CAMERA
[Locked-off / aerial tracking / slow push-in — be specific; state forbidden moves.]
TIMELINE (approx. N seconds)
0.0–Xs: [start state = the reference]
X–Ys: [the effect unfolds, step by step]
Y–Ns: [end state, hold]
MOTION & PHYSICS
[Realistic material behavior, pacing, texture cues.]
STYLE
[Photographic style, lighting, mood matching the reference/brand.]
STRICT CONSTRAINTS
[Preserve reference exactly; keep logo/text correct; only the intended element
moves; keep angle/lighting consistent; etc.]
NEGATIVE PROMPT
[What must NOT happen: camera shake, cuts, misspelling, added text/hands, morphing,
scene change, subject leaving frame, etc.]
# AFTER THE PROMPT
Add one Korean line summarizing the effect, plus one optional tuning tip
(e.g., "로고가 흐리면 'letter by letter, crisp logotype'를 강조하거나 러닝타임을 늘리세요").
```

![스크린샷 2026-07-30 오후 5.38.22.png](attachment:f45554bb-221a-44e3-ad11-f5c29fa30d59:%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2026-07-30_%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE_5.38.22.png)

팁: 결과가 약하면 한 번에 한 요소만 수정(카메라·조명·속도). Omni는 최대 10초·720p, 텍스트가 프레임 전체에 유지되는 게 강점이라 로고/워드마크에 특히 강합니다.

---

## 사용 방법 (Higgsfield)

**STEP 1.** [higgsfield.ai](http://higgsfield.ai) 접속 → Video 섹션에서 Gemini Omni Flash 선택

**STEP 2.** 애니메이션으로 만들 브랜드 로고 이미지 한 장 업로드

**STEP 3.** 로고 스타일에 맞는 아래 프롬프트를 골라 붙여넣고 생성

**STEP 4.** 결과가 아쉬우면 프롬프트를 조금씩 수정하거나 ChatGPT·Claude로 로고에 맞게 변형

<aside>  
⏰ 지금 활성화하면 24시간 동안 전 기능 무료, 이후 7일간 무제한 무료 생성이니 여러 스타일을 마음껏 테스트해 보세요.

</aside>

### 1.크루아상 보트 (이미지→영상 · FIRST_FRAME 참조)

시작 프레임 이미지를 넣고 그대로 8초 영상으로. 드론 탑다운 트래킹 — 트럭·빵은 프레임 고정, 도로만 흘러 주행감. Seedance/Omni Flash 이미지→영상용.

```
One continuous, unbroken overhead aerial tracking shot, 8 seconds. No scene cuts.
Use this image as the starting frame. Animate it forward: the drone camera
tracks the glass-roofed river boat from directly above at matched speed as it
cruises forward up the river, keeping the boat and the giant croissant centered
in frame the entire time. Speed is conveyed by the dark green water, the
churning white wake, the stone quays, embankment walls, trees, and benches on
both banks continuously scrolling through the frame from top to bottom — never
by the boat leaving the frame.

[0-1s] The scene exactly as in the starting frame. The boat glides forward
smoothly, wake already trailing behind.
[1-6s] The boat cruises steadily at constant speed. The white foam wake churns
continuously at the stern and ripples spread outward along the hull. The water
surface shimmers and slides beneath. Both stone quaysides, trees, and the
pedestrians on the banks drift naturally past relative to the moving boat. The
giant golden croissant sits securely strapped to the glass roof, with a tiny
natural sway and subtle tension in the orange tie-down straps from the boat's
gentle rocking.
[6-8s] The boat continues forward at the same constant pace; the tracking
motion holds smoothly to the end.

Preserve the exact boat, giant golden croissant, orange tie-down straps, and
the "bureaud" lettering written in white powdered sugar — do not redesign,
misspell, morph, or restyle them. Maintain the same overhead angle, framing
height, and warm natural daylight throughout.

STYLE: Photorealistic surreal fashion-ad aesthetic, oversized-object style.
Clean, cinematic, realistic Parisian river scene.
Sound design: gentle water lapping, a soft steady boat engine hum, faint city
ambience from the banks. No music, no dialogue.

No cuts, transitions, camera shake, zoom, or angle change. No extra boats,
vehicles, people, text overlays, captions, logos, or watermarks. No morphing
or teleporting objects. No day-to-night change. The boat never leaves the frame.
```

### 2. 자수 스티치 로고 애니메이션

천 위에 실이 한 땀씩 박히며 로고가 자수로 완성되는 매크로 타임랩스. 패브릭·의류 브랜드 로고에 잘 어울립니다.

**프롬프트 (복붙용 · 영어)**

```
Create one continuous locked-off extreme macro shot using the uploaded logo image as the exact design reference.
A clean woven cotton shirt fabric fills the frame. At the beginning, the fabric is completely blank. Fine embroidery threads emerge naturally through the fabric and begin stitching the referenced logo directly onto the surface.
Recreate a realistic machine-embroidery process: dense satin stitches are laid down in a precise, orderly sequence, gradually building each section of the logo. The thread pulls taut after every stitch, creating a slightly raised, dimensional embroidered texture with realistic overlapping stitch directions and clean edges.
Preserve the exact logo design, shape, colors, proportions, spacing, lettering, and internal details. Do not redesign, simplify, distort, rotate, mirror, or reinterpret the logo.
Keep the entire logo centered and fully visible throughout the shot, with generous fabric margin on every side. The logo must never touch the frame edges or become cropped.
Static overhead macro camera, locked framing, no zoom, no pan, no tilt, no rotation, and no reframing. Slow, smooth, satisfying time-lapse pacing. Soft natural side lighting, shallow depth of field, visible cotton fibers, realistic thread sheen, subtle contact shadows, and photorealistic textile detail.
No hands, needles, sewing machine, loose thread ends, floating objects, extra text, extra logos, watermark, scene transition, camera movement, or fabric deformation.
```

### 3. 3D 텍스트 돌출 로고 애니메이션

벽면 간판이 앞으로 돌출되며 입체 사인으로 조립되는 연출. 매장·오프라인 브랜드, 건물 로고에 추천.

**프롬프트 (복붙용 · 영어)**

```
Use the uploaded image as the exact visual reference and create one continuous photorealistic VFX shot.
OBJECTIVE
Animate only the existing wall-mounted company sign in the reference image. The animation is a clean architectural sign reveal using an extrusion and pop-out effect. This is not a redesign, scene regeneration, or logo reinterpretation.
REFERENCE PRESERVATION
Preserve the exact building facade, wall texture, sky, lighting direction, perspective, camera angle, framing, logo position, sign dimensions, typography, letter spacing, colors, proportions, and materials shown in the uploaded image.
The completed sign must accurately match the reference image. Do not modify, restyle, simplify, replace, misspell, or reinterpret any part of the logo.
CAMERA
One continuous locked-off shot from the exact camera position and angle of the reference image.
Apply only an extremely subtle and smooth 2% optical push-in over the entire clip. The movement should feel almost imperceptible, with no parallax or perspective shift.
No pan, tilt, orbit, handheld movement, reframing, lens distortion, or camera shake.
ANIMATION
Beginning:
The building facade is visible exactly as shown in the reference, but the entire sign is temporarily absent. The wall surface behind it is clean and undamaged, with the original wall texture continuing naturally through the empty area.
Reveal:
The sign assembles directly in its final location.
If the reference contains a rectangular backing panel, the panel first grows outward from the wall as a very thin flat surface, revealing smoothly from left to right. It then extrudes forward until it reaches the exact thickness and dimensions shown in the reference.
Immediately afterward, the logo letters and symbols emerge from the front surface of the panel. Each element rises from completely flat to its full raised acrylic depth in a controlled left-to-right sequence.
The letters do not fly in, slide across the wall, rotate, inflate, melt, or appear from outside the frame. They remain anchored to their exact final positions while extruding outward along the axis perpendicular to the wall.
As each section gains depth, realistic contact shadows and soft drop shadows gradually form beneath and beside the raised elements according to the existing sunlight direction.
Completion:
The entire sign reaches its final three-dimensional form, matching the uploaded reference image in shape, depth, surface finish, color, typography, spacing, perspective, and placement.
Hold on the completed sign for the final two seconds while the subtle push-in finishes.
STYLE AND PHYSICS
Photorealistic commercial architectural visualization.
Realistic solid acrylic or painted metal sign materials.
Precise mechanical extrusion.
Clean edges and stable geometry.
Natural sunlight, physically accurate shadows, subtle reflections, and consistent exposure.
The wall, building, sky, antennas, fixtures, and every other background element remain completely static and unchanged.
STRICT CONSTRAINTS
Only the sign may animate.
Do not animate or deform the building.
Do not alter the sky, clouds, sunlight, wall texture, reflections, exposure, or background.
Do not change the logo design, spelling, proportions, colors, or placement.
Do not generate duplicate letters, malformed text, additional symbols, or extra sign components.
No construction workers, hands, tools, cranes, screws, cables, sparks, particles, smoke, dust, or debris.
No floating pieces.
No cuts, transitions, speed ramps, time-lapse effects, or sudden movements.
No captions, subtitles, interface elements, watermark, voice, dialogue, or music.
```

### 4. 로고 설계도 애니메이션

벡터 가이드라인·앵커포인트가 그려지며 로고가 '설계'되는 미니멀 모션그래픽. IT·디자인·프리미엄 브랜드에 적합.

**프롬프트 (복붙용 · 영어)**

```
Create one continuous 4-second premium logo construction animation using ONLY the uploaded reference logo as the exact source of truth.
This is not a simple logo reveal. Show the logo being mathematically designed and precisely constructed through professional vector geometry, as if it is being created inside a high-end vector design application.
STYLE
Minimal premium motion graphics, Swiss design, vector blueprint, mathematical precision, modern corporate branding, world-class motion design studio quality.
BACKGROUND
Pure white background with a clean, minimal studio appearance. No visible environment or unnecessary decoration.
CAMERA
One continuous shot.
Locked-off centered framing.
No cuts, no camera shake, no rotation, and no noticeable zoom.
4-SECOND TIMELINE
0.0–0.7 seconds:
Begin on a clean white canvas. Fine light-grey alignment guides, geometric construction lines, measurement marks, anchor points, and vector paths quickly but smoothly appear around the exact logo position.
0.7–2.5 seconds:
Construct the uploaded logo in the most logical order based on its actual structure. Build major geometric shapes first, followed by smaller details or typography. Thin vector outlines trace each component while anchor points, Bézier handles, tangents, spacing guides, and construction geometry briefly demonstrate how the logo is engineered.
Only use geometry that is naturally implied by the uploaded logo. Do not force unnecessary circles, grids, or golden-ratio diagrams.
2.5–3.2 seconds:
Once all vector outlines are complete, fill each section with the exact original colors from the uploaded logo. Every component locks precisely into position with restrained mechanical easing.
3.2–4.0 seconds:
All temporary guides, measurements, anchor points, grids, Bézier handles, and construction lines fade away cleanly. Hold briefly on the completed logo, perfectly centered on the pure white background.
LOGO ACCURACY
Preserve the exact:
Symbol and typography
Shapes and curves
Angles and proportions
Letterforms and kerning
Negative space
Alignment and spacing
Original colors and gradients
Stroke thickness
Overall composition
MOTION
Ultra-smooth and precise.
Fast enough to complete within four seconds, but never frantic.
No bounce, elastic motion, overshoot, random movement, or dramatic effects.
STRICT REQUIREMENTS
Use ONLY the uploaded reference logo (@image1).
Do not redesign, simplify, reinterpret, rotate, mirror, distort, or restyle it.
Do not substitute the font or modify the logo colors.
Do not add extra text, symbols, particles, metallic effects, heavy glow, dramatic shadows, or scene transitions.
Keep the complete logo visible with generous white space around it.
Never crop the logo.
The final frame must match the uploaded reference logo as closely as possible.
```

### 5. 네온사인 효과 로고 애니메이션

매장 간판에 불이 하나씩 켜지듯 로고가 점등되는 리빌. 카페·리테일·야간 무드 브랜드에 어울립니다.

**프롬프트 (복붙용 · 영어)**

```
Create a 4-second logo sign reveal animation based on the uploaded reference image.
This is a VFX reveal effect applied to a static scene, not a redesign or regeneration of the scene. Treat the uploaded image as a fixed still plate. Preserve the exact environment, storefront, wall, ceiling, lighting, reflections, interior, camera angle, framing, and perspective from the reference image.
Only the sign itself should animate. Everything else in the frame must remain visually fixed and unchanged throughout the clip.
The final frame must look identical to the uploaded reference image.
VIDEO STYLE
Premium commercial signage reveal, clean and realistic, subtle, polished, natural, high-end retail brand presentation.
CAMERA
One continuous shot.
Keep the same framing and perspective as the uploaded reference image.
Very subtle gentle side-to-side micro tilt only, minimal and smooth.
No zoom, no reframing, no cuts, no shake, no scene change.
4-SECOND TIMELINE
0.0–0.6 sec
Start with the signboard area empty: no logo, no lettering, no symbol visible.
The storefront, background, and lighting remain exactly the same.
A very subtle camera micro-tilt begins.
0.6–2.8 sec
The sign gradually powers on in its exact original position.
Reveal the logo elements one by one from left to right, or in the most natural reading order of the uploaded sign.
Each letter or logo element flickers briefly once or twice like a backlit storefront sign turning on, then settles into a stable illuminated state.
The reveal must feel like a realistic sign-light activation, not like objects flying in or being rebuilt.
2.8–4.0 sec
The full sign is now completely visible, fully lit, and stable, perfectly matching the uploaded reference image.
Hold on the completed sign while the subtle camera micro-tilt continues gently until the end.
IMPORTANT REQUIREMENTS
Preserve the exact original sign design, position, scale, spacing, colors, icon, and typography.
Do not redesign, restyle, replace, distort, or simplify the logo.
Do not change the storefront structure or any background detail.
Do not animate anything except the sign reveal and the specified subtle camera micro-tilt.
Keep the reveal clean, realistic, and premium.
The final frame must be visually indistinguishable from the uploaded reference image.
NEGATIVE PROMPT
Do not change the camera angle or framing beyond the specified subtle micro-tilt.
Do not move the sign to a different location in the frame.
Do not add extra text, objects, people, effects, or transitions.
Do not change the lighting setup, materials, storefront architecture, or background.
Do not use dramatic flicker, heavy glow, fast cuts, or exaggerated motion.
```

### 6. 후광 원형 로고 글로우 리빌 애니메이션

원형 사인 안쪽에서 빛이 퍼지며 엠블럼이 그려지는 백라이트 글로우. 원형 로고·엠블럼형 브랜드에 추천.

**프롬프트 (복붙용 · 영어)**

```
Create one continuous 4-second VFX logo reveal using the uploaded reference image as a fixed visual plate.
This is a localized VFX animation applied only to the existing circular sign. It is not a redesign, scene regeneration, or replacement of the uploaded image.
Preserve the exact camera angle, framing, perspective, landscape, sky, support structure, sign position, lighting, colors, and every background detail from the reference image. Everything outside the circular logo sign remains completely unchanged throughout the clip.
The final frame must match the uploaded reference image as closely as possible.
SHOT AND CAMERA
A fixed medium-long shot matching the uploaded reference image.
One continuous shot with a very slow, subtle cinematic push-in.
The push-in must be nearly imperceptible and must not alter the composition significantly.
No pan, tilt, orbit, shake, reframing, or perspective change.
STYLE
Photorealistic outdoor commercial-sign VFX.
Clean, premium, subtle and physically believable.
Natural daylight under the existing clear blue sky.
4-SECOND ACTION
0.0–0.5 seconds:
Begin with the circular sign structure in its exact original position, but the branded face is inactive and visually blank. Preserve the physical circular sign housing, mounting frame, support posts and surrounding environment. Only the printed or illuminated emblem is absent.
0.5–1.3 seconds:
The circular background powers on smoothly from its center and expands outward to the edge, like an internal backlit sign activating. The illumination remains controlled and realistic, with a soft internal glow and no bloom spilling into the environment.
1.3–3.0 seconds:
The emblem’s original lines and internal graphic details draw themselves into place from the center outward. Fine illuminated paths trace the exact existing logo geometry in a logical order, gradually completing the complete emblem.
The drawing effect should resemble light traveling through embedded sign channels, not hand-drawn ink, liquid, fire, neon tubing, or floating particles.
3.0–4.0 seconds:
The complete logo is fully visible and evenly illuminated, exactly matching its appearance, placement, colors, scale and proportions in the reference image. The glow settles into a stable real-world backlit sign. Hold the completed result until the end while the subtle push-in continues.
LOGO PRESERVATION
Preserve the exact:
Circular silhouette
Emblem design and internal linework
Typography, if present
Colors and contrast
Proportions and spacing
Orientation and position
Sign materials and mounting structure
STRICT CONSTRAINTS
Animate only the branded face of the circular sign.
Do not reconstruct or alter the sign housing.
Do not redesign, simplify, reinterpret, rotate, mirror, distort or recolor the logo.
Do not animate the sky, landscape, road structure, poles or background.
Do not introduce additional text, symbols, objects or signage.
Do not create excessive neon glow, lens flares, sparks or dramatic light rays.
No cuts, transitions, sudden exposure changes or scene changes.
No dialogue, voiceover, music or added sound effects.
```

### 7. 터미널 타이핑 로고 리빌 애니메이션

검은 화면에 커서가 깜빡이며 로고 워드마크가 한 글자씩 타이핑되는 터미널/타자기 리빌. 텍스트형 워드마크 로고, 테크·개발·스타트업 브랜드에 잘 어울립니다.

**프롬프트 (복붙용 · 영어)**

```
Create one continuous 4-second logo reveal animation using the uploaded image as the exact reference for the logo's wordmark, letterforms, spelling, spacing, weight, and colors.

This is a minimal terminal-style typewriter reveal. It is not a redesign or reinterpretation of the logo. Only the way the existing wordmark appears on screen is animated.

STYLE
Minimal, clean, modern coding/terminal aesthetic. A retro-yet-modern command-line mood.

BACKGROUND
Pure solid black background filling the entire frame. No environment, gradient, texture, or decoration.

CAMERA
One continuous locked-off shot. Centered framing. No zoom, pan, tilt, rotation, or camera shake.

4-SECOND TIMELINE
0.0-0.6 seconds:
Begin on a completely black screen. A single thin vertical white text cursor (caret) appears at the starting position of the wordmark and blinks steadily. Nothing else is on screen.

0.6-2.8 seconds:
The wordmark types itself out one character at a time from left to right, exactly matching the uploaded logo's spelling and letterforms. As each character appears, the blinking cursor advances to the next character position, exactly like text being typed in a terminal. The typing pace is even, mechanical, and satisfying.

2.8-3.4 seconds:
Once the full wordmark is complete, the cursor blinks once or twice at the end of the text, then disappears.

3.4-4.0 seconds:
Hold on the completed wordmark, perfectly centered, exactly matching the uploaded logo in letterforms, spacing, weight, and color.

TYPOGRAPHY
Preserve the exact letterforms, capitalization, spelling, spacing, weight, and colors of the uploaded logo. If the uploaded logo is a plain wordmark, reproduce it precisely and do not substitute a different typeface.

STRICT CONSTRAINTS
Use only the uploaded reference logo as the source of truth for the text and its styling.
Do not redesign, restyle, translate, misspell, rotate, mirror, distort, or reinterpret the wordmark.
Do not add extra text, symbols, taglines, code lines, UI windows, browser frames, folders, icons, or watermarks.
Reveal the text only through the left-to-right typewriter effect. Letters must not fly in, slide, bounce, fade in individually, or appear out of order.
Keep the complete wordmark centered with generous margin and never crop it.

NEGATIVE PROMPT
No camera movement beyond a perfectly locked shot. No background other than solid black. No glow, neo
```