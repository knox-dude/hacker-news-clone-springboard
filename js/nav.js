"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

// $body.on("click", "#nav-all", navAllStories);

/** Show login/signup forms on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

// $navLogin.on("click", navLoginClick);

/** Show new story form on click "submit" */

function navSubmitClick(evt) {
  console.debug("navSubmitClick", evt);
  hidePageComponents();
  $allStoriesList.show();
  $submitStoryForm.show();
}

// $navSubmitStory.on("click", navSubmitClick);

/** Show users favorited stories on click "favorites" */

function navFavoritesClick(evt) {
  console.debug("navFavoritesClick", evt);
  hidePageComponents();
  putFavoriteStoriesOnPage();
}

// $navFavorites.on("click", navFavoritesClick);

/** Show users own stories on click "my stories" */

function navUserStoriesClick(evt) {
  console.debug("navUserStoriesClick")
  hidePageComponents();
  putUserStoriesOnPage();
}

// $navUserStories.on("click", navUserStoriesClick);

/** Show info about user profile on click "${username}" */

function navUserProfileClick(evt) {
  hidePageComponents();
  showUserInfo();
  $userProfile.show();
}

// $navUserProfile.on("click", navUserProfileClick)

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}



function addNavListeners() {
  $body.on("click", "#nav-all", navAllStories);
  $navLogin.on("click", navLoginClick);
  $navSubmitStory.on("click", navSubmitClick);
  $navFavorites.on("click", navFavoritesClick);
  $navUserStories.on("click", navUserStoriesClick);
  $navUserProfile.on("click", navUserProfileClick)
}

document.addEventListener("DOMContentLoaded", addNavListeners);