Feature: Create Draft Post in Ghost

  @web @user1
  Scenario: Create a draft post and return to posts list
    Given I navigate to page "<URL>"
    And I wait for 5 seconds
    When I enter the email "<EMAIL>"
    And I wait for 2 seconds
    And I enter the password "<PASSWORD>"
    And I wait for 2 seconds
    And I click next
    And I wait for 7 seconds
    When I click on New post
    And I wait for 3 seconds
    When I enter post title "My Draft Post"
    And I wait for 2 seconds
    When I enter post content "This is a draft post created automatically using Kraken. The content is generated for testing purposes."
    And I wait for 2 seconds
    When I click on Posts menu
    And I wait for 3 seconds
    Then I should see the post "My Draft Post" in the posts list with status "Draft" 