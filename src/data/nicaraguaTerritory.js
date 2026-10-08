// Fuente territorial de referencia: INIDE, Anuario Estadístico 2023, tabla I.1.2.
// La tabla documenta 15 departamentos + 2 regiones autónomas y 153 municipios.
// URL: https://www.inide.gob.ni/docs/Anuarios/Anuario2023/Anuario_Estadistico_2023.pdf

const municipalityGroups = [
  ["Chinandega", ["Chinandega", "Chichigalpa", "Cinco Pinos", "Corinto", "El Realejo", "El Viejo", "Posoltega", "Puerto Morazán", "San Francisco del Norte", "San Pedro del Norte", "Santo Tomás del Norte", "Somotillo", "Villanueva"]],
  ["León", ["León", "Achuapa", "El Jicaral", "El Sauce", "La Paz Centro", "Larreynaga", "Nagarote", "Quezalguaque", "Santa Rosa del Peñón", "Telica"]],
  ["Managua", ["Managua", "Ciudad Sandino", "El Crucero", "Mateare", "San Francisco Libre", "San Rafael del Sur", "Ticuantepe", "Tipitapa", "Villa El Carmen"]],
  ["Masaya", ["Masaya", "Catarina", "La Concepción", "Masatepe", "Nandasmo", "Nindirí", "Niquinohomo", "San Juan de Oriente", "Tisma"]],
  ["Granada", ["Granada", "Diriá", "Diriomo", "Nandaime"]],
  ["Carazo", ["Jinotepe", "Diriamba", "Dolores", "El Rosario", "La Conquista", "La Paz de Carazo", "San Marcos", "Santa Teresa"]],
  ["Rivas", ["Rivas", "Altagracia", "Belén", "Buenos Aires", "Cárdenas", "Moyogalpa", "Potosí", "San Jorge", "San Juan del Sur", "Tola"]],
  ["Boaco", ["Boaco", "Camoapa", "San José de los Remates", "San Lorenzo", "Santa Lucía", "Teustepe"]],
  ["Chontales", ["Juigalpa", "Acoyapa", "Comalapa", "La Libertad", "San Pedro de Lóvago", "Santo Domingo", "Santo Tomás", "Villa Sandino", "El Coral", "San Francisco de Cuapa"]],
  ["Estelí", ["Estelí", "Condega", "La Trinidad", "Pueblo Nuevo", "San Juan de Limay", "San Nicolás"]],
  ["Jinotega", ["Jinotega", "El Cuá", "La Concordia", "San José de Bocay", "San Rafael del Norte", "San Sebastián de Yalí", "Santa María de Pantasma", "Wiwilí de Jinotega"]],
  ["Madriz", ["Somoto", "Las Sabanas", "Palacagüina", "San José de Cusmapa", "San Juan de Río Coco", "San Lucas", "Telpaneca", "Totogalpa", "Yalagüina"]],
  ["Matagalpa", ["Matagalpa", "Ciudad Darío", "Esquipulas", "Matiguás", "Muy Muy", "Rancho Grande", "Río Blanco", "San Dionisio", "San Isidro", "San Ramón", "Sébaco", "Terrabona", "El Tuma-La Dalia"]],
  ["Nueva Segovia", ["Ocotal", "Ciudad Antigua", "Dipilto", "El Jícaro", "Jalapa", "Macuelizo", "Mozonte", "Murra", "Quilalí", "San Fernando", "Wiwilí de Nueva Segovia", "Santa María"]],
  ["Río San Juan", ["San Carlos", "El Almendro", "El Castillo", "Morrito", "San Juan de Nicaragua", "San Miguelito"]],
  ["Región Autónoma de la Costa Caribe Norte", ["Puerto Cabezas", "Bonanza", "Mulukukú", "Prinzapolka", "Rosita", "Siuna", "Waslala", "Waspán"]],
  ["Región Autónoma de la Costa Caribe Sur", ["Bluefields", "Corn Island", "Desembocadura de Río Grande", "El Rama", "El Tortuguero", "Kukra Hill", "La Cruz de Río Grande", "Laguna de Perlas", "Muelle de los Bueyes", "Nueva Guinea", "El Ayote", "Paiwas"]],
];

