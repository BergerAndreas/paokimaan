## Planlagt applikasjon
Vi skal lage en web-applikasjon som fungerer som en pokedex, og samtidig skal tilfredsstille alle kravene i oppgaven. 
Brukere vil få en oversikt over diverse Pokemon, filtrere ved søk på navn, samt sortere disse basert på navn, type, vekt, høyde, osv. 
Vi ønsker også at brukere skal ha muligheten til å sette opp og lage et eget Pokemon team. 

## Arkitektur
Vi har valgt å benytte oss av designmønsteret MVC (Model-View-Controller), 
slik at endringene i brukergrensesnittet ikke har noen innvirkning på hvordan data håndteres, 
og omvendt. For å oppnå dette, velger vi å ta i bruk MEAN Stacken, som innebærer Angular 
(og i vårt tilfelle også Material for design) i frontend, med MongoDB som database sammen med Node/Express i backend. 
For å håndtere server-siden av web-applikasjonen vår, planlegger vi å bruke et REST API. 
~~Vi bruker mLab sin Amazon-deployment av MongoDB som “Database as a service (DBaaS)”.~~
Vi bruker mongoDB på virtuell maskin fordi vi er nødt...

### MEAN Stack implementasjon
<img src="https://www.dealfuel.com/wp-content/uploads/2016/10/meanjs-1024x492.png" width="600" height="300" />

### Database
Oversikt over attributtene i Pokemon-databasen: <br>
![Pokemon](http://folk.ntnu.no/kristsbo/Pokemon.png "Pokemon")

Oversikt over attributtene i User-databasen: <br>
![User](http://folk.ntnu.no/kristsbo/User.png "User")
