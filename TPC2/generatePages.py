import os
import json

os.chdir("C:/Users/35193/Documents/GitHub/EngWeb2024/TPC2")

preHTML = """
<!DOCTYPE html>
<html lang="en">
    <head>
        <title>{title}</title>
        <meta charset="UTF-8">
        <meta nome="viewport" content="width=device-width, initial-scale=1" >
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-black">
                <h3>{cidade_nome}</h3>
                <address>
                <a href="index.html">Voltar à página principal</a>
            </address>
            </header>
            <div class="w3-container">
"""

posHTML = """
            </div>
            <footer class="w3-container w3-black">
                <h5>Feito por A100711</h5>
            </footer>
        </div>
    </body>
</html>
"""

def getLigacoes(cidade):
    ligacoes = []
    for ligacao in data['ligacoes']:
        if ligacao['origem'] == cidade['id']:
            ligacoes.append(ligacao)
    return ligacoes

def generateContent(cidade):
    content = "<p><h2>População</h2> " + str(cidade['população']) + " pessoas. </p>"
    content += "<p><h2>Descrição</h2> " + cidade['descrição'] + "</p>"
    content += "<p><h2>Distrito</h2> " + cidade['distrito'] + "</p>"

    cidadeLigacoes = getLigacoes(cidade)

    if len(cidadeLigacoes) > 0:
        content += "<h2>Ligações</h2>"
        content += "<ul>"
        for ligacao in cidadeLigacoes:
            cidadeDestino = next((item for item in cities if item["id"] == ligacao['destino']), None)
            content += "<li><a href=" + cidadeDestino['id'] + ">" + cidadeDestino['nome'] + "</a> (" + str(ligacao['distância']) + " km)</li>"
        content += "</ul>"
    else:
        content += "<h2>Ligações</h2>"
        content += "<p>Não existem ligações a outras cidades.</p>"
    return content

content = ""
with open('mapa-virtual.json', 'r', encoding='utf-8') as f:
    data = json.load(f)
    cities = sorted(data['cidades'], key=lambda x: x['nome'])
    for cidade in cities:
        cidade_nome = cidade['nome']
        content = generateContent(cidade)
        pageHTML = preHTML.format(title=cidade_nome, cidade_nome=cidade_nome) + content + posHTML
        f = open('./cidadesSite/' + cidade['id'] + '.html', 'w')
        f.write(pageHTML)
        f.close()