const departmentMeta = {
  "Managua": { region: "Pacífico", imageUrl: null },
  "León": { region: "Pacífico", imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Catedral%20Le%C3%B3n%2C%20Nicaragua%20por%20Richard%20Weiss.JPG?width=1200", sourceUrl: "https://commons.wikimedia.org/wiki/File:Catedral_Le%C3%B3n,_Nicaragua_por_Richard_Weiss.JPG", sourceName: "Wikimedia Commons", photographer: "Richard Weiss", license: "Wikimedia Commons" },
  "Granada": { region: "Pacífico", imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Cathedral%20of%20Granada%20Nicaragua.jpg?width=1200", sourceUrl: "https://commons.wikimedia.org/wiki/File:Cathedral_of_Granada_Nicaragua.jpg", sourceName: "Wikimedia Commons", photographer: "Sebastian Scheper", license: "Wikimedia Commons" },
  "Masaya": { region: "Pacífico", imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Masaya%20Volcano.jpg?width=1200", sourceUrl: "https://commons.wikimedia.org/wiki/File:Masaya_Volcano.jpg", sourceName: "Wikimedia Commons", photographer: "Mtran99", license: "CC BY-SA" },
  "Carazo": { region: "Pacífico" }, "Rivas": { region: "Pacífico", imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/San%20Juan%20del%20Sur%20Nicaragua.JPG?width=1200", sourceUrl: "https://commons.wikimedia.org/wiki/File:San_Juan_del_Sur_Nicaragua.JPG", sourceName: "Wikimedia Commons", photographer: "Keith", license: "GFDL" },
  "Chinandega": { region: "Pacífico" }, "Estelí": { region: "Centro-Norte" }, "Madriz": { region: "Centro-Norte", imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Somoto%20canyon%20in%20Somoto.JPG?width=1200", sourceUrl: "https://commons.wikimedia.org/wiki/File:Somoto_canyon_in_Somoto.JPG", sourceName: "Wikimedia Commons", photographer: "Pitxiquin", license: "CC" },
  "Nueva Segovia": { region: "Centro-Norte" }, "Jinotega": { region: "Centro-Norte" }, "Matagalpa": { region: "Centro-Norte" }, "Boaco": { region: "Centro-Norte" }, "Chontales": { region: "Centro-Norte" }, "Río San Juan": { region: "Caribe y Río San Juan" },
  "Región Autónoma de la Costa Caribe Norte": { region: "Costa Caribe", imageUrl: "https://commons.wikimedia.org/wiki/Special:FilePath/Corn%20island%20-%20Nicaragua.jpg?width=1200", sourceUrl: "https://commons.wikimedia.org/", sourceName: "Wikimedia Commons", photographer: "Wikimedia contributor", license: "See source page" },
  "Región Autónoma de la Costa Caribe Sur": { region: "Costa Caribe", imageUrl: null },
};

const descriptions = {
  Managua: "Capital y punto de conexión para descubrir la diversidad del país.",
  León: "Patrimonio, volcanes, playas, historia y cultura viva.",
  Granada: "Arquitectura colonial, isletas y una escena cultural vibrante.",
  Masaya: "Artesanía, volcanes y tradiciones del Pacífico nicaragüense.",
  Carazo: "Pueblos frescos, café, costa y tradiciones del Pacífico.",
  Rivas: "Playas, surf, Ometepe y paisajes alrededor del Cocibolca.",
  Chinandega: "Volcanes, costa del Pacífico y riqueza agrícola y cultural.",
  Estelí: "Montaña, tabaco, naturaleza y experiencias del norte.",
  Madriz: "Cañones, tradiciones y paisajes serranos.",
  "Nueva Segovia": "Montaña, café y paisajes del norte fronterizo.",
  Jinotega: "Bosques, café y rutas de montaña.",
  Matagalpa: "Café, cascadas y turismo de naturaleza.",
  Boaco: "Paisajes ganaderos y cultura del centro del país.",
  Chontales: "Naturaleza, ganadería y rutas hacia el Caribe.",
  "Río San Juan": "Ríos, selva, historia y biodiversidad.",
  "Región Autónoma de la Costa Caribe Norte": "Caribe indígena, naturaleza y cultura costera.",
  "Región Autónoma de la Costa Caribe Sur": "Comunidades caribeñas, lagunas, cayos y biodiversidad.",
};

export const departmentsData = municipalityGroups.map(([name, municipalities], index) => ({
  id: index + 1,
  slug: name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
  name,
  type: name.startsWith("Región Autónoma") ? "region-autonoma" : "departamento",
  region: departmentMeta[name]?.region ?? "Nicaragua",
  description: descriptions[name] ?? "Territorio para descubrir experiencias y servicios turísticos.",
  municipalities: municipalities.map((municipality, i) => ({ id: `${index + 1}-${i + 1}`, name: municipality, department: name })),
  municipalityCount: municipalities.length,
  ...(departmentMeta[name] ?? {}),
}));

export const autonomousRegionsData = departmentsData.filter((item) => item.type === "region-autonoma");
export const municipalitiesData = departmentsData.flatMap((department) => department.municipalities.map((municipality) => ({ ...municipality, departmentId: department.id })));
export const territoryStats = { departments: 15, autonomousRegions: 2, municipalities: municipalitiesData.length };
