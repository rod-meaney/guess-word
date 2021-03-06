import React from 'react';
import linkedin from '../images/linkedin.png';
import github from '../images/github.png';
import Image from 'react-bootstrap/Image';
export function footer(){
  return (
    <>
      <br />
      <p>
        <a rel="noopener noreferrer" target="_blank" href="https://www.linkedin.com/in/rodkm/"><Image style={{width:24}} src={linkedin} /> Developer</a>
        {" | "}
        <a rel="noopener noreferrer" target="_blank" href="https://github.com/rod-meaney/what-word-is-that/blob/master/README.md"><Image style={{width:24}} src={github} /> Code</a>
        {" | "}
        <a rel="noopener noreferrer" target="_blank" href="https://github.com/rod-meaney/what-word-is-that/issues"><Image style={{width:24}} src={github} /> Issues</a>
      </p>
    </>
  );
}
export function approx(value) {
  if (value != null){return value.toFixed(2);}
  return 0; 
}
export function isTest() {
  if (window.location.origin.indexOf("3000")>-1) return true;
  if (window.location.origin.indexOf("amazonaws.com")>-1) return true; //minor hack while deploying client to aws
  return false;
}

export function testList() {
  return [
    {"key": "aghkZXZ-Tm9uZXIRCxIETGlzdBiAgICAgICACQw", "private": false, "name": "Cats", "description": "Purrrrrrrrr"}, 
    {"key": "aghkZXZ-Tm9uZXIRCxIETGlzdBiAgICAgICACgw", "private": false, "name": "Dogs", "description": "Doggies"},
    {"key": "test", "private": false, "name": "Fun Test", "description": "Testing"},
    {"key": "test2", "private": false, "name": "Fun Search Test", "description": "Testing for serach"},
    {"key": "harry", "private": false, "name": "Harry Potter", "description": "Need I say more. How good is your family at this one?"}
  ];
}

