import csv
import json
import os

os.chdir("C:/Users/35193/Documents/GitHub/EngWeb2024/AulaTP3")

def read_csv_file(file_path):
    bd = []
    try:
        with open(file_path, 'r') as csv_file:
            csv_reader = csv.DictReader(csv_file, delimiter=';')
            
            for row in csv_reader:
                bd.append(row)
    except FileNotFoundError:
        print("File not found")
    except Exception as e:
        print(f"Error: {e}")
    
    return bd

def pertence(valor, lista):   
    encotrado = False
    i = 0
    while i < len(lista) and not encotrado:
        if lista[i]['designacao'] == valor:
            encotrado = True
        i += 1

    return encotrado


def calculate_especies(bd):
    especies = []
    contador = 1

    for reg in bd:
        if not pertence(reg['BreedIDDesc'], especies):
            especies.append({
                "id": f'e{contador}',
                "designacao": reg['BreedIDDesc'],
            })
        contador += 1

    return especies

def calculate_animais(bd):
    animais = []
    contador = 1

    for reg in bd:
        if not pertence(reg['SpeciesIDDesc'], animais):
            animais.append({
                "id": f'a{contador}',
                "designacao": reg['SpeciesIDDesc'],
            })
        contador += 1

    return animais


file_path = 'Health_AnimalBites.csv'
myBD = read_csv_file(file_path)
especies = calculate_especies(myBD)
animais = calculate_animais(myBD)


novaBD = {
    "ocorrencias" :myBD,
    "especies" :especies,
    "animais" :animais 
}

f = open("mordidas.json", "w")
json.dump(novaBD, f, indent=4)
f.close()

"""
for elem in myBD:
    print(elem)
    print("=================\n")
"""

#print(json.dumps(myBD, indent=4))