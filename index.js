import express from 'express';
import morgan from 'morgan';
import fetch from 'node-fetch';
import Pokedex from 'pokedex-promise-v2'

const response = await fetch('https://pokeapi.co/api/v2/pokemon');
const app = express();
const data = await response.json();
const P = new Pokedex();

//Settings
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2)

//Server
app.listen(app.get('port'), ()=>{
    console.log(`server listening on port ${app.get('port')}`);
})

//Functions
function DoubleDamage(doubleDamage) {
    let x = 0;
    for (let i = 0; i < doubleDamage.length; ++i) {
        if (tiposPokemon === doubleDamage) {
            x = x+70;
        }
    }
    return x;
}

function HalfDamage(halfDamage, tipoPok) {
    let x = 0;
    for (let i = 0; i < halfDamage.length; ++i) {
        if (tiposPokemon === halfDamage) {
            x = x+30;
        }
    }
    return x;
}

function NoDamage(noDamage) {
    let x = 0;
    for (let i = 0; i < noDamage.length; ++i) {
        if (tiposPokemon === noDamage) {
            x = x+0;
        }
    }
    return x;
}
function CalcularGanador(tiposPokemon) {
    for (let i = 0; tiposPokemon < tiposPokemon.length; ++i) {
        DoubleDamage(doubleDamageToPoke1);
        HalfDamage(halfDamageToPoke1);
        NoDamage(noDamageToPoke1);       
    }
}


//Middlewares 
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Routes
app.get('/', (req, res)=>{
    res.json(data);
    //console.log(data);
})

