var Faker = (function(){

  var WORDS = ["Lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "Vivamus", "porttitor", "ipsum", "lobortis", "odio", "sagittis", "et", "fermentum", "dui", "gravida", "Cum", "sociis", "natoque", "penatibus", "et", "magnis", "dis", "parturient", "montes", "nascetur", "ridiculus", "mus", "Nullam", "elementum", "enim", "quis", "convallis", "aliquam", "mauris", "magna", "iaculis", "nisi", "sit", "amet", "semper", "dui", "lorem", "ac", "justo", "Vivamus", "nec", "leo", "eu", "nisl", "dapibus", "blandit", "Morbi", "vitae", "neque", "nisl", "Nulla", "facilisi", "Curabitur", "urna", "lacus", "ultrices", "vel", "molestie", "pretium", "sodales", "non", "arcu", "Pellentesque", "quis", "velit", "ipsum", "Suspendisse", "et", "sapien", "sodales", "lacus", "pharetra", "viverra", "et", "non", "dolor", "Pellentesque", "habitant", "morbi", "tristique", "senectus", "et", "netus", "et", "malesuada", "fames", "ac", "turpis", "egestas", "Curabitur", "dapibus", "libero", "sollicitudin", "facilisis", "sagittis", "nisi", "augue", "mattis", "enim", "vel", "venenatis", "nisi", "massa", "nec", "nibh", "Suspendisse", "at", "quam", "dictum", "nisl", "adipiscing", "scelerisque", "Duis", "condimentum", "ultricies", "vehicula", "Etiam", "a", "erat", "lacus", "a", "consectetur", "erat", "Aenean", "nec", "purus", "arcu", "dapibus", "lacinia", "velit", "Mauris", "a", "tortor", "lacus", "vel", "sodales", "erat"];
  
  var FIRST_NAMES = ["Angus", "Adolph", "Alan", "Alma", "Art", "Angel", "Barry", "Barbara", "Billiana", "Beatrice", "Benny", "Billy", "Bobby", "Buddy", "Buzz", "Constantine", "Cotswold", "Corky", "Crispin", "Cuthbert", "Dave", "Desmond", "Delia", "Desdemona", "Duke", "Ethel", "Egbert", "Ethelred", "Eddy", "Fraser", "Farquahar", "Fizzle", "Florence", "Funky", "Gary", "Gilbert", "George", "Geoffrey", "Harry", "Henry", "Hagar", "Henrietta", "Harriot", "Harlot", "Heathcliffe", "Ian", "Indigo", "Inga", "Joey", "Johnson", "Jeremy", "Jemima", "Jezebel", "Jezza", "Jimbo", "Kenneth", "Kenny", "Kilgore", "Kathleen", "Kurt", "Leonard", "Linda", "Lemmington", "Lemmy", "Micky", "Margaret", "Norbert", "Norman", "Nancy", "Nelly", "Ozzy", "Oswald", "Ophelia", "Percy", "Percival", "Quentin", "Richard", "Rose", "Rene", "Regina", "Stephen", "Sequin", "Segrovia", "Terence", "Toby", "Trisha", "Talbot", "Timbolina", "Timmy", "Veronica", "Verucca", "Vester", "Walter", "Wilma", "Wesley"];
  
  var LAST_NAMES = ["Applebottom", "Avelot", "Appyslap", "Amblebush", "Antifellow", "Bushey", "Bottomley", "Butterswick", "Beastly", "Bummerston", "Cadfael", "Candlewick", "Creasley", "Crumple", "Christy", "Crispy", "Cretin", "Crassly", "Crippen", "Crapper", "Dickins", "Dickersley", "Doomsbury", "Diddle", "Didderslike", "Effington", "Effersley", "Enterslow", "Easings", "Fudgebottom", "Feckersley", "Fidgewhistle", "Focker", "Farpsbury", "Goonstown", "Goadington", "Gobstutter", "Ghostington", "Hipperswipe", "Hattersley", "Hindley", "Harrington", "Hamsbury", "Hardwhistle", "Harding", "Ippleswitch", "Itchinglow", "Jezebel", "Jammybottom", "Kilmister", "Kruger", "Krispyface", "Killerbottom", "Lemmington", "Littlestick", "Littlebottom", "Lickerswitch", "Liddington", "Louche", "Lispington", "Leerdammer", "Mincingbottom", "Mintington", "Millysack", "Millington", "Manystrumpets", "Miniscule", "Mentalton", "Normington", "Navel", "Nudeyside", "Neutrino", "Nearmiss", "Nerdingly", "Osbourne", "Offerhead", "Openbottom", "Overkill", "Ohemgee"];
  
  var DOMAINS = ["megacorp.com", "superfoo.co.uk", "chickenvillage.org", "fuzzypaws.com", "zippythings.com", "lechinerie.fr", "ubermensche.de", "beepybits.org"];
  
  var randomIndex = function(arr) {
    return Math.round(Math.random() * arr.length);
  }

  return {
     paragraph : function(len) {
       len = len || 20;
       var startIdx = Math.round(Math.random() * (WORDS.length - len));
       return WORDS.slice(startIdx, startIdx + len).join(" ");
     },
     sentence : function(len) {
       len = len || 10;
       return Faker.paragraph(len);
     },
     word : function() {
       return Faker.paragraph(1);
     },
     firstName : function() {
       return FIRST_NAMES[randomIndex(FIRST_NAMES)];
     },
     lastName : function() {
       return LAST_NAMES[randomIndex(LAST_NAMES)];
     },
     fullName : function(separator) {
       separator = separator || " ";
       return [Faker.firstName(), Faker.lastName()].join(separator);
     },
     email : function() {
       return [Faker.fullName(".").toLowerCase(), DOMAINS[randomIndex(DOMAINS)]].join("@");
     } 
  }

})();
