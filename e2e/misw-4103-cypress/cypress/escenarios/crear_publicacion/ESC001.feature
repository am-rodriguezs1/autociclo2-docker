Feature:  Create and Publish Post in Ghost

@user1 @web
Scenario: Create and publish a new post
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
  When I enter post title "My First Automated Post"
  And I wait for 2 seconds
  When I enter post content "This is a test post created automatically using Kraken. The content is generated for testing purposes."
  And I wait for 2 seconds
  When I click on Publish
  And I wait for 5 seconds
  Then I should see the post "My First Automated Post" in the posts list