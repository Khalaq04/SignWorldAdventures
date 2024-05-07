document.addEventListener('DOMContentLoaded', function() {
    const fruitAreas = document.querySelectorAll('#fruits-basket area');
    const vegAreas = document.querySelectorAll('#veges-basket area');
    const zooAreas = document.querySelectorAll('#zoo area');
    const hoverImage = document.getElementById('hover-image');
    const basketImage = document.querySelector('#fruits-basket img');
    const vegesImage = document.querySelector('#veges-basket img');
    const zooImage = document.querySelector('#zoo img');

    function handleMouseOver(area, basketImage, isFruitBasket, isZooBasket) {
        area.addEventListener('mouseover', function() {
            hoverImage.src = this.dataset.image;
            hoverImage.style.display = 'inline-block';
            const rect = basketImage.getBoundingClientRect();
            let topPosition = isFruitBasket ? rect.top : rect.bottom;
            if (isZooBasket) {
                const zooRect = zooImage.getBoundingClientRect();
                topPosition = zooRect.bottom + 550;
            }
            hoverImage.style.left = rect.right + 'px';
            hoverImage.style.top = topPosition + 'px';
        });
    }

    function handleMouseOut(area) {
        area.addEventListener('mouseout', function() {
            hoverImage.src = '';
            hoverImage.style.display = 'none';
        });
    }

    fruitAreas.forEach(area => {
        handleMouseOver(area, basketImage, true, false);
        handleMouseOut(area);
    });

    vegAreas.forEach(area => {
        handleMouseOver(area, vegesImage, false, false);
        handleMouseOut(area);
    });

    zooAreas.forEach(area => {
        handleMouseOver(area, zooImage, false, true);
        handleMouseOut(area);
    });
});
