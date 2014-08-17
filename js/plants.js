var profiles = [
{"crop":"basil", "species": "FULL SPECIES NAME", "datePlanted":"Grows indoors", "daysTillHarvest":16, "savings": "$5 PERMEAL"},
{"crop":"beets", "species": "raphanus sativus", "datePlanted":"Grows outdoors", "daysTillHarvest":31, "savings": "$6 PER MEAL"},
{"crop":"blueberries", "species": "raphanus sativus", "datePlanted":"Grows outdoors", "daysTillHarvest":28, "savings": "$14 PER MEAL"},
{"crop":"broccoli", "species": "raphanus sativus", "datePlanted":"Grows outdoors", "daysTillHarvest":24, "savings": "$5 PER MEAL"},
{"crop":"carrots", "species": "FULL SPECIES NAME", "datePlanted":"Grows outdoors", "daysTillHarvest":14, "savings": "$14 PERMEAL"},
{"crop":"cauliflower", "species": "FULL SPECIES NAME", "datePlanted":"Grows outdoors", "daysTillHarvest":14, "savings": "$14 PERMEAL"},
{"crop":"collards", "species": "raphanus sativus", "datePlanted":"Grows outdoors", "daysTillHarvest":31, "savings": "$12 PER MEAL"},
{"crop":"lettuce", "species": "FULL SPECIES NAME", "datePlanted":"Grows outdoors", "daysTillHarvest":16, "savings": "$8 PERMEAL"},
{"crop":"muskmelons", "species": "raphanus sativus", "datePlanted":"Grows outdoors", "daysTillHarvest":8, "savings": "$8 PER MEAL"},
{"crop":"peas", "species": "FULL SPECIES NAME", "datePlanted":"Grows indoors", "daysTillHarvest":24, "savings": "$17 PERMEAL"},
{"crop":"peppers", "species": "FULL SPECIES NAME", "datePlanted":"Grows indoors", "daysTillHarvest":24, "savings": "$17 PERMEAL"},
{"crop":"potatoes", "species": "raphanus sativus", "datePlanted":"Grows outdoors", "daysTillHarvest":31, "savings": "$12 PER MEAL"},
{"crop":"pumpkin", "species": "raphanus sativus", "datePlanted":"Grows outdoors", "daysTillHarvest":31, "savings": "$12 PER MEAL"},
{"crop":"radishes", "species": "raphanus sativus", "datePlanted":"Grows outdoors", "daysTillHarvest":26, "savings": "$25 PER MEAL"},
{"crop":"raspberries", "species": "raphanus sativus", "datePlanted":"Grows outdoors", "daysTillHarvest":31, "savings": "$12 PER MEAL"},
{"crop":"rosemary", "species": "raphanus sativus", "datePlanted":"Grows outdoors", "daysTillHarvest":31, "savings": "$12 PER MEAL"},
{"crop":"squash", "species": "raphanus sativus", "datePlanted":"Grows outdoors", "daysTillHarvest":31, "savings": "$12 PER MEAL"},
{"crop":"strawberries", "species": "raphanus sativus", "datePlanted":"Grows outdoors", "daysTillHarvest":19, "savings": "$10 PER MEAL"},
{"crop":"tomatoes", "species": "raphanus sativus", "datePlanted":"Grows outdoors", "daysTillHarvest":31, "savings": "$12 PER MEAL"},
{"crop":"turnips", "species": "raphanus sativus", "datePlanted":"Grows outdoors", "daysTillHarvest":31, "savings": "$12 PER MEAL"},
{"crop":"watermelon", "species": "raphanus sativus", "datePlanted":"Grows outdoors", "daysTillHarvest":31, "savings": "$12 PER MEAL"},
{"crop":"zucchini", "species": "raphanus sativus", "datePlanted":"Grows outdoors", "daysTillHarvest":31, "savings": "$12 PER MEAL"},];

var searches = [];

function appendSearchQuery(query) {
  searches.push(query);
  //var display_div="<div class='search-query'>x " + query + "</div>";
  //$('#searches-display').append(display_div);
}

