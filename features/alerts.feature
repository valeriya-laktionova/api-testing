Feature: Alerts on ToolsQA

  Background:
    Given I open the alerts page

  Scenario: Simple alert appears
    When I click the first alert button
    Then I should see a simple alert

  Scenario: Delayed alert appears after 5 seconds
    When I click the delayed alert button
    Then I should see the alert after delay

  Scenario: Confirm alert appears and is accepted
    When I click the confirm alert button
    And I accept the alert
    Then the confirm result should be "You selected Ok"

  Scenario: Prompt alert appears and input is handled
    When I click the prompt alert button
    And I type "Test User" into the alert
    Then the prompt result should be "You entered Test User"
