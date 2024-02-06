import json
import os

html = '''
<!DOCTYPE html>
<html>
<head> 
    <title>EngWeb2024</title>
    <meta charset = "UTF-8">
</head>
<body>
'''

template = html

file = open("C:/Users/35193/Documents/GitHub/EngWeb2024/TPC1/mapa.json", "r", encoding="utf-8").read()
os.mkdir("html")

content = json.loads(file)

html += "<ul>"

listaCidades = []
for elem in content ["cidades"]:
    listaCidades.append(elem['nome'])

    templateCidade = template
    templateCidade += f"<h1>{elem['nome']}</h1>"
    templateCidade += f"<h3>{elem['distrito']}</h3>"
    templateCidade += f"<p><b>População:</b>{elem['população']}</p>"
    templateCidade += f"<p><b>Descrição:</b>{elem['descrição']}</p>"
    # templateCidade += f"<h6><a href="">Voltar</a></h6>"
    templateCidade += "</body>"
    templateCidade += "</html>"

    fileCidade = open(f"html/{elem['nome']}.html","w", encoding="utf-8")
    fileCidade.write(templateCidade)
    fileCidade.close() 

   
for elem in sorted(listaCidades):
    html += "<li><a href="f"html/{elem['nome']}.html"">{elem}<a/></li>"

html += "</ul>"

html += "</body>"
html += "</html>"

file = open("mapa_sorted.html","w", encoding="utf-8")
file.write(html)
file.close()