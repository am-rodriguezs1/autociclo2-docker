Feature: Create Draft Post in Ghost

@web @user1
Scenario: Create a draft post and return to posts list
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
  When I enter post title "My Draft Post"
  And I wait for 2 seconds
  When I enter post content "This is a draft post created automatically using Kraken. The content is generated for testing purposes."
  And I wait for 2 seconds
  When I click on Posts menu
  And I wait for 3 seconds
  Then I should see the post "My Draft Post" in the posts list with status "Draft" 
