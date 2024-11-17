const moduleId = "noodles-oracle"

Hooks.once("init", () => {
    game.settings.register(moduleId, "addedToCompendium", {
        scope: "user",
        config: false,
        type: Boolean,
        default: false
    });
})

Hooks.on("ready", async () => {
    //#region Pathfinder 2e
    if (game.system.id === "pf2e") {
        if (!game.settings.get(moduleId, "addedToCompendium")) {
            // Grab the settings
            const settings = await game.settings.get("pf2e", "compendiumBrowserPacks")

            // Add the pack to the settings
            settings.action[`${moduleId}.no-class-and-features`].load = true;
			settings.action[`${moduleId}.no-feats`].load = true;
            settings.feat[`${moduleId}.no-class-and-features`].load = true;
            settings.feat[`${moduleId}.no-feats`].load = true;
			settings.feat[`${moduleId}.no-multiclass-archetype`].load = true;
			settings.feat[`${moduleId}.no-mysteries-and-curses`].load = true;
            settings.spell[`${moduleId}.no-spells-and-effects`].load = true;

            // Set the settings, both in the client settings and the current session respectively
            await game.settings.set("pf2e", "compendiumBrowserPacks", settings);
            game.pf2e.compendiumBrowser.settings = settings;

            // Set the setting to not re-add the pack if the user disables it in the future and notify about the change in the console
            await game.settings.set(moduleId, "addedToCompendium", true);
            console.log("%c Noodles' Oracle actions, feats, features and spells have been added to the Compendium Browser and automatically enabled!", "color: green; font-weight: bold")
        };
    }
    //#endregion Pathfinder 2e
})