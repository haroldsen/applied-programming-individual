
import os
import json
import re
import random
from special_input import Special_Input

si = Special_Input()

def this_dir(end=''):
    return f'{os.path.dirname(__file__)}/{end}'

def get_local_svgs():
    files = os.listdir(this_dir())
    valid_files = []
    for file in files:
        if '.svg' in file:
            valid_files.append(file)
    return valid_files

def read_settings():
    with open(this_dir('settings.json'), 'r') as file:
        data = json.load(file)
    return data

def save_settings(settings_obj):
    try:
        with open(this_dir('settings.json'), 'w') as json_file:
            json.dump(settings_obj, json_file)
    except IOError as e:
        print(f'\nError writing to "settings.json"\n')

def svg_to_string(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            svg_string = f.read()
        return svg_string
    except FileNotFoundError:
        return f"Error: File not found at {file_path}"
    except Exception as e:
        return f"An error occurred: {e}"

def generate_animation_frames(file, boiling_factor):
    svg_data = svg_to_string(file)

    for number in range(5):

        # Split on the ">" character.
        scraps = svg_data.split('>')
        for index in range(len(scraps)):
            scraps[index] = scraps[index] + '>'
        scraps.pop()
        
        # Split on the string ' d="'
        new_scraps = []
        for scrap in scraps:
            if ' points="' in scrap:
                pieces = scrap.split(' points="')
                pieces[1] = ' points="' + pieces[1]
                anchor_points = re.findall(r'[0-9.]+', pieces[1])
                for anchor_point in anchor_points:
                    if anchor_point != '0':
                        pieces[1] = pieces[1].replace(anchor_point, str(float(anchor_point) + random.randint(-boiling_factor, boiling_factor)))
                        # pieces[1] = pieces[1].replace(anchor_point, '5')
                new_scraps.append(pieces[0] + pieces[1])
            else:
                new_scraps.append(scrap)

        new_svg = "".join(new_scraps)
        with open(this_dir(f'frame{number + 1}.svg'), 'w', encoding='utf-8') as f:
            f.write(new_svg)

settings = read_settings()

user = 'Home'
while not user == 'End Program':
    if user == 'Home':
        user = si.get_multiple_choice('HOME', [[f'Change Read File: {settings['read_file']}', 'Change Read File'], 'Generate Animation Frames', 'End Program'])
    elif user == 'Change Read File':
        file_options = get_local_svgs()
        settings['read_file'] = si.get_multiple_choice('HOME > CHANGE READ FILE', file_options)
        save_settings(settings)
        user = 'Home'
    elif user == 'Generate Animation Frames':
        generate_animation_frames(settings['read_file'], boiling_factor=5)
        input('\nAnimation frames have been generated.  Press ENTER to return to the menu.')
        user = 'Home'
