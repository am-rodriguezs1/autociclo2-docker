Feature: Create a new tag 

@user1 @web
Scenario: Create a new tag with metadata
  Given I navigate to page "<URL>"
  And I wait for 5 seconds
  When I enter the email "<EMAIL>"
  And I wait for 1 seconds
  And I enter the password "<PASSWORD>"
  And I wait for 2 seconds
  And I click next
  And I wait for 5 seconds
  When I click on tags option
  And I click on "New Tag" button
  And I enter the tag name "My New Tag"
  And I enter the tag description "This is a description for my new tag for a ghost test e2e"
  And I wait for 2 seconds
  And I enter the tag name "Metadata Tag"
  And I enter the tag description "This is a tag with metadata"
  And I click on "Expand" button metadata
  And I enter the metadata title "Metadata Title"
  And I enter the metadata description "This is a metadata description"
  And I wait for 2 seconds
  And I click on "Save" button for save tag
  Then I should see the tag "Metadata Tag" in the tags list