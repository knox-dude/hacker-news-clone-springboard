"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story, isUserStory=false) {
  // console.debug("generateStoryMarkup", story);

  // if filling in user's stories, add trash can to allow deleting
  let trashCan = "";
  if (isUserStory) {
    trashCan = ('<span class="trash-can"><i class="fas fa-trash-alt"></i></span>');
  }

  // if logged in, add stars to songs to display favorites
  let star = "";
  if (currentUser) {
    const isFav = currentUser.isFavoriteStory(story);
    star = generateFavoriteSymbol(isFav);
  }

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
        ${trashCan}
        ${star}
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** A helper method to generate HTML for the favorite (star) icon next to a story */

function generateFavoriteSymbol(isFav) {
  if (currentUser) {
    if (isFav) {
      return '<span class="star"><i class="fas fa-star"></i></span>';
    } else {
      return '<span class="star"><i class="far fa-star"></i></span>';
    }
  } else {
    return 
  }
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

/** Puts user's favorited stories on the page */

function putFavoriteStoriesOnPage() {
  console.debug("putFavoriteStoriesOnPage");

  $favoritesList.empty();

  if (currentUser.favorites.length < 1) {
    $favoritesList.append("<h5>User has no favorited stories!</h5>");
    $favoritesList.show();
    return;
  } 

  for (let story of currentUser.favorites) {
    $favoritesList.append(generateStoryMarkup(story));
  }

  $favoritesList.show();
}

/** Puts user's own stories on the page */

function putUserStoriesOnPage() {

  $userStoriesList.empty();

  if (currentUser.ownStories.length < 1) {
    $userStoriesList.append("<h5>User has not created any stories!</h5>");
    $userStoriesList.show();
    return;
  }

  for (let story of currentUser.ownStories) {
    if (story instanceof Story) {
      $userStoriesList.append(generateStoryMarkup(story, true));
    }  
  }

  $userStoriesList.show();
}

/** Adds a new story to storyList and puts on page */

async function submitNewStory(evt) {
  console.debug("submitNewStory", evt);
  evt.preventDefault();
  const author = $("#submit-author").val();
  const title = $("#submit-title").val();
  const url = $("#submit-url").val();

  const story = await storyList.addStory(currentUser, {title, author, url});

  const $story = generateStoryMarkup(story);
  $allStoriesList.prepend($story);

  // Got this from the example site - hides the story
  $submitStoryForm.slideUp();
  $submitStoryForm.trigger("reset");
}

// $submitStoryForm.on("submit", submitNewStory);

/** UI functionality for adding/removing story from favorites */

async function clickOnStar(evt) {
  console.debug("clickOnStar", evt);

  // find the story we are looking for using id
  const storyId = evt.currentTarget.parentElement.id;
  const clickedStory = storyList.stories.find(s => s.storyId===storyId);

  if ($(evt.target).hasClass('far')) { // fill star and add to favorites
    $(evt.target).addClass('fas').removeClass('far');
    await currentUser.addToFavorites(clickedStory);
  } 
  else {                               // de-fill star and remove from favorites
    $(evt.target).addClass('far').removeClass('fas');
    await currentUser.removeFromFavorites(clickedStory);
  }
}

// $storiesList.on("click", ".star", clickOnStar);

/** UI functionality for deleting a user's own story */

async function clickOnTrashCan(evt) {
  console.debug("clickOnTrashCan", evt);

  const storyId = evt.currentTarget.parentElement.id;
  const clickedStory = currentUser.ownStories.find(s => s.storyId===storyId);

  // use API to delete story from database
  await currentUser.deleteUserStory(clickedStory);
  // delete story from storyList
  storyList.deleteStoryFromStoryList(clickedStory);

  putUserStoriesOnPage();
}

// $storiesList.on("click", ".trash-can", clickOnTrashCan);

/** Adds event listeners once the DOM content has been loaded */

function addStoriesListeners() {
  $submitStoryForm.on("submit", submitNewStory);
  $storiesList.on("click", ".star", clickOnStar);
  $storiesList.on("click", ".trash-can", clickOnTrashCan);
}

document.addEventListener("DOMContentLoaded", addStoriesListeners);