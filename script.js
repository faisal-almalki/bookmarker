//listen for form submit

document.getElementById('myForm').addEventListener('submit', saveBookmark);

//save Bookmarke
function saveBookmark(e) {
    //get form values
    var siteName = document.getElementById("siteName").value;
    var siteUrl = document.getElementById("siteUrl").value;

    if (!validateForm(siteName, siteUrl)) {
        return false;
    }

    var bookmark = {
        name: siteName,
        url: siteUrl
    }

    /*
    // local storage test
    localStorage.setItem('test', 'hello world');
    console.log(localStorage.getItem('test'));
    localStorage.removeItem('test');
    console.log(localStorage.getItem('test'));
    */

    //test if bookmarks is null
    if(localStorage.getItem('bookmarks') === null) {
        // Init array
        var bookmarks = [];
        //add to array
        bookmarks.push(bookmark);
        //set to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        //get bookmarks from LocalStorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        //add bookmark to array
        bookmarks.push(bookmark);
        //re-set back to LocalStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    //clear form
    document.getElementById('myForm').reset();

    //re-fetch bookmarks
    fetchBookmarks();

    //prevent form from submitting
    e.preventDefault; //حاول تعرف معنا السطر هذا بشكل اكثلر تفصيل
}

//delete bookmark

function deleteBookmark(url){
    //get bookmark from LocalStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //Loop throught bookmarks
    for (var i = 0; i < bookmarks.length; i++)  {
        if(bookmarks[i].url == url) {
            //remove from array
            bookmarks.splice(i, 1);
        }
    }
    //re-set back to LocalStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    
    //re-fetch bookmarks
    fetchBookmarks();
}

//fetch bookmarks
function fetchBookmarks() {
    //get bookmarks from LocalStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    //get output id
    var bookmarksResults = document.getElementById('bookmarksResults');

    //Build output
    bookmarksResults.innerHTML = "";
    for(var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML += '<div class="well">'+
                                       '<h3>'+name+
                                       ' <a class="btn btn-default" target="_blank" href="'+url+'">ادخل للموقع</a> ' +
                                       ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" target="_blank" href="#">حذف</a> ' +
                                        '</h3>'+
                                        '</div>';
    }
}

//validate form
function validateForm(siteName, siteUrl) {
    if(!siteName || !siteUrl){
        alert('أنت لم تقم بإدخال اسم الموقع او الرابط');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteUrl.match(regex)){
        alert('تأكد من أن الموقع يبدا ب  "http" ');
        return false;
    }
    return true;
}