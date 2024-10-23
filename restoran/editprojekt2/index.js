let inputi = document.getElementById("section");
let klik = document.getElementById("klik");

let sumaCijena = 0;
let brojJela = 0;
let svaJela = [];
let brojCustomJela = 0;
let sumaCustomCijena = 0;
let najcesciSastojak = [];
let jela=[];


class Restaurant{
    constructor(numberOfTablesAtRestaurant, tableState, allTables, menu){
        this.numberOfTablesAtRestaurant = numberOfTablesAtRestaurant;
        this.tableState = [];
        this.allTables = [];
        this.menu = {
            readyMeals: {
                menuName:["sarme", "punjene paprike", "gulaš"],
                menuIngredients:[["ima svega","svega ima"], ["svega ima"], ["svašta","bla"]],
                menuDescription:["Nije lose", "Moze stat", "kul kul"],
                menuPrice:[15, 20, 20]
            },
            customMeals: [],
            showMenu: function(){
                document.getElementById("menu").innerHTML = "<table><tr><td>IMENA: </td><td>SASTOJCI: </td><td>OPIS: </td><td>CIJENA: </td></tr>"
                for(let i in this.readyMeals.menuName){
                    document.getElementById("menu").innerHTML += `
                        <tr><td>${this.readyMeals.menuName[i]}</td><td>${this.readyMeals.menuIngredients[i]}</td><td>${this.readyMeals.menuDescription[i]}</td><td>${this.readyMeals.menuPrice[i]}</td></tr>
                    `
                    console.log(this.readyMeals.menuName[i])
                }
                document.getElementById("menu").innerHTML += "</table>";
            },
            addCustomDish: function(arrayCustom){
                let newDishCustom;
                let customIngredients=[];

                let customName = prompt("Unesi ime jela: ");
                
                customIngredients.push(prompt("Unesi sastojak jela: "));
                customIngredients.push(prompt("Unesi sastojak jela: "));
                customIngredients.push(prompt("Unesi sastojak jela: "));

                let customDescription = prompt("Unesi opis jela: ");
                let customPrice = Number(prompt("Unesi cijenu jela: "));

                newDishCustom = new Dish(customName, customIngredients, customDescription, customPrice);
                arrayCustom.push(newDishCustom);
                jela.push(customIngredients)
                
            }
        }

        let newTable;
        for(let i = 0; i < this.numberOfTablesAtRestaurant; i++){
            inputi.innerHTML += `
                <input id="${i}" type="text" class="validate">
                 <label for="${i}">Koliko maksimalno ljudi može sjediti za stolom broj ${i+1}</label>
            `
            
        }

        klik.addEventListener("click", Grupe);
        
        function Grupe(){
            klik.removeEventListener("click", Grupe);      
            for(let j = 0; j < numberOfTablesAtRestaurant; j++){
                console.log("bb");
                newTable = new Table(
                    j,
                    0,
                    document.getElementById(j).value
                )
                console.log(document.getElementById(j).value)
                restaurant1.tableState.push(newTable);
                console.log(newTable,restaurant1.tableState);
                
                
            }
            
            this.brojRezervacija = 0;
            inputi.innerHTML = `
                <input id="brgrupa" type="text" class="validate">
                <label for="brgrupa">Koliko je došlo grupa ljudi(upiši 0 da završiš radno vrijeme)</label>
            ` 
            
            klik.addEventListener("click", Stol);
            
        }
        function Stol(){
            klik.removeEventListener("click", Stol);
            let grupeLjudi = document.getElementById("brgrupa").value;

            for(let k in jela){
                for(let i=0;i<3;i++){
                    najcesciSastojak.push(jela[k][i]);
                }
            }
        
            if(grupeLjudi == 0){
                console.log("Završilo je radno vrijeme");
                restaurant1.Report(this,sumaCijena,brojJela,svaJela,brojCustomJela,najcesciSastojak)
            /* this.NumberOfTablesInADay(this.brojRezervacija);
                this.Averageprice(sumaCijena, brojJela);
                this.ProfitOfTheDay(sumaCijena);
                this.MostOrdered(svaJela);
                this.LeastOrdered(svaJela);
                this.CustomDishes(brojCustomJela, sumaCijena, najcesciSastojak);*/
                
            }
            else{
                for(let q = 0; q < grupeLjudi; q++){2
                    restaurant1.OrderTable();
                }
                for(let j in this.tableState){
                    restaurant1.tableState[j].active=false
                }
            }
        }

        
        
        /* 
        console.log(newTable.numberOfPeople);
        console.log(this.tableState[0].active);
        console.log(newTable.maxNumberOfPeople); */   

        
    }
    
