let forceServer = false;

(() => {
    // Elements & Setup
    const container = document.querySelector(".monaco"),
        obfuscate = document.querySelector(".obfbtn"),
        loadingtext = document.querySelector(".loadingtext"),
        download = document.querySelector(".downloadbtn"),
        targetPlatform = document.querySelector(".targetPlatform")
    let selected_target_platform = targetPlatform.selectedIndex,
        obfuscating = false,
        currentMode = localStorage.getItem("theme-mode") || 0

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
print("nobody won:", false)`
    M.AutoInit()

    function saveAsFile(filename, data) {
        const blob = new Blob([data], { type: 'text/csv' });
        if (window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveBlob(blob, filename);
        }
        else {
            const elem = window.document.createElement('a');
            elem.href = window.URL.createObjectURL(blob);
            elem.download = filename;
            document.body.appendChild(elem);
            elem.click();
            document.body.removeChild(elem);
        }
    }

    $('.dark-toggle').on('click', function () {
        if (!monaco_editor) return
        currentMode = currentMode == 0 ? 1 : 0
        localStorage.setItem("theme-mode", currentMode)
        monaco_editor.updateOptions({ theme: currentMode == 0 ? "vs-dark" : "vscode" })
        currentMode == 0 ? document.querySelector(".sidebar").classList.remove("light") : document.querySelector(".sidebar").classList.add("light")
        currentMode == 0 ? document.querySelector("body").classList.remove("light") : document.querySelector("body").classList.add("light")
    });

    // Monaco Editor

    require.config({ paths: { 'vs': 'https://unpkg.com/monaco-editor@latest/min/vs' } });
    window.MonacoEnvironment = { getWorkerUrl: () => proxy };
    let proxy = URL.createObjectURL(new Blob([`
	self.MonacoEnvironment = {
		baseUrl: 'https://unpkg.com/monaco-editor@latest/min/'
	};
	importScripts('https://unpkg.com/monaco-editor@latest/min/vs/base/worker/workerMain.js');
`], { type: 'text/javascript' }));

    require(["vs/editor/editor.main"], function () {
        let editor = monaco.editor.create(document.querySelector('.monaco'), {
            value: `${default_code}`,
            language: 'lua',
            theme: 'vs-dark',
            wordWrap: 'on',
            wordBreak: 'off',
            automaticLayout: true,
        });
        window.monaco_editor = editor
        $(".obfbtn").on("click", async () => {
            if (obfuscating) return
            obfuscating = !obfuscating
            const start_time = new Date().getTime()
            container.classList.add("blur")
            loadingtext.classList.remove("hide")
            loadingtext.innerText = "Obfuscating..."
            await fetch((document.location.hostname == "localhost" && !forceServer ? `http://localhost:6969` : "https://mopsflgithubio.mopsfl.repl.co") + `/api/obfuscator/obfuscate`, {
                method: "POST", body: editor.getValue(), headers: { "Content-Type": "text/plain", "Target-Language-Id": `${btoa(selected_target_platform)}` }
            }).then(async res => {
                const response = await res.text()
                if (!res.ok) {
                    M.toast({ html: 'Error occurred while obfuscating script!' })
                    return editor.setValue(`--[[\nObfuscation Error: (${res.statusText})\n\n${response.replace(/^"+|"+$/igm, "")}\n]]\n\n` + editor.getValue())
                }
                editor.setValue(response)
                M.toast({ html: `Script successfully obfuscated! (took ${new Date().getTime() - start_time}ms)` })
            }).catch(err => {
                editor.setValue(`--[[\nError: (${err})\n> Check developer console for more information\n]]\n\n` + container.value)
                M.toast({ html: 'Error occurred while obfuscating script!' })
            })
            container.classList.remove("blur")
            loadingtext.classList.add("hide")
            obfuscating = false
        })
        $(".bfbtn").on("click", async () => {
            if (obfuscating) return
            obfuscating = !obfuscating
            const start_time = new Date().getTime()
            container.classList.add("blur")
            loadingtext.classList.remove("hide")
            loadingtext.innerText = "Deobfuscating..."
            await fetch((document.location.hostname == "localhost" && !forceServer ? `http://localhost:6969` : "https://mopsflgithubio.mopsfl.repl.co") + `/api/obfuscator/beautify`, {
                method: "POST", body: editor.getValue(), headers: { "Content-Type": "text/plain", "Target-Language-Id": `${btoa(selected_target_platform)}` }
            }).then(async res => {
                const response = await res.text()
                if (!res.ok) {
                    M.toast({ html: 'Error occurred while deobfuscating script!' })
                    return editor.setValue(`--[[\nDeobfuscation Error: (${res.statusText})\n\n${response.replace(/^"+|"+$/igm, "")}\n]]\n\n` + editor.getValue())
                }
                editor.setValue(response)
                M.toast({ html: `Script successfully deobfuscated! (took ${new Date().getTime() - start_time}ms)` })
            })
            container.classList.remove("blur")
            loadingtext.classList.add("hide")
            obfuscating = false
        })
        download.addEventListener("click", () => {
            if (window.monaco_editor?.getValue() == "") return M.toast({ html: "Nothing to download." })
            saveAsFile("obfuscated.lua", window.monaco_editor?.getValue())
        })
        targetPlatform.addEventListener("change", (e) => selected_target_platform = e.target.selectedIndex)
    });
})()