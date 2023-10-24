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

## To-Do
### Views
- [ ] Create a UI for inputting teams & lineups
- [ ] Create a UI for pbp gameplay