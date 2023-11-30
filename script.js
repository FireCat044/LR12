$(document).ready(function() {
    let easyWords = [
        { word: "apple", translation: "яблуко", image: "images/apple.jpg" },
        { word: "banana", translation: "банан", image: "images/banana.jpg" },
        { word: "pineapple", translation: "ананас", image: "images/pineapple.jpg" },
        { word: "avocado", translation: "авокадо", image: "images/avocado.jpg" },
        { word: "peach", translation: "персик", image: "images/peach.jpg" },
        { word: "lime", translation: "лайм", image: "images/lime.jpg" },
        { word: "passion fruit", translation: "маракуйя", image: "images/passion.jpg" },
        { word: "mango", translation: "манго", image: "images/mango.jpg" },
        { word: "pear", translation: "груша", image: "images/pear.jpg" },
        { word: "kiwi", translation: "ківі", image: "images/kiwi.jpg" }
    ];

    let mediumWords = [
        { word: "PC", translation: "персональний комп'ютер", image: "images/PC.jpg" },
        { word: "keyboard", translation: "клавіатура", image: "images/keyboard.jpg" },
        { word: "mouse", translation: "Мишка", image: "images/mouse.jpg" },
        { word: "mousepad", translation: "Ковер", image: "images/mousepad.png" },
        { word: "monitor", translation: "Монітор", image: "images/monitor.jpg" },
        { word: "laptop", translation: "Ноутбук", image: "images/laptop.jpg" },
        { word: "headphones", translation: "Навушники", image: "images/headphones.jpg" },
        { word: "microphone", translation: "Мікрофон", image: "images/micro.jpg" },
        { word: "controller", translation: "Геймпад", image: "images/controller.jpg" },
        { word: "webcam", translation: "Веб-камера", image: "images/webcam.jpg" },
        
    ];

    let hardWords = [
        { word: "Graphic Card", translation: "відеокарта", image: "images/GP.jpg" },
        { word: "Processor", translation: "Процесор", image: "images/CPU.jpg" },
        { word: "RAM", translation: "оперативна пам'ять", image: "images/RAM.jpg" },
        { word: "motherboard", translation: "материнська плата", image: "images/motherboard.jpg" },
        { word: "Case", translation: "корпус", image: "images/case.jpg" },
        { word: "SSD", translation: "Накопичувач", image: "images/ssd.jpg" },
        { word: "Cooling", translation: "Охолодження", image: "images/cooling.jpg" },
        { word: "Water Cooling", translation: "водяне охолодження", image: "images/water.jpg" },
        { word: "Power unit", translation: "Блок живлення", image: "images/PU.jpg" },
        { word: "SoundCard", translation: "Звукова карта", image: "images/SC.jpg" },
      
    ];

    let currentStep = 0;
    let correctCount = 0;
    let incorrectCount = 0;

    let selectedDifficulty = "easy";

    $("#difficulty").on("change", function() {
        selectedDifficulty = $(this).val();
        resetGame();
    });

    function resetGame() {
        currentStep = 0;
        correctCount = 0;
        incorrectCount = 0;

        switch (selectedDifficulty) {
            case "easy":
                words = shuffleArray(easyWords);
                break;
            case "medium":
                words = shuffleArray(mediumWords);
                break;
            case "hard":
                words = shuffleArray(hardWords);
                break;
            default:
                words = shuffleArray(easyWords);
                break;
        }

        showNextWord();
    }

    function showNextWord() {
        if (currentStep < words.length) {
            const word = words[currentStep];
            $("#card-container").html('<img class="card-img" src="' + word.image + '" alt="' + word.word + '">');
            $(".card-img").on("click", function() {
                const input = prompt("Перекладіть слово: " + word.word);
                checkTranslation(input);
            });
        } else {
            showResults();
            showRetryButton();
        }
    }

    function checkTranslation(input) {
        if (input && input.toLowerCase() === words[currentStep].translation.toLowerCase()) {
            alert("Правильно!");
            correctCount++;
        } else {
            alert("Неправильно :( Правильний переклад: " + words[currentStep].translation);
            incorrectCount++;
        }

        currentStep++;
        updateProgress();
        updateScore();
        setTimeout(showNextWord, 500);
    }

    function updateProgress() {
        $("#current-step").text(currentStep + 1);
    }

    function updateScore() {
        $("#correct-count").text(correctCount);
        $("#incorrect-count").text(incorrectCount);
    }

    function showResults() {
        alert("Тест пройдений!\n\nПравильно: " + correctCount + "\nНеправильно: " + incorrectCount);
    }

    function showRetryButton() {
        const retryButton = $('<button id="retry-btn">Заново</button>');
        retryButton.on("click", function() {
            resetGame();
            retryButton.remove();
        });
        $("#app").append(retryButton);
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    resetGame();
});
