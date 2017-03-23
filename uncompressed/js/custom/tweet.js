var tweet_form = document.getElementById('tweet-form');
var tweet_form_submit = document.getElementById('tweet-form-submit');


console.log(tweet_form);
tweet_form.addEventListener('submit',tweet_form_submission,false);

function tweet_form_submission(e){
    e.preventDefault();
    console.log(this.elements['tweet-content'].value);
}