/*
        FELSÖKNING
        Det första jag gör är att implemenetera "use strict"; i början av filen så att det verkar globalt. Anledningen är för att inte tillåta 
        dåligt syntax som t.ex. att skapa variabler utan att deklarera dem, samt för att generera errors vid misstag.

        Första felet uppstod vid tilldelning av ett element till en variabel, värdet var null vilket visades i webbläsarens consol när jag
        använde "console.log". Felet var att elementen laddades efter jag försökte nå dem i scriptet så lösningen blev att flytta
        länken till scriptet längst ner i html sidan. Alternativt kan "window.onload" eller "DOMcontentloading" användas.

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
        p.innerHTML = 'Här kan du skriva ditt blogginlägg';
        article.appendChild(p);
        return article;
    }
    
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

    addBtn.addEventListener('click', () => {
        main.prepend(createPost());
        blogsCountInput.value = ++blogsCount;
        updatePostList();
    });

    delBtn.addEventListener('click', () => {
        blogsCountInput.value = --blogsCount;
        main.removeChild(main.children[0]);
        updatePostList();
    });

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

    function addTitle(clicked){
        if(option != ''){
             console.log('Too many..');
        } else{
            option = 'title';
            let input = document.createElement('input');
            input.placeholder = 'Skriv minst ett tecken..';
            input.classList.add('inputTitle');
            clicked.replaceWith(input);
        }
    }

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

    function submitText(input, textarea){
        if(input === null && textarea === null){
            console.log('nothing here')           
        } else if(option === 'title' && input.value != ''){
            let title = document.createElement('h2');
            title.classList.add('post-title');
            title.innerHTML = input.value;
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
