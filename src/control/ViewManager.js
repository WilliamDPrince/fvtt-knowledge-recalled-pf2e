import { writable } from "svelte/store"
import GMJournalApplication from "../view/GMJournal/GMJournalApplication"

export default class ViewManager {
    apps = {};
    appsState = {};
    constructor() {
        if (ui.KnowledgeRecalled.ViewManager) {
            return ui.KnowledgeRecalled.ViewManager;
        }
        ui.KnowledgeRecalled.ViewManager = this;
    }
    /**
     * Intnded to be called when Foundry is Ready i.e. Hooks.on Ready
     * @method
     * @static
     * @description
     * Embeds the View Manger into the applications primary class which is embeded in Foundry's UI global variable.
     * Accessible at ui.KnowledgeRecalled.ViewManager
     */
    static _onReady() {
        ui.KnowledgeRecalled.ViewManager = new ViewManager;
    }
    /**
     * Call init() method after the _onReady method. Anything which should happen at setup, but following
     * the constructor should be done so within the init method. Currently this is where we are registering
     * all of the applications we will be managing.
     */
    init() {
        this.registerApplication('gmJournal', new GMJournalApplication)
    }
    /**
    * Register an application with the View Manager. Not intended to be used outside of ViewManager
    * @param {String} name - Name of the application.
    * @param {Object} app - The application instance.
    * @listens {ViewManager#init}
    */
    registerApplication(name, app) {
        if (!this.apps[name]) {
            this.apps[name] = app;
            // registerAppState Properties 
            this.appsState[name] = {
                open: false,
                protected: false,
            }
        } else {
            console.error(`This application, ${name}, has already been registered`);
        }
    }
    /**
    * Register an application with the View Manager. Not intended to be used outside of ViewManager
    * @param {String} name - Name of the application.
    * @param {Object} app - The application instance.
    * @listens {ViewManager#init}
    */
    registerProtectedApplication(name, app) {
        if (!this.apps[name]) {
            this.apps[name] = app;
            // registerAppState Properties 
            this.appsState[name] = {
                open: false,
                protected: true,
            }
        } else {
            console.error(`This application, ${name}, has already been registered`);
        }
    }
    /**
     * Helper function for allowing you to interact with the applications managed by the ViewManager by passing
     * the key value as a string.
     * @method
     * @param {string} name - Application name setup when using the registerApplication method.
     */
    getApp(name) {
        return this.apps[name];
    }


    /**
     * Method for opening a registered application by passing it's string name.
     * Also manages the applications state value.
    * @method 
    * @param {string} name - Application name setup when using the registerApplication method.
    * @example open("gmJournal" | "playerJournal")
    */
    open(name) {
        const app = this.getApp(name);

        if (!this.appsState[name].open) {
            this.appsState[name] = {
                ...this.appsState[name],
                open: true
            };
            app.render(true);
        }
    }
    /**
     * Method for closing a registered application by passing it's string name.
     * also manages the applications state value.
    * @method
    * @param {string} name - Application name setup when using the registerApplication method.
    * @example close("gmJournal" | "playerJournal")
    */
    close(name) {
        const app = this.getApp(name);
        if (this.appsState[name].protected) {
            return console.error(`This Application, ${name}, is a protected application and can't be closed with this method.`)
        }
        if (this.appsState[name].open) {
            this.appsState[name] = {
                ...this.appsState[name],
                open: false
            };
            app.close();
        }
    }
    /**
     * Method to close all opened applications.
     * @method
     *
     */
    closeAll() {
        // array to store the applications we plan to close
        const appsToClose = [];
        //loop through the appsState objects
        for (const appName in this.appsState) {
            const app = this.appsState[appName]
            console.log(app)
            // If open and not protected
            if (app.open && !app.protected) {
                // store apps in the array to close
                appsToClose.push(appName);
            }
        };
        // Loop through the apps needing closed
        appsToClose.forEach(name => {
            // Get the app by their name
            const app = this.apps[name];
            // run the close method on the application object
            app.close();
            // set the appsState.open value to false
            this.appsState[name].open = false;
        })
    }
    /**
     * Method to negotiate open or close behavior, based on the applications current state.
     * Useful when a single method is intended to be supplied that should open and close
     * the application, such as a button for opening and closing.
     * @method
     * @param {string} name - Application name setup when using the registerApplication method.
     * @example openCloseNegotiate("gmJournal" | "playerJournal")
     */
    openCloseNegotiate(name) {
        if (this.appsState[name].open) {
            this.close(name);
        } if (!this.appsState[name].open) {
            this.open(name);
        } else {
            console.log(`Cannot find application ${name}, are you sure the application has been registered?`);
        };
    }
    /**
     * Method for manually setting and applications state, for use if opening and closing occurs outside of the managements
     * open and close methods.
     * @method
     * @param {string} name - Application name setup when using the registerApplication method.
     * @param {boolean} setAppsStateOpen - changes the value of ui.KnowledgeRecalled.ViewManager.appsState[name].open to the specified value
     */
    manuallyAlterStatesOpenValue(name, setAppsStateOpen) {
        this.appsState[name] = {
            ...this.appsState[name],
            open: setAppsStateOpen
        }
    }

}
