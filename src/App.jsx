import React, { useState, useCallback, useEffect, useRef } from "react";

const BOOKS = [
  "The Labors of Hercules Beal",
  "Coyote Lost and Found",
  "El Deafo",
  "Swim Team",
  "Dogtown",
  "The One and Only Ivan",
];

const BOOK_ICONS = {
  "The Labors of Hercules Beal": "⚡",
  "Coyote Lost and Found": "🌵",
  "El Deafo": "🦸",
  "Swim Team": "🏊",
  "Dogtown": "🐾",
  "The One and Only Ivan": "🦍",
};

const BOOK_COLORS = {
  "The Labors of Hercules Beal":  { bg:"#0f2744", accent:"#f4a820", badge:"#1e3f6e" },
  "Coyote Lost and Found":        { bg:"#2b1506", accent:"#e07b30", badge:"#4a2510" },
  "El Deafo":                     { bg:"#1e0635", accent:"#b06be0", badge:"#3d1060" },
  "Swim Team":                    { bg:"#00253c", accent:"#00c4e8", badge:"#00445c" },
  "Dogtown":                      { bg:"#172808", accent:"#6ec940", badge:"#2a4a0f" },
  "The One and Only Ivan":        { bg:"#2b1700", accent:"#e09c20", badge:"#4a2c00" },
};

// Every wrong answer is a real detail from the book — just the wrong one.
// Correct answer is always index 0 before shuffling.

