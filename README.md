# GoGoLand

## Objectives

- "General There's enemies on front", "I see enemies"

- Fog of War

- Special little attributes like kamikaze or push/move a piece, a piece that you can only see in front

- General A vs General B, and its band show its rank with medals

- Some maps have terrain which you can clean

- 2 quick games or one long game, can sign treaty of peace for equal rewards the longer the game goes

- Can put pieces wherever on the fog of war and open visuals

- "General that would be suicide!"

- "ATAAACK!" (Quick killing animation given the characters attacking with some flashes screenshots)

- Phrases everytime you put pieces like hearthstone

- When you hit the same space of another piece on fog of war, you gain vision and can put your piece anywhere around
if there is no space around, your piece dies

## Local Development

### Available Commands

| Command | Description |
|---------|-------------|
| `bun install` | Install project dependencies |
| `bun start` | Build project and open web server running project |
| `bun build` | Builds code bundle for production |
| `bun serve` | Starts a local web server for previewing the game |

### Deploying Code

After you run the `bun build` command, your code will be built into a single bundle located at
`dist/*` along with any other assets you project depended.

If you put the contents of the `dist` folder in a publicly-accessible location (say something like `http://myserver.com`),
you should be able to open `http://myserver.com/index.html` and play your game.

### Static Assets

Any static assets like images or audio files should be placed in the `public` folder. It'll then be served at `http://localhost:8080/path-to-file-your-file/file-name.file-type`.
