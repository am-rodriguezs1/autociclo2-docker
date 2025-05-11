Feature: Create Post with Invalid YouTube in Ghost

  @web @user1
  Scenario: Try to create a post with an invalid YouTube video
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
    When I enter post title "My Post with Invalid YouTube Video"
    And I wait for 2 seconds
    When I click on the plus button to add content
    And I wait for 2 seconds
    When I click on the YouTube option
    And I wait for 2 seconds
    When I enter YouTube URL "http/invalid"
    And I wait for 2 seconds
    Then I should see the error message "Oops, that link didn't work."
