function gotoquiz(){
    var id = document.getElementById("id").innerHTML
    console.log("/quiz/1/"+id.toString())
    window.location = "/quiz/1/"+id.toString()
}