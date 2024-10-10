from itertools import product

count = 0
vowels = "АЯЮИ"

for word in product("ВАЯЮЩИЙ", repeat=4):
    joined = "".join(word)
    vowel_count = sum(1 for char in joined if char in vowels)
    if vowel_count >= 1 and joined[0] != "Й":
        count += 1

print(count)
