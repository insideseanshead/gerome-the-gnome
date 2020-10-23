// Dependencies
var express = require("express");
var exphbs = require("express-handlebars");

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
            window.location.href = "/create"
        })
    }
})


$("#searchBtn").on("submit", event => {
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
            url: "/api/search",
            data: charID
        }).then(apiRes => {
            console.log(apiRes);
            const ajaxID = apiRes.id
            window.location.href = `/search/$(ajaxID)`
        })
    }
})

$(".delCharBtn").on("click", function (event) {
    const charID = $(this).attr("data-id");
    $.ajax({
        method: "DELETE",
        url: "/api/delete",
        data: charID
    }).then(apiRes => {
        console.log(apiRes);
        window.location.href = `/characters`
    })
})