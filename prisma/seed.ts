import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// More or Less questions - 100 days of interesting comparisons
const moreOrLessQuestions = [
  { dayNumber: 1, statementA: "Annual hot dog consumption in the US (in millions)", valueA: 20000, statementB: "Miles of railroad track in India", valueB: 42850, sourceA: "National Hot Dog Council", sourceB: "Indian Railways" },
  { dayNumber: 2, statementA: "Number of lakes in Finland", valueA: 187888, statementB: "Number of islands in Sweden", valueB: 267570, sourceA: "Finnish Environment Institute", sourceB: "Swedish Maritime Administration" },
  { dayNumber: 3, statementA: "Height of Burj Khalifa in feet", valueA: 2717, statementB: "Depth of Grand Canyon in feet", valueB: 6093, sourceA: "Burj Khalifa Official", sourceB: "National Park Service" },
  { dayNumber: 4, statementA: "Number of languages spoken in Papua New Guinea", valueA: 840, statementB: "Number of UNESCO World Heritage Sites", valueB: 1199, sourceA: "Ethnologue", sourceB: "UNESCO" },
  { dayNumber: 5, statementA: "Average number of lightning strikes on Earth per second", valueA: 100, statementB: "Average heart beats per minute of a hummingbird", valueB: 1200, sourceA: "NOAA", sourceB: "Cornell Lab of Ornithology" },
  { dayNumber: 6, statementA: "Number of bones in a shark", valueA: 0, statementB: "Number of bones in a human hand", valueB: 27, sourceA: "Marine Biology Research", sourceB: "Gray's Anatomy" },
  { dayNumber: 7, statementA: "Speed of a sneeze in mph", valueA: 100, statementB: "Speed of a cheetah in mph", valueB: 70, sourceA: "MIT Research", sourceB: "National Geographic" },
  { dayNumber: 8, statementA: "Number of taste buds on human tongue", valueA: 10000, statementB: "Number of taste buds on a catfish", valueB: 175000, sourceA: "NIH", sourceB: "Journal of Fish Biology" },
  { dayNumber: 9, statementA: "Length of Great Wall of China in miles", valueA: 13171, statementB: "Distance from NYC to Los Angeles in miles", valueB: 2451, sourceA: "Chinese Government Survey", sourceB: "Google Maps" },
  { dayNumber: 10, statementA: "Weight of the Statue of Liberty in tons", valueA: 225, statementB: "Weight of a blue whale tongue in tons", valueB: 3, sourceA: "NPS", sourceB: "NOAA Fisheries" },
  { dayNumber: 11, statementA: "Number of muscles in an elephant trunk", valueA: 40000, statementB: "Number of muscles in human body", valueB: 640, sourceA: "Smithsonian", sourceB: "NIH" },
  { dayNumber: 12, statementA: "Letters in Hawaiian alphabet", valueA: 12, statementB: "Letters in Russian alphabet", valueB: 33, sourceA: "University of Hawaii", sourceB: "Russian Language Institute" },
  { dayNumber: 13, statementA: "Deepest ocean depth in feet (Mariana Trench)", valueA: 36201, statementB: "Height of Mount Everest in feet", valueB: 29032, sourceA: "NOAA", sourceB: "National Geographic" },
  { dayNumber: 14, statementA: "Year the Eiffel Tower was completed", valueA: 1889, statementB: "Year the Brooklyn Bridge opened", valueB: 1883, sourceA: "Eiffel Tower Official", sourceB: "NYC DOT" },
  { dayNumber: 15, statementA: "Number of ridges on a dime", valueA: 118, statementB: "Number of ridges on a quarter", valueB: 119, sourceA: "US Mint", sourceB: "US Mint" },
  { dayNumber: 16, statementA: "Average lifespan of a housefly in days", valueA: 28, statementB: "Average lifespan of a mayfly in hours", valueB: 24, sourceA: "Entomological Society", sourceB: "Entomological Society" },
  { dayNumber: 17, statementA: "Number of time zones in Russia", valueA: 11, statementB: "Number of time zones in China", valueB: 1, sourceA: "Russian Government", sourceB: "Chinese Government" },
  { dayNumber: 18, statementA: "Population of Tokyo metropolitan area (millions)", valueA: 37, statementB: "Population of Canada (millions)", valueB: 38, sourceA: "Tokyo Metropolitan Government", sourceB: "Statistics Canada" },
  { dayNumber: 19, statementA: "Length of Amazon River in miles", valueA: 4000, statementB: "Length of Nile River in miles", valueB: 4132, sourceA: "Geographic Survey", sourceB: "Geographic Survey" },
  { dayNumber: 20, statementA: "Number of keys on a standard piano", valueA: 88, statementB: "Number of cards in a tarot deck", valueB: 78, sourceA: "Steinway", sourceB: "Tarot Association" },
  { dayNumber: 21, statementA: "Temperature of the Sun's surface in Fahrenheit", valueA: 10000, statementB: "Temperature of lightning bolt in Fahrenheit", valueB: 54000, sourceA: "NASA", sourceB: "NOAA" },
  { dayNumber: 22, statementA: "Number of moons orbiting Jupiter", valueA: 95, statementB: "Number of moons orbiting Saturn", valueB: 146, sourceA: "NASA", sourceB: "NASA" },
  { dayNumber: 23, statementA: "Percentage of Earth covered by ocean", valueA: 71, statementB: "Percentage of Amazon rainforest in Brazil", valueB: 60, sourceA: "NOAA", sourceB: "WWF" },
  { dayNumber: 24, statementA: "Number of verses in the Quran", valueA: 6236, statementB: "Number of verses in the Bible", valueB: 31102, sourceA: "Islamic Studies", sourceB: "Biblical Research" },
  { dayNumber: 25, statementA: "Weight of an adult panda in pounds", valueA: 250, statementB: "Weight of an adult gorilla in pounds", valueB: 400, sourceA: "WWF", sourceB: "National Geographic" },
  { dayNumber: 26, statementA: "Number of bones in a giraffe's neck", valueA: 7, statementB: "Number of bones in a human neck", valueB: 7, sourceA: "Zoological Society", sourceB: "Medical Anatomy" },
  { dayNumber: 27, statementA: "Speed of sound in mph", valueA: 767, statementB: "Speed of Earth's rotation at equator in mph", valueB: 1040, sourceA: "Physics Institute", sourceB: "NASA" },
  { dayNumber: 28, statementA: "Wingspan of a wandering albatross in feet", valueA: 11, statementB: "Length of a king cobra in feet", valueB: 18, sourceA: "Audubon Society", sourceB: "National Geographic" },
  { dayNumber: 29, statementA: "Number of pyramids in Egypt", valueA: 138, statementB: "Number of pyramids in Sudan", valueB: 255, sourceA: "Egyptian Ministry of Antiquities", sourceB: "Sudan Archaeological Society" },
  { dayNumber: 30, statementA: "Year coffee was discovered", valueA: 850, statementB: "Year tea was discovered", valueB: 2737, sourceA: "Coffee History Archives", sourceB: "Tea History Archives" },
  { dayNumber: 31, statementA: "Number of countries in Africa", valueA: 54, statementB: "Number of countries in Europe", valueB: 44, sourceA: "African Union", sourceB: "Council of Europe" },
  { dayNumber: 32, statementA: "Length of a blue whale in feet", valueA: 100, statementB: "Length of a basketball court in feet", valueB: 94, sourceA: "NOAA", sourceB: "NBA" },
  { dayNumber: 33, statementA: "Number of feathers on a swan", valueA: 25000, statementB: "Number of quills on a porcupine", valueB: 30000, sourceA: "Ornithology Studies", sourceB: "Wildlife Research" },
  { dayNumber: 34, statementA: "Age of the oldest tree in years (Methuselah)", valueA: 4855, statementB: "Age of the Great Pyramid in years", valueB: 4500, sourceA: "US Forest Service", sourceB: "Egyptian Archaeology" },
  { dayNumber: 35, statementA: "Number of islands in the Philippines", valueA: 7641, statementB: "Number of islands in Indonesia", valueB: 17508, sourceA: "Philippine Government", sourceB: "Indonesian Government" },
  { dayNumber: 36, statementA: "Melting point of gold in Fahrenheit", valueA: 1948, statementB: "Melting point of iron in Fahrenheit", valueB: 2800, sourceA: "Chemistry Reference", sourceB: "Chemistry Reference" },
  { dayNumber: 37, statementA: "Number of dimples on a golf ball", valueA: 336, statementB: "Number of stitches on a baseball", valueB: 108, sourceA: "USGA", sourceB: "MLB" },
  { dayNumber: 38, statementA: "Calories in a Big Mac", valueA: 550, statementB: "Calories in a Whopper", valueB: 657, sourceA: "McDonald's", sourceB: "Burger King" },
  { dayNumber: 39, statementA: "Number of electoral votes in California", valueA: 54, statementB: "Number of electoral votes in Texas", valueB: 40, sourceA: "US Electoral College", sourceB: "US Electoral College" },
  { dayNumber: 40, statementA: "Year the first email was sent", valueA: 1971, statementB: "Year the first text message was sent", valueB: 1992, sourceA: "Internet History", sourceB: "Telecom History" },
  { dayNumber: 41, statementA: "Hours of sleep a koala needs daily", valueA: 22, statementB: "Hours of sleep a giraffe needs daily", valueB: 2, sourceA: "Australian Wildlife", sourceB: "African Wildlife" },
  { dayNumber: 42, statementA: "Number of patents held by Thomas Edison", valueA: 1093, statementB: "Number of patents held by Nikola Tesla", valueB: 300, sourceA: "USPTO", sourceB: "USPTO" },
  { dayNumber: 43, statementA: "Circumference of Earth in miles", valueA: 24901, statementB: "Distance to the Moon in miles", valueB: 238855, sourceA: "NASA", sourceB: "NASA" },
  { dayNumber: 44, statementA: "Number of dots on a pair of dice", valueA: 42, statementB: "Number of spaces on a Monopoly board", valueB: 40, sourceA: "Mathematics", sourceB: "Hasbro" },
  { dayNumber: 45, statementA: "Weight of the human brain in pounds", valueA: 3, statementB: "Weight of the human heart in pounds", valueB: 0.7, sourceA: "NIH", sourceB: "NIH" },
  { dayNumber: 46, statementA: "Number of stripes on US flag", valueA: 13, statementB: "Number of maple leaves on Canadian flag", valueB: 1, sourceA: "US Flag Code", sourceB: "Canadian Heritage" },
  { dayNumber: 47, statementA: "Temperature of absolute zero in Fahrenheit", valueA: -459, statementB: "Coldest temperature recorded on Earth in Fahrenheit", valueB: -128, sourceA: "Physics Standards", sourceB: "WMO" },
  { dayNumber: 48, statementA: "Number of legs on a lobster", valueA: 10, statementB: "Number of legs on a spider", valueB: 8, sourceA: "Marine Biology", sourceB: "Arachnology" },
  { dayNumber: 49, statementA: "Year the Berlin Wall fell", valueA: 1989, statementB: "Year the Soviet Union dissolved", valueB: 1991, sourceA: "German Archives", sourceB: "Russian Archives" },
  { dayNumber: 50, statementA: "Number of books in the Harry Potter series", valueA: 7, statementB: "Number of books in Chronicles of Narnia", valueB: 7, sourceA: "Scholastic", sourceB: "HarperCollins" },
  { dayNumber: 51, statementA: "Length of the Mississippi River in miles", valueA: 2340, statementB: "Length of the Danube River in miles", valueB: 1777, sourceA: "USGS", sourceB: "European Commission" },
  { dayNumber: 52, statementA: "Number of stars on EU flag", valueA: 12, statementB: "Number of stars on Australian flag", valueB: 6, sourceA: "European Commission", sourceB: "Australian Government" },
  { dayNumber: 53, statementA: "Average rainfall in Death Valley annually (inches)", valueA: 2, statementB: "Average rainfall in Sahara Desert annually (inches)", valueB: 3, sourceA: "NPS", sourceB: "Geographic Studies" },
  { dayNumber: 54, statementA: "Number of symphonies composed by Beethoven", valueA: 9, statementB: "Number of symphonies composed by Mozart", valueB: 41, sourceA: "Music Archives", sourceB: "Music Archives" },
  { dayNumber: 55, statementA: "Year the Titanic sank", valueA: 1912, statementB: "Year the Lusitania sank", valueB: 1915, sourceA: "Maritime History", sourceB: "Maritime History" },
  { dayNumber: 56, statementA: "Number of tentacles on an octopus", valueA: 8, statementB: "Number of tentacles on a squid", valueB: 10, sourceA: "Marine Biology", sourceB: "Marine Biology" },
  { dayNumber: 57, statementA: "Speed of a peregrine falcon dive in mph", valueA: 240, statementB: "Top speed of a Formula 1 car in mph", valueB: 230, sourceA: "Ornithology", sourceB: "FIA" },
  { dayNumber: 58, statementA: "Number of teeth an adult human has", valueA: 32, statementB: "Number of teeth a great white shark has", valueB: 300, sourceA: "Dental Association", sourceB: "Marine Biology" },
  { dayNumber: 59, statementA: "Height of the Leaning Tower of Pisa in feet", valueA: 183, statementB: "Height of Big Ben in feet", valueB: 316, sourceA: "Italian Tourism", sourceB: "UK Parliament" },
  { dayNumber: 60, statementA: "Number of holes in a standard golf course", valueA: 18, statementB: "Number of frames in a bowling game", valueB: 10, sourceA: "USGA", sourceB: "USBC" },
  { dayNumber: 61, statementA: "Percentage of DNA humans share with chimpanzees", valueA: 98, statementB: "Percentage of DNA humans share with bananas", valueB: 60, sourceA: "Genome Research", sourceB: "Genome Research" },
  { dayNumber: 62, statementA: "Number of US states that border Mexico", valueA: 4, statementB: "Number of US states that border Canada", valueB: 13, sourceA: "US Geography", sourceB: "US Geography" },
  { dayNumber: 63, statementA: "Width of the Panama Canal in feet", valueA: 110, statementB: "Width of the Suez Canal in feet", valueB: 673, sourceA: "Panama Canal Authority", sourceB: "Suez Canal Authority" },
  { dayNumber: 64, statementA: "Year the first Olympics were held", valueA: -776, statementB: "Year the first World Cup was held", valueB: 1930, sourceA: "IOC", sourceB: "FIFA" },
  { dayNumber: 65, statementA: "Number of bones in a cat", valueA: 230, statementB: "Number of bones in a dog", valueB: 319, sourceA: "Veterinary Medicine", sourceB: "Veterinary Medicine" },
  { dayNumber: 66, statementA: "Highest recorded wind speed in mph (not tornado)", valueA: 253, statementB: "Highest recorded wave height in feet", valueB: 100, sourceA: "WMO", sourceB: "NOAA" },
  { dayNumber: 67, statementA: "Number of calories in an avocado", valueA: 322, statementB: "Number of calories in a banana", valueB: 105, sourceA: "USDA", sourceB: "USDA" },
  { dayNumber: 68, statementA: "Number of nations in the United Nations", valueA: 193, statementB: "Number of nations in the Commonwealth", valueB: 56, sourceA: "United Nations", sourceB: "Commonwealth Secretariat" },
  { dayNumber: 69, statementA: "Year Machu Picchu was built", valueA: 1450, statementB: "Year the Taj Mahal was completed", valueB: 1653, sourceA: "Peruvian Archaeology", sourceB: "Indian Archaeology" },
  { dayNumber: 70, statementA: "Number of cervical vertebrae in a human", valueA: 7, statementB: "Number of cervical vertebrae in a mouse", valueB: 7, sourceA: "Anatomy", sourceB: "Comparative Anatomy" },
  { dayNumber: 71, statementA: "Surface area of Russia in million sq km", valueA: 17, statementB: "Surface area of Pluto in million sq km", valueB: 17, sourceA: "Russian Geography", sourceB: "NASA" },
  { dayNumber: 72, statementA: "Number of plays written by Shakespeare", valueA: 37, statementB: "Number of operas composed by Verdi", valueB: 28, sourceA: "Shakespeare Studies", sourceB: "Opera Archives" },
  { dayNumber: 73, statementA: "Year the first iPhone was released", valueA: 2007, statementB: "Year the first Android phone was released", valueB: 2008, sourceA: "Apple", sourceB: "Google" },
  { dayNumber: 74, statementA: "Length of the Great Barrier Reef in miles", valueA: 1429, statementB: "Length of the California coastline in miles", valueB: 840, sourceA: "Australian Marine", sourceB: "NOAA" },
  { dayNumber: 75, statementA: "Number of points on a Star of David", valueA: 6, statementB: "Number of points on a pentagram", valueB: 5, sourceA: "Religious Studies", sourceB: "Geometry" },
  { dayNumber: 76, statementA: "Average human walking speed in mph", valueA: 3, statementB: "Average human typing speed in wpm", valueB: 40, sourceA: "Kinesiology", sourceB: "Typing Studies" },
  { dayNumber: 77, statementA: "Diameter of Jupiter in miles", valueA: 86881, statementB: "Diameter of the Sun in miles", valueB: 864337, sourceA: "NASA", sourceB: "NASA" },
  { dayNumber: 78, statementA: "Year Notre-Dame was completed", valueA: 1345, statementB: "Year Westminster Abbey was founded", valueB: 960, sourceA: "French Archives", sourceB: "UK Archives" },
  { dayNumber: 79, statementA: "Number of emirates in UAE", valueA: 7, statementB: "Number of provinces in Canada", valueB: 10, sourceA: "UAE Government", sourceB: "Canadian Government" },
  { dayNumber: 80, statementA: "Weight of a newborn elephant in pounds", valueA: 250, statementB: "Weight of a newborn blue whale in pounds", valueB: 6000, sourceA: "Wildlife Studies", sourceB: "Marine Biology" },
  { dayNumber: 81, statementA: "Number of peaks over 8000m in the world", valueA: 14, statementB: "Number of active volcanoes in Iceland", valueB: 30, sourceA: "Mountaineering Institute", sourceB: "Icelandic Met Office" },
  { dayNumber: 82, statementA: "Population of Vatican City", valueA: 825, statementB: "Seating capacity of the Sistine Chapel", valueB: 200, sourceA: "Vatican", sourceB: "Vatican Museums" },
  { dayNumber: 83, statementA: "Number of amendments in US Constitution", valueA: 27, statementB: "Number of articles in original US Constitution", valueB: 7, sourceA: "National Archives", sourceB: "National Archives" },
  { dayNumber: 84, statementA: "Year the first computer virus was created", valueA: 1971, statementB: "Year the World Wide Web was invented", valueB: 1989, sourceA: "Computer History", sourceB: "CERN" },
  { dayNumber: 85, statementA: "Number of bones in an adult human body", valueA: 206, statementB: "Number of bones in a newborn baby", valueB: 270, sourceA: "Medical Science", sourceB: "Pediatric Medicine" },
  { dayNumber: 86, statementA: "Average height of NBA players in inches", valueA: 79, statementB: "Average height of NFL players in inches", valueB: 74, sourceA: "NBA", sourceB: "NFL" },
  { dayNumber: 87, statementA: "Year the Mona Lisa was painted", valueA: 1503, statementB: "Year the Last Supper was painted", valueB: 1495, sourceA: "Art History", sourceB: "Art History" },
  { dayNumber: 88, statementA: "Number of vertebrae in human spine", valueA: 33, statementB: "Number of vertebrae in a snake", valueB: 400, sourceA: "Anatomy", sourceB: "Herpetology" },
  { dayNumber: 89, statementA: "Elevation of Denver in feet", valueA: 5280, statementB: "Elevation of Mexico City in feet", valueB: 7382, sourceA: "Denver Gov", sourceB: "Mexico City Gov" },
  { dayNumber: 90, statementA: "Number of chambers in a human heart", valueA: 4, statementB: "Number of chambers in a fish heart", valueB: 2, sourceA: "Cardiology", sourceB: "Marine Biology" },
  { dayNumber: 91, statementA: "Length of human intestines in feet", valueA: 25, statementB: "Length of a cow's intestines in feet", valueB: 170, sourceA: "Gastroenterology", sourceB: "Veterinary Science" },
  { dayNumber: 92, statementA: "Year the first photograph was taken", valueA: 1826, statementB: "Year the first movie was shown", valueB: 1895, sourceA: "Photography History", sourceB: "Film History" },
  { dayNumber: 93, statementA: "Number of named constellations", valueA: 88, statementB: "Number of named moons in our solar system", valueB: 293, sourceA: "IAU", sourceB: "NASA" },
  { dayNumber: 94, statementA: "Distance light travels in one second in miles", valueA: 186282, statementB: "Distance from Earth to Mars (minimum) in miles", valueB: 33900000, sourceA: "Physics", sourceB: "NASA" },
  { dayNumber: 95, statementA: "Year the first heart transplant was performed", valueA: 1967, statementB: "Year penicillin was discovered", valueB: 1928, sourceA: "Medical History", sourceB: "Medical History" },
  { dayNumber: 96, statementA: "Number of players on a cricket team", valueA: 11, statementB: "Number of players on a baseball team", valueB: 9, sourceA: "ICC", sourceB: "MLB" },
  { dayNumber: 97, statementA: "Freezing point of water in Kelvin", valueA: 273, statementB: "Boiling point of water in Kelvin", valueB: 373, sourceA: "Physics", sourceB: "Physics" },
  { dayNumber: 98, statementA: "Number of studios that founded the MPAA", valueA: 5, statementB: "Number of original Ivy League schools", valueB: 8, sourceA: "MPAA", sourceB: "Ivy League" },
  { dayNumber: 99, statementA: "Year the first commercial airline flight occurred", valueA: 1914, statementB: "Year the Wright Brothers first flew", valueB: 1903, sourceA: "Aviation History", sourceB: "Smithsonian" },
  { dayNumber: 100, statementA: "Number of elements on periodic table", valueA: 118, statementB: "Number of naturally occurring elements", valueB: 94, sourceA: "IUPAC", sourceB: "Chemistry Reference" },
];

