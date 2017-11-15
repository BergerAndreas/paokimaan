from os import system as sys
from json import loads, dumps, dump

def get_pokemon(n):
    for i in range(2,4):
        url = "https://pokeapi.co/api/v2/pokemon/"+str(i)
        print(url)
        sys("wget " +url)

def json_to_dict():
    i = "2"

    with open("2") as file:
        json_file = file.read()
        dic = loads(json_file)

        #print(dic["name"],dic["weight"],dic["moves"][0]["move"]["name"], dic["height"])
        #print(dic["stats"][0]["stat"]["name"], dic["stats"][0]["base_stat"])
        #print(dic["sprites"])


def create_small_dic():
    hundreogfemtien = 152
    small_dic_list = []
    for i in range(1,hundreogfemtien):
        url = "https://pokeapi.co/api/v2/pokemon/"+str(i)
        print(url)
        sys("wget " +url)

    for k in range(1,hundreogfemtien):
        with open(str(k)) as file:
            json_file = file.read()
            big_dic = loads(json_file)

            small_dic = {}

            # Create name
            small_dic["name"] = big_dic["name"]
            small_dic["weight"] = big_dic["weight"]
            small_dic["height"] = big_dic["height"]

            moves = []
            for m in big_dic["moves"]:
                moves.append(m["move"]["name"])
            small_dic["moves"] = moves


            # Added to small_dic as dict {"stat":value, stat:"value",...}
            stats = {}
            for s in big_dic["stats"]:
                stats[s["stat"]["name"]] = s["base_stat"]
            small_dic["stats"] = stats

            # Added to small_dic as list
            games = []
            for game in big_dic["game_indices"]:
               games.append(game["version"]["name"])
            small_dic["in_games"] = games

            types = []
            for t in big_dic["types"]:
                types.append(t["type"]["name"])
            small_dic["type"] = types

            sprites = {}
            for t in big_dic["sprites"]:
              sprites[t] = big_dic["sprites"][t]
            small_dic["sprites"] = sprites

            small_dic["is_default"] = big_dic["is_default"]

            small_dic["id"] = big_dic["id"]
            small_dic["order"] = big_dic["order"]

            small_dic_list.append(small_dic)

            file.close()

        with open("pokemon.json", "w") as outfile:
            outfile.write(str(dumps(small_dic_list)))

    sys("mongoimport -h ds241395.mlab.com:41395 -d pokeweebs -c pokemon -u daase -p daase --file pokemon.json --jsonArray")


create_small_dic()
