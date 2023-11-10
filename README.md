# Baseball Scorecard App
The idea of this application is to be able to input a baseball game pitch by pitch as the scorekeeper and then have a record and box score data generated from that data.
[Click here for server code.](https://github.com/benvgrass/baseball-scorecard-server)
## Goals
### Part I
Start with just generating pbp and box score for a game without having saved teams/ players.
- [ ] Create a UI for inputting lineups 
- [ ] Create a UI for inputting pitch by pitch data
- [ ] Create a UI for viewing the box score
- [ ] Create a UI for viewing the game log
### Part II
Probably want to keep the ability to just create and then save box scores for a game, but also want to be able to save teams and players and then have the ability to create a game with those teams and players in a league.
- [ ] create database and set up schema/ api
- [ ] set up authentication and users
- [ ] create backend service to save and query data
## Future Considerations
- could have live game view in future
- aggregate player and league stats
- have leagues with schedule and games
- Connect player across leagues? 
- potential to have leagues choose visibility (private/ public) for game data
- retro scoresheet generation
- levels of specificity for input and how that could affect data generated
  - could have a "quick" mode where you just input the result of the play 
  - could have "detailed" mode where you input the pitch by pitch data including approx pitch location, pitch type, etc.
  - have to be able to handle game flow with all possibilities. 
## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
