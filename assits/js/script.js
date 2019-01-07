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

    //onclick listener -will be obsolete via random starter buttons-
    $(".animalBTN").click(function () {
        if (canSearch && totalSearchs != 42) {
            animal = $(this).val();
            offset = parseInt($(this).attr("data-offset"));
            $(this).attr("data-offset", offset + 1);
            imgRequest(animal, offset * 36);
            canSearch = false;
            totalSearchs++
        };

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
        if (newAnimal != "" && true) {
            lowerCaseAnimal = newAnimal.toLowerCase()
            correctedAnimal = newAnimal.charAt(0).toUpperCase() + lowerCaseAnimal.slice(1);
            newBTN = $("<button>").val(lowerCaseAnimal);
            newBTN.addClass("btn btn-primary animalBTN");
            newBTN.text(correctedAnimal);
            newBTN.attr("data-offset", "0")
            $("#animalButtons").prepend(newBTN)
            $(newBTN).click(function () {
                if (canSearch && totalSearchs != 42) {
                    animal = $(this).val();
                    offset = parseInt($(this).attr("data-offset"));
                    $(this).attr("data-offset", offset + 1);
                    imgRequest(animal, offset * 36);
                    canSearch = false;
                    totalSearchs++
                };
            });
        };
    };

    var imgRequest = function (q, off) {
        //clear old search
        for (var i = 0; i < 4; i++){
            $("#col"+i).empty();
        };
        //build query url
        url = "https://api.giphy.com/v1/gifs/search?api_key=";
        url += "FhkrSB8CttaPTBZva2elJG9TNCOFs848";
        url += "&q=" + q;
        url += "&limit=36&offset=" + off + "&lang=en";

        //testing json
        url = "assits/js/local.json";
        col = 0;
        $.getJSON(url, function () {
        })
            .done(function (results) {
                $.each(results.data, function (index, value) {
                    //set image variables
                    data = results.data[index].images;
                    img = data.fixed_width.url;
                    imgStill = data.fixed_width_still.url;
                    imgHeight = parseInt(data.fixed_width_still.height);
                    //build img element
                    imgElem = $("<img>");
                    imgElem.addClass("row imgResult")
                    imgElem.attr("src", imgStill);
                    imgElem.attr("data-run", img);
                    colXTracker[col] += imgHeight;
                    $("#col" + col).append(imgElem);
                    //Creats a waterfall effect, but ends them around the same spot.
                    if (index > 25){
                        col = colXTracker.indexOf(Math.min(...colXTracker));
                    } else if (col == 3){
                        col = 0;
                    } else {
                        col++;
                    };
                });
            });

    };
});