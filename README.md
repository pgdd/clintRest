## EXPRESS API
## Quick Start

#### Download



```bash
git clone https://github.com/pgdd/clintRest.git
```

Or download [zip](https://github.com/pgdd/clintRest/archive/master.zip)

#### Launch mongoDB
Launch [mongo](https://www.mongodb.org/) first :

```bash
mongod
```

#### Launch app

In a new shell :

```bash
npm install
```

then

```bash
npm test
```
```bash
npm start
```

## API GUIDE
### Marques
#### Routes
 HTTP|routes|Result
:----|:----|:----:
GET|/api/marques | index marques
GET|/api/marques/:id | show marque
POST|/api/marques | create marque
PUT|/api/marques/:id | update marque
DELETE|/api/marquees/:id | delete marque

####Content-Type application/json

Create and update a marque by sending JSON:

```json
  {
    "name": "Peugeot"
  }
```
NB: We need to define at least the name.

### Vehicules
#### Routes
 HTTP|routes|Result
:----|:----|:----:
GET|/api/vehicules | index vehicules
GET|/api/vehicules/:id | show vehicule
POST|/api/vehicules | create vehicule
PUT|/api/vehicules/:id | update vehicule
DELETE|/api/vehicules/:id | delete vehicule

#### Content-Type application/json
 Create a vehicule by sending JSON :

```json
  {
    "name": "207",
    "marque": "Peugeot"
  }
```

create a vehicule without defining a marque by sending JSON:

```json
  {
    "name": "Clio"
  }
```
update a vehicule to define it marque by sending JSON:

```json
  {
    "marque": "Renault"
  }
```
This will push the targeted vehicule object into the appropiate marque object in the database.

NB: we need to define marque parameters with names of marques already registered in the database.

### Special Query

#### Index vehicules by marque name
#####Route :

 HTTP|routes|Result
:----|:----|:----:
GET|/api/vehicules/marque/:name | index vehicules by marque

#####Exemple :

```bash
curl http://localhost:3000/vehicules/marque/Peugeot
```

This will respond with a list of vehicules Peugeot. This list is populated from the key "vehicules" of the Peugeot object.
