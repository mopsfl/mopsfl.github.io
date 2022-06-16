# draw a screen with a buttonn

# import libaries
import pygame
import random

# create the window
pygame.init()

# define colors
white = (255, 255, 255)
black = (0, 0, 0)
red = (255, 0, 0)
green = (0, 255, 0)
blue = (0, 0, 255)

# create the window object
screen = pygame.display.set_mode((800, 600))

# add a title to the window
pygame.display.set_caption("Casino")

# add the buttons to the window
button_play = pygame.Rect(300, 200, 200, 50)
button_play_text = pygame.font.SysFont("comicsansms", 40)
button_play_text_surface = button_play_text.render("Play", True, black)
