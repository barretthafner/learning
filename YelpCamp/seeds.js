var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment")

var data = [
    {
        name: "Cloud's Rest",
        image: "https://farm4.staticflickr.com/3514/3844623716_427ed81275.jpg",
        description: "Turkish crepon shalloon barramundi cichlid cuskfish frogmouth grunion icefish summer surfperch tench yoga is the greatest fraud ever perpetuated against american women for the sake of vanity if you don't count the ones that killed or maimed them.. In seasonal reticella sempiternum sindon zoophagy amberjack antenna argentine bitterling bonytail broadband guitarfish guppy longfin rainbow sandburrower tubeblenny marfa messenger narwhal. Crinoline flannel mockado chthonophagia gamophagia plantivorous saprophagous beauty eeltail eye inanga kanyu longfin longneck moses tilapia yellow-eye etsy wolf. Frappuccino seasonal crepe lamé silesia nectarivorous alfonsino cavefish collared ghoul goosefish grass hussar luminous redtooth rocket spearfish trevally wobbegong artisan four next level skateboard yr bikram vagina: term used to coin when a woman consistently has a hot and sweaty vagina, comparable to how it feels inside of a bikram yoga studio. what does a dyslexic cow say? oooommmm. are you going to the yoga retreat next month? oh no, my tank top is so tight it shows off my pierced nipples. oh wait, i want people to know i have pierced nipples.."
    },
    {
        name: "Packed Playa",
        image: "https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg",
        description: "A cortado medium organic chambray chamois denim foulard kersey androphagy gumnivorous mycophagous saurophagous eel-catfish hog mahseer piranha pirate pollock sandperch sawtail shell-ear shortnose snipe spotted thornfish mi. Macchiato jaconet merino shetland tricotine entomophagous dolphinfish leopard mummichog raccoon tube-snout yr if you do yoga or are owned by a vampire, you must eventually get a tattoo on your neck. i can agree that yoga pants are comfortable, but that is no reason to wear them in public.. Crema dripper brocade chino dupion fuji moire organdie romal velvet autocoprophagy formivorous toxiphagous anchovy armorhead atlantic dogfish hardhead mudskipper oriental paperbone port sardine snipefish stonefish valley velvet yellowmargin pbr yoga is for people that want to have sex."
    },
    {
        name: "Misty Mountain",
        image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg",
        description: "Macchiato dimity paramatta samite taffeta rhypophagy armoured canary dorado goosefish harelip saury smalleye tommy trumpeter. Coffee rich bouclé hopsack organdie cepivorous merdivorous omnivorous seminivorous antarctic bluefin denticle fringehead garibaldi graveldiver huchen longneck sixgill tenpounder tilefish tommy trumpetfish weatherfish banksy pitchfork stumptown vhs soft music. Cup organic dreadnought saprophagous angler burbot burma fingerfish flier ghoul glowlight jackfish lemon mozambique porgy scalyfin sculpin spiderfish cardigan chambray narwhal pinterest guerilla yoga: to participate in yoga outside a studio, home or private place. to do yoga in public settings, ie. a park, mall, school, boardwalk aka super lame.."
    },
    {
        name: "Eagle Cap",
        image: "https://farm4.staticflickr.com/3498/3905765143_446dcd0e2c.jpg",
        description: "Cretonne droguet scatophagous aruana barracuda beachsalmon dogteeth dorab frogfish grayling leaffish lungfish madtom modoc mudskipper mummichog of staghorn cosby yr you describe the beast (yoga goddess) reasonably well from within her own \"orbit.\" they are amusing and worth a few days or weeks in bed - at most. there are so many fine cultured women in this world - and very few of them practice, let alone teach, yoga! dear yoga goddess: if you ever find a guy willing to put up with your ponderous, boner-killing, fun-destroying attitude then i'll believe that chickens have teeth. oh no, my tank top is so tight it shows off my pierced nipples. oh wait, i want people to know i have pierced nipples.. Americano wings cambresine cendal chenille linsey swanskin glossophagine bluefin cisco combfish cow cuskfish gurnard hamlet lookdown mexican mosquitofish mudfish sundaland three-toothed tigerperch sweater."
    },
];


function seedDb() {
    // Remove all campgrounds
    Campground.remove({}, function(err){
       if(err){
           console.log(err);
       } else {
           console.log("removed campgrounds!");
           //add a few campgrounds
            // data.forEach(function(seed){
            //     Campground.create(seed, function(err, camp){
            //         if (err){
            //             console.log(err);
            //         } else {
            //             console.log("added a campground");
            //             //create a comment
            //             Comment.create({
            //                 text: "This place is great, but I wish there was WiFi.",
            //                 author: "Homer"
            //             }, function(err, comment){
            //               if (err) {
            //                   console.log(err);
            //               } else {
            //                   camp.comments.push(comment);
            //                   camp.save();
            //                   console.log("created new comment!");
            //               }
            //             });
            //         }
            //     });
            // });
       }
    });
}

module.exports = seedDb;