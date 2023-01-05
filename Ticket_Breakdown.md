# Ticket Breakdown
We are a staffing company whose primary purpose is to book Agents at Shifts posted by Facilities on our platform. We're working on a new feature which will generate reports for our client Facilities containing info on how many hours each Agent worked in a given quarter by summing up every Shift they worked. Currently, this is how the process works:

- Data is saved in the database in the Facilities, Agents, and Shifts tables
- A function `getShiftsByFacility` is called with the Facility's id, returning all Shifts worked that quarter, including some metadata about the Agent assigned to each
- A function `generateReport` is then called with the list of Shifts. It converts them into a PDF which can be submitted by the Facility for compliance.

## You've been asked to work on a ticket. It reads:

**Currently, the id of each Agent on the reports we generate is their internal database id. We'd like to add the ability for Facilities to save their own custom ids for each Agent they work with and use that id when generating reports for them.**


Based on the information given, break this ticket down into 2-5 individual tickets to perform. Provide as much detail for each ticket as you can, including acceptance criteria, time/effort estimates, and implementation details. Feel free to make informed guesses about any unknown details - you can't guess "wrong".


You will be graded on the level of detail in each ticket, the clarity of the execution plan within and between tickets, and the intelligibility of your language. You don't need to be a native English speaker, but please proof-read your work.

## Your Breakdown Here
_Strategy: I will use the subtask concept, where I start with the main one (Epic) and then I will_
_break this one down into smaller tasks_.
**Business Question: How do you want to populate these agent codes? Through UI, or want it to be**
**done based in a composition of date or something else?** - (I will leave that open because I am
    running out of time)

### Ticket 1 - Generate Reports per Facilities
#### Story Points: 8
#### Description
As a system administrator I would like to be able to generate report from my own Facility, containing
how many hours each agent worked summing every shift they worked by quarter (already implemented).
As addition, I want to know about my own agents being represented by our own IDs in this report.

#### Acceptance Criteria
The Facility report is updated to contain our own agent codes for our agents.


### Ticket 1.1 - Allow Facilities to have their own agent IDs/code
#### Story Points: 3
#### Description
As a system administrator I would like to have the agents from my Facilities being represented by
a Facility ID (or code) in order to allow me to know which one they belong by this code, not by
a generic system ID as it is today.

#### Acceptance Criteria
Agents from a specific Facility must be also identified by a new identifier.


#### Implementation details
An agent can work in multiple Facilities, and every Facility may have multiple agents. That being
said, it configures a many-to-many relationship where a new table needs to be created to store
information regarding the Facility, Agent, and the FacilityCode for that agent.


### Ticket 1.2 - Get new agents code by Facility
#### Story Points: 3
#### Description
As an engineer I need to update the codebase (_getShiftsByFacility_ function) to reflect the DB
changes made at #Ticket1.1. Now we need to also get the new Agent Code by Facility.

#### Acceptance Criteria
The new Agent Code is returned successfully from the API.

#### Implementation details
The function "_getShiftsByFacility_" needs to be updated in order to fetch data also from the new
table "x_facility_agent" created at #Ticket1.1. It needs to be done through a new Join in the ORM or
SQL and then returned back through the API.


### Ticket 1.3 - Update Fields for the Facilities report
#### Story Points: 2
#### Description
As an engineer I need to populate the report containing the new Agent Id by Facility. As part
of #Ticket1.1 and #Ticket1.2 changes, we have a new field being returned from the API, this new
field needs to mapped to this report.

#### Acceptance Criteria
New x_facility_agent_code needs to be added to the report using the business name: "Agent Code".

#### Implementation details
Update the function "_generateReport_" to have this new field from the API (_getShiftsByFacility()_)
and also map the engineering name (x_facility_agent_code) to the business name: "Agent Code"
