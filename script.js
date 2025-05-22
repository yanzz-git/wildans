const text = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam facilis at voluptas officiis laborum. Laudantium fugit maiores ipsam sunt! Quod iusto deserunt nobis perferendis unde nesciunt culpa iure eaque maxime?";
  const paragraph = document.getElementById("typed-paragraph");

  let index = 0;

  function typeChar() {
    if (index < text.length) {
      paragraph.textContent += text[index];
      index++;
      setTimeout(typeChar, 40);
    }
  }

  typeChar();