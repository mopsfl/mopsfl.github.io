#make a game of rock, paper, scissors

# import needed libraries
import random

# make input
computer_input = ""
user_input = input("Rock, paper, or scissors? ")

# check user_input
if user_input == "rock":
    print("You chose rock.")
elif user_input == "paper":
    print("You chose paper.")
elif user_input == "scissors":
    print("You chose scissors.")
else:
    print("You didn't choose rock, paper, or scissors.")

#  generate a random option for the ki
random_number = random.randint(1,3)

# use random_number to choose rock paper or scissors
if random_number == 1:
    computer_input = "rock"
elif random_number == 2:
    computer_input = "paper"
else:
    computer_input = "scissors"

# check who won
if user_input == computer_input:
    print("It's a tie!")
elif user_input == "rock" and computer_input == "scissors":
    print("You win!")
elif user_input == "rock" and computer_input == "paper":
    print("You lose!")
elif user_input == "paper" and computer_input == "rock":
    print("You win!")
elif user_input == "paper" and computer_input == "scissors":
    print("You lose!")
elif user_input == "scissors" and computer_input == "paper":
    print("You win!")
elif user_input == "scissors" and computer_input == "rock":
    print("You lose!")
else:
    print("You didn't choose rock, paper, or scissors.")

# show what the computer_input is
print("The computer chose " + computer_input + ".")

# pause the window
input("Press enter to exit.")