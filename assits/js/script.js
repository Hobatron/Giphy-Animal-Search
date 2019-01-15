var timeCount = 0;
var canSearch = true;
var colXTracker = [0, 0, 0, 0];
var totalSearchs = 0;
var placeHolderAnimals = [
    'Badger', 'Bat', 'Bear', 'Bird', 'Bulldog',
    'Camel', 'Chicken', 'Corgi', 'Cow', 'Crab', 'Cat',
    'Deer', 'Dragon', 'Duck', 'Dog',
    'Eagle', 'Echidna', 'Elephant',
    'Ferret', 'Fish', 'Frog',
    'Giraffe', 'Goat',
    'Hamster', 'Hedgehog', 'Hippo', 'Horse',
    'Insect',
    'Kangaroo', 'Koala',
    'Lion', 'Lizard', 'Lobster', 'Llama',
    'Monkey', 'Mouse',
    'Octopus', 'Otter', 'Owl',
    'Panda', 'Penguin', 'Pig', 'Poodle', 'Pug', 'Parrot',
    'Rabbit', 'Raccoon',
    'Seal', 'Shark', 'Sheep', 'Skunk', 'Sloth', 'Squirrel', 'Starfish', 'Spider',
    'Tiger', 'Turtle',
    'Unicorn',
    'Whale', 'Wolf',];

//To implement: localStorage lock to 42 searchs per hour via server


$(document).ready(function () {
    
    //two ways to add new button
    $(document).on('keypress', function (e) {
        if (e.which == 13) {
            addAnimal($("#usersAnimal").val())
        };
    });
    $("#submit").click(function () {
        addAnimal($("#usersAnimal").val());
    });

    //Scrolling suggestions
    setInterval(function () {
        timeCount++;
        if (timeCount == 8) {
            $("#usersAnimal").addClass("fadeRight");
            timeCount = 0;
            hasMoved = true;
        } else if (timeCount == 3) {
            rndAnimal = placeHolderAnimals[Math.floor(Math.random() * placeHolderAnimals.length)];
            $("#usersAnimal").attr("placeholder", rndAnimal)
            $("#usersAnimal").removeClass("fadeRight");
        };
    }, 450);
    //reduce searchs to once every 15s
    setInterval(function () {
        canSearch = true;
    }, 15000);

    //Creating a new button
    var addAnimal = function (newAnimal) {
        $("#usersAnimal").val("");
        //check if there's something there and it's not nonsense(later)
        if (ledgable(newAnimal)) {
            lowerCaseAnimal = newAnimal.toLowerCase()
            correctedAnimal = newAnimal.charAt(0).toUpperCase() + lowerCaseAnimal.slice(1);
            newBTN = $("<button>").val(lowerCaseAnimal);
            newBTN.addClass("btn btn-primary animalBTN");
            newBTN.text(correctedAnimal);
            newBTN.attr("data-offset", "0")
            $("#animalButtons").prepend(newBTN)
            $(newBTN).click(function () {
                if (canSearch && totalSearchs != 42) {
                    console.log("no error")
                    animal = $(this).val();
                    offset = parseInt($(this).attr("data-offset"));
                    $(this).attr("data-offset", offset + 1);
                    imgRequest(animal, offset * 36);
                    canSearch = false;
                    totalSearchs++
                } else {
                    $("#shadow, #slowDown").fadeIn(120);
                }
            });
        };
    };

    var imgRequest = function (q, off) {
        //clear old search
        for (var i = 0; i < 4; i++) {
            $("#col" + i).empty();
        };
        //build query url
        url = "https://api.giphy.com/v1/gifs/search?api_key=";
        url += "FhkrSB8CttaPTBZva2elJG9TNCOFs848";
        url += "&q=" + q;
        url += "&limit=36&offset=" + off + "&lang=en";

        //temp JSON test file
        //url = "assits/js/local.json";
        $.getJSON(url, function () {
        }).done(function (results) {
            toLocalStringifyResults = JSON.stringify(results);
            localStorage.setItem("recentQuery",toLocalStringifyResults);
            loadImages();
        });

    };

    var loadImages = function(){
        col = 0;
        results = JSON.parse(localStorage.getItem("recentQuery"));
        $.each(results.data, function (index, value) {
            //set image variables
            dataImg = results.data[index].images;
            url = results.data[index].url;
            img = dataImg.fixed_width.url;
            imgStill = dataImg.fixed_width_still.url;
            imgHeight = parseInt(dataImg.fixed_width_still.height);
            //img link a tag
            div = $("<div>");
            linkUrl = $("<a href='"+url+"'>");
            //build img element
            imgElem = $("<img>");
            imgElem.addClass("row imgResult clearfix")
            imgElem.attr("src", imgStill);
            imgElem.attr("data-flip", img);
            colXTracker[col] += imgHeight;
            $(imgElem).mouseover(function () {
                x = $(this).attr("src");
                $(this).attr("src", $(this).attr("data-flip"));
                $(this).attr("data-flip", x);
            }).mouseout(function () {
                x = $(this).attr("src");
                $(this).attr("src", $(this).attr("data-flip"));
                $(this).attr("data-flip", x);
            });
            $("#col" + col).append(div);
            $(div).append(linkUrl);
            $(linkUrl).append(imgElem);
            //Creats a waterfall effect, but ends them around the same spot.
            if (index > 25) {
                col = colXTracker.indexOf(Math.min(...colXTracker));
            } else if (col == 3) {
                col = 0;
            } else {
                col++;
            };
        });
        
    };

    //to be implemented
    var ledgable = function (newAnimal) {
        if (newAnimal != "") {
            return true;
        }
    };
    
    //build starting options
    for (var i = 0 ; i < 6 ; i++) {
        animal = placeHolderAnimals[Math.floor(Math.random() * (placeHolderAnimals.length + 1))];
        placeHolderAnimals.splice(placeHolderAnimals.indexOf(animal), 1);
        addAnimal(animal);
    };

    if ("recentQuery" in localStorage){
        loadImages();
    } else {
        localStorage.setItem("recentQuery", "");
    };
    $(".close, #shadow").click(function () {
        $("#shadow, #slowDown").fadeOut(120);
    });
});

