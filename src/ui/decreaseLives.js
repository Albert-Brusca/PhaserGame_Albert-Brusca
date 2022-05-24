export default lives => {
    const livesElement = document.getElementsByClassName('lives-amount')[0];
    const currentLives = Number(livesElement.innerText);

    livesElement.innerText = currentLives - lives;
};