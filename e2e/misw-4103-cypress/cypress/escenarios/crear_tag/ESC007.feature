Feature: Create tags
  
  @user1 @web
  Scenario: Create a tag with a description longer than 500 characters
    Given the user is on the page "signin"
    When the user enters user and password
    Then they should be redirected to "dashboard"
    And the user navigates to the "tags" section
    And I wait for 2 seconds
    And the user clicks on the "New tag" link
    And they enter the value "taglargo" in the "name" field of type "input"
    And they enter the value "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur pretium tincidunt lacus. Nulla gravida orci a odio." in the "description" field of type "textarea"
    And the user clicks on the "Save" button
    Then the user should see the error message "Description cannot be longer than 500 characters."