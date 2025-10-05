
class Special_Input:

    def __init__(self):
        pass

    def clear(self):
        print("\033c\033[3J", end='')

    def red(self, str):
        return f'\033[91m{str}\033[0m'

    def green(self, str):
        return f'\033[92m{str}\033[0m'

    def move_cursor(self, row=1, col=1):
        print(f'\033[{row};{col}H', end='')

    def print_and_prompt(self, prompt_message, error_message):
        self.clear()
        print(f'\n{prompt_message}')
        print(error_message)
        self.move_cursor()
        print()
        return input(prompt_message)

    def can_be_int(self, text):
        try:
            int(text)
            return True
        except ValueError:
            return False

    def get_int(self, prompt):

        val = ''
        error = ''

        while not self.can_be_int(val):
            val = self.print_and_prompt(prompt, error)
            if not self.can_be_int(val):
                error = self.red(f'Error converting "{val}" to an integer.')
        self.clear()

        return int(val)

    def left_pad(self, in_str, total_len, char=' '):
        out_str = str(in_str)
        while len(out_str) < total_len:
            out_str = f'{char}{out_str}'
        return out_str

    def get_multiple_choice(self, prompt, display_return_pairs, starting_index=1):
        """Prompts the user to select from a list of choices."""

        # This block creates a list of valid inputs.
        # It also ensures that all items in the key_display_return_pairs
        # list is in the format [display, return].
        longest_len = 0
        valid_ins = []
        dis_ret_pairs = []
        count = starting_index
        for pair in display_return_pairs:
            if (isinstance(pair, str)):
                dis_ret_pairs.append([pair, pair])
            else:
                dis_ret_pairs.append(pair)
            valid_ins.append(str(count))
            if len(str(count)) > longest_len:
                longest_len = len(str(count))
            count += 1

        full_prompt = f'{prompt}\n'
        for index in range(len(dis_ret_pairs)):
            full_prompt = f'{full_prompt}\n  {self.left_pad(valid_ins[index], longest_len)}. {dis_ret_pairs[index][0]}'
        full_prompt = f'{full_prompt}\n\nPlease key in your selection: '

        error = ''
        user = ''

        while not user in valid_ins:
            user = self.print_and_prompt(full_prompt, error)
            if not user in valid_ins:
                error = self.red(f'"{user}" is not a valid option.')
        
        self.clear()

        return dis_ret_pairs[valid_ins.index(user)][1]