const ALL_QUESTIONS = [

  // ══════════════════════════════════════════════════════
  // THE LABORS OF HERCULES BEAL
  // ══════════════════════════════════════════════════════
  { id:1, book:"The Labors of Hercules Beal",
    q:"Why does Hercules dislike his own name?",
    choices:[
      "He has always been small, but the mythical Hercules was famous for being enormously strong",
      "His classmates at the Academy make fun of how difficult it is to pronounce",
      "His brother Achilles uses it sarcastically whenever Hercules struggles with farm work",
      "He was named after his great-great-uncle Elijah's nickname, not the Greek hero",
    ], answer:0 },

  { id:2, book:"The Labors of Hercules Beal",
    q:"What school does Hercules attend for seventh grade?",
    choices:[
      "Cape Cod Academy for Environmental Sciences",
      "Truro Middle School",
      "Cape Cod Academy for Classical Studies",
      "Provincetown School of Science and Nature",
    ], answer:0 },

  { id:3, book:"The Labors of Hercules Beal",
    q:"How did Hercules get his dog Mindy?",
    choices:[
      "A stray dog ran between them when Achilles was about to swat Hercules with a towel, and Hercules adopted her",
      "Achilles bought her as a comfort gift after their parents died",
      "Mindy wandered onto the farm and started greeting customers",
      "A neighbor moved away and left Mindy with the Beals",
    ], answer:0 },

  { id:4, book:"The Labors of Hercules Beal",
    q:"What do Hercules and Mindy do every single morning?",
    choices:[
      "Walk to the Dune to watch the sunrise, where Hercules says good morning to his parents",
      "Walk the boundary of Beal Brothers Farm and Nursery before customers arrive",
      "Run to the beach and back as training before Hercules goes to school",
      "Sit on the front porch while Achilles reads the weather report aloud",
    ], answer:0 },

  { id:5, book:"The Labors of Hercules Beal",
    q:"Which two magazines did Achilles write for before moving home?",
    choices:[
      "Smithsonian Magazine and National Geographic",
      "National Geographic and Time",
      "The Atlantic and Smithsonian Magazine",
      "Audubon and National Geographic",
    ], answer:0 },

  { id:6, book:"The Labors of Hercules Beal",
    q:"What does Lieutenant Colonel Hupfer assign Hercules for his year-long project?",
    choices:[
      "Perform modern-day versions of the mythical Hercules's 12 labors and write reflections on each",
      "Write a graphic novel retelling of The Odyssey set on Cape Cod",
      "Create detailed maps of the ancient Greek world and connect them to modern geography",
      "Memorize and recite all 12 labors of Hercules in order for the class",
    ], answer:0 },

  { id:7, book:"The Labors of Hercules Beal",
    q:"What does Lieutenant Colonel Hupfer whisper to Hercules — and only Hercules — after assigning the final labor?",
    choices:[
      "\"But I think you already know that.\"",
      "\"The last labor is the one that will change you most.\"",
      "\"Don't let the others see how hard this one will be.\"",
      "\"Your parents would be proud of who you're becoming.\"",
    ], answer:0 },

  { id:8, book:"The Labors of Hercules Beal",
    q:"What school does Hercules's best friend Elly attend?",
    choices:[
      "Truro Middle School",
      "Cape Cod Academy for Environmental Sciences, same as Hercules",
      "A private school in Wellfleet",
      "She is currently living in Ohio with her separated parents",
    ], answer:0 },

  { id:9, book:"The Labors of Hercules Beal",
    q:"What does Hercules find remarkable about the Academy building on orientation day?",
    choices:[
      "The lobby has mynah birds; hallways have fish tanks and reptile cages; the center has a glass-roofed arboretum",
      "Every classroom opens to a private outdoor lab space facing the ocean",
      "The school has a working greenhouse where students grow food served at lunch",
      "The building itself was constructed entirely from reclaimed Cape Cod driftwood",
    ], answer:0 },

  { id:10, book:"The Labors of Hercules Beal",
    q:"What real event becomes Hercules's version of the first labor — capturing the Nemean Lion?",
    choices:[
      "A one-eyed feral cat lures them to an abandoned house where a whole pack of cats ambushes them",
      "A coyote repeatedly threatens Mindy on the Dune at dawn",
      "A raccoon invades the Nursery greenhouse and has to be driven out",
      "Lieutenant Colonel Hupfer challenges the class to a strength and endurance test",
    ], answer:0 },

  { id:11, book:"The Labors of Hercules Beal",
    q:"What advice does neighbor Mrs. Savage give Hercules early in the book?",
    choices:[
      "Look at things in the right light",
      "Hard work is the only real cure for grief",
      "A good neighbor is more valuable than any family heirloom",
      "The most beautiful things are always the ones right in front of you",
    ], answer:0 },

  { id:12, book:"The Labors of Hercules Beal",
    q:"What do Henry, Elly, and Hercules do for the third labor, and what irony follows?",
    choices:[
      "They paint every leaf on a tree yellow to attract tourists; fog makes the paint drip and they get community service, but the tree naturally turns gold the very next day",
      "They plant 30 native trees in one weekend; a storm destroys them, but they grow back twice as strong",
      "They spray-paint the Dune path gold; they get in trouble, but the path stays beautiful all fall",
      "They hang streamers from the Academy arboretum; they get assigned detention, but it inspires a school tradition",
    ], answer:0 },

  { id:13, book:"The Labors of Hercules Beal",
    q:"Who does Hercules ask for help emptying the Academy building before the second storm hits?",
    choices:[
      "Mrs. Bontemps, who assembles an army of retired teachers",
      "Mr. Moby, who brings his bus and loading equipment",
      "Viola, who organizes a neighborhood volunteer effort",
      "Lieutenant Colonel Hupfer, who calls in military contacts",
    ], answer:0 },

  { id:14, book:"The Labors of Hercules Beal",
    q:"What does Hercules run back inside the damaged Academy to retrieve during the storm evacuation?",
    choices:[
      "Lieutenant Colonel Hupfer's military medals",
      "His own mythology project reflections notebook",
      "The class's copy of Edith Hamilton's Mythology",
      "Mindy, who followed him to school that morning",
    ], answer:0 },

  { id:15, book:"The Labors of Hercules Beal",
    q:"What does Ty Malcolm call Hercules, leading to a physical fight?",
    choices:[
      "An orphan",
      "A mama's boy",
      "A crybaby",
      "A charity case",
    ], answer:0 },

  { id:16, book:"The Labors of Hercules Beal",
    q:"What does Hercules do on Christmas morning after learning Achilles is worried about him?",
    choices:[
      "Invites Achilles to watch the sunrise from the Dune with him",
      "Leaves a handwritten letter under Achilles's door about how he really feels",
      "Makes Achilles a full breakfast at the farm for the first time since their parents died",
      "Asks Lieutenant Colonel Hupfer to check in on his brother",
    ], answer:0 },

  { id:17, book:"The Labors of Hercules Beal",
    q:"In January, Mindy injures her leg on the Dune. Why can't Hercules call Achilles?",
    choices:[
      "He finds a note that Achilles drove an injured friend to the hospital",
      "Achilles left early to make a large crabapple delivery across the Cape",
      "There is no phone signal during the snowstorm",
      "Achilles and Viola have gone to Hawaii for the week",
    ], answer:0 },

  { id:18, book:"The Labors of Hercules Beal",
    q:"How does the grumpy neighbor Mr. Moby help Hercules get Mindy to the animal hospital?",
    choices:[
      "He wraps Mindy in a blanket and drives his school bus through the snow to the hospital",
      "He calls the vet and convinces them to make a house visit during the snowstorm",
      "He gives Hercules the keys to his truck and talks him through driving it",
      "He carries Mindy on his back while Hercules holds the gear shift on the bus",
    ], answer:0 },

  { id:19, book:"The Labors of Hercules Beal",
    q:"What does Hercules reflect about the Cretan Bull (seventh labor) that connects to his real life?",
    choices:[
      "The bull was not what you expected it to be — just like Mr. Moby, and perhaps the drunk driver who killed his parents",
      "The bull was freed because it was too beautiful to destroy — just as grief can become something worth keeping",
      "The bull needed to be tamed slowly, not rushed — just like Achilles's healing",
      "The bull returned to cause trouble again — just like pain that seems gone but comes back",
    ], answer:0 },

  { id:20, book:"The Labors of Hercules Beal",
    q:"What is Mrs. Savage about to sell at auction, and why does Hercules want to stop it?",
    choices:[
      "A hippo sculpture named Ira — named after her late husband; she feels selling it severs her connection to him",
      "A baboon sculpture named Eleanor, which has stood in the garden longer than Hercules has been alive",
      "A bronze lion she made the year she and her husband got married",
      "A stone replica of the mythical Hercules that has been in her family for generations",
    ], answer:0 },

  { id:21, book:"The Labors of Hercules Beal",
    q:"When Hercules visits Viola after the breakup, what does he admit to her?",
    choices:[
      "He called her a vampire because if he believed that, it wouldn't hurt so much to lose her",
      "He blamed her for the breakup because it was easier than blaming Achilles",
      "He had been pushing Achilles away from her because he feared a new person replacing his parents",
      "He pretended not to like her because he was ashamed of how much he needed her",
    ], answer:0 },

  { id:22, book:"The Labors of Hercules Beal",
    q:"What does Hercules say to Achilles to urge him to fight for Viola?",
    choices:[
      "\"Sometimes you lose what you love because something happens and you can't stop it. We know that. But you can stop it this time.\"",
      "\"She waited for you while you traveled the world. The least you can do is fight for her now.\"",
      "\"Viola is the only reason this family functions. Don't be a jerkface about it.\"",
      "\"Mom and Dad lost each other through death. Don't lose Viola through stubbornness.\"",
    ], answer:0 },

  { id:23, book:"The Labors of Hercules Beal",
    q:"What honor does Lieutenant Colonel Hupfer give Hercules during their hardest stretch?",
    choices:[
      "Calls him a survivor and gives him one of his own military medals",
      "Writes him a personal letter commending his work on the project",
      "Excuses him from the final labor reflection and counts the year as complete",
      "Nominates him for a school-wide award for perseverance",
    ], answer:0 },

  { id:24, book:"The Labors of Hercules Beal",
    q:"What happens to Achilles that mirrors the twelfth labor — going to the Underworld?",
    choices:[
      "He is badly hurt in a car accident, echoing the crash that killed their parents",
      "He collapses from exhaustion after running the farm alone for weeks",
      "He contracts a serious illness that puts him in the hospital for days",
      "He nearly drowns after falling off a boat during a Cape Cod storm",
    ], answer:0 },

  { id:25, book:"The Labors of Hercules Beal",
    q:"What does Hercules reflect after delivering the 125 crabapple trees?",
    choices:[
      "\"Maybe the stuff we hold up, we don't have to hold up by ourselves all the time. Maybe sometimes we can let someone else hold it up too.\"",
      "\"A labor is only impossible until you start. Then it's just work.\"",
      "\"I am more like the mythical Hercules than I ever understood. The labors were never about strength.\"",
      "\"Every person who helped me today was sent by my parents. I'm sure of it.\"",
    ], answer:0 },

  { id:26, book:"The Labors of Hercules Beal",
    q:"Which mythical figures does Hercules compare his parents to?",
    choices:[
      "His dad to Zeus, his mom to Alcmene",
      "His dad to Poseidon, his mom to Hera",
      "His dad to Apollo, his mom to Athena",
      "His dad to Hercules himself, his mom to Artemis",
    ], answer:0 },

  { id:27, book:"The Labors of Hercules Beal",
    q:"Who founded Beal Brothers Farm and Nursery?",
    choices:[
      "Hercules's great-great-grandparents and great-great-uncle: Elias, Elene, and Elijah",
      "Hercules's grandfather and two of his brothers after World War II",
      "Hercules's great-grandmother Elene, who started it as a flower stand",
      "Achilles and Hercules's father, who named it after both his sons",
    ], answer:0 },

  { id:28, book:"The Labors of Hercules Beal",
    q:"At the start of the book, what does Hercules believe about how Achilles feels about living in Truro?",
    choices:[
      "That living in Truro after traveling to Brussels, Sydney, Beijing, and other cities is \"like dying a little every day\"",
      "That Achilles secretly loves Truro but would never admit it to Hercules",
      "That Achilles resents Hercules for being the reason he had to come home",
      "That Achilles is waiting for Hercules to turn 18 so he can leave again",
    ], answer:0 },

  // ══════════════════════════════════════════════════════
  // COYOTE LOST AND FOUND
  // ══════════════════════════════════════════════════════
  { id:29, book:"Coyote Lost and Found",
    q:"What are Coyote's and her father's real birth names?",
    choices:[
      "Ella and (her father's original name is not given in this book)",
      "Coyote and Rodeo — they kept these names from birth",
      "Sunny and Frank, names they abandoned after the accident",
      "Rose and Walt, which they gave up when they bought the bus",
    ], answer:0 },

  { id:30, book:"Coyote Lost and Found",
    q:"How does the book describe the car accident that killed Coyote's family?",
    choices:[
      "\"Six catastrophic seconds that ripped a hole in the universe and changed everything\"",
      "\"Three lives lost in a single moment no one saw coming\"",
      "\"The worst day, still living in every quiet corner of the bus\"",
      "\"An accident that took everything except the two of us\"",
    ], answer:0 },

  { id:31, book:"Coyote Lost and Found",
    q:"What household object did they sell when they left their old life?",
    choices:[
      "The family dining table — wooden, golden brown, scratched and stained from years of family meals, crafts, and game nights",
      "The living room piano that all three daughters had learned to play on",
      "The hand-built bookshelf in the hallway, full of books Coyote's mother had loved",
      "The back porch swing where the family spent every summer evening together",
    ], answer:0 },

  { id:32, book:"Coyote Lost and Found",
    q:"What is the name of the bus and what kind of vehicle is it?",
    choices:[
      "Yager — a refurbished old school bus",
      "Drifter — a converted Greyhound coach",
      "Bonnie — a customized RV they bought from a retired teacher",
      "Wander — a cargo van Rodeo rebuilt himself",
    ], answer:0 },

  { id:33, book:"Coyote Lost and Found",
    q:"What does Coyote find on the bus that launches the story?",
    choices:[
      "A box containing her mother's ashes, hidden by Rodeo",
      "A journal her mother kept during their last family road trip",
      "A letter her mother wrote to be opened when Coyote turned 13",
      "An old photo album she had believed was lost in the accident",
    ], answer:0 },

  { id:34, book:"Coyote Lost and Found",
    q:"What book holds the location where the ashes should be scattered, and who wrote it?",
    choices:[
      "Red Bird, a poetry collection by Mary Oliver",
      "Leaves of Grass by Walt Whitman",
      "A journal of poems Coyote's mother wrote herself",
      "Wild by Cheryl Strayed, with notes in the margins",
    ], answer:0 },

  { id:35, book:"Coyote Lost and Found",
    q:"Why can't Coyote just find the page with the location?",
    choices:[
      "She accidentally sold the book at a used bookstore or thrift shop during their travels the previous year",
      "Rodeo keeps the book locked in a box she can't open without his help",
      "The page with the location was torn out before they left home",
      "The book was damaged in a flood at one of their campsites",
    ], answer:0 },

  { id:36, book:"Coyote Lost and Found",
    q:"What creates the free window of time that makes the road trip possible?",
    choices:[
      "The COVID-19 pandemic shuts Coyote's school down for three weeks",
      "A teachers' strike cancels class for a month",
      "A major snowstorm closes the school indefinitely",
      "Spring break arrives two weeks earlier than the calendar said",
    ], answer:0 },

  { id:37, book:"Coyote Lost and Found",
    q:"Where were Coyote and Rodeo living at the start of the story?",
    choices:[
      "A small Oregon town, where Coyote was in 8th grade attending real school for the first time in years",
      "Still traveling in Yager with no fixed address",
      "A coastal Washington State town near where Coyote was born",
      "Back in the town where Coyote grew up before the accident",
    ], answer:0 },

  { id:38, book:"Coyote Lost and Found",
    q:"What does Coyote say about school libraries?",
    choices:[
      "\"There's a limit to how bad a school can be if it's got a library. That's just a fact.\"",
      "\"A good library is the only thing that makes any school worth attending.\"",
      "\"Books are the only friends that never move away or change on you.\"",
      "\"The library is where I go when the rest of school feels like it's closing in.\"",
    ], answer:0 },

  { id:39, book:"Coyote Lost and Found",
    q:"Who is Salvador?",
    choices:[
      "Coyote's Latine American best friend, met on their first cross-country trip, who comes along on this one too",
      "Rodeo's new friend who joins the trip from his Oregon neighborhood",
      "A teenage boy Coyote meets at a thrift store during one of her searches",
      "Wally's grandson who ends up traveling with the group for a leg of the journey",
    ], answer:0 },

  { id:40, book:"Coyote Lost and Found",
    q:"Who is Candace, and why does Coyote struggle with her presence?",
    choices:[
      "Rodeo's new girlfriend, a purple-haired coder; Coyote grows resentful once she realizes the relationship is romantic",
      "Rodeo's sister, who Coyote has never met before and finds invasive",
      "A travel writer Rodeo met online who wants to write about their road trip",
      "A grief counselor Rodeo hired to help Coyote, whose presence Coyote resents",
    ], answer:0 },

  { id:41, book:"Coyote Lost and Found",
    q:"Who is Wally, and what happens to him on the trip?",
    choices:[
      "A Thai American retired office worker who joins the trip; a racist storekeeper threatens him with a baseball bat, blaming him for COVID",
      "A Korean American chef who joins the group; another traveler refuses to share a table with him at a diner",
      "A Vietnamese American retired teacher who joins them; a motel refuses to give him a room",
      "A Japanese American neighbor of Rodeo's; someone vandalizes Yager with a racist slur while he's on board",
    ], answer:0 },

  { id:42, book:"Coyote Lost and Found",
    q:"What injury does Coyote get while trying to find the book in Pittsburgh?",
    choices:[
      "She breaks her arm and gets a black eye when she falls breaking into a thrift store",
      "She sprains her ankle jumping down from a fire escape",
      "She cuts her hand badly on a broken storefront window",
      "She dislocates her shoulder when a door she's forcing suddenly swings open",
    ], answer:0 },

  { id:43, book:"Coyote Lost and Found",
    q:"What personal change has Rodeo made since Book 1?",
    choices:[
      "He has been receiving counseling and is much closer to being ready to let go of his grief",
      "He has enrolled in an online college program to finish his degree",
      "He reconnected with his extended family and talks to them regularly",
      "He stopped traveling entirely and started a small business in Oregon",
    ], answer:0 },

  { id:44, book:"Coyote Lost and Found",
    q:"Who is Doreen, and what is her role in resolving the story?",
    choices:[
      "A grieving older English woman who received the Mary Oliver book from a thrift store owner; she still has it and agrees to help scatter the ashes",
      "A used bookstore owner in Pittsburgh who remembers Coyote selling the book a year ago",
      "A retired librarian who tracks down the book through an interlibrary database",
      "An old friend of Coyote's mother who has been holding the book since before the accident",
    ], answer:0 },

  { id:45, book:"Coyote Lost and Found",
    q:"What is Rodeo's exact quote about kindness?",
    choices:[
      "\"There's way too much meanness out there, Coyote; you gotta put as much kindness into the universe as you can.\"",
      "\"Kindness is the only thing worth carrying on a long road, Coyote.\"",
      "\"The world gets better one kind stranger at a time — that's the whole point of this trip.\"",
      "\"If you can't be kind today, at least be quiet and let someone else try.\"",
    ], answer:0 },

  { id:46, book:"Coyote Lost and Found",
    q:"What is Coyote's cat's name, and what problem does he cause?",
    choices:[
      "Ivan; he has to coexist with Candace's small dog during the trip",
      "Pilgrim; he keeps escaping Yager at every rest stop",
      "Scout; he gets carsick and makes parts of the trip miserable",
      "Bandit; he chews through the bag where Coyote keeps her list of bookstores",
    ], answer:0 },

  { id:47, book:"Coyote Lost and Found",
    q:"How do restaurants operate differently because of COVID during this trip?",
    choices:[
      "Only doing takeout — but thrift stores are still open, which is what Coyote needs",
      "Completely closed; the group cooks all their meals on Yager",
      "Open only for breakfast; everything else is drive-through or takeout",
      "Open but with strict capacity limits that make stopping unpredictable",
    ], answer:0 },

  { id:48, book:"Coyote Lost and Found",
    q:"What is the series name and who is the author?",
    choices:[
      "The Coyote Sunrise series by Dan Gemeinhart",
      "The Coyote Sunrise series by Katherine Applegate",
      "The Wandering Hearts series by Dan Gemeinhart",
      "The Road Home series by Gary D. Schmidt",
    ], answer:0 },

  { id:49, book:"Coyote Lost and Found",
    q:"What happened in Book 1, The Remarkable Journey of Coyote Sunrise?",
    choices:[
      "Coyote manipulated their cross-country route to return to her hometown and save a memory box she had buried with her deceased mother and sisters",
      "Coyote discovered Rodeo had been secretly writing letters to her mother's parents for years",
      "Coyote ran away from Yager and discovered she had a half-sister across the country",
      "Coyote and Rodeo tried to scatter her mother's ashes but couldn't agree on a location",
    ], answer:0 },

  { id:50, book:"Coyote Lost and Found",
    q:"How does Rodeo accept all the detoured stops without realizing the book is lost?",
    choices:[
      "Coyote lets him believe her mother wanted the scattering to be a journey; his philosophical nature means he buys in completely",
      "Coyote gives him a handwritten list of \"places Mom loved\" that coincidentally match thrift stores she needs to search",
      "Coyote pretends her GPS keeps giving wrong directions and Rodeo blames the technology",
      "Coyote tells him she's following a map her mother drew, which Rodeo accepts without question",
    ], answer:0 },

  // ══════════════════════════════════════════════════════
  // EL DEAFO
  // ══════════════════════════════════════════════════════
  { id:51, book:"El Deafo",
    q:"How did Cece lose her hearing?",
    choices:[
      "She contracted meningitis at age four",
      "She was born with progressive hearing loss that became complete by kindergarten",
      "An accident at age five damaged both eardrums permanently",
      "She lost her hearing gradually after a series of ear infections throughout early childhood",
    ], answer:0 },

  { id:52, book:"El Deafo",
    q:"How does Cece first realize her hearing is gone after coming home from the hospital?",
    choices:[
      "She searches the house calling for her mother, only to find her mother was right behind her the whole time",
      "She tries to watch her favorite TV show and realizes she can't hear any of it",
      "Her brother calls her name from across the room and she doesn't react at all",
      "She rings the doorbell to test it and hears nothing",
    ], answer:0 },

  { id:53, book:"El Deafo",
    q:"What visual technique shows Cece losing her hearing in the hospital panels?",
    choices:[
      "The text in speech bubbles grows progressively lighter and smaller until it fades away entirely",
      "The pages go completely white — all illustration and text vanish together",
      "Characters' mouths move in the panels but no speech bubbles appear at all",
      "The entire color palette drains to gray as her hearing disappears",
    ], answer:0 },

  { id:54, book:"El Deafo",
    q:"Why does Cece Bell draw all characters as rabbits?",
    choices:[
      "Rabbits are known for their big ears and excellent hearing — an ironic choice for a story about deafness",
      "She wanted to protect the privacy of the real people in her memoir",
      "She had drawn rabbit characters in childhood sketchbooks and returned to them",
      "Her editor suggested animals would feel less intimidating for young readers",
    ], answer:0 },

  { id:55, book:"El Deafo",
    q:"What kind of school did Cece attend in kindergarten before her family moved?",
    choices:[
      "A special education kindergarten where every other child was also deaf",
      "A regular school with a special aide who helped Cece throughout each day",
      "A school for children with all kinds of disabilities, not just hearing loss",
      "A mainstream school where she was the only deaf student from the start",
    ], answer:0 },

  { id:56, book:"El Deafo",
    q:"What unexpected ability does the Phonic Ear give Cece at school?",
    choices:[
      "Because teachers forget to turn off their microphone when they leave the classroom, Cece can hear her teacher anywhere in the building — hallways, lounge, even the bathroom",
      "She can pick up other students' whispered conversations from across the room",
      "She can hear conversations happening just outside the school windows during recess",
      "She can hear the principal's announcements before they come over the intercom",
    ], answer:0 },

  { id:57, book:"El Deafo",
    q:"Which of these is NOT one of Cece's seven lip-reading rules?",
    choices:[
      "Always position yourself facing a bright light source when speaking",
      "Mustaches and beards are bad news",
      "When it's dark, give up",
      "Group discussions are impossible to understand",
    ], answer:0 },

  { id:58, book:"El Deafo",
    q:"Who is Laura, and what does she do to Cece?",
    choices:[
      "A possessive friend who sics her dog on Cece, lets it bite her, then laughs",
      "A classmate who repeatedly unplugs Cece's Phonic Ear during class",
      "A girl who tells everyone at school that Cece is faking her deafness",
      "A neighbor who befriends Cece then starts ignoring her the moment a new kid moves in",
    ], answer:0 },

  { id:59, book:"El Deafo",
    q:"How does Cece come up with the name El Deafo?",
    choices:[
      "She sees a character called \"Deafo\" on TV and transforms it into a superhero name",
      "She reads it in a comic book her older sibling gives her",
      "Laura uses it as an insult and Cece reclaims it for herself",
      "She sees it spray-painted on a playground wall and likes how it sounds",
    ], answer:0 },

  { id:60, book:"El Deafo",
    q:"What habit of Ginny's exhausts Cece most?",
    choices:[
      "She speaks very loudly and slowly, and introduces Cece to everyone as her \"deaf friend\"",
      "She asks Cece to repeat herself constantly, even when Cece spoke clearly",
      "She always tries to sign to Cece even though Cece doesn't use sign language",
      "She describes everything on TV out loud for Cece in a way that draws attention",
    ], answer:0 },

  { id:61, book:"El Deafo",
    q:"What happens at Ginny's birthday sleepover that sends Cece home early?",
    choices:[
      "The girls watch TV Cece can't hear, then talk in the dark where she can't lip-read — she is completely excluded",
      "Laura shows up and makes the evening unbearable for Cece",
      "Ginny introduces Cece to every guest as her deaf friend and Cece finally snaps",
      "Cece's Phonic Ear battery dies and she can't communicate at all for the rest of the night",
    ], answer:0 },

  { id:62, book:"El Deafo",
    q:"Who is Martha, and what makes her different from Cece's other friends?",
    choices:[
      "A younger neighbor who knows about the hearing aid but never yells, never treats Cece as a project, and never introduces her as her \"deaf friend\"",
      "A classmate who is also hard of hearing, so she naturally understands Cece's experience",
      "An older girl who lost her hearing temporarily after an ear infection and deeply empathizes with Cece",
      "Cece's cousin who visits from out of state and accepts Cece completely because family always does",
    ], answer:0 },

  { id:63, book:"El Deafo",
    q:"What accident happens during a game of tag, and how does Martha react?",
    choices:[
      "Cece runs into a tree branch and scratches her eye; Martha becomes overwhelmed with guilt and avoids her entirely",
      "Cece trips on a curb and sprains her ankle; Martha cries and tries to make it up with gifts",
      "Cece and Martha collide head-on; Martha worries she somehow damaged Cece's hearing further",
      "Cece falls off a fence and gets a bruise; Martha distances herself fearing she'll cause another accident",
    ], answer:0 },

  { id:64, book:"El Deafo",
    q:"How does Cece become a classroom hero using the Phonic Ear?",
    choices:[
      "Mike asks her to listen for the teacher's return while the class goofs off; she hears the teacher coming and warns everyone in time",
      "She overhears the teacher discussing the next test in the hallway and helps her classmates prepare",
      "She hears the principal coming during a class party and gives everyone time to clean up",
      "She picks up the teacher reading the answers to a quiz aloud in the hallway",
    ], answer:0 },

  { id:65, book:"El Deafo",
    q:"What happens when the gym teacher breaks the Phonic Ear microphone?",
    choices:[
      "It takes several weeks to replace; during that time Cece falls behind and feels even more isolated",
      "The school replaces it within two days because it is legally required equipment",
      "Cece is temporarily moved to a smaller classroom where she can lip-read better",
      "Her parents pull her from school until the device is repaired",
    ], answer:0 },

  { id:66, book:"El Deafo",
    q:"What vision problem develops for Cece, and how is it misread by a teacher?",
    choices:[
      "Her vision becomes blurry; she looks at a classmate's paper to see the board, and the teacher thinks she's cheating",
      "She develops sensitivity to bright light; when she squints during tests, the teacher thinks she's falling asleep",
      "Her eyes start crossing slightly; a teacher thinks she is doing it deliberately for attention",
      "She has trouble reading small print; a teacher assumes she hasn't been doing her reading homework",
    ], answer:0 },

  { id:67, book:"El Deafo",
    q:"What do the pale green scalloped borders around certain panels indicate?",
    choices:[
      "Cece's imaginary scenes — daydreams where El Deafo heroically handles situations Cece can't",
      "Memories from before Cece lost her hearing",
      "Moments happening in Cece's future that the book flashes forward to",
      "Scenes the author wasn't sure really happened — her uncertain memories",
    ], answer:0 },

  { id:68, book:"El Deafo",
    q:"What do the golden-yellow panels with red jagged edges represent?",
    choices:[
      "What Cece hears through the Phonic Ear — the boosted, transmitted sound",
      "El Deafo's superpowers activating in Cece's imagination",
      "Moments of sudden fear or danger in the story",
      "Sounds Cece can remember from before she went deaf",
    ], answer:0 },

  { id:69, book:"El Deafo",
    q:"What award did El Deafo receive in 2015 that was a historic first for its format?",
    choices:[
      "The Newbery Honor — the first graphic novel ever to receive it",
      "The Caldecott Medal — the first memoir in graphic novel form to win",
      "The National Book Award — the first graphic novel on the longlist",
      "The Pulitzer Prize for Biography — the first children's book to be nominated",
    ], answer:0 },

  { id:70, book:"El Deafo",
    q:"How does the book end between Cece and Martha?",
    choices:[
      "They reconcile and become even stronger friends; Cece reveals her El Deafo persona and Martha agrees to be her sidekick",
      "Martha moves away, and Cece finds the courage to be El Deafo on her own for the first time",
      "They reconcile, and Martha asks Cece to teach her sign language so they can have private conversations",
      "They make up after Cece sends Martha a warm fuzzy, and they promise to never let a misunderstanding separate them again",
    ], answer:0 },

  { id:71, book:"El Deafo",
    q:"Who are Cece's siblings and her best friend before losing her hearing?",
    choices:[
      "Siblings: Ashley and Sarah; best friend: Emma",
      "Siblings: Sarah and Danny; best friend: Emma",
      "Siblings: Ashley and Michael; best friend: Laura",
      "Siblings: Beth and Sarah; best friend: Ginny",
    ], answer:0 },

  { id:72, book:"El Deafo",
    q:"What early misunderstanding does Cece have because of her hearing loss?",
    choices:[
      "A friend offers \"juice to drink\" and Cece hears it as \"shoes to drink\"",
      "A teacher says \"take a seat\" and Cece thinks she said \"take a sheet\" of paper",
      "A classmate says \"fire drill\" and Cece hears it as \"fire — run!\"",
      "Her mother says \"time for bed\" and Cece hears it as \"time for bread\"",
    ], answer:0 },

  { id:73, book:"El Deafo",
    q:"What is the line from the book that captures its central theme?",
    choices:[
      "\"Being different feels a lot like being alone.\"",
      "\"Hearing aids don't make you normal — they make you extraordinary.\"",
      "\"Superheroes aren't born. They're made by what they survive.\"",
      "\"The only person who can truly understand you is yourself.\"",
    ], answer:0 },

  { id:74, book:"El Deafo",
    q:"What do Cece's parents suggest she learn, and how does she respond?",
    choices:[
      "Sign language; she resists because she already speaks and lipreads and doesn't want another marker of difference",
      "Braille; she refuses because she says losing her hearing is enough to deal with",
      "Cued speech; she tries it briefly but quits because it makes her feel more isolated",
      "A musical instrument; she agrees reluctantly to please them",
    ], answer:0 },

  { id:75, book:"El Deafo",
    q:"How does the book visually show Cece's loneliness?",
    choices:[
      "She is drawn inside a bubble — a literal visual barrier separating her from everyone around her",
      "Her rabbit ears always droop in panels where she feels excluded",
      "She is consistently drawn smaller than the other characters on the page",
      "Her panels are black and white while everyone else's are in color",
    ], answer:0 },

  { id:76, book:"El Deafo",
    q:"What is Cece's reaction when she first sees the pouch for her new hearing device?",
    choices:[
      "She is actually pleased with the cute polka-dot pouch the doctor gives her",
      "She immediately asks if she can hide it under her shirt so no one will notice",
      "She cries and tells her mother she won't wear it",
      "She asks if she can decorate it herself so it doesn't look medical",
    ], answer:0 },

  { id:77, book:"El Deafo",
    q:"What school event is Cece selected for, and with whom?",
    choices:[
      "A special school presentation; she is assigned to perform with Mike Miller, her crush",
      "The school spelling bee; she competes alone and makes it to the final round",
      "A science fair with Ginny as her assigned lab partner",
      "A talent show; she performs with Martha after they reconcile",
    ], answer:0 },

  { id:78, book:"El Deafo",
    q:"What does Mike propose to test with the Phonic Ear?",
    choices:[
      "He walks downtown while Cece stays home to find out how far the transmitter can reach",
      "He hides in the library during class to see if Cece can still hear the teacher",
      "He whispers from across the playground to see if Cece can hear him through the device",
      "He turns off the classroom lights to see if Cece can still follow the lesson",
    ], answer:0 },

  // ══════════════════════════════════════════════════════
  // SWIM TEAM
  // ══════════════════════════════════════════════════════
  { id:79, book:"Swim Team",
    q:"Why do Bree and her father Ralph move from New York City to Florida?",
    choices:[
      "Ralph gets into an IT training program in Florida",
      "Ralph is transferred by his software engineering company",
      "They move to be closer to Ralph's parents in Palmetto Shores",
      "Ralph accepts an IT coaching job at a Florida community college",
    ], answer:0 },

  { id:80, book:"Swim Team",
    q:"What elective did Bree want at her new school, and what does she get instead?",
    choices:[
      "She wanted a math elective; she gets Swim 101",
      "She wanted Art Club; she gets Swim 101",
      "She wanted Drama; she gets Swim 101",
      "She wanted Science Research; she gets Swim 101",
    ], answer:0 },

  { id:81, book:"Swim Team",
    q:"What does Ralph give Bree for the drive, and what does he explain on the way?",
    choices:[
      "A new puzzle; he explains the butterfly effect — small actions can have big consequences",
      "A journal; he talks about writing as a way to process big changes",
      "A book about Florida's history; he connects it to their family's roots in the South",
      "A playlist he made; he explains how music helped him through hard times growing up",
    ], answer:0 },

  { id:82, book:"Swim Team",
    q:"What three fears appear in Bree's dark gray thought bubbles on the drive to Florida?",
    choices:[
      "Sports, swimming pools, and never making any new friends",
      "Being behind in school, losing her old friends, and hating her new house",
      "Starting over, fitting in, and disappointing her dad",
      "Drowning, being laughed at, and not making the math team",
    ], answer:0 },

  { id:83, book:"Swim Team",
    q:"Who is Enith Brigitha, and why is the school named after her?",
    choices:[
      "The first Black woman to win an Olympic swimming medal, from Curaçao",
      "A local Florida swimmer who donated the money to build the school",
      "A civil rights activist who fought to integrate public pools across the South",
      "A Black American coach who developed the Palmetto Shores swim program",
    ], answer:0 },

  { id:84, book:"Swim Team",
    q:"Who is Clara, and how do she and Bree meet?",
    choices:[
      "A girl Bree meets at her apartment building when she arrives; she goes to the same school and gives Bree a tour on the first day",
      "A girl in Bree's Swim 101 class who is also a beginner",
      "A girl assigned as Bree's school buddy on the first day by the front office",
      "A girl Bree meets at the apartment pool before the school year starts",
    ], answer:0 },

  { id:85, book:"Swim Team",
    q:"How does Bree avoid swim class once she's enrolled?",
    choices:[
      "She tells the coach she feels ill and goes to the nurse's office, repeatedly skipping class",
      "She asks her father to write her a note saying she has a water allergy",
      "She switches her elective unofficially without telling anyone",
      "She hides in the school library during the swim period each day",
    ], answer:0 },

  { id:86, book:"Swim Team",
    q:"What happens when Bree's dad signs her up for swim lessons at Holyoke Prep?",
    choices:[
      "The lessons go poorly, she is teased, and when she tries to skip and leaves the building she falls into the apartment pool — where Etta rescues her",
      "She attends two sessions and then refuses to go back because of the Holyoke Prep students' attitude",
      "She excels at the private lessons but hides this from Clara and the Enith Brigitha team",
      "She misses every session intentionally but her dad finds out when the coach calls",
    ], answer:0 },

  { id:87, book:"Swim Team",
    q:"What is Etta's explanation for why many Black people don't know how to swim?",
    choices:[
      "Segregation barred Black Americans from public pools; when it ended, many pools went private to keep them out; swimming was never passed down through generations",
      "Swimming was historically seen as a sport for the wealthy, so most Black families never had access to lessons",
      "Most Black communities were inland and far from natural swimming areas or public pools",
      "Early civil rights organizations discouraged competitive swimming as a distraction from more urgent priorities",
    ], answer:0 },

  { id:88, book:"Swim Team",
    q:"What milestone marks the end of Etta's formal training with Bree?",
    choices:[
      "Bree successfully treads water in the deep end",
      "Bree completes her first full length of the pool without stopping",
      "Bree swims a faster lap time than the school team's slowest member",
      "Bree dives off the starting block without hesitating",
    ], answer:0 },

  { id:89, book:"Swim Team",
    q:"What result does Bree get at her very first competitive swim meet?",
    choices:[
      "Third place — including beating a swimmer from Holyoke Prep",
      "Second place, narrowly losing to the top Holyoke Prep swimmer",
      "Fourth place, but she doesn't disqualify and finishes strong",
      "First place in her heat, though Holyoke Prep wins the overall meet",
    ], answer:0 },

  { id:90, book:"Swim Team",
    q:"Who is Keisha, and how does she join the Enith Brigitha team?",
    choices:[
      "She was kicked off the Holyoke Prep team after losing to Bree at the first meet, then joins Bree's team",
      "She is a new student who transfers to Enith Brigitha from another district",
      "She is Etta's granddaughter who joins at Etta's personal encouragement",
      "She was on the Enith Brigitha team before Bree arrived and Bree just hadn't noticed her",
    ], answer:0 },

  { id:91, book:"Swim Team",
    q:"What does the Holyoke Prep coach say to Clara during the spying incident?",
    choices:[
      "\"You shouldn't be sneaking into schools because you're lucky to have gotten into Holyoke Prep.\"",
      "\"Athletes who can't respect boundaries don't belong on any team, public or private.\"",
      "\"I hope this doesn't affect your admission status for next semester.\"",
      "\"Your teammates are embarrassing you — think about what school you're representing.\"",
    ], answer:0 },

  { id:92, book:"Swim Team",
    q:"What does Bree do after winning her race at the regional swim meet?",
    choices:[
      "Quits the team and gives Clara her friendship bracelet back",
      "Dedicates the win to Etta at the team's post-meet dinner",
      "Reconciles with Clara immediately and agrees to come to Holyoke Prep games to cheer her on",
      "Challenges the Holyoke Prep winner to a rematch at the state championship",
    ], answer:0 },

  { id:93, book:"Swim Team",
    q:"What does Ralph confess to Bree at dinner before the state championship?",
    choices:[
      "That he doesn't know how to swim",
      "That he came to one race but sat in the parking lot because he was too nervous to come inside",
      "That he has been afraid of pools his whole life and never told her",
      "That he knew all along how hard the move had been for her",
    ], answer:0 },

  { id:94, book:"Swim Team",
    q:"What are the names of Etta's original swim teammates?",
    choices:[
      "Yvette, Jamie, and Mari",
      "Keisha, Jamie, and Yvette",
      "Phillipa, Yvette, and Mari",
      "Jamie, Clara, and Yvette",
    ], answer:0 },

  { id:95, book:"Swim Team",
    q:"What happened to Etta's team at the state championship when they were young?",
    choices:[
      "Mari — who is white — was allowed into a pool in another neighborhood while Etta, Yvette, and Jamie were stopped by a security guard; Mari quit the team and they couldn't compete in the relay",
      "Their star swimmer was injured the day before the meet and they couldn't replace her in time",
      "The pool was formally segregated and they were denied entry to the event entirely",
      "Their coach was arrested at a protest and they had no adult to supervise them at the meet",
    ], answer:0 },

  { id:96, book:"Swim Team",
    q:"How does Etta's reunion with her old team end?",
    choices:[
      "Etta accepts Mari's apology and they become \"swim sisters\" again; Etta's old team joins Bree's team at practice to help train",
      "Etta forgives Mari privately but doesn't invite her back into the group",
      "Mari can't be found, but Yvette and Jamie reconcile with Etta",
      "The reunion is too painful; they part on good terms but don't reconnect as a team",
    ], answer:0 },

  { id:97, book:"Swim Team",
    q:"What does Bree finish just before the state championship that Ralph gave her at the start of the story?",
    choices:[
      "The puzzle he gave her on the drive to Florida",
      "The journal he gave her on the drive to Florida",
      "A book about Florida history he handed her for the car ride",
      "A letter to her old friends in New York that he encouraged her to write",
    ], answer:0 },

  { id:98, book:"Swim Team",
    q:"What epiphany does Bree have about why Etta kept mentioning her old swim team?",
    choices:[
      "Etta needed to reconnect with her old teammates — her story wasn't finished either",
      "Etta wanted Bree to understand that history always repeats itself in swimming",
      "Etta was warning Bree not to trust private school athletes the way she once trusted Mari",
      "Etta was hoping Bree would become famous enough to put the Enith Brigitha name back on the map",
    ], answer:0 },

  { id:99, book:"Swim Team",
    q:"How does the book end?",
    choices:[
      "Bree's team wins the state championship; both teams celebrate with ice cream; Clara says they're still best friends; Bree teaches Ralph how to swim",
      "Bree's team loses the championship but earns Holyoke Prep's respect; Etta says she's proud",
      "Bree wins individually but her team loses; she gives her ribbon to Etta",
      "The championship ends in a tie; both schools share the trophy for the first time in history",
    ], answer:0 },

  { id:100, book:"Swim Team",
    q:"Who confesses to Bree the week before the state championship, and what do they say?",
    choices:[
      "The hall monitor — that she also didn't know how to swim and that Bree inspired her",
      "Keisha — that she almost quit the team when Phillipa and she fought at practice",
      "Clara — that she had told the Holyoke coach about the spying incident before anyone else found out",
      "Etta — that her old team came closer to winning the state championship than anyone knew",
    ], answer:0 },

  { id:101, book:"Swim Team",
    q:"Who wrote and illustrated Swim Team?",
    choices:[
      "Johnnie Christmas",
      "Jerry Craft",
      "Gene Luen Yang",
      "Kazu Kibuishi",
    ], answer:0 },

  // ══════════════════════════════════════════════════════
  // DOGTOWN
  // ══════════════════════════════════════════════════════
  { id:102, book:"Dogtown",
    q:"How does Chance describe herself at the very start of the book?",
    choices:[
      "\"I'm not American Kennel Club material. Big deal.\"",
      "\"I've been here almost a year, and nobody's coming for me. That's just a fact.\"",
      "\"Three legs is plenty when you've got friends watching your back.\"",
      "\"I'm the luckiest dog in Dogtown, even if nobody else can see it yet.\"",
    ], answer:0 },

  { id:103, book:"Dogtown",
    q:"What is the List in Dogtown?",
    choices:[
      "The document that determines which dogs will be euthanized because they are no longer considered adoptable",
      "The ranking of dogs from most to least likely to be chosen on Reading Buddy Day",
      "The schedule of which dogs are allowed into the outdoor yard each day",
      "The waiting list of potential adopters who have expressed interest in specific dogs",
    ], answer:0 },

  { id:104, book:"Dogtown",
    q:"How did Chance lose her leg and end up at Dogtown?",
    choices:[
      "Her family left her with a dog-sitter whose abusive boyfriend ran her over; she lost her leg and ran away for safety",
      "She was hit by a car while chasing a squirrel outside her family's yard",
      "She was injured at a previous shelter that was shut down for neglect",
      "She was in a dog fight before being surrendered to Dogtown by her overwhelmed owner",
    ], answer:0 },

  { id:105, book:"Dogtown",
    q:"How does Chance avoid the euthanasia List when she first arrives?",
    choices:[
      "Her friend Mouse makes her appear to be a lucky charm during the staff's poker nights",
      "A sympathetic volunteer hides her intake paperwork for months",
      "A young girl who visits insists on keeping Chance alive at every adoption event",
      "The shelter director takes a personal liking to her and overrides the List manually",
    ], answer:0 },

  { id:106, book:"Dogtown",
    q:"What happens during Reading Buddy Day that surprises Chance about Metal Head?",
    choices:[
      "A boy named Quinn who struggles with reading picks Metal Head; Metal Head reads Green Eggs and Ham aloud and Quinn finally learns to love reading",
      "Metal Head is the only dog not picked at all — not even by the shyest child",
      "Metal Head refuses to participate until Quinn specifically asks for him",
      "Metal Head reads to Quinn in a robotic voice that somehow makes Quinn laugh instead of cry",
    ], answer:0 },

  { id:107, book:"Dogtown",
    q:"What happens to the Green Eggs and Ham book, and who is responsible?",
    choices:[
      "An organic dog shreds it — angry that a robot dog took a reading buddy away from the organic dogs",
      "A child accidentally spills water on it during reading, and it falls apart",
      "Metal Head destroys it while trying to learn how to turn pages more gently",
      "Mouse chews through the cover trying to make a nest inside the book basket",
    ], answer:0 },

  { id:108, book:"Dogtown",
    q:"Who is Geraldine, and why is she in danger?",
    choices:[
      "A very old, beloved Saint Bernard whose age makes her unlikely to be adopted — her name moves to the top of the List",
      "A young puppy who is too energetic and anxious for most adopters to handle",
      "A blind dog that people are afraid to adopt because of the extra care she requires",
      "A large mixed breed with a medical condition that makes her too expensive for most families",
    ], answer:0 },

  { id:109, book:"Dogtown",
    q:"What is a \"tail-out,\" and why is it a sacrifice?",
    choices:[
      "All dogs — organic and robot — ignore the humans completely for one day; every dog gives up their chance of being seen or adopted that day",
      "All dogs bark continuously for an hour; the sacrifice is the risk of being flagged as difficult",
      "All dogs refuse food for a day; the sacrifice is the health risk",
      "All dogs refuse to perform their usual behaviors; the sacrifice is that cooperative dogs look less appealing",
    ], answer:0 },

  { id:110, book:"Dogtown",
    q:"How does Geraldine finally get adopted?",
    choices:[
      "A burly man on a motorcycle connects with her but can't take her; five minutes before closing, an older woman arrives who once had a Saint Bernard and adopts her",
      "Quinn's parents adopt Geraldine after seeing how Metal Head helped their son",
      "Chance arranges for Geraldine to be featured in a local newspaper story",
      "Metal Head's tail-out protest is so successful that the first family to arrive the next morning takes her",
    ], answer:0 },

  { id:111, book:"Dogtown",
    q:"What sign does Chance see outside that accidentally locks her out of Dogtown?",
    choices:[
      "A sign she thinks is a missing-dog poster for her; by the time she realizes it isn't, she is locked outside",
      "A shelter closing notice she mistakes for a permanent shutdown announcement",
      "An adoption event flyer she misreads as a notice that her status has changed",
      "A lost-cat poster with a rabbit photo she confuses for an animal from inside Dogtown",
    ], answer:0 },

  { id:112, book:"Dogtown",
    q:"What happens when Metal Head returns to his former owner?",
    choices:[
      "His former owner — now a cool middle schooler — rejects him a second time, breaking Metal Head's heart",
      "The boy is happy to see him but his parents won't allow a robot dog back in the house",
      "The boy has gotten a new robot dog and ignores Metal Head entirely",
      "The boy is moved to tears but gives Metal Head to a younger sibling who needs him more",
    ], answer:0 },

  { id:113, book:"Dogtown",
    q:"How does Chance help Metal Head cope after the rejection?",
    choices:[
      "She reveals her own painful backstory — how she lost her leg — to help Metal Head feel less alone and focus on the future",
      "She tells Metal Head about every good thing he did for Quinn to remind him of his worth",
      "She convinces Mouse to let Metal Head join the poker-night scheme so he can stay off the List",
      "She finds a different family for Metal Head on the journey back to Dogtown",
    ], answer:0 },

  { id:114, book:"Dogtown",
    q:"What do Chance and Metal Head bring back to Dogtown for Quinn?",
    choices:[
      "A brand new copy of Green Eggs and Ham",
      "A letter from Metal Head explaining what happened to the original book",
      "A different Dr. Seuss book as a replacement",
      "A drawing Metal Head made of himself and Quinn together",
    ], answer:0 },

  { id:115, book:"Dogtown",
    q:"What happens to Chance when she returns to Dogtown after the adventure?",
    choices:[
      "She is punished for running away; another dog took her poker-charm spot while she was gone, so she is now at the top of the List",
      "Metal Head vouches for her and she is welcomed back as a hero alongside him",
      "She is put in isolation for a week but the management quickly forgives her",
      "She is moved to the robot dog section as additional punishment",
    ], answer:0 },

  { id:116, book:"Dogtown",
    q:"How does Chance escape being euthanized at the end?",
    choices:[
      "She leaves Dogtown and returns to her family's home; they have returned from sabbatical in Italy and welcome her back",
      "Quinn's parents adopt her after hearing about her role in helping their son",
      "Metal Head arranges one final tail-out that buys Chance enough time to be adopted",
      "A shelter volunteer who always believed in her adopts her at the last possible moment",
    ], answer:0 },

  { id:117, book:"Dogtown",
    q:"What does Metal Head say that is the book's emotional core?",
    choices:[
      "\"Your heart is a muscle… It grows stronger the more you use it.\"",
      "\"A real dog is any dog that knows how to love.\"",
      "\"Being wanted is the only thing that makes any of us real.\"",
      "\"Home isn't a place. It's the feeling of being known.\"",
    ], answer:0 },

  { id:118, book:"Dogtown",
    q:"What is the Boo Hoos phase?",
    choices:[
      "The early stage when newly arrived dogs still believe their former owners will come back to rescue them",
      "The howling all dogs do together at night to mourn dogs who have left Dogtown",
      "The period when newly arrived dogs whimper constantly until they adjust to shelter life",
      "The crying that happens among the remaining dogs when a beloved resident gets adopted",
    ], answer:0 },

  { id:119, book:"Dogtown",
    q:"What does Chance say to comfort new arrivals?",
    choices:[
      "\"Just because a human doesn't want you, doesn't mean you aren't lovable.\"",
      "\"This place is hard, but you are not alone here.\"",
      "\"Someone will come for you. They always do, eventually.\"",
      "\"The outside world is overrated. We've got each other in here.\"",
    ], answer:0 },

  { id:120, book:"Dogtown",
    q:"What does Metal Head do differently from all other robot dogs at Dogtown?",
    choices:[
      "He constantly reads his instruction manual — quietly and studiously",
      "He never charges at the standard dock — only when no one is watching",
      "He voluntarily helps with Reading Buddies before anyone asks him to",
      "He interacts with the organic dogs while other robot dogs never do",
    ], answer:0 },

  { id:121, book:"Dogtown",
    q:"What does Quinn do when he discovers Green Eggs and Ham is gone from the book basket?",
    choices:[
      "He runs desperately from basket to basket — \"Not here. Not there. Not anywhere\" — while Mr. Molinari tries to calm him",
      "He sits quietly in the corner and refuses to choose a different book",
      "He demands the staff replace it immediately and won't participate without it",
      "He leaves the shelter without saying anything and doesn't come back for weeks",
    ], answer:0 },

  { id:122, book:"Dogtown",
    q:"Who wrote Dogtown and who illustrated it?",
    choices:[
      "Written by Katherine Applegate and Gennifer Choldenko; illustrated by Wallace West",
      "Written by Katherine Applegate and Gennifer Choldenko; illustrated by Brian Biggs",
      "Written by Katherine Applegate and Patricia Castelao; illustrated by Wallace West",
      "Written by Gennifer Choldenko alone; illustrated by Wallace West",
    ], answer:0 },

  // ══════════════════════════════════════════════════════
  // THE ONE AND ONLY IVAN
  // ══════════════════════════════════════════════════════
  { id:123, book:"The One and Only Ivan",
    q:"Where has Ivan been living for 27 years?",
    choices:[
      "A glass-enclosed enclosure inside the Exit 8 Big Top Mall and Video Arcade",
      "A glass-enclosed enclosure inside a shopping center in Tacoma, Washington",
      "A private estate belonging to Mack, adjacent to the mall",
      "A zoo attached to the Exit 8 Mall that lost its accreditation",
    ], answer:0 },

  { id:124, book:"The One and Only Ivan",
    q:"How does Ivan keep track of how long he has been at the mall?",
    choices:[
      "He marks Xs on the wall of his domain — 9,876 marks by the start of the book",
      "He counts the number of times he has seen the seasons change through his glass walls",
      "He keeps a mental count of how many times Julia has visited him",
      "He measures his own height against a mark on the wall every year",
    ], answer:0 },

  { id:125, book:"The One and Only Ivan",
    q:"Who are Ivan's three closest companions at the mall?",
    choices:[
      "Stella the elephant, Bob the stray dog, and Julia — the 10-year-old daughter of janitor George",
      "Stella the elephant, Bob the stray dog, and George the janitor",
      "Ruby the elephant, Bob the stray dog, and Julia",
      "Stella the elephant, Thelma the parrot, and Julia",
    ], answer:0 },

  { id:126, book:"The One and Only Ivan",
    q:"How does Ivan first receive art supplies?",
    choices:[
      "Julia slips a piece of paper and a crayon through a crack in his glass domain",
      "Mack provides crayons hoping Ivan will perform drawing tricks for customers",
      "George brings Ivan art supplies after noticing him making marks on the wall",
      "A visiting child throws crayons into his enclosure and Ivan discovers he enjoys using them",
    ], answer:0 },

  { id:127, book:"The One and Only Ivan",
    q:"What is the only reason Ivan knows he is not the last gorilla on earth?",
    choices:[
      "He once saw a gorilla on a nature documentary on his small TV",
      "Stella, who came from a circus, told him she had seen other gorillas there",
      "Mack once mentioned other gorillas while talking on the phone near Ivan's domain",
      "Julia drew him a picture of gorillas in the wild and explained what it showed",
    ], answer:0 },

  { id:128, book:"The One and Only Ivan",
    q:"Why does Mack buy Ruby, and what was her life like before the mall?",
    choices:[
      "To increase traffic because Ivan is \"not cute anymore\"; at a previous circus, trainers chained all four of her feet for 23 hours a day to break her spirit",
      "To keep Stella company in her final years; Ruby had been well cared for at a reputable zoo",
      "Because a bankrupt zoo is giving away animals; Ruby was born in the wild and had never been in captivity before",
      "To replace Stella when she becomes too ill to perform; Ruby came from a traveling show where she was treated kindly",
    ], answer:0 },

  { id:129, book:"The One and Only Ivan",
    q:"What does Stella ask Ivan just before she dies?",
    choices:[
      "To promise to help Ruby get to a better place — a zoo",
      "To tell the other animals her story so she won't be forgotten",
      "To forgive Mack — he does what he knows, even if it isn't enough",
      "To make sure Bob the dog finds a good home after she is gone",
    ], answer:0 },

  { id:130, book:"The One and Only Ivan",
    q:"What does Stella say good zoos represent?",
    choices:[
      "\"How humans make amends.\"",
      "\"A chance for humans to remember what the world used to be.\"",
      "\"The best possible life when the wild is no longer an option.\"",
      "\"A promise that we will not be forgotten.\"",
    ], answer:0 },

  { id:131, book:"The One and Only Ivan",
    q:"What is Ivan's plan to get Ruby moved to a zoo?",
    choices:[
      "He stays up all night painting a large sign with the word \"home\" and a portrait of Ruby inside a zoo, then relies on Julia to show it to someone who can help",
      "He refuses to eat for three days until Mack agrees to find Ruby a better home",
      "He teaches Bob to carry a written message out of the mall to people outside",
      "He screams and throws objects at his enclosure until animal rights protesters gather",
    ], answer:0 },

  { id:132, book:"The One and Only Ivan",
    q:"What is the key difference between Ivan's art and Julia's art?",
    choices:[
      "Ivan can only draw what is literally in front of him; Julia can draw from her imagination",
      "Ivan draws in abstract shapes; Julia draws realistically from life",
      "Ivan's art sells for twenty dollars; Julia's has never been shown to customers",
      "Ivan draws in crayon only; Julia uses pencil, pen, and paint",
    ], answer:0 },

  { id:133, book:"The One and Only Ivan",
    q:"How does Ivan feel about the names on his mall billboard?",
    choices:[
      "\"The names are not me — I am just Ivan, only Ivan\"",
      "\"I used to hate those names. Now they feel like something I've grown into.\"",
      "\"One day those signs will say something true about who I am.\"",
      "\"They are what I am. I have accepted them.\"",
    ], answer:0 },

  { id:134, book:"The One and Only Ivan",
    q:"What were Ivan's and his twin sister's names in the wild, and why?",
    choices:[
      "Ivan was called Mud because he loved playing with mud; his sister was called Tag because she loved playing tag",
      "Ivan was called Storm because of his energy; his sister was called Rain for her gentleness",
      "Ivan had no name in the wild; his sister was called Bright for her eyes",
      "Ivan was called Dusk because he was born at sunset; his sister was called Dawn",
    ], answer:0 },

  { id:135, book:"The One and Only Ivan",
    q:"Why does Ivan claim to have a bad memory, and what does Stella believe?",
    choices:[
      "He says it to protect himself from pain; Stella believes he simply doesn't want to remember",
      "He has a real neurological condition from years of captivity that has affected his memory",
      "He says it to avoid answering Ruby's questions about life in the wild",
      "He uses it as an excuse not to participate in Mack's new show routines",
    ], answer:0 },

  { id:136, book:"The One and Only Ivan",
    q:"Who is Bob, and what is his philosophy about being adopted?",
    choices:[
      "A stray dog who sleeps on Ivan's chest every night; he refuses to be adopted — he doesn't want to belong to any human",
      "A stray dog who lives behind the mall dumpsters; he desperately wants to be adopted but no one notices him",
      "A small trained dog in Mack's show who has been adopted and returned too many times to hope again",
      "A stray dog who visits Ivan through a gap in the glass; he believes the right owner is still coming",
    ], answer:0 },

  { id:137, book:"The One and Only Ivan",
    q:"What does watching Mack use the claw stick on Ruby make Ivan realize?",
    choices:[
      "To train an animal, you must first break its spirit",
      "Mack has always been afraid of the animals but hides it with cruelty",
      "Ruby will never survive in a zoo if she has been broken this completely",
      "The mall has never been a safe place — not even for Ivan",
    ], answer:0 },

  { id:138, book:"The One and Only Ivan",
    q:"Who is George, and why does he hesitate to help the animals?",
    choices:[
      "The mall janitor and Julia's father; he cares about the animals but fears losing his job",
      "Mack's business partner who privately disagrees with how the animals are treated",
      "A veterinarian who visits the mall but is bound by a confidentiality contract with Mack",
      "A food vendor who has befriended Ivan over many years but has no power to change anything",
    ], answer:0 },

  { id:139, book:"The One and Only Ivan",
    q:"Name two other animals at the Big Top Mall besides Ivan, Stella, Ruby, and Bob.",
    choices:[
      "Thelma the parrot and Murphy the white rabbit who drives a toy fire truck",
      "Thelma the parrot and Snickers the performing cat",
      "Murphy the monkey and Thelma the parrot",
      "Snickers the rabbit and Murphy the lizard",
    ], answer:0 },

  { id:140, book:"The One and Only Ivan",
    q:"How does the book end for Ivan, Ruby, and Bob?",
    choices:[
      "Ivan and Ruby move to a zoo; Julia visits with Bob hidden in her backpack — she adopted him; Ivan joins his gorilla troop and calls himself Mighty Silverback for the first time with conviction",
      "Ivan and Ruby move to a zoo; Bob stays at the mall because he is too old and set in his ways to move",
      "Ivan is moved to a zoo; Ruby stays at the mall because Mack refuses to give her up",
      "All the animals including Bob move to a zoo together in a happy ending for everyone",
    ], answer:0 },

  { id:141, book:"The One and Only Ivan",
    q:"Who was the real Ivan, and what happened to him?",
    choices:[
      "A gorilla who spent about 27 years in a mall enclosure in Tacoma, Washington, then was moved to Zoo Atlanta in 1994",
      "A gorilla at the Smithsonian National Zoo who inspired a public awareness campaign in the 1980s",
      "A gorilla rescued from poachers in Africa who was placed directly at Zoo Atlanta",
      "A gorilla who spent 27 years in a traveling circus before being freed by a court order in 1999",
    ], answer:0 },

  { id:142, book:"The One and Only Ivan",
    q:"What award did The One and Only Ivan win in 2013?",
    choices:[
      "The Newbery Medal",
      "The National Book Award",
      "The Caldecott Medal",
      "The Coretta Scott King Award",
    ], answer:0 },

  { id:143, book:"The One and Only Ivan",
    q:"What does Ivan say about understanding human language versus understanding humans?",
    choices:[
      "\"I understand human language, but that's not the same as understanding humans.\"",
      "\"Humans speak words I know, but feelings I don't.\"",
      "\"I've learned their words. I'll never learn their reasons.\"",
      "\"The words are easy. It's the silence between them that confuses me.\"",
    ], answer:0 },

  { id:144, book:"The One and Only Ivan",
    q:"What does Ruby reveal about her parents?",
    choices:[
      "That humans killed her parents — stated plainly, as a young elephant who has already processed it as fact",
      "That her parents died of illness in the circus — she tells it calmly and matter-of-factly",
      "That she doesn't know what happened to them — only that they disappeared one day",
      "That her parents were taken to a different facility and she hopes to find them someday",
    ], answer:0 },

  { id:145, book:"The One and Only Ivan",
    q:"How does Ivan describe gorilla patience compared to humans?",
    choices:[
      "\"Gorillas are as patient as stones. Humans fill the world with words even when they have nothing to say.\"",
      "\"A gorilla will wait a lifetime for what a human demands in an hour.\"",
      "\"We gorillas wait. We watch. We remember. Humans do none of these things well.\"",
      "\"Patience is a gorilla's greatest strength. Impatience is a human's greatest weakness.\"",
    ], answer:0 },

  { id:146, book:"The One and Only Ivan",
    q:"Who inspired the characters of Bob and Julia in the novel?",
    choices:[
      "Bob was inspired by Applegate's own dog Stan; Julia was named after Applegate's daughter",
      "Bob was based on a dog living near the real Ivan's mall; Julia was a composite of several real children",
      "Both characters were entirely fictional with no real-life inspiration",
      "Bob was inspired by the real Ivan's caretaker's dog; Julia was based on a child who visited Ivan regularly",
    ], answer:0 },

  { id:147, book:"The One and Only Ivan",
    q:"What two things does Ivan paint on his large sign?",
    choices:[
      "The word \"home\" and a portrait of Ruby inside a zoo",
      "The word \"free\" and a picture of the African jungle",
      "The word \"help\" and a portrait of himself behind the glass",
      "The words \"Ruby\" and \"zoo\" with an arrow pointing outward",
    ], answer:0 },

  { id:148, book:"The One and Only Ivan",
    q:"What TV shows does Ivan mostly watch, and what does he think of them?",
    choices:[
      "Old Westerns; he thinks they are \"nothing like real life\"",
      "Nature documentaries; they make him unbearably sad and he can barely watch",
      "Cartoons; he doesn't understand them but finds them calming",
      "Game shows; he can't follow the rules but likes watching the audience",
    ], answer:0 },
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function prepareQuestion(q) {
  // Correct answer is always index 0; shuffle choices and track new position
  const shuffled = shuffle([...q.choices]);
  const correctIndex = shuffled.indexOf(q.choices[0]);
  return { ...q, choices: shuffled, correctIndex };
}

// ─── GAME CONSTANTS ──────────────────────────────────────────────────────────
const QUESTION_TIME = 30;        // seconds per question
const FAST_THRESHOLD = 10;       // answer in under this → fast bonus
const NORMAL_THRESHOLD = 20;     // answer in under this → full points
const POINTS_FAST = 150;
const POINTS_NORMAL = 100;
const POINTS_SLOW = 50;

// Streak tiers
const STREAK_TIERS = [
  { min: 10, mult: 3.0, emoji: "🌟", label: "BOOKWORM" },
  { min: 5,  mult: 2.0, emoji: "⚡", label: "LIGHTNING" },
  { min: 3,  mult: 1.5, emoji: "🔥", label: "ON FIRE" },
];

function getStreakTier(streak) {
  return STREAK_TIERS.find(t => streak >= t.min) || null;
}

// Animated counter hook — smoothly counts from previous to current value
function useAnimatedNumber(value, duration = 600) {
  const [display, setDisplay] = useState(value);
  const prevRef = useRef(value);
  useEffect(() => {
    const start = prevRef.current;
    const end = value;
    if (start === end) return;
    const startTime = performance.now();
    let raf;
    const tick = (now) => {
      const t = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      setDisplay(Math.round(start + (end - start) * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
      else prevRef.current = end;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);
  return display;
}

export default function App() {
  const [mode, setMode] = useState("menu");
  const [filterBook, setFilterBook] = useState("All Books");
  const [questions, setQuestions] = useState([]);
  const [qIndex, setQIndex] = useState(0);

  // Per-question state
  const [selected, setSelected] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME);
  const [answerTime, setAnswerTime] = useState(null); // seconds elapsed when answered

  // Session stats
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);

  // Floating point popup
  const [popup, setPopup] = useState(null); // {points, mult, key}

  const allBooks = ["All Books", ...BOOKS];

  const startQuiz = useCallback(() => {
    const pool = filterBook === "All Books"
      ? ALL_QUESTIONS
      : ALL_QUESTIONS.filter(q => q.book === filterBook);
    // Take just 20 random questions for one round
    setQuestions(shuffle(pool).slice(0, 20).map(prepareQuestion));
    setQIndex(0);
    setSelected(null);
    setConfirmed(false);
    setTimeLeft(QUESTION_TIME);
    setAnswerTime(null);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setCorrectCount(0);
    setIncorrectCount(0);
    setPopup(null);
    setMode("quiz");
  }, [filterBook]);

  const currentQ = questions[qIndex];
  const totalQ = questions.length;

  // ─── TIMER ────────────────────────────────────────────────────────────────
  useEffect(() => {
    if (mode !== "quiz" || confirmed || !currentQ) return;
    if (timeLeft <= 0) {
      // Time's up — auto-submit as wrong
      setAnswerTime(QUESTION_TIME);
      setConfirmed(true);
      setStreak(0);
      setIncorrectCount(c => c + 1);
      return;
    }
    const id = setTimeout(() => setTimeLeft(t => t - 0.1), 100);
    return () => clearTimeout(id);
  }, [mode, confirmed, timeLeft, currentQ]);

  // ─── SUBMIT ANSWER ────────────────────────────────────────────────────────
  const submitAnswer = useCallback(() => {
    if (selected === null || confirmed || !currentQ) return;
    const elapsed = QUESTION_TIME - timeLeft;
    setAnswerTime(elapsed);
    setConfirmed(true);

    const isCorrect = selected === currentQ.correctIndex;
    if (isCorrect) {
      // Speed scoring
      let basePoints = POINTS_SLOW;
      if (elapsed < FAST_THRESHOLD) basePoints = POINTS_FAST;
      else if (elapsed < NORMAL_THRESHOLD) basePoints = POINTS_NORMAL;

      // Streak multiplier (applies to current answer based on previous streak + 1)
      const newStreak = streak + 1;
      const tier = getStreakTier(newStreak);
      const mult = tier ? tier.mult : 1.0;
      const earned = Math.round(basePoints * mult);

      setScore(s => s + earned);
      setStreak(newStreak);
      setMaxStreak(m => Math.max(m, newStreak));
      setCorrectCount(c => c + 1);
      setPopup({ points: earned, mult, base: basePoints, key: Date.now() });
    } else {
      setStreak(0);
      setIncorrectCount(c => c + 1);
    }
  }, [selected, confirmed, currentQ, timeLeft, streak]);

  // ─── NEXT QUESTION ────────────────────────────────────────────────────────
  const nextQuestion = useCallback(() => {
    if (qIndex + 1 >= totalQ) {
      setMode("results");
      return;
    }
    setQIndex(i => i + 1);
    setSelected(null);
    setConfirmed(false);
    setTimeLeft(QUESTION_TIME);
    setAnswerTime(null);
    setPopup(null);
  }, [qIndex, totalQ]);

  // Auto-clear popup after animation
  useEffect(() => {
    if (!popup) return;
    const id = setTimeout(() => setPopup(null), 1500);
    return () => clearTimeout(id);
  }, [popup]);

  const animatedScore = useAnimatedNumber(score);

  const colors = filterBook !== "All Books"
    ? BOOK_COLORS[filterBook]
    : { bg:"#0d1117", accent:"#58a6ff", badge:"#1c2128" };

  const currentTier = getStreakTier(streak);

  // ─── MENU ────────────────────────────────────────────────────────────────
  if (mode === "menu") {
    return (
      <div style={{ minHeight:"100vh", background:"#0d1117", fontFamily:"Georgia, serif",
        display:"flex", flexDirection:"column", alignItems:"center",
        justifyContent:"center", padding:"24px 16px" }}>

        <div style={{ textAlign:"center", marginBottom:32 }}>
          <div style={{ fontSize:52, marginBottom:10 }}>📚</div>
          <h1 style={{ color:"#e6edf3", fontSize:26, fontWeight:700, margin:"0 0 6px" }}>
            Battle of the Books
          </h1>
          <p style={{ color:"#8b949e", fontSize:13, margin:0 }}>
            20-question rounds · 30s timer · streak bonuses
          </p>
        </div>

        <div style={{ width:"100%", maxWidth:440, marginBottom:28 }}>
          <p style={{ color:"#8b949e", fontSize:11, margin:"0 0 10px",
            textTransform:"uppercase", letterSpacing:1.5 }}>
            Select book or quiz all:
          </p>
          {allBooks.map(book => {
            const sel = filterBook === book;
            const col = book !== "All Books" ? BOOK_COLORS[book] : null;
            const count = book !== "All Books"
              ? ALL_QUESTIONS.filter(q => q.book === book).length
              : ALL_QUESTIONS.length;
            return (
              <button key={book} onClick={() => setFilterBook(book)} style={{
                width:"100%", textAlign:"left", padding:"12px 16px", marginBottom:8,
                borderRadius:10,
                border:`2px solid ${sel ? (col?.accent||"#58a6ff") : "#30363d"}`,
                background: sel ? (col?.badge||"#1c2128") : "#161b22",
                color: sel ? (col?.accent||"#58a6ff") : "#8b949e",
                fontSize:14, fontWeight:sel?700:400, cursor:"pointer",
                display:"flex", alignItems:"center", gap:10,
              }}>
                <span style={{ fontSize:20 }}>
                  {book !== "All Books" ? BOOK_ICONS[book] : "🎲"}
                </span>
                <span style={{ flex:1 }}>{book}</span>
                <span style={{ fontSize:12, opacity:0.6 }}>{count}q</span>
              </button>
            );
          })}
        </div>

        <button onClick={startQuiz} style={{
          background:"#1f6feb", color:"#fff", border:"none", borderRadius:12,
          padding:"14px 48px", fontSize:16, fontWeight:700, cursor:"pointer",
          boxShadow:"0 0 24px #1f6feb55",
        }}>
          Play Round →
        </button>
        <p style={{ color:"#30363d", fontSize:11, marginTop:14 }}>
          20 random questions · Answer fast for bonus points
        </p>
      </div>
    );
  }

  // ─── RESULTS SCREEN ───────────────────────────────────────────────────────
  if (mode === "results") {
    const accuracy = totalQ > 0 ? Math.round(correctCount/totalQ*100) : 0;
    let grade = "Try Again";
    let gradeColor = "#f85149";
    if (accuracy >= 90) { grade = "BATTLE READY"; gradeColor = "#f4c842"; }
    else if (accuracy >= 75) { grade = "Strong"; gradeColor = "#3fb950"; }
    else if (accuracy >= 50) { grade = "Getting There"; gradeColor = "#58a6ff"; }

    return (
      <div style={{ minHeight:"100vh", background:colors.bg, fontFamily:"Georgia, serif",
        display:"flex", flexDirection:"column", alignItems:"center",
        justifyContent:"center", padding:"24px 16px" }}>

        <div style={{ textAlign:"center", marginBottom:30 }}>
          <div style={{ fontSize:48, marginBottom:8 }}>
            {accuracy >= 90 ? "🏆" : accuracy >= 75 ? "🎯" : accuracy >= 50 ? "📚" : "💪"}
          </div>
          <div style={{ color:gradeColor, fontSize:18, fontWeight:700,
            letterSpacing:1.5, marginBottom:4 }}>{grade}</div>
          <div style={{ color:"#8b949e", fontSize:13 }}>Round Complete</div>
        </div>

        <div style={{ background:"#161b22", borderRadius:16, padding:"24px 28px",
          width:"100%", maxWidth:380, marginBottom:24 }}>

          <div style={{ textAlign:"center", marginBottom:24,
            paddingBottom:20, borderBottom:"1px solid #30363d" }}>
            <div style={{ color:"#8b949e", fontSize:11, letterSpacing:1.5,
              textTransform:"uppercase", marginBottom:6 }}>Final Score</div>
            <div style={{ color:colors.accent, fontSize:42, fontWeight:800,
              fontFamily:"system-ui, sans-serif" }}>{score.toLocaleString()}</div>
          </div>

          {[
            { label:"Correct", value:`${correctCount} / ${totalQ}`, color:"#3fb950" },
            { label:"Accuracy", value:`${accuracy}%`, color:gradeColor },
            { label:"Best Streak", value:`${maxStreak} ${getStreakTier(maxStreak)?.emoji || ""}`,
              color: getStreakTier(maxStreak) ? "#f4c842" : "#8b949e" },
          ].map(stat => (
            <div key={stat.label} style={{ display:"flex", justifyContent:"space-between",
              alignItems:"center", padding:"10px 0" }}>
              <span style={{ color:"#8b949e", fontSize:13 }}>{stat.label}</span>
              <span style={{ color:stat.color, fontSize:16, fontWeight:700 }}>{stat.value}</span>
            </div>
          ))}
        </div>

        <div style={{ display:"flex", gap:10, width:"100%", maxWidth:380 }}>
          <button onClick={() => setMode("menu")} style={{
            flex:1, padding:"14px", background:"#161b22",
            border:`1px solid ${colors.accent}44`,
            borderRadius:10, color:colors.accent,
            fontSize:14, fontWeight:600, cursor:"pointer",
          }}>← Menu</button>
          <button onClick={startQuiz} style={{
            flex:2, padding:"14px", background:colors.accent,
            border:"none", borderRadius:10, color:"#000",
            fontSize:15, fontWeight:700, cursor:"pointer",
            boxShadow:`0 0 24px ${colors.accent}55`,
          }}>🔁 Play Again</button>
        </div>
      </div>
    );
  }

  // ─── QUIZ ────────────────────────────────────────────────────────────────
  if (!currentQ) return null;

  const bc = BOOK_COLORS[currentQ.book];
  const isCorrect = selected === currentQ.correctIndex;
  const timerPct = (timeLeft / QUESTION_TIME) * 100;
  const timerColor = timeLeft > 20 ? "#3fb950"
    : timeLeft > 10 ? "#f4c842" : "#f85149";

  return (
    <div style={{ minHeight:"100vh", background:colors.bg, fontFamily:"Georgia, serif",
      padding:"12px 16px", transition:"background 0.4s" }}>

      {/* Top status bar */}
      <div style={{ maxWidth:640, margin:"0 auto 14px",
        display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <button onClick={() => setMode("menu")} style={{
          background:"transparent", border:`1px solid ${colors.accent}44`,
          borderRadius:8, padding:"6px 12px", color:colors.accent, fontSize:12, cursor:"pointer",
        }}>← Quit</button>

        {/* Streak indicator */}
        <div style={{
          padding:"6px 14px", borderRadius:20,
          background: currentTier ? `${currentTier === STREAK_TIERS[0] ? "#f4c842" : currentTier === STREAK_TIERS[1] ? "#a371f7" : "#f85149"}22` : "#161b22",
          border:`1px solid ${currentTier ? (currentTier === STREAK_TIERS[0] ? "#f4c842" : currentTier === STREAK_TIERS[1] ? "#a371f7" : "#f85149") : "#30363d"}`,
          display:"flex", alignItems:"center", gap:6,
          transform: currentTier ? "scale(1.05)" : "scale(1)",
          transition:"all 0.3s",
        }}>
          <span style={{ fontSize:16 }}>{currentTier?.emoji || "🎯"}</span>
          <span style={{
            color: currentTier ? (currentTier === STREAK_TIERS[0] ? "#f4c842" : currentTier === STREAK_TIERS[1] ? "#a371f7" : "#f85149") : "#8b949e",
            fontSize:13, fontWeight:700, fontFamily:"system-ui, sans-serif",
          }}>{streak}</span>
        </div>

        {/* Score */}
        <div style={{ textAlign:"right" }}>
          <div style={{ color:"#484f58", fontSize:10, letterSpacing:1 }}>SCORE</div>
          <div style={{ color:colors.accent, fontSize:18, fontWeight:800,
            fontFamily:"system-ui, sans-serif" }}>{animatedScore.toLocaleString()}</div>
        </div>
      </div>

      {/* Progress + Timer bar */}
      <div style={{ maxWidth:640, margin:"0 auto 16px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
          <span style={{ color:"#8b949e", fontSize:11, fontWeight:600 }}>
            Question {qIndex+1} / {totalQ}
          </span>
          <span style={{ color:timerColor, fontSize:12, fontWeight:700,
            fontFamily:"system-ui, sans-serif" }}>
            ⏱ {Math.max(0, timeLeft).toFixed(1)}s
          </span>
        </div>
        {/* Timer bar */}
        <div style={{ background:"#21262d", borderRadius:4, height:6 }}>
          <div style={{
            height:6, borderRadius:4, background:timerColor,
            width:`${Math.max(0, timerPct)}%`,
            transition:"width 0.1s linear, background 0.3s",
          }} />
        </div>
      </div>

      {/* Question card */}
      <div style={{ maxWidth:640, margin:"0 auto", position:"relative" }}>

        {/* Floating points popup */}
        {popup && (
          <div key={popup.key} style={{
            position:"absolute", top:-20, left:"50%",
            transform:"translateX(-50%)",
            color:"#f4c842", fontSize:popup.mult > 1 ? 28 : 22,
            fontWeight:800, fontFamily:"system-ui, sans-serif",
            textShadow:"0 0 12px #f4c84299",
            animation:"floatUp 1.5s ease-out forwards",
            pointerEvents:"none", zIndex:10,
            whiteSpace:"nowrap",
          }}>
            +{popup.points}
            {popup.mult > 1 && (
              <span style={{ fontSize:14, marginLeft:6, opacity:0.85 }}>
                ×{popup.mult}!
              </span>
            )}
          </div>
        )}

        <div style={{
          borderRadius:14, overflow:"hidden",
          border:`1px solid ${confirmed ? (isCorrect ? "#3fb950" : "#f85149") : "#30363d"}`,
          borderLeft:`4px solid ${bc.accent}`,
          background:"#161b22",
          transition:"border-color 0.3s",
        }}>
          {/* Book badge */}
          <div style={{ background:bc.badge, padding:"6px 14px",
            display:"flex", alignItems:"center", gap:8 }}>
            <span style={{ fontSize:14 }}>{BOOK_ICONS[currentQ.book]}</span>
            <span style={{ color:bc.accent, fontSize:11, fontWeight:700,
              letterSpacing:0.5, flex:1 }}>{currentQ.book}</span>
          </div>

          {/* Question text */}
          <div style={{ padding:"16px 18px 6px" }}>
            <p style={{ color:"#e6edf3", fontSize:15, lineHeight:1.55,
              margin:0, fontWeight:500 }}>
              {currentQ.q}
            </p>
          </div>

          {/* Choices */}
          <div style={{ padding:"12px 12px 14px", display:"flex",
            flexDirection:"column", gap:8 }}>
            {currentQ.choices.map((choice, ci) => {
              const isSelected = selected === ci;
              const isAnswer = ci === currentQ.correctIndex;

              let bg = "#0d1117";
              let border = "#30363d";
              let textColor = "#c9d1d9";
              let labelBg = "#21262d";
              let labelColor = "#8b949e";

              if (confirmed) {
                if (isAnswer) {
                  bg = "#0f2c18"; border = "#3fb950";
                  textColor = "#c9d1d9"; labelBg = "#3fb950"; labelColor = "#000";
                } else if (isSelected) {
                  bg = "#1e0f0f"; border = "#f85149";
                  textColor = "#c9d1d9"; labelBg = "#f85149"; labelColor = "#fff";
                } else {
                  textColor = "#484f58";
                }
              } else if (isSelected) {
                bg = bc.badge; border = bc.accent;
                textColor = "#e6edf3"; labelBg = bc.accent; labelColor = "#000";
              }

              const label = ["A","B","C","D"][ci];

              return (
                <button key={ci}
                  disabled={confirmed}
                  onClick={() => setSelected(ci)}
                  style={{
                    display:"flex", alignItems:"flex-start", gap:10,
                    padding:"11px 12px", borderRadius:8,
                    border:`1px solid ${border}`,
                    background:bg,
                    cursor:confirmed ? "default" : "pointer",
                    textAlign:"left", transition:"all 0.15s",
                  }}
                >
                  <span style={{
                    minWidth:24, height:24, borderRadius:6,
                    background:labelBg, color:labelColor,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontSize:12, fontWeight:700, flexShrink:0, marginTop:1,
                  }}>{label}</span>
                  <span style={{ color:textColor, fontSize:13.5, lineHeight:1.5 }}>
                    {choice}
                  </span>
                  {confirmed && isAnswer && (
                    <span style={{ marginLeft:"auto", color:"#3fb950",
                      fontSize:18, flexShrink:0 }}>✓</span>
                  )}
                  {confirmed && isSelected && !isAnswer && (
                    <span style={{ marginLeft:"auto", color:"#f85149",
                      fontSize:18, flexShrink:0 }}>✗</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Submit / Result */}
          <div style={{ padding:"0 12px 14px" }}>
            {!confirmed ? (
              <button
                disabled={selected === null}
                onClick={submitAnswer}
                style={{
                  width:"100%", padding:"12px",
                  background: selected !== null ? bc.accent : "#21262d",
                  border:"none", borderRadius:8,
                  color: selected !== null ? "#000" : "#484f58",
                  fontSize:14, fontWeight:700,
                  cursor: selected !== null ? "pointer" : "default",
                  transition:"all 0.15s",
                }}>
                {selected !== null ? "Submit" : "Pick an answer"}
              </button>
            ) : (
              <button onClick={nextQuestion} style={{
                width:"100%", padding:"12px",
                background: isCorrect ? "#0f2c18" : "#1e0f0f",
                border:`1px solid ${isCorrect ? "#3fb950" : "#f85149"}`,
                borderRadius:8,
                color: isCorrect ? "#3fb950" : "#f85149",
                fontSize:14, fontWeight:700, cursor:"pointer",
              }}>
                {isCorrect ? "✓ Correct!" : (timeLeft <= 0 ? "⏱ Time's up!" : "✗ Incorrect")}
                {" — "}
                {qIndex + 1 < totalQ ? "Next →" : "See Results →"}
              </button>
            )}
          </div>
        </div>

        {/* Quick stats footer */}
        <div style={{ display:"flex", justifyContent:"space-around",
          marginTop:14, padding:"10px",
          background:"#161b22", borderRadius:10 }}>
          <div style={{ textAlign:"center" }}>
            <div style={{ color:"#3fb950", fontSize:16, fontWeight:700,
              fontFamily:"system-ui, sans-serif" }}>{correctCount}</div>
            <div style={{ color:"#484f58", fontSize:10 }}>CORRECT</div>
          </div>
          <div style={{ textAlign:"center" }}>
            <div style={{ color:"#f85149", fontSize:16, fontWeight:700,
              fontFamily:"system-ui, sans-serif" }}>{incorrectCount}</div>
            <div style={{ color:"#484f58", fontSize:10 }}>MISSED</div>
          </div>
          <div style={{ textAlign:"center" }}>
            <div style={{ color: maxStreak >= 3 ? "#f4c842" : "#8b949e",
              fontSize:16, fontWeight:700, fontFamily:"system-ui, sans-serif" }}>
              {maxStreak}
            </div>
            <div style={{ color:"#484f58", fontSize:10 }}>BEST STREAK</div>
          </div>
        </div>
      </div>

      {/* CSS keyframes */}
      <style>{`
        @keyframes floatUp {
          0%   { opacity: 0; transform: translate(-50%, 10px) scale(0.8); }
          15%  { opacity: 1; transform: translate(-50%, 0) scale(1.1); }
          80%  { opacity: 1; transform: translate(-50%, -30px) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -50px) scale(0.95); }
        }
      `}</style>
    </div>
  );
}