function removeSearchQuery(query) {
  for (var i = 0; i < searches.length; i++) {
    if (searches[i] == query) {
      searches.splice(i, 1);
    }
  }
}

function initProfiles() {
  for (var i = 0; i < profiles.length; i++) {
    var displayed_profile = "<tr><td><div class='crop'>" + profiles[i].crop + 
    " +</div><div class='name'>" + profiles[i].datePlanted +
    "</div></td><td><div class='days-til-harvest'>"
    +profiles[i].daysTillHarvest+"</div><div class='name'>DAYS TILL HARVEST</div></td><td><div class='days-til-harvest'>" + profiles[i].savings + "</div><div class='name'>POTENTIAL SAVINGS</div></td></tr>";
    $('#results-list').append(displayed_profile);
  }
}

function updateProfiles() {
  displayedProfiles = [];
  profiles.forEach(function(profile) {
    var crops = profile.crop;
    for (var i = 0; i < searches.length; i++) {
      if (searches[i] === crops) {
        displayedProfiles.push(profile);
      }
    }
  })
  console.log(displayedProfiles);
  $('#results-list tr').remove();
  for (var i = 0; i < displayedProfiles.length; i++) {
    var displayed_profile = "<tr><td><div class='crop'>" + displayedProfiles[i].crop + 
    " +</div><div class='name'>" + displayedProfiles[i].datePlanted +
    "</div></td><td><div class='days-til-harvest'>"
    +displayedProfiles[i].daysTillHarvest+"</div><div class='name'>DAYS TILL HARVEST</div></td><td><div class='days-til-harvest'>" + displayedProfiles[i].savings + "</div><div class='name'>DAYS TILL HARVEST</div></td></tr>";
    $('#results-list').append(displayed_profile);
  }
  if (displayedProfiles.length == 0) {
    initProfiles();
  }
  searches = [];
}

function hasCommonElement(arr1, arr2) {
  for (var i = 0; i<arr1.length; i++) {
      for(var j=0; j<arr2.length; j++) {
          if(arr1[i] == arr2[j]) {
              return true;
          }
    }
    return false;
}
}

//////////////////////////////////

var substringMatcher = function(strs) {
  return function findMatches(q, cb) {
    var matches, substrRegex;
 
    // an array that will be populated with substring matches
    matches = [];
 
    // regex used to determine if a string contains the substring `q`
    substrRegex = new RegExp(q, 'i');
 
    // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array
    $.each(strs, function(i, str) {
      if (substrRegex.test(str)) {
        // the typeahead jQuery plugin expects suggestions to a
        // JavaScript object, refer to typeahead docs for more info
        matches.push({ value: str });
      }
    });
 
    cb(matches);
  };
};
 
var vegetables = ['radishes', 'lettuce', 'onions', 'peas', 'spinach', 'cabbages', 'broccoli',
'cauliflower', 'collards', 'kale', 'carrots', 'beets', 'potatoes', 'tomatoes', 'basil',
'cucumbers', 'turnips', 'strawberries', 'blueberries', 'rosemary', 'zucchini', 'watermelon', 'pumpkin',
'squash', 'peppers', 'muskmelons', 'lima beans', 'raspberries'
];
 

 $( document ).ready(function() {
    initProfiles();
});
$('#the-basics .typeahead').typeahead({
  hint: true,
  highlight: true,
  minLength: 1
},
{
  name: 'states',
  displayKey: 'value',
  source: substringMatcher(vegetables)
});

$('#the-basics').on('typeahead:selected', function (e, datum) {
    appendSearchQuery(datum.value);
    $("#searchinput").val('');
    updateProfiles();
});

$(document).on("click",".search-query",function(e) {
  var queryToBeDeleted = $(this).html();
  queryToBeDeleted = queryToBeDeleted.substring(2, queryToBeDeleted.length);
  removeSearchQuery(queryToBeDeleted);
  $(this).remove();
  updateProfiles();
});