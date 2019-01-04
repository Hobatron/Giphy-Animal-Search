var timeCount = 0;
var totalSearchs = 0;
var canSearch = true;
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

//To implement: localStorage lock to 42 searchs per hour
// if ("totalSearchs" in localStorage) {

// } else {

// };


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
            imgRequest(animal, offset * 25);
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
            $("#animalButtons").append(newBTN)
            $(newBTN).click(function () {
                animal = $(this).val();
                offset = parseInt($(this).attr("data-offset"));
                $(this).attr("data-offset", offset + 1);
                imgRequest(animal, offset)
            });
        };
    };

    var imgRequest = function (q, off) {

        url = "api.giphy.com/v1/gifs/search?api_key=";
        url += "FhkrSB8CttaPTBZva2elJG9TNCOFs848";
        url += "&q=" + q;
        url += "&limit=25&offset=" + off + "&lang=en";
        console.log(url);

    }
});