// Timeline events - 5 events per day for 100 days (500 total)
const timelineEvents = [
  // Day 1 - Ancient World
  { dayNumber: 1, eventOrder: 1, title: "Construction of the Great Pyramid of Giza", year: -2560, description: "The oldest of the Seven Wonders of the Ancient World" },
  { dayNumber: 1, eventOrder: 2, title: "First Olympic Games held in Greece", year: -776, description: "Ancient athletic competition in Olympia" },
  { dayNumber: 1, eventOrder: 3, title: "Founding of Rome", year: -753, description: "Traditional date of Rome's founding by Romulus" },
  { dayNumber: 1, eventOrder: 4, title: "Buddha attains enlightenment", year: -528, description: "Siddhartha Gautama becomes the Buddha" },
  { dayNumber: 1, eventOrder: 5, title: "Alexander the Great conquers Persia", year: -331, description: "Battle of Gaugamela" },

  // Day 2 - Medieval Period
  { dayNumber: 2, eventOrder: 1, title: "Fall of the Western Roman Empire", year: 476, description: "End of ancient Rome" },
  { dayNumber: 2, eventOrder: 2, title: "Muhammad founds Islam", year: 622, description: "The Hijra to Medina" },
  { dayNumber: 2, eventOrder: 3, title: "Charlemagne crowned Holy Roman Emperor", year: 800, description: "Revival of the Western Roman Empire" },
  { dayNumber: 2, eventOrder: 4, title: "Norman Conquest of England", year: 1066, description: "William the Conqueror defeats Harold II" },
  { dayNumber: 2, eventOrder: 5, title: "Magna Carta signed", year: 1215, description: "Foundation of constitutional law" },

  // Day 3 - Renaissance & Discovery
  { dayNumber: 3, eventOrder: 1, title: "Gutenberg prints the Bible", year: 1455, description: "First major book printed with movable type" },
  { dayNumber: 3, eventOrder: 2, title: "Columbus reaches the Americas", year: 1492, description: "Beginning of European exploration of the New World" },
  { dayNumber: 3, eventOrder: 3, title: "Michelangelo completes Sistine Chapel ceiling", year: 1512, description: "Renaissance masterpiece" },
  { dayNumber: 3, eventOrder: 4, title: "Martin Luther posts 95 Theses", year: 1517, description: "Start of Protestant Reformation" },
  { dayNumber: 3, eventOrder: 5, title: "Magellan's expedition circumnavigates Earth", year: 1522, description: "First voyage around the world" },

  // Day 4 - Scientific Revolution
  { dayNumber: 4, eventOrder: 1, title: "Copernicus publishes heliocentric theory", year: 1543, description: "Earth revolves around the Sun" },
  { dayNumber: 4, eventOrder: 2, title: "Shakespeare writes Hamlet", year: 1600, description: "One of the greatest plays ever written" },
  { dayNumber: 4, eventOrder: 3, title: "Galileo observes Jupiter's moons", year: 1610, description: "Evidence supporting heliocentrism" },
  { dayNumber: 4, eventOrder: 4, title: "Isaac Newton publishes Principia", year: 1687, description: "Laws of motion and universal gravitation" },
  { dayNumber: 4, eventOrder: 5, title: "Bach composes Brandenburg Concertos", year: 1721, description: "Baroque masterpieces" },

  // Day 5 - Age of Revolution
  { dayNumber: 5, eventOrder: 1, title: "Declaration of Independence signed", year: 1776, description: "Birth of the United States" },
  { dayNumber: 5, eventOrder: 2, title: "French Revolution begins", year: 1789, description: "Storming of the Bastille" },
  { dayNumber: 5, eventOrder: 3, title: "Napoleon crowned Emperor", year: 1804, description: "Rise of the French Empire" },
  { dayNumber: 5, eventOrder: 4, title: "Battle of Waterloo", year: 1815, description: "Napoleon's final defeat" },
  { dayNumber: 5, eventOrder: 5, title: "First passenger railway opens", year: 1825, description: "Stockton and Darlington Railway" },

  // Day 6 - Industrial Age
  { dayNumber: 6, eventOrder: 1, title: "First photograph taken", year: 1826, description: "Joseph Nicéphore Niépce captures first image" },
  { dayNumber: 6, eventOrder: 2, title: "Darwin publishes Origin of Species", year: 1859, description: "Theory of evolution by natural selection" },
  { dayNumber: 6, eventOrder: 3, title: "American Civil War ends", year: 1865, description: "Abolition of slavery in the US" },
  { dayNumber: 6, eventOrder: 4, title: "Alexander Graham Bell patents telephone", year: 1876, description: "Revolutionary communication device" },
  { dayNumber: 6, eventOrder: 5, title: "Edison invents practical light bulb", year: 1879, description: "Electric illumination" },

  // Day 7 - Turn of Century
  { dayNumber: 7, eventOrder: 1, title: "Eiffel Tower completed", year: 1889, description: "Icon of Paris" },
  { dayNumber: 7, eventOrder: 2, title: "X-rays discovered", year: 1895, description: "Wilhelm Röntgen's discovery" },
  { dayNumber: 7, eventOrder: 3, title: "First modern Olympic Games", year: 1896, description: "Athens, Greece" },
  { dayNumber: 7, eventOrder: 4, title: "Wright Brothers first flight", year: 1903, description: "Birth of aviation" },
  { dayNumber: 7, eventOrder: 5, title: "Einstein publishes theory of relativity", year: 1905, description: "E=mc²" },

  // Day 8 - World War Era
  { dayNumber: 8, eventOrder: 1, title: "Titanic sinks", year: 1912, description: "Maritime disaster on maiden voyage" },
  { dayNumber: 8, eventOrder: 2, title: "World War I begins", year: 1914, description: "Assassination of Archduke Franz Ferdinand" },
  { dayNumber: 8, eventOrder: 3, title: "Russian Revolution", year: 1917, description: "Bolsheviks seize power" },
  { dayNumber: 8, eventOrder: 4, title: "Treaty of Versailles signed", year: 1919, description: "End of World War I" },
  { dayNumber: 8, eventOrder: 5, title: "Discovery of Tutankhamun's tomb", year: 1922, description: "Howard Carter's famous find" },

  // Day 9 - Interwar Period
  { dayNumber: 9, eventOrder: 1, title: "First talking motion picture", year: 1927, description: "The Jazz Singer" },
  { dayNumber: 9, eventOrder: 2, title: "Penicillin discovered", year: 1928, description: "Alexander Fleming's discovery" },
  { dayNumber: 9, eventOrder: 3, title: "Stock Market Crash", year: 1929, description: "Beginning of Great Depression" },
  { dayNumber: 9, eventOrder: 4, title: "Empire State Building completed", year: 1931, description: "Tallest building at the time" },
  { dayNumber: 9, eventOrder: 5, title: "Hitler becomes Chancellor of Germany", year: 1933, description: "Rise of Nazi Germany" },

  // Day 10 - World War II
  { dayNumber: 10, eventOrder: 1, title: "World War II begins", year: 1939, description: "Germany invades Poland" },
  { dayNumber: 10, eventOrder: 2, title: "Attack on Pearl Harbor", year: 1941, description: "US enters WWII" },
  { dayNumber: 10, eventOrder: 3, title: "D-Day invasion", year: 1944, description: "Allied invasion of Normandy" },
  { dayNumber: 10, eventOrder: 4, title: "Atomic bombs dropped on Japan", year: 1945, description: "End of World War II" },
  { dayNumber: 10, eventOrder: 5, title: "United Nations founded", year: 1945, description: "International peacekeeping organization" },

  // Days 11-100 continue with diverse historical events...
  // Day 11 - Post-War World
  { dayNumber: 11, eventOrder: 1, title: "India gains independence", year: 1947, description: "End of British colonial rule" },
  { dayNumber: 11, eventOrder: 2, title: "State of Israel established", year: 1948, description: "Creation of modern Israel" },
  { dayNumber: 11, eventOrder: 3, title: "NATO founded", year: 1949, description: "Western military alliance" },
  { dayNumber: 11, eventOrder: 4, title: "Korean War begins", year: 1950, description: "Cold War conflict" },
  { dayNumber: 11, eventOrder: 5, title: "DNA structure discovered", year: 1953, description: "Watson and Crick" },

  // Day 12 - 1950s-60s
  { dayNumber: 12, eventOrder: 1, title: "Rosa Parks refuses to give up seat", year: 1955, description: "Montgomery Bus Boycott begins" },
  { dayNumber: 12, eventOrder: 2, title: "Sputnik launched", year: 1957, description: "First artificial satellite" },
  { dayNumber: 12, eventOrder: 3, title: "Cuban Revolution succeeds", year: 1959, description: "Castro takes power" },
  { dayNumber: 12, eventOrder: 4, title: "Berlin Wall constructed", year: 1961, description: "Cold War symbol" },
  { dayNumber: 12, eventOrder: 5, title: "JFK assassinated", year: 1963, description: "Death of US President" },

  // Day 13 - 1960s
  { dayNumber: 13, eventOrder: 1, title: "Martin Luther King 'I Have a Dream' speech", year: 1963, description: "Civil Rights movement" },
  { dayNumber: 13, eventOrder: 2, title: "Beatles appear on Ed Sullivan Show", year: 1964, description: "British Invasion begins" },
  { dayNumber: 13, eventOrder: 3, title: "First Super Bowl played", year: 1967, description: "AFL-NFL championship" },
  { dayNumber: 13, eventOrder: 4, title: "Martin Luther King Jr. assassinated", year: 1968, description: "Civil rights leader killed" },
  { dayNumber: 13, eventOrder: 5, title: "Moon landing", year: 1969, description: "Apollo 11 - Neil Armstrong walks on Moon" },

  // Day 14 - 1970s
  { dayNumber: 14, eventOrder: 1, title: "First Earth Day celebrated", year: 1970, description: "Environmental movement" },
  { dayNumber: 14, eventOrder: 2, title: "Watergate break-in", year: 1972, description: "Political scandal begins" },
  { dayNumber: 14, eventOrder: 3, title: "Vietnam War ends", year: 1975, description: "Fall of Saigon" },
  { dayNumber: 14, eventOrder: 4, title: "Apple Computer founded", year: 1976, description: "Jobs, Wozniak, Wayne" },
  { dayNumber: 14, eventOrder: 5, title: "First Star Wars movie released", year: 1977, description: "Cultural phenomenon" },

  // Day 15 - Late 1970s-80s
  { dayNumber: 15, eventOrder: 1, title: "First test-tube baby born", year: 1978, description: "Louise Brown" },
  { dayNumber: 15, eventOrder: 2, title: "Iranian Revolution", year: 1979, description: "Shah overthrown" },
  { dayNumber: 15, eventOrder: 3, title: "John Lennon assassinated", year: 1980, description: "Former Beatle killed" },
  { dayNumber: 15, eventOrder: 4, title: "First IBM PC released", year: 1981, description: "Personal computing revolution" },
  { dayNumber: 15, eventOrder: 5, title: "MTV launches", year: 1981, description: "Music television" },

  // Day 16 - 1980s
  { dayNumber: 16, eventOrder: 1, title: "First CD players sold", year: 1982, description: "Digital music format" },
  { dayNumber: 16, eventOrder: 2, title: "Internet domain name system created", year: 1983, description: "DNS established" },
  { dayNumber: 16, eventOrder: 3, title: "Chernobyl disaster", year: 1986, description: "Nuclear meltdown" },
  { dayNumber: 16, eventOrder: 4, title: "Black Monday stock crash", year: 1987, description: "Market collapse" },
  { dayNumber: 16, eventOrder: 5, title: "Berlin Wall falls", year: 1989, description: "End of Cold War symbol" },

  // Day 17 - 1990s
  { dayNumber: 17, eventOrder: 1, title: "World Wide Web invented", year: 1989, description: "Tim Berners-Lee" },
  { dayNumber: 17, eventOrder: 2, title: "Nelson Mandela released from prison", year: 1990, description: "End of apartheid begins" },
  { dayNumber: 17, eventOrder: 3, title: "Soviet Union dissolves", year: 1991, description: "End of Cold War" },
  { dayNumber: 17, eventOrder: 4, title: "First web browser released", year: 1993, description: "Mosaic" },
  { dayNumber: 17, eventOrder: 5, title: "Channel Tunnel opens", year: 1994, description: "UK-France link" },

  // Day 18 - Mid 1990s
  { dayNumber: 18, eventOrder: 1, title: "OJ Simpson trial verdict", year: 1995, description: "Trial of the century" },
  { dayNumber: 18, eventOrder: 2, title: "Dolly the sheep cloned", year: 1996, description: "First cloned mammal" },
  { dayNumber: 18, eventOrder: 3, title: "Princess Diana dies", year: 1997, description: "Paris car crash" },
  { dayNumber: 18, eventOrder: 4, title: "Google founded", year: 1998, description: "Search engine launch" },
  { dayNumber: 18, eventOrder: 5, title: "Euro currency introduced", year: 1999, description: "European monetary union" },

  // Day 19 - 2000s
  { dayNumber: 19, eventOrder: 1, title: "Y2K bug concerns", year: 2000, description: "Millennium bug" },
  { dayNumber: 19, eventOrder: 2, title: "September 11 attacks", year: 2001, description: "Terrorist attacks on US" },
  { dayNumber: 19, eventOrder: 3, title: "Human genome sequenced", year: 2003, description: "Genetics milestone" },
  { dayNumber: 19, eventOrder: 4, title: "Facebook launched", year: 2004, description: "Social media revolution" },
  { dayNumber: 19, eventOrder: 5, title: "YouTube launched", year: 2005, description: "Video sharing platform" },

  // Day 20 - Late 2000s
  { dayNumber: 20, eventOrder: 1, title: "Twitter launched", year: 2006, description: "Microblogging platform" },
  { dayNumber: 20, eventOrder: 2, title: "iPhone released", year: 2007, description: "Smartphone revolution" },
  { dayNumber: 20, eventOrder: 3, title: "Global financial crisis", year: 2008, description: "Economic meltdown" },
  { dayNumber: 20, eventOrder: 4, title: "Barack Obama elected President", year: 2008, description: "First Black US President" },
  { dayNumber: 20, eventOrder: 5, title: "Bitcoin created", year: 2009, description: "Cryptocurrency birth" },

  // Continue with more diverse topics for days 21-100
  // Day 21 - Art & Culture
  { dayNumber: 21, eventOrder: 1, title: "Leonardo da Vinci born", year: 1452, description: "Renaissance polymath" },
  { dayNumber: 21, eventOrder: 2, title: "Rembrandt born", year: 1606, description: "Dutch master painter" },
  { dayNumber: 21, eventOrder: 3, title: "Van Gogh born", year: 1853, description: "Post-Impressionist painter" },
  { dayNumber: 21, eventOrder: 4, title: "Picasso born", year: 1881, description: "Cubism pioneer" },
  { dayNumber: 21, eventOrder: 5, title: "Andy Warhol born", year: 1928, description: "Pop art icon" },

  // Day 22 - Music History
  { dayNumber: 22, eventOrder: 1, title: "Mozart born", year: 1756, description: "Classical composer prodigy" },
  { dayNumber: 22, eventOrder: 2, title: "Beethoven born", year: 1770, description: "Romantic era composer" },
  { dayNumber: 22, eventOrder: 3, title: "Elvis Presley born", year: 1935, description: "King of Rock and Roll" },
  { dayNumber: 22, eventOrder: 4, title: "Michael Jackson born", year: 1958, description: "King of Pop" },
  { dayNumber: 22, eventOrder: 5, title: "Woodstock festival", year: 1969, description: "Iconic music festival" },

  // Day 23 - Literature
  { dayNumber: 23, eventOrder: 1, title: "Dante completes Divine Comedy", year: 1320, description: "Italian epic poem" },
  { dayNumber: 23, eventOrder: 2, title: "Don Quixote published", year: 1605, description: "First modern novel" },
  { dayNumber: 23, eventOrder: 3, title: "Pride and Prejudice published", year: 1813, description: "Jane Austen's masterpiece" },
  { dayNumber: 23, eventOrder: 4, title: "Moby-Dick published", year: 1851, description: "Herman Melville's epic" },
  { dayNumber: 23, eventOrder: 5, title: "1984 by George Orwell published", year: 1949, description: "Dystopian classic" },

  // Day 24 - Sports History
  { dayNumber: 24, eventOrder: 1, title: "First Kentucky Derby", year: 1875, description: "Horse racing tradition" },
  { dayNumber: 24, eventOrder: 2, title: "First Tour de France", year: 1903, description: "Cycling grand tour" },
  { dayNumber: 24, eventOrder: 3, title: "Jesse Owens wins 4 gold medals", year: 1936, description: "Berlin Olympics" },
  { dayNumber: 24, eventOrder: 4, title: "Muhammad Ali defeats Sonny Liston", year: 1964, description: "Boxing history" },
  { dayNumber: 24, eventOrder: 5, title: "Miracle on Ice", year: 1980, description: "US defeats USSR in hockey" },

  // Day 25 - Exploration
  { dayNumber: 25, eventOrder: 1, title: "Marco Polo begins journey to China", year: 1271, description: "Silk Road travels" },
  { dayNumber: 25, eventOrder: 2, title: "Vasco da Gama reaches India", year: 1498, description: "Sea route to Asia" },
  { dayNumber: 25, eventOrder: 3, title: "Lewis and Clark expedition begins", year: 1804, description: "American West exploration" },
  { dayNumber: 25, eventOrder: 4, title: "First person reaches South Pole", year: 1911, description: "Roald Amundsen" },
  { dayNumber: 25, eventOrder: 5, title: "First person reaches bottom of Mariana Trench", year: 1960, description: "Jacques Piccard" },

  // Day 26 - Medicine
  { dayNumber: 26, eventOrder: 1, title: "Hippocrates establishes medicine as profession", year: -400, description: "Father of medicine" },
  { dayNumber: 26, eventOrder: 2, title: "First successful vaccination", year: 1796, description: "Edward Jenner" },
  { dayNumber: 26, eventOrder: 3, title: "First use of anesthesia in surgery", year: 1846, description: "Ether anesthesia" },
  { dayNumber: 26, eventOrder: 4, title: "First successful organ transplant", year: 1954, description: "Kidney transplant" },
  { dayNumber: 26, eventOrder: 5, title: "First artificial heart implant", year: 1982, description: "Jarvik-7 heart" },

  // Day 27 - Transportation
  { dayNumber: 27, eventOrder: 1, title: "First hot air balloon flight", year: 1783, description: "Montgolfier brothers" },
  { dayNumber: 27, eventOrder: 2, title: "First steamship crosses Atlantic", year: 1819, description: "SS Savannah" },
  { dayNumber: 27, eventOrder: 3, title: "First transcontinental railroad completed", year: 1869, description: "Golden Spike" },
  { dayNumber: 27, eventOrder: 4, title: "Model T Ford introduced", year: 1908, description: "Affordable automobile" },
  { dayNumber: 27, eventOrder: 5, title: "First commercial jet service", year: 1952, description: "de Havilland Comet" },

  // Day 28 - Women's History
  { dayNumber: 28, eventOrder: 1, title: "Joan of Arc leads French army", year: 1429, description: "Siege of Orleans" },
  { dayNumber: 28, eventOrder: 2, title: "Mary Wollstonecraft publishes Vindication", year: 1792, description: "Early feminism" },
  { dayNumber: 28, eventOrder: 3, title: "Seneca Falls Convention", year: 1848, description: "Women's rights movement" },
  { dayNumber: 28, eventOrder: 4, title: "19th Amendment ratified", year: 1920, description: "Women's suffrage in US" },
  { dayNumber: 28, eventOrder: 5, title: "First woman in space", year: 1963, description: "Valentina Tereshkova" },

  // Day 29 - Architecture
  { dayNumber: 29, eventOrder: 1, title: "Colosseum completed in Rome", year: 80, description: "Ancient amphitheater" },
  { dayNumber: 29, eventOrder: 2, title: "Hagia Sophia completed", year: 537, description: "Byzantine masterpiece" },
  { dayNumber: 29, eventOrder: 3, title: "Taj Mahal completed", year: 1653, description: "Mughal architecture" },
  { dayNumber: 29, eventOrder: 4, title: "Sydney Opera House opens", year: 1973, description: "Modern architectural icon" },
  { dayNumber: 29, eventOrder: 5, title: "Burj Khalifa opens", year: 2010, description: "World's tallest building" },

  // Day 30 - Philosophy
  { dayNumber: 30, eventOrder: 1, title: "Socrates sentenced to death", year: -399, description: "Greek philosopher" },
  { dayNumber: 30, eventOrder: 2, title: "Plato founds the Academy", year: -387, description: "First university" },
  { dayNumber: 30, eventOrder: 3, title: "Confucius begins teaching", year: -500, description: "Chinese philosophy" },
  { dayNumber: 30, eventOrder: 4, title: "Descartes publishes Meditations", year: 1641, description: "I think therefore I am" },
  { dayNumber: 30, eventOrder: 5, title: "Darwin publishes Origin of Species", year: 1859, description: "Evolution theory" },

  // Days 31-100 continue with more varied themes...
  // Day 31 - Space Exploration
  { dayNumber: 31, eventOrder: 1, title: "First liquid-fueled rocket launched", year: 1926, description: "Robert Goddard" },
  { dayNumber: 31, eventOrder: 2, title: "First satellite in orbit", year: 1957, description: "Sputnik 1" },
  { dayNumber: 31, eventOrder: 3, title: "First human in space", year: 1961, description: "Yuri Gagarin" },
  { dayNumber: 31, eventOrder: 4, title: "Voyager 1 launched", year: 1977, description: "Interstellar mission" },
  { dayNumber: 31, eventOrder: 5, title: "Hubble Space Telescope launched", year: 1990, description: "Orbital observatory" },

  // Day 32 - Ancient Civilizations
  { dayNumber: 32, eventOrder: 1, title: "First writing system developed in Sumeria", year: -3400, description: "Cuneiform" },
  { dayNumber: 32, eventOrder: 2, title: "Egyptian hieroglyphs developed", year: -3200, description: "Ancient writing" },
  { dayNumber: 32, eventOrder: 3, title: "Hammurabi's Code written", year: -1754, description: "Ancient laws" },
  { dayNumber: 32, eventOrder: 4, title: "Library of Alexandria founded", year: -283, description: "Ancient knowledge center" },
  { dayNumber: 32, eventOrder: 5, title: "Julius Caesar assassinated", year: -44, description: "Ides of March" },

  // Day 33 - Technology
  { dayNumber: 33, eventOrder: 1, title: "Wheel invented", year: -3500, description: "Mesopotamia" },
  { dayNumber: 33, eventOrder: 2, title: "Printing press invented", year: 1440, description: "Gutenberg" },
  { dayNumber: 33, eventOrder: 3, title: "Steam engine patented", year: 1769, description: "James Watt" },
  { dayNumber: 33, eventOrder: 4, title: "First computer program written", year: 1843, description: "Ada Lovelace" },
  { dayNumber: 33, eventOrder: 5, title: "First transistor invented", year: 1947, description: "Bell Labs" },

  // Day 34 - Religion
  { dayNumber: 34, eventOrder: 1, title: "Buddhism founded", year: -528, description: "Siddhartha's enlightenment" },
  { dayNumber: 34, eventOrder: 2, title: "Christianity begins", year: 30, description: "Jesus's ministry" },
  { dayNumber: 34, eventOrder: 3, title: "Islam founded", year: 622, description: "Muhammad's revelations" },
  { dayNumber: 34, eventOrder: 4, title: "Protestant Reformation begins", year: 1517, description: "Martin Luther" },
  { dayNumber: 34, eventOrder: 5, title: "Vatican II Council", year: 1962, description: "Catholic modernization" },

  // Day 35 - Economics
  { dayNumber: 35, eventOrder: 1, title: "First coins minted", year: -600, description: "Lydian coins" },
  { dayNumber: 35, eventOrder: 2, title: "Bank of England founded", year: 1694, description: "Central banking" },
  { dayNumber: 35, eventOrder: 3, title: "Adam Smith publishes Wealth of Nations", year: 1776, description: "Modern economics" },
  { dayNumber: 35, eventOrder: 4, title: "Federal Reserve established", year: 1913, description: "US central bank" },
  { dayNumber: 35, eventOrder: 5, title: "Bretton Woods Conference", year: 1944, description: "World monetary system" },

  // Day 36 - Wars and Conflicts
  { dayNumber: 36, eventOrder: 1, title: "Battle of Marathon", year: -490, description: "Greeks defeat Persians" },
  { dayNumber: 36, eventOrder: 2, title: "Hundred Years' War begins", year: 1337, description: "England vs France" },
  { dayNumber: 36, eventOrder: 3, title: "Thirty Years' War ends", year: 1648, description: "Peace of Westphalia" },
  { dayNumber: 36, eventOrder: 4, title: "Battle of Gettysburg", year: 1863, description: "Civil War turning point" },
  { dayNumber: 36, eventOrder: 5, title: "Battle of Stalingrad ends", year: 1943, description: "WWII turning point" },

  // Day 37 - Empires
  { dayNumber: 37, eventOrder: 1, title: "Persian Empire founded", year: -550, description: "Cyrus the Great" },
  { dayNumber: 37, eventOrder: 2, title: "Roman Empire at greatest extent", year: 117, description: "Under Trajan" },
  { dayNumber: 37, eventOrder: 3, title: "Mongol Empire at peak", year: 1279, description: "Largest contiguous empire" },
  { dayNumber: 37, eventOrder: 4, title: "British Empire at peak", year: 1920, description: "Largest empire ever" },
  { dayNumber: 37, eventOrder: 5, title: "Soviet Union collapses", year: 1991, description: "End of superpower" },

  // Day 38 - Scientific Discoveries
  { dayNumber: 38, eventOrder: 1, title: "Archimedes discovers buoyancy", year: -250, description: "Eureka moment" },
  { dayNumber: 38, eventOrder: 2, title: "Galileo improves telescope", year: 1609, description: "Observational astronomy" },
  { dayNumber: 38, eventOrder: 3, title: "Discovery of oxygen", year: 1774, description: "Joseph Priestley" },
  { dayNumber: 38, eventOrder: 4, title: "Discovery of radioactivity", year: 1896, description: "Henri Becquerel" },
  { dayNumber: 38, eventOrder: 5, title: "Discovery of Higgs boson", year: 2012, description: "CERN particle physics" },

  // Day 39 - Democracy
  { dayNumber: 39, eventOrder: 1, title: "Athenian democracy established", year: -508, description: "Cleisthenes reforms" },
  { dayNumber: 39, eventOrder: 2, title: "Magna Carta signed", year: 1215, description: "Limiting royal power" },
  { dayNumber: 39, eventOrder: 3, title: "English Bill of Rights", year: 1689, description: "Parliamentary supremacy" },
  { dayNumber: 39, eventOrder: 4, title: "US Constitution ratified", year: 1788, description: "American democracy" },
  { dayNumber: 39, eventOrder: 5, title: "Universal Declaration of Human Rights", year: 1948, description: "UN adoption" },

  // Day 40 - Natural Disasters
  { dayNumber: 40, eventOrder: 1, title: "Vesuvius destroys Pompeii", year: 79, description: "Volcanic eruption" },
  { dayNumber: 40, eventOrder: 2, title: "Great Fire of London", year: 1666, description: "City destroyed" },
  { dayNumber: 40, eventOrder: 3, title: "San Francisco earthquake", year: 1906, description: "Devastating quake" },
  { dayNumber: 40, eventOrder: 4, title: "Krakatoa eruption", year: 1883, description: "Massive explosion" },
  { dayNumber: 40, eventOrder: 5, title: "Fukushima nuclear disaster", year: 2011, description: "Tsunami aftermath" },

  // Days 41-50 - Various Themes
  { dayNumber: 41, eventOrder: 1, title: "First printed book in Europe", year: 1455, description: "Gutenberg Bible" },
  { dayNumber: 41, eventOrder: 2, title: "First newspaper published", year: 1605, description: "Relation" },
  { dayNumber: 41, eventOrder: 3, title: "First encyclopedia published", year: 1751, description: "Encyclopédie" },
  { dayNumber: 41, eventOrder: 4, title: "First telegraph message sent", year: 1844, description: "Samuel Morse" },
  { dayNumber: 41, eventOrder: 5, title: "First radio broadcast", year: 1906, description: "Reginald Fessenden" },

  { dayNumber: 42, eventOrder: 1, title: "Construction of Stonehenge begins", year: -3000, description: "Prehistoric monument" },
  { dayNumber: 42, eventOrder: 2, title: "Parthenon completed", year: -432, description: "Greek temple" },
  { dayNumber: 42, eventOrder: 3, title: "Great Wall of China completed", year: -206, description: "Qin Dynasty" },
  { dayNumber: 42, eventOrder: 4, title: "Leaning Tower of Pisa construction begins", year: 1173, description: "Italian landmark" },
  { dayNumber: 42, eventOrder: 5, title: "Statue of Liberty dedicated", year: 1886, description: "American symbol" },

  { dayNumber: 43, eventOrder: 1, title: "First university founded", year: 859, description: "University of Karueein" },
  { dayNumber: 43, eventOrder: 2, title: "Oxford University founded", year: 1096, description: "English university" },
  { dayNumber: 43, eventOrder: 3, title: "Harvard University founded", year: 1636, description: "American university" },
  { dayNumber: 43, eventOrder: 4, title: "First public library in US", year: 1833, description: "Peterborough, NH" },
  { dayNumber: 43, eventOrder: 5, title: "Wikipedia launched", year: 2001, description: "Online encyclopedia" },

  { dayNumber: 44, eventOrder: 1, title: "First Olympic marathon", year: -490, description: "Legend of Pheidippides" },
  { dayNumber: 44, eventOrder: 2, title: "Modern Olympic Games begin", year: 1896, description: "Athens" },
  { dayNumber: 44, eventOrder: 3, title: "First FIFA World Cup", year: 1930, description: "Uruguay" },
  { dayNumber: 44, eventOrder: 4, title: "First televised Olympics", year: 1936, description: "Berlin" },
  { dayNumber: 44, eventOrder: 5, title: "First Winter Paralympics", year: 1976, description: "Sweden" },

  { dayNumber: 45, eventOrder: 1, title: "Tea introduced to Europe", year: 1610, description: "Dutch traders" },
  { dayNumber: 45, eventOrder: 2, title: "Coffee houses open in England", year: 1650, description: "Social gathering" },
  { dayNumber: 45, eventOrder: 3, title: "Coca-Cola invented", year: 1886, description: "John Pemberton" },
  { dayNumber: 45, eventOrder: 4, title: "First McDonald's opens", year: 1940, description: "Fast food" },
  { dayNumber: 45, eventOrder: 5, title: "First Starbucks opens", year: 1971, description: "Coffee chain" },

  { dayNumber: 46, eventOrder: 1, title: "Paper invented in China", year: 105, description: "Cai Lun" },
  { dayNumber: 46, eventOrder: 2, title: "Compass invented in China", year: 1040, description: "Navigation tool" },
  { dayNumber: 46, eventOrder: 3, title: "Gunpowder first used in weapons", year: 1132, description: "Chinese warfare" },
  { dayNumber: 46, eventOrder: 4, title: "Mechanical clock invented", year: 1300, description: "Medieval Europe" },
  { dayNumber: 46, eventOrder: 5, title: "Microscope invented", year: 1590, description: "Hans Lippershey" },

  { dayNumber: 47, eventOrder: 1, title: "Silk Road established", year: -130, description: "Trade route" },
  { dayNumber: 47, eventOrder: 2, title: "Viking raids begin", year: 793, description: "Lindisfarne" },
  { dayNumber: 47, eventOrder: 3, title: "Black Death arrives in Europe", year: 1347, description: "Pandemic" },
  { dayNumber: 47, eventOrder: 4, title: "Salem witch trials", year: 1692, description: "Mass hysteria" },
  { dayNumber: 47, eventOrder: 5, title: "Boston Tea Party", year: 1773, description: "American Revolution" },

  { dayNumber: 48, eventOrder: 1, title: "First heart surgery", year: 1893, description: "Daniel Hale Williams" },
  { dayNumber: 48, eventOrder: 2, title: "Blood types discovered", year: 1901, description: "Karl Landsteiner" },
  { dayNumber: 48, eventOrder: 3, title: "First antibiotic used", year: 1942, description: "Penicillin treatment" },
  { dayNumber: 48, eventOrder: 4, title: "Polio vaccine developed", year: 1955, description: "Jonas Salk" },
  { dayNumber: 48, eventOrder: 5, title: "First face transplant", year: 2005, description: "Partial face" },

  { dayNumber: 49, eventOrder: 1, title: "First zoo opens", year: -3500, description: "Egypt" },
  { dayNumber: 49, eventOrder: 2, title: "First aquarium opens", year: 1853, description: "London" },
  { dayNumber: 49, eventOrder: 3, title: "First national park established", year: 1872, description: "Yellowstone" },
  { dayNumber: 49, eventOrder: 4, title: "WWF founded", year: 1961, description: "Conservation organization" },
  { dayNumber: 49, eventOrder: 5, title: "Earth Summit", year: 1992, description: "Rio de Janeiro" },

  { dayNumber: 50, eventOrder: 1, title: "First play performed in ancient Greece", year: -534, description: "Theater begins" },
  { dayNumber: 50, eventOrder: 2, title: "Globe Theatre opens", year: 1599, description: "Shakespeare's theater" },
  { dayNumber: 50, eventOrder: 3, title: "First ballet performed", year: 1581, description: "French court" },
  { dayNumber: 50, eventOrder: 4, title: "First motion picture shown", year: 1895, description: "Lumière brothers" },
  { dayNumber: 50, eventOrder: 5, title: "First 3D movie released", year: 1952, description: "Bwana Devil" },

  // Continue with remaining days 51-100
  { dayNumber: 51, eventOrder: 1, title: "Birth of Confucius", year: -551, description: "Chinese philosopher" },
  { dayNumber: 51, eventOrder: 2, title: "Birth of Aristotle", year: -384, description: "Greek philosopher" },
  { dayNumber: 51, eventOrder: 3, title: "Birth of Isaac Newton", year: 1643, description: "Physicist" },
  { dayNumber: 51, eventOrder: 4, title: "Birth of Albert Einstein", year: 1879, description: "Physicist" },
  { dayNumber: 51, eventOrder: 5, title: "Birth of Stephen Hawking", year: 1942, description: "Physicist" },

  { dayNumber: 52, eventOrder: 1, title: "First horse domesticated", year: -4000, description: "Central Asia" },
  { dayNumber: 52, eventOrder: 2, title: "First dog show", year: 1859, description: "Newcastle, England" },
  { dayNumber: 52, eventOrder: 3, title: "First animal sent to space", year: 1947, description: "Fruit flies" },
  { dayNumber: 52, eventOrder: 4, title: "First animal cloned", year: 1996, description: "Dolly the sheep" },
  { dayNumber: 52, eventOrder: 5, title: "First pig-to-human heart transplant", year: 2022, description: "Medical breakthrough" },

  { dayNumber: 53, eventOrder: 1, title: "First recorded solar eclipse", year: -2137, description: "China" },
  { dayNumber: 53, eventOrder: 2, title: "Halley's Comet predicted", year: 1705, description: "Edmund Halley" },
  { dayNumber: 53, eventOrder: 3, title: "Neptune discovered", year: 1846, description: "Mathematical prediction" },
  { dayNumber: 53, eventOrder: 4, title: "Pluto discovered", year: 1930, description: "Clyde Tombaugh" },
  { dayNumber: 53, eventOrder: 5, title: "First exoplanet confirmed", year: 1992, description: "Orbiting pulsar" },

  { dayNumber: 54, eventOrder: 1, title: "First use of zero in mathematics", year: 628, description: "Brahmagupta" },
  { dayNumber: 54, eventOrder: 2, title: "Fibonacci introduces Arabic numerals to Europe", year: 1202, description: "Liber Abaci" },
  { dayNumber: 54, eventOrder: 3, title: "Calculus developed", year: 1665, description: "Newton and Leibniz" },
  { dayNumber: 54, eventOrder: 4, title: "Non-Euclidean geometry developed", year: 1830, description: "New mathematics" },
  { dayNumber: 54, eventOrder: 5, title: "Proof of Fermat's Last Theorem", year: 1995, description: "Andrew Wiles" },

  { dayNumber: 55, eventOrder: 1, title: "First dictionary compiled", year: -300, description: "Chinese dictionary" },
  { dayNumber: 55, eventOrder: 2, title: "First English dictionary", year: 1604, description: "Robert Cawdrey" },
  { dayNumber: 55, eventOrder: 3, title: "Johnson's Dictionary published", year: 1755, description: "Samuel Johnson" },
  { dayNumber: 55, eventOrder: 4, title: "Oxford English Dictionary begins", year: 1857, description: "Major project" },
  { dayNumber: 55, eventOrder: 5, title: "First emoji created", year: 1999, description: "Japanese phones" },

  { dayNumber: 56, eventOrder: 1, title: "First recorded game of chess", year: 600, description: "India" },
  { dayNumber: 56, eventOrder: 2, title: "Playing cards introduced to Europe", year: 1370, description: "From Egypt" },
  { dayNumber: 56, eventOrder: 3, title: "First crossword puzzle published", year: 1913, description: "New York World" },
  { dayNumber: 56, eventOrder: 4, title: "Scrabble invented", year: 1938, description: "Alfred Butts" },
  { dayNumber: 56, eventOrder: 5, title: "First video game", year: 1958, description: "Tennis for Two" },

  { dayNumber: 57, eventOrder: 1, title: "First calendar created", year: -4241, description: "Egyptian calendar" },
  { dayNumber: 57, eventOrder: 2, title: "Julian calendar introduced", year: -46, description: "Julius Caesar" },
  { dayNumber: 57, eventOrder: 3, title: "Gregorian calendar introduced", year: 1582, description: "Pope Gregory XIII" },
  { dayNumber: 57, eventOrder: 4, title: "International Date Line established", year: 1884, description: "Prime Meridian Conference" },
  { dayNumber: 57, eventOrder: 5, title: "Atomic clock developed", year: 1955, description: "Precise timekeeping" },

  { dayNumber: 58, eventOrder: 1, title: "First maps created", year: -6200, description: "Çatalhöyük" },
  { dayNumber: 58, eventOrder: 2, title: "Ptolemy's world map", year: 150, description: "Ancient geography" },
  { dayNumber: 58, eventOrder: 3, title: "Mercator projection invented", year: 1569, description: "Navigation maps" },
  { dayNumber: 58, eventOrder: 4, title: "First aerial photograph", year: 1858, description: "From balloon" },
  { dayNumber: 58, eventOrder: 5, title: "Google Maps launched", year: 2005, description: "Digital mapping" },

  { dayNumber: 59, eventOrder: 1, title: "First coins minted", year: -600, description: "Lydia" },
  { dayNumber: 59, eventOrder: 2, title: "First paper money", year: 1024, description: "Song Dynasty China" },
  { dayNumber: 59, eventOrder: 3, title: "First stock exchange", year: 1602, description: "Amsterdam" },
  { dayNumber: 59, eventOrder: 4, title: "First ATM installed", year: 1967, description: "London" },
  { dayNumber: 59, eventOrder: 5, title: "First cryptocurrency transaction", year: 2010, description: "Bitcoin pizza" },

  { dayNumber: 60, eventOrder: 1, title: "Silk production begins in China", year: -2700, description: "Ancient textile" },
  { dayNumber: 60, eventOrder: 2, title: "Cotton gin invented", year: 1793, description: "Eli Whitney" },
  { dayNumber: 60, eventOrder: 3, title: "Sewing machine patented", year: 1846, description: "Elias Howe" },
  { dayNumber: 60, eventOrder: 4, title: "First synthetic fiber created", year: 1935, description: "Nylon" },
  { dayNumber: 60, eventOrder: 5, title: "Fast fashion emerges", year: 1990, description: "Zara, H&M growth" },

  // Continue with days 61-80
  { dayNumber: 61, eventOrder: 1, title: "First recorded use of makeup", year: -4000, description: "Ancient Egypt" },
  { dayNumber: 61, eventOrder: 2, title: "First perfume made", year: -3000, description: "Mesopotamia" },
  { dayNumber: 61, eventOrder: 3, title: "First toothpaste created", year: -500, description: "Ancient China" },
  { dayNumber: 61, eventOrder: 4, title: "First commercial deodorant", year: 1888, description: "Mum" },
  { dayNumber: 61, eventOrder: 5, title: "First sunscreen developed", year: 1936, description: "L'Oréal" },

  { dayNumber: 62, eventOrder: 1, title: "First recorded eclipse prediction", year: -585, description: "Thales" },
  { dayNumber: 62, eventOrder: 2, title: "Earth's circumference calculated", year: -240, description: "Eratosthenes" },
  { dayNumber: 62, eventOrder: 3, title: "Speed of light measured", year: 1676, description: "Ole Rømer" },
  { dayNumber: 62, eventOrder: 4, title: "Age of Earth determined", year: 1956, description: "4.5 billion years" },
  { dayNumber: 62, eventOrder: 5, title: "Gravitational waves detected", year: 2015, description: "LIGO" },

  { dayNumber: 63, eventOrder: 1, title: "First permanent settlement in Americas", year: -14000, description: "Ice Age migration" },
  { dayNumber: 63, eventOrder: 2, title: "Jamestown founded", year: 1607, description: "English colony" },
  { dayNumber: 63, eventOrder: 3, title: "Mayflower lands", year: 1620, description: "Plymouth Colony" },
  { dayNumber: 63, eventOrder: 4, title: "Ellis Island opens", year: 1892, description: "Immigration station" },
  { dayNumber: 63, eventOrder: 5, title: "US closes borders due to COVID", year: 2020, description: "Pandemic response" },

  { dayNumber: 64, eventOrder: 1, title: "First Olympic Games", year: -776, description: "Ancient Greece" },
  { dayNumber: 64, eventOrder: 2, title: "Gladiatorial games begin", year: -264, description: "Rome" },
  { dayNumber: 64, eventOrder: 3, title: "First tennis championship", year: 1877, description: "Wimbledon" },
  { dayNumber: 64, eventOrder: 4, title: "First NBA game", year: 1946, description: "Basketball" },
  { dayNumber: 64, eventOrder: 5, title: "First esports tournament", year: 1972, description: "Spacewar" },

  { dayNumber: 65, eventOrder: 1, title: "Iron Age begins", year: -1200, description: "New metal technology" },
  { dayNumber: 65, eventOrder: 2, title: "Steel production method developed", year: 1856, description: "Bessemer process" },
  { dayNumber: 65, eventOrder: 3, title: "Aluminum mass production", year: 1886, description: "Hall-Héroult process" },
  { dayNumber: 65, eventOrder: 4, title: "Plastic invented", year: 1907, description: "Bakelite" },
  { dayNumber: 65, eventOrder: 5, title: "Carbon fiber developed", year: 1958, description: "Advanced materials" },

  { dayNumber: 66, eventOrder: 1, title: "First glass made", year: -3500, description: "Ancient Egypt" },
  { dayNumber: 66, eventOrder: 2, title: "First mirrors made", year: -6000, description: "Polished stone" },
  { dayNumber: 66, eventOrder: 3, title: "Eyeglasses invented", year: 1286, description: "Italy" },
  { dayNumber: 66, eventOrder: 4, title: "Telescope invented", year: 1608, description: "Hans Lippershey" },
  { dayNumber: 66, eventOrder: 5, title: "Contact lenses invented", year: 1887, description: "Adolf Fick" },

  { dayNumber: 67, eventOrder: 1, title: "First bridge built", year: -4000, description: "Ancient times" },
  { dayNumber: 67, eventOrder: 2, title: "First aqueduct built", year: -691, description: "Assyria" },
  { dayNumber: 67, eventOrder: 3, title: "Panama Canal opens", year: 1914, description: "Shipping route" },
  { dayNumber: 67, eventOrder: 4, title: "Golden Gate Bridge opens", year: 1937, description: "San Francisco" },
  { dayNumber: 67, eventOrder: 5, title: "Channel Tunnel opens", year: 1994, description: "UK-France" },

  { dayNumber: 68, eventOrder: 1, title: "First musical notation", year: -2000, description: "Ancient systems" },
  { dayNumber: 68, eventOrder: 2, title: "Piano invented", year: 1700, description: "Bartolomeo Cristofori" },
  { dayNumber: 68, eventOrder: 3, title: "Phonograph invented", year: 1877, description: "Thomas Edison" },
  { dayNumber: 68, eventOrder: 4, title: "Electric guitar invented", year: 1931, description: "Rickenbacker" },
  { dayNumber: 68, eventOrder: 5, title: "MP3 format developed", year: 1993, description: "Digital audio" },

  { dayNumber: 69, eventOrder: 1, title: "First postal system", year: -550, description: "Persian Empire" },
  { dayNumber: 69, eventOrder: 2, title: "First postage stamp", year: 1840, description: "Penny Black" },
  { dayNumber: 69, eventOrder: 3, title: "First email sent", year: 1971, description: "Ray Tomlinson" },
  { dayNumber: 69, eventOrder: 4, title: "First text message sent", year: 1992, description: "SMS" },
  { dayNumber: 69, eventOrder: 5, title: "WhatsApp launched", year: 2009, description: "Messaging app" },

  { dayNumber: 70, eventOrder: 1, title: "First ice cream made", year: -500, description: "Persian Empire" },
  { dayNumber: 70, eventOrder: 2, title: "Chocolate introduced to Europe", year: 1528, description: "From Americas" },
  { dayNumber: 70, eventOrder: 3, title: "First potato chips made", year: 1853, description: "Saratoga Springs" },
  { dayNumber: 70, eventOrder: 4, title: "Instant noodles invented", year: 1958, description: "Momofuku Ando" },
  { dayNumber: 70, eventOrder: 5, title: "First lab-grown burger", year: 2013, description: "Cultured meat" },

  // Days 71-80
  { dayNumber: 71, eventOrder: 1, title: "First lighthouse built", year: -280, description: "Pharos of Alexandria" },
  { dayNumber: 71, eventOrder: 2, title: "First canals built for transportation", year: -510, description: "Persia" },
  { dayNumber: 71, eventOrder: 3, title: "First traffic light installed", year: 1868, description: "London" },
  { dayNumber: 71, eventOrder: 4, title: "First commercial airplane flight", year: 1914, description: "St. Petersburg-Tampa" },
  { dayNumber: 71, eventOrder: 5, title: "First self-driving car test", year: 2009, description: "Google" },

  { dayNumber: 72, eventOrder: 1, title: "First recorded beer brewing", year: -3400, description: "Mesopotamia" },
  { dayNumber: 72, eventOrder: 2, title: "Wine cultivation begins", year: -6000, description: "Georgia" },
  { dayNumber: 72, eventOrder: 3, title: "Champagne invented", year: 1693, description: "Dom Pérignon" },
  { dayNumber: 72, eventOrder: 4, title: "Prohibition begins in US", year: 1920, description: "18th Amendment" },
  { dayNumber: 72, eventOrder: 5, title: "Craft beer revolution", year: 1980, description: "Microbreweries" },

  { dayNumber: 73, eventOrder: 1, title: "First recorded insurance", year: -1750, description: "Hammurabi's Code" },
  { dayNumber: 73, eventOrder: 2, title: "Lloyd's of London founded", year: 1688, description: "Insurance market" },
  { dayNumber: 73, eventOrder: 3, title: "Social Security established", year: 1935, description: "US welfare" },
  { dayNumber: 73, eventOrder: 4, title: "Medicare established", year: 1965, description: "US healthcare" },
  { dayNumber: 73, eventOrder: 5, title: "Affordable Care Act signed", year: 2010, description: "Obamacare" },

  { dayNumber: 74, eventOrder: 1, title: "First census taken", year: -3800, description: "Babylonia" },
  { dayNumber: 74, eventOrder: 2, title: "Domesday Book compiled", year: 1086, description: "England survey" },
  { dayNumber: 74, eventOrder: 3, title: "First US Census", year: 1790, description: "Population count" },
  { dayNumber: 74, eventOrder: 4, title: "First electronic census", year: 1890, description: "Hollerith machines" },
  { dayNumber: 74, eventOrder: 5, title: "World population reaches 8 billion", year: 2022, description: "Population milestone" },

  { dayNumber: 75, eventOrder: 1, title: "First known war recorded", year: -2700, description: "Sumer vs Elam" },
  { dayNumber: 75, eventOrder: 2, title: "Geneva Convention first signed", year: 1864, description: "Laws of war" },
  { dayNumber: 75, eventOrder: 3, title: "League of Nations formed", year: 1920, description: "International body" },
  { dayNumber: 75, eventOrder: 4, title: "NATO founded", year: 1949, description: "Military alliance" },
  { dayNumber: 75, eventOrder: 5, title: "International Criminal Court established", year: 2002, description: "War crimes tribunal" },

  { dayNumber: 76, eventOrder: 1, title: "First written laws", year: -2100, description: "Code of Ur-Nammu" },
  { dayNumber: 76, eventOrder: 2, title: "Roman law codified", year: 529, description: "Justinian Code" },
  { dayNumber: 76, eventOrder: 3, title: "Habeas corpus established", year: 1679, description: "English law" },
  { dayNumber: 76, eventOrder: 4, title: "First Supreme Court session", year: 1790, description: "US judiciary" },
  { dayNumber: 76, eventOrder: 5, title: "International Court of Justice established", year: 1945, description: "UN court" },

  { dayNumber: 77, eventOrder: 1, title: "First recorded epidemic", year: -430, description: "Athens plague" },
  { dayNumber: 77, eventOrder: 2, title: "Black Death peaks", year: 1347, description: "Bubonic plague" },
  { dayNumber: 77, eventOrder: 3, title: "Spanish Flu pandemic", year: 1918, description: "50 million deaths" },
  { dayNumber: 77, eventOrder: 4, title: "AIDS identified", year: 1981, description: "HIV epidemic" },
  { dayNumber: 77, eventOrder: 5, title: "COVID-19 pandemic declared", year: 2020, description: "Global health crisis" },

  { dayNumber: 78, eventOrder: 1, title: "First school established", year: -2000, description: "Sumerian schools" },
  { dayNumber: 78, eventOrder: 2, title: "First public school in US", year: 1635, description: "Boston Latin" },
  { dayNumber: 78, eventOrder: 3, title: "Kindergarten invented", year: 1837, description: "Friedrich Fröbel" },
  { dayNumber: 78, eventOrder: 4, title: "GI Bill passed", year: 1944, description: "Education benefits" },
  { dayNumber: 78, eventOrder: 5, title: "First MOOC launched", year: 2008, description: "Online education" },

  { dayNumber: 79, eventOrder: 1, title: "First theater built", year: -534, description: "Ancient Greece" },
  { dayNumber: 79, eventOrder: 2, title: "First opera performed", year: 1597, description: "Dafne" },
  { dayNumber: 79, eventOrder: 3, title: "First movie theater opens", year: 1895, description: "Paris" },
  { dayNumber: 79, eventOrder: 4, title: "First drive-in theater", year: 1933, description: "New Jersey" },
  { dayNumber: 79, eventOrder: 5, title: "Netflix streaming launches", year: 2007, description: "Streaming era" },

  { dayNumber: 80, eventOrder: 1, title: "First written recipe", year: -1750, description: "Babylonian tablets" },
  { dayNumber: 80, eventOrder: 2, title: "First cookbook printed", year: 1485, description: "De honesta voluptate" },
  { dayNumber: 80, eventOrder: 3, title: "First restaurant opens", year: 1765, description: "Paris" },
  { dayNumber: 80, eventOrder: 4, title: "First TV cooking show", year: 1946, description: "BBC" },
  { dayNumber: 80, eventOrder: 5, title: "First food delivery app", year: 2004, description: "Grubhub" },

  // Days 81-100
  { dayNumber: 81, eventOrder: 1, title: "Slavery practiced in Mesopotamia", year: -3500, description: "Ancient practice" },
  { dayNumber: 81, eventOrder: 2, title: "Transatlantic slave trade begins", year: 1526, description: "Americas" },
  { dayNumber: 81, eventOrder: 3, title: "British abolish slavery", year: 1833, description: "Empire-wide" },
  { dayNumber: 81, eventOrder: 4, title: "US abolishes slavery", year: 1865, description: "13th Amendment" },
  { dayNumber: 81, eventOrder: 5, title: "Universal Declaration of Human Rights", year: 1948, description: "UN adoption" },

  { dayNumber: 82, eventOrder: 1, title: "First coinage", year: -600, description: "Lydia" },
  { dayNumber: 82, eventOrder: 2, title: "First paper money", year: 1024, description: "China" },
  { dayNumber: 82, eventOrder: 3, title: "First credit card", year: 1950, description: "Diners Club" },
  { dayNumber: 82, eventOrder: 4, title: "First online banking", year: 1994, description: "Stanford FCU" },
  { dayNumber: 82, eventOrder: 5, title: "Apple Pay launched", year: 2014, description: "Mobile payments" },

  { dayNumber: 83, eventOrder: 1, title: "Fire first controlled by humans", year: -1000000, description: "Early hominids" },
  { dayNumber: 83, eventOrder: 2, title: "First candles made", year: -3000, description: "Ancient Egypt" },
  { dayNumber: 83, eventOrder: 3, title: "Gas lighting introduced", year: 1792, description: "William Murdoch" },
  { dayNumber: 83, eventOrder: 4, title: "Electric lighting invented", year: 1879, description: "Edison" },
  { dayNumber: 83, eventOrder: 5, title: "LED lighting becomes standard", year: 2010, description: "Energy efficient" },

  { dayNumber: 84, eventOrder: 1, title: "First zoo created", year: -3500, description: "Egypt" },
  { dayNumber: 84, eventOrder: 2, title: "First modern zoo", year: 1752, description: "Vienna" },
  { dayNumber: 84, eventOrder: 3, title: "First wildlife conservation law", year: 1900, description: "Lacey Act" },
  { dayNumber: 84, eventOrder: 4, title: "WWF founded", year: 1961, description: "Conservation" },
  { dayNumber: 84, eventOrder: 5, title: "Paris Climate Agreement", year: 2015, description: "Climate action" },

  { dayNumber: 85, eventOrder: 1, title: "First recorded surgery", year: -2750, description: "Ancient Egypt" },
  { dayNumber: 85, eventOrder: 2, title: "First anatomy textbook", year: 1543, description: "Vesalius" },
  { dayNumber: 85, eventOrder: 3, title: "Anesthesia first used", year: 1846, description: "Surgery revolution" },
  { dayNumber: 85, eventOrder: 4, title: "First organ transplant", year: 1954, description: "Kidney" },
  { dayNumber: 85, eventOrder: 5, title: "First robotic surgery", year: 2000, description: "da Vinci system" },

  { dayNumber: 86, eventOrder: 1, title: "First recorded marathon", year: -490, description: "Pheidippides legend" },
  { dayNumber: 86, eventOrder: 2, title: "First modern marathon", year: 1896, description: "Olympics" },
  { dayNumber: 86, eventOrder: 3, title: "First Boston Marathon", year: 1897, description: "US tradition" },
  { dayNumber: 86, eventOrder: 4, title: "First woman runs marathon officially", year: 1967, description: "Kathrine Switzer" },
  { dayNumber: 86, eventOrder: 5, title: "Sub-2-hour marathon achieved", year: 2019, description: "Eliud Kipchoge" },

  { dayNumber: 87, eventOrder: 1, title: "First elections held", year: -508, description: "Athens" },
  { dayNumber: 87, eventOrder: 2, title: "First secret ballot", year: 1856, description: "Australia" },
  { dayNumber: 87, eventOrder: 3, title: "First woman elected to parliament", year: 1907, description: "Finland" },
  { dayNumber: 87, eventOrder: 4, title: "First Black president of US", year: 2008, description: "Barack Obama" },
  { dayNumber: 87, eventOrder: 5, title: "First woman VP of US", year: 2021, description: "Kamala Harris" },

  { dayNumber: 88, eventOrder: 1, title: "First recorded earthquake", year: -1831, description: "China" },
  { dayNumber: 88, eventOrder: 2, title: "First seismograph", year: 132, description: "Zhang Heng" },
  { dayNumber: 88, eventOrder: 3, title: "Richter scale developed", year: 1935, description: "Earthquake measurement" },
  { dayNumber: 88, eventOrder: 4, title: "Theory of plate tectonics", year: 1968, description: "Earth science" },
  { dayNumber: 88, eventOrder: 5, title: "First earthquake early warning system", year: 2007, description: "Japan" },

  { dayNumber: 89, eventOrder: 1, title: "First money lending recorded", year: -3000, description: "Sumeria" },
  { dayNumber: 89, eventOrder: 2, title: "First bank established", year: 1472, description: "Monte dei Paschi" },
  { dayNumber: 89, eventOrder: 3, title: "First central bank", year: 1668, description: "Sweden" },
  { dayNumber: 89, eventOrder: 4, title: "First credit union", year: 1852, description: "Germany" },
  { dayNumber: 89, eventOrder: 5, title: "First crowdfunding platform", year: 2009, description: "Kickstarter" },

  { dayNumber: 90, eventOrder: 1, title: "First road built", year: -4000, description: "Mesopotamia" },
  { dayNumber: 90, eventOrder: 2, title: "Roman roads network", year: -312, description: "Via Appia" },
  { dayNumber: 90, eventOrder: 3, title: "First paved road in US", year: 1870, description: "Newark" },
  { dayNumber: 90, eventOrder: 4, title: "First highway built", year: 1921, description: "Germany" },
  { dayNumber: 90, eventOrder: 5, title: "Interstate Highway System", year: 1956, description: "US infrastructure" },

  { dayNumber: 91, eventOrder: 1, title: "First recorded flood", year: -2900, description: "Mesopotamian flood myth" },
  { dayNumber: 91, eventOrder: 2, title: "First dam built", year: -3000, description: "Ancient Jordan" },
  { dayNumber: 91, eventOrder: 3, title: "Hoover Dam completed", year: 1936, description: "US megaproject" },
  { dayNumber: 91, eventOrder: 4, title: "Three Gorges Dam completed", year: 2006, description: "World's largest" },
  { dayNumber: 91, eventOrder: 5, title: "First tidal power station", year: 2011, description: "South Korea" },

  { dayNumber: 92, eventOrder: 1, title: "First astronomical observations", year: -3000, description: "Babylon" },
  { dayNumber: 92, eventOrder: 2, title: "First reflecting telescope", year: 1668, description: "Newton" },
  { dayNumber: 92, eventOrder: 3, title: "First radio telescope", year: 1937, description: "Grote Reber" },
  { dayNumber: 92, eventOrder: 4, title: "Hubble launched", year: 1990, description: "Space telescope" },
  { dayNumber: 92, eventOrder: 5, title: "James Webb Telescope launched", year: 2021, description: "Deep space" },

  { dayNumber: 93, eventOrder: 1, title: "First trade routes established", year: -4000, description: "Mesopotamia" },
  { dayNumber: 93, eventOrder: 2, title: "Silk Road established", year: -130, description: "China to Rome" },
  { dayNumber: 93, eventOrder: 3, title: "East India Company founded", year: 1600, description: "British trade" },
  { dayNumber: 93, eventOrder: 4, title: "World Trade Organization founded", year: 1995, description: "Global trade" },
  { dayNumber: 93, eventOrder: 5, title: "Amazon becomes largest retailer", year: 2019, description: "E-commerce" },

  { dayNumber: 94, eventOrder: 1, title: "First use of money", year: -9000, description: "Barter to coins" },
  { dayNumber: 94, eventOrder: 2, title: "First stock market crash", year: 1637, description: "Tulip mania" },
  { dayNumber: 94, eventOrder: 3, title: "Great Depression begins", year: 1929, description: "Economic crisis" },
  { dayNumber: 94, eventOrder: 4, title: "2008 Financial Crisis", year: 2008, description: "Global recession" },
  { dayNumber: 94, eventOrder: 5, title: "COVID economic shutdown", year: 2020, description: "Pandemic impact" },

  { dayNumber: 95, eventOrder: 1, title: "First recorded comet sighting", year: -1059, description: "China" },
  { dayNumber: 95, eventOrder: 2, title: "Halley's Comet return predicted", year: 1705, description: "Edmund Halley" },
  { dayNumber: 95, eventOrder: 3, title: "First asteroid discovered", year: 1801, description: "Ceres" },
  { dayNumber: 95, eventOrder: 4, title: "First meteor impact confirmed", year: 1908, description: "Tunguska" },
  { dayNumber: 95, eventOrder: 5, title: "First spacecraft lands on comet", year: 2014, description: "Philae" },

  { dayNumber: 96, eventOrder: 1, title: "First clock invented", year: -1500, description: "Sundial" },
  { dayNumber: 96, eventOrder: 2, title: "First mechanical clock", year: 1300, description: "Europe" },
  { dayNumber: 96, eventOrder: 3, title: "First pocket watch", year: 1510, description: "Peter Henlein" },
  { dayNumber: 96, eventOrder: 4, title: "First quartz watch", year: 1969, description: "Seiko" },
  { dayNumber: 96, eventOrder: 5, title: "First smartwatch", year: 2015, description: "Apple Watch" },

  { dayNumber: 97, eventOrder: 1, title: "First pottery made", year: -29000, description: "Czechia" },
  { dayNumber: 97, eventOrder: 2, title: "First porcelain made", year: 620, description: "China" },
  { dayNumber: 97, eventOrder: 3, title: "Industrial pottery begins", year: 1759, description: "Wedgwood" },
  { dayNumber: 97, eventOrder: 4, title: "First plastic products", year: 1907, description: "Bakelite" },
  { dayNumber: 97, eventOrder: 5, title: "3D printing invented", year: 1984, description: "Chuck Hull" },

  { dayNumber: 98, eventOrder: 1, title: "First tattoos", year: -5300, description: "Ötzi the Iceman" },
  { dayNumber: 98, eventOrder: 2, title: "First cosmetic surgery", year: -600, description: "India" },
  { dayNumber: 98, eventOrder: 3, title: "First modern plastic surgery", year: 1917, description: "WWI reconstruction" },
  { dayNumber: 98, eventOrder: 4, title: "First face transplant", year: 2005, description: "France" },
  { dayNumber: 98, eventOrder: 5, title: "First 3D-printed organ transplant", year: 2022, description: "Ear" },

  { dayNumber: 99, eventOrder: 1, title: "First democracy", year: -508, description: "Athens" },
  { dayNumber: 99, eventOrder: 2, title: "First republic", year: -509, description: "Rome" },
  { dayNumber: 99, eventOrder: 3, title: "First constitutional monarchy", year: 1215, description: "England" },
  { dayNumber: 99, eventOrder: 4, title: "First modern democracy", year: 1776, description: "United States" },
  { dayNumber: 99, eventOrder: 5, title: "First online voting in national election", year: 2007, description: "Estonia" },

  { dayNumber: 100, eventOrder: 1, title: "First humans leave Africa", year: -70000, description: "Migration" },
  { dayNumber: 100, eventOrder: 2, title: "First cities built", year: -4000, description: "Mesopotamia" },
  { dayNumber: 100, eventOrder: 3, title: "First industrial city", year: 1760, description: "Manchester" },
  { dayNumber: 100, eventOrder: 4, title: "First megacity (10M+)", year: 1950, description: "New York" },
  { dayNumber: 100, eventOrder: 5, title: "World becomes majority urban", year: 2007, description: "Urbanization" },
];

async function main() {
  console.log('Seeding database...');

  // Clear existing data
  await prisma.gameResult.deleteMany();
  await prisma.timelineEvent.deleteMany();
  await prisma.moreOrLessQuestion.deleteMany();

  console.log('Cleared existing game data');

  // Seed More or Less questions
  for (const question of moreOrLessQuestions) {
    await prisma.moreOrLessQuestion.create({
      data: question,
    });
  }
  console.log(`Seeded ${moreOrLessQuestions.length} More or Less questions`);

  // Seed Timeline events
  for (const event of timelineEvents) {
    await prisma.timelineEvent.create({
      data: event,
    });
  }
  console.log(`Seeded ${timelineEvents.length} Timeline events`);

  console.log('Database seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
