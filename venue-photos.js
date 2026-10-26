// Location-matched venue cover photography. Files are stored locally so cards do not
// depend on third-party hotlinks; source pages remain linked for attribution.
const photo = (id, credit, source) => ({
  image: `assets/venues/${id}.webp`,
  photoCredit: credit,
  photoSource: source,
});

export const venuePhotos = {
  "stockton-genova": photo(
    "stockton-genova",
    "Genova Bakery · Los Angeles Times",
    "https://www.latimes.com/california/story/2019-08-23/billion-dollar-property-week-in-review",
  ),
  "stockton-haggin": photo(
    "stockton-haggin",
    "Haggin Museum · Visit California",
    "https://www.visitcalifornia.com/experience/haggin-museum/",
  ),
  "stockton-weberstown": photo(
    "stockton-weberstown",
    "Weberstown Mall",
    "https://www.weberstown.com/location",
  ),
  "stockton-oak-grove": photo(
    "stockton-oak-grove",
    "Shumway Oak Grove · Visit Stockton",
    "https://www.visitstockton.org/directory/shumway-oak-grove-regional-park-nature-center/",
  ),
  "stockton-arena": photo(
    "stockton-arena",
    "Adventist Health Arena · Stockton Thunder",
    "https://www.stocktonhockey.com/adventist-health-arena",
  ),
  "stockton-bob-hope": photo(
    "stockton-bob-hope",
    "Bob Hope Theatre · Visit Stockton",
    "https://www.visitstockton.org/directory/bob-hope-fox-theatre/",
  ),
  "stockton-marina": photo(
    "stockton-marina",
    "Downtown Stockton Marina · Visit Stockton",
    "https://www.visitstockton.org/directory/downtown-stockton-marina/",
  ),
  "tracy-west-valley": photo(
    "tracy-west-valley",
    "West Valley Mall · Crexi",
    "https://www.crexi.com/lease/properties/575508/california-west-valley-mall",
  ),
  "tracy-target": photo(
    "tracy-target",
    "Target Tracy · Loc8NearMe",
    "https://www.loc8nearme.com/california/tracy/target/317399/",
  ),
  "tracy-grand": photo(
    "tracy-grand",
    "Grand Theatre · City of Tracy",
    "https://thinkinsidethetriangle.com/news-and-events/p/item/48671/a-grand-artistic-experience-awaits-in-tracy",
  ),
  "tracy-museum": photo(
    "tracy-museum",
    "Tracy Historical Museum",
    "https://tracymuseum.org/tracy-historical-museum/",
  ),
  "tracy-town-country": photo(
    "tracy-town-country",
    "Town & Country Cafe",
    "https://tccafetracy.com/",
  ),
  "manteca-fagundes": photo(
    "manteca-fagundes",
    "Fagundes Meats & Catering",
    "https://www.fagundesmeats.com/",
  ),
  "modesto-state-theatre": photo(
    "modesto-state-theatre",
    "The State Theatre · Homes.com",
    "https://www.homes.com/local-guide/modesto-ca/",
  ),
  "modesto-gallo": photo(
    "modesto-gallo",
    "Gallo Center · Opportunity Stanislaus",
    "https://www.opportunitystanislaus.com/new-page",
  ),
  "modesto-mchenry-museum": photo(
    "modesto-mchenry-museum",
    "McHenry Museum · Fotospot",
    "https://fotospot.com/attractions/california/mchenry-museum",
  ),
  "modesto-mchenry-mansion": photo(
    "modesto-mchenry-mansion",
    "City of Modesto",
    "https://www.modestogov.com/3038/McHenry-Mansion-Tours",
  ),
  "modesto-picassos": photo(
    "modesto-picassos",
    "Picasso’s Gourmet Deli & Art",
    "https://www.picassosdeli.com/",
  ),
  "turlock-target": photo(
    "turlock-target",
    "Target Turlock · Crexi",
    "https://www.crexi.com/lease/properties/593902/california-monte-vista-crossings",
  ),
  "turlock-carnegie": photo(
    "turlock-carnegie",
    "Carnegie Arts Center · Tripadvisor",
    "https://www.tripadvisor.com/Attraction_Review-g33155-d3397792-Reviews-Carnegie_Arts_Center-Turlock_California.html",
  ),
  "turlock-history-museum": photo(
    "turlock-history-museum",
    "Turlock Historical Society",
    "https://turlockhistoricalsociety.org/pages/directions.html",
  ),
  "turlock-regal": photo(
    "turlock-regal",
    "Regal Turlock · Wheree",
    "https://regal-turlock.wheree.com/",
  ),
  "turlock-footers": photo(
    "turlock-footers",
    "Main Street Footers",
    "https://main-street-footers.com/",
  ),
  "merced-courthouse": photo(
    "merced-courthouse",
    "Merced County Courthouse Museum",
    "https://www.mercedmuseum.org/",
  ),
  "merced-marketplace": photo(
    "merced-marketplace",
    "Marketplace at Merced · Matthews",
    "https://www.marketplaceatmerced.com/",
  ),
  "merced-theatre": photo(
    "merced-theatre",
    "Merced Theatre · Wikimedia Commons",
    "https://commons.wikimedia.org/wiki/File:Merced_Theatre.JPG",
  ),
  "merced-library": photo(
    "merced-library",
    "Merced County Library",
    "https://storymaps.arcgis.com/stories/700972d548b349689a96bdccf337fbc7",
  ),
  "merced-mac": photo(
    "merced-mac",
    "Merced Multicultural Arts Center",
    "https://www.artsmerced.org/plan-a-visit",
  ),
  "merced-mainzer": photo(
    "merced-mainzer",
    "Mainzer",
    "https://themainzer.com/",
  ),
  "madera-museum": photo(
    "madera-museum",
    "Madera County Museum · Madera Tribune",
    "https://www.maderatribune.com/single-post/museum-opens-for-celebration",
  ),
  "madera-walmart": photo(
    "madera-walmart",
    "Walmart Madera · BusinessYab",
    "https://businessyab.com/explore/united_states/california/madera_county/madera/west_cleveland_avenue/1977/walmart-559-675-9212.html",
  ),
  "madera-sals": photo(
    "madera-sals",
    "Sal’s Mexican Restaurant · Restaurantji",
    "https://www.restaurantji.com/ca/madera/sals-mexican-restaurant-/",
  ),
  "madera-drive-in": photo(
    "madera-drive-in",
    "Madera 2 Drive-In · BringFido",
    "https://www.bringfido.com/attraction/23547",
  ),
  "madera-golf": photo(
    "madera-golf",
    "Madera Municipal Golf Course · GolfPass",
    "https://www.golfpass.com/travel-advisor/courses/4341-madera-municipal-golf-course",
  ),
  "clovis-sierra-vista": photo(
    "clovis-sierra-vista",
    "Sierra Vista Mall · Namdar Realty",
    "https://namdarrealtygroup.com/",
  ),
  "clovis-museum": photo(
    "clovis-museum",
    "Clovis Big Dry Creek Museum · Visit Fresno County",
    "https://www.visitfresnocounty.org/blog/post/experience-old-town-clovis/",
  ),
  "clovis-juju": photo(
    "clovis-juju",
    "House of JuJu · ABC30",
    "https://abc30.com/post/house-of-juju-old-town-clovis-flood-damage-water-main-burst/13720225/",
  ),
  "clovis-cinemas": photo(
    "clovis-cinemas",
    "Sierra Vista Cinemas 16 · Wheree",
    "https://sierra-vista-cinemas-16.wheree.com/",
  ),
  "clovis-no-surrender": photo(
    "clovis-no-surrender",
    "No Surrender Adventure Park · Loc8NearMe",
    "https://www.loc8nearme.com/california/clovis/no-surrender-adventure-park/5960825/",
  ),
  "fresno-fashion-fair": photo(
    "fresno-fashion-fair",
    "Fashion Fair · CommercialCafe",
    "https://www.commercialsearch.com/commercial-property/us/ca/fresno/fresno-fashion-fair/",
  ),
  "fresno-chaffee-zoo": photo(
    "fresno-chaffee-zoo",
    "Fresno Chaffee Zoo · Zoo Guide",
    "https://zoo-guide.com/discover-the-wild-side-of-california-a-day-at-fresno-chaffee-zoo/",
  ),
  "fresno-art-museum": photo(
    "fresno-art-museum",
    "Fresno Art Museum · Visit Fresno County",
    "https://www.visitfresnocounty.org/things-to-do/arts-culture/museums/",
  ),
  "fresno-ampersand": photo(
    "fresno-ampersand",
    "Ampersand Ice Cream · ABC30",
    "https://abc30.com/post/ampersand-ice-cream-celebrates-11th-anniversary-block-party/19170420/",
  ),
  "fresno-underground-gardens": photo(
    "fresno-underground-gardens",
    "Forestiere Underground Gardens · Karta",
    "https://karta.com/blog/things-to-do-in-fresno-fun-activities-and-attractions/",
  ),
  "visalia-mall": photo(
    "visalia-mall",
    "Visalia Mall",
    "https://www.visaliamall.com/en/",
  ),
  "visalia-boomers": photo(
    "visalia-boomers",
    "Boomers Visalia · Postcard",
    "https://www.postcard.inc/places/visalia-adventure-park-visalia-pS_Udu7KOEO",
  ),
  "visalia-fox-theatre": photo(
    "visalia-fox-theatre",
    "Visalia Fox Theatre · City of Visalia",
    "https://www.visalia.gov/",
  ),
  "visalia-valhalla": photo(
    "visalia-valhalla",
    "Valhalla Restaurant · SFGATE",
    "https://www.sfgate.com/centralcalifornia/article/cozy-central-california-diner-danish-treats-20333933.php",
  ),
  "visalia-county-museum": photo(
    "visalia-county-museum",
    "Tulare County Museum · Visit Visalia",
    "https://www.visitvisalia.com/account/tulare-county-museum",
  ),
  "tulare-outlets": photo(
    "tulare-outlets",
    "Tulare Outlets",
    "https://www.tulareoutletcenter.com/",
  ),
  "tulare-history-museum": photo(
    "tulare-history-museum",
    "Tulare Historical Museum · Visit Visalia",
    "https://www.visitvisalia.com/account/tulare-historical-museum",
  ),
  "tulare-bravo-farms": photo(
    "tulare-bravo-farms",
    "Bravo Farms",
    "https://bravofarms.com/",
  ),
  "tulare-galaxy": photo(
    "tulare-galaxy",
    "Galaxy Theatres Tulare · Yellow Pages",
    "https://www.yellowpages.com/tulare-ca/mip/galaxy-theaters-5051550",
  ),
  "tulare-target": photo(
    "tulare-target",
    "Target Tulare · Loc8NearMe",
    "https://www.loc8nearme.com/california/tulare/target/327415/",
  ),
  "bakersfield-valley-plaza": photo(
    "bakersfield-valley-plaza",
    "Valley Plaza",
    "https://www.valleyplazamall.com/en/visit/",
  ),
  "bakersfield-kern-museum": photo(
    "bakersfield-kern-museum",
    "Kern County Museum · Visit California",
    "https://www.visitcalifornia.com/places-to-visit/bakersfield/",
  ),
  "bakersfield-buena-vista": photo(
    "bakersfield-buena-vista",
    "Buena Vista Museum · Sygic Travel",
    "https://travel.sygic.com/en/poi/buena-vista-museum-of-natural-history-poi:39123",
  ),
  "bakersfield-calm": photo(
    "bakersfield-calm",
    "California Living Museum · SFGATE",
    "https://www.sfgate.com/centralcalifornia/article/california-living-museum-bakersfield-21235683.php",
  ),
  "bakersfield-dewars": photo(
    "bakersfield-dewars",
    "Dewar’s Candy Shop · SFGATE",
    "https://www.sfgate.com/centralcoast/article/california-dewars-chews-treat-origin-17643111.php",
  ),
};
