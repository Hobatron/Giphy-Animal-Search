// FhkrSB8CttaPTBZva2elJG9TNCOFs848

// var xhr = $.get("http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=YOUR_API_KEY&limit=5");
// xhr.done(function(data) { console.log("success got data", data); });

$("#submit").click(function(){
    newAnimal = $("#usersAnimal").val();
    if (newAnimal != "" && true){
        lowerCaseAnimal = newAnimal.toLowerCase()
        correctedAnimal = newAnimal.charAt(0).toUpperCase() + newAnimal.slice(1);
        newBTN = $("<button>").val(lowerCaseAnimal);
        newBTN.addClass("btn btn-primary animalBTN");
        newBTN.text(correctedAnimal);
        $("#animalButtons").append(newBTN)
        $(newBTN).click(function(){
            animal = $(this).val();
            // grab gifs
        });
    }

});

$(".animalBTN").click(function(){
    animal = $(this).val();
    // grab gifs
});