export function testItems() {
  return {
    "aghkZXZ-Tm9uZXIRCxIETGlzdBiAgICAgICACQw":{"key": "aghkZXZ-Tm9uZXIRCxIETGlzdBiAgICAgICACQw", "private": false, "name": "Cats", "description": "Purrrrrrrrr", "items": "Abyssinian,Aegean,American Bobtail,American Curl,American Shorthair,American Wirehair,Aphrodite Giant,Arabian Mau,Asian cat,Asian Semi-longhair,Australian Mist,Balinese,Bambino,Bengal,Birman,Bombay,Brazilian Shorthair,British Longhair,British Shorthair,Burmese,Burmilla,California Spangled,Chantilly-Tiffany,Chartreux,Chausie,Colourpoint Shorthair,Cornish Rex,Cymric,Longhaired Manx,Cyprus,Devon Rex,Donskoy,Don Sphynx,Dragon Li,Dwelf,Egyptian Mau,European Shorthair,Exotic Shorthair,Foldex,German Rex,Havana Brown,Highlander,Himalayan,Japanese Bobtail,Javanese,Khao Manee,Korat,Korean Bobtail,Korn Ja,Kurilian Bobtail\u00a0or,Kuril Islands Bobtail,LaPerm,Lykoi,Maine Coon,Manx,Mekong Bobtail,Minskin,Napoleon,Munchkin,Nebelung,Norwegian Forest Cat,Ocicat,Ojos Azules,Oregon Rex,Oriental Bicolor,Oriental Longhair,Oriental Shorthair,Persian,Peterbald,Pixie-bob,Ragamuffin,Ragdoll,Raas,Russian Blue,Russian White,Black,and Tabby,Sam sawet,Savannah,Scottish Fold,Selkirk Rex,Serengeti,Serrade Petit,Siberian,Neva Masquerade,Singapura,Snowshoe,Sokoke,Somali,Sphynx,Suphalak,Thai,Thai Lilac,Tonkinese,Toyger,Turkish Angora,Turkish Van,Ukrainian Levkoy,Wila Krungthep,York Chocolate"},
    "aghkZXZ-Tm9uZXIRCxIETGlzdBiAgICAgICACgw":{"key": "aghkZXZ-Tm9uZXIRCxIETGlzdBiAgICAgICACgw", "private": false, "name": "Dogs", "description": "Doggies", "items": "Labrador Retrievers,German Shepherd Dogs,Golden Retrievers,French Bulldogs,Bulldogs,Beagles,Poodles,Rottweilers,German Shorthaired Pointers,Yorkshire Terriers,Boxers,Dachshunds,Pembroke Welsh Corgis,Siberian Huskies,Australian Shepherds,Great Danes,Doberman Pinschers,Cavalier King Charles Spaniels,Miniature Schnauzers,Shih Tzu,Boston Terriers,Bernese Mountain Dogs,Pomeranians,Havanese,Shetland Sheepdogs,Brittanys,English Springer Spaniels,Pugs,Mastiffs,Cocker Spaniels,Vizslas,Cani Corsi,Chihuahuas,Miniature American Shepherds,Border Collies,Weimaraners,Maltese,Collies,Basset Hounds,Newfoundlands,Rhodesian Ridgebacks,West Highland White Terriers,Belgian Malinois,Shiba Inu,Chesapeake Bay Retrievers,Bichon Frises,Akitas,St. Bernards"},
    "test":{"key": "test", "private": false, "name": "Fun Test", "description": "Testing", "items": "bsdfasdf,sdfsadfas,,,"},
    "test2":{"key": "test2", "private": false, "name": "Fun Search Test", "description": "Testing for serach", "items": "bsdfasdf,sdfsadfas,,,"},
    "harry":{"key": "harry", "private": false, "name": "Harry Potter", "description": "Need I say more. How good is your family at this one?", "items": "Aberforth Dumbledore, Aragog, Arthur Weasley, Aunt Marge, Aunt Petunia, Avada Kedavra, Azkaban, Basalisk, Belatrix Lestrange, Bill Weasley, Bloody Baron, Bludger, Boggart, Buckbeak, Cedric, Charlie Weasley, Cho Chang, Cloak of Invisibility, Cruciatus, Death Eater, Deathly Hallows, Dementors, Diagon Alley, Dobby, Dolores Umbridge, Dudley, Elder Wand, Ern, Fang, Fat Lady, Fawkes, Firenz, Fleur, Fluffy, Forbidden Forest, Fred Weasley, George Weasley, Gilderoy Lockhart, Ginny Weasley, Godric Hollows, Gryffindor, Hagrid, Harry Potter, Hermoine Granger, Hogwarts, Horace Slughorn, Horcrux, Hufflepuff, James Potter, Kreacher, Lavender Round, Lilly Potter, Lucius Malfoy, Luna Lovegood, Madam Hooch, Madam Maxine, Malfoy Draco, Mirror of Erised, Molly Weasley, Nagini, Nearly Headless Nick, Neville Longbottom, Nicholas Flamel, Night Bus, Norbert, Norwegian Ridgeback, Olivanders, Order of the Phoenix, Percy Weasley, Philosophers Stone, Platform 9 and 3/4, Polyjuice Potion, Patronus, Prof Trelawney, Prof. Dumbledore, Prof. Lupin, Prof. McGonagall, Prof. Quirrel, Prof. Snape, Quaffle, Quidditch, Ravenclaw, Resurrection Stone, Rita Skeeter, Ron Weasley, Room of Requirement, Seamus, Sirius Black, Slytherin, Snitch, Stan Turnpike, Sword of Gryffindor, The Grey Lady, The Leaky Cauldron, Time turner, Tom Riddle, Tonks, Tri Wizard Tournament, Uncle Vernon, Victor Krum, Voldemort, Witch, Wizard"}
  };
}