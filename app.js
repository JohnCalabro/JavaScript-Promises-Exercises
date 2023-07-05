let baseURL = "https://deckofcardsapi.com/api/deck"


//Part 1:

let favNum =  24;

// // 1:

$.getJSON(`http://numbersapi.com/${favNum}?json`, function(data) {
    console.log(data);
  });



// 2.
let favNums = [4, 24, 81];
$.getJSON(`http://numbersapi.com/${favNums}?json`, function(data) {
  console.log(data);
});

//3. 
let factArray = [];

$.getJSON(`http://numbersapi.com/${favNum}?json`, function(data) {
    factArray.push(data.text);
  $.getJSON(`http://numbersapi.com/${favNum}?json`, function(data) {
    factArray.push(data.text);
    $.getJSON(`http://numbersapi.com/${favNum}?json`, function(data) {
        factArray.push(data.text);
      $.getJSON(`http://numbersapi.com/${favNum}?json`, function(data) {
        factArray.push(data.text);
        factArray.forEach(fact => {
          $("body").append(`<p>${fact}</p>`);
        });
      });
    });
  });
});


//Part 2:

//1:

$.getJSON("https://deckofcardsapi.com/api/deck/new/draw/", function(data) {
      let { suit, value } = data.cards[0];
      console.log(`${value} of ${suit}`);
    });

//2:

$.getJSON("https://deckofcardsapi.com/api/deck/new/draw/", function(data) {
    let cardOne = data.cards[0];
    let cardsId = data.deck_id;
    
    $.getJSON(`https://deckofcardsapi.com/api/deck/${cardsId}/draw/`, function(data) {
      let cardTwo = data.cards[0];
      [cardOne, cardTwo].forEach(function(card) {
        console.log(
          `${card.value} of ${card.suit}`
        );
      });
    });
  });

  //3: 
  let deckId = null;
  let $btn = $('button');
  console.log($btn)
  let $cardArea = $('#card-area');
  console.log($cardArea)

  $.getJSON(`${baseURL}/new/shuffle/`, function(data) {
    deckId = data.deck_id;
    $btn.show();
  });

  $btn.on('click', function() {
    $.getJSON(`${baseURL}/${deckId}/draw/`, function(data) {
      let cardSrc = data.cards[0].image;
      let angle = Math.random() * 90 - 45;
      let randomX = Math.random() * 40 - 20;
      let randomY = Math.random() * 40 - 20;
      $cardArea.append(
        $('<img>', {
          src: cardSrc,
          css: {
            transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
          }
        })
      );
      if (data.remaining === 0) $btn.remove();
    });
  });

  

  