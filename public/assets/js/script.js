// Dependencies
var express = require("express");
var exphbs = require("express-handlebars");

console.log("safe for work comment");

$("#newChar").on("submit",event=>{
    event.preventDefault();
    console.log('new character made!');
    const charObj = {
        gender: $("#gender").val(),
        race: $("#race").val(),
        class: $("#class").val(),
        mainatr: $("#mainatr").val()
    }
    console.log(charObj)
    // $.ajax({
    //     method:"POST",
    //     url:"/api/character",
    //     data:charObj
    // }).then(data=>{
    //     console.log(data);
    //     window.location.href= "/loadthispage"
    // })
})

