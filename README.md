# Silicon Valley Simulator

A 3D game inspired by Silicon Valley, featuring a virtual tech town with various companies. Built with Three.js and TypeScript.

## Features

- Explore a 3D virtual Silicon Valley with tech company buildings
- First-person navigation with WASD keys and mouse look
- Click on buildings to view company information
- Realistic 3D environment with buildings, roads, and sky

## Tech Stack

- TypeScript
- Three.js for 3D rendering
- Vite for fast development and building

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- pnpm (v10.5.2 or higher)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/silicon-valley.git
cd silicon-valley
```

2. Install dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm dev
```

4. Open your browser and navigate to `http://localhost:5173`

## How to Play

- Use **WASD** keys to move around
- Use the **mouse** to look around
- **Click** on buildings to view company information
- Press **ESC** to exit pointer lock mode

## Project Structure

- `src/core/` - Core game engine components
- `src/world/` - 3D world elements (buildings, ground, sky)
- `src/controllers/` - Player movement and camera controls
- `src/interaction/` - Object interaction via raycasting
- `src/ui/` - User interface components
- `src/data/` - Company data and registry
- `src/types/` - TypeScript type definitions

## Building for Production

To build the project for production:

```bash
pnpm build
```

The built files will be in the `dist/` directory.

## License

ISC
