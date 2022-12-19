# Reflection

## Chapter 2 - Meaningful Names

Om det är något detta kapitel har lärt mig, så är det vikten av att använda namn som tydligt beskriver intentionen av min kod eftersom det förbättrar läsbarheten och förståelsen för den. Just regeln om **“use intention-revealing names”** är något jag försökt att följa så gott jag kan.

Några exempel nedan:

![Place your file in this folder](/images/meaningful-names.png)

I exemplet ovan kan man även se min strävan av att vara konsekvent i min namngivning genom att följa **“Pick one word per concept”**. Metoder som returnerar ett värde har prefixen “get” medans metoder som returnerar ett booleskt värde har prefixen “is” eller “has”.

## Chapter 3 - Functions

Av alla kapitel i denna bok, så har detta kapitel varit det mest revolutionerande för mig och min kodning. Då tänker jag främst på regler såsom **“Small!”**, **“Do One Thing”** och **“One Level Abstraction per Function”**.

Funktionen nedan är ett exempel på en funktion som till en början var relativt stor, gjorde flera saker samtidigt, och hade flera abstraktionsnivåer:

![Place your file in this folder](/images/functions-2.png)

Genom att följa "Small", "Do One Thing" och "One Level Abstraction per Function", så blev funktionen mycket enklare att läsa och förstå:

![Place your file in this folder](/images/functions.png)

## Chapter 4 - Comments

Från detta kapitel, så har jag främst följt regeln om att **"Explain yourself in code"**. Ett exempel på det:

![Place your file in this folder](/images/comments.png)

Det finns inte bara dåliga kommenterar. Om intentionen är otydlig, så kan en kommentar vara bra vilket jag nyttjat här:

![Place your file in this folder](/images/comments-2.png)

## Chapter 5 - Formatting

När det kommer till formattering, så är det främst "horizontal formatting" och "vertical formatting" som omnämns. Vid "horizontal formatting", så har jag försökt att inte ha för långa rader då det gör koden svårare att läsa. Ett exempel på det:

![Place your file in this folder](/images/formatting.png)

## Chapter 6 - Objects and Data Structures

**The law of demeter** är en regel från detta kapitel som jag har försökt att följa så gott det bara går för att se till att mina komponenter är så "loosly coupled" som möjligt. Ska medge att denna regel är något förvirrande när man håller på med React komponenter, men eftersom att mina komponenter på sin höjd kommunicerar med sin parent genom att exekvera metoder som den mottagit via "props", så anser jag att denna regel följs. Det vill säga, komponenterna kommunicerar endast med sin närmsta granne.

En annan regel är den om **Data Abstraction** som går ut på att dölja implementationen av en klass och istället exponera ett publikt gränssnitt som andra klasser kan använda. På så sätt blir inte andra klasser beroende av en specifik implementation som kan komma att ändras. När det kommer till klass komponenter i React, så finns det inget syfte i att göra "members" privata, då en klass komponent instansieras som en komponent och data och beteende kommuniceras via "properties" (props) som förs in som argument till komponenten. Det vill säga, det finns inget sätt att komma åt "members" i en klass komponent om denna instansieras som en komponent.


## Chapter 7 - Error Handling




## Chapter 8 - Boundaries

Förutom att använda mitt egna "library" från lab 1, så har jag endast använt ett "library" för att visa en konfetti animation när spelaren vinner. Eftersom att detta "library" har minimal påverkan på systemet i helhet och jag har total kontroll över mitt egna "library", så har jag inte behövt använda några av de tips som nämns i kapitlet.

Om jag däremot hade varit starkt beroende av ett extern "library" som jag inte själv skrivit, så hade jag övervägt att skriva ett gränssnit för detta "library" som jag själv har kontrollen över för att göra applikationen mer tålig för förändring.


## Chapter 9 - Unit Tests

Då jag inte har några enhetstester för denna applikation, så har detta kapitel inte påverkat min kod nämnvärt.


## Chapter 10 - Classes

I vanliga fall, så brukar man inte skriva klass komponenter i React. För denna applikation valde jag att göra det ändå eftersom det var ett av kraven. En regel som nämns är **Classes should be small** vilket är något jag försökt att följa. Med andra ord, så har jag valt att bryta upp stora komponenter till mindre, mer specifika komponenter som har "**a single responsibility**".

Ett exempel på detta är **multiplayer** komponentent som jag delat upp i flera subkomponenter:

![Place your file in this folder](/images/classes.png)

## Chapter 11 - Systems


Från detta kapitel, så har jag lärt mig vikten av att skapa ett väl organiserat och "maintainable" system. Detta innebär att man skapar komponenter som är "cohesive" och löst kopplade där varje komponent har ett ansvar och ett väl-definierad gränssnitt. Genom att följa dessa råd, så kan man skapa ett system med komponenter som är enkla att testa samt enkla att byta ut utan att det påverkar resten av systemet.

Jag har applicerat dessa principer så gott jag kan genom att bryta upp stora komponenter till mindre och mer specifika komponenter som har ett ansvar:

![Place your file in this folder](/images/systems.png)