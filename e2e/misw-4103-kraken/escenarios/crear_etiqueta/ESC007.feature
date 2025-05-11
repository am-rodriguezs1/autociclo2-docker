Feature: Create a new tag

@user1 @web
Scenario: Create tag with description longer than 500 characters
  Given I navigate to page "<URL>"
  And I wait for 5 seconds
  When I enter the email "<EMAIL>"
  And I wait for 1 second
  And I enter the password "<PASSWORD>"
  And I wait for 2 seconds
  And I click next
  And I wait for 5 seconds
  When I click on tags option
  And I click on "New Tag" button
  And I enter the tag name "Long Description Tag"
  And I enter the tag description "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet."
  And I wait for 2 seconds
  And I click on "Save" button for save tag
  And I wait for 5 seconds
  Then I should see an error message "Description cannot be longer than 500 characters."