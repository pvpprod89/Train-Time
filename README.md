# Train-Time

Firebase-Assignment-Train-Time

### Overview

In this assignment, I created a train schedule application that incorporates Firebase to host arrival and departure data. My app will retrieve and manipulate this information with Moment.js. This website will provide up-to-date information about various trains, their arrival times and how many minutes remain until they arrive at their station.

### Instructions

To add Train:

- Enter Train Name.
- Enter Destination.
- Enter First Train Time in (HH:mm) Format.
  Example: if you want to enter 6PM, you will enter 18:00
- Enter Frequency of train in minutes

Click Submit to Add Train

### Expected Results

- The information that you submited will be displayed in form of table in "Current Trainn Schedule"
- Also, you will see Particular Trains Next Arrvial time and how many minutes away from your current time.
- Note: Next day will be taken into consideration at 00:00 (12:00 am) and next arrvial time and minutes away will be calculated accordingly, it may show blank-time and -ve minutes-away respective to the first train time (I have made this app taking into consideration that all trains stops at midnight and first next arrival after midnight will be whatever timing enterd into First Train Time)
