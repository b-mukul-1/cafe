# 3D GLB Model Requirements & Specifications for A2 Cafe

The A2 Cafe 3D engine includes procedural 3D fallbacks (procedural cup, particle steam, orbiting coffee beans, deconstructed burger, and layered patisserie) that render out-of-the-box with zero assets required.

When you are ready to introduce custom photorealistic 3D models, place your `.glb` files into this directory (`/public/models/`). The engine will automatically detect and swap to your production `.glb` assets.

---

### File Naming Convention
1. `cup.glb` — The hero coffee cup / ceramic mug (Scene 1 & 2)
2. `bean.glb` — The coffee bean geometry used for orbital instances (Scene 2 & 5)
3. `burger.glb` — The gourmet brioche burger with separable named layers (Scene 3 & 5)
4. `dessert.glb` — The signature patisserie / cheesecake slice (Scene 4 & 5)

---

### Geometry & Optimization Specifications
- **Format**: Binary glTF (`.glb`).
- **File Size**: Strictly **under 3.0 MB** per model (target 1.0 MB - 1.8 MB for smooth 4G loading).
- **Compression**: Draco or Meshopt compression enabled (`gltf-transform optimize`).
- **Polygon Count**:
  - `cup.glb`: 3,000 – 12,000 triangles.
  - `bean.glb`: 300 – 1,500 triangles.
  - `burger.glb`: 8,000 – 25,000 triangles across all layers.
  - `dessert.glb`: 5,000 – 15,000 triangles.
- **Pivot / Origin**:
  - Center of mass must be centered at `(0, 0, 0)`.
  - Cup base should rest at `Y = 0` or center at `(0, 0, 0)`.
- **Scale**: Normalized 1 unit = 10-15 cm (bounding box fits comfortably within a 2.0 x 2.0 x 2.0 unit sphere).
- **Burger Hierarchical Naming** (for deconstruction animation):
  - Top Bun: `bun_top`
  - Greens / Lettuce: `lettuce`
  - Tomato: `tomato`
  - Cheese: `cheese`
  - Patty: `patty`
  - Bottom Bun: `bun_bottom`

---

### Textures & Materials
- **PBR Standard**: Metallic-Roughness workflow.
- **Texture Resolutions**: Max 1024x1024 (1K) or 2048x2048 (2K) embedded JPEG/WebP/Basis Universal.
- **Draw Calls**: Keep material count to 1-2 materials per model.