    OrderTable(){
        inputi.innerHTML = `
                <input id="brljudi" type="text" class="validate">
                <label for="brljudi">Koliko ljudi treba sjesti za stol</label>
            ` 
        klik.addEventListener("click", BrLjudiValue);

        function BrLjudiValue(){
            klik.removeEventListener("click", BrLjudiValue);

            console.log("aa")
            let brojLjudi = document.getElementById("brljudi").value;

            let z = 0;
            
            for(let j in restaurant1.tableState){
                if(restaurant1.tableState[j].active == false){
                    if(brojLjudi <= restaurant1.tableState[j].maxNumberOfPeople){
                        restaurant1.tableState[j].active = true;
                        restaurant1.tableState[j].numberOfPeople = brojLjudi;
                        restaurant1.brojRezervacija++;

                        restaurant1.menu.showMenu();
                        restaurant1.tableState[j].OrderFood(restaurant1);

                        restaurant1.allTables.push(restaurant1.tableState[j]);
                        z++;

                        break;
                        
                    }
                }
                
            }
        }
        
    }
    
    NumberOfTablesInADay(a){
        console.log("Stolovi su u danu bili rezervirani " + a + " puta");
    }
    Averageprice(a, b){
        let rezultat = a/b
        console.log("Prosječna cijena jela u danu je " + rezultat);
    }
    ProfitOfTheDay(a){
        console.log("Ukupna zarada u danu je " + a + " kuna");
    }
    MostOrdered(a){
        let max = 0;
        let maxRijec = "";
        let trenutnoMax = 0;
        for(let n in a){
            max = 0;
            for(let m in a){
                if(a[n] == a[m]){
                    max++;
                }
                if(max > trenutnoMax){
                    maxRijec = a[n];
                    trenutnoMax = max;
                }
            }
        }

        console.log("Najnaručenije jelo u danu je " + maxRijec);
    }
    LeastOrdered(a){
        let min = 10;
        let minRijec = "";
        let trenutnoMin = 10;
        for(let n in a){
            for(let m in a){
                if(a[n] == a[m]){
                    min--;
                }
                if(min < trenutnoMin){
                    minRijec = a[n];
                    trenutnoMin = min;
                }
            }
        }

        console.log("Najmanje naručeno jelo u danu je " + minRijec);
    }
    CustomDishes(brCJ, sCijena, najcesSast){
       let rezultat = sCijena/brCJ
        console.log(najcesSast);
        let max = 0;
        let maxRijec = "";
        let trenutnoMax = 0;
        for(let n in najcesSast){
            max = 0;
            for(let m in najcesSast){
                if(najcesSast[n] == najcesSast[m]){
                    max++;
                }
                if(max > trenutnoMax){
                    maxRijec = najcesSast[n];
                    trenutnoMax = max;
                }
            }
        }
        let min = 0;
        let minRijec = "";
        let mini=[];
        let miniR=[];
        for(let n in najcesSast){
         
            for(let m in najcesSast){
     
                if(najcesSast[n]==najcesSast[m]){
                    min=min+1;
                    minRijec=najcesSast[n]
                }


            }
            mini.push(min);
            miniR.push(minRijec);
            min=0;
        }

        let temp=100;
       for(let k in mini){
           if(temp>mini[k]){
               temp=mini[k];
               minRijec=miniR[k];
           }
       }

        console.log("Broj jela po narudžbi: "+brCJ+"\nProsječna cijena jela po narudžbi: "+rezultat+"\nNajčešći sastojak u jelima po narudžbi: "+maxRijec+"\nNajrjeđi sastojak u jelima po narudžbi: "+minRijec);
    }
    
