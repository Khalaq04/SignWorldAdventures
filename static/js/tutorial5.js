function swipe(direction) {
    console.log("swipe", direction);

    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
        const searchedName = "position";
        const regex = new RegExp(`${searchedName}(\\d+)`);
        const foundClassNumber = parseInt(card.className.match(regex)[1]);

        let newNumber;
        if (direction === "left") {
            if (foundClassNumber >= 1 && foundClassNumber <= 19) {
                newNumber = foundClassNumber - 1;
            } else {
                newNumber = 19;
            }
        } else if (direction === "right") {
            if (foundClassNumber >= 0 && foundClassNumber <= 18) {
                newNumber = foundClassNumber + 1;
            } else {
                newNumber = 0;
            }
        }
        

        const newClass = searchedName + newNumber;
        card.classList.add(newClass);
        card.classList.remove(`position${foundClassNumber}`);
    });

    setTimeout(function () {
        const newPosition1 = document.querySelector(".card.position1");
        const newPosition19 = document.querySelector(".card.position19");
    }, 10);
}

document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
        swipe("right");
    } else if (event.key === "ArrowRight") {
        swipe("left");
    }
});



