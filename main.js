/*
        FELSÖKNING
        Det första jag gör är att implemenetera "use strict"; i början av filen så att det verkar globalt. Anledningen är för att inte tillåta 
        dåligt syntax som t.ex. att skapa variabler utan att deklarera dem, samt för att generera errors vid misstag.

        Första felet uppstod vid tilldelning av ett element till en variabel, värdet var null vilket visades i webbläsarens consol när jag
        använde "console.log". Felet var att elementen laddades efter jag försökte nå dem i scriptet så lösningen blev att flytta
        länken till scriptet längst ner i html sidan. Alternativt kan "window.onload" eller "DOMcontentloading" användas.

*/ 

"use strict";


    let postTitles = document.querySelectorAll('.post-title');
    let clicks = 0;

    document.addEventListener('click', (e) =>{
        let clicked = e.target;
        let input = document.querySelector('input');
        let isActive = input === document.activeElement;
        if(clicks >= 1){
            console.log('You cant click two at a time...');
        }
        else{
            if(clicked.className == 'post-title'){
                clicks++;
                let input = document.createElement('input');
                input.placeholder = 'Skriv minst ett tecken..';
                input.classList.add('inputTitle');
                input.autofocus = true;
                clicked.replaceWith(input);
            }
        }
        if(isActive || input != null & clicked.className != 'inputTitle' && clicked.className != 'post-title'){
            if(input.value === ''){
                input.autofocus = true; 
            } else{
                clicks--;
                let title = document.createElement('h2');
                title.classList.add('post-title');
                title.innerHTML = input.value;
                input.replaceWith(title);
            }
        }
    });
