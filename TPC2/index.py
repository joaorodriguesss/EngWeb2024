import json
import os

preHTML = """
<!DOCTYPE html>
<html lang="en">

    <head>
        <title>Ruas de Braga</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1" >
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    </head>

    <body>

        <div class="w3-card-4">

            <header class="w3-container w3-black">
                <h3>Ruas de Braga</h3>
            </header>

            <div class="w3-container">
                <ul class="w3-ul w3-card-4" style="width:50%">
"""

posHTML = """
                </ul>
            </div>

            <footer class="w3-container w3-black">
                <h5>Feito por A100711</h5>
            </footer>

        </div>

    </body>

</html>
"""

os.chdir("C:/Users/35193/Documents/GitHub/EngWeb2024/TPC2")

content = ""
with open('mapa-virtual.json', 'r', encoding='utf-8') as f:
    data = json.load(f)
    cities = sorted(data['cidades'], key=lambda x: x['nome'])
    for cidade in cities:
        content += "<li><a href=\"./" + cidade['id'] + "\">" + cidade['nome'] + " (" + cidade['distrito'] + ")""</a></li>\n"
    
pageHTML = preHTML + content + posHTML

f = open('./cidadesSite/index.html', 'w', encoding='utf-8')
f.write(pageHTML)
f.close()