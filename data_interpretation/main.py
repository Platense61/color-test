# NOTE: run from within the 'data_interpretation' folder for open(...) to work


# TODO: Make graphs in excel
# TODO: Make basic structure for powerpoint 


files = [
    open('data/in/sean_original.txt', 'r'),
    open('data/in/sean_modified.txt', 'r'),
    open('data/in/natasha_original.txt', 'r'),
    open('data/in/natasha_modified.txt', 'r')
]

o_color_names_dict = {
    'o_red':      'rgb(255, 0, 0)',
    'o_brown':    'rgb(127, 96, 0)',
    'o_green':    'rgb(56, 87, 35)',
    'o_yellow':   'rgb(255, 255, 0)',
    'o_blue':     'rgb(0, 47, 142)',
    'o_purple':   'rgb(112, 48, 160)'
}

m_color_names_dict = {
    'm_red':      'rgb(164, 72, 126)',
    'm_brown':    'rgb(33, 139, 33)', # NOTE: this & m_green might need to be swapped
    'm_green':    'rgb(246, 218, 0)',
    'm_yellow':   'rgb(255, 245, 210)',
    'm_blue':     'rgb(0, 187, 255)',
    'm_purple':   'rgb(112, 48, 160)'
}

# Final data structure
# highest level keys are the different files ('sean_modified' -> 'so')
# lower levels store:
#   key:
#       trial_num
#   values (also a dict):
#      time, 
#       correct, 
#       btn_clicked, 
#       btn_correct,
#       color_arr, 
#       color_names
# Example:
# output_dict_framework = {
#   'file': {
#       'line_num': {
#           'time': int
#           'correct': bool
#           ...
#       }
#   }
#}
output_dict = {
    'so': {},
    'sm': {},
    'no': {},
    'nm': {}
}


def main():
    line_num = 1
    file_num = 0

    # loops through all files given by sean & natasha
    for fp in files:
        # within each file, line points to each line
        # each line corresponds to a color clicked
        for line in fp.readlines():
            updateDict(numToFile(file_num), line_num, line.split(','))
            line_num += 1

        saveDict(file_num)
        # print('\n\noutput_dict for file ' + numToFile(file_num) + ':\n' + str(output_dict))
        line_num = 1
        file_num += 1


def updateDict(file, line_num, line_split):
    global num_correct

    color_arr = []
    dict = {
        'time':         0,
        'correct':      True,
        'btn_clicked':  0,
        'btn_correct':  0,
        'color_arr':    [],
        'color_names':  []
    }
    i = 0

    # print('original: \n' + str(line_split) + '\n\n')

    # this needed to be a while loop in order to deal with the rgb sections
    # because I'm splitting the line using ',' and since the rgb is stored as rgb(r,g,b) I need to 
    # increment the iterator within the loop by more than just one when an 'rgb' value us found in the line.
    # unfortunately this isn't doable in a for loop without a 2nd iterator hence, the while loop.
    while i < len(line_split):
        # print(line_split[i])
        if line_split[i][:4] == 'time':
            num_arr = line_split[i].split(' ')
            dict['time'] = int(num_arr[1])

        if line_split[i][1:8] == 'correct':
            if line_split[i][10] == 't':
                dict['correct'] = True
            else:
                dict['correct'] = False

        if line_split[i][1:12] == 'btn_clicked':
            btn_num_arr = line_split[i].split(' ')
            dict['btn_clicked'] = int(btn_num_arr[2][7:8])

        if line_split[i][1:12] == 'btn_correct':
            btn_num_arr = line_split[i].split(' ')
            dict['btn_correct'] = int(btn_num_arr[2][7:8])

        if line_split[i][:3] == 'rgb' or line_split[i][1:10] == 'color_arr':
            # print('rgb found!')
            if line_split[i][1:10] == 'color_arr':
                line_split[i] = line_split[i][12:]
            color_arr.append(combineRGB([
                line_split[i],
                line_split[i+1],
                line_split[i+2]
            ]))
            i += 2
        i += 1

    dict['color_arr'] = color_arr
    dict['color_names'] = RGBtoNameArr(file, color_arr)
    output_dict[file][line_num] = dict


def combineRGB(color_arr):
    try:
        if color_arr[2][6] == 's':
            color_arr[2] = color_arr[2][:5]
    except:
        pass
    return ','.join(color_arr)


def RGBtoNameArr(file, color_arr):
    ret_arr = []
    for color in color_arr:
        if file[1] == 'o':
            for name in o_color_names_dict:
                # print(name)
                if color == o_color_names_dict[name]:
                    ret_arr.append(name)

        elif file[1] == 'm':
            for name in m_color_names_dict:
                if color == m_color_names_dict[name]:
                    ret_arr.append(name)
    return ret_arr


def numToFile(num):
    if num == 0:
        return 'so'
    elif num == 1:
        return 'sm'
    elif num == 2:
        return 'no'
    return 'nm'


def saveDict(fileNum):
    file_path = 'data/out/' + numToFile(fileNum) + '_dict.txt'

    with open(file_path, 'w') as file:
        file.write(str(output_dict[numToFile(fileNum)]))


if __name__  == "__main__":
    main()