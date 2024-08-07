# I created this project in just one day using AI.
My goal was to convert cricket leagues data from cricsheet.org into a cricket statistics website. Starting with v0.dev, I prompted it to generate different pages for the website, resulting in a quick UI generation.

Check out the pages:
- Landing Page: https://lnkd.in/dDDnAxBd
- Player List Page: https://lnkd.in/dWZ2RqAY
- Player Stats Page: https://lnkd.in/dSewvTW2

After obtaining the UI, I utilized Github Copilot and ChatGPT to convert ball-by-ball data from cricsheet.org into individual player stats. With scripts looping over JSON files, I transformed them into league player statistics files. Additionally, Google Gemini assisted in creating the website logo.

Next, I used Next.js to generate static pages from the data. Next.js efficiently produced over 10,000 pages within minutes, resulting in a fully functional cricket statistics website for all T20 leagues and T20 international tournaments. The website operates without an API server, with all pages being statically generated, and search indexes retrieved from the build.

Finally, the website is deployed on Vercel.

# Cricket Statistics

## Deployment

Everything needed to launch cricket website is included in this repo, Just click following button to deploy
website to vercel.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FUsmanHaider15%2Fcricket-statistics&root-directory=apps%2Fcricareer-web&project-name=cricket-statistics&repository-name=cricket-statistics&demo-title=Cricket%20Statistics&demo-description=A%20statically%20generated%20cricket%20statistics%20website%20using%20AI&demo-url=https%3A%2F%2Fcricket-statistics.vercel.app%2F&demo-image=https://cricareer.s3.eu-north-1.amazonaws.com/logo.jpeg)

## Overview

This Cricket Statistics Website is a comprehensive platform offering in-depth statistics for both bowling and batting across all major cricket leagues and T20 International matches for both male and female players. Whether you're a cricket enthusiast, a sports analyst, or a casual fan, this website provides detailed insights into the performance of players from various leagues around the world.

## Features

### Comprehensive League Coverage
- **Indian Premier League (IPL)**
- **Pakistan Super League (PSL)**
- **Big Bash League (BBL)**
- **Lanka Premier League (LPL)**
- **Caribbean Premier League (CPL)**
- **Bangladesh Premier League (BPL)**
- **Super Smash Male**
- **Super Smash Female**
- **Mzansi Super League (MSL)**
- **The Hundreds Male**
- **The Hundreds Female**
- **Women's Big Bash League (WBBL)**
- **T20 Blast (NTB)**
- **T20 Internationals (Male & Female)**

### Detailed Player Statistics
- **Batting Stats**:
  - Matches played
  - Outs and Not Outs
  - Total Runs and Highest Score
  - Batting Average
  - Balls Faced and Strike Rate
  - Centuries and Half-Centuries
  - Fours and Sixes
  - Catches and Stumpings

- **Bowling Stats**:
  - Matches played
  - Balls Bowled and Runs Conceded
  - Wickets Taken and Best Bowling Figures
  - Bowling Average and Economy Rate
  - Strike Rate
  - Four-Wicket and Five-Wicket Hauls

### Player Insights
- **Overall Performance**: Aggregate statistics for players across all seasons and matches.
- **Seasonal Performance**: Breakdown of player performance season by season.
- **Opposition Analysis**: Statistics of player performance against different teams and oppositions.

### User-Friendly Interface
- **Easy Navigation**: Quickly access stats for different leagues and players through a clean and intuitive interface.
- **Search and Filter**: Easily find specific players or statistics with robust search and filter options.

### Value Proposition
- **Data-Driven Insights**: Empower your cricket analysis with detailed, data-driven insights.
- **Broad Coverage**: Access statistics from a wide range of leagues and international matches, all in one place.
- **Performance Tracking**: Keep track of your favorite players' performances over time and against various oppositions.
- **Informed Decisions**: Make informed decisions whether you're a cricket analyst, coach, player, or fan.
