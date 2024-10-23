let nizSvihAgenata = [];
let rodenjaAgenata = [];

class Agencija{
    constructor(imeAgencije, godinaOsnivanja, ravnatelj, poslovnice){
        this.imeAgencije = imeAgencije;
        this.godinaOsnivanja = godinaOsnivanja;
        this.ravnatelj = {};
        this.poslovnice = [];
        this.DodajRavnatelja();

        //ovo san doda jer pise da ima 4 sjedista, osin ako ja to nisan krivo shvatia valjda
        for(let i = 0; i < 4; i++){
            this.DodajPoslovnice();
        }
    }

    DodajRavnatelja() {
        var ime = prompt("Unesi ime ravnatelja: ");
        var prezime = prompt("Unesi prezime ravnatelja: ");
        var datumRodenja = prompt("Unesite datum rođenja ravnatelja(YYYY/MM/DD): ").split("/");
        var objektDatumaRodenja = new Date(Number(datumRodenja[0]), Number(datumRodenja[1]), Number(datumRodenja[2]));
        let mandat = Number(prompt("Unesi mandat: "));

        let noviRavnatelj = new Ravnatelj(ime, prezime, objektDatumaRodenja, mandat);
        this.ravnatelj = noviRavnatelj;
        return noviRavnatelj;
    }
    DodajPoslovnice() {
        
        let novaPoslovnica = new Poslovnica("", "", "");

        //let procelnik = prompt("Unesi procelnika poslovnice: ");
        //let grad = prompt("Unesi grad poslovnice: ");
        //let agenti = Number(prompt("Unesi broj agenata poslovnice: "));

        //let novaPoslovnica = new Poslovnica(procelnik, grad, agenti);
        novaPoslovnica.procelnik=novaPoslovnica.DodajProcelnika();
        novaPoslovnica.grad= prompt("Unesi grad poslovnice: ");
        let brojAgenata = Number(prompt("Unesi broj agenata poslovnice: "));
        for(let j = 0; j < brojAgenata; j++){
            novaPoslovnica.agenti.push(novaPoslovnica.DodajAgente());
            nizSvihAgenata.push(novaPoslovnica.agenti);
        }
        
        this.poslovnice.push(novaPoslovnica);
    }
}

class Poslovnica{
    constructor(procelnik, grad, agenti){
        this.procelnik = procelnik;
        this.grad = grad;
        this.agenti = [];
  
    }

    DodajProcelnika(){
        
        var ime = prompt("Unesi ime pročelnika: ");
        var prezime = prompt("Unesi prezime pročelnika: ");
        var datumRodenja = prompt("Unesite datum rođenja pročelnika(YYYY/MM/DD): ").split("/");
        var objektDatumaRodenja = new Date(Number(datumRodenja[0]), Number(datumRodenja[1]), Number(datumRodenja[2]));
        let placa = Number(prompt("Unesi placu procelnika: "));

        let noviProcelnik = new Procelnik(ime, prezime, objektDatumaRodenja, placa);
        return noviProcelnik;
    }
    DodajAgente(){
        var ime = prompt("Unesi ime agenta: ");
        var prezime = prompt("Unesi prezime agenta: ");
        var datumRodenja = prompt("Unesite datum rođenja agenta(YYYY/MM/DD): ").split("/");
        var objektDatumaRodenja = new Date(Number(datumRodenja[0]), Number(datumRodenja[1]), Number(datumRodenja[2]));
        let spol = prompt("Unesi spol agenta: ");

        let noviAgent = new Agent(ime, prezime, objektDatumaRodenja, spol);
        rodenjaAgenata.push(datumRodenja[0]);
        return noviAgent;
    }
}

class Osoba{
    constructor(ime,prezime,datumRodenja){
        this.ime = ime;
        this.prezime = prezime;
        this.datumRodenja = datumRodenja;
    }
}
class Ravnatelj extends Osoba{
    constructor(ime,prezime,datumRodenja,mandat){
        super(ime,prezime,datumRodenja)
        this.mandat = mandat;
        
    }
}
class Procelnik extends Osoba{
    constructor(ime,prezime,datumRodenja,placa){
        super(ime,prezime,datumRodenja)
        this.placa = placa;
        
    }
}
class Agent extends Osoba{
    constructor(ime,prezime,datumRodenja,spol){
        super(ime,prezime,datumRodenja)
        this.spol = spol;
        
    }
}


let agencija1 = new Agencija("XAgency", 1981);

console.log(agencija1);



class Administrator{
    constructor(niz, rodenja){
        this.niz = niz;
        this.rodenja = rodenja;
        this.ProsjecnaStarost();
        this.UdioPoSpolu();
        
    }

    UdioPoSpolu(){
        let sumaZ = 0;
        let sumaM = 0;
        let brojacNiza = 0;


        for(let k = 0; k < this.niz.length; k++){
            for(let p = 0; p < this.niz[k].length; p++){
                if(this.niz[k][p].spol == "ž"){
                    sumaZ++;
                }
                else if(this.niz[k][p].spol == "m"){
                    sumaM++;
                }

            }
            brojacNiza++;
            
        }
        sumaZ--;
        sumaM--;

        console.log(sumaZ);
        console.log(sumaM);
        console.log(brojacNiza);
        let rezZ = Math.floor((sumaZ*100)/brojacNiza);
        let rezM = Math.floor((sumaM*100)/brojacNiza);

        console.log("Ženskih ima "+ rezZ +"%, a muških "+ rezM +"%");
    }
    ProsjecnaStarost(){
        let trenutnaGodina = new Date().getFullYear();
        let godine = 0;
        let sumaGodina = 0;

        for(let z = 0; z < this.rodenja.length; z++){
            godine = trenutnaGodina - parseInt(this.rodenja[z]);
            sumaGodina += godine
        }

        let rezultat = sumaGodina/this.rodenja.length

        console.log("Prosjecna starost agenata je "+ rezultat +" godina.");

    }

}

let administrator1 = new Administrator(nizSvihAgenata, rodenjaAgenata);