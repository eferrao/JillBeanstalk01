var profiles = [
{"crop":"radishes", "species": "FULL SPECIES NAME", "datePlanted":"June 10th, 2014", "daysTillHarvest":15
{"crop":"tomatoes", "species": "FULL SPECIES NAME", "datePlanted":"July 8th, 2014", "daysTillHarvest":25}]

var searches = [];

function appendSearchQuery(query) {
  searches.push(query);
  var display_div="<div class='search-query'>x " + query + "</div>";
  $('#searches-display').append(display_div);
}

function removeSearchQuery(query) {
  for (var i = 0; i < searches.length; i++) {
    if (searches[i] == query) {
      searches.splice(i, 1);
    }
  }
}

function updateProfiles() {
  displayedProfiles = [];
  profiles.forEach(function(profile) {
    var crops = profile.crops;
    for (var i = 0; i < searches.length; i++) {
      if (searches[i] == crops[0].crop) {
        displayedProfiles.push(profile);
      }
    }
  })
  $('#results-list tr').remove();
  for (var i = 0; i < displayedProfiles.length; i++) {
    var displayed_profile="<tr><td><div class='crop'>" + displayedProfiles[i].crops[0].crop+"</div><div class='name'> by "+
    displayedProfiles[i].name+"</div><div class='name'>ASK TO SHARE</div></td><td><div class='days-til-harvest'>"+displayedProfiles[i].crops[0].daysTillHarvest+
    "</div><div class='name'>DAYS TILL HARVEST</div></td><td><div class='days-til-harvest'>"+displayedProfiles[i].crops[0].servings+" servings</div><div class='name'>POTENTIAL YIELD</div></td></tr>";
    $('#results-list').append(displayed_profile);
  }
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