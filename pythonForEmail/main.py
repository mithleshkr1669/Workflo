import csv
from datetime import datetime
import smtplib

gmail= 'ava604218@gmail.com'
password=''


def emailSender():
  with smtplib.SMTP("smtp.gmail.com") as connection :
   connection.starttls()
   connection.login(user=gmail,password=password)
   connection.sendmail(
      from_addr=gmail,
      to_addrs="mithleshkr1669@gmail.com",
      msg="Subject:Hello\n\nThis is the body of email."
   )


# now=datetime.now()
# print(now)

# with open('birthdays.csv','r') as file:

#     csv_reader=csv.reader(file)
#     next(csv_reader)

#     for row in csv_reader:
#         print(row)
