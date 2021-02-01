/*
        FELSÖKNING
        Det första jag gör är att implemenetera "use strict"; i början av filen så att det verkar globalt. Anledningen är för att inte tillåta 
        dåligt syntax som t.ex. att skapa variabler utan att deklarera dem, samt för att generera errors vid misstag.

        Första felet uppstod vid tilldelning av ett element till en variabel, värdet var null vilket visades i webbläsarens consol när jag
        använde "console.log". Felet var att elementen laddades efter jag försökte nå dem i scriptet så lösningen blev att flytta
        länken till scriptet längst ner i html sidan. Alternativt kan "window.onload" eller "DOMcontentloading" användas.

        Under hela projektet användes console.log för att visa värdet på variabler under körningens gång och för att se vad som sker när
        något skickas in i en funktion. Genom att testa bitar var för sig kunde jag utesluta vart problemet fanns.

*/ 

"use strict";
    let postId = 0;
    let option = '';
    let postArray = [];
    let main = document.querySelector('main');
    let addBtn = document.querySelector('#add');
    let delBtn = document.querySelector('#delete');
    let blogsCountInput = document.querySelector('#blogs-count-input');
    let postList = document.querySelector('#post-links');
    let blogsCount = 0;
    blogsCountInput.value = blogsCount;

    // I den här funktionen skapas en article med alla innehållande element och klasser
    // och returnerar denna för att kunna skickas in i DOM
    function createPost(){
        postId++;
        let article = document.createElement('article');
        article.classList.add('blog-post');
        let header = document.createElement('header');
        header.classList.add('post-header');
        let h2 = document.createElement('h2');
        h2.classList.add('post-title');
        h2.setAttribute('id', postId);
        h2.innerHTML = 'Titel';
        header.appendChild(h2);
        article.appendChild(header);
        let p = document.createElement('p');
        p.classList.add('post-body');
        p.innerHTML = 'Här kan du skriva ditt blogginlägg. När du redigerar ett blogginlägg klickar du först på titeln eller brödtexten, skriver minst ett tecken och klickar sedan utanför eller i samma ruta.';
        article.appendChild(p);
        return article;
    }
    
    // När denna funktionen kallas så nollställs först alla länkar på sidospalten
    // Sedan skapas li och a taggar med aktuella titlar och länkar som skickas in i DOM
    function updatePostList(){
        postList.innerHTML = '';
        let titles = document.querySelectorAll('.post-title');
        titles.forEach((post) => {
            let listItem = document.createElement('li');
            let listLink = document.createElement('a');
            listLink.setAttribute('href', '#' + post.getAttribute('id'));
            listLink.innerHTML = post.innerHTML;
            listItem.appendChild(listLink);
            postList.appendChild(listItem);
        });
    }

    // När plus tecknet i headern klickas på så kallas detta event där det skapas en article som sedan skickas in DOM
    // Sedan uppdateras sidospalten
    addBtn.addEventListener('click', () => {
        main.prepend(createPost());
        blogsCountInput.value = ++blogsCount;
        updatePostList();
    });

    // När minus tecknet i headern klickas på så kallas detta event där det tas bort en article från DOM om det finns minst en article
    // Sedan uppdateras sidospalten
    delBtn.addEventListener('click', () => {
        if(blogsCount >= 1){
            blogsCountInput.value = --blogsCount;
            main.removeChild(main.children[0]);
            updatePostList();
        } else{
            console.log('No posts to be deleted');
        }
       
    });

    // När valfritt antal anges i headern med hjälp av tryck på 'enter' så kallas detta event där det skapas x antal articles som sedan skickas in DOM
    // Sedan uppdateras sidospalten
    blogsCountInput.addEventListener('keyup', (e) => {
        if(e.keyCode === 13){
            main.innerHTML = '';
            blogsCount = blogsCountInput.value;
            for(let i = 0; i < blogsCount; i++){
                main.appendChild(createPost());
            }
            updatePostList();
        }
    });

    // Denna funtionen körs när en titel har klickats på, då skapas en input
    // option används för att användaren inte skall kunna klicka på något annat element förren en titel eller brödtext skickats till submittext
    // option anger även vilken del som kommer att uppdateras
    function addTitle(clicked){
        if(option != ''){
             console.log('Too many..');
        } else{
            let id = clicked.getAttribute('id');
            option = 'title';
            let input = document.createElement('input');
            input.placeholder = 'Skriv minst ett tecken..';
            input.classList.add('inputTitle');
            input.setAttribute('id', id);
            clicked.replaceWith(input);
        }
    }

    // Denna funktionen fungerar likadant som den övre, fast för brödtexten och lägger in en textarea
    function addBody(clicked){
        if(option != ''){
            console.log('Too many');
        } else{
            option = 'body';
            let textarea = document.createElement('textarea');
            textarea.placeholder = 'Skriv minst ett tecken..';
            textarea.classList.add('inputBody');
            clicked.replaceWith(textarea);
        }
    }

    // Här kommer DOM att uppdateras om minst ett tecken skrivits in i titeln eller brödtexten
    // Beroende på värdet på option kommer den delen att uppdateras genom att skapa en nytt element med det nya värdet och läggas in i DOM
    function submitText(input, textarea){
        if(input === null && textarea === null){
            console.log('nothing here')           
        } else if(option === 'title' && input.value != ''){
            let title = document.createElement('h2');
            title.classList.add('post-title');
            title.innerHTML = input.value;
            title.setAttribute('id', input.getAttribute('id'));
            input.replaceWith(title);
            option = '';
            updatePostList()
        } else if(option === 'body' && textarea.value != ''){
            let body = document.createElement('p');
            body.classList.add('post-body');
            body.innerHTML = textarea.value;
            textarea.replaceWith(body);
            option = '';
        }
    }

    // Varje gång en användare klickar någonstans på webbplatsen så kollar funtionen vad det är som har klickats på
    // Är det titel eller brödtext används någon av de funktionerna, är det någon annan del av sidan så uppdateras sidan om det finns nya värden
    document.addEventListener('click', (e) =>{
        let input = document.querySelector('.inputTitle');
        let textarea = document.querySelector('textarea');
        let clicked = e.target;

        switch(clicked.className){
            case 'post-title':
                addTitle(clicked);
                break;
             case 'post-body':
                 addBody(clicked);
                 break;
              default:
                  submitText(input, textarea);
                  break;
        }
    });
