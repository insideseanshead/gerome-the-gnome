// Dependencies
// var express = require("express");
// var exphbs = require("express-handlebars");

console.log("safe for work comment");

$("#newChar").on("submit", event => {
    event.preventDefault();
    var genderT = $("#gender").val();
    var raceID = $("#race").val();
    var classID = $("#class").val();
    var mainAtr = $("#mainatr").val()
    if (genderT === "" || raceID === "" || classID === "" || mainAtr === "") {
        console.log("all fields not entered");
        // Consider appending
    }
    else {
        // console.log('new character made!');
        const charObj = {
            gender: genderT,
            race: raceID,
            class: classID,
            mainatr: mainAtr
        }
        console.log(charObj)
        $.ajax({
            method: "POST",
            url: "/api/makechar",
            data: charObj
        }).then(apiRes => {
            console.log(apiRes);
            // window.location.href = "/create"
            // $(".container").append("<h1>"+apiRes.first_name+"</h1>")
            window.location.search = "lastID=" + apiRes.id 
        })
    }
})


$("body").on("click", "#searchBtn", function (event) {
    event.preventDefault();
    console.log('searched!');
    const charID = $('#searchchar').val();
    if (charID === "") {
        console.log("all fields not entered");
        // Consider appending
    }
    else {
        $.ajax({
            method: "GET",
            url: "/search/"+charID,
        }).then(apiRes => {
            console.log(apiRes);
            // const ajaxID = apiRes.id
            // window.location.search = "charID=" + apiRes.id 
            window.location.href = `/search/${charID}`
        })
    }
})

$("body").on("click", ".delCharButton", function (event) {
    console.log("Clicked")
    const charID = $(this).attr("data-id");
    console.log(charID)
    $.ajax({
        method: "DELETE",
        url: `/api/delete/${charID}`,
    }).then(apiRes => {
        console.log(apiRes);
        window.location.href = `/characters`
    })
})

$("body").on("click", ".moveToButton", function (event) {
    console.log("Clicked")
    const charID = $(this).attr("data-id");
    window.location.href = `/search/${charID}`
})

$("body").on("click", ".editNotesButton", function (event) {
    event.preventDefault();
    console.log("Clicked")
    const charID = $(this).attr("data-id");
    const updatednotes = $(`.${charID}`).val();
    console.log(charID);
    const noteObj = { note: updatednotes }
    // console.log(charID)
    $.ajax({
        method: "PUT",
        url: `/api/edit/${charID}`,
        data:noteObj
    }).then(apiRes => {
        // console.log(apiRes);
        // window.location.href = "/characters"
        window.location.reload();
    })
})