app.post('/', (req, res)=>{
    const { primerPokemon, segundoPokemon } = req.body;
    //Alamacenar tipos Pokemon
    let tiposPokemon = [];
    let tiposPokemon2 = [];
    //Relaciones de daño Pokemon 1
    let doubleDamageFromPoke1 = [];
    let doubleDamageToPoke1 = [];
    let halfDamageFromPoke1 = [];
    let halfDamageToPoke1 = [];
    let noDamageFromPoke1 = [];
    let noDamageToPoke1 = [];
    //Relaciones de daño Pokemon 2
    let doubleDamageFromPoke2 = [];
    let doubleDamageToPoke2 = [];
    let halfDamageFromPoke2 = [];
    let halfDamageToPoke2 = [];
    let noDamageFromPoke2 = [];
    let noDamageToPoke2 = [];
    if (primerPokemon && segundoPokemon) {

        //Extracción de información primer pokemon
        P.getPokemonByName(`${primerPokemon}`)
            .then((response) => {
                //console.log(response.stats);
                console.log('El primer Pokemon es: '+primerPokemon);
            const stats = response.stats;
            for(const s of stats.values()){
                const stat = s.stat;
                if (stat.name === 'hp') {
                    console.log(stat);
                    console.log(s.base_stat);
                    break;
                }
            }
            //console.log (response.types);
            const types = response.types;
            for(const t of types.values()){
                console.log(t.type);
                const type = t.type;
                console.log (type.name);
                //console.log(tiposPokemon1); 
                P.getTypeByName(type.name)
                .then((response) => {
                    //console.log('Las relaciones de daño corresponden al elemento: '+type.name);
                    const damage = response.damage_relations;
                    const ddf = damage.double_damage_from;
                    const ddt = damage.double_damage_to;
                    const hdf = damage.half_damage_from;
                    const hdt = damage.half_damage_to;
                    const ndf = damage.no_damage_from;
                    const ndt = damage.no_damage_to;
                    //console.log(damage);

                    //Calcular ataque

                    for(const u of ddt.values()){
                        let ddTo = u.name;
                        //console.log('Doble daño a: '+ddTo);
                        doubleDamageToPoke1.push([ddTo]);
                    }
                    //console.log('Inflinge el doble de daño a: '+doubleDamageToPoke1);
                    
                    for(const u of hdt.values()){
                        let hdTo = u.name;
                        //console.log('Mitad de daño a: '+hdTo);
                        halfDamageToPoke1.push([hdTo]);
                    }
                    //console.log('Inflinge la mitad del daño a: '+halfDamageToPoke1);
                    
                    for(const u of ndt.values()){
                        let ndTo = u.name;
                        //console.log('No recibe daño de: '+ndTo);
                        noDamageToPoke1.push([ndTo]);
                    }
                    //console.log('No inflinge daño a: '+noDamageToPoke1);

                    //Recibir daño

                    for(const u of ddf.values()){
                        let ddFrom = u.name;
                        //console.log('Doble daño de: '+ddFrom);
                        doubleDamageFromPoke1.push([ddFrom]);
                    }
                    //console.log('Recibe el doble de daño de: '+doubleDamageFromPoke1);
                    for(const u of hdf.values()){
                        let hdFrom = u.name;
                        //console.log('Mitad de daño de: '+hdFrom);
                        halfDamageFromPoke1.push([hdFrom]);
                    }
                    //console.log('Recibe la mitad del daño de: '+halfDamageFromPoke1);
                    for(const u of ndf.values()){
                        let ndFrom = u.name;
                        //console.log('No inflige daño a: '+ndFrom);
                        noDamageFromPoke1.push([ndFrom]);
                    }
                    //console.log('No recibe daño de: '+noDamageFromPoke1);
                        })
                    .catch((error) => {
                    console.log('There was an ERROR: ', error);
                    });
            }
            })
            .catch((error) => {
            console.log('There was an ERROR: ', error);
            });

            //Extracción de información Segundo Pokemon

            P.getPokemonByName(`${segundoPokemon}`)
            .then((response) => {
            console.log('El segundo Pokemon es: '+segundoPokemon);
            //console.log(response.stats);
                const stats = response.stats;
                for(const s of stats.values()){
                    //console.log(s.base_stat);
                    const stat = s.stat;
                    if (stat.name === 'hp') {
                        console.log(stat);
                        console.log(s.base_stat);
                        break;
                    }
                }
                const types = response.types;
                for(const t of types.values()){
                    console.log(t.type);
                    const type = t.type;
                    console.log (type.name);
                    const typeString2 = type.name;
                    tiposPokemon2.push([typeString2]);
                    //console.log(tiposPokemon2); 
                    P.getTypeByName(typeString2)
                    .then((response) => {
                        //console.log('Las relaciones de daño corresponden al elemento: '+type.name);
                        const damage = response.damage_relations;
                        //console.log(damage);
                        const ddf = damage.double_damage_from;
                        const ddt = damage.double_damage_to;
                        const hdf = damage.half_damage_from;
                        const hdt = damage.half_damage_to;
                        const ndf = damage.no_damage_from;
                        const ndt = damage.no_damage_to;
                        //console.log(damage);
                        for(const u of ddf.values()){
                            let ddFrom = u.name;
                            //console.log('Doble daño de: '+ddFrom);
                            doubleDamageFromPoke2.push([ddFrom]);
                        }
                        //console.log('Recibe el doble de daño de: '+doubleDamageFromPoke2);
                        for(const u of ddt.values()){
                            let ddTo = u.name;
                            //console.log('Doble daño a: '+ddTo);
                            doubleDamageToPoke2.push([ddTo]);
                        }
                        //console.log('Inflinge el doble de daño a: '+doubleDamageToPoke2);
                        for(const u of hdf.values()){
                            let hdFrom = u.name;
                            //console.log('Mitad de daño de: '+hdFrom);
                            halfDamageFromPoke2.push([hdFrom]);
                        }
                        //console.log('Recibe la mitad del daño de: '+halfDamageFromPoke2);
                        for(const u of hdt.values()){
                            let hdTo = u.name;
                            //console.log('Mitad de daño a: '+hdTo);
                            halfDamageToPoke2.push([hdTo]);
                        }
                        //console.log('Inflinge la mitad del daño a: '+halfDamageToPoke2);
                        for(const u of ndf.values()){
                            let ndFrom = u.name;
                            //console.log('No inflige daño a: '+ndFrom);
                            noDamageFromPoke2.push([ndFrom]);
                        }
                        //console.log('No recibe daño de: '+noDamageFromPoke2);
                        for(const u of ndt.values()){
                            let ndTo = u.name;
                            //console.log('No recibe daño de: '+ndTo);
                            noDamageToPoke2.push([ndTo]);
                        } 

                    })
                    .catch((error) => {
                    console.log('There was an ERROR: ', error);
                    });
                }
                
            })
            .catch((error) => {
            console.log('There was an ERROR: ', error);
            });
            res.json('Los pokemon que se enfrentarán son: '+primerPokemon+' Y: '+segundoPokemon);
    }
    else{
        res.send('Bad Request');
    }
    
});

