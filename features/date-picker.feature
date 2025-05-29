Feature: Date Picker

  @date
  Scenario: Select a specific date
    Given I open the date picker page
    When I select the date "06/15/2025"
    Then the selected date should be "06/15/2025"
