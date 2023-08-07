let forceServer = false;

(() => {
    let obfuscating = false
    const container = document.querySelector(".container"),
        obfuscate = document.querySelector(".obfbtn"),
        loadingtext = document.querySelector(".loadingtext"),
        default_code = `-- Function to create a new character with randomized stats
local function createCharacter(name)
    local health = math.random(80, 120)  -- Random health between 80 and 120
    local attack = math.random(10, 25)   -- Random attack between 10 and 25
    local character = {
        name = name,
        health = health,
        maxHealth = health,
        attack = attack,
        alive = true,
        inventory = {}
    }
    return character
end

-- Function to create a new item with randomized effects
local function createItem(name)
    local itemType = math.random(1, 2)  -- Randomize item type: 1 for healing, 2 for damaging
    local item
    if itemType == 1 then
        local healAmount = math.random(20, 40)  -- Random heal amount between 20 and 40
        item = { name = name, healAmount = healAmount }
    else
        local damage = math.random(30, 50)  -- Random damage between 30 and 50
        item = { name = name, damage = damage }
    end
    return item
end

-- Function to add an item to character's inventory
local function addItemToInventory(character, item)
    table.insert(character.inventory, item)
end

-- Function to use an item from character's inventory
local function useItem(character, item)
    if item.healAmount then
        character.health = math.min(character.health + item.healAmount, character.maxHealth)
        print(character.name .. " uses a " .. item.name .. " and heals.")
    elseif item.damage then
        print(character.name .. " uses a " .. item.name .. " and deals " .. item.damage .. " damage!")
    end
end

-- Function for character actions
local function attackCharacter(attacker, target)
    local minDamage = math.floor(attacker.attack * 0.9)
    local maxDamage = math.ceil(attacker.attack * 1.1)
    local randomDamage = math.random(minDamage, maxDamage)
    print(attacker.name .. " attacks " .. target.name .. " for " .. randomDamage .. " damage!")
    target.health = target.health - randomDamage
    if target.health <= 0 then
        target.alive = false
        print(target.name .. " has been defeated!")
    end
end

-- Simulate a battle
local function battle(player, enemy)
    print("A battle begins between " .. player.name .. " and " .. enemy.name .. "!")
    while player.alive and enemy.alive do
        local turnOrder = math.random(2)
        if turnOrder == 1 then
            attackCharacter(player, enemy)
            if enemy.alive then
                attackCharacter(enemy, player)
            end
        else
            attackCharacter(enemy, player)
            if player.alive then
                attackCharacter(player, enemy)
            end
        end
    end
    if player.alive then
        print(player.name .. " wins the battle!")
    else
        print(enemy.name .. " wins the battle!")
    end
end

-- Example usage
local playerCharacter = createCharacter("Player")
local enemyCharacter = createCharacter("Enemy")

local healthPotion = createItem("Health Potion")
local fireScroll = createItem("Fire Scroll")

addItemToInventory(playerCharacter, healthPotion)
addItemToInventory(playerCharacter, fireScroll)

battle(playerCharacter, enemyCharacter)
useItem(playerCharacter, healthPotion)
useItem(playerCharacter, fireScroll)

print("match ended:", true)
print("nobody won:", false)
`

    container.value = default_code
    obfuscate.addEventListener("click", async () => {
        if (obfuscating) return
        obfuscating = !obfuscating
        container.classList.add("blur")
        loadingtext.classList.remove("hide")
        await fetch((document.location.hostname == "localhost" && !forceServer ? `http://localhost:6969` : "https://mopsflgithubio.mopsfl.repl.co/api") + "/obfuscator/obfuscate", {
            method: "POST", body: container.value, headers: { 'Content-Type': 'text/plain' }
        }).then(async res => {
            const response = await res.text()
            if (!res.ok) return container.value = `--[[\nObfuscation Error: (${res.statusText})\n\n${response.replace(/^"+|"+$/igm, "")}\n]]\n\n` + container.value
            container.value = response
        }).catch(err => {
            container.value = `--[[\nError: (${err})\n> Check developer console for more information\n]]\n\n` + container.value
        })
        container.classList.remove("blur")
        loadingtext.classList.add("hide")
        obfuscating = false
    })
})()