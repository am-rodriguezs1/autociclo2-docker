Feature: Create tags
  
  @user1 @web
  Scenario: Create a tag without a name
    Given the user is on the page "signin"
    When the user enters user and password
    Then they should be redirected to "dashboard"
    And the user navigates to the "tags" section
    And I wait for 2 seconds
    And the user clicks on the "New tag" link
    And they enter the value "description cypress e2e" in the "description" field of type "textarea"
    And the user clicks on the "Save" button
    Then the user should see the error message "You must specify a name for the tag."