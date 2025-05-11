Feature: Create a new tag

@user1 @web
Scenario: Create a tag without a name
  Given I navigate to page "<URL>"
  And I wait for 5 seconds
  When I enter the email "<EMAIL>"
  And I enter the password "<PASSWORD>"
  And I click next
  When I click on tags option
  And I click on "New Tag" button
  And I enter the tag description "This is a description for a tag without a name"
  And I click on "Save" button for save tag
  Then I should see an error message "You must specify a name for the tag."
