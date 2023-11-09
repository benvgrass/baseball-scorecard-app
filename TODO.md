# Todo and Notes
Ideas and tasks to implement for baseball scorecard app.
## Data To Model
### Game
- date and time
- location
- Teams (home and away)
    - lineups (players)
### Team
- name
- location
- players
### Player
- name
- team
- number
- position(s)
- handedness
### Play by Play
- game state
    - inning
    - outs
    - balls and strikes
    - runners on base
    - score
    - current at bat
#### At Bat
- batter
- pitcher
- result (result of last pitch)
    - batted ball
        - hit type (fly ball / ground ball / line drive)
        - hit location
        - result (single / double / triple / home run / out / error)
    - strikeout
        - looking / swinging
    - walk
    - hbp
    - catchers interference
- pitches
    - pitch type? (fastball, offspeed, breaking ball
    - pitch location (1-9 squares)
    - pitch result
        - called ball
        - called strike
        - swing
            - swinging strike
            - foul ball
            - ball in play (at bat result)
- substitutions
    - pinch hitter
    - pinch runner
    - defensive substitutions

## To-Do
### Views
- [x] Create a UI for inputting teams & lineups
- [ ] Create a UI for pbp gameplay

# Model for Game Data
## Game
### Game State
- inning (top/bottom)
- count (balls/strikes)
- outs
- batter(where in lineup)
- pitcher 
- active lineup and position in lineup
- game batter data entered after each PA
- game pitcher data entered after each PA

```typescript
type LiveGame =
  {
    state: {
      home_runs: number,
      away_runs: number,
      balls: number,
      strikes: number,
      outs: number,
      inning:
        {
          top: boolean,
          number: number
        },
      bases: [BaseState],
    },
    curr_pa: {
      batter: Player,
      pitcher: Player,
      result: PaResult,
      pitches: [Pitch]
    },
    past_pa: [PA]
}
type BaseState =
  {
    occupied: boolean,
    player: Player
  }
type Pa =
  {
    batter: Player,
    pitcher: Player,
    result: PaResult,
    events: [RunPitchEvent]
  }
type RunPitchEvent =
  {
    pitch?: PitchEvent,
    run_event?: RunningEvent,
    end_state: BaseState // lazy load start state on front end to display detailed event
  }
```
### Box score data
Box score data will be aggregated from the play data after submission of a play and then updated in the box score
Theoretically, league data would be updated via aggregation on submission of game data