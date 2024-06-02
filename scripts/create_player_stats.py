import json
import os


def sort_players_by_batting_matches(players):
    return dict(sorted(players.items(), key=lambda item: item[1]['overall']['batting']['matches'], reverse=True))


def create_new_player_dict():
    return {
        'batting': {
            'matches': 0, 'outs': 0, 'not_outs': 0, 'runs': 0, 'highest_score': 0,
            'average': 0, 'balls': 0, 'strike_rate': 0, 'centuries': 0,
            'half_centuries': 0, 'fours': 0, 'sixes': 0, 'catches': 0, 'stumpings': 0
        },
        'bowling': {
            'matches': 0, 'balls': 0, 'runs': 0, 'wickets': 0,
            'best_bowling': {'runs': 0, 'wickets': 0}, 'average': 0,
            'economy_rate': 0, 'strike_rate': 0, 'four_wickets': 0, 'five_wickets': 0
        }
    }


# Initialize an empty dictionary to store the statistics
player_stats = {}

for league in os.listdir('data'):
    league_path = os.path.join('data', league)
    if os.path.isdir(league_path):
        for filename in os.listdir(league_path):
            if filename.endswith('.json'):
                # Open and load the JSON file
                with open(os.path.join(league_path, filename)) as f:
                    match_data = json.load(f)
                # Get the season and teams
                season = match_data['info']['season']
                teams = match_data['info']['teams']

                registry = match_data['info']['registry']['people']
                # Get a list of all officials
                # Get a list of all officials, handling missing keys by using get with an empty list as default
                officials = (
                    match_data["info"].get("officials", {}).get(
                        "match_referees", [])
                    + match_data["info"].get("officials",
                                             {}).get("reserve_umpires", [])
                    + match_data["info"].get("officials",
                                             {}).get("tv_umpires", [])
                    + match_data["info"].get("officials",
                                             {}).get("umpires", [])
                )

                # Filter the registry to remove officials
                registry = {name: player_id for name, player_id in match_data["info"]["registry"]["people"].items(
                ) if name not in officials}

                # Initialize a set to keep track of players who have played in the match
                players_in_match = set()

                # Iterate over the deliveries in the match
                for inning in match_data['innings']:
                    batting_team = inning['team']
                    bowling_team = teams[1] if teams[0] == batting_team else teams[0]
                    inning_highest_score = {}
                    for over in inning['overs']:
                        for delivery in over['deliveries']:
                            batter_id = registry[delivery['batter']]
                            bowler_id = registry[delivery['bowler']]

                            # Add the player to the set of players in the match
                            players_in_match.add(batter_id)
                            players_in_match.add(bowler_id)

                            # If the player is not in the dictionary, add them
                            if batter_id not in player_stats:
                                player_stats[batter_id] = {'name': delivery['batter'], 'overall': create_new_player_dict(
                                ), 'by_season': {}, 'by_opposition': {}}
                            if bowler_id not in player_stats:
                                player_stats[bowler_id] = {'name': delivery['bowler'], 'overall': create_new_player_dict(
                                ), 'by_season': {}, 'by_opposition': {}}

                            # Initialize season and opposition if not present
                            if season not in player_stats[batter_id]['by_season']:
                                player_stats[batter_id]['by_season'][season] = create_new_player_dict(
                                )
                            if season not in player_stats[bowler_id]['by_season']:
                                player_stats[bowler_id]['by_season'][season] = create_new_player_dict(
                                )
                            if bowling_team not in player_stats[batter_id]['by_opposition']:
                                player_stats[batter_id]['by_opposition'][bowling_team] = create_new_player_dict(
                                )
                            if batting_team not in player_stats[bowler_id]['by_opposition']:
                                player_stats[bowler_id]['by_opposition'][batting_team] = create_new_player_dict(
                                )

                            player_stats[batter_id]['overall']['batting']['runs'] += delivery['runs']['batter']
                            player_stats[batter_id]['by_season'][season]['batting']['runs'] += delivery['runs']['batter']
                            player_stats[batter_id]['by_opposition'][bowling_team]['batting']['runs'] += delivery['runs']['batter']

                            # Check for extras in the delivery
                            extras = delivery.get('extras', {})

                            # Only increment the balls faced if the delivery is not a wide or a bye
                            if 'wides' not in extras and 'byes' not in extras:
                                player_stats[batter_id]['overall']['batting']['balls'] += 1
                                player_stats[batter_id]['by_season'][season]['batting']['balls'] += 1
                                player_stats[batter_id]['by_opposition'][bowling_team]['batting']['balls'] += 1

                            # Initialize empty inning_highest_score dictionary
                            if batter_id not in inning_highest_score:
                                inning_highest_score[batter_id] = {'overall': {
                                    'batting': {'runs': 0}}, 'by_season': {}, 'by_opposition': {}}
                            if season not in inning_highest_score[batter_id]['by_season']:
                                inning_highest_score[batter_id]['by_season'][season] = {
                                    'batting': {'runs': 0}}
                            if bowling_team not in inning_highest_score[batter_id]['by_opposition']:
                                inning_highest_score[batter_id]['by_opposition'][bowling_team] = {
                                    'batting': {'runs': 0}}

                            inning_highest_score[batter_id]['overall']['batting']['runs'] += delivery['runs']['batter']
                            inning_highest_score[batter_id]['by_season'][season]['batting']['runs'] += delivery['runs']['batter']
                            inning_highest_score[batter_id]['by_opposition'][bowling_team][
                                'batting']['runs'] += delivery['runs']['batter']

                            player_stats[bowler_id]['overall']['bowling']['runs'] += delivery['runs']['total']
                            player_stats[bowler_id]['overall']['bowling']['balls'] += 1
                            player_stats[bowler_id]['by_season'][season]['bowling']['runs'] += delivery['runs']['total']
                            player_stats[bowler_id]['by_season'][season]['bowling']['balls'] += 1
                            player_stats[bowler_id]['by_opposition'][batting_team]['bowling']['runs'] += delivery['runs']['total']
                            player_stats[bowler_id]['by_opposition'][batting_team]['bowling']['balls'] += 1

                            if delivery['runs']['batter'] == 4:
                                player_stats[batter_id]['overall']['batting']['fours'] += 1
                                player_stats[batter_id]['by_season'][season]['batting']['fours'] += 1
                                player_stats[batter_id]['by_opposition'][bowling_team]['batting']['fours'] += 1
                            elif delivery['runs']['batter'] == 6:
                                player_stats[batter_id]['overall']['batting']['sixes'] += 1
                                player_stats[batter_id]['by_season'][season]['batting']['sixes'] += 1
                                player_stats[batter_id]['by_opposition'][bowling_team]['batting']['sixes'] += 1
                                # Update the highest score
                            if inning_highest_score[batter_id]['overall']['batting']['runs'] > player_stats[batter_id]['overall']['batting']['highest_score']:
                                player_stats[batter_id]['overall']['batting'][
                                    'highest_score'] = inning_highest_score[batter_id]['overall']['batting']['runs']
                            if inning_highest_score[batter_id]['by_season'][season]['batting']['runs'] > player_stats[batter_id]['by_season'][season]['batting']['highest_score']:
                                player_stats[batter_id]['by_season'][season]['batting'][
                                    'highest_score'] = inning_highest_score[batter_id]['by_season'][season]['batting']['runs']
                            if inning_highest_score[batter_id]['by_opposition'][bowling_team]['batting']['runs'] > player_stats[batter_id]['by_opposition'][bowling_team]['batting']['highest_score']:
                                player_stats[batter_id]['by_opposition'][bowling_team]['batting'][
                                    'highest_score'] = inning_highest_score[batter_id]['by_opposition'][bowling_team]['batting']['runs']

                            if 'wickets' in delivery:
                                for wicket in delivery['wickets']:
                                    kind = wicket['kind']
                                    player_out_id = registry[wicket['player_out']]

                                    if player_out_id not in player_stats:
                                        player_stats[player_out_id] = {'name': wicket['player_out'], 'overall': create_new_player_dict(
                                        ), 'by_season': {}, 'by_opposition': {}}

                                    if season not in player_stats[player_out_id]['by_season']:
                                        player_stats[player_out_id]['by_season'][season] = create_new_player_dict(
                                        )
                                    if bowling_team not in player_stats[player_out_id]['by_opposition']:
                                        player_stats[player_out_id]['by_opposition'][bowling_team] = create_new_player_dict(
                                        )

                                    player_stats[player_out_id]['overall']['batting']['outs'] += 1
                                    player_stats[player_out_id]['by_season'][season]['batting']['outs'] += 1
                                    player_stats[player_out_id]['by_opposition'][bowling_team]['batting']['outs'] += 1

                                    player_stats[bowler_id]['overall']['bowling']['wickets'] += 1
                                    player_stats[bowler_id]['by_season'][season]['bowling']['wickets'] += 1
                                    player_stats[bowler_id]['by_opposition'][batting_team]['bowling']['wickets'] += 1

                                    if kind in ['caught', 'caught and bowled']:
                                        if 'fielders' in wicket:
                                            for fielder in wicket['fielders']:
                                                if 'name' in fielder:
                                                    fielder_id = registry[fielder['name']]
                                                    if fielder_id not in player_stats:
                                                        player_stats[fielder_id] = {
                                                            'name': fielder['name'],
                                                            'overall': create_new_player_dict(),
                                                            'by_season': {},
                                                            'by_opposition': {}
                                                        }
                                                    # If the season or opponent is not in the player's statistics, add it
                                                    if season not in player_stats[fielder_id]['by_season']:
                                                        player_stats[fielder_id]['by_season'][season] = create_new_player_dict(
                                                        )
                                                    if batting_team not in player_stats[fielder_id]['by_opposition']:
                                                        player_stats[fielder_id]['by_opposition'][batting_team] = create_new_player_dict(
                                                        )
                                                    player_stats[fielder_id]['overall']['batting']['catches'] += 1
                                                    player_stats[fielder_id]['by_season'][season]['batting']['catches'] += 1
                                                    player_stats[fielder_id]['by_opposition'][batting_team]['batting']['catches'] += 1
                                                else:
                                                    print(
                                                        "Fielder name is missing in wicket data:", fielder)

                                        if kind == 'caught and bowled':
                                            # Update catches for the bowler in overall stats
                                            player_stats[bowler_id]['overall']['batting']['catches'] += 1
                                            # Update catches in by_season for the bowler
                                            player_stats[bowler_id]['by_season'][season]['batting']['catches'] += 1
                                            # Update catches in by_opposition for the bowler
                                            player_stats[bowler_id]['by_opposition'][batting_team]['batting']['catches'] += 1

                                    elif kind == 'stumped':
                                        if 'fielders' in wicket:
                                            for fielder in wicket['fielders']:
                                                fielder_id = registry[fielder['name']]
                                                if fielder_id not in player_stats:
                                                    player_stats[fielder_id] = {'name': fielder['name'], 'overall': create_new_player_dict(
                                                    ), 'by_season': {}, 'by_opposition': {}}
                                                if season not in player_stats[fielder_id]['by_season']:
                                                    player_stats[fielder_id]['by_season'][season] = create_new_player_dict(
                                                    )
                                                if batting_team not in player_stats[fielder_id]['by_opposition']:
                                                    player_stats[fielder_id]['by_opposition'][batting_team] = create_new_player_dict(
                                                    )

                                                # Update stumpings in overall stats
                                                player_stats[fielder_id]['overall']['batting']['stumpings'] += 1
                                                # Update stumpings in by_season
                                                player_stats[fielder_id]['by_season'][season]['batting']['stumpings'] += 1
                                                # Update stumpings in by_opposition
                                                player_stats[fielder_id]['by_opposition'][batting_team]['batting']['stumpings'] += 1

                    # Calculate if players in inning_highest_score have scored a century or half century
                    for player_id, stats in inning_highest_score.items():
                        if stats['overall']['batting']['runs'] >= 100:
                            player_stats[player_id]['overall']['batting']['centuries'] += 1
                        elif stats['overall']['batting']['runs'] >= 50:
                            player_stats[player_id]['overall']['batting']['half_centuries'] += 1
                        if stats['by_season'][season]['batting']['runs'] >= 100:
                            player_stats[player_id]['by_season'][season]['batting']['centuries'] += 1
                        elif stats['by_season'][season]['batting']['runs'] >= 50:
                            player_stats[player_id]['by_season'][season]['batting']['half_centuries'] += 1
                        if stats['by_opposition'][bowling_team]['batting']['runs'] >= 100:
                            player_stats[player_id]['by_opposition'][bowling_team]['batting']['centuries'] += 1
                        elif stats['by_opposition'][bowling_team]['batting']['runs'] >= 50:
                            player_stats[player_id]['by_opposition'][bowling_team]['batting']['half_centuries'] += 1

                # Update the number of matches played for each player in the match
                for player_name, player_id in registry.items():
                    if player_id not in player_stats:
                        player_stats[player_id] = {'name': player_name, 'overall': create_new_player_dict(
                        ), 'by_season': {}, 'by_opposition': {}}
                    player_stats[player_id]['overall']['batting']['matches'] += 1
                    player_stats[player_id]['overall']['bowling']['matches'] += 1

                    if season not in player_stats[player_id]['by_season']:
                        player_stats[player_id]['by_season'][season] = create_new_player_dict(
                        )
                    player_stats[player_id]['by_season'][season]['batting']['matches'] += 1
                    player_stats[player_id]['by_season'][season]['bowling']['matches'] += 1

                    for opposition in teams:
                        if opposition not in player_stats[player_id]['by_opposition']:
                            player_stats[player_id]['by_opposition'][opposition] = create_new_player_dict(
                            )
                        player_stats[player_id]['by_opposition'][opposition]['batting']['matches'] += 1
                        player_stats[player_id]['by_opposition'][opposition]['bowling']['matches'] += 1

                # Calculate the batting average and strike rate
                for player_id in player_stats:
                    if player_stats[player_id]['overall']['batting']['outs'] > 0:
                        player_stats[player_id]['overall']['batting']['average'] = player_stats[player_id]['overall']['batting']['runs'] / \
                            player_stats[player_id]['overall']['batting']['outs']
                    if player_stats[player_id]['overall']['batting']['balls'] > 0:
                        player_stats[player_id]['overall']['batting']['strike_rate'] = (
                            player_stats[player_id]['overall']['batting']['runs'] / player_stats[player_id]['overall']['batting']['balls']) * 100

                    for season in player_stats[player_id]['by_season']:
                        if player_stats[player_id]['by_season'][season]['batting']['outs'] > 0:
                            player_stats[player_id]['by_season'][season]['batting']['average'] = player_stats[player_id]['by_season'][season]['batting']['runs'] / \
                                player_stats[player_id]['by_season'][season]['batting']['outs']
                        if player_stats[player_id]['by_season'][season]['batting']['balls'] > 0:
                            player_stats[player_id]['by_season'][season]['batting']['strike_rate'] = (
                                player_stats[player_id]['by_season'][season]['batting']['runs'] / player_stats[player_id]['by_season'][season]['batting']['balls']) * 100

                    for opposition in player_stats[player_id]['by_opposition']:
                        if player_stats[player_id]['by_opposition'][opposition]['batting']['outs'] > 0:
                            player_stats[player_id]['by_opposition'][opposition]['batting']['average'] = player_stats[player_id]['by_opposition'][opposition]['batting']['runs'] / \
                                player_stats[player_id]['by_opposition'][opposition]['batting']['outs']
                        if player_stats[player_id]['by_opposition'][opposition]['batting']['balls'] > 0:
                            player_stats[player_id]['by_opposition'][opposition]['batting']['strike_rate'] = (
                                player_stats[player_id]['by_opposition'][opposition]['batting']['runs'] / player_stats[player_id]['by_opposition'][opposition]['batting']['balls']) * 100

                # Calculate bowling averages, economy rate and strike rate
                for player_id in player_stats:
                    if player_stats[player_id]['overall']['bowling']['wickets'] > 0:
                        player_stats[player_id]['overall']['bowling']['average'] = player_stats[player_id]['overall']['bowling']['runs'] / \
                            player_stats[player_id]['overall']['bowling']['wickets']
                        player_stats[player_id]['overall']['bowling']['economy_rate'] = player_stats[player_id]['overall']['bowling']['runs'] / \
                            (player_stats[player_id]['overall']
                             ['bowling']['balls'] / 6)
                        player_stats[player_id]['overall']['bowling']['strike_rate'] = player_stats[player_id]['overall']['bowling']['balls'] / \
                            player_stats[player_id]['overall']['bowling']['wickets']

                    for season in player_stats[player_id]['by_season']:
                        if player_stats[player_id]['by_season'][season]['bowling']['wickets'] > 0:
                            player_stats[player_id]['by_season'][season]['bowling']['average'] = player_stats[player_id]['by_season'][season]['bowling']['runs'] / \
                                player_stats[player_id]['by_season'][season]['bowling']['wickets']
                            player_stats[player_id]['by_season'][season]['bowling']['economy_rate'] = player_stats[player_id]['by_season'][season]['bowling']['runs'] / \
                                (player_stats[player_id]['by_season']
                                 [season]['bowling']['balls'] / 6)
                            player_stats[player_id]['by_season'][season]['bowling']['strike_rate'] = player_stats[player_id]['by_season'][season]['bowling']['balls'] / \
                                player_stats[player_id]['by_season'][season]['bowling']['wickets']

                    for opposition in player_stats[player_id]['by_opposition']:
                        if player_stats[player_id]['by_opposition'][opposition]['bowling']['wickets'] > 0:
                            player_stats[player_id]['by_opposition'][opposition]['bowling']['average'] = player_stats[player_id]['by_opposition'][opposition]['bowling']['runs'] / \
                                player_stats[player_id]['by_opposition'][opposition]['bowling']['wickets']
                            player_stats[player_id]['by_opposition'][opposition]['bowling']['economy_rate'] = player_stats[player_id]['by_opposition'][opposition]['bowling']['runs'] / \
                                (player_stats[player_id]['by_opposition']
                                 [opposition]['bowling']['balls'] / 6)
                            player_stats[player_id]['by_opposition'][opposition]['bowling']['strike_rate'] = player_stats[player_id]['by_opposition'][opposition]['bowling']['balls'] / \
                                player_stats[player_id]['by_opposition'][opposition]['bowling']['wickets']

        # Write the player_stats to a JSON file named after the league
        with open(f'../apps/cricareer-web/data/{league}.json', 'w') as f:
            player_stats = [[player_id, stats]
                            for player_id, stats in player_stats.items()]
            player_stats = sorted(
                player_stats, key=lambda x: x[1]['overall']['batting']['matches'], reverse=True)
            json.dump(player_stats, f)

        player_stats = {}
