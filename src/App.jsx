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
  // THE LABORS OF HERCULES BEAL — sourced from the text
  // ══════════════════════════════════════════════════════
  { id:1, book:"The Labors of Hercules Beal",
    q:"What does Hercules's brother Achilles say about Truro after living abroad?",
    choices:[
      "Hercules thinks Achilles probably feels living in Truro after Brussels, Sydney, Beijing, Barcelona, New Delhi, Cairo, and Johannesburg is \"like dying a little every day\"",
      "Achilles tells Hercules straight out that he misses traveling and resents being stuck home",
      "Achilles tells Viola one night that Truro feels smaller now than when he left",
      "Hercules overhears Achilles saying he can't wait until Hercules is old enough to go to college",
    ], answer:0 },

  { id:2, book:"The Labors of Hercules Beal",
    q:"What magazine did Achilles write for before moving home?",
    choices:[
      "Both Smithsonian Magazine and National Geographic — Hercules adds that those are \"the part in those magazines that nobody buys the magazine because of\"",
      "Just National Geographic — Achilles was a contracted travel writer for them for six years",
      "The Atlantic and Smithsonian Magazine — he covered cultural stories on assignment",
      "Time and National Geographic — he was their youngest foreign correspondent",
    ], answer:0 },

  { id:3, book:"The Labors of Hercules Beal",
    q:"How does Hercules's morning walk to the Dune begin?",
    choices:[
      "He leaves in the dark, closes the screen door quietly so Achilles won't hear, and passes the Rigbys', the Bontemps's, and the Kerrs' houses before reaching the Dune",
      "He waits until just after sunrise, then walks straight from the back door of the nursery toward the beach",
      "He gets up before Achilles, eats cereal alone, and rides his bike to the base of the Dune",
      "He sneaks out the back window so the screen door won't wake Mindy",
    ], answer:0 },

  { id:4, book:"The Labors of Hercules Beal",
    q:"What does Hercules say when the sun rises each morning at the top of the Dune?",
    choices:[
      "\"Morning, Mom\" and \"Morning, Dad\"",
      "\"I'm still here\" — once for each parent",
      "He recites a line from one of his father's favorite hymns",
      "He doesn't speak — he just watches the light hit the water",
    ], answer:0 },

  { id:5, book:"The Labors of Hercules Beal",
    q:"How did Hercules get his dog Mindy?",
    choices:[
      "She wandered up to him and Elly on the beach, planted herself between Hercules and Viola's looming presence, and dropped onto their blanket — Elly named her Mindy on the spot",
      "Achilles bought her for him from a shelter the summer before seventh grade as a peace offering",
      "She was a stray that started showing up at the Beal Brothers Farm and Nursery, and the family slowly adopted her",
      "A customer asked the Beals to take her in when they moved off-Cape, and Hercules immediately bonded with her",
    ], answer:0 },

  { id:6, book:"The Labors of Hercules Beal",
    q:"What is Lieutenant Colonel Hupfer's first name and former rank?",
    choices:[
      "Daniel Hupfer — retired lieutenant colonel from the United States Marine Corps",
      "Donald Hupfer — retired colonel from the United States Army",
      "David Hupfer — retired lieutenant from the United States Marine Corps",
      "Daniel Hopper — retired major from the United States Marine Corps",
    ], answer:0 },

  { id:7, book:"The Labors of Hercules Beal",
    q:"What is Hercules's year-long Classical Mythology Application Project assignment?",
    choices:[
      "Perform modern versions of the twelve Labors of Hercules and write 150-word reflections on each",
      "Read the Twelve Labors and write a single 1,200-word essay analyzing them",
      "Draw twelve illustrations of the Labors and present them at the year-end exhibition",
      "Memorize all twelve Labors in order and recite them aloud at the end of the year",
    ], answer:0 },

  { id:8, book:"The Labors of Hercules Beal",
    q:"What does Lieutenant Colonel Hupfer whisper to Hercules — and only Hercules — after assigning him the labors?",
    choices:[
      "\"But I think you already know that.\" — followed by \"Not that I care.\"",
      "\"You'll find these are about you more than the myth.\"",
      "\"Your parents would have wanted you to do this.\"",
      "\"The last labor is the one that matters.\"",
    ], answer:0 },

  { id:9, book:"The Labors of Hercules Beal",
    q:"What does the Cape Cod Academy for Environmental Sciences contain that astonishes Hercules on orientation night?",
    choices:[
      "Mynah birds in the lobby that call out students' names; saltwater tanks down the South Hall; reptile cages in the Arboretum; a glass-roofed central garden with hummingbirds and goldfish",
      "A working aquaponics farm in the basement with fish that supply nutrients to plants growing above",
      "A miniature beach inside the main lobby where students study tide pools",
      "A rooftop observatory with a telescope and a planetarium dome",
    ], answer:0 },

  { id:10, book:"The Labors of Hercules Beal",
    q:"Who is Henry Sugimoto and what does he do that earns Lieutenant Colonel Hupfer's attention on the first day?",
    choices:[
      "A classmate who answers \"You couldn't hack it anymore?\" when Hupfer asks if anyone knows what retiring from the Marine Corps means",
      "A boy who refuses to say \"Lieutenant Colonel\" because he's a pacifist",
      "A new student who arrives late and tries to sit in Hercules's assigned desk",
      "The kid next to Hercules who almost pees his pants when Hupfer enters the room",
    ], answer:0 },

  { id:11, book:"The Labors of Hercules Beal",
    q:"What is \"Fort Desk\"?",
    choices:[
      "The nickname for Lieutenant Colonel Hupfer's enormous teacher's desk, which he occasionally sits on top of",
      "The Academy's name for the principal's office because no student wants to be sent there",
      "A wood-and-rope structure in the Arboretum where younger kids hide during recess",
      "Hercules's nickname for his own desk after he buries his face in it on bad days",
    ], answer:0 },

  { id:12, book:"The Labors of Hercules Beal",
    q:"For his first labor (the Nemean Lion), what does Hercules end up helping with?",
    choices:[
      "Mrs. Savage struggling with a heavy baboon statue at sunrise — they reposition it to face \"a little past due east\"",
      "Lifting an injured deer off the road into Achilles's pickup truck so it can be taken to a vet",
      "Catching the Ugly Cat Pack's leader so it can be tagged and released by Animal Control",
      "Pulling Mr. Moby's school bus out of a sand drift in the early morning",
    ], answer:0 },

  { id:13, book:"The Labors of Hercules Beal",
    q:"What name does Hercules give Mrs. Savage's baboon statue, and what does she say about the choice?",
    choices:[
      "Eleanor — Mrs. Savage replies, \"That's a good name. Eleanor it is.\"",
      "Atlas — Mrs. Savage laughs and says it's perfect since the statue is holding up the sky",
      "Hippo — Mrs. Savage says he can't name a baboon \"Hippo\" and renames it Bessie",
      "Mom — Mrs. Savage doesn't say anything at all in response",
    ], answer:0 },

  { id:14, book:"The Labors of Hercules Beal",
    q:"How does Lieutenant Colonel Hupfer catch Hercules trying to inflate his word counts?",
    choices:[
      "Hercules used \"really really,\" expanded \"couldn't\" to \"could not,\" and added his own name to the word count — Hupfer docks him 175 words on the next reflection",
      "Hercules copy-pasted a paragraph from the Anthon dictionary verbatim and Hupfer recognized it",
      "Hercules turned in the same paragraph from his first reflection twice, hidden in different paragraphs",
      "Hercules wrote his reflections in tiny handwriting to make them look longer than they were",
    ], answer:0 },

  { id:15, book:"The Labors of Hercules Beal",
    q:"What ridiculously long title does Hercules use for the dusty book he must read at the library?",
    choices:[
      "Anthon's A Classical Dictionary: Containing an Account of the Principal Proper Names Mentioned in Ancient Authors and Intended to Elucidate All the Important Points Connected with the Geography, History, Biography, Mythology, and Fine Arts of the Greeks and Romans, Together with an Account of Coins, Weights, and Measures with Tabular Values of the Same",
      "Anthon's Encyclopedia of Greek and Roman Mythology, Geography, Biography, History, Fine Arts, and Other Topics",
      "Hamilton's The Greek and Roman Myths Retold for the Modern Reader, with an Index of Proper Names",
      "The Complete Greek Mythology for Curious Schoolchildren and Their Patient Teachers",
    ], answer:0 },

  { id:16, book:"The Labors of Hercules Beal",
    q:"What is Hercules's prank-marketing scheme with Henry to find a \"perfect specimen\" tree, and what goes wrong?",
    choices:[
      "Henry plasters Truro with signs advertising \"the first perfect sugar maple on Cape Cod\" at 4:00 PM at Elly's house — a huge crowd shows up but Cape Cod fog rolls in right at four",
      "They post photos of a rare beech tree online claiming it grows on Hercules's property, then have to find a real one to match the photo",
      "They tell their class a pumpkin patch has a \"perfect\" pumpkin growing in it, then are mobbed by leaf-peepers",
      "Henry sells tickets to view a rare elm in Elly's yard and pockets the money before the tree turns out to be ordinary",
    ], answer:0 },

  { id:17, book:"The Labors of Hercules Beal",
    q:"What happens during the November storm that becomes Hercules's Erymanthian Boar labor?",
    choices:[
      "Mrs. Neal is trapped in her partially-collapsed beach house — Hercules and Achilles climb into the hole and pull her out as the house rises with each wave",
      "A neighbor's boat breaks loose and Hercules has to wade into the surf to keep it from smashing other boats",
      "The Beal greenhouse roof tears open and Hercules saves the entire seedling supply by himself",
      "Mr. Moby's bus gets stuck and Hercules pushes it free with help from Achilles and Viola",
    ], answer:0 },

  { id:18, book:"The Labors of Hercules Beal",
    q:"What does Lieutenant Colonel Hupfer reveal that Achilles does every morning that Hercules thinks is secret?",
    choices:[
      "Achilles is always awake watching for Hercules to come back from the Dune, to make sure he's okay",
      "Achilles has been quietly leaving a thermos of hot cocoa by the back door for Hercules's return",
      "Achilles has been emailing Hercules's teachers updates on how he's coping each week",
      "Achilles has been keeping a journal of every morning Hercules climbs the Dune, dated and timed",
    ], answer:0 },

  { id:19, book:"The Labors of Hercules Beal",
    q:"What do Hercules and Elly do to help when the Academy building is condemned after the storm?",
    choices:[
      "Elly suggests using the Beal Brothers Farm and Nursery — the two barns, greenhouses, Front Building, and Elijah's empty house — and the school reopens nine days later",
      "They organize a fundraiser at Mrs. Savage's house that pays for a temporary modular classroom",
      "Hercules and Elly clean out the back rooms of the Truro Public Library so classes can meet there",
      "They convince the church to lease their basement to the school for the rest of the year",
    ], answer:0 },

  { id:20, book:"The Labors of Hercules Beal",
    q:"Why is Mr. Moby's name important, and what does he ultimately do that surprises Hercules?",
    choices:[
      "He is the Truro school bus driver who took down the Kerrs' gazebo when he bought the house; later, he invites Hercules to help him trap coyotes at night",
      "He runs the post office and refuses to deliver to Beal Brothers Farm and Nursery because of an old feud",
      "He is the principal of Truro Middle who blacklists Achilles from school events",
      "He owns the local hardware store and gives Hercules a job no one else would offer",
    ], answer:0 },

  { id:21, book:"The Labors of Hercules Beal",
    q:"What does Hercules do when Mr. Moby hands him a loaded shotgun and tells him to shoot the trapped coyotes?",
    choices:[
      "Hercules gives the gun back, tells Mr. Moby to remove the shells, sits by the coyotes all night, and they drive the cages to Animal Control the next morning to be transported to northern Maine",
      "Hercules shoots one and freezes for the second, then breaks down crying — Mr. Moby finishes the job",
      "Hercules pretends to take the shotgun but unloads it secretly, then lets the coyotes go himself when Mr. Moby leaves",
      "Hercules refuses to come out from behind the stone wall and Mr. Moby shoots both himself",
    ], answer:0 },

  { id:22, book:"The Labors of Hercules Beal",
    q:"What does Lieutenant Colonel Hupfer share personally in his comment on the coyote reflection?",
    choices:[
      "About a childhood friend who gave away a Joe Pepitone jacket to a kid he didn't like much because that kid was beat up and moving away — and who later died in a car accident",
      "That he himself was raised by his grandmother because his parents were killed when he was Hercules's age",
      "That his own parents died in a hunting accident that involved a misfired shotgun",
      "That he had two coyotes once kill his dog, and learned to hate them — but Hercules's choice has changed his mind",
    ], answer:0 },

  { id:23, book:"The Labors of Hercules Beal",
    q:"After his fight with Ty Malcolm over a cruel \"orphan\" remark, what does Lieutenant Colonel Hupfer tell Hercules about anger?",
    choices:[
      "That none of Hupfer's combat medals were won while he was angry — and that the difference is being angry vs. acting when you're angry",
      "That anger gives you strength, but only if you can aim it precisely the way a marine learns to aim a rifle",
      "That every soldier eventually has to choose: be ruled by anger, or rule it — and Hercules is choosing now",
      "That all Hupfer's medals were won while angry, and that's exactly why he warns against it",
    ], answer:0 },

  { id:24, book:"The Labors of Hercules Beal",
    q:"Why does Hercules call Viola \"the Vampire\" throughout most of the book, and what does he finally admit to her?",
    choices:[
      "Because she wears only black with red lipstick, holds a black umbrella in daylight, and has long black hair — he admits he calls her that \"so it wouldn't matter if we lost you too\"",
      "Because she eats nothing but raw red meat and refuses sunlight — he admits she has become like a second sister to him",
      "Because she came into Achilles's life when he was at his lowest point — he admits she has actually saved them",
      "Because of her family's old reputation in Truro — he admits she has nothing to do with their past",
    ], answer:0 },

  { id:25, book:"The Labors of Hercules Beal",
    q:"What do the three granite posts Viola arranges in front of the house represent?",
    choices:[
      "Two straight posts are Achilles and Viola; the third, angled toward them, is Hercules — \"pushing the other two together\"",
      "Achilles, Viola, and Hercules each as separate but equal members of one family",
      "The three Beal generations: Hercules's grandparents, parents, and Hercules himself",
      "Hercules's mother, father, and a third post left blank for the future",
    ], answer:0 },

  { id:26, book:"The Labors of Hercules Beal",
    q:"What does Elly tell Hercules from Ohio that makes him feel like he's gone to hell?",
    choices:[
      "That she isn't coming home — her parents' trial separation isn't working and they're not getting back together",
      "That her mother has remarried and they are moving permanently to Cleveland",
      "That she has met a boy in Ohio she likes and isn't sure she misses Hercules the same way",
      "That her father has died and she has to stay in Ohio for the funeral and beyond",
    ], answer:0 },

  { id:27, book:"The Labors of Hercules Beal",
    q:"How does Hercules secretly admit responsibility for his parents' deaths in his Atlas reflection?",
    choices:[
      "He says that if he hadn't been a jerkface and refused to go with them to deliver Mrs. Kinnamon's flowers, he might have seen the truck and yelled and his father could have swerved",
      "He says he distracted his father at breakfast with a stupid question and made them late",
      "He says he forgot to remind his father to check the tire pressure that morning",
      "He says he begged for them to bring him along, and his weight in the truck made it harder to steer",
    ], answer:0 },

  { id:28, book:"The Labors of Hercules Beal",
    q:"What is Hercules's twelfth and final labor (Cerberus) in the book?",
    choices:[
      "Achilles's pickup crashes — the axle slips and Achilles is thrown through the windshield, saved only by a guardrail catching his knees",
      "Hercules has to descend into the basement of Elijah's house to retrieve old family photos for the new memorial",
      "Mindy disappears into a storm drain after a coyote chase and Hercules has to crawl in after her",
      "Lieutenant Colonel Hupfer has Hercules give the year-end keynote presentation alone in front of the entire school",
    ], answer:0 },

  // ══════════════════════════════════════════════════════
  // COYOTE LOST AND FOUND — sourced from the text
  // ══════════════════════════════════════════════════════
  { id:29, book:"Coyote Lost and Found",
    q:"What is Coyote's legal first name, and what is her father's name?",
    choices:[
      "Her legal name is Ella; she calls her father Rodeo because that's what he likes to be called",
      "Her legal name is Coyote; her father's legal name is Rodeo and always was",
      "Her legal name is Ella; her father's legal name is Robert, but everyone calls him Rod",
      "Her legal name is Annabelle; her father goes by Rodeo because of his bull-riding past",
    ], answer:0 },

  { id:30, book:"Coyote Lost and Found",
    q:"What is the name of the bus and what does Coyote describe about its interior?",
    choices:[
      "Yager — they took out all seats except the first two rows, bolted in a couch, shelves, and a big chair they call the Throne; Coyote has a room in the back with a bed and a curtain for a door",
      "Maybellene — a converted shuttle with fold-down bunks and a fold-out kitchen table",
      "Bonnie — a converted Greyhound with the entire back third walled off as Rodeo's bedroom",
      "Wandering Annie — a 1970s school bus with a wood-burning stove in the back",
    ], answer:0 },

  { id:31, book:"Coyote Lost and Found",
    q:"How does Coyote first find the secret box on the bus?",
    choices:[
      "Her cat Ivan rubs her elbow as she reaches behind the bookshelf for a dropped Kahlil Gibran book — her hand grabs the box instead",
      "She is cleaning under the couch and her broom hits something solid jammed in the corner",
      "Rodeo accidentally leaves it on the table after a walkabout and she opens it before he gets home",
      "Ivan knocks it off a high shelf in Yager and the latches pop open when it hits the floor",
    ], answer:0 },

  { id:32, book:"Coyote Lost and Found",
    q:"What does Coyote describe seeing inside the box that confirms what she thought?",
    choices:[
      "Mostly full of gritty gray dust — but \"it wasn't dust in the secret box. It was ash.\" She whispers, \"Hi, Mom.\"",
      "A folded photograph of her mother and two sisters, plus a single locket with hair inside",
      "Letters her mother wrote to her father in college, tied with a faded blue ribbon",
      "Her mother's wedding ring resting on top of carefully folded clothing items",
    ], answer:0 },

  { id:33, book:"Coyote Lost and Found",
    q:"In what book had Coyote's mother written where she wanted her ashes scattered, and what does Coyote remember doing with it?",
    choices:[
      "Red Bird by Mary Oliver — Coyote accidentally dropped it off at a thrift or used bookstore during their travels the previous summer",
      "A leather journal her mother kept on the road — Coyote left it at a gas station in Kansas",
      "An old hymn book her mother sang from as a child — Coyote sold it at a yard sale in Missouri",
      "A photo album with handwritten notes — Coyote accidentally threw it out with magazines in Maine",
    ], answer:0 },

  { id:34, book:"Coyote Lost and Found",
    q:"What three questions does Rodeo ask everyone before they're allowed on the bus?",
    choices:[
      "What's your favorite book, your favorite place in the world, and your favorite sandwich?",
      "What's your favorite song, your favorite place in the world, and your favorite sandwich?",
      "What's your favorite book, your favorite memory, and your favorite road trip story?",
      "Where are you from, where are you going, and what's your favorite snack?",
    ], answer:0 },

  { id:35, book:"Coyote Lost and Found",
    q:"How does Candace answer the three bus questions, and how does Coyote react?",
    choices:[
      "Favorite book: a magazine (Popular Science); favorite place: a bar in Portland with great Thai food; favorite sandwich: sloppy joes — Coyote calls them \"the worst three answers I've ever heard\"",
      "Favorite book: any cookbook; favorite place: her own kitchen; favorite sandwich: BLT — Coyote silently agrees with most but pretends to be appalled",
      "Favorite book: To Kill a Mockingbird; favorite place: Coyote's bus; favorite sandwich: PB&J — Coyote thinks she's sucking up",
      "Favorite book: Where the Wild Things Are; favorite place: home; favorite sandwich: tuna melt — Coyote rolls her eyes but lets her on",
    ], answer:0 },

  { id:36, book:"Coyote Lost and Found",
    q:"What is a \"D.E.A.D. Dream\"?",
    choices:[
      "Drop Everything And Drive — when one of them gets a hankering for something, they hit the road for it no matter how far",
      "Drive Eat And Discover — picking a random restaurant in a town they've never been to",
      "Day's End And Done — the family rule about always stopping the bus before sunset",
      "Don't Even Ask, Drive — Rodeo's term for when Coyote has had enough of school and needs to leave",
    ], answer:0 },

  { id:37, book:"Coyote Lost and Found",
    q:"Who is Wally and where do they pick him up?",
    choices:[
      "A skinny older Asian American man in a wrinkly suit, eating tater tots in the rain outside the Denver restaurant where they stopped",
      "A homeless veteran they find at a rest stop outside Cheyenne",
      "An old friend of Rodeo's they pick up in Salvador's neighborhood",
      "A traveling musician they meet at a campground in Kansas",
    ], answer:0 },

  { id:38, book:"Coyote Lost and Found",
    q:"What's Wally's variation on a D.E.A.D. Dream, and what brought him to Denver?",
    choices:[
      "A D.E.A.R. Dream — Drop Everything And Ride — he took the train from Reno because he read the tater tots were the best in Colorado",
      "He doesn't have a name for it but came to Denver for a Bob Dylan tribute concert",
      "He drove the whole way from Oregon to see his daughter who lives nearby",
      "He calls it \"chasing a thought\" — he came to Denver because his late wife loved the mountains",
    ], answer:0 },

  { id:39, book:"Coyote Lost and Found",
    q:"What does Coyote bring Wally after he is the victim of a racist attack, and what does Wally say sandwiches really are?",
    choices:[
      "A Reuben sandwich with corned beef (not pastrami); Wally tells her \"it's not the sandwich that matters, Coyote. It's someone bringing you the sandwich.\"",
      "A bowl of pho she found at a Vietnamese restaurant nearby; Wally cries and tells her the broth tastes like his mother's",
      "A Thai chicken sandwich from the same parking lot where they met; Wally jokes that she's trying to fatten him up",
      "A meatloaf sandwich she made herself in the bus; Wally tells her it's the best meal he's had in years",
    ], answer:0 },

  { id:40, book:"Coyote Lost and Found",
    q:"What does Coyote remember on a quiet morning that her mother once said to her?",
    choices:[
      "Walking through apple orchards in spring when rain made blossoms fall — her mother whispered \"Listen. Look. It's raining flowers.\"",
      "Sitting on the porch swing watching fireflies — her mother whispered \"They're tiny stars we get to keep.\"",
      "Riding in the car at night — her mother told her the city lights were \"the wishes everyone is making at once.\"",
      "Eating ice cream at the beach — her mother said \"Days like this don't need anything added to them.\"",
    ], answer:0 },

  { id:41, book:"Coyote Lost and Found",
    q:"Which seven cities did Coyote map out as possible places she might have dropped the book?",
    choices:[
      "Cheyenne WY, Emporia KS, Chillicothe MO, West Lafayette IN, Pittsburgh PA, Freeport ME, Bel Air MD",
      "Cheyenne WY, Boulder CO, St. Louis MO, Indianapolis IN, Philadelphia PA, Portland ME, Baltimore MD",
      "Denver CO, Topeka KS, Springfield MO, Indianapolis IN, Pittsburgh PA, Bangor ME, Annapolis MD",
      "Cheyenne WY, Kansas City KS, Joplin MO, Bloomington IN, Pittsburgh PA, Augusta ME, Baltimore MD",
    ], answer:0 },

  { id:42, book:"Coyote Lost and Found",
    q:"How does Rodeo misinterpret Coyote's secret mission, and how does she handle it?",
    choices:[
      "He thinks her mother planned the whole journey as a \"quest\" rather than just naming a place — Coyote just nods rather than correcting him because \"a nod is not a speak\"",
      "He thinks Coyote knows the destination and is keeping it as a surprise gift — Coyote plays along and pretends to navigate",
      "He believes Candace is secretly the reason for the whole trip — Coyote uses this as cover for her real searches",
      "He thinks the trip is a graduation gift for Coyote leaving sixth grade — Coyote lets him believe it without comment",
    ], answer:0 },

  { id:43, book:"Coyote Lost and Found",
    q:"What does Cal from One More Time Books in Freeport, Maine, tell Coyote on the voicemail callback?",
    choices:[
      "Good news — the book isn't there and never was; he saved her a drive across the country",
      "Bad news — the book had been there but he sold it last week to a tourist",
      "Good news — he found the book in a box in the back room and is mailing it to her",
      "He doesn't recognize the title but checks the computer while she's on the line",
    ], answer:0 },

  { id:44, book:"Coyote Lost and Found",
    q:"How does Coyote break her wrist?",
    choices:[
      "She breaks into the closed Pittsburgh thrift store at night, falls forward onto a desk, and lands on her face — getting a pink cast and a black eye",
      "She slips climbing onto the bus roof to escape Candace's lecture in the rain outside the motel",
      "She gets between Rodeo and Wally during an argument and is shoved against a counter",
      "She falls off Yager's back step while running to chase Ivan during a rest stop",
    ], answer:0 },

  { id:45, book:"Coyote Lost and Found",
    q:"During the ride home from the Pittsburgh hospital, what is Coyote mad about?",
    choices:[
      "Rodeo for hiding the ashes, herself for losing the book, kids at school for not liking her, Candace for being there, Salvador for having other friends, her mom for dying, and her sisters for dying",
      "Just Candace — for taking over Rodeo's attention and ruining the whole trip",
      "Just herself — for thinking she could pull off the secret mission without telling anyone the truth",
      "Just Salvador — for being more popular and not understanding what she was going through",
    ], answer:0 },

  { id:46, book:"Coyote Lost and Found",
    q:"After Coyote kicks Candace off the bus and immediately regrets it, what does she look at when she finally wakes up that helps her change course?",
    choices:[
      "Her childhood memory box on her bookshelf — buried in the park with her mother and sisters before they died, full of pictures, drawings, locks of hair, and notes",
      "A photograph of her sisters that had fallen behind her bed",
      "A handwritten letter from her mother she'd hidden inside her pillowcase",
      "The Polaroid of her old family table that she keeps taped above her bunk",
    ], answer:0 },

  { id:47, book:"Coyote Lost and Found",
    q:"How does Rodeo accidentally find the exact bookstore where Red Bird ended up?",
    choices:[
      "Coyote shows him an internet image of the book; Rodeo pinches in and recognizes the tape they put on the pages — the same exact copy is for sale at Beach Reads in Griffin Bay, Ohio",
      "Wally remembers passing a bookstore matching Coyote's description on the same train route",
      "Candace's app pings them with a notification that a Mary Oliver poetry book was listed online nearby",
      "Salvador's mother calls to say her cousin saw the book at a stoop sale in Indianapolis",
    ], answer:0 },

  { id:48, book:"Coyote Lost and Found",
    q:"Who has the book when they get to Griffin Bay, and how did she come to have it?",
    choices:[
      "Doreen — Jeffrey the bookstore owner gave it to her as a gift because her sister had died of Covid and her sister loved Mary Oliver",
      "Mr. Greer — a regular at the bookstore who bought it for his wife's birthday last week",
      "A teenage girl named Mae — who picked it as a random graduation present from herself",
      "Nobody — the store owner had set it aside after Coyote called and forgot to mention it",
    ], answer:0 },

  { id:49, book:"Coyote Lost and Found",
    q:"What did Coyote's mother write next to her chosen Mary Oliver poem, and how does Rodeo explain the count?",
    choices:[
      "\"I love you. I love you. I love you. I love you.\" — one for Rodeo, one for the little sister, one for the big sister, and one for Coyote",
      "\"For Rodeo and my girls, always.\" — with three small heart drawings beside it",
      "\"Find the pond.\" — the only clue she ever left them",
      "\"Wherever you are, I'm with you.\" — written four times in different colors of ink",
    ], answer:0 },

  { id:50, book:"Coyote Lost and Found",
    q:"What five words did Coyote's mother lightly underline in the poem \"Mornings at Blackwater\"?",
    choices:[
      "\"So come to the pond\" — leading them to the small lake the family used to picnic at, which they called \"our pond\"",
      "\"Drink from the river of joy\" — meaning they should scatter her ashes at her favorite spot on the Mississippi",
      "\"Walk into the world quietly\" — meaning a private burial without any ceremony at all",
      "\"Be alive among the leaves\" — meaning the forest behind their old house",
    ], answer:0 },

  // ══════════════════════════════════════════════════════
  // EL DEAFO
  // ══════════════════════════════════════════════════════
  { id:51, book:"El Deafo",
    q:"What real-life author wrote and illustrated El Deafo, and what is the book based on?",
    choices:[
      "Cece Bell — based on her own childhood losing her hearing at age 4 to meningitis",
      "Cece Bell — based on her sister's experience with hearing loss in elementary school",
      "Raina Telgemeier — based on a deaf friend Raina grew up with",
      "Victoria Jamieson — based on her grandfather's experience growing up deaf",
    ], answer:0 },

  { id:52, book:"El Deafo",
    q:"At what age does Cece lose her hearing in the book?",
    choices:[
      "Four years old, from meningitis",
      "Six years old, from a fever during a long illness",
      "Two years old, from complications of an ear infection",
      "Seven years old, from a severe case of mumps",
    ], answer:0 },

  { id:53, book:"El Deafo",
    q:"Why does Cece Bell draw all the characters in El Deafo as rabbits?",
    choices:[
      "Rabbits have big ears that are emphasized — fitting for a book about hearing and being noticed",
      "Rabbits were her favorite animal as a child",
      "Her mother had been a rabbit breeder so they were a familiar image",
      "The publisher suggested it to make the book more approachable for young readers",
    ], answer:0 },

  { id:54, book:"El Deafo",
    q:"What is the name of the bulky hearing aid Cece wears at school, and where does she keep it?",
    choices:[
      "The Phonic Ear — she wears it in a harness on her chest, with wires connecting to her ear molds",
      "The Audi-Mate — clipped to her belt with a single wire to one ear",
      "The Sound Box — strapped to her upper back with the speaker resting on her shoulder",
      "The Ear-Phone — worn like a small backpack with headphones",
    ], answer:0 },

  { id:55, book:"El Deafo",
    q:"How does the Phonic Ear become Cece's secret superpower?",
    choices:[
      "Because her teacher wears a microphone, Cece can hear the teacher even when the teacher is in the bathroom or down the hall",
      "It lets her hear thoughts other people are thinking near her",
      "It picks up radio signals and she eavesdrops on local broadcasts",
      "It boosts her ability to hear whispers across the entire classroom",
    ], answer:0 },

  { id:56, book:"El Deafo",
    q:"What superhero identity does Cece invent for herself?",
    choices:[
      "El Deafo — a caped hero who can hear from anywhere thanks to her Phonic Ear",
      "Super Ears — a hero with giant rabbit ears who saves classmates from danger",
      "The Listener — a quiet hero who knows everyone's secrets",
      "Bunny Hero — a generic superhero version of herself in costume",
    ], answer:0 },

  { id:57, book:"El Deafo",
    q:"Who is Laura, Cece's first close friend after moving to the new school?",
    choices:[
      "A bossy girl who treats Cece like a project and tells her what to do",
      "A sweet, shy girl who learns sign language to talk to Cece",
      "A girl who lives next door and shares all the same TV shows Cece loves",
      "A girl from Cece's old neighborhood who happens to attend the same school",
    ], answer:0 },

  { id:58, book:"El Deafo",
    q:"Who is Ginny, and what is the main thing that frustrates Cece about her?",
    choices:[
      "A friend who tries so hard to be helpful that she talks too slowly and loudly, exaggerating mouth movements — making Cece feel like a baby",
      "A friend who refuses to face Cece when she talks, so Cece can't read her lips",
      "A friend who keeps trying to learn sign language and gets it wrong constantly",
      "A friend who pretends not to know Cece is deaf and won't acknowledge her hearing aid",
    ], answer:0 },

  { id:59, book:"El Deafo",
    q:"What event leads to Cece's biggest argument with Martha?",
    choices:[
      "Cece falls off Martha's bunk bed and her hearing aid breaks; Martha runs off when Cece's eye is bleeding",
      "Martha tells the whole class about Cece's hearing aid without asking",
      "Martha invites everyone but Cece to her birthday party",
      "Martha breaks Cece's Phonic Ear on purpose during an argument",
    ], answer:0 },

  { id:60, book:"El Deafo",
    q:"Who is Mike Miller, and what is his role in the story?",
    choices:[
      "A boy Cece develops a crush on — she's both excited and embarrassed by her feelings for him",
      "A new student who also has a hearing aid and helps Cece feel less alone",
      "Cece's older brother who teases her about her superhero identity",
      "Her speech therapist's son who befriends her outside of therapy",
    ], answer:0 },

  { id:61, book:"El Deafo",
    q:"What happens at the slumber party that becomes a turning point for Cece?",
    choices:[
      "She has to sleep without her hearing aid and feels completely cut off from the other girls",
      "Another girl makes fun of her hearing aid and Cece runs home in tears",
      "She invents the El Deafo superhero name while telling stories around a flashlight",
      "Her hearing aid gets soaked in spilled punch and she panics",
    ], answer:0 },

  { id:62, book:"El Deafo",
    q:"What does Cece's teacher Mrs. Lufton do that surprises Cece during class?",
    choices:[
      "Forgets to take off the microphone and walks into the bathroom — Cece hears it all and shares it with classmates, becoming a kind of hero",
      "Announces Cece's hearing loss to the class without warning her",
      "Asks Cece to teach the class basic sign language during a special lesson",
      "Pairs Cece with her worst enemy for a major group project",
    ], answer:0 },

  { id:63, book:"El Deafo",
    q:"What does Cece's mother insist on doing that embarrasses Cece?",
    choices:[
      "Taking her to a sign language class with mostly deaf kids — Cece feels out of place because she was raised speaking",
      "Wearing matching outfits to every parent-teacher conference",
      "Sending her to a special summer camp for deaf children every year",
      "Always speaking very loudly in public so Cece can hear",
    ], answer:0 },

  { id:64, book:"El Deafo",
    q:"What is the \"True Friend\" question Cece is wrestling with throughout the book?",
    choices:[
      "Whether a true friend is someone who doesn't make her feel different — and how to find one when so many people focus on her hearing aid",
      "Whether she should reveal her superhero identity to her best friend",
      "Whether she can keep being friends with hearing kids when she goes to a deaf school",
      "Whether her friends will stay loyal when they grow up and move away",
    ], answer:0 },

  { id:65, book:"El Deafo",
    q:"What happens at the end of the book between Cece and her potential true friend?",
    choices:[
      "Martha rides her bike to Cece's house and apologizes; their friendship is real and Cece realizes her hearing aid doesn't have to be a barrier",
      "Cece moves to a school for the deaf and finally finds people who understand her",
      "Cece reveals to Mike Miller that she has a crush on him and he reciprocates",
      "Cece stops wearing her hearing aid in public and decides to learn sign language instead",
    ], answer:0 },

  { id:66, book:"El Deafo",
    q:"Where does Cece's family move at the beginning of the book?",
    choices:[
      "To a new town and a new neighborhood — into a house where she has to make friends from scratch",
      "Across the country from California to Virginia for her father's new job",
      "Into a smaller apartment after her parents' divorce",
      "To her grandmother's house while her mother recovers from surgery",
    ], answer:0 },

  { id:67, book:"El Deafo",
    q:"What is the speech therapy Cece undergoes, and how does she feel about it?",
    choices:[
      "She practices forming words and reading lips with a therapist; she resents it but learns useful skills",
      "She has weekly group therapy with other deaf children that she enjoys",
      "She refuses speech therapy entirely and learns sign language at home",
      "She does speech therapy by mail through a correspondence program",
    ], answer:0 },

  { id:68, book:"El Deafo",
    q:"What format is El Deafo, and what year was it published?",
    choices:[
      "A graphic novel published in 2014",
      "An illustrated chapter book published in 2010",
      "A picture book published in 2012",
      "A graphic novel with prose chapters published in 2016",
    ], answer:0 },

  { id:69, book:"El Deafo",
    q:"What major award did El Deafo win?",
    choices:[
      "Newbery Honor (2015)",
      "Caldecott Medal",
      "Coretta Scott King Award",
      "National Book Award for Young People's Literature",
    ], answer:0 },

  { id:70, book:"El Deafo",
    q:"In one early scene, what happens during a hearing test at Cece's school?",
    choices:[
      "She is pulled out of class for the test and feels embarrassed when she has to leave with the audiologist",
      "Her classmates are all required to take the test, and she gets the worst score",
      "She fails to hear the lowest tone and bursts into tears in the testing booth",
      "The audiologist tells her she's gone partially deaf in only one ear",
    ], answer:0 },

  { id:71, book:"El Deafo",
    q:"How does Cece feel when she first sees other kids with hearing aids?",
    choices:[
      "Worried — she sees that other kids' hearing aids are tiny and hers is huge and obvious in comparison",
      "Comforted — she feels less alone for the first time and tries to befriend them",
      "Indifferent — she doesn't really notice them and continues with her day",
      "Angry — she resents that other kids have better technology than she does",
    ], answer:0 },

  { id:72, book:"El Deafo",
    q:"In El Deafo's dream sequences, what kinds of adventures does El Deafo go on?",
    choices:[
      "Imagined feats of heroism using her super-hearing — like rescuing classmates or defeating mean adults",
      "Quiet adventures where her hearing aid lets her communicate with animals",
      "Time-travel adventures to historical periods where she could fly",
      "Adventures with other deaf superheroes who all team up together",
    ], answer:0 },

  { id:73, book:"El Deafo",
    q:"What does Cece learn about being deaf by the end of the book?",
    choices:[
      "That her deafness, including the Phonic Ear, can be a kind of superpower — a way to see herself as different in a powerful way rather than a broken way",
      "That she needs to hide her hearing aid as much as possible to fit in with hearing kids",
      "That she should switch to a school for deaf children where she'll feel like she belongs",
      "That sign language is the only true way for her to communicate authentically",
    ], answer:0 },

  { id:74, book:"El Deafo",
    q:"How does Cece typically depict speech she can't understand in her drawings?",
    choices:[
      "As scribbles, blurred letters, or empty speech bubbles — showing the reader what missing sound feels like",
      "As normal speech bubbles but with smaller text",
      "As speech bubbles with the words in a foreign-looking alphabet",
      "As speech bubbles that fade from clear to invisible",
    ], answer:0 },

  { id:75, book:"El Deafo",
    q:"What happens when Cece tries to fit in by lip-reading her classmates?",
    choices:[
      "She often guesses wrong or misses parts, leading to awkward misunderstandings",
      "She becomes the best lip-reader in her school and gets perfect grades",
      "Her classmates start whispering on purpose to test her abilities",
      "Her teacher punishes her for staring at people's mouths during lessons",
    ], answer:0 },

  { id:76, book:"El Deafo",
    q:"What sport or activity gets Cece's hearing aid in trouble during the book?",
    choices:[
      "Swimming — the hearing aid can't get wet, and pool time means feeling cut off",
      "Soccer — the wires keep getting tangled with her shirt while running",
      "Roller skating — she falls and breaks the Phonic Ear's strap",
      "Baseball — the loud cheering hurts her ears through the hearing aid",
    ], answer:0 },

  { id:77, book:"El Deafo",
    q:"How is Cece different from many other deaf children in the book?",
    choices:[
      "She grew up speaking before losing her hearing, so she uses speech and lip-reading rather than primarily ASL",
      "She lost her hearing later, when she was already a teenager and well into school",
      "She has only partial hearing loss in one ear, while others are completely deaf",
      "She was the only deaf child in her entire town",
    ], answer:0 },

  { id:78, book:"El Deafo",
    q:"What is the overall message of El Deafo?",
    choices:[
      "Being different can be its own kind of superpower — and a true friend is someone who sees the whole person",
      "Deaf people should always advocate for sign language education first and foremost",
      "Technology like hearing aids will solve most of the problems deaf people face",
      "Children should hide their disabilities to make friends more easily",
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
  // THE ONE AND ONLY IVAN — sourced directly from the text
  // ══════════════════════════════════════════════════════
  { id:123, book:"The One and Only Ivan",
    q:"What three nicknames does Ivan say humans call him?",
    choices:[
      "The Freeway Gorilla, The Ape at Exit 8, The One and Only Ivan",
      "The Mighty Silverback, The Ape at the Mall, The One and Only Ivan",
      "The Freeway Gorilla, Mack's Gorilla, The One and Only Ivan",
      "The Highway Ape, The Big Top Gorilla, The Mighty Silverback",
    ], answer:0 },

  { id:124, book:"The One and Only Ivan",
    q:"What does Ivan compare human words to in the opening chapter?",
    choices:[
      "Banana peels — humans \"toss them like banana peels and leave them to rot\"",
      "Rotting fruit on the ground beneath a tree",
      "Buzzing bees that fill the air with noise but mean nothing",
      "Pebbles thrown into still water, making ripples that quickly fade",
    ], answer:0 },

  { id:125, book:"The One and Only Ivan",
    q:"How many walls of Ivan's domain are made of glass, and what's wrong with one of them?",
    choices:[
      "Three walls are glass; one is cracked with a hand-sized hole at the bottom corner",
      "Two walls are glass; one has been replaced with metal mesh after he broke it",
      "All four walls are glass; one has a long crack down the middle",
      "Three walls are glass; one has been painted over with the jungle scene",
    ], answer:0 },

  { id:126, book:"The One and Only Ivan",
    q:"How did Ivan create the hole in his glass wall, and what did Mack let him keep afterward?",
    choices:[
      "With a baseball bat Mack gave him for his sixth birthday — Mack took the bat but let him keep the baseball",
      "Throwing a rock during a tantrum — Mack let him keep his stuffed gorilla as a reward for calming down",
      "Slamming a tire swing against it repeatedly — Mack let him keep the swing",
      "Hitting it with his fist in anger — Mack let him keep the TV that came afterward",
    ], answer:0 },

  { id:127, book:"The One and Only Ivan",
    q:"What is painted on one of the walls of Ivan's domain?",
    choices:[
      "A jungle scene with a waterfall without water, flowers without scent, and trees without roots",
      "A savanna with elephants and giraffes that Stella painted with her trunk",
      "Ivan's own self-portrait that he completed using mud",
      "Mack's name in giant letters with the word \"BOSS\" beneath",
    ], answer:0 },

  { id:128, book:"The One and Only Ivan",
    q:"What happened to Ivan's previous neighbor, the seal?",
    choices:[
      "She ate one hundred pennies that visitors had tossed in her pool, and Mack was \"mistaken\" that she'd be fine",
      "She was sold to a roadside aquarium when Mack ran out of money to feed her",
      "She caught a sickness from the mall pond and died despite Mack calling a vet",
      "She escaped during a power outage and was never seen again",
    ], answer:0 },

  { id:129, book:"The One and Only Ivan",
    q:"What is a \"me-ball,\" and why does Ivan always keep some on hand?",
    choices:[
      "Dried dung rolled into apple-sized balls — he throws them at humans because his visitors never carry any",
      "Knots of his own hair he weaves together — he keeps them as gifts for Julia",
      "Bits of food rolled in sawdust — he saves them as treats for Bob",
      "Old crayon stubs molded into balls — he uses them as paintbrushes",
    ], answer:0 },

  { id:130, book:"The One and Only Ivan",
    q:"What does Julia first slip through the broken corner of Ivan's domain, and what was the crayon's color?",
    choices:[
      "A folded piece of paper and a stubby blue crayon",
      "A piece of construction paper and a yellow crayon",
      "A drawing she had made of him and a red crayon",
      "A coloring book page and a green crayon",
    ], answer:0 },

  { id:131, book:"The One and Only Ivan",
    q:"How does Ivan describe Julia physically?",
    choices:[
      "Ten years old, with hair like black glass and a wide, half-moon smile",
      "Nine years old, with hair the color of mahogany and eyes that crinkle when she laughs",
      "Eleven years old, with brown braids and a missing front tooth",
      "Ten years old, with red hair and freckles like Bob's spots",
    ], answer:0 },

  { id:132, book:"The One and Only Ivan",
    q:"What is the name of Ivan's stuffed gorilla, and why is it named that?",
    choices:[
      "Not-Tag — after his twin sister Tag, whom he lost as a baby",
      "Mud — after his own childhood name in the jungle",
      "Little-Ivan — Julia named it because it looked like a baby version of him",
      "Brother — Mack named it as a joke when he gave it to Ivan",
    ], answer:0 },

  { id:133, book:"The One and Only Ivan",
    q:"What does Stella say good zoos are?",
    choices:[
      "\"A good zoo is how humans make amends\"",
      "\"A good zoo is the best of all the bad options for an animal who cannot go home\"",
      "\"A good zoo is a promise that we will not be forgotten by the humans who took us\"",
      "\"A good zoo is the closest thing to the wild a captive animal will ever know\"",
    ], answer:0 },

  { id:134, book:"The One and Only Ivan",
    q:"In Stella's Jambo story, what does the silverback Jambo do when a boy falls into the gorilla enclosure?",
    choices:[
      "Examines the boy gently, smells his pain, stands watch, then leads his troop away when men arrive",
      "Picks the boy up and carries him to the wall so the humans can rescue him",
      "Beats his chest to warn the boy's parents, then returns to his troop without touching him",
      "Lays beside the boy until the boy wakes, then quietly retreats into the trees",
    ], answer:0 },

  { id:135, book:"The One and Only Ivan",
    q:"How does Stella describe the difference between elephant and gorilla hearts?",
    choices:[
      "\"Your gorilla hearts are made of ice, Ivan. Ours are made of fire.\"",
      "\"Gorilla hearts are mountains; elephant hearts are rivers.\"",
      "\"You gorillas feel sharply but briefly. We elephants feel softly but forever.\"",
      "\"Your hearts beat strong; ours beat long.\"",
    ], answer:0 },

  { id:136, book:"The One and Only Ivan",
    q:"Where does Bob say Stella's body was taken after she died?",
    choices:[
      "He heard from a rat that they tossed her body into a garbage truck — it took five men and a forklift",
      "He saw them load her onto a flatbed truck with a tarp over her",
      "He heard from a parrot that they buried her in a field behind the mall",
      "He saw Mack burn her body in the parking lot dumpster overnight",
    ], answer:0 },

  { id:137, book:"The One and Only Ivan",
    q:"What were Ivan's mother and father like in his memory of the jungle?",
    choices:[
      "His father was a silverback who led them to ripe fruit and made the best chest beats; his mother was one of three other adult females, with Tag and Ivan as the babies of the troop of ten",
      "His father was a gentle silverback who let Ivan and Tag bounce on his belly until he gave them \"the Grunt\"; his mother was the troop's lead matriarch",
      "His parents both died protecting the troop from another silverback when Ivan was very young",
      "His father was old and limped; his mother was younger and groomed Ivan constantly",
    ], answer:0 },

  { id:138, book:"The One and Only Ivan",
    q:"After being captured, how did Ivan first realize his sister Tag was dying?",
    choices:[
      "She looked at him without seeing — Ivan knew \"the vine\" that connected her to home had snapped",
      "She stopped eating the food the humans brought and refused water for days",
      "She made a long, low sound he had never heard from a gorilla before",
      "She closed her eyes and would not open them again, even when he nudged her",
    ], answer:0 },

  { id:139, book:"The One and Only Ivan",
    q:"What was Ivan's life like with Mack and his wife Helen before he was moved to the mall?",
    choices:[
      "He wore diapers, drank from a bottle, broke 46 glasses, broke 7 lamps, and broke 3 of his own toes",
      "He lived in a yard with a swing set, ate fast food daily, and rode in the back of Mack's pickup truck",
      "He shared a bedroom with Mack and Helen's baby and watched cartoons every morning",
      "He stayed in a converted garage that Helen had filled with toys and books",
    ], answer:0 },

  { id:140, book:"The One and Only Ivan",
    q:"What did Mack do every weekend with Ivan, and what did Mack like to say to the cashier?",
    choices:[
      "Drove him to a fast-food restaurant in their convertible; Mack would say, \"Could I have some extra ketchup for my kid?\"",
      "Took him to a drive-through ice cream stand; Mack would say, \"My boy here needs extra sprinkles.\"",
      "Brought him to a pet store to buy treats; Mack would say, \"He's picking out his own dinner.\"",
      "Walked him to a corner diner; Mack would say, \"He'll have what I'm having.\"",
    ], answer:0 },

  { id:141, book:"The One and Only Ivan",
    q:"What is the very first thing Ivan paints on his secret pictures for Ruby?",
    choices:[
      "A patch of grass — striped green from yellow and blue paint combined",
      "A red apple — using paint Mack had given him for finger painting",
      "An elephant standing alone in a field",
      "The word \"home\" — copying letters he saw on signs",
    ], answer:0 },

  { id:142, book:"The One and Only Ivan",
    q:"What makes Ivan realize his painting is missing a word, and what word does he choose?",
    choices:[
      "Julia is doing homework and asks her father the difference between \"principal\" and \"principle\" — Ivan chooses HOME after thinking about how humans love their words",
      "Mack reads the billboard aloud and Ivan recognizes one word — he chooses RUBY to put on his painting",
      "Bob suggests adding a word so humans will understand — Ivan chooses FREE",
      "Stella's story about Jambo includes the word \"home\" — Ivan paints it in her memory",
    ], answer:0 },

  { id:143, book:"The One and Only Ivan",
    q:"What hidden place does Ivan stuff his secret paintings into to keep Mack from selling them?",
    choices:[
      "Inside Not-Tag — he pulls out her stuffing and fills her with crumpled paintings",
      "Under his plastic pool of dirty water",
      "Inside a hollow he dug in the corner of his cement floor",
      "Behind the painted jungle scene on his wall, in a gap he found",
    ], answer:0 },

  { id:144, book:"The One and Only Ivan",
    q:"What does the inspecting man do during his first visit to the mall?",
    choices:[
      "Makes many check marks on his clipboard — looking at Ivan's floor, Ruby's hay, and the water bowls — but says little",
      "Asks Mack a long list of questions and writes down every answer in detail",
      "Takes photographs of every animal and every cage from multiple angles",
      "Stays for an hour talking with the animal-rights protesters outside before coming in",
    ], answer:0 },

  { id:145, book:"The One and Only Ivan",
    q:"What does Julia hand to George to convince him to put Ivan's painting on the billboard?",
    choices:[
      "Mack's claw-stick — she walks over, picks it up, and hands it to him",
      "A photo of Stella's body being dragged away by the garbage truck",
      "A newspaper clipping about Ruby and the protesters",
      "A drawing Ivan made of Ruby with tears on her cheeks",
    ], answer:0 },

  { id:146, book:"The One and Only Ivan",
    q:"How is Ivan trained to enter the box that will take him to the zoo?",
    choices:[
      "Maya uses clicker training — click, then a treat: yogurt raisin, tiny marshmallow, ripe papaya, apple slice, mango",
      "George coaxes him with bananas placed deeper and deeper inside the box",
      "Julia sits inside the box first to show Ivan it is safe",
      "Mack chases him into the box with the claw-stick",
    ], answer:0 },

  { id:147, book:"The One and Only Ivan",
    q:"What is the name of the female gorilla Ivan meets at the zoo?",
    choices:[
      "Kinyani — she chases him, throws a stick at him, and tests him to see if he's a true silverback",
      "Helen — named coincidentally the same as Mack's ex-wife",
      "Tag — Ivan gives her his sister's name when he sees her",
      "Mama — the keepers call her that because she's the troop's matriarch",
    ], answer:0 },

  { id:148, book:"The One and Only Ivan",
    q:"How does Ivan first see Ruby again after they're separated?",
    choices:[
      "Maya brings him a TV and plays footage of Ruby rolling in mud with two other young elephants at her new sanctuary",
      "He climbs a tree at his zoo and spots her belly-deep in tall grass in a distant enclosure — he sees her before he sees the video",
      "Julia brings a photo on her first visit and holds it up against the glass",
      "Bob describes Ruby's new home to him in detail when he visits hidden in Julia's backpack",
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
