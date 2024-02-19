import json
import xmltodict
import urllib.parse
import os
import xml.etree.ElementTree as ET

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

os.chdir("C:/Users/35193/Documents/GitHub/EngWeb2024/TPC1")

streets = []
xmlDirectory = './MapaRuas/texto'
content = ""
for filename in os.listdir(xmlDirectory):
    if filename.endswith('.xml'):
        file_path = os.path.join(xmlDirectory, filename)
        
        tree = ET.parse(file_path)
        root = tree.getroot()
        
        street_number = root.find('.//meta/número').text
        street_name = root.find('.//meta/nome').text
        
        streets.append((int(street_number), street_name, filename))

for i, street in enumerate(streets):
    if street[1][0] == ' ':
        street_list = list(street)
        street_list[1] = street_list[1][1:]
        streets[i] = tuple(street_list)

streets_sorted = sorted(streets, key=lambda x: x[1])

for street_number, street_name, filename in streets_sorted:
    street_name_url = urllib.parse.quote(street_name.strip().replace(' ', '-'))
    list_item = f'<li><a href="{street_number}-{street_name_url}.html">{street_name}</a></li>\n'
    content += list_item
    
pageHTML = preHTML + content + posHTML

f = open('./ruasSite/index.html', 'w', encoding='utf-8')
f.write(pageHTML)
f.close()