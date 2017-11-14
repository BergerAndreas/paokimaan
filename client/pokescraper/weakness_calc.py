
TYPES = {"normal":
             {"weak_against": ["fighting"],
              "resists": [],
              "no_effect": ["ghost"]},

         "fairy":
             {"weak_against": ["poison", "steel"],
              "resists": ["fighting", "dark", "bug"],
              "no_effect": ["dragon"]},

         "steel":
             {"weak_against": ["fighting", "fire", "ground"],
              "resists": ["ice", "rock", "fairy", "normal", "flying", "psychic", "bug", "grass", "dragon", "steel"],
              "no_effect": []},
         "dark":
             {"weak_against": ["fighting", "bug", "fairy"],
              "resists": ["dark", "ghost"],
              "no_effect": ["psychic"]},
         "dragon":
             {"weak_against": ["ice", "dragon", "fairy"],
              "resists": ["fire", "water", "electric", "grass"],
              "no_effect": []},
         "ghost":
              {"weak_against": ["ghost", "dark"],
              "resists": ["bug", "poison"],
              "no_effect": ["normal", "fighting"]},
         "rock":
             {"weak_against": ["water", "grass", "fighting", "ground", "steel"],
              "resists": ["fire", "flying", "normal", "poison"],
              "no_effect": []},
         "bug":
             {"weak_against": ["fire", "flying", "rock"],
              "resists": ["grass", "fighting", "ground"],
              "no_effect": []},
         "psychic":
             {"weak_against": ["bug", "ghost", "dark"],
              "resists": ["fighting", "psychic"],
              "no_effect": []},
         "flying":
             {"weak_against": ["electric", "ice", "rock"],
              "resists": ["fighting", "grass", "bug"],
              "no_effect": ["ground"]},
         "ground":
             {"weak_against": ["water", "ice", "grass"],
              "resists": ["fire", "electric", "poison", "rock", "steel"],
              "no_effect": ["electric"]},
         "poison":
             {"weak_against": ["ground", "psychic"],
              "resists": ["grass", "fairy", "fighting", "bug"],
              "no_effect": []},
         "fighting":
             {"weak_against": ["flying", "psychic", "fairy"],
              "resists": ["bug", "rock", "dark"],
              "no_effect": []},
         "ice":
             {"weak_against": ["fire", "fight", "rock", "steel"],
              "resists": ["ice"],
              "no_effect": []},
         "grass":
             {"weak_against": ["fire", "ice", "poison", "flying", "bug"],
              "resists": ["grass", "water", "ground", "electric"],
              "no_effect": []},
         "electric":
             {"weak_against": ["ground"],
              "resists": ["electric", "steel", "flying"],
              "no_effect": []},
         "water":
             {"weak_against": ["electric", "grass"],
              "resists": ["water", "fire", "ice"],
              "no_effect": []},
         "fire":
             {"weak_against": ["ground", "water", "rock"],
              "resists": ["fire", "grass", "ice", "bug", "steel"],
              "no_effect": []},
}

def get_weaknesses(types):

    thing_dic = {"weak_against": [],
                 "resists":[],
                 "no_effect": []
                 }

    for type in types:
        for weaknsess in TYPES[type]["weak_against"]:
            if weaknsess not in thing_dic["weak_against"]:
                thing_dic["weak_against"].append(weaknsess)

        for resistor in TYPES[type]["resists"]:
            if resistor not in thing_dic["resists"]:
                thing_dic["resists"].append(resistor)

        for no_effect in TYPES[type]["no_effect"]:
            if no_effect not in thing_dic["no_effect"]:
                thing_dic["no_effect"].append(no_effect)

    for type in TYPES:
        if type in thing_dic["weak_against"] and type in thing_dic["resists"]:
            thing_dic["weak_against"].remove(type)
            thing_dic["resists"].remove(type)

        if type in thing_dic["no_effect"]:
            if type in thing_dic["weak_against"]:
                thing_dic["weak_against"].remove(type)
            if type in thing_dic["resists"]:
                thing_dic["resists"].remove(type)

    return thing_dic
