import bs4
from pydantic import InstanceOf
import requests
import googletrans

links = []

with open("links.txt", "r", encoding="utf-8") as file:
    for line in file.readlines():
        if line.isspace() or line == "":
            continue
        
        links.append(line)

data = ""
translator = googletrans.Translator()

for link in links[:100]:
    print(f"Processing {link}")
    response = requests.get(link)
    soup = bs4.BeautifulSoup(response.content, 'html.parser')
    
    parent_div: bs4.element.Tag | bs4.element.NavigableString = soup.find("div", {"class": "entry-content"})
    
    if isinstance(parent_div, bs4.element.Tag):
        link_data = ""
        # find each child which is a paragraph and put it inside link_data with every new paragraph element having the <end> tag at the end of its contents
        for child in parent_div.findChildren(name="p"):
            p = translator.translate(child.text)
            link_data += p.text + "<end>"
            
        data += link_data + "\n"
    
# write the data to the file data.txt
with open("data.txt", "w", encoding="utf-8") as file:
    file.write(data)