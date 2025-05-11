Feature: Create and Publish Post with YouTube in Ghost

  @web @user1
  Scenario: Create and publish a new post with YouTube video
    Given I navigate to host page and path "/signin"
    And I wait for 2 seconds
    When I enter the email
    And I wait for 1 seconds
    And I enter the password
    And I wait for 2 seconds
    And I click next
    And I wait for 4 seconds
    Given I navigate to host page and path "/editor/post"
    And I wait for 2 seconds
    When I enter post title "My Post with YouTube Video"
    And I wait for 2 seconds
    When I click on the plus button to add content
    And I wait for 2 seconds
    When I click on the YouTube option
    And I wait for 2 seconds
    When I enter YouTube URL "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    And I wait for 2 seconds
    When I enter post content "This is a test post with a YouTube video embedded. Check out this cool video:"
    And I wait for 2 seconds
    When I click on Publish
    And I wait for 5 seconds
    Then I should see the post "My Post with YouTube Video" in the posts list 
