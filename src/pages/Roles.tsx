import Layout from "@/components/Layout";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Role {
  name: string;
  description: string;
  category: string;
}

const roles: Role[] = [
  // Dominant Roles
  { name: "Alpha", description: "Un líder dominante que toma el control y dirige a otros", category: "Dominante" },
  { name: "Master", description: "Un dominante que tiene autoridad sobre un esclavo o sumiso", category: "Dominante" },
  { name: "Mistress", description: "Una dominante femenina que tiene autoridad sobre un esclavo o sumiso", category: "Dominante" },
  { name: "Daddy", description: "Un dominante que adopta un rol paternal", category: "Dominante" },
  { name: "Mommy", description: "Una dominante que adopta un rol maternal", category: "Dominante" },
  { name: "Domina", description: "Una dominante femenina con autoridad", category: "Dominante" },
  { name: "Sir", description: "Un dominante masculino, a menudo usado como título", category: "Dominante" },
  { name: "Ma'am", description: "Una dominante femenina, a menudo usada como título", category: "Dominante" },
  { name: "Boss", description: "Un dominante que actúa como jefe o líder", category: "Dominante" },
  { name: "Captain", description: "Un dominante que lidera como un capitán", category: "Dominante" },
  { name: "Commander", description: "Un dominante que da órdenes y comanda", category: "Dominante" },
  { name: "Dark Dom", description: "Un dominante que adopta un estilo más intenso o sádico", category: "Dominante" },
  { name: "Daddy Dom", description: "Un dominante que combina roles paternales y dominantes", category: "Dominante" },
  { name: "Daddy Domme", description: "Una dominante que combina roles paternales y dominantes", category: "Dominante" },
  { name: "Dom(me) Tamer", description: "Un dominante que doma o controla a otros", category: "Dominante" },
  { name: "Domina", description: "Una dominante con autoridad formal", category: "Dominante" },
  { name: "Dominant", description: "Alguien que toma el control en una relación D/s", category: "Dominante" },
  { name: "Dominant Bottom", description: "Un dominante que es receptivo durante actividades sexuales", category: "Dominante" },
  { name: "Dominant Masochist", description: "Un dominante que disfruta recibir dolor", category: "Dominante" },
  { name: "Domme", description: "Una dominante femenina", category: "Dominante" },
  { name: "Empress", description: "Una dominante femenina con autoridad imperial", category: "Dominante" },
  { name: "Enchantress", description: "Una dominante femenina con cualidades mágicas o seductoras", category: "Dominante" },
  { name: "Fairy Kink Daddy", description: "Un dominante que combina roles paternales con elementos fantásticos", category: "Dominante" },
  { name: "Fairy Kink Mother", description: "Una dominante que combina roles maternales con elementos fantásticos", category: "Dominante" },
  { name: "FemDaddy", description: "Una dominante femenina que adopta un rol paternal", category: "Dominante" },
  { name: "FemDom", description: "Una dominante femenina", category: "Dominante" },
  { name: "Femme Daddy", description: "Una dominante femenina con estilo femenino que adopta rol paternal", category: "Dominante" },
  { name: "Femme Fatale", description: "Una dominante femenina seductora y peligrosa", category: "Dominante" },
  { name: "God", description: "Un dominante que actúa como una deidad", category: "Dominante" },
  { name: "Goddess", description: "Una dominante que actúa como una deidad femenina", category: "Dominante" },
  { name: "Goddex", description: "Un dominante no binario que actúa como deidad", category: "Dominante" },
  { name: "Head of Household", description: "Un dominante que lidera una familia o grupo", category: "Dominante" },
  { name: "King", description: "Un dominante masculino con autoridad real", category: "Dominante" },
  { name: "Lady", description: "Una dominante femenina con autoridad noble", category: "Dominante" },
  { name: "Lady of the Manor", description: "Una dominante femenina que gobierna su dominio", category: "Dominante" },
  { name: "Lord", description: "Un dominante masculino con autoridad noble", category: "Dominante" },
  { name: "Madame", description: "Una dominante femenina con autoridad formal", category: "Dominante" },
  { name: "Maestro", description: "Un dominante que actúa como maestro o instructor", category: "Dominante" },
  { name: "Mistrix", description: "Una dominante femenina con autoridad", category: "Dominante" },
  { name: "Monarch", description: "Un dominante que actúa como monarca o rey/reina", category: "Dominante" },
  { name: "Mommy Domme", description: "Una dominante que combina roles maternales y dominantes", category: "Dominante" },
  { name: "Owner", description: "Un dominante que posee a su sumiso", category: "Dominante" },
  { name: "Primal Daddy", description: "Un dominante que combina roles primales y paternales", category: "Dominante" },
  { name: "Primal Hunter", description: "Un dominante que caza a su presa", category: "Dominante" },
  { name: "Primal Huntress", description: "Una dominante que caza a su presa", category: "Dominante" },
  { name: "Primal Mommy", description: "Una dominante que combina roles primales y maternales", category: "Dominante" },
  { name: "Primal Predator", description: "Un dominante que adopta un rol depredador", category: "Dominante" },
  { name: "Primal Sadist", description: "Un dominante primal que disfruta dar dolor", category: "Dominante" },
  { name: "Primal Top", description: "Un dominante que adopta un rol primal activo", category: "Dominante" },
  { name: "Queen", description: "Una dominante femenina con autoridad real", category: "Dominante" },
  { name: "Queen of Hearts", description: "Una dominante femenina que gobierna con amor y autoridad", category: "Dominante" },
  { name: "Satyric Dominant", description: "Un dominante que adopta características de sátiro", category: "Dominante" },
  { name: "Shadow Daddy", description: "Un dominante con un lado más oscuro o misterioso", category: "Dominante" },
  { name: "Soft Dom", description: "Un dominante gentil y cariñoso", category: "Dominante" },
  { name: "Soft Domme", description: "Una dominante gentil y cariñosa", category: "Dominante" },
  { name: "Stay-at-Home Dominant", description: "Un dominante que ejerce control desde casa", category: "Dominante" },
  { name: "Tamer", description: "Un dominante que doma o entrena a otros", category: "Dominante" },
  { name: "Taskmaster", description: "Un dominante que asigna y supervisa tareas", category: "Dominante" },
  { name: "Teacher", description: "Un dominante que educa o instruye", category: "Dominante" },
  { name: "Torturer", description: "Un dominante que disfruta torturar consensualmente", category: "Dominante" },
  { name: "Trainer", description: "Un dominante que entrena a otros", category: "Dominante" },
  { name: "Tyrant", description: "Un dominante autoritario y estricto", category: "Dominante" },
  { name: "Warlord", description: "Un dominante que gobierna con autoridad militar", category: "Dominante" },
  { name: "Zaddy", description: "Un dominante atractivo y carismático", category: "Dominante" },
  
  // Submissive Roles
  { name: "submissive", description: "Alguien que consensualmente cede el control a un dominante", category: "Sumiso" },
  { name: "slave", description: "Un sumiso que ha cedido la mayor parte o todo el control a su dominante", category: "Sumiso" },
  { name: "Beta", description: "Un sumiso que sigue el liderazgo del Alpha", category: "Sumiso" },
  { name: "pet", description: "Un sumiso que adopta características animales", category: "Sumiso" },
  { name: "puppy", description: "Un sumiso que se identifica como una mascota canina", category: "Sumiso" },
  { name: "kitten", description: "Un sumiso que se identifica como una mascota felina", category: "Sumiso" },
  { name: "pony", description: "Un sumiso que se identifica como una mascota equina", category: "Sumiso" },
  { name: "little", description: "Alguien que regresa a una edad más joven durante el juego", category: "Sumiso" },
  { name: "alpha submissive", description: "Un sumiso que mantiene cierta autoridad o liderazgo", category: "Sumiso" },
  { name: "Alpha Pet", description: "Una mascota que mantiene cierta autoridad o liderazgo", category: "Sumiso" },
  { name: "ashtray", description: "Un sumiso que actúa como cenicero para su dominante", category: "Sumiso" },
  { name: "baby", description: "Un sumiso que adopta el rol de bebé", category: "Sumiso" },
  { name: "babyboy", description: "Un sumiso masculino que adopta el rol de bebé", category: "Sumiso" },
  { name: "babydoll", description: "Un sumiso que adopta el rol de muñeca bebé", category: "Sumiso" },
  { name: "babygirl", description: "Un sumiso femenino que adopta el rol de bebé", category: "Sumiso" },
  { name: "babyghoul", description: "Un sumiso que combina roles de bebé con elementos góticos", category: "Sumiso" },
  { name: "bad boy", description: "Un sumiso masculino que actúa como chico malo", category: "Sumiso" },
  { name: "bad girl", description: "Un sumiso femenino que actúa como chica mala", category: "Sumiso" },
  { name: "Battle Sub", description: "Un sumiso que disfruta del combate o lucha consensual", category: "Sumiso" },
  { name: "Bedroom Submissive", description: "Un sumiso que solo es sumiso en el dormitorio", category: "Sumiso" },
  { name: "bitch", description: "Un sumiso que adopta el rol de perra", category: "Sumiso" },
  { name: "Bondage Bottom", description: "Un sumiso que es atado durante el bondage", category: "Sumiso" },
  { name: "bondage slut", description: "Un sumiso que disfruta especialmente del bondage", category: "Sumiso" },
  { name: "bondmaid", description: "Un sumiso que actúa como sirviente", category: "Sumiso" },
  { name: "boot bitch", description: "Un sumiso que se enfoca en el servicio de botas", category: "Sumiso" },
  { name: "boot slut", description: "Un sumiso que disfruta especialmente de las botas", category: "Sumiso" },
  { name: "Bottom Bitch", description: "Un sumiso que es el sumiso principal de un dominante", category: "Sumiso" },
  { name: "bossy bottom", description: "Un sumiso que mantiene cierta autoridad", category: "Sumiso" },
  { name: "bottom", description: "Alguien que es receptivo durante actividades sexuales", category: "Sumiso" },
  { name: "Boy Toy", description: "Un sumiso masculino que actúa como juguete", category: "Sumiso" },
  { name: "Captive", description: "Un sumiso que actúa como prisionero", category: "Sumiso" },
  { name: "conditional slave", description: "Un esclavo con condiciones específicas", category: "Sumiso" },
  { name: "concubine", description: "Un sumiso que actúa como concubino/a", category: "Sumiso" },
  { name: "Concubus", description: "Un sumiso que actúa como concubino/a demoníaco", category: "Sumiso" },
  { name: "Cuddle Slut", description: "Un sumiso que disfruta especialmente de los abrazos", category: "Sumiso" },
  { name: "Cuddly Mogwai", description: "Un sumiso adorable y tierno", category: "Sumiso" },
  { name: "cumdump", description: "Un sumiso que actúa como recipiente para semen", category: "Sumiso" },
  { name: "Cum Slut", description: "Un sumiso que disfruta especialmente del semen", category: "Sumiso" },
  { name: "Cunt", description: "Un sumiso que adopta este término como identidad", category: "Sumiso" },
  { name: "cupcake", description: "Un sumiso dulce y adorable", category: "Sumiso" },
  { name: "damsel", description: "Un sumiso que actúa como damisela", category: "Sumiso" },
  { name: "Damsel in distress", description: "Un sumiso que actúa como damisela en apuros", category: "Sumiso" },
  { name: "degradee", description: "Un sumiso que disfruta ser degradado", category: "Sumiso" },
  { name: "Delta", description: "Un sumiso en una jerarquía específica", category: "Sumiso" },
  { name: "denial bottom", description: "Un sumiso que disfruta ser negado sexualmente", category: "Sumiso" },
  { name: "doll", description: "Un sumiso que actúa como muñeca", category: "Sumiso" },
  { name: "drone", description: "Un sumiso que actúa como dron o robot", category: "Sumiso" },
  { name: "duck", description: "Un sumiso que se identifica como pato", category: "Sumiso" },
  { name: "ducky", description: "Un sumiso que se identifica como patito", category: "Sumiso" },
  { name: "Edge bottom", description: "Un sumiso que disfruta del edging", category: "Sumiso" },
  { name: "Electro Bottom", description: "Un sumiso que recibe estimulación eléctrica", category: "Sumiso" },
  { name: "Energy Bottom", description: "Un sumiso que recibe energía o fuerza vital", category: "Sumiso" },
  { name: "FemDom Slave", description: "Un esclavo de una dominante femenina", category: "Sumiso" },
  { name: "Femdom Submissive", description: "Un sumiso de una dominante femenina", category: "Sumiso" },
  { name: "feminizee", description: "Un sumiso que es feminizado", category: "Sumiso" },
  { name: "fire bottom", description: "Un sumiso que disfruta del juego con fuego", category: "Sumiso" },
  { name: "fire bunny", description: "Un sumiso que combina roles de conejo con fuego", category: "Sumiso" },
  { name: "Fistee", description: "Un sumiso que recibe fisting", category: "Sumiso" },
  { name: "Fisting Bottom", description: "Un sumiso que recibe fisting", category: "Sumiso" },
  { name: "Floozy", description: "Un sumiso que actúa de manera coqueta", category: "Sumiso" },
  { name: "Foodslut", description: "Un sumiso que disfruta especialmente de la comida", category: "Sumiso" },
  { name: "Foot Bottom", description: "Un sumiso que recibe atención en los pies", category: "Sumiso" },
  { name: "footboy", description: "Un sumiso masculino que se enfoca en los pies", category: "Sumiso" },
  { name: "footgirl", description: "Un sumiso femenino que se enfoca en los pies", category: "Sumiso" },
  { name: "Foot Slut", description: "Un sumiso que disfruta especialmente de los pies", category: "Sumiso" },
  { name: "Fuckboy", description: "Un sumiso masculino que actúa como juguete sexual", category: "Sumiso" },
  { name: "Fuckdoll", description: "Un sumiso que actúa como muñeca sexual", category: "Sumiso" },
  { name: "fuck puppet", description: "Un sumiso que actúa como marioneta sexual", category: "Sumiso" },
  { name: "Fucktoy", description: "Un sumiso que actúa como juguete sexual", category: "Sumiso" },
  { name: "Gamma", description: "Un sumiso en una jerarquía específica", category: "Sumiso" },
  { name: "gimp", description: "Un sumiso que usa traje de goma", category: "Sumiso" },
  { name: "good boy", description: "Un sumiso masculino que busca aprobación", category: "Sumiso" },
  { name: "good girl", description: "Un sumiso femenino que busca aprobación", category: "Sumiso" },
  { name: "Goreanslave", description: "Un esclavo en el estilo Gorean", category: "Sumiso" },
  { name: "Goreanslave", description: "Un esclavo en el estilo Gorean", category: "Sumiso" },
  { name: "Guard Dog", description: "Un sumiso que actúa como perro guardián", category: "Sumiso" },
  { name: "hand puppet", description: "Un sumiso que actúa como marioneta de mano", category: "Sumiso" },
  { name: "hellpuppy", description: "Un sumiso que combina roles de perro con elementos infernales", category: "Sumiso" },
  { name: "hole", description: "Un sumiso que se enfoca en ser penetrado", category: "Sumiso" },
  { name: "human furniture", description: "Un sumiso que actúa como mueble humano", category: "Sumiso" },
  { name: "hypno bottom", description: "Un sumiso que recibe hipnosis", category: "Sumiso" },
  { name: "Impact Bottom", description: "Un sumiso que recibe impacto", category: "Sumiso" },
  { name: "Impact Model", description: "Un sumiso que modela para impacto", category: "Sumiso" },
  { name: "kajira", description: "Una esclava en el estilo Gorean", category: "Sumiso" },
  { name: "kajirus", description: "Un esclavo en el estilo Gorean", category: "Sumiso" },
  { name: "Lab Rat", description: "Un sumiso que actúa como rata de laboratorio", category: "Sumiso" },
  { name: "lamb", description: "Un sumiso que se identifica como cordero", category: "Sumiso" },
  { name: "Latex Bottom", description: "Un sumiso que usa látex", category: "Sumiso" },
  { name: "Latex Kitten", description: "Un sumiso que combina látex con rol de gatito", category: "Sumiso" },
  { name: "Latex Pony", description: "Un sumiso que combina látex con rol de pony", category: "Sumiso" },
  { name: "Latex Pup", description: "Un sumiso que combina látex con rol de cachorro", category: "Sumiso" },
  { name: "Latex Slut", description: "Un sumiso que disfruta especialmente del látex", category: "Sumiso" },
  { name: "little bitch", description: "Un sumiso que actúa como perra pequeña", category: "Sumiso" },
  { name: "little boy", description: "Un sumiso masculino que adopta el rol de niño pequeño", category: "Sumiso" },
  { name: "little brother", description: "Un sumiso que adopta el rol de hermano pequeño", category: "Sumiso" },
  { name: "little girl", description: "Un sumiso femenino que adopta el rol de niña pequeña", category: "Sumiso" },
  { name: "Little Goddess", description: "Un sumiso que adopta el rol de diosa pequeña", category: "Sumiso" },
  { name: "little lamb", description: "Un sumiso que adopta el rol de cordero pequeño", category: "Sumiso" },
  { name: "little monster", description: "Un sumiso que adopta el rol de monstruo pequeño", category: "Sumiso" },
  { name: "little one", description: "Un sumiso que adopta el rol de pequeño", category: "Sumiso" },
  { name: "little princess", description: "Un sumiso que adopta el rol de princesa pequeña", category: "Sumiso" },
  { name: "Little Sister", description: "Un sumiso que adopta el rol de hermana pequeña", category: "Sumiso" },
  { name: "Little Spoon", description: "Un sumiso que actúa como cuchara pequeña", category: "Sumiso" },
  { name: "Little Thing", description: "Un sumiso que adopta el rol de cosa pequeña", category: "Sumiso" },
  { name: "masochist", description: "Alguien que disfruta recibir dolor consensualmente", category: "Sumiso" },
  { name: "masoslut", description: "Un sumiso que disfruta especialmente del dolor", category: "Sumiso" },
  { name: "milkmaid", description: "Un sumiso que actúa como lechera", category: "Sumiso" },
  { name: "minion", description: "Un sumiso que actúa como esbirro", category: "Sumiso" },
  { name: "mummification bottom", description: "Un sumiso que es momificado", category: "Sumiso" },
  { name: "mummification bunny", description: "Un sumiso que combina momificación con rol de conejo", category: "Sumiso" },
  { name: "muppet", description: "Un sumiso que actúa como muppet", category: "Sumiso" },
  { name: "Needle Bottom", description: "Un sumiso que recibe agujas", category: "Sumiso" },
  { name: "object", description: "Un sumiso que actúa como objeto", category: "Sumiso" },
  { name: "offering", description: "Un sumiso que se ofrece como sacrificio", category: "Sumiso" },
  { name: "omega", description: "Un sumiso en una jerarquía específica", category: "Sumiso" },
  { name: "painslut", description: "Un sumiso que disfruta especialmente del dolor", category: "Sumiso" },
  { name: "personal assistant", description: "Un sumiso que actúa como asistente personal", category: "Sumiso" },
  { name: "personal secretary", description: "Un sumiso que actúa como secretario personal", category: "Sumiso" },
  { name: "pet", description: "Un sumiso que adopta características animales", category: "Sumiso" },
  { name: "pig", description: "Un sumiso que se identifica como cerdo", category: "Sumiso" },
  { name: "pincushion", description: "Un sumiso que recibe agujas", category: "Sumiso" },
  { name: "plaything", description: "Un sumiso que actúa como juguete", category: "Sumiso" },
  { name: "Pleasure Sub", description: "Un sumiso que se enfoca en dar placer", category: "Sumiso" },
  { name: "Poppet", description: "Un sumiso que actúa como muñeco", category: "Sumiso" },
  { name: "possession", description: "Un sumiso que actúa como posesión", category: "Sumiso" },
  { name: "Potty Princess", description: "Un sumiso que adopta el rol de princesa del baño", category: "Sumiso" },
  { name: "prey", description: "Un sumiso que actúa como presa", category: "Sumiso" },
  { name: "primal bottom", description: "Un sumiso que adopta un rol primal", category: "Sumiso" },
  { name: "Primal Masochist", description: "Un sumiso primal que disfruta del dolor", category: "Sumiso" },
  { name: "Primal Prey", description: "Un sumiso que actúa como presa primal", category: "Sumiso" },
  { name: "Primal Sensualist", description: "Un sumiso primal que se enfoca en lo sensual", category: "Sumiso" },
  { name: "property", description: "Un sumiso que es tratado como propiedad", category: "Sumiso" },
  { name: "Puppet", description: "Un sumiso que actúa como marioneta", category: "Sumiso" },
  { name: "puppy", description: "Un sumiso que se identifica como cachorro", category: "Sumiso" },
  { name: "puppyboy", description: "Un sumiso masculino que se identifica como cachorro", category: "Sumiso" },
  { name: "puppygirl", description: "Un sumiso femenino que se identifica como cachorro", category: "Sumiso" },
  { name: "sacrificial lamb", description: "Un sumiso que actúa como cordero sacrificial", category: "Sumiso" },
  { name: "Sensation Bottom", description: "Un sumiso que recibe sensaciones", category: "Sumiso" },
  { name: "Service Bottom", description: "Un sumiso que se enfoca en servir", category: "Sumiso" },
  { name: "Service Brat", description: "Un brat que se enfoca en servir", category: "Sumiso" },
  { name: "service cat", description: "Un sumiso que actúa como gato de servicio", category: "Sumiso" },
  { name: "Service Masochist", description: "Un masoquista que se enfoca en servir", category: "Sumiso" },
  { name: "Service Pet", description: "Una mascota que se enfoca en servir", category: "Sumiso" },
  { name: "service pup", description: "Un sumiso que actúa como cachorro de servicio", category: "Sumiso" },
  { name: "service sadist", description: "Un sádico que se enfoca en servir", category: "Sumiso" },
  { name: "Service Sadomasochist", description: "Un sadomasoquista que se enfoca en servir", category: "Sumiso" },
  { name: "service slave", description: "Un esclavo que se enfoca en servir", category: "Sumiso" },
  { name: "service submissive", description: "Un sumiso que se enfoca en servir", category: "Sumiso" },
  { name: "Sex Slave", description: "Un esclavo sexual", category: "Sumiso" },
  { name: "Sexual Masochist", description: "Un masoquista sexual", category: "Sumiso" },
  { name: "Sharps Bottom", description: "Un sumiso que recibe objetos afilados", category: "Sumiso" },
  { name: "Sissy", description: "Un sumiso masculino que adopta características femeninas", category: "Sumiso" },
  { name: "Sitter", description: "Un sumiso que cuida a otros", category: "Sumiso" },
  { name: "slave", description: "Un sumiso que ha cedido la mayor parte del control", category: "Sumiso" },
  { name: "Spankee", description: "Un sumiso que recibe nalgadas", category: "Sumiso" },
  { name: "Stay-at-Home Sub", description: "Un sumiso que ejerce su rol desde casa", category: "Sumiso" },
  { name: "stone bottom", description: "Un sumiso que solo recibe y nunca da estimulación sexual", category: "Sumiso" },
  { name: "Sub-Leaning Switch", description: "Un switch que prefiere ser sumiso", category: "Sumiso" },
  { name: "Submissive Daddy", description: "Un sumiso que adopta un rol paternal", category: "Sumiso" },
  { name: "submissive masochist", description: "Un sumiso que disfruta del dolor", category: "Sumiso" },
  { name: "Submissive Sister", description: "Un sumiso que adopta el rol de hermana", category: "Sumiso" },
  { name: "Sufferer", description: "Un sumiso que sufre por su dominante", category: "Sumiso" },
  { name: "Supplicant", description: "Un sumiso que suplica a su dominante", category: "Sumiso" },
  { name: "Test Subject", description: "Un sumiso que actúa como sujeto de prueba", category: "Sumiso" },
  { name: "thrall", description: "Un sumiso que está bajo control mágico o mental", category: "Sumiso" },
  { name: "Ticklee", description: "Un sumiso que recibe cosquillas", category: "Sumiso" },
  { name: "Tickle Toy", description: "Un sumiso que actúa como juguete para cosquillas", category: "Sumiso" },
  { name: "toilet", description: "Un sumiso que actúa como inodoro", category: "Sumiso" },
  { name: "Toilet Slave", description: "Un esclavo que actúa como inodoro", category: "Sumiso" },
  { name: "toy", description: "Un sumiso que actúa como juguete", category: "Sumiso" },
  { name: "trash", description: "Un sumiso que se considera basura", category: "Sumiso" },
  { name: "Ukete", description: "Un sumiso en terminología japonesa", category: "Sumiso" },
  { name: "urinal", description: "Un sumiso que actúa como urinario", category: "Sumiso" },
  { name: "Vampire Bait", description: "Un sumiso que atrae vampiros", category: "Sumiso" },
  { name: "vampire concubine", description: "Un sumiso que actúa como concubino/a de vampiro", category: "Sumiso" },
  { name: "victim", description: "Un sumiso que actúa como víctima", category: "Sumiso" },
  { name: "waif", description: "Un sumiso que actúa como esposa pequeña", category: "Sumiso" },
  { name: "Wax Bottom", description: "Un sumiso que recibe cera", category: "Sumiso" },
  { name: "Wax Slut", description: "Un sumiso que disfruta especialmente de la cera", category: "Sumiso" },
  { name: "wench", description: "Un sumiso femenino que actúa como sirvienta", category: "Sumiso" },
  { name: "whipping post", description: "Un sumiso que actúa como poste de azotes", category: "Sumiso" },
  
     // Switch Roles
   { name: "Switch", description: "Alguien que puede ser tanto dominante como sumiso", category: "Switch" },
   { name: "Dom-Leaning Switch", description: "Un switch que prefiere ser dominante", category: "Switch" },
   { name: "Sub-Leaning Switch", description: "Un switch que prefiere ser sumiso", category: "Switch" },
   { name: "Top-Leaning Switch", description: "Un switch que prefiere ser el compañero activo", category: "Switch" },
   { name: "Bottom-Leaning Switch", description: "Un switch que prefiere ser el compañero receptivo", category: "Switch" },
  
     // Age Play
   { name: "Adult Baby", description: "Alguien que participa en juegos de regresión de edad", category: "Juego de Edad" },
   { name: "ABDL", description: "Adult Baby Diaper Lover - alguien que disfruta del juego con pañales", category: "Juego de Edad" },
   { name: "Ageplayer", description: "Alguien que participa en escenarios de juego de edad", category: "Juego de Edad" },
   { name: "Age Regressor", description: "Alguien que regresa a un estado mental más joven", category: "Juego de Edad" },
   { name: "Caregiver", description: "Alguien que cuida a los littles durante el juego de edad", category: "Juego de Edad" },
   { name: "Daddi", description: "Un dominante que adopta un rol paternal en el juego de edad", category: "Juego de Edad" },
   { name: "Foster Daddy", description: "Una figura paternal temporal en el juego de edad", category: "Juego de Edad" },
   { name: "Foster Mommy", description: "Una figura maternal temporal en el juego de edad", category: "Juego de Edad" },
  
     // Service Roles
   { name: "Service Submissive", description: "Un sumiso que se enfoca en servir a su dominante", category: "Servicio" },
   { name: "Service Top", description: "Un dominante que se enfoca en proporcionar servicio a su sumiso", category: "Servicio" },
   { name: "Service Switch", description: "Un switch que se enfoca en servir a otros", category: "Servicio" },
   { name: "Bootblack", description: "Alguien que se especializa en el cuidado del cuero y servicio", category: "Servicio" },
   { name: "butler", description: "Un sumiso que sirve en capacidad doméstica", category: "Servicio" },
   { name: "maid", description: "Un sumiso que sirve en capacidad doméstica", category: "Servicio" },
   { name: "personal assistant", description: "Un sumiso que proporciona apoyo administrativo", category: "Servicio" },
   { name: "personal secretary", description: "Un sumiso que proporciona apoyo secretarial", category: "Servicio" },
  
     // BDSM Specific
   { name: "Rigger", description: "Alguien que ata a su pareja con cuerdas o restricciones", category: "BDSM" },
   { name: "Rope Bottom", description: "Alguien que es atado durante el juego con cuerdas", category: "BDSM" },
   { name: "Rope Top", description: "Alguien que hace bondage con cuerdas a otros", category: "BDSM" },
   { name: "Rope Switch", description: "Alguien que puede tanto atar como ser atado", category: "BDSM" },
   { name: "Impact Top", description: "Alguien que aplica juego de impacto (nalgadas, azotes, etc.)", category: "BDSM" },
   { name: "Impact Bottom", description: "Alguien que recibe juego de impacto", category: "BDSM" },
   { name: "Impact Switch", description: "Alguien que puede tanto dar como recibir impacto", category: "BDSM" },
   { name: "Sadist", description: "Alguien que disfruta dar dolor consensualmente", category: "BDSM" },
   { name: "Masochist", description: "Alguien que disfruta recibir dolor consensualmente", category: "BDSM" },
   { name: "Sadomasochist", description: "Alguien que disfruta tanto dar como recibir dolor", category: "BDSM" },
   { name: "Bondage Top", description: "Alguien que aplica restricciones a otros", category: "BDSM" },
   { name: "Bondage Bottom", description: "Alguien que es restringido", category: "BDSM" },
   { name: "Bondage Switch", description: "Alguien que puede tanto restringir como ser restringido", category: "BDSM" },
  
     // Sexual Roles
   { name: "Top", description: "Alguien que es el compañero activo durante actividades sexuales", category: "Sexual" },
   { name: "Bottom", description: "Alguien que es el compañero receptivo durante actividades sexuales", category: "Sexual" },
   { name: "Vers", description: "Alguien que puede ser tanto top como bottom", category: "Sexual" },
   { name: "Stone Top", description: "Alguien que solo da y nunca recibe estimulación sexual", category: "Sexual" },
   { name: "Stone Bottom", description: "Alguien que solo recibe y nunca da estimulación sexual", category: "Sexual" },
   { name: "Power Bottom", description: "Un bottom que mantiene el control durante actividades sexuales", category: "Sexual" },
   { name: "Pillow Princess", description: "Alguien que prefiere recibir placer sin reciprocidad", category: "Sexual" },
   { name: "Pillow Queen", description: "Alguien que prefiere recibir placer sin reciprocidad", category: "Sexual" },
  
     // Exhibitionism & Voyeurism
   { name: "Exhibitionist", description: "Alguien que disfruta ser observado durante actividades sexuales", category: "Exhibicionismo" },
   { name: "Voyeur", description: "Alguien que disfruta observar a otros durante actividades sexuales", category: "Exhibicionismo" },
   { name: "Aesthetic Exhibitionist", description: "Alguien que disfruta ser visto por razones estéticas", category: "Exhibicionismo" },
  
     // Financial Domination
   { name: "FinDom", description: "Dominante Financiero - alguien que controla las finanzas", category: "Financiero" },
   { name: "FinDomme", description: "Dominante Financiera Femenina", category: "Financiero" },
   { name: "Pay Pig", description: "Alguien que da dinero a un dominante financiero", category: "Financiero" },
  
     // Primal
   { name: "Primal", description: "Alguien que participa en juegos animales e instintivos", category: "Primal" },
   { name: "Primal Predator", description: "Un dominante que adopta un rol depredador", category: "Primal" },
   { name: "Primal Prey", description: "Un sumiso que adopta un rol de presa", category: "Primal" },
   { name: "Primal Hunter", description: "Un dominante que caza a su presa", category: "Primal" },
   { name: "Primal Huntress", description: "Una dominante que caza a su presa", category: "Primal" },
   { name: "Primal Daddy", description: "Un dominante que combina roles primales y paternales", category: "Primal" },
   { name: "Primal Mommy", description: "Una dominante que combina roles primales y maternales", category: "Primal" },
  
     // Brat & Brat Taming
   { name: "Brat", description: "Un sumiso que actúa mal para obtener atención o castigo", category: "Brat" },
   { name: "Brat Tamer", description: "Un dominante que maneja comportamiento bratty", category: "Brat" },
   { name: "Brat Handler", description: "Un dominante que gestiona comportamiento bratty", category: "Brat" },
   { name: "Brat Wrangler", description: "Un dominante que controla comportamiento bratty", category: "Brat" },
   { name: "Brat Breaker", description: "Un dominante que rompe comportamiento bratty", category: "Brat" },
   { name: "Brat Enabler", description: "Alguien que fomenta comportamiento bratty", category: "Brat" },
   { name: "Bratty Dom", description: "Un dominante que es bratty ellos mismos", category: "Brat" },
   { name: "Bratty Domme", description: "Una dominante que es bratty ella misma", category: "Brat" },
  
     // Cuckold/Cuckquean
   { name: "Cuckold", description: "Un hombre cuya pareja tiene sexo con otros", category: "Cuckold" },
   { name: "Cuckquean", description: "Una mujer cuya pareja tiene sexo con otros", category: "Cuckold" },
   { name: "Cuckoldress", description: "Una mujer que hace cuckold a su pareja", category: "Cuckold" },
   { name: "Bull", description: "Un dominante masculino que tiene sexo con la pareja de alguien", category: "Cuckold" },
   { name: "FemBull", description: "Una dominante femenina que tiene sexo con la pareja de alguien", category: "Cuckold" },
   { name: "Hotwife", description: "Una mujer que tiene sexo con otros con el consentimiento de su pareja", category: "Cuckold" },
   { name: "Hothusband", description: "Un hombre que tiene sexo con otros con el consentimiento de su pareja", category: "Cuckold" },
   { name: "Stag", description: "Un hombre cuya pareja tiene sexo con otros con su consentimiento", category: "Cuckold" },
   { name: "Cuckcake", description: "Una mujer que tiene sexo con la pareja de un cuckold", category: "Cuckold" },
  
     // Pet Play
   { name: "puppyboy", description: "Un sumiso masculino que se identifica como una mascota canina", category: "Juego de Mascotas" },
   { name: "puppygirl", description: "Un sumiso femenino que se identifica como una mascota canina", category: "Juego de Mascotas" },
   { name: "catboy", description: "Un sumiso masculino que se identifica como una mascota felina", category: "Juego de Mascotas" },
   { name: "catgirl", description: "Un sumiso femenino que se identifica como una mascota felina", category: "Juego de Mascotas" },
   { name: "babyfur", description: "Un furry que participa en juegos de edad", category: "Juego de Mascotas" },
   { name: "kinderfur", description: "Un furry que participa en juegos de edad", category: "Juego de Mascotas" },
   { name: "Furry", description: "Alguien que se identifica con personajes animales antropomórficos", category: "Juego de Mascotas" },
   { name: "Otherkin", description: "Alguien que se identifica como no humano", category: "Juego de Mascotas" },
   { name: "Therian", description: "Alguien que se identifica como un animal", category: "Juego de Mascotas" },
  
     // Leather Community
   { name: "Leather Daddy", description: "Un dominante masculino en la comunidad leather", category: "Leather" },
   { name: "Leather Mommy", description: "Una dominante femenina en la comunidad leather", category: "Leather" },
   { name: "Leather Top", description: "Un dominante en la comunidad leather", category: "Leather" },
   { name: "Leather Bottom", description: "Un sumiso en la comunidad leather", category: "Leather" },
   { name: "Leatherboy", description: "Un sumiso masculino en la comunidad leather", category: "Leather" },
   { name: "Leathergirl", description: "Un sumiso femenino en la comunidad leather", category: "Leather" },
   { name: "Leatherman", description: "Un hombre en la comunidad leather", category: "Leather" },
   { name: "Leatherwoman", description: "Una mujer en la comunidad leather", category: "Leather" },
   { name: "Leather Person", description: "Alguien en la comunidad leather", category: "Leather" },
   { name: "Leatherperson", description: "Alguien en la comunidad leather", category: "Leather" },
  
     // Other Common Roles
   { name: "Vanilla", description: "Alguien que no participa en kink", category: "Otros" },
   { name: "Undecided", description: "Alguien que aún está explorando su identidad kink", category: "Otros" },
   { name: "Not Applicable", description: "Este rol no se aplica a mí", category: "Otros" },
   { name: "Exploring", description: "Alguien que está explorando activamente el kink", category: "Otros" },
   { name: "Evolving", description: "Alguien cuya identidad kink está cambiando", category: "Otros" },
   { name: "Novice Dom", description: "Un dominante que es nuevo en el estilo de vida", category: "Otros" },
   { name: "Solo Player", description: "Alguien que practica kink solo", category: "Otros" },
   { name: "Roleplayer", description: "Alguien que participa en escenarios de roleplay", category: "Otros" },
   { name: "Educator", description: "Alguien que enseña a otros sobre kink", category: "Otros" },
   { name: "Facilitator", description: "Alguien que ayuda a organizar eventos kink", category: "Otros" },
   { name: "Organizer", description: "Alguien que organiza eventos kink", category: "Otros" },
   { name: "Munch Organizer", description: "Alguien que organiza eventos sociales kink", category: "Otros" },
];

const categories = ["Todos", "Dominante", "Sumiso", "Switch", "Juego de Edad", "Servicio", "BDSM", "Sexual", "Exhibicionismo", "Financiero", "Primal", "Brat", "Cuckold", "Juego de Mascotas", "Leather", "Otros"];

const Roles = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const filteredRoles = roles.filter(role => {
    const matchesSearch = role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         role.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "Todos" || role.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
                     <h1 className="text-4xl font-bold text-center mb-4">Roles Kink y Descripciones</h1>
           <p className="text-center text-muted-foreground mb-6">
             Explora el diverso mundo de los roles kink y sus significados
           </p>
          
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
                         <Input
               placeholder="Buscar roles..."
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="flex-1"
             />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border rounded-md bg-background"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRoles.map((role) => (
            <Card key={role.name} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{role.name}</CardTitle>
                  <Badge variant="secondary" className="text-xs">
                    {role.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{role.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

                 {filteredRoles.length === 0 && (
           <div className="text-center py-8">
             <p className="text-muted-foreground">No se encontraron roles que coincidan con tus criterios de búsqueda.</p>
           </div>
         )}
      </div>
    </Layout>
  );
};

export default Roles;
