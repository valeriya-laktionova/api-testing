Feature: Automation Practice Form

  @form
  Scenario: Fill mandatory fields and submit form successfully
    Given I open the automation practice form page
    When I fill all mandatory fields
    And I submit the form
    Then I should see a modal with text "Thanks for submitting the form"
