class ListService {
  constructor(props){
    this.test = process.env.REACT_APP_TEST==="true"?true:false;
    this.testList = [
      {"key": "aghkZXZ-Tm9uZXIRCxIETGlzdBiAgICAgICACQw", "private": false, "name": "Cats", "description": "Purrrrrrrrr"}, 
      {"key": "aghkZXZ-Tm9uZXIRCxIETGlzdBiAgICAgICACgw", "private": false, "name": "Dogs", "description": "Doggies"},
      {"key": "test", "private": false, "name": "Fun Test", "description": "Testing"},
      {"key": "test2", "private": false, "name": "Fun Search Test", "description": "Testing for serach"}
    ];
    this.testItems = {
      "aghkZXZ-Tm9uZXIRCxIETGlzdBiAgICAgICACQw":{"key": "aghkZXZ-Tm9uZXIRCxIETGlzdBiAgICAgICACQw", "private": false, "name": "Cats", "description": "Purrrrrrrrr", "items": "Abyssinian,Aegean,American Bobtail,American Curl,American Shorthair,American Wirehair,Aphrodite Giant,Arabian Mau,Asian cat,Asian Semi-longhair,Australian Mist,Balinese,Bambino,Bengal,Birman,Bombay,Brazilian Shorthair,British Longhair,British Shorthair,Burmese,Burmilla,California Spangled,Chantilly-Tiffany,Chartreux,Chausie,Colourpoint Shorthair,Cornish Rex,Cymric,Longhaired Manx,Cyprus,Devon Rex,Donskoy,Don Sphynx,Dragon Li,Dwelf,Egyptian Mau,European Shorthair,Exotic Shorthair,Foldex,German Rex,Havana Brown,Highlander,Himalayan,Japanese Bobtail,Javanese,Khao Manee,Korat,Korean Bobtail,Korn Ja,Kurilian Bobtail\u00a0or,Kuril Islands Bobtail,LaPerm,Lykoi,Maine Coon,Manx,Mekong Bobtail,Minskin,Napoleon,Munchkin,Nebelung,Norwegian Forest Cat,Ocicat,Ojos Azules,Oregon Rex,Oriental Bicolor,Oriental Longhair,Oriental Shorthair,Persian,Peterbald,Pixie-bob,Ragamuffin,Ragdoll,Raas,Russian Blue,Russian White,Black,and Tabby,Sam sawet,Savannah,Scottish Fold,Selkirk Rex,Serengeti,Serrade Petit,Siberian,Neva Masquerade,Singapura,Snowshoe,Sokoke,Somali,Sphynx,Suphalak,Thai,Thai Lilac,Tonkinese,Toyger,Turkish Angora,Turkish Van,Ukrainian Levkoy,Wila Krungthep,York Chocolate"},
      "aghkZXZ-Tm9uZXIRCxIETGlzdBiAgICAgICACgw":{"key": "aghkZXZ-Tm9uZXIRCxIETGlzdBiAgICAgICACgw", "private": false, "name": "Dogs", "description": "Doggies", "items": "Labrador Retrievers,German Shepherd Dogs,Golden Retrievers,French Bulldogs,Bulldogs,Beagles,Poodles,Rottweilers,German Shorthaired Pointers,Yorkshire Terriers,Boxers,Dachshunds,Pembroke Welsh Corgis,Siberian Huskies,Australian Shepherds,Great Danes,Doberman Pinschers,Cavalier King Charles Spaniels,Miniature Schnauzers,Shih Tzu,Boston Terriers,Bernese Mountain Dogs,Pomeranians,Havanese,Shetland Sheepdogs,Brittanys,English Springer Spaniels,Pugs,Mastiffs,Cocker Spaniels,Vizslas,Cani Corsi,Chihuahuas,Miniature American Shepherds,Border Collies,Weimaraners,Maltese,Collies,Basset Hounds,Newfoundlands,Rhodesian Ridgebacks,West Highland White Terriers,Belgian Malinois,Shiba Inu,Chesapeake Bay Retrievers,Bichon Frises,Akitas,St. Bernards"},
      "test":{"key": "test", "private": false, "name": "Fun Test", "description": "Testing", "items": "bsdfasdf,sdfsadfas,,,"},
      "test2":{"key": "test2", "private": false, "name": "Fun Search Test", "description": "Testing for serach", "items": "bsdfasdf,sdfsadfas,,,"}
    };
  }

  searchList({api, searchString, results}){
    if (!this.test){
      fetch(process.env.REACT_APP_URL+`/api/${api}?q=${searchString}`)
      .then(results => {
        return results.json()})
      .then(data => {
        results(data);
      })
    } else {
      console.log("Test mode returning test list");
      results(this.testList);
    }
  }

  getList({key, result, error}){
    //TO-DO - return when testing, and valid return
    //a valid result could be an error (i.e. a list has been deleted, so I need to handle properly)
    if (!this.test){
      fetch(`${process.env.REACT_APP_URL}/api/get?id=${key}`)
      .then(results => {return results.json()})
      .then(data => {
        if (data["error"]){
          error(data["error"]);
        } else {
          result(data);
        }
      })      
    } else {
      console.log("Test mode returning for key:"+key);
      result(this.testItems[key]);
    }
  }
}

export default ListService;