    Report(a,b,c,d,e,f){
        a.NumberOfTablesInADay(a.brojRezervacija);
        a.Averageprice(b, c);
        a.ProfitOfTheDay(b);
        a.MostOrdered(d);
        a.LeastOrdered(d);
        a.CustomDishes(e, b, f);
    } 
}



class Table{
    constructor(id,numberOfPeople, maxNumberOfPeople, orderedDishes, active, check){
        this.id = id;
        this.numberOfPeople = numberOfPeople;
        this.maxNumberOfPeople = maxNumberOfPeople;
        this.active = false;

        this.orderedDishes = {
            readyMeals: [],
            customMeals: []
        };
        
    }
    
    OrderFood(a){

        let temp=[]
        if(a.z==0){
            this.orderedDishes.readyMeals = [];
            this.orderedDishes.customMeals = [];
        }

        let newDishMenu;
        let kolikoJela;
        let t;
        let c;
        let o;
        let ukupnaCijena = 0;
        let p;
        let r;
        
        
        inputi.innerHTML = `
                <input id="meniilicustom" type="text" class="validate">
                <label for="meniilicustom">Želiš li custom dish ili dish sa menija(custom/menu)</label>
            ` 
        klik.addEventListener("click", MenuIliCustom);

        function MenuIliCustom(){
            klik.removeEventListener("click", MenuIliCustom);

            let meniIliCustom = document.getElementById("meniilicustom").value;

            inputi.innerHTML = `
                    <input id="kolikojela" type="text" class="validate">
                    <label for="kolikojela">Želiš li custom dish ili dish sa menija(custom/menu)</label>
                ` 
            klik.addEventListener("click", StaCeBit);
            
        }
        function StaCeBit(meniIliCustom){
            klik.removeEventListener("click", StaCeBit);
            
            if(meniIliCustom == "custom"){
                
                kolikoJela = document.getElementById("kolikojela").value;

                for(t = 0; t < kolikoJela; t++){
                    
                    a.menu.addCustomDish(this.orderedDishes.customMeals);
                    brojJela++;
                    brojCustomJela++;
                    
                }
                

                console.log(this.orderedDishes.customMeals[0].ingredients[0]);


                for(c in this.orderedDishes.customMeals){
                    ukupnaCijena += this.orderedDishes.customMeals[c].price;
                }
                
                console.log("Ukupna cijena: "+ ukupnaCijena +" kuna");
                sumaCijena += ukupnaCijena;
                sumaCustomCijena += ukupnaCijena;

            }
            else{
                kolikoJela = document.getElementById("kolikojela").value;
                for(t = 0; t < kolikoJela; t++){
                    inputi.innerHTML = `
                        <input id="brljudi" type="text" class="validate">
                        <label for="brljudi">Koliko ljudi treba sjesti za stol</label>
                    ` 
                }

                klik.addEventListener("click", StoSMenija);
                function StoSMenija(){
                    klik.removeEventListener("click", StoSMenija);
                    for(t = 0; t < kolikoJela; t++){
                        let zaNarucitSMenija = prompt("Što želiš naručit s menija: ");

                            for(o in a.menu.readyMeals.menuName){
                                if(zaNarucitSMenija == a.menu.readyMeals.menuName[o]){
                                    newDishMenu = new Dish(a.menu.readyMeals.menuName[o], a.menu.readyMeals.menuIngredients[o], a.menu.readyMeals.menuDescription[o], a.menu.readyMeals.menuPrice[o]);
                                    this.orderedDishes.readyMeals.push(newDishMenu);
                                    temp.push(newDishMenu);
                                    brojJela++;
                                    svaJela.push(this.orderedDishes.readyMeals[o].name);
                                    
                                }
                            }
                        
                    }

                    for (c in temp){
                        ukupnaCijena+=temp[c].price
                    }

                    
                    console.log("Ukupna cijena: "+ ukupnaCijena +" kuna");
                    sumaCijena += ukupnaCijena;
                }
            
            }
            newDishMenu = {};
            
        }
    }
}

class Dish{
    constructor(name, ingredients, description, price){
        this.name = name;
        this.ingredients = ingredients;
        this.description = description;
        this.price = price;
    }
}

let restaurant1 = new Restaurant(Number(prompt("Koliko stolova ima na raspolaganju:" )));

console.log(restaurant1);