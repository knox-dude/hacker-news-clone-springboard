"use strict";

// So we don't have to keep re-finding things on page, find DOM elements once:

let $body;

let $storiesLoadingMsg;
let $allStoriesList;
let $favoritesList;
let $userStoriesList;
let $storiesList;
let $userProfile;

let $loginForm;
let $submitStoryForm;
let $signupForm;

let $mainNavLinks;
let $navLogin;
let $navSubmitStory;
let $navUserProfile;
let $navFavorites;
let $navUserStories;
let $navLogOut;

/** To make it easier for individual components to show just themselves, this
 * is a useful function that hides pretty much everything on the page. After
 * calling this, individual components can re-show just what they want.
 */

function hidePageComponents() {
  const components = [
    $storiesList,
    $loginForm,
    $signupForm,
    $submitStoryForm,
    $userProfile,
  ];
  components.forEach(c => c.hide());
}

/** Overall function to kick off the app. */

async function start() {
  console.debug("start");
  $body = $("body");

  $allStoriesList = $("#all-stories-list");
  $storiesLoadingMsg = $("#stories-loading-msg");
  $favoritesList = $("#favorites-list");
  $userStoriesList = $("#user-stories-list");
  $storiesList = $(".stories-list");
  $userProfile = $("#user-profile");
  
  $loginForm = $("#login-form");
  $submitStoryForm = $('#submit-story-form')
  $signupForm = $("#signup-form");
  
  $mainNavLinks = $(".main-nav-links");
  $navLogin = $("#nav-login");
  $navSubmitStory = $("#nav-submit-story")
  $navUserProfile = $("#nav-user-profile");
  $navFavorites = $("#nav-favorites");
  $navUserStories = $("#nav-user-stories");
  $navLogOut = $("#nav-logout");


  // "Remember logged-in user" and log in, if credentials in localStorage
  await checkForRememberedUser();
  await getAndShowStoriesOnStart();

  // if we got a logged-in user
  if (currentUser) updateUIOnUserLogin();
}

// Once the DOM is entirely loaded, begin the app

console.warn("HEY STUDENT: This program sends many debug messages to" +
  " the console. If you don't see the message 'start' below this, you're not" +
  " seeing those helpful debug messages. In your browser console, click on" +
  " menu 'Default Levels' and add Verbose");
// $(start);

// document.onload(make a run function)
// do event listener on domContentLoaded - everything should exist when domContentLoaded is fired
// define everything in global to be able to use, but instantiate them in this run function below

document.addEventListener("DOMContentLoaded", start)
