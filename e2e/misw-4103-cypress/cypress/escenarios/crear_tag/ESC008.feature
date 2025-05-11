  
Feature: Create tags
  
  @user1 @web
  Scenario: Create a tag with metadata
    Given the user is on the page "signin"
    When the user enters user and password
    Then they should be redirected to "dashboard"
    And the user navigates to the "tags" section
    And I wait for 2 seconds
    And the user clicks on the "New tag" link
    And they enter the value "metatag" in the "name" field of type "input"
    And they enter the value "metadata description" in the "description" field of type "textarea"
    And the user clicks on the "Expand" button
    And they enter the value "title of metadata tag" in the "metaTitle" field of type "input"
    And they enter the value "Description of metadata tag" in the "metaDescription" field of type "textarea"
    And the user clicks on the "Save" button
    And I wait for 2 seconds
    And the user navigates to the "tags" section
    Then the user should see the tag "metatag" in the list of tags