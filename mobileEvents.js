let startX, startY, endX, endY;

document.addEventListener('touchstart', function (event) {
  startX = event.touches[0].clientX;
  startY = event.touches[0].clientY;
});

document.addEventListener('touchend', function (event) {
  endX = event.changedTouches[0].clientX;
  endY = event.changedTouches[0].clientY;

  const deltaX = endX - startX;
  const deltaY = endY - startY;

  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    if (deltaX > 0) {
      moveRight();
    } else {
      moveLeft();
    }
  } else {
    if (deltaY > 0) {
      moveDown();
    } else {
        rotate();
    }
  }
});
